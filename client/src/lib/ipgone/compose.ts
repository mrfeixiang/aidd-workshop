// ③ 排版合成 —— 把风格化后的图片 + 台词，合成为一张可发朋友圈的成图。
// 纯 Canvas 实现，支持多种版式模板与画幅比例。

export interface Ratio {
  id: string;
  name: string;
  w: number;
  h: number;
}

// 朋友圈常用画幅
export const RATIOS: Ratio[] = [
  { id: "1x1", name: "1:1 方图", w: 1080, h: 1080 },
  { id: "3x4", name: "3:4 竖图", w: 1080, h: 1440 },
  { id: "4x3", name: "4:3 横图", w: 1440, h: 1080 },
];

export interface Template {
  id: string;
  name: string;
  en: string;
}

export const TEMPLATES: Template[] = [
  { id: "subtitle", name: "电影字幕", en: "Film Subtitle" },
  { id: "minimal", name: "极简卡片", en: "Minimal Card" },
  { id: "polaroid", name: "拍立得", en: "Polaroid" },
  { id: "magazine", name: "杂志封面", en: "Magazine" },
];

export interface ComposeOptions {
  image: HTMLCanvasElement | HTMLImageElement;
  text: string;
  author: string;
  templateId: string;
  ratio: Ratio;
  accent: string; // 主题色（hex）
}

const SERIF = '"Noto Serif SC", "Playfair Display", Georgia, serif';
const SANS = '"Work Sans", "Noto Sans SC", system-ui, sans-serif';

/** 主入口：根据模板渲染并返回成图 canvas。 */
export function compose(opts: ComposeOptions): HTMLCanvasElement {
  const { ratio } = opts;
  const canvas = document.createElement("canvas");
  canvas.width = ratio.w;
  canvas.height = ratio.h;
  const ctx = canvas.getContext("2d")!;

  switch (opts.templateId) {
    case "minimal":
      renderMinimal(ctx, opts);
      break;
    case "polaroid":
      renderPolaroid(ctx, opts);
      break;
    case "magazine":
      renderMagazine(ctx, opts);
      break;
    case "subtitle":
    default:
      renderSubtitle(ctx, opts);
      break;
  }
  return canvas;
}

