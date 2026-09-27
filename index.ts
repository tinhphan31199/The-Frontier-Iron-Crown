import { fal } from "@fal-ai/client";
import { readFileSync, writeFileSync } from "node:fs";

fal.config({
  credentials: process.env.FAL_KEY,
});

// ---- Types ----

export type FalImageModel =
  | "fal-ai/flux/schnell"
  | "fal-ai/flux/dev"
  | "fal-ai/flux-pro"
  | "fal-ai/flux-realism"
  | "fal-ai/stable-diffusion-v35-large"
  | "fal-ai/recraft-v3"
  | "fal-ai/ideogram/v2"
  | "fal-ai/hidream-i1-full"
  | "fal-ai/hidream-i1-fast"
  | (string & {});

export type ImageSize = { width: number; height: number } | string;

export interface GenerateImageOptions {
  prompt: string;
  model?: FalImageModel;
  imageSize?: ImageSize;
  numImages?: number;
  seed?: number;
  negativePrompt?: string;
  guidanceScale?: number;
  numInferenceSteps?: number;
  enableSafetyChecker?: boolean;
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

export interface GenerateImageResult {
  images: GeneratedImage[];
  seed: number;
  prompt: string;
  timings: { inference: number };
}

// ---- Format constants (từ motaanh/fal-format.md) ----

const DEFAULT_NEGATIVE_PROMPT = [
  "photorealistic, hyper realistic, semi realistic",
  "3D, CGI, octane render, unreal engine, ray tracing",
  "photography, DSLR, camera, lens, film",
  "oil painting, watercolor, sketch, Pixar",
  "western comic, low quality, blur",
  "extra fingers, bad anatomy, duplicate character",
  "watermark, logo, signature, text",
  "skin pores, real hair, real eyelashes",
  "plastic skin, neon colors, oversaturated",
].join(", ");

const STYLE_KEYWORDS = [
  "Korean webtoon style",
  "2D anime illustration",
  "clean line art",
  "thin black outline",
  "flat anime coloring",
  "soft cel shading",
  "comic panel composition",
  "graphic novel illustration",
];

const QUALITY_KEYWORDS = [
  "masterpiece",
  "best quality",
  "highly detailed",
  "sharp focus",
  "professional coloring",
];

const MODEL_DEFAULTS: Record<string, Partial<GenerateImageOptions>> = {
  "fal-ai/flux/schnell": {
    numInferenceSteps: 4,
    guidanceScale: 3.5,
  },
  "fal-ai/hidream-i1-full": {
    numInferenceSteps: 50,
    guidanceScale: 5,
  },
  "fal-ai/hidream-i1-fast": {
    numInferenceSteps: 16,
    guidanceScale: 5,
  },
};

const DEFAULTS = {
  model: "fal-ai/flux/schnell" as FalImageModel,
  imageSize: { width: 864, height: 1152 } as ImageSize,
  numImages: 1,
  enableSafetyChecker: false,
  negativePrompt: DEFAULT_NEGATIVE_PROMPT,
};

// ---- Helpers ----

export function buildPrompt(
  sceneDescription: string,
  extraKeywords?: string[]
): string {
  const parts = [sceneDescription.trim()];

  if (extraKeywords?.length) parts.push(...extraKeywords);

  parts.push(...STYLE_KEYWORDS);
  parts.push(...QUALITY_KEYWORDS);

  return parts.join(", ");
}

// ---- API functions ----

export async function generateImage(
  sceneDescription: string,
  options?: Partial<GenerateImageOptions>
): Promise<GenerateImageResult> {
  const opts = { ...DEFAULTS, ...MODEL_DEFAULTS[options?.model ?? ""], ...options };
  const prompt = buildPrompt(sceneDescription);

  const { data } = await fal.subscribe(opts.model, {
    input: {
      prompt,
      image_size: opts.imageSize,
      num_images: opts.numImages,
      seed: opts.seed,
      negative_prompt: opts.negativePrompt,
      guidance_scale: opts.guidanceScale,
      num_inference_steps: opts.numInferenceSteps,
      enable_safety_checker: opts.enableSafetyChecker,
    },
  });

  const result = data as {
    images: GeneratedImage[];
    seed: number;
    prompt: string;
    timings: { inference: number };
  };

  return {
    images: result.images.map((img) => ({
      url: img.url,
      width: img.width,
      height: img.height,
      content_type: img.content_type,
    })),
    seed: result.seed,
    prompt: result.prompt,
    timings: result.timings,
  };
}

export async function uploadImage(filePath: string): Promise<string> {
  const { url } = await fal.storage.upload(filePath);
  return url;
}

// ---- CLI ----

if (import.meta.main) {
  const usage = () => {
    console.error("Usage: bun run index.ts <prompt|file> [options]");
    console.error(
      "  prompt                 Scene description text or path to .md file",
    );
    console.error("  --model <name>         Model (default: flux/schnell, e.g. hidream-i1-full)");
    console.error("  --size <wxh>           Image size (default: 864x1152)");
    console.error("  --negative <text>      Override negative prompt");
    console.error("  --seed <n>             Seed for reproducibility");
    console.error("  --output <path>        Download image to file");
    process.exit(1);
  };

  const arg = process.argv[2];
  if (!arg) usage();

  // Nếu arg là file .md thì đọc nội dung
  const sceneText = arg.endsWith(".md")
    ? readFileSync(arg, "utf-8")
        .replace(/---[\s\S]*?---\n?/, "")
        .trim()
    : arg;

  // Parse options
  const opts: Partial<GenerateImageOptions> = {};

  const modelIdx = process.argv.indexOf("--model");
  if (modelIdx !== -1) opts.model = process.argv[modelIdx + 1] as FalImageModel;

  const sizeIdx = process.argv.indexOf("--size");
  if (sizeIdx !== -1) {
    const sizeStr = process.argv[sizeIdx + 1];
    const match = sizeStr.match(/^(\d+)x(\d+)$/);
    if (match) {
      opts.imageSize = { width: Number(match[1]), height: Number(match[2]) };
    } else {
      opts.imageSize = sizeStr;
    }
  }

  const negIdx = process.argv.indexOf("--negative");
  if (negIdx !== -1) opts.negativePrompt = process.argv[negIdx + 1];

  const seedIdx = process.argv.indexOf("--seed");
  if (seedIdx !== -1) opts.seed = Number(process.argv[seedIdx + 1]);

  const promptAfter = buildPrompt(sceneText);
  console.error("─── PROMPT ───");
  console.error(promptAfter);
  console.error("──────────────");

  const result = await generateImage(sceneText, opts);
  console.log(JSON.stringify(result, null, 2));

  // Download nếu có --output
  const outIdx = process.argv.indexOf("--output");
  if (outIdx !== -1) {
    const outPath = process.argv[outIdx + 1];
    const resp = await fetch(result.images[0].url);
    const buffer = await resp.arrayBuffer();
    writeFileSync(outPath, Buffer.from(buffer));
    console.error(`Saved: ${outPath}`);
  }
}
