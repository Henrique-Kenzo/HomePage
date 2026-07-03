import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { projects, type Project } from "@/content/projects";
// PNG para og:image e JSON-LD (crawlers de preview não suportam WebP); WebP para exibição.
import dashImg from "@/assets/minhafabrica-dashboard.png";
import dashImgWebp from "@/assets/minhafabrica-dashboard.webp";
import { seo, SITE_URL, absoluteUrl, PERSON, breadcrumbJsonLd } from "@/lib/site";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.project) return { meta: [] };
    const p = loaderData.project;
    const isMinhaFabrica = p.slug === "minhafabrica";
    const base = seo({
      title: `${p.name} — estudo de caso de ${p.category} · Henrique Kenzo`,
      description: `${p.tagline} Problema, solução, arquitetura e stack: ${p.stack.join(", ")}.`,
      path: `/projetos/${p.slug}`,
      image: isMinhaFabrica ? dashImg : undefined,
      imageWidth: isMinhaFabrica ? 1440 : undefined,
      imageHeight: isMinhaFabrica ? 900 : undefined,
      imageAlt: isMinhaFabrica
        ? `Dashboard do ${p.name} — sistema desenvolvido por Henrique Kenzo`
        : undefined,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: p.tagline,
            url: absoluteUrl(`/projetos/${p.slug}`),
            programmingLanguage: p.stack,
            ...(isMinhaFabrica ? { image: absoluteUrl(dashImg) } : {}),
            author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PERSON.name },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projetos", path: "/projetos" },
              { name: p.name },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          404 // PROJECT NOT FOUND
        </p>
        <Link to="/projetos" className="text-primary underline">
          Voltar para projetos
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">SYSTEM_ERROR</p>
        <Link to="/projetos" className="text-primary underline">
          Voltar
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const isMinhaFabrica = project.slug === "minhafabrica";

  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <section className="px-6 pt-20 pb-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <Link
                  to="/projetos"
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary"
                >
                  ← Projetos
                </Link>
                <SectionLabel accent="accent">{project.category}</SectionLabel>
                <h1 className="font-display text-5xl md:text-8xl">{project.name}</h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>
              </Reveal>
            </div>
          </section>

          {isMinhaFabrica && (
            <section className="px-6 pb-16">
              <div className="mx-auto max-w-7xl">
                <Reveal>
                  <div className="relative group">
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)]">
                      <div className="flex items-center gap-1.5 border-b border-border bg-white/[0.02] px-4 py-2.5">
                        <span className="size-2 rounded-full bg-red-500/60" />
                        <span className="size-2 rounded-full bg-yellow-500/60" />
                        <span className="size-2 rounded-full bg-green-500/60" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted ml-3">
                          minhafabrica.com · online · vercel
                        </span>
                        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-primary">
                          <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" /> LIVE
                        </span>
                      </div>
                      <img
                        src={dashImgWebp}
                        alt={`Dashboard do ${project.name}`}
                        width={1440}
                        height={900}
                        loading="eager"
                        className="block h-auto w-full"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
              <Reveal>
                <div className="border-l border-primary pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                    01 // Problema
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed">{project.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="border-l border-primary pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                    02 // Solução
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed">{project.solution}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="border-l border-accent pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
                    03 // Arquitetura
                  </div>
                  <ul className="space-y-2">
                    {project.architecture.map((a) => (
                      <li key={a} className="flex items-center gap-3 text-foreground/90">
                        <span className="size-1.5 bg-accent" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="border-l border-accent pl-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
                    04 // Resultado
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {project.result.map((r) => (
                      <div key={r.label} className="border border-border bg-white/5 p-4">
                        <div className="font-mono text-2xl">{r.value}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-muted mt-1">
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="px-6 py-16 border-t border-border">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <SectionLabel>Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs uppercase tracking-widest text-foreground/80 bg-white/5 border border-border px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
