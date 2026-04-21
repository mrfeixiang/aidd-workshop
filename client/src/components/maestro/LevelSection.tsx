import { motion } from "framer-motion";
import { CheckCircle2, BookOpen } from "lucide-react";
import type { Level } from "@/data/maestro";
import ProjectCard from "./ProjectCard";

interface LevelSectionProps {
  level: Level;
  isLast: boolean;
}

export default function LevelSection({ level, isLast }: LevelSectionProps) {
  const isDark = level.num === 4;
  const bg = isDark ? "#1A3636" : "#F5F0E8";
  const text = isDark ? "#F5F0E8" : "#1A3636";
  const subtext = isDark ? "rgba(245,240,232,0.75)" : "rgba(45,45,45,0.78)";
  const mutedBorder = isDark ? "rgba(245,240,232,0.15)" : "rgba(26,54,54,0.12)";

  return (
    <section
      id={level.id}
      className="relative py-20 sm:py-24"
      style={{ backgroundColor: bg }}
    >
      <div className="container">
        {/* Level header — poster-style asymmetric split */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 max-w-6xl mx-auto">
          {/* Left: huge kanji + number */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div
              className="absolute -top-4 -left-2 text-[11px] tracking-[0.3em] uppercase"
              style={{
                color: level.accent,
                fontFamily: "var(--font-mono)",
              }}
            >
              Level / L{level.num}
            </div>
            <div className="flex items-baseline gap-3">
              <span
                className="text-[10rem] sm:text-[14rem] leading-none font-black select-none"
                style={{
                  color: level.accent,
                  fontFamily: "var(--font-display)",
                  opacity: 0.85,
                }}
              >
                {level.num}
              </span>
              <div className="flex flex-col">
                <span
                  className="text-5xl sm:text-6xl font-black leading-none"
                  style={{ color: text, fontFamily: "var(--font-display)" }}
                >
                  {level.name}
                </span>
                <span
                  className="text-sm tracking-[0.2em] uppercase mt-2"
                  style={{
                    color: level.accent,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {level.nameEn}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: tagline + summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 lg:pb-6"
          >
            <p
              className="text-sm tracking-[0.2em] uppercase mb-3"
              style={{ color: level.accent, fontFamily: "var(--font-mono)" }}
            >
              {level.weeks}
            </p>
            <p
              className="text-xl sm:text-2xl leading-snug italic mb-4"
              style={{ color: text, fontFamily: "var(--font-display)" }}
            >
              “{level.tagline}”
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: subtext, fontFamily: "var(--font-body)" }}
            >
              {level.summary}
            </p>
          </motion.div>
        </div>

        {/* Outcomes + Prerequisites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-4 mb-12 max-w-6xl mx-auto"
        >
          <div
            className="p-5 border-l-4"
            style={{
              borderColor: level.accent,
              backgroundColor: isDark
                ? "rgba(245,240,232,0.04)"
                : "rgba(26,54,54,0.03)",
            }}
          >
            <div
              className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-3"
              style={{ color: level.accent, fontFamily: "var(--font-mono)" }}
            >
              <CheckCircle2 size={14} /> learning outcomes
            </div>
            <ul className="space-y-2">
              {level.outcomes.map((o) => (
                <li
                  key={o}
                  className="text-sm flex gap-2 leading-relaxed"
                  style={{ color: text, fontFamily: "var(--font-body)" }}
                >
                  <span style={{ color: level.accent }}>▸</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="p-5 border-l-4"
            style={{
              borderColor: mutedBorder,
              backgroundColor: isDark
                ? "rgba(245,240,232,0.04)"
                : "rgba(26,54,54,0.03)",
            }}
          >
            <div
              className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-3"
              style={{ color: subtext, fontFamily: "var(--font-mono)" }}
            >
              <BookOpen size={14} /> prerequisites
            </div>
            <ul className="space-y-2">
              {level.prerequisites.map((p) => (
                <li
                  key={p}
                  className="text-sm flex gap-2 leading-relaxed"
                  style={{ color: subtext, fontFamily: "var(--font-body)" }}
                >
                  <span>·</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {level.projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              accent={level.accent}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Diagonal bottom edge — poster transition */}
      {!isLast && (
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: isDark ? "#F5F0E8" : "#EDE8DD",
            clipPath: "polygon(0 100%, 100% 50%, 100% 100%)",
          }}
        />
      )}
    </section>
  );
}
