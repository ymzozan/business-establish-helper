import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images");

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required.");
  console.error("Usage: GEMINI_API_KEY=your_key node scripts/generate-images.mjs");
  process.exit(1);
}

// Try multiple models in order of preference
const MODELS = [
  {
    name: "gemini-3.1-flash-image-preview",
    type: "gemini",
  },
  {
    name: "gemini-3-pro-image-preview",
    type: "gemini",
  },
  {
    name: "gemini-2.5-flash-image",
    type: "gemini",
  },
];

const images = [
  {
    filename: "logo.png",
    prompt:
      "Design a minimal, modern jewelry store logo icon. Feature a stylized gold diamond or gem motif. Use warm coral (#cc785c) as the primary color with cream (#faf9f5) accents and dark navy (#181715) outlines. Flat solid background in cream. Clean vector-style aesthetic, no text, no gradients, simple geometric shapes. Square composition, centered. Professional brand mark suitable for a jewelry automation platform.",
  },
  {
    filename: "hero-illustration.png",
    prompt:
      "Create an editorial line-art illustration showing a jewelry shop merging with a digital dashboard interface. On the left side, a jewelry display case with necklaces and rings in simple line art. On the right, a modern digital dashboard with charts and data. The two sides blend together seamlessly. Use coral (#cc785c) and dark navy (#181715) strokes on a cream (#faf9f5) background. Minimal, modern editorial illustration style. No text. Clean lines, sparse detail, elegant composition.",
  },
  {
    filename: "avatar-1.png",
    prompt:
      "Professional headshot portrait photo of a man in his 40s with dark hair and brown eyes. Warm studio lighting, slight smile, wearing a smart casual shirt. Clean neutral background with warm tones. High quality, photorealistic, professional business portrait. Square crop, centered face.",
  },
  {
    filename: "avatar-2.png",
    prompt:
      "Professional headshot portrait photo of a woman in her 30s with dark brown hair. Warm studio lighting, friendly expression, wearing professional attire. Clean neutral background with warm tones. High quality, photorealistic, professional business portrait. Square crop, centered face.",
  },
  {
    filename: "avatar-3.png",
    prompt:
      "Professional headshot portrait photo of a man in his 50s with slightly graying hair. Warm studio lighting, confident expression, wearing a suit jacket. Clean neutral background with warm tones. High quality, photorealistic, professional business portrait. Square crop, centered face.",
  },
  {
    filename: "cta-pattern.png",
    prompt:
      "Abstract gold texture pattern with bokeh light effects. Warm coral and gold tones dominating the center, with darker edges fading to near black. Luxurious, elegant feel suitable for a call-to-action background overlay. Soft glowing particles, out-of-focus golden highlights. No text, no objects, purely abstract texture. Wide 16:9 aspect ratio.",
  },
];

async function generateWithImagen(entry, modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:predict?key=${API_KEY}`;
  const body = {
    instances: [{ prompt: entry.prompt }],
    parameters: {
      sampleCount: 1,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const prediction = json.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) {
    throw new Error("No image data in Imagen response");
  }

  return Buffer.from(prediction.bytesBase64Encoded, "base64");
}

async function generateWithGemini(entry, modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: entry.prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const imagePart = json.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.mimeType?.startsWith("image/")
  );

  if (!imagePart) {
    throw new Error("No image data in Gemini response");
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function generateImage(entry) {
  for (const model of MODELS) {
    console.log(`  Trying ${model.name}...`);
    try {
      const buffer =
        model.type === "imagen"
          ? await generateWithImagen(entry, model.name)
          : await generateWithGemini(entry, model.name);

      const outPath = path.join(OUTPUT_DIR, entry.filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`  ✓ Saved ${entry.filename} (${(buffer.length / 1024).toFixed(1)} KB) via ${model.name}`);
      return true;
    } catch (err) {
      console.warn(`  ✗ ${model.name} failed: ${err.message}`);
    }
  }
  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  let success = 0;
  let failed = 0;

  for (const entry of images) {
    console.log(`\n[${entry.filename}]`);
    const ok = await generateImage(entry);
    if (ok) {
      success++;
    } else {
      console.error(`  All models failed for ${entry.filename}`);
      failed++;
    }
    // Rate limiting
    await sleep(5000);
  }

  console.log(`\nDone! ${success} succeeded, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main();
