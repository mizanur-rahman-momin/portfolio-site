import { execSync } from "node:child_process";

// 1. Sync content images to public/content for next/image static serving
try {
  execSync("node scripts/sync-content-images.mjs", { stdio: "inherit" });
} catch (error) {
  console.error("[prebuild] Failed to sync content images:", error);
  process.exit(1);
}
