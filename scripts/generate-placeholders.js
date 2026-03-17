#!/usr/bin/env node
// scripts/generate-placeholders.js
// Run once with: node scripts/generate-placeholders.js
// Generates minimal placeholder PNGs so the app builds without missing asset errors.

const fs   = require("fs");
const path = require("path");

// Tiny 1x1 transparent PNG (base64)
const TRANSPARENT_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

// 1x1 dark PNG for splash
const DARK_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkkP+vBwACtgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

const assetsDir = path.join(__dirname, "..", "assets", "images");
fs.mkdirSync(assetsDir, { recursive: true });

const files = {
  "icon.png":          TRANSPARENT_PNG,
  "splash.png":        DARK_PNG,
  "adaptive-icon.png": TRANSPARENT_PNG,
  "favicon.png":       TRANSPARENT_PNG,
};

for (const [filename, data] of Object.entries(files)) {
  const filePath = path.join(assetsDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data);
    console.log(`✅ Created: assets/images/${filename}`);
  } else {
    console.log(`⏭  Exists:  assets/images/${filename}`);
  }
}

console.log("\n🎉 Placeholder assets ready. Replace with real images before publishing.");
