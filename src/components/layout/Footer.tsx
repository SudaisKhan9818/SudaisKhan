"use client";

import { useRef, useEffect, useState } from "react";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/SudaisKhattakllc",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sudaiskhan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://x.com/SudaisKhan54874",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Magnetic hover effect on social links
function MagneticLink({
  children,
  href,
  name,
}: {
  children: React.ReactNode;
  href: string;
  name: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      title={name}
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 group"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
        background: hovered
          ? "rgba(255,106,0,0.15)"
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? "1px solid rgba(255,106,0,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
        color: hovered ? "#FF6A00" : "rgba(255,255,255,0.4)",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
        style={{
          boxShadow: hovered ? "0 0 24px rgba(255,106,0,0.3)" : "none",
        }}
      />
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="relative mx-3 mb-3 mt-12 overflow-hidden rounded-[28px] border border-white/10 sm:mx-6 lg:mx-8"
      style={{
        background: "linear-gradient(180deg, rgba(8,8,8,0.98) 0%, rgba(5,5,5,0.98) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "76px",
        paddingBottom: "36px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      }}
    >
      {/* ── Background mesh gradient ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm center glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "60%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(255,106,0,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Horizontal glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.3) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Top row ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #FF6A00 0%, #FF4500 100%)",
                  boxShadow: "0 0 20px rgba(255,106,0,0.4)",
                }}
              >
                <span className="text-white font-black text-[11px]">SK</span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bebas text-white text-2xl tracking-widest"
                  style={{ lineHeight: "1" }}
                >
                  SUDAIS KHAN
                </span>
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase">
                  Creative Developer
                </span>
              </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed font-light">
              Building premium digital experiences with modern web technologies. Available for freelance
              projects and full-time opportunities.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}
              />
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
                Available for work
              </span>
            </div>
          </div>

          {/* Nav links + Social */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 mb-1">
                Navigate
              </h4>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-bebas text-base tracking-widest text-white/50 hover:text-white transition-colors duration-300 text-left"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 mb-1">
                Contact
              </h4>
              <a
                href="mailto:isudaiskhan9818@gmail.com"
                className="font-mono text-[11px] text-white/50 hover:text-[#FF6A00] transition-colors duration-300 tracking-wide"
              >
                isudaiskhan9818@gmail.com
              </a>
              <a
                href="tel:+923000000000"
                className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors duration-300 tracking-wide"
              >
                Available via inquiry
              </a>

              {/* Social row */}
              <div className="flex items-center gap-3 mt-3">
                {SOCIAL_LINKS.map((s) => (
                  <MagneticLink key={s.name} href={s.href} name={s.name}>
                    {s.icon}
                  </MagneticLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="w-full h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)",
          }}
        />

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
            © {year} Sudais Khan · All Rights Reserved
          </p>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/15 uppercase">
              Built with Next.js · R3F · GSAP
            </span>
            <div
              className="w-1 h-1 bg-[#FF6A00] rounded-full"
              style={{ boxShadow: "0 0 6px rgba(255,106,0,0.8)" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
