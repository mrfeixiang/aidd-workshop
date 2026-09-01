// ① 风格化 —— 基于 Canvas 的滤镜预设
// 全部在浏览器本地完成，不上传任何图片。

export interface FilterPreset {
  id: string;
  name: string; // 中文名
  en: string; // 英文名（副标题）
  /** canvas ctx.filter 字符串（CSS filter 语法） */
  filter: string;
  /** 叠加色（rgba）—— 用于染色 / 色调，可选 */
  overlay?: string;
  /** 是否加暗角 */
  vignette?: boolean;
  /** 是否加胶片颗粒 */
  grain?: boolean;
}

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: "original",
    name: "原图",
    en: "Original",
    filter: "none",
  },
  {
    id: "hkfilm",
    name: "港风胶片",
    en: "HK Film",
    filter: "contrast(1.12) saturate(1.15) sepia(0.16) brightness(0.98)",
    overlay: "rgba(20,54,44,0.14)",
    vignette: true,
    grain: true,
  },
  {
    id: "mono",
    name: "黑白默片",
    en: "Silent B&W",
    filter: "grayscale(1) contrast(1.18) brightness(1.03)",
    vignette: true,
    grain: true,
  },
  {
    id: "warm",
    name: "暖阳",
    en: "Golden Hour",
    filter: "saturate(1.2) brightness(1.05) sepia(0.2) contrast(1.03)",
    overlay: "rgba(240,178,96,0.14)",
    vignette: false,
    grain: false,
  },
  {
    id: "cool",
    name: "冷调",
    en: "Cold Tone",
    filter: "saturate(1.06) contrast(1.09) brightness(1.0) hue-rotate(-8deg)",
    overlay: "rgba(56,118,150,0.14)",
    vignette: true,
    grain: false,
  },
  {
    id: "faded",
    name: "复古褪色",
    en: "Vintage Fade",
    filter: "contrast(0.9) saturate(0.82) sepia(0.34) brightness(1.08)",
    overlay: "rgba(232,220,196,0.16)",
    vignette: false,
    grain: true,
  },
  {
    id: "punch",
    name: "高对比",
    en: "High Punch",
    filter: "contrast(1.32) saturate(1.22) brightness(1.0)",
    vignette: true,
    grain: false,
  },
  {
    id: "cyber",
    name: "赛博",
    en: "Cyber",
    filter: "saturate(1.42) contrast(1.16) brightness(1.02) hue-rotate(-16deg)",
    overlay: "rgba(150,40,120,0.14)",
    vignette: true,
    grain: true,
  },
];

/**
 * 把图片按预设风格化，返回一个新的离屏 canvas。
 * @param source 原始图片（HTMLImageElement 或 canvas）
 * @param preset 滤镜预设
 * @param intensity 0~1，风格强度（0 = 原图，1 = 完全应用）
 * @param maxSize 输出最长边像素上限（默认 1600，控制性能与内存）
 */
export function stylize(
  source: CanvasImageSource & { width: number; height: number },
  preset: FilterPreset,
  intensity: number,
  maxSize = 1600,
): HTMLCanvasElement {
  const sw = source.width;
  const sh = source.height;
  const scale = Math.min(1, maxSize / Math.max(sw, sh));
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const k = Math.max(0, Math.min(1, intensity));

  // 1. 先画应用了滤镜的图
  ctx.filter = preset.filter === "none" ? "none" : preset.filter;
  ctx.drawImage(source, 0, 0, w, h);

  // 2. 用 intensity 与原图混合（强度<1 时露出部分原图）
  if (k < 1 && preset.filter !== "none") {
    ctx.filter = "none";
    ctx.globalAlpha = 1 - k;
    ctx.drawImage(source, 0, 0, w, h);
    ctx.globalAlpha = 1;
  }
  ctx.filter = "none";

  // 3. 叠加染色
  if (preset.overlay) {
    ctx.globalAlpha = k;
    ctx.fillStyle = preset.overlay;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  // 4. 暗角
  if (preset.vignette) {
    const g = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.34,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.72,
    );
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(1, `rgba(0,0,0,${0.42 * k})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  // 5. 胶片颗粒
  if (preset.grain) {
    addGrain(ctx, w, h, 0.06 * k);
  }

  return canvas;
}

/** 叠加轻微噪点，模拟胶片颗粒。amount ~ 0..0.1 */
function addGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  amount: number,
) {
  if (amount <= 0) return;
  // 用一张小噪点图平铺，避免逐像素操作大图卡顿
  const tile = 128;
  const noise = document.createElement("canvas");
  noise.width = tile;
  noise.height = tile;
  const nctx = noise.getContext("2d")!;
  const img = nctx.createImageData(tile, tile);
  for (let i = 0; i < img.data.length; i += 4) {
    // 伪随机灰度噪点
    const v = Math.floor(deterministicNoise(i) * 255);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = Math.floor(amount * 255);
  }
  nctx.putImageData(img, 0, 0);

  const prev = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "overlay";
  const pattern = ctx.createPattern(noise, "repeat");
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = prev;
}

// 稳定的伪随机数（避免每次渲染颗粒跳动）
function deterministicNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
