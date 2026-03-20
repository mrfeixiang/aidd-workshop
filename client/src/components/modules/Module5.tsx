import SectionWrapper from "@/components/SectionWrapper";
import ContentCard from "@/components/ContentCard";
import { motion } from "framer-motion";
import { Code, GraduationCap, Bot, Briefcase } from "lucide-react";

const LAB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/lab-automation-VoYYHXpWXT7DVD8WpDShCt.webp";

export default function Module5() {
  return (
    <SectionWrapper
      moduleNum={5}
      title="编程与实验室自动化"
      subtitle="从Claude Code到Self-driving Lab——AI正在重新定义实验室"
      duration="10 min"
      image={LAB_IMG}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ContentCard
            title="Claude Code与零基础入门"
            icon={<Code size={18} />}
            defaultOpen={true}
          >
            <p className="mb-3">
              非内行入门不需要系统学Python，只需掌握基本的命令行操作（如<code className="text-xs px-1 py-0.5" style={{ backgroundColor: "rgba(26,54,54,0.08)", fontFamily: "var(--font-mono)" }}>cd</code>、<code className="text-xs px-1 py-0.5" style={{ backgroundColor: "rgba(26,54,54,0.08)", fontFamily: "var(--font-mono)" }}>ls</code>）。
            </p>
            <div
              className="p-3 text-xs mb-3"
              style={{ backgroundColor: "rgba(26,54,54,0.06)", fontFamily: "var(--font-mono)" }}
            >
              <span style={{ color: "rgba(26,54,54,0.5)" }}>// 入门任务示例</span>
              <br />
              "用Python写一个脚本，把这个Excel里的
              <br />
              分子SMILES批量转换为2D图片"
            </div>
            <p className="text-xs" style={{ color: "rgba(45,45,45,0.7)" }}>
              推荐AI原生IDE：<strong>Cursor</strong>、<strong>Windsurf</strong>、<strong>Kiro</strong>
            </p>
          </ContentCard>

          <ContentCard
            title="趣味学习：OpenMAIC互动课堂"
            icon={<GraduationCap size={18} />}
          >
            <p className="mb-2">
              清华大学开源的<strong style={{ color: "#D97757" }}>OpenMAIC</strong>（开放多智能体交互课堂），一键将任何主题转化为沉浸式AI互动课堂。
            </p>
            <div className="space-y-1 text-xs" style={{ color: "rgba(45,45,45,0.7)" }}>
              <p>AI老师讲解幻灯片 + AI同学实时语音讨论</p>
              <p>深度集成OpenClaw，在飞书/Slack中直接启动</p>
              <p>理解"Agent如何协作解决复杂问题"的绝佳案例</p>
            </div>
          </ContentCard>
        </div>

        <div className="space-y-6">
          <ContentCard
            title="Agent驱动的Self-driving Lab"
            icon={<Bot size={18} />}
            stamp="未来"
          >
            <p className="mb-3">
              Agent调动设备的核心是<strong style={{ color: "#D97757" }}>API接口</strong>。
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 text-center" style={{ backgroundColor: "rgba(26,54,54,0.05)" }}>
                <div className="text-xs font-bold mb-1" style={{ color: "#1A3636" }}>能调动</div>
                <div className="text-[11px]" style={{ color: "rgba(45,45,45,0.65)" }}>液相色谱仪<br />自动化移液站</div>
              </div>
              <div className="p-3 text-center" style={{ backgroundColor: "rgba(217,119,87,0.08)" }}>
                <div className="text-xs font-bold mb-1" style={{ color: "#D97757" }}>不能调动</div>
                <div className="text-[11px]" style={{ color: "rgba(45,45,45,0.65)" }}>纯机械设备<br />老旧模拟设备</div>
              </div>
            </div>
            <p className="text-xs italic" style={{ color: "rgba(45,45,45,0.6)" }}>
              未来趋势：AI规划蛋白纯化流程，直接发送指令给AKTA等纯化系统执行。
            </p>
          </ContentCard>

          <ContentCard
            title="就业展望与破局之道"
            icon={<Briefcase size={18} />}
            stamp="破局心法"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-4 mb-4 text-center"
              style={{ backgroundColor: "rgba(26,54,54,0.06)" }}
            >
              <p className="text-sm font-bold" style={{ color: "#1A3636", fontFamily: "var(--font-display)" }}>
                AI科研 = <span style={{ color: "#D97757" }}>脏活外包</span> + <span style={{ color: "#D97757" }}>湿实验壁垒</span> + <span style={{ color: "#D97757" }}>跨界反哺</span>
              </p>
            </motion.div>
            <div className="space-y-2 text-xs">
              {[
                "把AI当做解决\u201c脏活累活\u201d的效率工具",
                "人类不可替代的湿实验壁垒：合成直觉、纯化手感",
                "用湿实验反哺干实验：成为连接两者的桥梁",
              ].map((p) => (
                <div key={p} className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#D97757" }} />
                  <span style={{ color: "rgba(45,45,45,0.75)" }}>{p}</span>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
