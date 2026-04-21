import { Github, BookOpen, Music } from "lucide-react";
import { Link } from "wouter";
import { COURSE_REPO_URL, LEVELS, TOTAL_PROJECTS } from "@/data/maestro";

export default function MaestroFooter() {
  return (
    <footer className="py-16" style={{ backgroundColor: "#0f2222" }}>
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Quote */}
          <blockquote
            className="text-lg sm:text-xl italic leading-relaxed mb-4 text-center max-w-3xl mx-auto"
            style={{
              color: "rgba(245,240,232,0.75)",
              fontFamily: "var(--font-display)",
            }}
          >
            “最好的教程不是被读完的那一本， 而是被你 fork 之后改得面目全非的那一个。”
          </blockquote>
          <p
            className="text-center text-xs mb-12"
            style={{
              color: "rgba(245,240,232,0.3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            — Maestro 课程组一句话哲学
          </p>

          <div
            className="h-px mb-10"
            style={{ backgroundColor: "rgba(245,240,232,0.08)" }}
          />

          {/* Columns */}
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <h4
                className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}
              >
                课程
              </h4>
              <ul className="space-y-2">
                {LEVELS.map((l) => (
                  <li
                    key={l.id}
                    className="text-sm"
                    style={{
                      color: "rgba(245,240,232,0.6)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    L{l.num} · {l.name} — {l.nameEn}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}
              >
                资源
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={COURSE_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-[#D97757] transition-colors"
                    style={{
                      color: "rgba(245,240,232,0.6)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Github size={14} /> GitHub 课程仓库
                  </a>
                </li>
                <li>
                  <Link
                    to="/workshop"
                    className="flex items-center gap-2 text-sm hover:text-[#D97757] transition-colors"
                    style={{
                      color: "rgba(245,240,232,0.6)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <BookOpen size={14} /> 返回 Workshop 序章
                  </Link>
                </li>
                <li>
                  <span
                    className="flex items-center gap-2 text-sm"
                    style={{
                      color: "rgba(245,240,232,0.4)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Music size={14} /> 灵感来自 Beyond《乐与怒》1993
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="text-sm font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#D97757", fontFamily: "var(--font-mono)" }}
              >
                统计
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{
                  color: "rgba(245,240,232,0.6)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <li>{LEVELS.length} 关 · {TOTAL_PROJECTS} 项目</li>
                <li>MIT License</li>
                <li>No paywall · 完全开源</li>
              </ul>
            </div>
          </div>

          <div
            className="h-px mb-6"
            style={{ backgroundColor: "rgba(245,240,232,0.06)" }}
          />

          <p
            className="text-center text-xs"
            style={{
              color: "rgba(245,240,232,0.3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            AIDD Maestro · 从 0 到精通 · 跟 Beyond 一样，海阔天空
          </p>
        </div>
      </div>
    </footer>
  );
}
