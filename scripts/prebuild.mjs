import { execSync } from "node:child_process";

// 1. Try to generate blog covers if python3 & pycairo are available
try {
  execSync("python3 scripts/generate-blog-covers.py", { stdio: "inherit" });
} catch {
  console.log("[prebuild] Skipping cover generation; existing covers will be used.");
}

// 2. Sync content images to public/content for next/image static serving
try {
  execSync("node scripts/sync-content-images.mjs", { stdio: "inherit" });
} catch (error) {
  console.error("[prebuild] Failed to sync content images:", error);
  process.exit(1);
}
