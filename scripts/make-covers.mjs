import { readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = "vibe_images";
const dest = "public/covers";
mkdirSync(dest, { recursive: true });

const map = {
  skillohub: "skillhub",
  "zoo-management": "zoo-management-system",
  "job-portal": "job-portal",
  "shop-management": "shop-management",
  devvault: "devvault",
  "jobmatch-bd": "jobmatch-bd",
  gridwise: "gridwise-llm",
  "financial-risk": "financial-risk",
  expvishing: "expvishing",
  contest: "programming-contest",
  "vishing-notebook": "vishing-notebook",
};

for (const file of readdirSync(src)) {
  if (!file.endsWith(".png")) continue;
  const slug = file.split("_")[0].replace(/^cover-/, "");
  const name = map[slug];
  if (!name) {
    console.log("skip", file);
    continue;
  }
  const info = await sharp(path.join(src, file))
    // 7:3 matches the card's cover band, so the browser never crops again
    .resize({ width: 1280, height: 549, fit: "cover", position: "centre" })
    .toColorspace("srgb")
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(path.join(dest, `${name}.jpg`));
  console.log(`${name}.jpg ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}
