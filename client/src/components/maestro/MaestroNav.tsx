import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { Link } from "wouter";
import { GITHUB_ORG, LEVELS } from "@/data/maestro";

interface MaestroNavProps {
  onLevelClick: (id: string) => void;
  active?: string;
}

export default function MaestroNav({ onLevelClick, active }: MaestroNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "rgba(26, 54, 54, 0.92)",
        borderColor: "rgba(217,119,87,0.2)",
      }}
    >
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "#F5F0E8",
              }}
            >
              乐与怒
            </span>
          </Link>
          <span
            className="hidden sm:inline text-xs font-medium px-2 py-0.5"
            style={{
              backgroundColor: "#D97757",
              color: "#F5F0E8",
              fontFamily: "var(--font-mono)",
            }}
          >
            MAESTRO
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {LEVELS.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onLevelClick(l.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  color: isActive ? "#D97757" : "rgba(245,240,232,0.75)",
                  fontFamily: "var(--font-body)",
                  borderBottom: isActive
                    ? "2px solid #D97757"
                    : "2px solid transparent",
                }}
              >
                <span
                  className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
                  style={{
                    backgroundColor: isActive
                      ? "#D97757"
                      : "rgba(245,240,232,0.08)",
                    color: isActive ? "#1A3636" : "rgba(245,240,232,0.8)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {l.num}
                </span>
                <span>{l.name}</span>
              </button>
            );
          })}
          <a
            href={`https://github.com/${GITHUB_ORG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 ml-2 text-xs font-medium transition-all hover:opacity-80"
            style={{
              color: "#F5F0E8",
              border: "1px solid rgba(245,240,232,0.25)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Github size={13} />
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: "#F5F0E8" }}
          aria-label="toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t py-3 px-4"
          style={{
            backgroundColor: "rgba(26,54,54,0.98)",
            borderColor: "rgba(217,119,87,0.2)",
          }}
        >
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onLevelClick(l.id);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2 text-sm font-medium"
              style={{ color: "rgba(245,240,232,0.85)" }}
            >
              <span
                className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
                style={{
                  backgroundColor: "rgba(217,119,87,0.3)",
                  color: "#F5F0E8",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {l.num}
              </span>
              {l.name} · {l.nameEn}
            </button>
          ))}
          <a
            href={`https://github.com/${GITHUB_ORG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-sm font-medium mt-1"
            style={{ color: "#D97757" }}
          >
            <Github size={14} /> GitHub 组织
          </a>
        </div>
      )}
    </nav>
  );
}
