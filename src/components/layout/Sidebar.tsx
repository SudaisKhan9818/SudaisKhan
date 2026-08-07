"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", name: "Home", short: "01" },
  { id: "projects", name: "Projects", short: "02" },
  { id: "about", name: "About", short: "03" },
  { id: "contact", name: "Contact", short: "04" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Triggers when section is comfortably in the top portion of the screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ═══ DESKTOP SIDEBAR (Floating Pill) ═══ */}
      <aside
        className="fixed left-6 top-1/2 z-[100] hidden -translate-y-1/2 flex-col items-center gap-6 rounded-[30px] border border-white/10 p-3 lg:flex"
        style={{
          background: "linear-gradient(180deg, rgba(12,12,12,0.8) 0%, rgba(18,18,18,0.6) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-100px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="mb-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #FF6A00 0%, #FF4500 100%)",
            boxShadow: "0 0 16px rgba(255,106,0,0.4)",
          }}
        >
          <span className="text-xs font-black text-white tracking-widest">SK</span>
        </div>

        <div className="relative flex flex-col items-center gap-4 py-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                className="group relative flex h-10 w-10 cursor-pointer items-center justify-center"
                onClick={() => scrollToSection(section.id)}
              >
                <div
                  className="absolute transition-all duration-300"
                  style={{
                    width: isActive ? "8px" : "4px",
                    height: isActive ? "8px" : "4px",
                    borderRadius: "50%",
                    background: isActive ? "#FF6A00" : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? "0 0 12px rgba(255,106,0,0.8)" : "none",
                  }}
                />
                
                {/* Permanent Glassy Label */}
                <div className={`absolute left-full ml-4 flex items-center transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-1 hover:opacity-80 hover:translate-x-0"}`}>
                  <div className="rounded border border-white/10 bg-black/30 px-2 py-1 backdrop-blur-md">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white whitespace-nowrap uppercase">
                      {section.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav
        className="fixed bottom-4 left-1/2 w-[calc(100%-32px)] max-w-sm -translate-x-1/2 z-[100] lg:hidden rounded-2xl border border-white/10"
        style={{
          background: "rgba(12,12,12,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between px-2 py-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="relative flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer py-2 rounded-xl transition-all duration-300"
                style={{
                  background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                <span
                  className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{ color: isActive ? "#FF6A00" : "rgba(255,255,255,0.4)" }}
                >
                  {section.name}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
