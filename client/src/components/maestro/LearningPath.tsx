import { motion } from "framer-motion";
import type { Level } from "@/data/maestro";

interface LearningPathProps {
  levels: Level[];
  onSelect: (id: string) => void;
}

export default function LearningPath({ levels, onSelect }: LearningPathProps) {
  return (
    <section
      className="py-20 sm:py-24 relative"
      style={{ backgroundColor: "#EDE8DD" }}
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}
            >
              从 0 到 精通 · the path
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
            >
              五个关卡，一条路
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base max-w-2xl mx-auto leading-relaxed"
              style={{
                color: "rgba(45,45,45,0.75)",
                fontFamily: "var(--font-body)",
              }}
            >
              每一关都以真实的 GitHub
              仓库为载体。点开关卡，fork 仓库，跑通代码，提交你的 PR —— 这是通关凭据。
            </motion.p>
          </div>

          {/* Roadmap */}
          <div className="relative">
            {/* Vinyl groove line — visible only on md+ */}
            <div
              className="hidden md:block absolute top-12 left-6 right-6 h-[2px]"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #1A3636 0 8px, transparent 8px 14px)",
                opacity: 0.35,
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 relative">
              {levels.map((lvl, i) => (
                <motion.button
                  key={lvl.id}
                  onClick={() => onSelect(lvl.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col items-center text-center p-4"
                >
                  {/* Node circle */}
                  <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all"
                    style={{
                      backgroundColor: lvl.accent,
                      color: lvl.num === 4 ? "#F5F0E8" : "#1A3636",
                      boxShadow: `0 0 0 4px #EDE8DD, 0 0 0 5px ${lvl.accent}66`,
                    }}
                  >
                    <span
                      className="text-5xl font-black leading-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: lvl.num === 4 ? "#F5F0E8" : "#1A3636",
                      }}
                    >
                      {lvl.num}
                    </span>
                    {/* inner groove */}
                    <div
                      className="absolute inset-2 rounded-full border"
                      style={{
                        borderColor:
                          lvl.num === 4
                            ? "rgba(245,240,232,0.3)"
                            : "rgba(26,54,54,0.18)",
                      }}
                    />
                  </div>

                  <div
                    className="text-base font-black mb-0.5"
                    style={{
                      color: "#1A3636",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {lvl.name}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: lvl.accent,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {lvl.nameEn}
                  </div>
                  <div
                    className="text-xs leading-snug line-clamp-2"
                    style={{
                      color: "rgba(45,45,45,0.65)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {lvl.projects.length} 个项目 · {lvl.weeks}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