// ————————————————————————————————————————————————
// 模板 1：电影字幕（上下黑边 + 底部白色字幕）
// ————————————————————————————————————————————————
function renderSubtitle(ctx: CanvasRenderingContext2D, o: ComposeOptions) {
  const { w, h } = o.ratio;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  // 图片按 cover 铺满，留出上下黑边
  const barRatio = 0.14; // 上下各留 14% 作黑边区
  const imgTop = h * barRatio;
  const imgH = h * (1 - barRatio * 2);
  drawCover(ctx, o.image, 0, imgTop, w, imgH);

  // 底部字幕文字
  const fontSize = Math.round(w * 0.045);
  ctx.font = `500 ${fontSize}px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const maxTextW = w * 0.86;
  const lines = wrapText(ctx, o.text, maxTextW);
  const lineH = fontSize * 1.5;

  // 字幕位于底部黑边偏上
  let y = h - h * barRatio * 0.5 - (lines.length - 1) * lineH * 0.5;
  // 若行数多，则整体上移进入图片区，加半透明衬底
  const blockH = lines.length * lineH;
  const blockTop = y - fontSize;
  if (blockTop < imgTop + imgH - blockH - 10) {
    // ok
  }

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = fontSize * 0.35;
  ctx.fillStyle = "#fff";
  for (const line of lines) {
    ctx.fillText(line, w / 2, y);
    y += lineH;
  }
  ctx.restore();

  // 出处（小字，右下角，主题色）
  if (o.author) {
    const aSize = Math.round(w * 0.026);
    ctx.font = `400 ${aSize}px ${SANS}`;
    ctx.fillStyle = o.accent;
    ctx.textAlign = "right";
    ctx.fillText(o.author, w - w * 0.06, h - h * barRatio * 0.5 + blockH * 0.5 + aSize * 1.6);
  }
}

// ————————————————————————————————————————————————
// 模板 2：极简卡片（图片在上，底部纯色文字带）
// ————————————————————————————————————————————————
function renderMinimal(ctx: CanvasRenderingContext2D, o: ComposeOptions) {
  const { w, h } = o.ratio;
  // 背景象牙白
  ctx.fillStyle = "#F5F0E8";
  ctx.fillRect(0, 0, w, h);

  const pad = Math.round(w * 0.06);
  const bandH = Math.round(h * 0.26); // 底部文字带高度
  const imgTop = pad;
  const imgH = h - bandH - pad;
  const imgW = w - pad * 2;
  // 圆角图片
  roundRectPath(ctx, pad, imgTop, imgW, imgH, Math.round(w * 0.02));
  ctx.save();
  ctx.clip();
  drawCover(ctx, o.image, pad, imgTop, imgW, imgH);
  ctx.restore();

  // 底部台词
  const cx = w / 2;
  const bandTop = imgTop + imgH;
  const fontSize = Math.round(w * 0.05);
  ctx.font = `700 ${fontSize}px ${SERIF}`;
  ctx.fillStyle = "#2D2D2D";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = wrapText(ctx, o.text, w - pad * 2.4);
  const lineH = fontSize * 1.42;
  const textBlockH = lines.length * lineH;
  const authorSize = Math.round(w * 0.028);
  const authorGap = o.author ? authorSize * 2.4 : 0;
  let y = bandTop + (bandH - textBlockH - authorGap) / 2 + lineH / 2;
  for (const line of lines) {
    ctx.fillText(line, cx, y);
    y += lineH;
  }
  // 主题色短横线 + 出处
  if (o.author) {
    ctx.strokeStyle = o.accent;
    ctx.lineWidth = Math.max(2, w * 0.004);
    const lineY = y - lineH / 2 + authorSize * 0.6;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.04, lineY);
    ctx.lineTo(cx + w * 0.04, lineY);
    ctx.stroke();
    ctx.font = `400 ${authorSize}px ${SANS}`;
    ctx.fillStyle = "#6b6b6b";
    ctx.fillText(o.author, cx, lineY + authorSize * 1.5);
  }
}

// ————————————————————————————————————————————————
// 模板 3：拍立得（白色相框 + 手写风格标题）
// ————————————————————————————————————————————————
function renderPolaroid(ctx: CanvasRenderingContext2D, o: ComposeOptions) {
  const { w, h } = o.ratio;
  ctx.fillStyle = "#EDE8DD";
  ctx.fillRect(0, 0, w, h);

  // 白色相框，四周留白，底部更宽
  const side = Math.round(w * 0.07);
  const top = side;
  const bottom = Math.round(h * 0.2);
  const frameX = side;
  const frameY = top;
  const frameW = w - side * 2;
  const frameH = h - top - bottom;

  // 相框阴影
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowBlur = w * 0.03;
  ctx.shadowOffsetY = w * 0.012;
  ctx.fillStyle = "#fff";
  ctx.fillRect(side * 0.5, top * 0.5, w - side, h - top * 0.5 - side * 0.5);
  ctx.restore();

  // 照片
  drawCover(ctx, o.image, frameX, frameY, frameW, frameH);

  // 底部手写台词
  const cx = w / 2;
  const captionTop = frameY + frameH;
  const captionH = h - captionTop;
  const fontSize = Math.round(w * 0.046);
  ctx.font = `400 ${fontSize}px ${SERIF}`;
  ctx.fillStyle = "#2D2D2D";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = wrapText(ctx, o.text, frameW * 0.95);
  const lineH = fontSize * 1.34;
  const authorSize = Math.round(w * 0.026);
  const blockH = lines.length * lineH + (o.author ? authorSize * 1.8 : 0);
  let y = captionTop + (captionH - blockH) / 2 + lineH / 2;
  for (const line of lines) {
    ctx.fillText(line, cx, y);
    y += lineH;
  }
  if (o.author) {
    ctx.font = `400 ${authorSize}px ${SANS}`;
    ctx.fillStyle = o.accent;
    ctx.fillText(`— ${o.author}`, cx, y + authorSize * 0.4);
  }
}

// ————————————————————————————————————————————————
// 模板 4：杂志封面（满幅图 + 顶部刊头 + 大标题）
// ————————————————————————————————————————————————
function renderMagazine(ctx: CanvasRenderingContext2D, o: ComposeOptions) {
  const { w, h } = o.ratio;
  drawCover(ctx, o.image, 0, 0, w, h);

  // 底部渐变压暗，保证文字可读
  const grad = ctx.createLinearGradient(0, h * 0.4, 0, h);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.72)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // 顶部也压一层
  const gradTop = ctx.createLinearGradient(0, 0, 0, h * 0.22);
  gradTop.addColorStop(0, "rgba(0,0,0,0.35)");
  gradTop.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradTop;
  ctx.fillRect(0, 0, w, h * 0.22);

  const pad = Math.round(w * 0.07);

  // 顶部刊头
  const headSize = Math.round(w * 0.032);
  ctx.font = `700 ${headSize}px ${SANS}`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.fillText("IPGONE", pad, pad * 0.9);
  ctx.restore();
  // 刊头右侧主题色小方块
  ctx.fillStyle = o.accent;
  ctx.fillRect(w - pad - headSize * 1.4, pad * 0.9, headSize * 1.4, headSize * 1.4);

  // 主题色竖条
  const barX = pad;
  const fontSize = Math.round(w * 0.062);
  ctx.font = `900 ${fontSize}px ${SERIF}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const lines = wrapText(ctx, o.text, w - pad * 2 - w * 0.03);
  const lineH = fontSize * 1.28;
  const blockH = lines.length * lineH;
  const authorSize = Math.round(w * 0.03);
  const startY = h - pad - blockH - (o.author ? authorSize * 1.8 : 0) + fontSize;

  ctx.fillStyle = o.accent;
  ctx.fillRect(barX, startY - fontSize, Math.max(4, w * 0.012), blockH);

  ctx.fillStyle = "#fff";
  let y = startY;
  for (const line of lines) {
    ctx.fillText(line, barX + w * 0.035, y);
    y += lineH;
  }
  if (o.author) {
    ctx.font = `500 ${authorSize}px ${SANS}`;
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.fillText(o.author, barX + w * 0.035, y + authorSize * 0.6);
  }
}

