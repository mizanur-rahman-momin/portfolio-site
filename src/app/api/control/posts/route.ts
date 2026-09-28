import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/content/blog";
import { isAuthenticated } from "@/lib/control/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = getAllBlogPosts().map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      category: post.frontmatter.category,
      coverImage: post.frontmatter.coverImage,
    }));

    return NextResponse.json({ posts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load posts";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
