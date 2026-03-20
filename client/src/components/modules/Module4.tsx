import SectionWrapper from "@/components/SectionWrapper";
import ContentCard from "@/components/ContentCard";
import { BookOpen, Palette, FileText } from "lucide-react";

export default function Module4() {
  return (
    <SectionWrapper
      moduleNum={4}
      title="科研效率工具箱"
      subtitle="读文献、画图、写论文——AI让脏活累活变成一键操作"
      duration="10 min"
      variant="dark"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Literature */}
        <ContentCard
          title="高效读文献与防编造"
          icon={<BookOpen size={18} />}
          defaultOpen={true}
          variant="dark"
        >
          <div className="space-y-3 mb-4">
            {[
              { name: "Zotero + PapersGPT", desc: "无缝集成在文献库中" },
              { name: "ChatPaper", desc: "全流程总结润色" },
              { name: "Scholarcy", desc: "生成文献闪卡" },
            ].map((t) => (
              <div key={t.name} className="flex gap-2 text-xs">
                <span className="font-semibold flex-shrink-0" style={{ color: "#D97757" }}>{t.name}</span>
                <span style={{ color: "rgba(245,240,232,0.65)" }}>{t.desc}</span>
              </div>
            ))}
          </div>
          <div
            className="p-3 text-xs"
            style={{ backgroundColor: "rgba(245,240,232,0.05)", borderLeft: "2px solid #D97757" }}
          >
            <strong style={{ color: "#D97757" }}>防编造策略：</strong>
            <span style={{ color: "rgba(245,240,232,0.7)" }}>
              使用具备真实联网溯源能力的工具（如Perplexity AI、Kimi），或严格限定在上传的PDF范围内问答。
            </span>
          </div>
        </ContentCard>

        {/* Drawing */}
        <ContentCard
          title="科研绘图：降维打击"
          icon={<Palette size={18} />}
          defaultOpen={true}
          variant="dark"
        >
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-bold mb-1" style={{ color: "#D97757" }}>AutoFigure-Edit</h5>
              <p className="text-xs" style={{ color: "rgba(245,240,232,0.7)" }}>
                西湖大学开发的开源工具，从长篇科学文本直接生成可编辑的SVG矢量图。通过Docker一键部署Web界面。
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold mb-1" style={{ color: "#D97757" }}>AI图片转矢量</h5>
              <p className="text-xs" style={{ color: "rgba(245,240,232,0.7)" }}>
                使用Vector Magic或Inkscape的"Trace Bitmap"功能，将位图转换为SVG矢量图。
              </p>
            </div>
          </div>
        </ContentCard>

        {/* LaTeX */}
        <ContentCard
          title="LaTeX终极形态：OpenAI Prism"
          icon={<FileText size={18} />}
          defaultOpen={true}
          variant="dark"
          stamp="重磅"
        >
          <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.8)" }}>
            OpenAI最新发布的<strong style={{ color: "#D97757" }}>免费、AI原生的LaTeX编辑器</strong>。
          </p>
          <div className="space-y-2">
            {[
              "完全免费：无限协作者、无限项目",
              "项目感知AI：理解整篇论文上下文",
              "Image to Code：截图转公式",
              "Voice to Code：语音转代码",
              "内置AI校对与引用管理",
            ].map((f) => (
              <div key={f} className="flex gap-2 text-xs items-start">
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#D97757" }} />
                <span style={{ color: "rgba(245,240,232,0.75)" }}>{f}</span>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </SectionWrapper>
  );
}
