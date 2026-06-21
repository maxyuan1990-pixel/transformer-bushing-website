import fs from "node:fs";

const html = fs.readFileSync("qx-about-source.html", "utf8");
const start = html.indexOf("ABOUT US");
const footer = html.indexOf("CONTACT US", start);
const body = html.slice(start, footer > start ? footer : undefined);

const imgRe = /<img\b[^>]*>/gi;
let index = 0;
for (const match of body.matchAll(imgRe)) {
  const tag = match[0];
  const get = (name) => {
    const found = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
    return found?.[1] ?? "";
  };
  const src = get("data-src") || get("src");
  const webp = get("data-webp");
  const alt = get("alt");
  if (!src && !webp) continue;
  const context = body
    .slice(Math.max(0, match.index - 500), match.index + tag.length + 500)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  console.log(`${String(++index).padStart(2, "0")}`);
  console.log(`alt: ${alt}`);
  console.log(`src: ${src}`);
  console.log(`webp: ${webp}`);
  console.log(`context: ${context.slice(0, 500)}`);
  console.log("---");
}
