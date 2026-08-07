"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const hovering = useRef(false);
  const pressing = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = e.target as HTMLElement;
      hovering.current = !!el.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-hover]'
      );
    };
    const onDown = () => { pressing.current = true; };
    const onUp = () => { pressing.current = false; };
    const onLeave = () => { pos.current = { x: -200, y: -200 }; };

    const animate = () => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%) rotate(45deg)`;

        const h = hovering.current;
        const p = pressing.current;

        if (p) {
          dot.style.width = "6px";
          dot.style.height = "6px";
          dot.style.opacity = "0.9";
        } else if (h) {
          dot.style.width = "18px";
          dot.style.height = "18px";
          dot.style.opacity = "0.8";
        } else {
          dot.style.width = "14px";
          dot.style.height = "14px";
          dot.style.opacity = "1";
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 14,
          height: 14,
          borderRadius: "3px",
          background: "#FF6A00",
          boxShadow: "0 0 18px rgba(255, 106, 0, 0.8)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease",
        }}
      />
    </>
  );
}
