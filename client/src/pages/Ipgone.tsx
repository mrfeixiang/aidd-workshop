import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Copy,
  ImagePlus,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FILTER_PRESETS, stylize, type FilterPreset } from "@/lib/ipgone/filters";
import {
  ACCENT_COLORS,
  compose,
  RATIOS,
  TEMPLATES,
  type Ratio,
} from "@/lib/ipgone/compose";
import { MOODS, searchQuotes, type Quote } from "@/data/quotes";

type Step = 0 | 1 | 2 | 3; // 0=上传 1=风格化 2=台词 3=排版

const STEPS = [
  { k: "上传", en: "Upload" },
  { k: "① 风格化", en: "Stylize" },
  { k: "② 台词", en: "Quote" },
  { k: "③ 排版合成", en: "Compose" },
];

export default function Ipgone() {
  const [step, setStep] = useState<Step>(0);

  // 图片
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  // ① 风格化
  const [presetId, setPresetId] = useState("hkfilm");
  const [intensity, setIntensity] = useState(0.85);

  // ② 台词
  const [keyword, setKeyword] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  // ③ 排版
  const [templateId, setTemplateId] = useState("subtitle");
  const [ratioId, setRatioId] = useState("1x1");
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);

  const preset = useMemo<FilterPreset>(
    () => FILTER_PRESETS.find((p) => p.id === presetId) ?? FILTER_PRESETS[0],
    [presetId],
  );
  const ratio = useMemo<Ratio>(
    () => RATIOS.find((r) => r.id === ratioId) ?? RATIOS[0],
    [ratioId],
  );

  // 风格化后的离屏 canvas（图片 / 预设 / 强度 变化时重算）
  const stylized = useMemo(() => {
    if (!img) return null;
    return stylize(img, preset, intensity);
  }, [img, preset, intensity]);

  // 最终成图 canvas
  const finalCanvas = useMemo(() => {
    if (!stylized) return null;
    return compose({
      image: stylized,
      text,
      author,
      templateId,
      ratio,
      accent,
    });
  }, [stylized, text, author, templateId, ratio, accent]);

  // 把成图画到可见预览 canvas
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cvs = previewRef.current;
    if (!cvs || !finalCanvas) return;
    cvs.width = finalCanvas.width;
    cvs.height = finalCanvas.height;
    const ctx = cvs.getContext("2d")!;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(finalCanvas, 0, 0);
  }, [finalCanvas]);

  // —— 上传 ——
  const onFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("请选择图片文件");
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setImg(image);
      setStep(1);
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      toast.error("图片加载失败，换一张试试");
      URL.revokeObjectURL(url);
    };
    image.src = url;
  }, []);

  const results = useMemo(() => searchQuotes(keyword, mood), [keyword, mood]);

  const pickQuote = (q: Quote) => {
    setText(q.text);
    setAuthor(q.author);
  };

  // —— 导出 ——
  const download = () => {
    if (!finalCanvas) return;
    finalCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ipgone-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("已保存成图 🎉");
    }, "image/png");
  };

  const copyImage = async () => {
    if (!finalCanvas) return;
    try {
      finalCanvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        toast.success("已复制到剪贴板，去朋友圈粘贴吧");
      }, "image/png");
    } catch {
      toast.error("当前浏览器不支持复制图片，请用「保存」");
    }
  };

  const reset = () => {
    setImg(null);
    setStep(0);
    setText("");
    setAuthor("");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <TopBar onReset={img ? reset : undefined} />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:px-8">
        <Stepper step={step} canNav={!!img} onNav={(s) => setStep(s)} />

        {step === 0 ? (
          <Uploader onFile={onFile} />
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* 预览 */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-xl border border-[#e0d8c8] bg-white p-3 shadow-sm">
                <canvas
                  ref={previewRef}
                  className="mx-auto block h-auto w-full rounded-lg"
                  style={{ maxHeight: "62vh", objectFit: "contain" }}
                />
              </div>
              <p className="mt-2 text-center font-mono text-xs text-[#8a8272]">
                {ratio.name} · {ratio.w}×{ratio.h}px · 实时预览
              </p>
            </div>

            {/* 控制区 */}
            <div className="min-w-0">
              {step === 1 && (
                <StylizePanel
                  presetId={presetId}
                  setPresetId={setPresetId}
                  intensity={intensity}
                  setIntensity={setIntensity}
                  img={img}
                />
              )}
              {step === 2 && (
                <QuotePanel
                  keyword={keyword}
                  setKeyword={setKeyword}
                  mood={mood}
                  setMood={setMood}
                  results={results}
                  text={text}
                  author={author}
                  setText={setText}
                  setAuthor={setAuthor}
                  activeId={results.find((q) => q.text === text)?.id ?? null}
                  onPick={pickQuote}
                />
              )}
              {step === 3 && (
                <ComposePanel
                  templateId={templateId}
                  setTemplateId={setTemplateId}
                  ratioId={ratioId}
                  setRatioId={setRatioId}
                  accent={accent}
                  setAccent={setAccent}
                  onDownload={download}
                  onCopy={copyImage}
                />
              )}

              {/* 步骤导航 */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                  className="text-[#2D2D2D]"
                >
                  <ArrowLeft className="mr-1 size-4" /> 上一步
                </Button>
                {step < 3 ? (
                  <Button
                    onClick={() => setStep((s) => Math.min(3, s + 1) as Step)}
                    style={{ backgroundColor: "#1A3636" }}
                    className="text-white hover:opacity-90"
                  >
                    下一步 <ArrowRight className="ml-1 size-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={download}
                    style={{ backgroundColor: "#D97757" }}
                    className="text-white hover:opacity-90"
                  >
                    <Download className="mr-1 size-4" /> 保存成图
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ————————————————————————————————— 顶部栏
function TopBar({ onReset }: { onReset?: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e0d8c8] bg-[#F5F0E8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
          >
            ipgone
          </span>
          <span className="hidden font-mono text-xs text-[#8a8272] sm:inline">
            照片 → 风格化 → 台词 → 朋友圈成图
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-[#2D2D2D]"
            >
              <RotateCcw className="mr-1 size-4" /> 重来
            </Button>
          )}
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#2D2D2D]">
              返回主站
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// ————————————————————————————————— 步骤条
function Stepper({
  step,
  canNav,
  onNav,
}: {
  step: Step;
  canNav: boolean;
  onNav: (s: Step) => void;
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2 sm:gap-2">
      {STEPS.map((s, i) => {
        const active = i === step;
        const done = i < step;
        const clickable = canNav || i === 0;
        return (
          <div key={s.k} className="flex items-center">
            <button
              disabled={!clickable}
              onClick={() => clickable && onNav(i as Step)}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition disabled:opacity-40"
              style={{
                backgroundColor: active ? "#1A3636" : done ? "#e6ddcc" : "transparent",
                color: active ? "#fff" : "#2D2D2D",
              }}
            >
              <span
                className="flex size-5 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: active ? "#D97757" : done ? "#1A3636" : "#d8cfbc",
                  color: active || done ? "#fff" : "#6b6b6b",
                }}
              >
                {done ? <Check className="size-3" /> : i + 1}
              </span>
              <span className="whitespace-nowrap font-medium">{s.k}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="mx-0.5 h-px w-4 bg-[#d8cfbc] sm:w-6" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ————————————————————————————————— 上传
function Uploader({ onFile }: { onFile: (f: File) => void }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="mt-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-20 text-center transition"
        style={{
          borderColor: drag ? "#D97757" : "#c9bfa8",
          backgroundColor: drag ? "#f0e7d8" : "#faf6ee",
        }}
      >
        <div
          className="mb-4 flex size-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "#1A3636" }}
        >
          <ImagePlus className="size-8 text-white" />
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
        >
          上传一张照片
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#6b6b6b]">
          拖拽图片到这里，或点击选择。全部处理都在你的浏览器本地完成，
          <span className="font-medium text-[#1A3636]">照片不会上传到任何服务器</span>。
        </p>
        <Button
          className="mt-6 text-white hover:opacity-90"
          style={{ backgroundColor: "#D97757" }}
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          <ImagePlus className="mr-2 size-4" /> 选择照片
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Sparkles, t: "① 风格化", d: "港风胶片、黑白默片、暖阳、赛博…八种电影感滤镜" },
          { icon: Search, t: "② 台词检索", d: "从王家卫到 Beyond，按情绪搜一句戳心的话" },
          { icon: Download, t: "③ 排版成图", d: "四款版式，一键生成可发朋友圈的成图" },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-xl border border-[#e0d8c8] bg-white p-4"
          >
            <c.icon className="mb-2 size-5" style={{ color: "#D97757" }} />
            <h3 className="font-bold text-[#1A3636]">{c.t}</h3>
            <p className="mt-1 text-sm text-[#6b6b6b]">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ————————————————————————————————— ① 风格化面板
function StylizePanel({
  presetId,
  setPresetId,
  intensity,
  setIntensity,
  img,
}: {
  presetId: string;
  setPresetId: (v: string) => void;
  intensity: number;
  setIntensity: (v: number) => void;
  img: HTMLImageElement | null;
}) {
  return (
    <div>
      <PanelTitle title="① 风格化" sub="给照片选一种电影质感" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FILTER_PRESETS.map((p) => (
          <ThumbButton
            key={p.id}
            active={p.id === presetId}
            onClick={() => setPresetId(p.id)}
            img={img}
            preset={p}
            name={p.name}
            en={p.en}
          />
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-[#e0d8c8] bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-[#2D2D2D]">风格强度</span>
          <span className="font-mono text-sm text-[#8a8272]">
            {Math.round(intensity * 100)}%
          </span>
        </div>
        <Slider
          value={[intensity]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(v) => setIntensity(v[0])}
        />
      </div>
    </div>
  );
}

// 小缩略图预览按钮
function ThumbButton({
  active,
  onClick,
  img,
  preset,
  name,
  en,
}: {
  active: boolean;
  onClick: () => void;
  img: HTMLImageElement | null;
  preset: FilterPreset;
  name: string;
  en: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!img || !ref.current) return;
    const c = stylize(img, preset, 1, 240);
    const cvs = ref.current;
    const size = 120;
    cvs.width = size;
    cvs.height = size;
    const ctx = cvs.getContext("2d")!;
    // cover
    const scale = Math.max(size / c.width, size / c.height);
    const sw = size / scale;
    const sh = size / scale;
    ctx.drawImage(
      c,
      (c.width - sw) / 2,
      (c.height - sh) / 2,
      sw,
      sh,
      0,
      0,
      size,
      size,
    );
  }, [img, preset]);
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-lg border-2 bg-white text-left transition"
      style={{ borderColor: active ? "#D97757" : "#e0d8c8" }}
    >
      <canvas ref={ref} className="block aspect-square w-full object-cover" />
      <div className="px-2 py-1.5">
        <div className="text-sm font-semibold text-[#2D2D2D]">{name}</div>
        <div className="font-mono text-[10px] text-[#8a8272]">{en}</div>
      </div>
    </button>
  );
}

// ————————————————————————————————— ② 台词面板
function QuotePanel({
  keyword,
  setKeyword,
  mood,
  setMood,
  results,
  text,
  author,
  setText,
  setAuthor,
  activeId,
  onPick,
}: {
  keyword: string;
  setKeyword: (v: string) => void;
  mood: string | null;
  setMood: (v: string | null) => void;
  results: Quote[];
  text: string;
  author: string;
  setText: (v: string) => void;
  setAuthor: (v: string) => void;
  activeId: string | null;
  onPick: (q: Quote) => void;
}) {
  return (
    <div>
      <PanelTitle title="② 台词检索" sub="搜一句话，或自己写" />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8a8272]" />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索关键词，如「自由」「海」「王家卫」…"
          className="border-[#e0d8c8] bg-white pl-9"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <MoodChip active={!mood} onClick={() => setMood(null)}>
          全部
        </MoodChip>
        {MOODS.map((m) => (
          <MoodChip key={m} active={mood === m} onClick={() => setMood(m)}>
            {m}
          </MoodChip>
        ))}
      </div>

      <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
        {results.length === 0 && (
          <p className="py-8 text-center text-sm text-[#8a8272]">
            没找到，换个词，或在下面自己写一句 ✍️
          </p>
        )}
        {results.map((q) => (
          <button
            key={q.id}
            onClick={() => onPick(q)}
            className="block w-full rounded-lg border p-3 text-left transition hover:border-[#D97757]"
            style={{
              borderColor: activeId === q.id ? "#D97757" : "#e0d8c8",
              backgroundColor: activeId === q.id ? "#fdf5ef" : "#fff",
            }}
          >
            <p className="text-[15px] leading-snug text-[#2D2D2D]">{q.text}</p>
            <p className="mt-1 font-mono text-xs text-[#8a8272]">{q.author}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#e0d8c8] bg-white p-4">
        <label className="text-sm font-medium text-[#2D2D2D]">
          台词正文（可编辑）
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在这里输入或修改要放到图上的文字…"
          rows={2}
          className="mt-2 resize-none border-[#e0d8c8]"
        />
        <label className="mt-3 block text-sm font-medium text-[#2D2D2D]">
          出处 / 署名
        </label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="如《重庆森林》、你的名字，或留空"
          className="mt-2 border-[#e0d8c8]"
        />
      </div>
    </div>
  );
}

function MoodChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-3 py-1 text-sm transition"
      style={{
        backgroundColor: active ? "#1A3636" : "#fff",
        color: active ? "#fff" : "#2D2D2D",
        border: `1px solid ${active ? "#1A3636" : "#e0d8c8"}`,
      }}
    >
      {children}
    </button>
  );
}

// ————————————————————————————————— ③ 排版面板
function ComposePanel({
  templateId,
  setTemplateId,
  ratioId,
  setRatioId,
  accent,
  setAccent,
  onDownload,
  onCopy,
}: {
  templateId: string;
  setTemplateId: (v: string) => void;
  ratioId: string;
  setRatioId: (v: string) => void;
  accent: string;
  setAccent: (v: string) => void;
  onDownload: () => void;
  onCopy: () => void;
}) {
  return (
    <div>
      <PanelTitle title="③ 排版合成" sub="选版式，导出成图" />

      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplateId(t.id)}
            className="rounded-lg border-2 px-3 py-3 text-left transition"
            style={{
              borderColor: templateId === t.id ? "#D97757" : "#e0d8c8",
              backgroundColor: templateId === t.id ? "#fdf5ef" : "#fff",
            }}
          >
            <div className="font-semibold text-[#2D2D2D]">{t.name}</div>
            <div className="font-mono text-[11px] text-[#8a8272]">{t.en}</div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-[#2D2D2D]">画幅</div>
        <div className="flex gap-2">
          {RATIOS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRatioId(r.id)}
              className="flex-1 rounded-lg border px-2 py-2 text-sm transition"
              style={{
                borderColor: ratioId === r.id ? "#1A3636" : "#e0d8c8",
                backgroundColor: ratioId === r.id ? "#1A3636" : "#fff",
                color: ratioId === r.id ? "#fff" : "#2D2D2D",
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-sm font-medium text-[#2D2D2D]">主题色</div>
        <div className="flex gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setAccent(c)}
              className="size-8 rounded-full border-2 transition"
              style={{
                backgroundColor: c,
                borderColor: accent === c ? "#2D2D2D" : "transparent",
                outline: accent === c ? "2px solid #fff" : "none",
                outlineOffset: "-4px",
              }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          onClick={onDownload}
          className="flex-1 text-white hover:opacity-90"
          style={{ backgroundColor: "#D97757" }}
        >
          <Download className="mr-2 size-4" /> 保存 PNG
        </Button>
        <Button
          onClick={onCopy}
          variant="outline"
          className="flex-1 border-[#1A3636] text-[#1A3636]"
        >
          <Copy className="mr-2 size-4" /> 复制图片
        </Button>
      </div>
    </div>
  );
}

// ————————————————————————————————— 通用
function PanelTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-4">
      <h2
        className="text-xl font-bold"
        style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
      >
        {title}
      </h2>
      <p className="text-sm text-[#8a8272]">{sub}</p>
    </div>
  );
}
