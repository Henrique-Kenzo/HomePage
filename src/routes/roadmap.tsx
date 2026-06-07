import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap · Henrique Kenzo Silvatte" },
      { name: "description", content: "A trilha de evolução em sistemas, automação e arquitetura de software." },
      { property: "og:title", content: "Roadmap · Para onde estou indo" },
      { property: "og:description", content: "Meu plano de evolução técnica e profissional." },
    ],
  }),
  component: RoadmapPage,
});

const trail = [
  { id: "DEV", label: "Desenvolvedor", year: "Agora", state: "current", desc: "Aprimorando TS avançado, focando em performance no Next.js e aplicando padrões robustos em Node.js." },
  { id: "MID", label: "3–6 meses", year: "Curto prazo", state: "next", desc: "Docker, CI/CD (GitHub Actions), implementação de testes automatizados e refatoração com design patterns." },
  { id: "ADV", label: "6–12 meses", year: "Médio prazo", state: "done", desc: "Aprofundamento em Cloud (AWS/GCP), microsserviços e observabilidade de sistemas em produção." },
  { id: "LDR", label: "12+ meses", year: "Longo prazo", state: "done", desc: "Desenvolvimento de liderança técnica, segurança avançada e mentoria de novos desenvolvedores." },
];

function RoadmapPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Roadmap pessoal</SectionLabel>
              <h1 className="font-display text-5xl md:text-7xl max-w-4xl text-balance">
                Onde estou indo,<br /> e <span className="text-primary italic">por quê.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                A trajetória não é aleatória — cada estágio amplifica o anterior.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-accent" />
              <div className="space-y-8">
                {trail.map((t, i) => (
                  <Reveal key={t.id} delay={i * 0.06}>
                    <div className="relative pl-20">
                      <div className={`absolute left-2 top-4 size-12 grid place-items-center border ${
                        t.state === "current" ? "border-primary bg-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]" : t.state === "next" ? "border-accent bg-accent/10" : "border-border bg-background"
                      }`}>
                        <span className={`font-mono text-[10px] ${t.state === "current" ? "text-primary" : t.state === "next" ? "text-accent" : "text-muted"}`}>{t.id}</span>
                      </div>
                      <div className={`border ${t.state === "current" ? "border-primary/50" : "border-border"} bg-white/[0.02] p-6`}>
                        <div className="flex items-center justify-between mb-3">
                          <h2 className="font-display text-2xl md:text-3xl">{t.label}</h2>
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{t.year}</span>
                        </div>
                        <p className="text-muted-foreground">{t.desc}</p>
                        {t.state === "current" && (
                          <div className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                            <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" /> Você está aqui
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
