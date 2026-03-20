import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModuleNav from "@/components/ModuleNav";
import Module1 from "@/components/modules/Module1";
import Module2 from "@/components/modules/Module2";
import Module3 from "@/components/modules/Module3";
import Module4 from "@/components/modules/Module4";
import Module5 from "@/components/modules/Module5";
import Module6 from "@/components/modules/Module6";
import HomeworkSection from "@/components/HomeworkSection";
import AppendixSection from "@/components/AppendixSection";
import Footer from "@/components/Footer";

const modules = [
  { id: "module-1", label: "破冰与宏观", num: 1 },
  { id: "module-2", label: "工具选型", num: 2 },
  { id: "module-3", label: "AIDD实操", num: 3 },
  { id: "module-4", label: "效率工具箱", num: 4 },
  { id: "module-5", label: "编程与自动化", num: 5 },
  { id: "module-6", label: "龙虾展示", num: 6 },
];

export default function Home() {
  const [activeModule, setActiveModule] = useState("module-1");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveModule(top.target.id);
        }
      },
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar onNavClick={scrollTo} />
      <HeroSection />
      <ModuleNav modules={modules} active={activeModule} onSelect={scrollTo} />

      <main className="relative">
        <section id="module-1" ref={(el) => { sectionRefs.current["module-1"] = el; }}>
          <Module1 />
        </section>
        <section id="module-2" ref={(el) => { sectionRefs.current["module-2"] = el; }}>
          <Module2 />
        </section>
        <section id="module-3" ref={(el) => { sectionRefs.current["module-3"] = el; }}>
          <Module3 />
        </section>
        <section id="module-4" ref={(el) => { sectionRefs.current["module-4"] = el; }}>
          <Module4 />
        </section>
        <section id="module-5" ref={(el) => { sectionRefs.current["module-5"] = el; }}>
          <Module5 />
        </section>
        <section id="module-6" ref={(el) => { sectionRefs.current["module-6"] = el; }}>
          <Module6 />
        </section>

        <HomeworkSection />
        <div id="appendix">
          <AppendixSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
