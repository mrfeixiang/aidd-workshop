import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, BookMarked } from "lucide-react";

interface AppendixGroupProps {
  title: string;
  children: React.ReactNode;
}

function AppendixGroup({ title, children }: AppendixGroupProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(26,54,54,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: "#1A3636", fontFamily: "var(--font-display)" }}>
          {title}
        </span>
        <ChevronDown
          size={16}
          className="transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "rgba(26,54,54,0.4)",
          }}
        />
      </button>
      {open && (
        <div className="pb-4 text-xs leading-relaxed" style={{ color: "rgba(45,45,45,0.75)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

const quickRef = [
  { scene: "\u6587\u732e\u9605\u8bfb", tools: "Zotero + PapersGPT, ChatPaper, Scholarcy, NotebookLM", reason: "\u4ece\u7ba1\u7406\u5230\u521d\u7b5b\u5230\u6df1\u5ea6\u6574\u5408\u7684\u5168\u94fe\u8def" },
  { scene: "\u5199\u4f5c\u6392\u7248", tools: "OpenAI Prism, Overleaf, Mathpix", reason: "AI\u539f\u751fLaTeX\u7f16\u8f91\u5668\uff0c\u514d\u8d39\u65e0\u9650\u534f\u4f5c" },
  { scene: "\u79d1\u7814\u7ed8\u56fe", tools: "AutoFigure-Edit, Vector Magic, Inkscape", reason: "\u6587\u672c\u8f6cSVG\u77e2\u91cf\u56fe\uff0c\u964d\u7ef4\u6253\u51fb" },
  { scene: "\u7f16\u7a0b\u8f85\u52a9", tools: "Claude Code, Cursor, Windsurf, Kiro IDE", reason: "\u81ea\u7136\u8bed\u8a00\u9a71\u52a8\u4ee3\u7801\u5f00\u53d1" },
  { scene: "\u5206\u5b50\u6a21\u62df", tools: "GROMACS + gromacs_copilot, gmx_MMPBSA", reason: "AI\u81ea\u52a8\u5316\u5206\u5b50\u52a8\u529b\u5b66\u5de5\u4f5c\u6d41" },
  { scene: "\u6570\u636e\u5206\u6790", tools: "ChatGPT Advanced Data Analysis, Biomni Lab", reason: "\u6570\u636e\u6e05\u6d17\u4e0e\u751f\u7269\u533b\u5b66\u5206\u6790" },
  { scene: "\u5206\u5b50\u751f\u6210", tools: "REINVENT, GCPN, Ouroboros, Spark/SeeSAR", reason: "\u4ece1D\u5e8f\u5217\u52302D\u56fe\u7ed3\u6784\u7684\u5b8c\u6574\u6f14\u5316" },
  { scene: "\u9006\u5408\u6210\u9884\u6d4b", tools: "AiZynthFinder, ASKCOS, IBM RXN", reason: "\u5408\u6210\u53ef\u884c\u6027\u9a8c\u8bc1\u4e0e\u8def\u7ebf\u89c4\u5212" },
  { scene: "Agent\u90e8\u7f72", tools: "LobeChat (Docker), OpenClaw + WSL2", reason: "\u5b89\u5168\u9694\u79bb\u7684\u79c1\u4ebaAgent\u90e8\u7f72" },
  { scene: "\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316", tools: "LabClaw, OpenClaw-Medical-Skills", reason: "\u6c38\u8fdc\u5728\u7ebf\u7684\u5b9e\u9a8c\u5ba4Agent" },
];

export default function AppendixSection() {
  return (
    <div className="py-20 lg:py-28" style={{ backgroundColor: "#EDE8DD" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <BookMarked size={24} style={{ color: "#D97757" }} />
          <h2
            className="text-2xl sm:text-3xl font-black"
            style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
          >
            {"\u8bfe\u540e\u9644\u5f55"}
          </h2>
          <span
            className="text-[10px] tracking-wider uppercase px-2 py-0.5"
            style={{ backgroundColor: "rgba(26,54,54,0.08)", color: "rgba(26,54,54,0.5)", fontFamily: "var(--font-mono)" }}
          >
            {"\u4f1a\u540e\u67e5\u9605"}
          </span>
        </motion.div>

        <div className="max-w-4xl">
          {/* Quick reference table */}
          <AppendixGroup title={"\u9644\u5f55C\uff1a\u5b8c\u6574\u5de5\u5177\u63a8\u8350\u901f\u67e5\u8868"}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(26,54,54,0.1)" }}>
                    <th className="text-left py-2 pr-3 font-semibold" style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}>{"\u573a\u666f"}</th>
                    <th className="text-left py-2 pr-3 font-semibold" style={{ color: "#D97757" }}>{"\u63a8\u8350\u5de5\u5177"}</th>
                    <th className="text-left py-2 font-semibold hidden sm:table-cell" style={{ color: "#D97757" }}>{"\u63a8\u8350\u7406\u7531"}</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRef.map((r) => (
                    <tr key={r.scene} style={{ borderBottom: "1px solid rgba(26,54,54,0.05)" }}>
                      <td className="py-2 pr-3 font-medium" style={{ color: "#1A3636" }}>{r.scene}</td>
                      <td className="py-2 pr-3" style={{ color: "rgba(45,45,45,0.75)" }}>{r.tools}</td>
                      <td className="py-2 hidden sm:table-cell" style={{ color: "rgba(45,45,45,0.55)" }}>{r.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AppendixGroup>

          {/* Private collection */}
          <AppendixGroup title={"\u9644\u5f55A\uff1a\u4e3b\u8bb2\u4eba\u79c1\u85cf\u5de5\u5177\u6e05\u5355"}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u9876\u7ea7Agent\u4e0e\u6587\u732e\u795e\u5668"}</h4>
                <div className="space-y-1">
                  <p><strong>Manus</strong>{"\uff1a\u76ee\u524d\u4f53\u9a8c\u6700\u597d\u7684\u5168\u80fd\u578bAgent\u4e4b\u4e00"}</p>
                  <p><strong>NotebookLM (Google)</strong>{"\uff1a\u6587\u732e\u9605\u8bfb\u7684\u964d\u7ef4\u6253\u51fb\u5de5\u5177\uff0c\u80fd\u751f\u6210\u9ad8\u8d28\u91cf\u64ad\u5ba2"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u524d\u6cbf\u5927\u6a21\u578b\u5f62\u6001"}</h4>
                <div className="space-y-1">
                  <p><strong>ChatGPT 5.4 Atlas</strong>{"\uff1aAI\u6df1\u5ea6\u5d4c\u5165\u6d4f\u89c8\u5668\uff0c\u80fd\u770b\u61c2\u5e76\u64cd\u4f5c\u7f51\u9875\u5143\u7d20"}</p>
                  <p><strong>Claude Co-work</strong>{"\uff1a\u56e2\u961f\u534f\u4f5c\u7684AI\u5de5\u4f5c\u7a7a\u95f4"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u672c\u5730\u5316\u90e8\u7f72\u4e0e\u751f\u6001\u6574\u5408"}</h4>
                <div className="space-y-1">
                  <p><strong>OpenClaw + Qwen 70B</strong>{"\uff1a100%\u6570\u636e\u9690\u79c1\u7684\u672c\u5730Agent\u65b9\u6848"}</p>
                  <p><strong>OpenClaw + \u98de\u4e66</strong>{"\uff1a\u901a\u8fc7\u98de\u4e66\u6d88\u606f\u76f4\u63a5\u5524\u9192\u7684\u79d1\u7814\u52a9\u7406"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u7f16\u7a0b\u4e0e\u65e5\u5e38\u6548\u7387"}</h4>
                <div className="space-y-1">
                  <p><strong>Kiro IDE</strong>{"\uff1a\u4e13\u4e3aAI\u65f6\u4ee3\u8bbe\u8ba1\u7684\u8f7b\u91cf\u7ea7IDE"}</p>
                  <p><strong>Code Buddy CN</strong>{"\uff1a\u56fd\u5185\u7f51\u7edc\u7a33\u5b9a\u3001\u4e2d\u6587\u652f\u6301\u6781\u4f73"}</p>
                  <p><strong>Grok</strong>{"\uff1a\u5b9e\u65f6\u4fe1\u606f\u83b7\u53d6\u80fd\u529b\u6700\u5f3a"}</p>
                  <p><strong>{"\u8c46\u5305 App"}</strong>{"\uff1a\u624b\u673a\u7aef\u6700\u597d\u7528\u7684AI\u52a9\u624b\u4e4b\u4e00"}</p>
                </div>
              </div>
            </div>
          </AppendixGroup>

          {/* CADD Toolbox */}
          <AppendixGroup title={"\u9644\u5f55B\uff1aCADD\u786c\u6838\u5de5\u5177\u7bb1"}>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u5e95\u5c42\u6570\u636e\u5e93\u57fa\u77f3"}</h4>
                <p><strong>SciFinder / BioFinder</strong>{"\uff1a\u836f\u7269\u5316\u5b66\u5bb6\u7684\u201c\u5bfb\u5b9d\u56fe\u201d"}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u57fa\u4e8e\u7269\u7406\u8ba1\u7b97\u7684\u201c\u4e09\u5251\u5ba2\u201d"}</h4>
                <div className="space-y-1">
                  <p><strong>Glide</strong>{"\uff1a\u5206\u5b50\u5bf9\u63a5\u884c\u4e1a\u6807\u6746"}</p>
                  <p><strong>Desmond</strong>{"\uff1a\u9ad8\u6027\u80fd\u5206\u5b50\u52a8\u529b\u5b66\u6a21\u62df"}</p>
                  <p><strong>GROMACS</strong>{"\uff1a\u5f00\u6e90\u754c\u6700\u5f3a\u5206\u5b50\u52a8\u529b\u5b66\u5f15\u64ce"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u57fa\u4e8eML\u7684\u9884\u6d4b\u5148\u950b"}</h4>
                <div className="space-y-1">
                  <p><strong>Boltz2</strong>{"\uff1a\u751f\u7269\u5206\u5b50\u7ed3\u6784\u9884\u6d4b\u6a21\u578b"}</p>
                  <p><strong>Isodde</strong>{"\uff1a\u7279\u5b9a\u5c5e\u6027/\u6d3b\u6027\u7684\u9ad8\u6548ML\u9884\u6d4b\u5de5\u5177"}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "#1A3636" }}>{"\u5206\u5b50\u751f\u6210\u7684\u65b0\u661f"}</h4>
                <div className="space-y-1">
                  <p><strong>Spark / SeeSAR</strong>{"\uff1a\u57fa\u4e8e\u9aa8\u67b6\u8dc3\u8fc1\u548c\u836f\u6548\u56e2\u7684\u5206\u5b50\u751f\u6210\u4e0e\u4f18\u5316"}</p>
                  <p><strong>Ouroboros</strong>{"\uff1a\u7edf\u4e00\u5206\u5b50\u8868\u5f81\u5b66\u4e60\u4e0e\u751f\u6210"}</p>
                </div>
              </div>
            </div>
          </AppendixGroup>

          {/* References */}
          <AppendixGroup title={"\u53c2\u8003\u6587\u732e"}>
            <div className="space-y-1.5 text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "rgba(45,45,45,0.6)" }}>
              {[
                "[1] \u817e\u8baf\u4e91\u5f00\u53d1\u8005\u793e\u533a. (2025). OpenClaw Skills \u7684\u5b89\u5168\u98ce\u9669\u4e0e\u4f7f\u7528\u5efa\u8bae.",
                "[2] Zou, Y., et al. (2025). El Agente: An autonomous agent for quantum chemistry. Matter, 8(7).",
                "[3] MolecularAI. (2025). AiZynthFinder: A tool for retrosynthetic planning. GitHub.",
                "[4] Tharun2806. (2025). Hybrid-Adverse-Drug-Reactions-Predictor. GitHub.",
                "[5] ResearAI. (2026). AutoFigure-Edit: Generating Editable Scientific Illustration. GitHub.",
                "[6] SNAP Stanford. (2025). Biomni: A General-Purpose Biomedical AI Agent. bioRxiv.",
                "[7] FreedomIntelligence. (2026). OpenClaw-Medical-Skills. GitHub.",
                "[8] Wu, Y. C., et al. (2026). LabClaw: Skill Library for Autonomous Biomedical Research. GitHub.",
                "[9] OpenAI. (2026). Prism: A free, LaTeX Editor and AI-native workspace for scientists.",
                "[10] Wang-Lin-boop. (2025). Ouroboros: Directed Chemical Evolution. GitHub.",
                "[11] THU-MAIC. (2026). OpenMAIC: Open Multi-Agent Interactive Classroom. GitHub.",
                "[12] Sumita, M., et al. (2026). Molecular Design with AI. Chemical Reviews.",
                "[13] Zhang, Z. (2026). frontend-slides: Create beautiful slides on the web. GitHub.",
              ].map((ref) => (
                <p key={ref}>{ref}</p>
              ))}
            </div>
          </AppendixGroup>
        </div>
      </div>
    </div>
  );
}
