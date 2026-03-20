import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onNavClick: (id: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "module-1", label: "模块一" },
    { id: "module-2", label: "模块二" },
    { id: "module-3", label: "模块三" },
    { id: "module-4", label: "模块四" },
    { id: "module-5", label: "模块五" },
    { id: "module-6", label: "龙虾展示" },
    { id: "appendix", label: "课后附录" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "rgba(245, 240, 232, 0.92)",
        borderColor: "rgba(26, 54, 54, 0.12)",
      }}
    >
      <div className="container flex items-center justify-between h-14">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "#1A3636" }}
          >
            乐与怒
          </span>
          <span
            className="hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-sm"
            style={{
              backgroundColor: "#D97757",
              color: "#F5F0E8",
              fontFamily: "var(--font-mono)",
            }}
          >
            WORKSHOP
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavClick(l.id)}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#1A3636", fontFamily: "var(--font-body)" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          style={{ color: "#1A3636" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t py-3 px-4"
          style={{
            backgroundColor: "rgba(245, 240, 232, 0.98)",
            borderColor: "rgba(26, 54, 54, 0.1)",
          }}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onNavClick(l.id);
                setOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium"
              style={{ color: "#1A3636" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
