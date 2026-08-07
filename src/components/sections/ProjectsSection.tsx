/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useRef, useCallback, useMemo, Suspense } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { PROJECTS } from "@/lib/projects";

// ─────────────────────────────────────────────────────────────
//  R3F BACKGROUND: floating orbs + particles
// ─────────────────────────────────────────────────────────────
const PCOUNT = 40;

function ProjectParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { viewport } = useThree();

  const particles = useMemo(() =>
    Array.from({ length: PCOUNT }, () => ({
      ox: (Math.random() - 0.5) * viewport.width * 2,
      oy: (Math.random() - 0.5) * viewport.height * 2,
      oz: -1 + Math.random() * 2,
      freqX: 0.12 + Math.random() * 0.18,
      freqY: 0.1 + Math.random() * 0.15,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      ampX: 0.05 + Math.random() * 0.12,
      ampY: 0.04 + Math.random() * 0.1,
      scale: 0.008 + Math.random() * 0.022,
      bright: Math.random() > 0.78,
      isOrange: Math.random() > 0.6,
    })), [viewport]);

  const colors = useMemo(() => {
    const arr = new Float32Array(PCOUNT * 3);
    particles.forEach((p, i) => {
      if (p.isOrange) { arr[i * 3] = 1; arr[i * 3 + 1] = 0.42; arr[i * 3 + 2] = 0; }
      else { const v = p.bright ? 0.9 : 0.12 + Math.random() * 0.2; arr[i * 3] = v; arr[i * 3 + 1] = v; arr[i * 3 + 2] = v; }
    });
    return arr;
  }, [particles]);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.geometry.setAttribute("color", new THREE.InstancedBufferAttribute(colors, 3));
  }, [colors]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.15;
    particles.forEach((p, i) => {
      const x = p.ox + Math.sin(t * p.freqX + p.phaseX) * p.ampX;
      const y = p.oy + Math.cos(t * p.freqY + p.phaseY) * p.ampY;
      dummy.position.set(x, y, p.oz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PCOUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial vertexColors transparent opacity={0.7} />
    </instancedMesh>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      pos: [
        (i === 0 ? -4 : i === 1 ? 4 : 0),
        (i === 0 ? 2 : i === 1 ? -2 : 3),
        -3 - i * 0.5,
      ] as [number, number, number],
      radius: 0.8 + i * 0.4,
      speed: 0.04 + i * 0.02,
      color: i === 0 ? "#FF6A00" : i === 1 ? "#FF4500" : "#FF8C40",
    })), []);

  return (
    <>
      {orbs.map((o, i) => (
        <Float key={i} speed={o.speed * 10} rotationIntensity={0.1} floatIntensity={0.6} position={o.pos}>
          <mesh>
            <sphereGeometry args={[o.radius, 16, 16]} />
            <meshBasicMaterial color={o.color} transparent opacity={0.04} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ProjectsBg() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <ProjectParticles />
        <FloatingOrbs />
      </Suspense>
    </>
  );
}



// ─────────────────────────────────────────────────────────────
//  PROJECTS SECTION
// ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const rotation = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    let id: number;
    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        rotation.current -= 0.4; // Increased vertical rotation speed
      }
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateX(${rotation.current}deg)`;
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(id);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = currentY.current = e.clientY;
    if (carouselRef.current) {
      carouselRef.current.style.transition = "none";
      carouselRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    rotation.current -= (e.clientY - currentY.current) * 0.4;
    currentY.current = e.clientY;
  };

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden bg-[#080808]"
      style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "140px" }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={1}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ProjectsBg />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,106,0,0.07) 0%, transparent 70%)",
        }} />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#080808] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-30 mb-14 flex flex-col items-center px-6 text-center bg-[#080808]/50 backdrop-blur-md rounded-3xl py-4 border border-white/5">
        <div className="mb-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6A00]">
          <span className="h-px w-8 bg-[#FF6A00]/50" />
          Selected Work
          <span className="h-px w-8 bg-[#FF6A00]/50" />
        </div>
        <h2
          className="m-0 font-bebas leading-none tracking-wider text-white"
          style={{ fontSize: "clamp(64px,9vw,130px)" }}
        >
          MY PROJECTS
        </h2>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
          Scroll vertically to explore · Drag to spin
        </p>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full" style={{ height: "clamp(600px, 80vh, 900px)", perspective: "2000px" }}>
          <div
            className="absolute inset-0 [transform-style:preserve-3d]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => { handlePointerUp(); isHovered.current = false; }}
            onMouseEnter={() => { isHovered.current = true; }}
            style={{ cursor: "grab", touchAction: "none" }}
          >
            <div
              ref={carouselRef}
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ transition: "transform 0.1s linear" }}
            >
              {PROJECTS.map((project, index) => {
                const angle = (360 / PROJECTS.length) * index;
                const radius = 500; // Adjusted radius for smaller cards

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="group relative w-full max-w-[700px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0f0f0f]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:border-[#FF6A00]/40 hover:shadow-[0_40px_120px_rgba(255,106,0,0.15)] sm:p-6"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative flex h-full flex-col gap-8 lg:flex-row lg:items-center">
                        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/40 lg:w-[50%] shrink-0">
                          <div className="relative aspect-[16/10] w-full">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105 sm:p-6"
                              sizes="(max-width: 768px) 90vw, 500px"
                            />
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col justify-center gap-5">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF6A00]">
                              {project.number}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                              {project.subtitle}
                            </span>
                          </div>

                          <div>
                            <h3 className="mb-3 font-bebas text-3xl tracking-wide text-white transition-colors duration-300 group-hover:text-[#FF6A00] sm:text-4xl">
                              {project.title}
                            </h3>
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6A00]/70">
                              {project.tech}
                            </p>
                          </div>

                          <p className="text-sm leading-8 text-white/65 sm:text-[15px]">
                            {project.description}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {project.url ? (
                            <div className="mt-4">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full bg-white/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#FF6A00] hover:text-white"
                              >
                                Visit Live Site
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M3 8h10M9 4l4 4-4 4" />
                                </svg>
                              </a>
                            </div>
                          ) : (
                            <div className="mt-4">
                              <span className="inline-flex items-center gap-3 rounded-full bg-white/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                                Private Project
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
