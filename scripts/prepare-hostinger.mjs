import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const standalone = path.join(root, ".next", "standalone");

if (!fs.existsSync(standalone)) {
  console.error("❌ .next/standalone not found. Run 'npm run build' first.");
  process.exit(1);
}

console.log("📦 Preparing Hostinger deployment bundle...");

// 1. Copy public directory to .next/standalone/public
const publicSrc = path.join(root, "public");
const publicDest = path.join(standalone, "public");
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log("✓ Copied public/ into .next/standalone/public");
}

// 2. Copy .next/static to .next/standalone/.next/static
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(standalone, ".next", "static");
if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log("✓ Copied .next/static into .next/standalone/.next/static");
}

// 3. Copy content directory for blog/project markdown and assets
const contentSrc = path.join(root, "content");
const contentDest = path.join(standalone, "content");
if (fs.existsSync(contentSrc)) {
  fs.cpSync(contentSrc, contentDest, { recursive: true });
  console.log("✓ Copied content/ into .next/standalone/content");
}

// 4. Copy .env.local to standalone .env if present
const envLocal = path.join(root, ".env.local");
const envDest = path.join(standalone, ".env");
if (fs.existsSync(envLocal)) {
  fs.copyFileSync(envLocal, envDest);
  console.log("✓ Copied .env.local into .next/standalone/.env");
}

// 5. Create hostinger-deploy.zip from .next/standalone
const zipFile = path.join(root, "hostinger-deploy.zip");
try {
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }
  console.log("🤐 Compressing into hostinger-deploy.zip...");
  execSync(`cd "${standalone}" && zip -q -r "${zipFile}" .`, { stdio: "inherit" });
  const stats = fs.statSync(zipFile);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 Success! Created hostinger-deploy.zip (${sizeMb} MB) in project root.`);
  console.log(
    "You can now upload hostinger-deploy.zip directly to Hostinger File Manager and extract it!\n",
  );
} catch (err) {
  console.error("Warning: Failed to create zip archive:", err);
  console.log("You can manually zip the contents of .next/standalone/");
}
