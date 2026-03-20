import SectionWrapper from "@/components/SectionWrapper";
import ContentCard from "@/components/ContentCard";
import { motion } from "framer-motion";
import { Zap, AlertTriangle, Sparkles } from "lucide-react";

const AI_TOOLS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/module-ai-tools-ebMc2xHFjpke9VcZCZWZfE.webp";

const toolMap = [
  {
    name: "Claude 3.5 Sonnet / Opus",
    strength: "逻辑推理、长文本解析、代码编写天花板",
    scene: "深度文献阅读、代码辅助、复杂逻辑重组",
    tag: "最推荐通用付费",
  },
  {
    name: "Biomni Lab",
    strength: "斯坦福通用生物医学AI Agent，150+工具，59个数据库",
    scene: "单细胞测序分析、实验方案设计",
    tag: "最推荐免费平台",
  },
  {
    name: "ChatGPT (GPT-4o)",
    strength: "综合能力强，数据分析体验好",
    scene: "数据清洗与分析、通用问题咨询",
    tag: "生态最丰富",
  },
  {
    name: "Kimi (月之暗面)",
    strength: "中文长文本处理极强，免费额度友好",
    scene: "中文专利解析、大量中文文献综述",
    tag: "中文最强",
  },
];

const painPoints = [
  {
    problem: "专业性天花板与幻觉",
    solution: "采用RAG（检索增强生成）结合思维链（CoT）。将信任的PDF文献喂给AI，强制要求标注来源页码。",
  },
  {
    problem: "输出格式失控",
    solution: "使用结构化提示词（如XML标签）。先让AI输出大纲，再分模块扩写。",
  },
  {
    problem: "功能冗余焦虑",
    solution: "做减法。关闭不必要的联网搜索，专注核心对话和文件解析功能。",
  },
];

export default function Module2() {
  return (
    <SectionWrapper
      moduleNum={2}
      title="AI工具选型与痛点破解"
      subtitle="做资产，不做内容——一张持续增值的工具选型地图"
      duration="15 min"
      variant="dark"
      image={AI_TOOLS_IMG}
    >
      {/* Tool comparison table */}
      <ContentCard title="科研场景下的AI工具分工地图" icon={<Zap size={18} />} defaultOpen={true} variant="dark" stamp="资产">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(245,240,232,0.15)" }}>
                <th className="text-left py-2 px-2 font-semibold" style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}>模型/工具</th>
                <th className="text-left py-2 px-2 font-semibold" style={{ color: "#D97757" }}>核心优势</th>
                <th className="text-left py-2 px-2 font-semibold hidden sm:table-cell" style={{ color: "#D97757" }}>最适用场景</th>
                <th className="text-left py-2 px-2 font-semibold" style={{ color: "#D97757" }}>标签</th>
              </tr>
            </thead>
            <tbody>
              {toolMap.map((t) => (
                <tr key={t.name} style={{ borderBottom: "1px solid rgba(245,240,232,0.06)" }}>
                  <td className="py-3 px-2 font-semibold" style={{ color: "#F5F0E8" }}>{t.name}</td>
                  <td className="py-3 px-2" style={{ color: "rgba(245,240,232,0.75)" }}>{t.strength}</td>
                  <td className="py-3 px-2 hidden sm:table-cell" style={{ color: "rgba(245,240,232,0.6)" }}>{t.scene}</td>
                  <td className="py-3 px-2">
                    <span
                      className="text-[10px] px-1.5 py-0.5 whitespace-nowrap"
                      style={{
                        backgroundColor: "rgba(217,119,87,0.2)",
                        color: "#D97757",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentCard>

      {/* Pain points */}
      <ContentCard title="破解三大实操痛点" icon={<AlertTriangle size={18} />} defaultOpen={true} variant="dark" stamp="避坑">
        <div className="grid sm:grid-cols-3 gap-4">
          {painPoints.map((p, i) => (
            <motion.div
              key={p.problem}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4"
              style={{ backgroundColor: "rgba(245,240,232,0.05)", borderLeft: "2px solid #D97757" }}
            >
              <h4 className="text-sm font-bold mb-2" style={{ color: "#D97757", fontFamily: "var(--font-display)" }}>
                {p.problem}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(245,240,232,0.7)" }}>
                {p.solution}
              </p>
            </motion.div>
          ))}
        </div>
      </ContentCard>

      {/* Highlight moment */}
      <ContentCard title="AI的「高光时刻」" icon={<Sparkles size={18} />} variant="dark">
        <p style={{ color: "rgba(245,240,232,0.8)" }}>
          AI在<strong style={{ color: "#D97757" }}>"逻辑重组与格式适配"</strong>上价值极高。例如：将杂乱的实验记录整理成规范的Methods部分；将学术论文摘要改写为面向大众的科普推文；根据目标期刊的Author Guidelines，自动调整参考文献格式和段落结构。
        </p>
      </ContentCard>
    </SectionWrapper>
  );
}
