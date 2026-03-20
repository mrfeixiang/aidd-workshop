export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#1A3636" }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Father's quote */}
          <blockquote
            className="text-sm sm:text-base italic leading-relaxed mb-6 px-4"
            style={{ color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-display)" }}
          >
            {"\u201c\u5047\u5982\u6211\u662f\u542c\u8005\uff0c\u5e0c\u671b\u8001\u5e08\u8bb2\u7684\u5185\u5bb9\u5b9e\u7528\u6613\u61c2\uff0c\u7a81\u51fa\u4f18\u70b9\u3002\u5728\u7406\u89e3\u7684\u524d\u63d0\u4e0b\uff0c\u5982\u80fd\u9002\u5f53\u4ecb\u7ecd\u5de5\u5177\u5e95\u5c42\u7684\u77e5\u8bc6\u652f\u6491\u4f53\u7cfb\u548c\u539f\u7406\uff0c\u90a3\u4f1a\u66f4\u6709\u5174\u8da3\u3002\u201d"}
          </blockquote>
          <p className="text-xs mb-8" style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-mono)" }}>
            {"\u2014\u2014 \u6765\u81ea\u7236\u4eb2\u7684\u671f\u8bb8"}
          </p>

          {/* Takeaways */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { label: "\u5b9e\u7528", desc: "\u89e3\u51b3\u771f\u5b9e\u75db\u70b9" },
              { label: "\u539f\u7406", desc: "\u77e5\u5176\u7136\u66f4\u77e5\u6240\u4ee5\u7136" },
              { label: "\u5e78\u798f", desc: "\u638c\u63a7\u611f\u6765\u81ea\u7406\u89e3" },
            ].map((t) => (
              <div key={t.label} className="text-center">
                <div className="text-lg font-black" style={{ color: "#D97757", fontFamily: "var(--font-display)" }}>
                  {t.label}
                </div>
                <div className="text-[11px]" style={{ color: "rgba(245,240,232,0.5)" }}>
                  {t.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            className="h-px mb-6"
            style={{ backgroundColor: "rgba(245,240,232,0.1)" }}
          />

          <p className="text-xs" style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-mono)" }}>
            {"\u300aAI\u5de5\u5177\u7684\u4e50\u4e0e\u6012\u300b\u7cfb\u5217\u5e8f\u7ae0 \u00b7 \u6d77\u9614\u5929\u7a7a\uff0c\u539f\u8c05\u6211\u8fd9\u4e00\u751f\u4e0d\u7f81\u653e\u7eb5\u7231\u81ea\u7531"}
          </p>
        </div>
      </div>
    </footer>
  );
}
