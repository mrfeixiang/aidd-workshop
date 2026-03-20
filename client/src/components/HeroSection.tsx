import { motion } from "framer-motion";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/hero-banner-Nv45Kui8P44NSPPoLQvrg2.webp";

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: "#1A3636" }}>
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
            background: "linear-gradient(135deg, rgba(26,54,54,0.85) 0%, rgba(26,54,54,0.5) 50%, rgba(217,119,87,0.3) 100%)",
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
            一场关于AIDD领域的思维破局与核心痛点直击。
            <br className="hidden sm:block" />
            通过实测案例与"龙虾"Agent的现场演示，看清AI工具的真本事与坑。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() =>
                document.getElementById("module-1")?.scrollIntoView({ behavior: "smooth" })
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
                document.getElementById("appendix")?.scrollIntoView({ behavior: "smooth" })
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
            style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-mono)" }}
          >
            <span>预计时长：60分钟</span>
            <span>适用受众：AIDD研究人员</span>
            <span>6个模块 + 课后作业</span>
          </motion.div>
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
