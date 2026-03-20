import SectionWrapper from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const LOBSTER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030483771/ZVhxscb2cnSYZnp3Vf2e6R/lobster-agents-BgzfH9iPR46jpsJgq8GpVy.webp";

const lobsters = [
  {
    name: "sue",
    persona: "\u6e29\u67d4\u8010\u5fc3\u7684\u5b66\u59d0",
    skill: "\u6587\u732e\u7efc\u8ff0\u4e0e\u5199\u4f5c\u6da6\u8272",
    scene: "\u8bba\u6587\u5199\u4f5c\u3001\u6587\u732e\u6574\u7406\u3001\u82f1\u6587\u6da6\u8272",
    color: "#E8B4B8",
  },
  {
    name: "\ubbff\uc74c",
    persona: "\u97e9\u8bed\u4fe1\u5ff5\u52a9\u624b",
    skill: "\u591a\u8bed\u8a00\u5904\u7406\u4e0e\u60c5\u611f\u652f\u6301",
    scene: "\u97e9\u8bed\u6587\u732e\u7ffb\u8bd1\u3001\u8de8\u6587\u5316\u6c9f\u901a",
    color: "#7DB9DE",
  },
  {
    name: "\u8d39\u5927\u5927\u7684\u52a9\u624b",
    persona: "\u5bfc\u5e08\u98ce\u683c\u7684\u4e25\u8c28\u987e\u95ee",
    skill: "\u5b9e\u9a8c\u8bbe\u8ba1\u4e0e\u6570\u636e\u5206\u6790",
    scene: "\u8bfe\u9898\u89c4\u5212\u3001\u5b9e\u9a8c\u65b9\u6848\u5ba1\u6838",
    color: "#A8D8B9",
  },
  {
    name: "toto wolff",
    persona: "F1\u8d5b\u8f66\u6218\u7565\u5bb6\u601d\u7ef4",
    skill: "\u7ade\u4e89\u5206\u6790\u4e0e\u51b3\u7b56\u4f18\u5316",
    scene: "\u9879\u76ee\u7ba1\u7406\u3001\u7ade\u4e89\u60c5\u62a5\u3001\u8d44\u6e90\u5206\u914d",
    color: "#C4B5FD",
  },
  {
    name: "nukemule",
    persona: "\u786c\u6838\u6280\u672f\u9a61\uff08\u6838\u80fd\u9a74\uff09",
    skill: "\u4ee3\u7801\u5f00\u53d1\u4e0e\u7cfb\u7edf\u90e8\u7f72",
    scene: "\u811a\u672c\u5f00\u53d1\u3001\u73af\u5883\u914d\u7f6e\u3001\u81ea\u52a8\u5316\u90e8\u7f72",
    color: "#FCA5A5",
  },
];

export default function Module6() {
  return (
    <SectionWrapper
      moduleNum={6}
      title={"\u7ec8\u6781\u5c55\u793a\uff1a\u98de\u4e66\u4e4b\u5b50 f(x) \u5e03\u7f6e\u7b2c\u516d\u53ea\ud83e\udde0"}
      subtitle={"\u4ece\u201c\u7528\u5de5\u5177\u201d\u5230\u201c\u517b\u4f19\u4f34\u201d\u2014\u2014\u7ed9AI\u8d4b\u4e88\u4eba\u683c\uff0c\u8f93\u51fa\u8d28\u91cf\u663e\u8457\u63d0\u5347"}
      variant="dark"
    >
      {/* Lobster illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 overflow-hidden"
        style={{ maxHeight: "320px" }}
      >
        <img
          src={LOBSTER_IMG}
          alt="Five AI Lobster Agents"
          className="w-full object-contain"
          style={{ maxHeight: "320px" }}
        />
      </motion.div>

      {/* Lobster cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {lobsters.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="p-4 relative overflow-hidden"
            style={{ backgroundColor: "rgba(245,240,232,0.06)" }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: l.color }}
            />
            <div className="mb-3">
              <span
                className="text-lg font-black"
                style={{ fontFamily: "var(--font-display)", color: l.color }}
              >
                {l.name}
              </span>
            </div>
            <p className="text-[11px] font-semibold mb-1" style={{ color: "rgba(245,240,232,0.9)" }}>
              {l.persona}
            </p>
            <p className="text-[10px] mb-2" style={{ color: "rgba(245,240,232,0.5)" }}>
              {l.skill}
            </p>
            <div
              className="text-[10px] px-2 py-1 inline-block"
              style={{
                backgroundColor: `${l.color}20`,
                color: l.color,
                fontFamily: "var(--font-mono)",
              }}
            >
              {l.scene}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Core insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 text-center"
        style={{
          backgroundColor: "rgba(217,119,87,0.1)",
          borderTop: "2px solid #D97757",
          borderBottom: "2px solid #D97757",
        }}
      >
        <p
          className="text-lg sm:text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "#F5F0E8" }}
        >
          {"\u4e0b\u4e00\u53ea\u9f99\u867e\uff0c\u8be5\u4f60\u81ea\u5df1\u6765\u517b\u4e86\u3002"}
        </p>
        <p className="text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>
          {"\u6bcf\u4e2aAgent\u90fd\u6709\u81ea\u5df1\u7684System Prompt\u3001\u8bb0\u5fc6\u5e93\u548c\u5de5\u5177\u96c6\u3002\u5f53\u4f60\u7ed9AI\u8d4b\u4e88\u4eba\u683c\uff0c\u5b83\u7684\u8f93\u51fa\u8d28\u91cf\u548c\u4e00\u81f4\u6027\u4f1a\u663e\u8457\u63d0\u5347\u3002"}
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
