import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre · Henrique Kenzo Silvatte" },
      { name: "description", content: "Da linha de frente do atendimento à engenharia de sistemas de IA — a trajetória de Henrique Kenzo Silvatte." },
      { property: "og:title", content: "Sobre · Henrique Kenzo Silvatte" },
      { property: "og:description", content: "Trajetória profissional: do Direito ao Desenvolvimento de Software." },
    ],
  }),
  component: SobrePage,
});

const stages = [
  { id: "01", title: "Vikstar (Consultor PJ)", desc: "Primeiros passos no mercado corporativo, atuando em atendimento.", tech: ["Comunicação", "Resolução de conflitos"] },
  { id: "02", title: "Sniper Londrina", desc: "Gestão e operação.", tech: ["Operação", "Gestão"] },
  { id: "03", title: "Alô Telemarketing", desc: "Suporte e atendimento contínuo.", tech: ["Atendimento"] },
  { id: "04", title: "Estudos em Direito", desc: "Curso interrompido na UEL. Período onde desenvolvi forte base analítica, até o momento em que o interesse por código se transformou em uma ambição técnica irrefreável.", tech: ["Pesquisa", "Lógica"] },
  { id: "05", title: "Arbo (Analista de Suporte)", desc: "Transição para tecnologia, utilizando SQL e HTML para suporte a sistemas complexos.", tech: ["SQL", "HTML", "Troubleshooting"] },
  { id: "06", title: "Implementador CRM", desc: "Na Sunhub e MX3, desenvolvendo soluções customizadas, automações e integrações focadas em vendas e processos (JS/HTML/CSS).", tech: ["Sistemas", "JS", "Integrações", "APIs"] },
  { id: "07", title: "Engenheiro de Software", desc: "Desenvolvendo sistemas industriais críticos (minhafabrica.com e VisionProd). Arquitetando o backend de ERPs com regras de negócio complexas e integrando modelos de Machine Learning (Visão Computacional) para processamento de câmeras em linhas de produção.", tech: ["Node.js", "Python", "Machine Learning", "ERP"], accent: true },
];

function SobrePage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-16">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel>Trajetória</SectionLabel>
              <h1 className="font-display text-5xl md:text-7xl max-w-4xl text-balance">
                Uma jornada não linear<br />
                até a <span className="text-primary italic">engenharia.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted-foreground text-pretty">
                Dos estudos em Direito à obsessão por criar software: a capacidade de aprender rápido e o desejo incansável por maestria técnica são os motores da minha evolução na engenharia.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-accent/50" />
              <div className="space-y-6">
                {stages.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.05}>
                    <div className="relative pl-16">
                      <div className={`absolute left-3 top-6 size-6 rounded-full border ${s.accent ? "border-accent bg-accent/20" : "border-primary bg-primary/20"} grid place-items-center`}>
                        <span className={`size-2 rounded-full ${s.accent ? "bg-accent" : "bg-primary"} animate-pulse-soft`} />
                      </div>
                      <div className="group border border-border bg-white/[0.02] p-6 transition-colors hover:border-primary/40">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{s.id}</span>
                          <span className="h-px flex-1 bg-border" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">STAGE</span>
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl mb-2">{s.title}</h2>
                        <p className="text-muted-foreground max-w-2xl">{s.desc}</p>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {s.tech.map((t) => (
                            <span key={t} className="font-mono text-[10px] uppercase tracking-widest text-foreground/70 bg-white/5 border border-border px-2 py-0.5">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border bg-white/[0.015]">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionLabel accent="accent">O diferencial</SectionLabel>
              <h2 className="font-display text-4xl md:text-5xl mb-12">
                Visão de negócio aliada a uma <span className="text-accent italic">fome por excelência técnica.</span>
              </h2>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="border border-border p-6 bg-background">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">01 // Visão de Negócio</div>
                  <h3 className="text-xl mb-3">Soluções que agregam valor</h3>
                  <p className="text-muted-foreground text-sm">Minha experiência em implementação de CRM e suporte me proporcionou uma compreensão aprofundada das necessidades do cliente e dos desafios de negócio. Isso me permite desenvolver soluções que não apenas funcionam tecnicamente, mas que realmente resolvem problemas reais.</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="border border-border p-6 bg-background">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">02 // Resolução de Problemas</div>
                  <h3 className="text-xl mb-3">Diagnóstico preciso</h3>
                  <p className="text-muted-foreground text-sm">Atuar no suporte me treinou a identificar rapidamente a causa raiz de problemas e a buscar soluções eficazes, uma habilidade que aplico diretamente no desenvolvimento de software para criar sistemas mais robustos e com menos falhas.</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="border border-border p-6 bg-background">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">03 // Comunicação</div>
                  <h3 className="text-xl mb-3">Traduzindo requisitos</h3>
                  <p className="text-muted-foreground text-sm">A interação constante com clientes e equipes de vendas aprimorou minha comunicação, tornando-me capaz de traduzir requisitos de negócio em especificações técnicas claras e vice-versa.</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="border border-border p-6 bg-background">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">04 // Empatia com o Usuário</div>
                  <h3 className="text-xl mb-3">Foco na experiência</h3>
                  <p className="text-muted-foreground text-sm">Entender a jornada do usuário e suas dores é fundamental. Minha vivência em CRM me dá uma perspectiva valiosa para construir interfaces intuitivas e experiências de usuário satisfatórias.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
