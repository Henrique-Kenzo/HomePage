import { useEffect, useRef } from "react";
import heroImg from "@/assets/neural-hero.jpg";

export function NeuralHero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const nodes = [
    { label: "FRONTEND", x: 12, y: 22 },
    { label: "API", x: 88, y: 18 },
    { label: "DB", x: 8, y: 78 },
    { label: "INTEGRAÇÕES", x: 92, y: 76 },
    { label: "NODE.JS", x: 50, y: 8 },
    { label: "NEXT.JS", x: 50, y: 94 },
  ];

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full overflow-hidden rounded-2xl glass"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {/* cursor light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
        style={{
          background: "radial-gradient(400px circle at var(--mx) var(--my), rgba(59,130,246,0.18), transparent 60%)",
        }}
      />
      {/* brain image */}
      <img
        src={heroImg}
        alt="Visualização de cérebro digital conectado a APIs, bancos de dados e agentes de IA"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
      />
      {/* orbits */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="absolute size-[55%] rounded-full border border-primary/15" />
        <div className="absolute size-[75%] rounded-full border border-accent/10" />
        <div className="absolute size-[92%] rounded-full border border-border" />
      </div>
      {/* svg connections */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={n.x} y2={n.y}
            stroke="url(#wire)"
            strokeWidth="0.18"
            className="animate-dash-flow"
          />
        ))}
        <defs>
          <linearGradient id="wire" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      {/* nodes */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px_#3b82f6] animate-pulse-soft" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground/70 glass px-1.5 py-0.5">
            {n.label}
          </span>
        </div>
      ))}
      {/* corner labels */}
      <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.3em] text-primary/80">
        NEURAL_CORE · ACTIVE
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
        v3.0.4 — STABLE
      </div>
    </div>
  );
}
