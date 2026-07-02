import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  head: () =>
    seo({
      title: "Contato — Henrique Kenzo, desenvolvedor full-stack em Londrina-PR",
      description:
        "Fale com Henrique Kenzo: LinkedIn, GitHub, e-mail e WhatsApp. Disponível para oportunidades full-stack, sistemas, automação e IA — CLT, PJ ou remoto.",
      path: "/contato",
    }),
  component: ContatoPage,
});

const channels = [
  {
    label: "LinkedIn",
    handle: "henrique-kenzo-silvatte",
    href: "https://linkedin.com/in/henrique-kenzo-silvatte-33466220b",
    primary: false,
  },
  { label: "GitHub", handle: "@Henrique-Kenzo", href: "https://github.com/Henrique-Kenzo", primary: false },
  {
    label: "Email",
    handle: "henrique.silvatte2@gmail.com",
    href: "mailto:henrique.silvatte2@gmail.com",
    primary: true,
  },
  { label: "Telefone", handle: "(43) 99677-3272", href: "https://wa.me/5543996773272", primary: false },
];

function ContatoPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <section className="px-6 pt-24 pb-12">
            <div className="mx-auto max-w-7xl">
              <Reveal>
                <SectionLabel>Central de conexão</SectionLabel>
                <h1 className="font-display text-5xl md:text-8xl max-w-4xl text-balance">
                  Vamos construir algo
                  <br />
                  <span className="text-primary italic">incrível juntos?</span>
                </h1>
                <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
                  Disponível para novos desafios. Interessado em minhas habilidades? Conecte-se no LinkedIn ou
                  envie um e-mail!
                </p>
              </Reveal>
            </div>
          </section>

          <section className="px-6 py-16">
            <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-2">
              {channels.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block overflow-hidden border ${c.primary ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-white/[0.02]"} p-8 transition-all hover:border-primary hover:translate-x-1`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.25em] ${c.primary ? "text-primary" : "text-muted"}`}
                      >
                        0{i + 1} // CHANNEL
                      </span>
                      <span className="font-mono text-2xl text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl mb-2">{c.label}</h2>
                    <p className="font-mono text-sm text-muted-foreground">{c.handle}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="px-6 py-24 border-t border-border">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4">
                  CURRENT_STATUS
                </p>
                <p className="font-display text-2xl md:text-3xl">
                  <span className="inline-flex items-center gap-3">
                    <span className="size-2.5 rounded-full bg-primary animate-pulse-soft shadow-[0_0_15px_#b6f34a]" />
                    Disponível para oportunidades · Londrina, PR
                  </span>
                </p>
              </Reveal>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
