import { motion } from "framer-motion";
import {
  Clock,
  Github,
  Target,
  Sparkles,
  Youtube,
  BookOpen,
} from "lucide-react";
import type { Project } from "@/data/maestro";

interface ProjectCardProps {
  project: Project;
  accent: string;
  index: number;
}

const KIND_LABEL: Record<Project["kind"], string> = {
  kickoff: "入门练手",
  build: "核心构建",
  capstone: "阶段作品",
};

export default function ProjectCard({ project, accent, index }: ProjectCardProps) {
  const stars = "★".repeat(project.difficulty) + "☆".repeat(5 - project.difficulty);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col h-full p-6 border transition-all hover:-translate-y-1"
      style={{
        backgroundColor: "#FBF8F1",
        borderColor: "rgba(26,54,54,0.12)",
        boxShadow: "4px 4px 0 0 rgba(26,54,54,0.08)",
      }}
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] tracking-[0.25em] uppercase px-2 py-0.5"
          style={{
            color: accent,
            border: `1px solid ${accent}55`,
            fontFamily: "var(--font-mono)",
          }}
        >
          {KIND_LABEL[project.kind]}
        </span>
        <span
          className="text-xs tracking-wider"
          style={{ color: accent, fontFamily: "var(--font-mono)" }}
          title={`Difficulty: ${project.difficulty}/5`}
        >
          {stars}
        </span>
      </div>

      {/* Title */}
      <h4
        className="text-xl font-black leading-tight mb-1"
        style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
      >
        {project.title}
      </h4>
      <p
        className="text-[11px] tracking-[0.15em] uppercase mb-3"
        style={{
          color: "rgba(26,54,54,0.5)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {project.titleEn}
      </p>

      {/* Tagline */}
      <p
        className="text-sm italic mb-3"
        style={{ color: accent, fontFamily: "var(--font-display)" }}
      >
        “{project.tagline}”
      </p>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(45,45,45,0.85)", fontFamily: "var(--font-body)" }}
      >
        {project.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.skills.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-0.5"
            style={{
              backgroundColor: "rgba(26,54,54,0.06)",
              color: "#1A3636",
              fontFamily: "var(--font-body)",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Tools */}
      <div
        className="text-[11px] mb-4 leading-relaxed"
        style={{ color: "rgba(45,45,45,0.55)", fontFamily: "var(--font-mono)" }}
      >
        <span className="opacity-70">$ </span>
        {project.tools.join(" · ")}
      </div>

      {/* Deliverable */}
      <div
        className="flex items-start gap-2 p-3 mb-4 border-l-2"
        style={{
          borderColor: accent,
          backgroundColor: "rgba(26,54,54,0.03)",
        }}
      >
        <Target
          size={14}
          style={{ color: accent, marginTop: "2px", flexShrink: 0 }}
        />
        <div className="flex-1">
          <div
            className="text-[10px] tracking-[0.2em] uppercase mb-1"
            style={{ color: accent, fontFamily: "var(--font-mono)" }}
          >
            Deliverable
          </div>
          <code
            className="text-xs leading-snug"
            style={{ color: "#2D2D2D", fontFamily: "var(--font-mono)" }}
          >
            {project.deliverable}
          </code>
        </div>
      </div>

      {/* Related resources — paper / repo / tutorial */}
      {project.resources &&
        (project.resources.github ||
          project.resources.paper ||
          project.resources.youtube) && (
          <div
            className="flex flex-wrap gap-2 mb-3 pt-3 border-t"
            style={{ borderColor: "rgba(26,54,54,0.08)" }}
          >
            <div
              className="text-[10px] tracking-[0.2em] uppercase w-full mb-1"
              style={{
                color: "rgba(26,54,54,0.45)",
                fontFamily: "var(--font-mono)",
              }}
            >
              learn the topic
            </div>
            {project.resources.github && (
              <a
                href={project.resources.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] px-2 py-1 transition-all hover:opacity-80"
                style={{
                  border: `1px solid ${accent}55`,
                  color: accent,
                  fontFamily: "var(--font-body)",
                }}
              >
                <Github size={11} /> upstream
              </a>
            )}
            {project.resources.paper && (
              <a
                href={project.resources.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] px-2 py-1 transition-all hover:opacity-80"
                style={{
                  border: `1px solid ${accent}55`,
                  color: accent,
                  fontFamily: "var(--font-body)",
                }}
              >
                <BookOpen size={11} /> paper
              </a>
            )}
            {project.resources.youtube && (
              <a
                href={project.resources.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] px-2 py-1 transition-all hover:opacity-80"
                style={{
                  border: `1px solid ${accent}55`,
                  color: accent,
                  fontFamily: "var(--font-body)",
                }}
              >
                <Youtube size={11} /> tutorial
              </a>
            )}
          </div>
        )}

      {/* Footer */}
      <div
        className="mt-auto flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "rgba(26,54,54,0.08)" }}
      >
        <div
          className="flex items-center gap-1.5 text-xs"
          style={{
            color: "rgba(26,54,54,0.6)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <Clock size={12} />
          {project.hours}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors"
          style={{ color: accent, fontFamily: "var(--font-body)" }}
        >
          <Github size={14} />
          clone & start
          <Sparkles
            size={12}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      </div>
    </motion.article>
  );
}
