#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency)
const envFile = await fs.readFile(path.join(__dirname, "..", ".env.local"), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const val = match[2].trim().replace(/^["']|["']$/g, "");
    process.env[key] = process.env[key] || val;
  }
}

const { generateImage } = await import("ai");
const { createGateway } = await import("@ai-sdk/gateway");

const gateway = createGateway({
  apiKey: process.env.EVATA_API_KEY,
  baseURL: "https://ai-gateway.vercel.sh/v1/ai",
});

const outDir = path.join(__dirname, "..", "public", "products");

const products = [
  {
    name: "miao-silver-jacket",
    prompt:
      "Miao ethnic silver embroidered jacket displayed on mannequin, traditional Guizhou handcraft, intricate silver ornaments on dark navy blue fabric, elaborate embroidery patterns, studio product photo, white background, professional e-commerce photography, high detail, soft lighting",
  },
  {
    name: "dong-indigo-dress",
    prompt:
      "Traditional Dong ethnic indigo-dyed dress, natural deep blue color, handwoven cotton fabric with subtle patterns, full-length traditional Chinese minority clothing, studio product shot, white background, professional lighting, e-commerce style",
  },
  {
    name: "batik-silk-scarf",
    prompt:
      "Guizhou batik silk scarf elegantly draped, traditional wax-resist indigo blue and white patterns, geometric and floral motifs, pure silk fabric with natural sheen, product photography, white background, high detail",
  },
  {
    name: "phoenix-necklace",
    prompt:
      "Miao ethnic silver phoenix necklace, elaborate traditional Chinese minority jewelry, intricate filigree phoenix motif, sterling silver craftsmanship, statement piece, product photography on white background, close-up detail shot, professional lighting",
  },
  {
    name: "filigree-bracelet",
    prompt:
      "Guizhou silver filigree bracelet, delicate traditional Chinese ethnic metalwork, intricate wire patterns, 925 sterling silver, artisan handcrafted, product photography, white background, macro detail shot",
  },
  {
    name: "embroidered-earrings",
    prompt:
      "Miao ethnic embroidered earrings, combination of silver metalwork and hand-embroidered colorful textile elements, lightweight dangle style, traditional Chinese minority jewelry, product photography, white background, detail shot",
  },
  {
    name: "korean-red-ginseng",
    prompt:
      "Premium Korean red ginseng extract in elegant dark amber glass bottle, traditional Korean herbal supplement, luxury packaging with gold accents, 6-year root extract label, product photography, white background, professional lighting",
  },
  {
    name: "ginseng-tea-gift-set",
    prompt:
      "Korean ginseng tea gift set in premium wooden box, individually wrapped tea sachets, elegant traditional Korean packaging design, gold and red colors, luxury gift presentation, product photography, white background",
  },
];

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  console.log(`API key: ${process.env.EVATA_API_KEY?.slice(0, 8)}...`);
  console.log(`Output: ${outDir}`);
  console.log(`Generating ${products.length} product images...\n`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const outPath = path.join(outDir, `${product.name}.png`);

    // Skip if already exists
    try {
      await fs.access(outPath);
      console.log(`⏭  [${i + 1}/${products.length}] ${product.name}.png already exists, skipping`);
      continue;
    } catch {}

    console.log(`🎨 [${i + 1}/${products.length}] Generating ${product.name}...`);
    try {
      const { image } = await generateImage({
        model: gateway.image("openai/gpt-image-1"),
        prompt: product.prompt,
        size: "1024x1024",
      });

      const buffer = Buffer.from(image.base64, "base64");
      await fs.writeFile(outPath, buffer);
      console.log(`✅ ${product.name}.png saved (${(buffer.length / 1024).toFixed(0)} KB)\n`);
    } catch (err) {
      console.error(`❌ ${product.name}: ${err.message}\n`);
    }
  }

  console.log("Done! Images saved to public/products/");
}

main();
