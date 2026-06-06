import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/stack")({
  head: () => ({
    meta: [
      { title: "Stack · Henrique Kenzo Silvatte" },
      { name: "description", content: "Mapa tecnológico: frontend, backend, bancos e ferramentas." },
      { property: "og:title", content: "Mapa tecnológico · Stack completa" },
      { property: "og:description", content: "Frontend, Backend, DB e Ferramentas." },
    ],
  }),
  component: StackPage,
});

const groups = [
  { id: "frontend", label: "FRONTEND", x: 15, y: 30, items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"] },
  { id: "backend", label: "BACKEND", x: 85, y: 30, items: ["Node.js", "Express", "Python"] },
  { id: "db", label: "DATABASE", x: 15, y: 75, items: ["PostgreSQL", "MongoDB"] },
  { id: "tools", label: "FERRAMENTAS", x: 85, y: 75, items: ["Git", "Vercel", "Ploomes"] },
  { id: "core", label: "CORE SKILLS", x: 50, y: 52, items: ["Integrações", "REST APIs", "Lógica"], center: true },
];

function StackPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Mapa tecnológico</SectionLabel>
              <h1 className="font-display text-5xl md:text-7xl max-w-4xl text-balance">
                Cinco camadas. <span className="text-primary italic">Uma malha.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                Cada decisão de stack precisa fazer sentido sozinha — e em conjunto com as outras.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="relative aspect-[16/10] glass rounded-2xl overflow-hidden">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  {groups.filter(g => !g.center).map((g) => (
                    <line key={g.id} x1="50" y1="52" x2={g.x} y2={g.y} stroke="url(#wireStack)" strokeWidth="0.18" className="animate-dash-flow" />
                  ))}
                  <defs>
                    <linearGradient id="wireStack" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>

                {groups.map((g) => (
                  <div
                    key={g.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${g.x}%`, top: `${g.y}%` }}
                  >
                    <div className={`glass border ${g.center ? "border-primary/60 shadow-[0_0_40px_rgba(59,130,246,0.4)]" : "border-border hover:border-primary/40"} px-4 py-3 transition-all`}>
                      <div className={`font-mono text-[9px] uppercase tracking-[0.25em] mb-2 ${g.center ? "text-primary" : "text-muted"}`}>{g.label}</div>
                      <div className="space-y-0.5">
                        {g.items.map((it) => (
                          <div key={it} className="font-mono text-xs text-foreground/90">{it}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-16 grid gap-3 md:grid-cols-5">
              {groups.map((g, i) => (
                <Reveal key={g.id} delay={i * 0.05}>
                  <div className="border border-border bg-white/[0.02] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">{g.label}</div>
                    <ul className="space-y-1">
                      {g.items.map((i2) => (
                        <li key={i2} className="text-sm text-foreground/85 flex items-center gap-2">
                          <span className="size-1 bg-muted" /> {i2}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
