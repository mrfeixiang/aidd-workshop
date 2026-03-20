import SectionWrapper from "@/components/SectionWrapper";
import ContentCard from "@/components/ContentCard";
import { motion } from "framer-motion";
import { Heart, Shield } from "lucide-react";

export default function Module1() {
  return (
    <SectionWrapper
      moduleNum={1}
      title="破冰与宏观视角"
      subtitle="直面灵魂拷问：我们折腾AI，到底是为了什么？"
      duration="10 min"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div>
          <ContentCard
            title="为什么要折腾这些AI工具？你幸福吗？"
            icon={<Heart size={18} />}
            defaultOpen={true}
            stamp="灵魂拷问"
          >
            <p className="mb-4">
              许多人在折腾环境配置、应对AI幻觉时，会产生严重的内耗。我们折腾AI，不是为了成为工具的奴隶，而是为了<strong style={{ color: "#D97757" }}>解放创造力</strong>。
            </p>
            <blockquote
              className="border-l-2 pl-4 my-4 italic"
              style={{ borderColor: "#D97757", color: "rgba(45,45,45,0.7)" }}
            >
              想去健身房和转发健身鸡汤，是两件完全不同的事。思想领导力，就活在理想与行动之间的那道缝隙里。
            </blockquote>
            <p className="mb-3">
              幸福感来源于<strong>"掌控感"</strong>——当你能用一行提示词完成过去需要一周的文献筛查，当你能让AI写出复杂的量化计算脚本时，那种从繁杂重复劳动中解脱出来的成就感，就是科研的幸福。
            </p>
            <div
              className="mt-4 p-3 text-xs"
              style={{
                backgroundColor: "rgba(26,54,54,0.06)",
                fontFamily: "var(--font-mono)",
                color: "#1A3636",
              }}
            >
              <strong>核心心法：</strong>建立标准化的SOP，让AI适应你的工作流，而不是你适应AI。
            </div>
          </ContentCard>
        </div>

        {/* Right column */}
        <div>
          <ContentCard
            title="面对OpenClaw的争议，非内行应采取什么态度？"
            icon={<Shield size={18} />}
            defaultOpen={true}
            stamp="战略防御"
          >
            <p className="mb-4">
              近期关于"OpenClaw是一种劣币驱逐良币的成功"的说法甚嚣尘上。作为非计算机专业的药学研究者，我们应采取<strong style={{ color: "#D97757" }}>"战略上重视，战术上防御"</strong>的态度。
            </p>
            <div className="space-y-3 mb-4">
              {[
                { label: "物理隔离", desc: "绝对不要在存放核心未发表数据的本地生产环境电脑上直接裸跑未知来源的Agent" },
                { label: "使用虚拟机或WSL部署", desc: "这是解决越权和安全风险的最低成本方案" },
                { label: "精选Skills", desc: "只使用官方认证或高Star开源项目提供的技能" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#D97757" }}
                  />
                  <div>
                    <strong>{item.label}：</strong>
                    <span style={{ color: "rgba(45,45,45,0.75)" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </div>

      {/* Key insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ backgroundColor: "rgba(26,54,54,0.06)" }}
      >
        <span
          className="text-[10px] tracking-wider uppercase px-2 py-1 font-bold flex-shrink-0"
          style={{
            border: "1.5px solid #D97757",
            color: "#D97757",
            transform: "rotate(-2deg)",
            fontFamily: "var(--font-mono)",
          }}
        >
          鲜明立场
        </span>
        <p className="text-sm leading-relaxed" style={{ color: "#1A3636" }}>
          宁要漏洞百出的行动，不要完美无瑕的等待。权威的思想领袖对过去看得更清；有立场的思想领袖对未来看得更远。
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
