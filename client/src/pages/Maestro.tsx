import { useEffect, useRef, useState } from "react";
import MaestroNav from "@/components/maestro/MaestroNav";
import MaestroHero from "@/components/maestro/MaestroHero";
import LearningPath from "@/components/maestro/LearningPath";
import HowItWorks from "@/components/maestro/HowItWorks";
import SkillsMatrix from "@/components/maestro/SkillsMatrix";
import LevelSection from "@/components/maestro/LevelSection";
import MaestroFooter from "@/components/maestro/MaestroFooter";
import { LEVELS } from "@/data/maestro";

export default function Maestro() {
  const [activeLevel, setActiveLevel] = useState<string>(LEVELS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveLevel(top.target.id);
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id] ?? document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <MaestroNav onLevelClick={scrollTo} active={activeLevel} />
      <MaestroHero onStart={() => scrollTo(LEVELS[0].id)} />

      <HowItWorks />
      <LearningPath levels={LEVELS} onSelect={scrollTo} />
      <SkillsMatrix />

      <main>
        {LEVELS.map((lvl, i) => (
          <div
            key={lvl.id}
            ref={(el) => {
              sectionRefs.current[lvl.id] = el;
            }}
            id={lvl.id}
          >
            <LevelSection level={lvl} isLast={i === LEVELS.length - 1} />
          </div>
        ))}
      </main>

      <MaestroFooter />
    </div>
  );
}
