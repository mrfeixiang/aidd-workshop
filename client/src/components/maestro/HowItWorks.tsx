import { motion } from "framer-motion";
import { GitFork, Terminal, GitPullRequest, Award } from "lucide-react";

const STEPS = [
  {
    icon: GitFork,
    title: "Fork 仓库",
    desc: "每个项目都是一个独立的 GitHub repo。你先 fork 到自己账号，让代码真正属于你。",
  },
  {
    icon: Terminal,
    title: "Clone 跑通",
    desc: "README 里有一条 `make setup` 或 `conda env create`。能跑起来，才叫看得见。",
  },
  {
    icon: GitPullRequest,
    title: "提交 PR",
    desc: "按 issue 清单改代码 / 补实验 / 写 report，推回自己 repo，再向 upstream 提 PR。",
  },
  {
    icon: Award,
    title: "通关发证",
    desc: "PR 被 merge 后，自动在你的 AIDD portfolio 里生成一枚徽章。五枚集齐 = 精通。",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-24 relative"
      style={{ backgroundColor: "#EDE8DD" }}
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
              how it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black mb-4"
              style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
            >
              学习循环只有四步
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-5 text-center"
                style={{
                  backgroundColor: "#FBF8F1",
                  border: "1px solid rgba(26,54,54,0.1)",
                }}
              >
                {/* step index */}
                <div
                  className="absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-bold tracking-[0.25em]"
                  style={{
                    backgroundColor: "#1A3636",
                    color: "#F5F0E8",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  STEP 0{i + 1}
                </div>

                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 mt-2"
                  style={{
                    backgroundColor: "rgba(217,119,87,0.12)",
                    color: "#D97757",
                  }}
                >
                  <s.icon size={24} />
                </div>
                <h3
                  className="text-lg font-black mb-2"
                  style={{
                    color: "#1A3636",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "rgba(45,45,45,0.7)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
