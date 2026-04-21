import { motion } from "framer-motion";
import { SKILL_PILLARS } from "@/data/maestro";

export default function SkillsMatrix() {
  return (
    <section
      className="py-20 sm:py-24 relative"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}
            >
              六根支柱 · six pillars
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
            >
              AIDD 工程师长成的六个维度
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
              项目不是乱堆的。每条支柱都在五个关卡里被反复训练，
              直到你能独立设计自己的 AIDD 流程。
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_PILLARS.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-6 border group overflow-hidden"
                style={{
                  backgroundColor: "#FBF8F1",
                  borderColor: "rgba(26,54,54,0.1)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full transition-all group-hover:w-2"
                  style={{ backgroundColor: "#D97757" }}
                />
                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-2"
                  style={{
                    color: "rgba(26,54,54,0.5)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} · pillar
                </div>
                <h3
                  className="text-2xl font-black mb-2"
                  style={{
                    color: "#1A3636",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {p.label}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "rgba(45,45,45,0.7)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
