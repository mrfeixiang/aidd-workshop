import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  moduleNum: number;
  title: string;
  subtitle: string;
  duration?: string;
  children: ReactNode;
  variant?: "light" | "dark";
  image?: string;
}

export default function SectionWrapper({
  moduleNum,
  title,
  subtitle,
  duration,
  children,
  variant = "light",
  image,
}: SectionWrapperProps) {
  const isDark = variant === "dark";

  return (
    <div
      className="relative py-20 lg:py-28"
      style={{
        backgroundColor: isDark ? "#1A3636" : "#F5F0E8",
      }}
    >
      {image && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: isDark ? 0.08 : 0.06 }}
          />
        </div>
      )}

      <div className="container relative z-10">
        {/* Module header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span
              className="w-10 h-10 flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: isDark ? "#D97757" : "#1A3636",
                color: "#F5F0E8",
                fontFamily: "var(--font-mono)",
              }}
            >
              {String(moduleNum).padStart(2, "0")}
            </span>
            {duration && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: isDark ? "rgba(245,240,232,0.5)" : "rgba(26,54,54,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {duration}
              </span>
            )}
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: isDark ? "#F5F0E8" : "#1A3636",
            }}
          >
            {title}
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed"
            style={{
              color: isDark ? "rgba(245,240,232,0.7)" : "rgba(45,45,45,0.7)",
              fontFamily: "var(--font-body)",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {children}
      </div>
    </div>
  );
}
