import SectionWrapper from "@/components/SectionWrapper";
import ContentCard from "@/components/ContentCard";
import { Terminal, FlaskConical, Atom } from "lucide-react";

const DRUG_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/drug-design-3FjpXMj52WkJxXPKDmh3KU.webp";

export default function Module3() {
  return (
    <SectionWrapper
      moduleNum={3}
      title="AIDD核心场景实操"
      subtitle="从龙虾部署到分子动力学——动手才是硬道理"
      duration="15 min"
      image={DRUG_IMG}
    >
      {/* LobeChat Demo */}
      <ContentCard
        title="龙虾（LobeChat/Cline）现场安装演示"
        icon={<Terminal size={18} />}
        defaultOpen={true}
        stamp="Live Demo"
      >
        <p className="mb-4">Docker一键部署LobeChat，在WSL2中安全隔离运行：</p>
        <div
          className="p-4 mb-4 overflow-x-auto text-xs"
          style={{
            backgroundColor: "rgba(26,54,54,0.08)",
            fontFamily: "var(--font-mono)",
            color: "#1A3636",
          }}
        >
          <div style={{ color: "rgba(26,54,54,0.5)" }}># Step 1: 在WSL2终端中运行</div>
          <div className="mt-1">docker run -d -p 3210:3210 \</div>
          <div className="pl-4">-e ACCESS_CODE=your_password \</div>
          <div className="pl-4">lobehub/lobe-chat</div>
          <div className="mt-3" style={{ color: "rgba(26,54,54,0.5)" }}># Step 2: 浏览器打开</div>
          <div className="mt-1">http://localhost:3210</div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-xs font-bold px-1.5 py-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(217,119,87,0.15)", color: "#D97757" }}>避坑</span>
            <p className="text-xs" style={{ color: "rgba(45,45,45,0.75)" }}>
              不使用Docker隔离直接裸跑带系统执行权限的Agent，一旦遭遇恶意Prompt，极易导致系统文件被删。
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-xs font-bold px-1.5 py-0.5 flex-shrink-0" style={{ backgroundColor: "rgba(26,54,54,0.1)", color: "#1A3636" }}>推荐</span>
            <p className="text-xs" style={{ color: "rgba(45,45,45,0.75)" }}>
              <strong>OpenClaw-Medical-Skills</strong>（872个技能）和 <strong>LabClaw</strong>（206个技能）——给Agent装上"医学生物"大脑。
            </p>
          </div>
        </div>
      </ContentCard>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Drug Design */}
        <ContentCard
          title="药物设计与逆合成预测"
          icon={<FlaskConical size={18} />}
          stamp="AIDD"
        >
          <p className="mb-3">AI分子生成从1D序列到2D图结构的显著演化：</p>
          <div className="space-y-3 mb-4">
            {[
              { gen: "1D序列 (SMILES)", tool: "REINVENT", desc: "RNN + REINFORCE策略梯度，经典但处理复杂环系有局限" },
              { gen: "2D图 (Graph)", tool: "GCPN", desc: "PPO + GAN判别器，有效缓解稀疏奖励痛点" },
            ].map((item) => (
              <div key={item.gen} className="p-3" style={{ backgroundColor: "rgba(26,54,54,0.04)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ backgroundColor: "#1A3636", color: "#F5F0E8", fontFamily: "var(--font-mono)" }}>{item.gen}</span>
                  <span className="text-xs font-semibold" style={{ color: "#D97757" }}>{item.tool}</span>
                </div>
                <p className="text-xs" style={{ color: "rgba(45,45,45,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: "rgba(45,45,45,0.65)" }}>
            逆合成预测推荐：<strong>AiZynthFinder</strong>、<strong>ASKCOS</strong>、<strong>IBM RXN for Chemistry</strong>
          </p>
        </ContentCard>

        {/* MD Simulation */}
        <ContentCard
          title="分子动力学与自由能计算"
          icon={<Atom size={18} />}
        >
          <p className="mb-3">
            利用AI在开源软件（GROMACS, OpenFE）中跑模拟，核心是<strong style={{ color: "#D97757" }}>自动化工作流</strong>。
          </p>
          <div className="space-y-2">
            {[
              { tool: "gromacs_copilot", desc: "让LLM自动生成GROMACS运行脚本" },
              { tool: "gmx_MMPBSA", desc: "封装好的自动化FEP和MM/GBSA工具" },
              { tool: "AI助手", desc: "帮你生成配置文件和解析复杂的输出能量项" },
            ].map((item) => (
              <div key={item.tool} className="flex gap-2 text-xs">
                <span className="font-semibold flex-shrink-0" style={{ color: "#1A3636", fontFamily: "var(--font-mono)" }}>{item.tool}</span>
                <span style={{ color: "rgba(45,45,45,0.7)" }}>{item.desc}</span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 p-3 text-xs italic"
            style={{ backgroundColor: "rgba(217,119,87,0.08)", color: "#D97757" }}
          >
            AI正在把"专家专属"变成"人人可用"。
          </div>
        </ContentCard>
      </div>
    </SectionWrapper>
  );
}
