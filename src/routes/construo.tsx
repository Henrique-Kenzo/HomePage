import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/construo")({
  head: () => ({
    meta: [
      { title: "O que eu construo · Henrique Kenzo Silvatte" },
      { name: "description", content: "Sistemas web, front-end, bancos de dados e automações." },
      { property: "og:title", content: "O que eu construo · Henrique Kenzo" },
      { property: "og:description", content: "Quatro frentes de desenvolvimento: Backend, Frontend, Bancos de Dados e Automação." },
    ],
  }),
  component: ConstruoPage,
});

const cats = [
  {
    title: "Back-end & APIs",
    sub: "Lógica robusta, segurança e performance.",
    items: ["Node.js com Express", "Scripts e APIs em Python", "Arquitetura REST", "Autenticação via JWT"],
    tech: ["Node.js", "Python", "REST", "JWT"],
    color: "primary",
  },
  {
    title: "Front-end",
    sub: "Interfaces dinâmicas e responsivas.",
    items: ["Aplicações com React", "Next.js (App Router)", "TypeScript rigoroso", "HTML semântico e CSS"],
    tech: ["React", "Next.js", "TypeScript", "HTML/CSS"],
    color: "primary",
  },
  {
    title: "Bancos de Dados",
    sub: "Modelagem e armazenamento eficiente de dados.",
    items: ["Bancos NoSQL (MongoDB)", "Bancos Relacionais (PostgreSQL)", "Consultas SQL otimizadas", "Integração via ORMs"],
    tech: ["MongoDB", "PostgreSQL", "SQL"],
    color: "accent",
  },
  {
    title: "Automação & Integrações",
    sub: "Conectando sistemas e otimizando fluxos comerciais.",
    items: ["Customizações no Ploomes CRM via JS", "Integrações via APIs Rest", "Automação com Google Sheets", "Configuração de CPQ"],
    tech: ["JavaScript", "APIs", "Ploomes", "Google Sheets"],
    color: "accent",
  },
] as const;

function ConstruoPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Capacidades</SectionLabel>
              <h1 className="font-display text-5xl md:text-7xl max-w-4xl text-balance">
                Quatro frentes,<br />uma mesma <span className="text-primary italic">obsessão.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                Tudo o que construo precisa ter três coisas: clareza, performance e resultado mensurável.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-2">
            {cats.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <article className="group relative h-full overflow-hidden border border-border bg-white/[0.02] p-8 transition-colors hover:border-primary/40">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`size-10 ${c.color === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"} grid place-items-center`}>
                      <span className="size-3 rounded-sm bg-current" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">0{i + 1}</span>
                  </div>
                  <h2 className="font-display text-3xl mb-2">{c.title}</h2>
                  <p className="text-muted-foreground mb-8">{c.sub}</p>
                  <ul className="space-y-2 mb-8">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-sm">
                        <span className={`size-1.5 ${c.color === "primary" ? "bg-primary" : "bg-accent"}`} />
                        <span className="text-foreground/85">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 border-t border-border pt-5">
                    {c.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 bg-white/5 border border-border px-2 py-1">{t}</span>
                    ))}
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent ${c.color === "primary" ? "via-primary" : "via-accent"} to-transparent opacity-0 group-hover:opacity-60 transition-opacity`} />
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
