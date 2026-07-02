import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/stack")({
  head: () =>
    seo({
      title: "Stack de tecnologias — React, Node.js, Python, IA · Henrique Kenzo",
      description:
        "Mapa tecnológico de Henrique Kenzo: front-end (React, TypeScript), back-end (Node.js, Python), IA e visão computacional (PyTorch, YOLO), infra e bancos de dados.",
      path: "/stack",
    }),
  component: StackPage,
});

const groups = [
  {
    id: "frontend",
    label: "FRONTEND",
    x: 15,
    y: 30,
    items: ["React & Ecossistema", "TypeScript Avançado", "SSR / Edge Computing", "Arquitetura de UI"],
  },
  {
    id: "backend",
    label: "BACKEND",
    x: 85,
    y: 30,
    items: [
      "Node.js & Python",
      "Processamento Assíncrono",
      "APIs de Alta Performance",
      "Engenharia de Dados",
    ],
  },
  {
    id: "ai",
    label: "IA & COMPUTER VISION",
    x: 15,
    y: 75,
    items: [
      "Visão Computacional",
      "Machine Learning",
      "PyTorch / Ecossistema YOLO",
      "Pipelines de Inferência",
    ],
  },
  {
    id: "infra",
    label: "INFRA & DATABASE",
    x: 85,
    y: 75,
    items: [
      "PostgreSQL (Relacional)",
      "Redis (Mensageria / Cache)",
      "Docker & Containers",
      "Serverless & Deployments",
    ],
  },
  {
    id: "core",
    label: "CORE SKILLS",
    x: 50,
    y: 52,
    items: ["Arquitetura de Software", "Sistemas Distribuídos", "Regras de Negócio"],
    center: true,
  },
];

function StackPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <main>
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
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {groups
                      .filter((g) => !g.center)
                      .map((g) => (
                        <line
                          key={g.id}
                          x1="50"
                          y1="52"
                          x2={g.x}
                          y2={g.y}
                          stroke="url(#wireStack)"
                          strokeWidth="0.18"
                          className="animate-dash-flow"
                        />
                      ))}
                    <defs>
                      <linearGradient id="wireStack" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#b6f34a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#6a9a2a" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {groups.map((g) => (
                    <div
                      key={g.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${g.x}%`, top: `${g.y}%` }}
                    >
                      <div
                        className={`glass border ${g.center ? "border-primary/60 shadow-[0_0_40px_rgba(182,243,74,0.35)]" : "border-border hover:border-primary/40"} px-4 py-3 transition-all`}
                      >
                        <div
                          className={`font-mono text-[9px] uppercase tracking-[0.25em] mb-2 ${g.center ? "text-primary" : "text-muted"}`}
                        >
                          {g.label}
                        </div>
                        <div className="space-y-0.5">
                          {g.items.map((it) => (
                            <div key={it} className="font-mono text-xs text-foreground/90">
                              {it}
                            </div>
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
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                        {g.label}
                      </div>
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
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
