import { motion } from "framer-motion";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/hero-banner-Nv45Kui8P44NSPPoLQvrg2.webp";
const CAMUS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/camus-quote_68c393b8.png";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "#1A3636" }}>
      {/* ===== MAIN HERO ===== */}
      <div className="relative min-h-[90vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="AI Tools Workshop Banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,54,54,0.85) 0%, rgba(26,54,54,0.5) 50%, rgba(217,119,87,0.3) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 pt-20 pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase mb-6 px-3 py-1.5"
                style={{
                  color: "#D97757",
                  fontFamily: "var(--font-mono)",
                  border: "1px solid rgba(217,119,87,0.4)",
                }}
              >
                Series Prologue &middot; 系列序章
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#F5F0E8" }}
            >
              AI工具的
              <br />
              <span style={{ color: "#D97757" }}>乐</span>与
              <span style={{ color: "#D97757" }}>怒</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed"
              style={{ color: "rgba(245,240,232,0.8)", fontFamily: "var(--font-body)" }}
            >
              不再犹豫，先看真实跑起来的样子。
              <br className="hidden sm:block" />
              AI工具能干什么、会踩什么坑，讲完你自己判断。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("module-1")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:scale-105"
                style={{
                  backgroundColor: "#D97757",
                  color: "#F5F0E8",
                  fontFamily: "var(--font-body)",
                }}
              >
                开始探索 &darr;
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("appendix")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:opacity-80"
                style={{
                  border: "1px solid rgba(245,240,232,0.3)",
                  color: "#F5F0E8",
                  fontFamily: "var(--font-body)",
                }}
              >
                课后附录
              </button>
            </motion.div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6 mt-12 text-xs tracking-wide"
              style={{
                color: "rgba(245,240,232,0.5)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>预计时长：60分钟</span>
              <span>适用受众：AIDD研究人员</span>
              <span>6个模块 + 课后作业</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== CAMUS QUOTE INTERLUDE ===== */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #1A3636 0%, #0f2222 100%)",
        }}
      >
        {/* Subtle top separator line */}
        <div
          className="mx-auto"
          style={{
            width: "60%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(217,119,87,0.4), transparent)",
          }}
        />

        <div className="container py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-5xl mx-auto">
            {/* Camus image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="shrink-0"
            >
              <div
                className="relative"
                style={{
                  width: "220px",
                  height: "360px",
                  border: "1px solid rgba(217,119,87,0.25)",
                  padding: "6px",
                }}
              >
                <img
                  src={CAMUS_IMG}
                  alt="Albert Camus — 苦难始终是孤独的"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.95) contrast(1.05)" }}
                />
                {/* Corner accents */}
                <div
                  className="absolute -top-1 -left-1 w-3 h-3"
                  style={{ borderTop: "2px solid #D97757", borderLeft: "2px solid #D97757" }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-3 h-3"
                  style={{ borderBottom: "2px solid #D97757", borderRight: "2px solid #D97757" }}
                />
              </div>
            </motion.div>

            {/* Quote and message */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Camus quote in Chinese */}
              <blockquote className="mb-6">
                <p
                  className="text-lg sm:text-xl leading-relaxed italic"
                  style={{
                    color: "rgba(245,240,232,0.85)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  &ldquo;在痛苦的某个特定时刻，
                  <br />
                  没有任何人能为你做些什么，
                  <br />
                  <span className="font-bold" style={{ color: "#D97757" }}>
                    苦难始终是孤独的。
                  </span>
                  &rdquo;
                </p>
                <footer
                  className="mt-3 text-xs tracking-[0.15em]"
                  style={{
                    color: "rgba(245,240,232,0.45)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  &mdash;&mdash; 阿尔贝&middot;卡缪 (Albert Camus)
                </footer>
              </blockquote>

              {/* Separator */}
              <div
                className="my-6 lg:my-8 mx-auto lg:mx-0"
                style={{
                  width: "48px",
                  height: "2px",
                  backgroundColor: "#D97757",
                }}
              />

              {/* Inspirational message */}
              <p
                className="text-base sm:text-lg leading-relaxed mb-4"
                style={{
                  color: "rgba(245,240,232,0.9)",
                  fontFamily: "var(--font-body)",
                }}
              >
                安心科研不易，AIDD 也注定
                <span className="font-bold" style={{ color: "#D97757" }}>
                  波澜壮阔
                </span>
                。
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{
                  color: "rgba(245,240,232,0.75)",
                  fontFamily: "var(--font-body)",
                }}
              >
                锻炼身体，热爱音乐，一起前行。
              </p>

              {/* Small decorative stamp */}
              <div
                className="inline-block mt-6 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase"
                style={{
                  border: "1px solid rgba(217,119,87,0.35)",
                  color: "rgba(217,119,87,0.7)",
                  fontFamily: "var(--font-mono)",
                  transform: "rotate(-2deg)",
                }}
              >
                Keep Moving Forward
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Diagonal bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "#F5F0E8",
          clipPath: "polygon(0 100%, 100% 40%, 100% 100%)",
        }}
      />
    </div>
  );
}