// ————————————————————————————————————————————————
// 工具函数
// ————————————————————————————————————————————————

/** 以 cover 方式把图片绘制到目标矩形（居中裁剪，不变形）。 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLCanvasElement | HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
) {
  const iw = img.width;
  const ih = img.height;
  const scale = Math.max(dw / iw, dh / ih);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * 文本换行，支持中英混排：
 * - CJK 字符逐字断行
 * - 拉丁单词按词断行
 */
// 避头标点：这些字符不应出现在行首，遇到时悬挂到上一行末尾。
const NO_LINE_START = new Set(
  "。，、！？；：）」』】》〉”’…—·".split(""),
);

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  // 优先处理显式换行
  const paragraphs = text.split("\n");
  const out: string[] = [];
  for (const para of paragraphs) {
    const tokens = tokenize(para);
    let line = "";
    for (const tk of tokens) {
      const test = line + tk;
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        // 禁则处理：行首避头标点（收尾符号）悬挂到上一行，不单独成行
        if (NO_LINE_START.has(tk)) {
          line = test;
        } else {
          out.push(line.trimEnd());
          line = tk.trimStart();
        }
      } else {
        line = test;
      }
    }
    out.push(line.trimEnd());
  }
  return out.filter((l) => l.length > 0);
}

/** 把字符串拆成断行 token：CJK / 标点单字符，拉丁按空格成词。 */
function tokenize(text: string): string[] {
  const tokens: string[] = [];
  let latin = "";
  const flush = () => {
    if (latin) {
      tokens.push(latin);
      latin = "";
    }
  };
  for (const ch of text) {
    if (/[一-鿿　-〿＀-￯]/.test(ch)) {
      // CJK 或全角标点：单字成 token
      flush();
      tokens.push(ch);
    } else if (ch === " ") {
      latin += ch;
      flush();
    } else {
      latin += ch;
    }
  }
  flush();
  return tokens;
}

/** 圆角矩形路径（不填充，供 clip / stroke 使用）。 */
function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

// 主题色预设
export const ACCENT_COLORS = [
  "#D97757", // sienna
  "#1A3636", // teal
  "#E8B45E", // gold
  "#3A6E8F", // blue
  "#B04A6A", // rose
  "#2D2D2D", // charcoal
];
