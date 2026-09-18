/**
 * One-off: crop the circular TNF emblem from public/tnf-logo.png and
 * generate favicon / app icons in src/app.
 * Run from tnf-web: node scripts/make-favicon.mjs
 */
import sharp from "sharp";

const SRC = "public/tnf-logo.png";

// Emblem occupies roughly the left 842x842 square of the 2126x842 logo.
const emblem = sharp(SRC).extract({ left: 0, top: 0, width: 842, height: 842 });

// 512px transparent icon (Google favicon + PWA)
await emblem
  .clone()
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("src/app/icon.png");

// 180px apple touch icon on white (iOS dislikes transparency)
await emblem
  .clone()
  .resize(160, 160, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: { r: 255, g: 255, b: 255 } })
  .png()
  .toFile("src/app/apple-icon.png");

// 48px PNG served as /favicon.ico (browsers and Google accept PNG data here)
await emblem
  .clone()
  .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("src/app/favicon.ico");

console.log("Icons written to src/app: icon.png, apple-icon.png, favicon.ico");
