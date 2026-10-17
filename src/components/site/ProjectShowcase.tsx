import type { Project } from "@/content/projects";
import { Reveal } from "./Reveal";

export function ProjectShowcase({ project }: { project: Project }) {
  return (
    <>
      {project.hero && (
        <section className="px-6 pb-16" aria-label="Interface do projeto">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <figure className="group relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/30 to-accent/20 blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center gap-1.5 border-b border-border bg-white/[0.02] px-4 py-2.5">
                    <span className="size-2 rounded-full bg-red-500/60" />
                    <span className="size-2 rounded-full bg-yellow-500/60" />
                    <span className="size-2 rounded-full bg-green-500/60" />
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {project.status ?? project.category}
                    </span>
                  </div>
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    width={project.hero.width}
                    height={project.hero.height}
                    loading="eager"
                    className="block h-auto w-full"
                  />
                </div>
                {project.hero.caption && (
                  <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {project.hero.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </section>
      )}
      {!!project.highlights?.length && (
        <section
          className="border-y border-border bg-white/[0.015] px-6 py-16"
          aria-label="Diferenciais técnicos"
        >
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
            {project.highlights.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <article className="h-full border border-border bg-background/70 p-6 transition-colors hover:border-primary/40">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                    {item.label}
                  </div>
                  <h2 className="mt-4 font-display text-2xl">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}
      {!!project.gallery?.length && (
        <section className="px-6 py-20" aria-label="Galeria do projeto">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Interface real // operação completa
              </h2>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {project.gallery.map((media, index) => (
                <div key={media.src} className={index === 2 ? "lg:col-span-2" : undefined}>
                  <Reveal delay={index * 0.05}>
                    <figure>
                      <div className="overflow-hidden border border-border bg-card">
                        <img
                          src={media.src}
                          alt={media.alt}
                          width={media.width}
                          height={media.height}
                          loading="lazy"
                          className="block h-auto w-full transition-transform duration-700 hover:scale-[1.015]"
                        />
                      </div>
                      {media.caption && (
                        <figcaption className="mt-3 text-sm text-muted-foreground">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {project.externalLink && (
        <section className="border-t border-border px-6 py-20">
          <Reveal>
            <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-primary/25 bg-primary/[0.06] p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  Release oficial
                </div>
                <h2 className="mt-3 font-display text-3xl">Veja requisitos, avisos e download.</h2>
              </div>
              <a
                href={project.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center bg-primary px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
              >
                {project.externalLink.label} ↗
              </a>
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
