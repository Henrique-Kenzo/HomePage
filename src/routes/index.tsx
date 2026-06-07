import { createFileRoute, Link } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NeuralHero } from "@/components/site/NeuralHero";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/neural-hero.jpg";
import dashImg from "@/assets/minhafabrica-dashboard.png";
import { projects } from "@/content/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Henrique Kenzo Silvatte — Desenvolvedor de Software" },
      {
        name: "description",
        content:
          "Construindo sistemas que transformam processos comerciais em operações automatizadas. Node.js · TypeScript · Python.",
      },
      { property: "og:title", content: "Henrique Kenzo Silvatte — Desenvolvedor de Software" },
      {
        property: "og:description",
        content: "Construindo sistemas que transformam processos comerciais em operações automatizadas.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const categories = [
  {
    title: "Back-end & APIs",
    desc: "Node.js, Express, Python, REST e autenticação JWT.",
    items: ["Node.js", "Express", "Python", "REST APIs"],
    tech: ["Node.js", "Python", "JWT"],
    accent: "primary" as const,
  },
  {
    title: "Front-end",
    desc: "Aplicações dinâmicas com React e Next.js App Router.",
    items: ["React", "Next.js", "TypeScript", "HTML/CSS"],
    tech: ["React", "Next.js", "TypeScript"],
    accent: "primary" as const,
  },
  {
    title: "Bancos de Dados",
    desc: "Modelagem e persistência segura em NoSQL e relacional.",
    items: ["MongoDB", "PostgreSQL", "SQL"],
    tech: ["MongoDB", "PostgreSQL", "SQL"],
    accent: "accent" as const,
  },
  {
    title: "Automação & Integrações",
    desc: "Automações customizadas, integrações via API e manipulação de dados.",
    items: ["Integração de Sistemas", "Google Sheets", "Regras de Negócio", "Webhooks"],
    tech: ["JavaScript", "APIs", "Webhooks"],
    accent: "accent" as const,
  },
];

function Home() {
  const featured = projects[0];
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />

        {/* HERO */}
        <section className="relative px-6">
          <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 py-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
                  Engenharia de próxima geração
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-display mt-8 text-5xl leading-[0.95] text-balance md:text-6xl">
                  Transformando desafios de negócio em <br />
                  <span className="italic text-primary">soluções escaláveis.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-[50ch] text-lg text-muted-foreground text-pretty">
                  Minha evolução na engenharia de software é guiada pela paixão em resolver problemas do mundo real através de arquiteturas sólidas e inovação contínua.
                  <br/><br/>
                  Hoje, atuo de ponta a ponta: desde a modelagem de sistemas ERP complexos para operações industriais até a integração de pipelines de Inteligência Artificial e Visão Computacional. Com profundo domínio de backend (Node/Python) e extrema adaptabilidade para dominar novas tecnologias, minha motivação é projetar arquiteturas resilientes e resolver desafios de alta complexidade.
                  <br/><br/>
                  📍 Londrina, PR · Disponível para oportunidades
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/projetos"
                    className="group relative overflow-hidden bg-foreground px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-background ring-1 ring-white/10 transition-all hover:bg-primary hover:text-white"
                  >
                    Ver Projetos
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    to="/contato"
                    className="border border-border px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
                  >
                    Agendar Conversa
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                  {[
                    { k: "5+", v: "PROJETOS" },
                    { k: "100%", v: "COMPROMETIDO" },
                    { k: "∞", v: "CURIOSIDADE" },
                  ].map((s) => (
                    <div key={s.v}>
                      <div className="font-mono text-2xl text-foreground">{s.k}</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{s.v}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <NeuralHero />
            </Reveal>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="relative border-t border-border px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>O que eu construo</SectionLabel>
              <h2 className="font-display max-w-3xl text-4xl md:text-5xl">
                Sistemas, automações e inteligência — projetados para escalar.
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05}>
                  <div className="group relative h-full overflow-hidden border border-border bg-white/[0.015] p-6 transition-colors hover:border-primary/40">
                    <div className={`size-9 ${c.accent === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"} grid place-items-center mb-6`}>
                      <span className="size-3 rounded-sm bg-current" />
                    </div>
                    <h3 className="font-display text-xl mb-3">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{c.desc}</p>
                    <ul className="space-y-1.5 mb-6">
                      {c.items.map((it) => (
                        <li key={it} className="font-mono text-[11px] text-foreground/80 flex items-center gap-2">
                          <span className="size-1 bg-muted" /> {it}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {c.tech.map((t) => (
                        <span key={t} className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/construo" className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary">
                Ver detalhe completo →
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED — VisionProd preview */}
        <section className="relative border-t border-border bg-white/[0.015] px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel accent="accent">Estudo de caso · destaque</SectionLabel>
            </Reveal>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 className="font-display text-4xl md:text-6xl mb-6">{featured.name}</h2>
                  <p className="text-muted-foreground text-lg mb-10 max-w-[40ch]">{featured.tagline}</p>
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {featured.result.slice(0, 4).map((r) => (
                      <div key={r.label} className="border border-border bg-white/5 p-4">
                        <div className="font-mono text-2xl text-foreground">{r.value}</div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted mt-1">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/projetos/$slug"
                    params={{ slug: "minhafabrica" }}
                    className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-background hover:bg-primary hover:text-white transition-colors"
                  >
                    Explorar case →
                  </Link>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay={0.1}>
                  <DashboardMockup />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-border px-6 py-32">
          <div className="mx-auto max-w-7xl text-center">
            <Reveal>
              <h2 className="font-display text-5xl md:text-7xl text-balance">
                Pronto para construir algo<br />
                que realmente <span className="text-primary italic">funciona</span>?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted-foreground text-lg">
                Aberto para oportunidades em desenvolvimento Full-Stack, implementação de CRM e construção de integrações.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/contato" className="bg-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                  Iniciar conexão →
                </Link>
                <Link to="/roadmap" className="border border-border px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors">
                  Ver Roadmap
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}

function DashboardMockup() {
  return (
    <div className="group relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-white/[0.02] px-4 py-2.5">
          <span className="size-2 rounded-full bg-red-500/60" />
          <span className="size-2 rounded-full bg-yellow-500/60" />
          <span className="size-2 rounded-full bg-green-500/60" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted ml-3">minhafabrica.com · online · vercel</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" /> LIVE
          </span>
        </div>
        <img
          src={dashImg}
          width={1536}
          height={1024}
          alt="Painel Administrativo MinhaFabrica - Gestão de Usuários e Produtos"
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
