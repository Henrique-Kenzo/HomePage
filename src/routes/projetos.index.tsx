import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/content/projects";

export const Route = createFileRoute("/projetos/")({
  head: () => ({
    meta: [
      { title: "Projetos · Henrique Kenzo Silvatte" },
      { name: "description", content: "Estudos de caso: problema, solução, arquitetura e resultado. Sistemas, IA e automação em produção." },
      { property: "og:title", content: "Projetos · Estudos de caso" },
      { property: "og:description", content: "Problema → Solução → Arquitetura → Resultado." },
    ],
  }),
  component: ProjetosIndex,
});

function ProjetosIndex() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Estudos de caso</SectionLabel>
              <h1 className="font-display text-5xl md:text-7xl max-w-4xl text-balance">
                Problema. Solução.<br />Arquitetura. <span className="text-primary italic">Resultado.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                Cada projeto resolve um problema real, com decisões técnicas explícitas e métricas que importam.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl space-y-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  to="/projetos/$slug"
                  params={{ slug: p.slug }}
                  className="group block border border-border bg-white/[0.02] p-8 md:p-10 transition-all hover:border-primary/50 hover:bg-white/[0.04]"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                      0{i + 1}
                    </div>
                    <div className="md:col-span-6">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{p.category}</div>
                      <h2 className="font-display text-3xl md:text-4xl mb-3">{p.name}</h2>
                      <p className="text-muted-foreground max-w-prose">{p.tagline}</p>
                    </div>
                    <div className="md:col-span-4 grid grid-cols-2 gap-2">
                      {p.result.slice(0, 2).map((r) => (
                        <div key={r.label} className="border border-border bg-background/60 p-3">
                          <div className="font-mono text-xl">{r.value}</div>
                          <div className="font-mono text-[9px] uppercase tracking-widest text-muted mt-1">{r.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="md:col-span-1 text-right font-mono text-xl text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
