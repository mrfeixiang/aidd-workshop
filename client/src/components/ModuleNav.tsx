interface ModuleNavProps {
  modules: { id: string; label: string; num: number }[];
  active: string;
  onSelect: (id: string) => void;
}

export default function ModuleNav({ modules, active, onSelect }: ModuleNavProps) {
  return (
    <div
      className="sticky top-14 z-40 border-b overflow-x-auto scrollbar-hide"
      style={{
        backgroundColor: "rgba(237, 232, 221, 0.95)",
        backdropFilter: "blur(8px)",
        borderColor: "rgba(26,54,54,0.08)",
      }}
    >
      <div className="container flex items-center gap-1 py-2">
        {modules.map((m) => {
          const isActive = active === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all rounded-sm"
              style={{
                backgroundColor: isActive ? "#1A3636" : "transparent",
                color: isActive ? "#F5F0E8" : "#1A3636",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
                style={{
                  backgroundColor: isActive ? "#D97757" : "rgba(26,54,54,0.1)",
                  color: isActive ? "#F5F0E8" : "#1A3636",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.num}
              </span>
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
