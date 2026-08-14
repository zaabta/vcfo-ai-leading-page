/**
 * Generates the Open Graph / social preview images at build time:
 *  - public/og/default.png            (site-wide image, ar/en neutral)
 *  - public/og/blog/{slug}-{ar|en}.png (per-article, per-locale images)
 *
 * Pure SVG → PNG via sharp; fonts come from the @expo-google-fonts packages
 * in devDependencies (bundled in node_modules — no network access needed).
 * Run automatically before `next build` (prebuild), or via `npm run og`.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;

const FONT_DIR = path.join(ROOT, "src", "assets", "fonts");
const FONT_PATHS = {
  ar: {
    regular: path.join(FONT_DIR, "NotoSansArabic_400Regular.ttf"),
    bold: path.join(FONT_DIR, "NotoSansArabic_700Bold.ttf"),
    semibold: path.join(FONT_DIR, "NotoSansArabic_600SemiBold.ttf"),
  },
  latin: {
    regular: path.join(FONT_DIR, "IBMPlexSans_400Regular.ttf"),
    semibold: path.join(FONT_DIR, "IBMPlexSans_600SemiBold.ttf"),
    bold: path.join(FONT_DIR, "IBMPlexSans_700Bold.ttf"),
  },
};

const BRAND = {
  bg: "#0c1716",
  bg2: "#102f2c",
  card: "#0e1d1b",
  stroke: "#2d6d63",
  ink: "#f4fffd",
  muted: "#bfeae0",
  teal: "#73f3dc",
  soft: "#d9fff7",
  dark: "#1d574f",
};

function svg(body, { fonts = `${FONT_PATHS.latin.semibold}, ${FONT_PATHS.ar.semibold}` } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <style>
      text { font-family: ${fonts}; }
    </style>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${BRAND.bg}"/>
      <stop offset="100%" stop-color="${BRAND.bg2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${BRAND.soft}"/>
      <stop offset="100%" stop-color="#1f8578"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="28" fill="url(#bg)"/>
  ${body}
</svg>`;
}

function mark(x, y, size = 96) {
  const s = size / 64;
  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <rect width="64" height="64" rx="16" fill="#101d1b" stroke="${BRAND.stroke}" stroke-width="3"/>
    <path d="M18 40.5V24.8c0-2.3 1.8-4.1 4.1-4.1h19.8c2.3 0 4.1 1.8 4.1 4.1v15.7h-6.8V29.2H24.8v11.3H18z" fill="url(#accent)"/>
    <path d="M28.5 17.5h7v8.2h-7z" fill="${BRAND.soft}"/>
    <path d="M26 44.8h12v4.2H26zm-4-9.5h20v4.2H22z" fill="${BRAND.soft}" opacity="0.9"/>
  </g>`;
}

function chart(x, y, w, h) {
  return `
  <g transform="translate(${x},${y})">
    <rect width="${w}" height="${h}" rx="24" fill="${BRAND.card}" stroke="${BRAND.stroke}" stroke-width="2"/>
    <path d="M ${x + 50} ${y + h - 66} L ${x + 118} ${y + h - 130} L ${x + 172} ${y + h - 96} L ${x + 229} ${y + h - 162} L ${x + 329} ${y + h - 84}"
      fill="none" stroke="${BRAND.teal}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${x + 48} ${y + h - 58} C ${x + 96} ${y + h - 138}, ${x + 148} ${y + h - 172}, ${x + 199} ${y + h - 168} C ${x + 250} ${y + h - 164}, ${x + 300} ${y + h - 108}, ${x + 348} ${y + h - 108}"
      fill="none" stroke="${BRAND.soft}" stroke-width="6" stroke-dasharray="10 12" opacity="0.75"/>
    <rect x="${x + 40}" y="${y + 32}" width="130" height="56" rx="14" fill="${BRAND.dark}"/>
    <text x="${x + 105}" y="${y + 71}" fill="#e7fffb" font-size="26" text-anchor="middle">+9.2%</text>
  </g>`;
}

function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 3);
}

async function render(name, body, fonts) {
  const file = path.join(ROOT, "public", "og", name);
  await mkdir(path.dirname(file), { recursive: true });
  const buf = await sharp(Buffer.from(svg(body, { fonts })))
    .png()
    .toBuffer();
  await writeFile(file, buf);
  console.log("  ✓", path.relative(ROOT, file), `(${buf.length} bytes)`);
}

async function main() {
  console.log("Generating Open Graph images…");

  // 1) Default brand image
  await render(
    "default.png",
    `
  ${mark(86, 84)}
  <text x="86" y="364" fill="${BRAND.ink}" font-size="72" font-weight="700">VCFO</text>
  <text x="86" y="445" fill="${BRAND.muted}" font-size="40" font-weight="600">Financial Truth</text>
  <text x="86" y="510" fill="${BRAND.soft}" font-size="30">Financial Intelligence Platform</text>
  ${chart(728, 118, 386, 260)}
  `,
  );

  // 2) Per-article, per-locale images
  const { posts } = JSON.parse(
    await readFile(path.join(ROOT, "src", "content", "blog", "posts.json"), "utf8"),
  );

  for (const locale of ["ar", "en"]) {
    const rtl = locale === "ar";
    const fonts = rtl
      ? `${FONT_PATHS.ar.bold}, ${FONT_PATHS.latin.bold}`
      : `${FONT_PATHS.latin.bold}, ${FONT_PATHS.ar.bold}`;

    for (const post of posts) {
      const title = rtl ? post.titleAr : post.titleEn;
      const lines = wrap(title, rtl ? 34 : 42);
      const lineH = 64;
      const startY = 300 - ((lines.length - 1) * lineH) / 2;

      const titleXml = lines
        .map(
          (line, i) =>
            `<text x="${rtl ? WIDTH - 86 : 86}" y="${startY + i * lineH}" fill="${BRAND.ink}" font-size="44" font-weight="700" ${rtl ? 'text-anchor="end"' : ""}>${line}</text>`,
        )
        .join("\n");

      await render(
        `blog/${post.slug}-${locale}.png`,
        `
  ${mark(86, 70, 72)}
  <text x="86" y="126" fill="${BRAND.teal}" font-size="24" font-weight="600" letter-spacing="6">VCFO BLOG</text>
  ${titleXml}
  <rect x="${rtl ? WIDTH - 86 - 180 : 86}" y="500" width="180" height="8" rx="4" fill="${BRAND.teal}"/>
  `,
        fonts,
      );
    }
  }

  console.log("Open Graph images generated.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
