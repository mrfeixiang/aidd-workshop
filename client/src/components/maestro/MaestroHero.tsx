import { motion } from "framer-motion";
import { Github, ArrowDown } from "lucide-react";
import { TOTAL_PROJECTS, TOTAL_HOURS, LEVELS, COURSE_REPO_URL } from "@/data/maestro";

interface MaestroHeroProps {
  onStart: () => void;
}

export default function MaestroHero({ onStart }: MaestroHeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1A3636" }}
    >
      {/* Vinyl record motif — big circle on the right */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
          <circle cx="350" cy="350" r="340" stroke="#D97757" strokeWidth="1" />
          <circle cx="350" cy="350" r="280" stroke="#D97757" strokeWidth="1" />
          <circle cx="350" cy="350" r="220" stroke="#D97757" strokeWidth="1" />
          <circle cx="350" cy="350" r="160" stroke="#D97757" strokeWidth="1" />
          <circle cx="350" cy="350" r="100" stroke="#D97757" strokeWidth="1" />
          <circle cx="350" cy="350" r="50" fill="#D97757" fillOpacity="0.3" />
          <circle cx="350" cy="350" r="6" fill="#D97757" />
        </svg>
      </div>

      <div className="relative min-h-[85vh] flex items-center">
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-4xl">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span
                className="text-xs tracking-[0.3em] uppercase px-3 py-1.5"
                style={{
                  color: "#D97757",
                  border: "1px solid rgba(217,119,87,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                CADD × AIDD · Maestro
              </span>
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{
                  color: "rgba(245,240,232,0.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Project-based · GitHub-driven
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "#F5F0E8" }}
            >
              从 <span style={{ color: "#D97757" }}>0</span>
              <br />
              到 <span style={{ color: "#D97757" }}>精通</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light italic opacity-80">
                for CADD &amp; AIDD
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl max-w-2xl mb-3 leading-relaxed"
              style={{
                color: "rgba(245,240,232,0.85)",
                fontFamily: "var(--font-body)",
              }}
            >
              不是视频课，不是 slides，不是 &ldquo;下一步&rdquo; 按钮的奴隶。
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base sm:text-lg max-w-2xl mb-10 leading-relaxed"
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "var(--font-body)",
              }}
            >
              你 fork 一个仓库，装环境、跑代码、改 bug、提 PR —— 每通过一关，都留下
              <span style={{ color: "#D97757" }}> 可被他人 clone 的证据</span>。
              这就是 Maestro 的方式。
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-8 mb-10"
            >
              {[
                { n: LEVELS.length, label: "关卡" },
                { n: TOTAL_PROJECTS, label: "GitHub 项目" },
                { n: `${TOTAL_HOURS}+`, label: "预估工时" },
                { n: 6, label: "能力支柱" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-4xl font-black leading-none mb-1"
                    style={{
                      color: "#D97757",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{
                      color: "rgba(245,240,232,0.5)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={onStart}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:scale-105"
                style={{
                  backgroundColor: "#D97757",
                  color: "#F5F0E8",
                  fontFamily: "var(--font-body)",
                }}
              >
                进入 Level 0 <ArrowDown size={16} />
              </button>
              <a
                href={COURSE_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all hover:opacity-80"
                style={{
                  border: "1px solid rgba(245,240,232,0.3)",
                  color: "#F5F0E8",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Github size={16} />
                GitHub 仓库
              </a>
            </motion.div>

            {/* Footer tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-14 flex flex-wrap gap-6 text-[11px] tracking-wide"
              style={{
                color: "rgba(245,240,232,0.45)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span>// 自主节奏</span>
              <span>// 全开源</span>
              <span>// 每关一件作品</span>
              <span>// 通关靠 merged PR</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Diagonal bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "#EDE8DD",
          clipPath: "polygon(0 100%, 100% 40%, 100% 100%)",
        }}
      />
    </div>
  );
}
