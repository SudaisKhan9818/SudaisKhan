"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import profileImage from "../../assests/MyImgae-Photoroom.png";

function LetterLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`hero-title-line ${className}`}>
      {Array.from(text).map((letter, index) => (
        <span className="hero-letter" key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function FirstNameLine() {
  return (
    <span className="hero-title-line hero-title-line--first">
      {"SUD".split("").map((letter, index) => (
        <span className="hero-letter" key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
      <span className="hero-portrait" aria-label="Portrait of Sudais Khan">
        <Image
          src={profileImage}
          alt="Sudais Khan"
          fill
          priority
          sizes="(max-width: 768px) 22vw, 12vw"
        />
      </span>
      {"AIS".split("").map((letter, index) => (
        <span className="hero-letter" key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function MagneticLink({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
    gsap.to(element, { x, y, duration: 0.3, ease: "power2.out", overwrite: true });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={primary ? "hero-cta hero-cta--primary" : "hero-cta hero-cta--secondary"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".hero-rule",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5 },
        )
        .fromTo(
          ".hero-letter",
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045 },
          0.1,
        )
        .fromTo(
          ".hero-portrait",
          { y: 18, rotate: -10, opacity: 0, scale: 0.92 },
          { y: 0, rotate: -8, opacity: 1, scale: 1, duration: 0.8 },
          0.32,
        )
        .fromTo(
          ".hero-skills, .hero-actions",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
          0.54,
        );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-rule" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-title-wrap">
          <h1 className="hero-title" aria-label="Sudais Khan">
            <span className="hero-title-mask">
              <FirstNameLine />
            </span>
            <span className="hero-title-mask hero-title-mask--second">
              <LetterLine text="KHAN" className="hero-title-line--second" />
            </span>
          </h1>
        </div>

        <p className="hero-skills hero-meta">
          3D DIGITAL TWIN &amp; IoT DEVELOPER <i>|</i> AI DRIVEN DEVOPS <i>|</i> FULLSTACK DEVELOPER
        </p>

        <div className="hero-actions">
          <MagneticLink href="/assests/MY%20RESUME_Final.pdf" primary>
            Download resume <span>&#8599;</span>
          </MagneticLink>
          <MagneticLink href="#projects">
            View work <span>&#8594;</span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
