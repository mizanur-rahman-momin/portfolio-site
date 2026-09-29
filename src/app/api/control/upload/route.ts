import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isAuthenticated } from "@/lib/control/auth";
import { slugify } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

const ALLOWED_IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_MDX_SIZE = 2 * 1024 * 1024; // 2MB

export async function POST(request: Request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    // 1. Extract MDX content
    const mdxFile = formData.get("mdxFile") as File | null;
    const mdxTextOverride = formData.get("mdxText") as string | null;

    if (mdxFile && mdxFile.size > MAX_MDX_SIZE) {
      return NextResponse.json({ error: "MDX file exceeds 2MB limit" }, { status: 400 });
    }

    let rawMdx = "";
    if (mdxTextOverride && mdxTextOverride.trim()) {
      rawMdx = mdxTextOverride;
    } else if (mdxFile && mdxFile.size > 0) {
      rawMdx = await mdxFile.text();
    } else {
      return NextResponse.json({ error: "No .mdx file or content provided" }, { status: 400 });
    }

    // 2. Parse frontmatter and content
    const parsed = matter(rawMdx);
    const frontmatter: Record<string, unknown> = { ...parsed.data };
    let content = parsed.content;

    // Title & Slug determination
    const titleInput = formData.get("title") as string | null;
    const slugInput = formData.get("slug") as string | null;

    const rawTitle = titleInput || (typeof frontmatter.title === "string" ? frontmatter.title : "");
    const title = rawTitle.trim();
    if (!title) {
      return NextResponse.json(
        { error: "Blog post title is required (either in frontmatter or input)" },
        { status: 400 },
      );
    }

    const fmSlug = typeof frontmatter.slug === "string" ? frontmatter.slug : "";
    const rawSlug = (slugInput || fmSlug || slugify(title)).trim();
    const slug = slugify(rawSlug);
    if (!slug) {
      return NextResponse.json(
        { error: "Unable to generate a valid URL slug from title" },
        { status: 400 },
      );
    }

    // 3. Setup directories
    const postDir = path.join(process.cwd(), "content", "blog", slug);
    const imagesDir = path.join(postDir, "images");
    const publicImagesDir = path.join(process.cwd(), "public", "content", "blog", slug, "images");

    fs.mkdirSync(imagesDir, { recursive: true });
    fs.mkdirSync(publicImagesDir, { recursive: true });

    const savedImages: string[] = [];

    // 4. Handle Cover Image
    const coverImageFile = formData.get("coverImage") as File | null;
    const coverImageAltInput = formData.get("coverImageAlt") as string | null;

    if (coverImageFile && coverImageFile.size > 0) {
      if (coverImageFile.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: "Cover image exceeds 10MB limit" }, { status: 400 });
      }

      const ext = path.extname(coverImageFile.name).toLowerCase() || ".png";
      if (!ALLOWED_IMAGE_EXTS.has(ext)) {
        return NextResponse.json(
          {
            error: `Invalid cover image extension (${ext}). Allowed: png, jpg, jpeg, webp, avif, gif, svg`,
          },
          { status: 400 },
        );
      }

      const coverFileName = `cover${ext}`;
      const coverBuffer = Buffer.from(await coverImageFile.arrayBuffer());

      fs.writeFileSync(path.join(imagesDir, coverFileName), coverBuffer);
      fs.writeFileSync(path.join(publicImagesDir, coverFileName), coverBuffer);

      frontmatter.coverImage = `./images/${coverFileName}`;
      const defaultCoverAlt =
        typeof frontmatter.coverImageAlt === "string" ? frontmatter.coverImageAlt : title;
      frontmatter.coverImageAlt = coverImageAltInput || defaultCoverAlt;
      savedImages.push(coverFileName);
    }

    // 5. Parse Image Slot Alt texts & metadata
    const slotMetadataRaw = formData.get("slotMetadata") as string | null;
    let slotMetadata: Record<string, { alt?: string }> = {};
    if (slotMetadataRaw) {
      try {
        slotMetadata = JSON.parse(slotMetadataRaw);
      } catch {
        // ignore json parse error
      }
    }

    // 6. Handle Placeholder Images (e.g. image1, image2, image3, ...)
    const processedSlots = new Set<string>();

    for (const [key, value] of formData.entries()) {
      if (!(value instanceof File) || value.size === 0) continue;
      if (key === "mdxFile" || key === "coverImage") continue;

      let slotKey = key;
      if (slotKey.startsWith("image_")) {
        slotKey = slotKey.replace(/^image_/, "");
      }

      // Sanitize slotKey strictly to alphanumeric/dashes (prevent path traversal)
      slotKey = slotKey.replace(/[^a-z0-9_-]/gi, "").toLowerCase();
      if (!slotKey) continue;

      if (value.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          { error: `Image slot ${slotKey} exceeds 10MB limit` },
          { status: 400 },
        );
      }

      const ext = path.extname(value.name).toLowerCase() || ".png";
      if (!ALLOWED_IMAGE_EXTS.has(ext)) {
        return NextResponse.json(
          {
            error: `Invalid image extension for ${slotKey} (${ext}). Allowed: png, jpg, jpeg, webp, avif, gif, svg`,
          },
          { status: 400 },
        );
      }

      const filename = `${slotKey}${ext}`;
      const fileBuffer = Buffer.from(await value.arrayBuffer());

      fs.writeFileSync(path.join(imagesDir, filename), fileBuffer);
      fs.writeFileSync(path.join(publicImagesDir, filename), fileBuffer);
      savedImages.push(filename);
      processedSlots.add(slotKey);

      const altText =
        slotMetadata[slotKey]?.alt || `${title} - ${slotKey.replace(/^image/i, "Image ")}`;

      // Perform regex replacement in MDX content for this slot
      // 1. ![Custom Alt][image1] -> ![Custom Alt](./images/image1.png)
      const refLinkRegex = new RegExp(`!\\[(.*?)\\]\\[\\s*${slotKey}\\s*\\]`, "gi");
      content = content.replace(refLinkRegex, (_match, customAlt) => {
        return `![${customAlt || altText}](./images/${filename})`;
      });

      // 2. ![image1] -> ![altText](./images/image1.png)
      const directImageRegex = new RegExp(`!\\[\\s*${slotKey}\\s*\\](?![\\(\\[])`, "gi");
      content = content.replace(directImageRegex, () => {
        return `![${altText}](./images/${filename})`;
      });

      // 3. Standalone [image1] -> \n\n![altText](./images/image1.png)\n\n
      const standaloneRegex = new RegExp(`(?<!!)\\[\\s*${slotKey}\\s*\\]`, "gi");
      content = content.replace(standaloneRegex, () => {
        return `\n\n![${altText}](./images/${filename})\n\n`;
      });
    }

    // 7. Normalize Frontmatter metadata
    frontmatter.title = title;
    frontmatter.slug = slug;
    if (!frontmatter.date) {
      frontmatter.date = new Date().toISOString().split("T")[0];
    }
    if (!frontmatter.author) {
      frontmatter.author = "Mizanur Rahman Momin";
    }
    if (!frontmatter.category) {
      frontmatter.category = "Guides";
    }
    if (!Array.isArray(frontmatter.tags)) {
      frontmatter.tags = [];
    }
    if (frontmatter.draft === undefined) {
      frontmatter.draft = false;
    }
    if (frontmatter.featured === undefined) {
      frontmatter.featured = false;
    }

    // 8. Write final index.mdx file
    const finalMdx = matter.stringify(content, frontmatter);
    fs.writeFileSync(path.join(postDir, "index.mdx"), finalMdx, "utf8");

    // 9. Revalidate Next.js cache
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return NextResponse.json({
      success: true,
      title,
      slug,
      url: `/blog/${slug}`,
      folderPath: `content/blog/${slug}`,
      imagesSaved: savedImages,
      processedSlots: Array.from(processedSlots),
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Failed to process upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
