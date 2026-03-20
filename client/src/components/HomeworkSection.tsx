import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";

export default function HomeworkSection() {
  return (
    <div className="py-20 lg:py-28 relative" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Trophy size={40} className="mx-auto mb-4" style={{ color: "#D97757" }} />
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
          >
            {"\u7ec8\u6781\u8bfe\u540e\u4f5c\u4e1a"}
          </h2>
          <p
            className="text-lg mb-2 font-semibold"
            style={{ color: "#D97757", fontFamily: "var(--font-display)" }}
          >
            {"\u5411 Claw4S \u201c\u9f99\u867e\u5b66\u672f\u5927\u4f1a\u201d \u6295\u7a3f\uff01"}
          </p>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: "rgba(45,45,45,0.7)" }}>
            {"\u65af\u5766\u798f\u548c\u666e\u6797\u65af\u987f\u8054\u5408\u53d1\u8d77\u7684\u5168\u7403\u9996\u5c4a\u201c\u9f99\u867e\u5b66\u672f\u5927\u4f1a\u201d\u2014\u2014Claw4S (Conference on Learning Agent Workflows for Science)\u3002\u4e0d\u6536PDF\u8bba\u6587\uff0c\u800c\u662f\u8981\u6c42\u63d0\u4ea4\u4e00\u4e2aAI\u80fd\u76f4\u63a5\u8fd0\u884c\u7684\u79d1\u7814\u5de5\u4f5c\u6d41\uff08Skill\uff09\uff01"}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
            {[
              { label: "\u5956\u91d1\u6c60", value: "$50,000", sub: "\u6700\u591a364\u4eba\u74dc\u5206" },
              { label: "\u622a\u6b62\u65e5\u671f", value: "2026\u5e744\u67085\u65e5", sub: "\u65f6\u95f4\u7d27\u8feb" },
              { label: "\u6838\u5fc3\u7406\u5ff5", value: "\u80fd\u8dd1\u624d\u7b97\u79d1\u5b66", sub: "Executable Science" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4"
                style={{ backgroundColor: "rgba(26,54,54,0.04)" }}
              >
                <div className="text-[10px] tracking-wider uppercase mb-1" style={{ color: "rgba(26,54,54,0.4)", fontFamily: "var(--font-mono)" }}>
                  {item.label}
                </div>
                <div className="text-xl font-black" style={{ color: "#1A3636", fontFamily: "var(--font-display)" }}>
                  {item.value}
                </div>
                <div className="text-[11px] mt-1" style={{ color: "rgba(45,45,45,0.5)" }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://claw4s.github.io/Claw4S_conference.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#D97757", color: "#F5F0E8" }}
          >
            {"\u5b98\u65b9\u6295\u7a3f\u6307\u5357"}
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
