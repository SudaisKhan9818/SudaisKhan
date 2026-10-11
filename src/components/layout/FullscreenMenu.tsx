"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "WORK", number: "01", id: "projects", image: "/assests/Resume2.PNG" },
  { label: "ABOUT", number: "02", id: "about", image: "/assests/Medical.PNG" },
  { label: "CONTACT", number: "03", id: "contact", image: "/assests/Supplier.png" },
];

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const goToSection = (id: string) => {
    onClose();
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };
  const previewItem = activePreview
    ? menuItems.find((item) => item.id === activePreview) ?? menuItems[0]
    : menuItems[0];

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          className="menu-overlay"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onMouseMove={(event) => setPointer({ x: event.clientX, y: event.clientY })}
          aria-label="Site navigation"
        >
          <div className="menu-overlay__top">
            <span>S.K® / NAVIGATION</span>
            <button type="button" onClick={onClose} className="menu-close">
              Close <span>×</span>
            </button>
          </div>

          <nav className="menu-links">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="menu-link"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActivePreview(item.id)}
                onMouseLeave={() => setActivePreview(null)}
                onClick={() => goToSection(item.id)}
              >
                <span className="menu-link__number">{item.number}</span>
                <span className="menu-link__label">{item.label}</span>
                <span className="menu-link__arrow">↗</span>
              </motion.button>
            ))}
          </nav>

          <div className="menu-overlay__footer">
            <span>3D WEBSITE BUILDER / AI-DRIVEN DEVOPS / FULLSTACK MERN</span>
            <span>AVAILABLE WORLDWIDE</span>
          </div>

          <AnimatePresence>
            {activePreview ? (
              <motion.div
                className="menu-preview"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                style={{ left: pointer.x + 22, top: pointer.y + 22 }}
              >
                <Image
                  src={previewItem.image}
                  alt=""
                  fill
                  sizes="180px"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
