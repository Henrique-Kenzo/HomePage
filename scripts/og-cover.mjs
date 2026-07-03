// Gera public/og-cover.jpg (1200×630) — imagem padrão de compartilhamento (og:image).
// Uso: node scripts/og-cover.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HERO = path.join(root, "src", "assets", "neural-hero.jpg");
const OUT = path.join(root, "public", "og-cover.jpg");

const W = 1200;
const H = 630;

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070907" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#070907" stop-opacity="0.78"/>
      <stop offset="1" stop-color="#070907" stop-opacity="0.94"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="60" y="132" width="46" height="4" fill="#B6F34A"/>
  <text x="60" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="30" letter-spacing="10" fill="#B6F34A" font-weight="600">KENZO.DEV</text>
  <text x="56" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="92" fill="#F4F7F0" font-weight="700">Henrique Kenzo</text>
  <text x="60" y="396" font-family="Segoe UI, Arial, sans-serif" font-size="40" fill="#F4F7F0" fill-opacity="0.82">Desenvolvedor de Software Full-Stack</text>
  <text x="60" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#B6F34A" fill-opacity="0.9">Sistemas web · ERPs industriais · Automação · IA</text>
  <text x="60" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#F4F7F0" fill-opacity="0.5">henriquekenzo.space</text>
</svg>`;

const base = await sharp(HERO).resize(W, H, { fit: "cover" }).toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

console.log(`ok: ${OUT}`);
