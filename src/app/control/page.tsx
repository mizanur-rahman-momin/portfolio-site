"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface ImageSlot {
  key: string;
  file: File | null;
  previewUrl: string | null;
  alt: string;
  isDetected: boolean;
}

interface FrontmatterData {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string;
  author: string;
  date: string;
  draft: boolean;
}

interface ExistingPostSummary {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage?: string;
}

interface PublishSuccessData {
  success: boolean;
  title: string;
  slug: string;
  url: string;
  folderPath: string;
  imagesSaved: string[];
  processedSlots: string[];
}

export default function ControlPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Existing posts state
  const [existingPosts, setExistingPosts] = useState<ExistingPostSummary[]>([]);
  const [showPostsDrawer, setShowPostsDrawer] = useState(false);

  // Form state
  const [mdxFile, setMdxFile] = useState<File | null>(null);
  const [mdxContent, setMdxContent] = useState("");
  const [frontmatter, setFrontmatter] = useState<FrontmatterData>({
    title: "",
    slug: "",
    description: "",
    category: "Guides",
    tags: "",
    author: "Mizanur Rahman Momin",
    date: new Date().toISOString().split("T")[0],
    draft: false,
  });

  // Images state
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [coverAlt, setCoverAlt] = useState("");

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { key: "image1", file: null, previewUrl: null, alt: "", isDetected: false },
    { key: "image2", file: null, previewUrl: null, alt: "", isDetected: false },
    { key: "image3", file: null, previewUrl: null, alt: "", isDetected: false },
  ]);

  // Upload status
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState<PublishSuccessData | null>(null);

  const mdxInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/control/posts");
      const data = await res.json();
      if (data.posts) {
        setExistingPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load existing posts", err);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    let isMounted = true;

    fetch("/api/control/auth")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsAuthenticated(data.authenticated);
          if (data.authenticated) {
            fetch("/api/control/posts")
              .then((r) => r.json())
              .then((d) => {
                if (isMounted && d.posts) {
                  setExistingPosts(d.posts);
                }
              })
              .catch(() => {});
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/control/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchPosts();
      } else {
        setLoginError(data.error || "Incorrect password");
      }
    } catch {
      setLoginError("Failed to connect to authentication service");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/control/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  // Helper: Slugify title
  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Parse MDX content
  const processMdxText = (text: string) => {
    setMdxContent(text);

    // Frontmatter parsing
    const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    const parsedFm: Record<string, string> = {};
    let body = text;

    if (fmMatch) {
      const yaml = fmMatch[1];
      body = fmMatch[2];
      const lines = yaml.split("\n");
      for (const line of lines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim();
          let value = line.slice(colonIdx + 1).trim();
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          parsedFm[key] = value;
        }
      }
    }

    const title = parsedFm.title || frontmatter.title;
    const slug = parsedFm.slug || (title ? generateSlug(title) : frontmatter.slug);

    setFrontmatter((prev) => ({
      ...prev,
      title: title || prev.title,
      slug: slug || prev.slug,
      description: parsedFm.description || prev.description,
      category: parsedFm.category || prev.category,
      tags: parsedFm.tags ? parsedFm.tags.replace(/[\[\]]/g, "").replace(/"/g, "") : prev.tags,
      author: parsedFm.author || prev.author,
      date: parsedFm.date || prev.date,
      draft: parsedFm.draft === "true" || prev.draft,
    }));

    // Detect image placeholders like [image1], [image2], [image3], etc.
    const detected = new Set<string>();
    const placeholderRegex = /\[(image\d+)\]/gi;
    let match;
    while ((match = placeholderRegex.exec(body)) !== null) {
      detected.add(match[1].toLowerCase());
    }

    // Update image slots: ensure each detected placeholder has a slot
    setImageSlots((currentSlots) => {
      const newSlots = [...currentSlots];
      detected.forEach((key) => {
        const existing = newSlots.find((s) => s.key === key);
        if (existing) {
          existing.isDetected = true;
        } else {
          newSlots.push({
            key,
            file: null,
            previewUrl: null,
            alt: "",
            isDetected: true,
          });
        }
      });

      // Mark undetected ones
      newSlots.forEach((slot) => {
        if (!detected.has(slot.key)) {
          slot.isDetected = false;
        }
      });

      // Sort naturally (image1, image2, image3...)
      return newSlots.sort((a, b) => {
        const numA = parseInt(a.key.replace(/\D/g, ""), 10) || 0;
        const numB = parseInt(b.key.replace(/\D/g, ""), 10) || 0;
        return numA - numB;
      });
    });
  };

  const handleMdxFileUpload = (file: File) => {
    setMdxFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) processMdxText(content);
    };
    reader.readAsText(file);
  };

  const handleCoverSelect = (file: File) => {
    setCoverImage(file);
    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    setCoverPreviewUrl(URL.createObjectURL(file));
  };

  const handleSlotImageSelect = (slotKey: string, file: File) => {
    setImageSlots((prev) =>
      prev.map((slot) => {
        if (slot.key === slotKey) {
          if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
          return {
            ...slot,
            file,
            previewUrl: URL.createObjectURL(file),
          };
        }
        return slot;
      }),
    );
  };

  const handleSlotAltChange = (slotKey: string, alt: string) => {
    setImageSlots((prev) => prev.map((slot) => (slot.key === slotKey ? { ...slot, alt } : slot)));
  };

  const handleRemoveSlot = (slotKey: string) => {
    setImageSlots((prev) => {
      const target = prev.find((s) => s.key === slotKey);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((s) => s.key !== slotKey);
    });
  };

  const handleAddSlot = () => {
    const nextIndex = imageSlots.length + 1;
    const newKey = `image${nextIndex}`;
    setImageSlots((prev) => [
      ...prev,
      { key: newKey, file: null, previewUrl: null, alt: "", isDetected: false },
    ]);
  };

  // Submit Post
  const handlePublish = async () => {
    setPublishError("");
    if (!frontmatter.title.trim()) {
      setPublishError("Please provide a title for the blog post.");
      return;
    }
    if (!frontmatter.slug.trim()) {
      setPublishError("Please provide a URL slug for the blog post.");
      return;
    }
    if (!mdxContent.trim() && !mdxFile) {
      setPublishError("Please upload or provide MDX content.");
      return;
    }

    setIsPublishing(true);

    try {
      const formData = new FormData();
      if (mdxFile) {
        formData.append("mdxFile", mdxFile);
      }
      formData.append("mdxText", mdxContent);
      formData.append("title", frontmatter.title);
      formData.append("slug", frontmatter.slug);
      formData.append("description", frontmatter.description);
      formData.append("category", frontmatter.category);
      formData.append("tags", frontmatter.tags);
      formData.append("author", frontmatter.author);
      formData.append("date", frontmatter.date);

      if (coverImage) {
        formData.append("coverImage", coverImage);
        formData.append("coverImageAlt", coverAlt || frontmatter.title);
      }

      // Slot metadata (alt texts)
      const slotMeta: Record<string, { alt?: string }> = {};
      imageSlots.forEach((slot) => {
        if (slot.alt) {
          slotMeta[slot.key] = { alt: slot.alt };
        }
        if (slot.file) {
          formData.append(`image_${slot.key}`, slot.file);
        }
      });
      formData.append("slotMetadata", JSON.stringify(slotMeta));

      const res = await fetch("/api/control/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setPublishSuccess(result);
        fetchPosts();
      } else {
        setPublishError(result.error || "Failed to publish post.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setPublishError(msg);
    } finally {
      setIsPublishing(false);
    }
  };

  const resetForm = () => {
    setMdxFile(null);
    setMdxContent("");
    setFrontmatter({
      title: "",
      slug: "",
      description: "",
      category: "Guides",
      tags: "",
      author: "Mizanur Rahman Momin",
      date: new Date().toISOString().split("T")[0],
      draft: false,
    });
    setCoverImage(null);
    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    setCoverPreviewUrl(null);
    setCoverAlt("");

    imageSlots.forEach((s) => {
      if (s.previewUrl) URL.revokeObjectURL(s.previewUrl);
    });
    setImageSlots([
      { key: "image1", file: null, previewUrl: null, alt: "", isDetected: false },
      { key: "image2", file: null, previewUrl: null, alt: "", isDetected: false },
      { key: "image3", file: null, previewUrl: null, alt: "", isDetected: false },
    ]);
    setPublishSuccess(null);
    setPublishError("");
  };

  // 1. Loading state
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <span className="text-sm text-zinc-400">Loading Control Portal...</span>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 p-4 text-zinc-100 selection:bg-indigo-500 selection:text-white">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 -bottom-40 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />

        <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-inner">
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Blog Control Center</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Enter password to publish MDX posts and manage media
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase"
              >
                Master Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter control password..."
                  required
                  autoFocus
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60"
            >
              {isLoggingIn ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Unlocking Studio...</span>
                </>
              ) : (
                <>
                  <span>Access Studio</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-zinc-800/80 pt-4 text-center">
            <Link href="/" className="text-xs text-zinc-500 transition hover:text-zinc-300">
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check if current slug matches any existing post
  const isSlugExisting = existingPosts.some((p) => p.slug === frontmatter.slug);

  // 3. Authenticated Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-600/20 text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                  Mizanur&apos;s Guide
                </h1>
                <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-400">
                  Publishing Studio
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Folder auto-creation &amp; MDX image placement system
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowPostsDrawer(true)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              <svg
                className="h-3.5 w-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <span>Existing Posts ({existingPosts.length})</span>
            </button>

            <Link
              href="/blog"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 sm:flex"
            >
              <span>Live Blog ↗</span>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Error Alert */}
        {publishError && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{publishError}</span>
            </div>
            <button
              onClick={() => setPublishError("")}
              className="text-xs font-semibold text-red-300 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Uploads & Metadata (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* 1. MDX Dropzone */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">1. Upload MDX Article</h2>
                  <p className="text-xs text-zinc-400">
                    Upload your <code className="text-indigo-300">.mdx</code> file with{" "}
                    <code className="text-indigo-300">[image1]</code>,{" "}
                    <code className="text-indigo-300">[image2]</code> placeholders
                  </p>
                </div>
                {mdxFile && (
                  <button
                    onClick={() => {
                      setMdxFile(null);
                      setMdxContent("");
                    }}
                    className="text-xs text-zinc-500 hover:text-red-400"
                  >
                    Clear File
                  </button>
                )}
              </div>

              <input
                ref={mdxInputRef}
                type="file"
                accept=".mdx,.md"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMdxFileUpload(file);
                }}
                className="hidden"
              />

              {!mdxFile && !mdxContent ? (
                <div
                  onClick={() => mdxInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) handleMdxFileUpload(file);
                  }}
                  className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950/40 p-8 text-center transition hover:border-indigo-500 hover:bg-indigo-500/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-indigo-400 shadow-md">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-medium text-zinc-200">
                    Drag and drop your <span className="text-indigo-400">.mdx</span> file here
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">or click to browse your computer</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-950/60 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {mdxFile?.name || "Uploaded MDX Document"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {mdxFile ? `${(mdxFile.size / 1024).toFixed(1)} KB` : "Pasted / loaded"} •{" "}
                          {mdxContent.length} chars
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => mdxInputRef.current?.click()}
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      Replace File
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Post Frontmatter & Metadata */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-base font-semibold text-white">
                2. Post Information &amp; Folder Target
              </h2>
              <p className="text-xs text-zinc-400">
                The folder <code className="text-indigo-300">content/blog/[slug]</code> will be
                automatically created
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={frontmatter.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setFrontmatter((prev) => ({
                        ...prev,
                        title: newTitle,
                        slug: prev.slug || generateSlug(newTitle),
                      }));
                    }}
                    placeholder="e.g. Plan content around search intent, not word count"
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Folder / URL Slug *
                  </label>
                  <div className="relative mt-1.5 flex items-center">
                    <span className="rounded-l-xl border border-r-0 border-zinc-700 bg-zinc-900 px-3 py-2.5 text-xs text-zinc-400">
                      content/blog/
                    </span>
                    <input
                      type="text"
                      value={frontmatter.slug}
                      onChange={(e) =>
                        setFrontmatter((prev) => ({
                          ...prev,
                          slug: generateSlug(e.target.value),
                        }))
                      }
                      placeholder="post-slug"
                      className="w-full rounded-r-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  {isSlugExisting && (
                    <p className="mt-1 text-xs text-amber-400">
                      ⚠️ Note: A blog post with this slug already exists. Uploading will update it.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={frontmatter.category}
                    onChange={(e) =>
                      setFrontmatter((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="e.g. B2B Strategy, Cold Email, Guides"
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={frontmatter.date}
                    onChange={(e) => setFrontmatter((prev) => ({ ...prev, date: e.target.value }))}
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={frontmatter.tags}
                    onChange={(e) => setFrontmatter((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="e.g. SEO, Cold Email, SaaS, Lead Generation"
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 uppercase">
                    Short Description (SEO &amp; Cards)
                  </label>
                  <textarea
                    rows={2}
                    value={frontmatter.description}
                    onChange={(e) =>
                      setFrontmatter((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief summary of the article for Google & social sharing cards..."
                    className="mt-1.5 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Image Upload Matrix */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    3. Images &amp; Placeholder Replacements
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Upload images below. They will be placed into{" "}
                    <code className="text-indigo-300">images/</code> and mapped to your
                    placeholders.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-400 transition hover:bg-indigo-500/20"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Add Image Slot</span>
                </button>
              </div>

              {/* Cover Image Slot */}
              <div className="mt-5 rounded-xl border border-zinc-700/80 bg-zinc-950/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400">
                      Cover Image
                    </span>
                    <span className="text-xs text-zinc-400">
                      Saved to <code className="text-zinc-300">./images/cover.png</code> (Main card
                      image)
                    </span>
                  </div>
                  {coverImage && (
                    <button
                      onClick={() => {
                        setCoverImage(null);
                        if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
                        setCoverPreviewUrl(null);
                      }}
                      className="text-xs text-zinc-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverSelect(file);
                  }}
                  className="hidden"
                />

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                  <div className="sm:col-span-4">
                    {coverPreviewUrl ? (
                      <div className="group relative aspect-video overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverPreviewUrl}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100"
                        >
                          Change Cover
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => coverInputRef.current?.click()}
                        className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-3 text-center transition hover:border-amber-500 hover:bg-amber-500/5"
                      >
                        <svg
                          className="h-6 w-6 text-amber-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="mt-1 text-xs text-zinc-300">Select Cover Image</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8">
                    <label className="block text-xs font-medium text-zinc-400">
                      Cover Image Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={coverAlt}
                      onChange={(e) => setCoverAlt(e.target.value)}
                      placeholder={frontmatter.title || "Description of cover image..."}
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
                    />
                    <p className="mt-1 text-[11px] text-zinc-500">
                      Recommended: 1200x630 or 16:9 ratio PNG, JPG, or WebP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder slots list */}
              <div className="mt-4 space-y-3">
                {imageSlots.map((slot) => {
                  return (
                    <div
                      key={slot.key}
                      className={`rounded-xl border p-4 transition ${
                        slot.isDetected
                          ? "border-indigo-500/40 bg-zinc-950/60"
                          : "border-zinc-800 bg-zinc-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-indigo-500/30 bg-indigo-500/20 px-2 py-0.5 font-mono text-xs font-bold text-indigo-300">
                            [{slot.key}]
                          </span>
                          <span className="text-xs text-zinc-400">
                            Replaces <code className="text-zinc-200">[{slot.key}]</code> with{" "}
                            <code className="text-zinc-200">
                              ./images/{slot.key}.
                              {slot.file ? slot.file.name.split(".").pop() : "png"}
                            </code>
                          </span>
                          {slot.isDetected && (
                            <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                              Detected in MDX
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(slot.key)}
                          className="text-xs text-zinc-500 hover:text-red-400"
                        >
                          Remove Slot
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                        <div className="sm:col-span-4">
                          {slot.previewUrl ? (
                            <div className="group relative aspect-video overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={slot.previewUrl}
                                alt={`Slot ${slot.key}`}
                                className="h-full w-full object-cover"
                              />
                              <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                                Replace Image
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleSlotImageSelect(slot.key, file);
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          ) : (
                            <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900/50 p-2 text-center transition hover:border-indigo-500 hover:bg-indigo-500/5">
                              <svg
                                className="h-5 w-5 text-indigo-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <span className="mt-1 text-xs text-zinc-300">
                                Upload image for [{slot.key}]
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleSlotImageSelect(slot.key, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>

                        <div className="sm:col-span-8">
                          <label className="block text-xs font-medium text-zinc-400">
                            Alt Text / Description for [{slot.key}]
                          </label>
                          <input
                            type="text"
                            value={slot.alt}
                            onChange={(e) => handleSlotAltChange(slot.key, e.target.value)}
                            placeholder={`Description for ${slot.key}...`}
                            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-100 focus:border-indigo-500 focus:outline-none"
                          />
                          <p className="mt-1 text-[11px] text-zinc-500">
                            MDX insertion:{" "}
                            <code className="text-zinc-400">
                              ![{slot.alt || slot.key}](./images/{slot.key}.png)
                            </code>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Checklist & Publish Actions (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Publish Action Card */}
            <div className="sticky top-20 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-bold tracking-wider text-zinc-300 uppercase">
                Publishing Actions
              </h3>

              <div className="mt-4 space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Target Folder:</span>
                  <span className="font-mono text-indigo-400">
                    {frontmatter.slug ? `content/blog/${frontmatter.slug}` : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Cover Image:</span>
                  <span className={coverImage ? "text-emerald-400" : "text-zinc-500"}>
                    {coverImage ? "✓ Attached" : "None"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Images Uploaded:</span>
                  <span className="text-zinc-200">
                    {imageSlots.filter((s) => s.file !== null).length} / {imageSlots.length}
                  </span>
                </div>
              </div>

              {/* Placeholders Health Check */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-zinc-400 uppercase">Placeholders in MDX</p>
                <div className="mt-2 space-y-1.5">
                  {imageSlots
                    .filter((s) => s.isDetected)
                    .map((slot) => (
                      <div
                        key={slot.key}
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-xs"
                      >
                        <span className="font-mono text-zinc-300">[{slot.key}]</span>
                        {slot.file ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Ready
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-400">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01"
                              />
                            </svg>
                            Missing image
                          </span>
                        )}
                      </div>
                    ))}
                  {imageSlots.filter((s) => s.isDetected).length === 0 && (
                    <p className="text-xs text-zinc-500 italic">
                      Upload an MDX file containing placeholders like [image1] to detect them
                      automatically.
                    </p>
                  )}
                </div>
              </div>

              {/* Publish Button */}
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || !frontmatter.title || !frontmatter.slug}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Publishing &amp; Creating Folder...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span>Publish Blog Post</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="mt-3 w-full rounded-xl border border-zinc-800 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              >
                Reset All Fields
              </button>
            </div>

            {/* Syntax Reference Guide */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5 text-xs text-zinc-400">
              <h4 className="font-semibold text-zinc-200">How Placeholder Replacement Works</h4>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400">•</span>
                  <span>
                    In your MDX text, write{" "}
                    <code className="font-mono text-zinc-200">[image1]</code> on a new line where
                    you want the image to appear.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400">•</span>
                  <span>
                    You can also write{" "}
                    <code className="font-mono text-zinc-200">![Custom caption][image1]</code> to
                    specify inline alt text.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400">•</span>
                  <span>
                    The system creates{" "}
                    <code className="font-mono text-zinc-200">
                      content/blog/&lt;slug&gt;/images/
                    </code>{" "}
                    and copies images so they are live immediately.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {publishSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-emerald-500/30 bg-zinc-900 p-8 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">Post Successfully Published!</h3>
              <p className="mt-1 text-sm text-zinc-400">&ldquo;{publishSuccess.title}&rdquo;</p>
            </div>

            <div className="mt-6 space-y-2 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Folder:</span>
                <span className="text-indigo-400">{publishSuccess.folderPath}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Images saved:</span>
                <span className="text-zinc-300">
                  {publishSuccess.imagesSaved?.length || 0} files
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Public URL:</span>
                <span className="text-emerald-400">{publishSuccess.url}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={publishSuccess.url}
                target="_blank"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500"
              >
                <span>View Live Article ↗</span>
              </Link>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-700"
              >
                Upload Another Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer: Existing Posts */}
      {showPostsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="h-full w-full max-w-md overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white">Existing Blog Posts</h3>
              <button
                onClick={() => setShowPostsDrawer(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {existingPosts.map((post) => (
                <div
                  key={post.slug}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition hover:border-zinc-700"
                >
                  <p className="text-sm font-semibold text-white">{post.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{post.category}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-zinc-500">/blog/{post.slug}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      View ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
