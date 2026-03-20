import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface ContentCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "light" | "dark";
  stamp?: string;
}

export default function ContentCard({
  title,
  icon,
  children,
  defaultOpen = false,
  variant = "light",
  stamp,
}: ContentCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="border-l-2 mb-6"
      style={{
        borderColor: isDark ? "rgba(217,119,87,0.5)" : "rgba(26,54,54,0.15)",
        backgroundColor: isDark ? "rgba(245,240,232,0.04)" : "rgba(26,54,54,0.02)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{
          color: isDark ? "#F5F0E8" : "#1A3636",
        }}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span style={{ color: "#D97757" }}>{icon}</span>
          )}
          <span
            className="text-base sm:text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </span>
          {stamp && (
            <span
              className="hidden sm:inline-block text-[10px] tracking-wider uppercase px-2 py-0.5 font-bold"
              style={{
                border: "1.5px solid #D97757",
                color: "#D97757",
                transform: "rotate(-2deg)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {stamp}
            </span>
          )}
        </div>
        <ChevronDown
          size={18}
          className="transition-transform flex-shrink-0"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: isDark ? "rgba(245,240,232,0.5)" : "rgba(26,54,54,0.4)",
          }}
        />
      </button>

      {open && (
        <div
          className="px-5 pb-5 text-sm leading-relaxed"
          style={{
            color: isDark ? "rgba(245,240,232,0.8)" : "rgba(45,45,45,0.85)",
            fontFamily: "var(--font-body)",
          }}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
}
