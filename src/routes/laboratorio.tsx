import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/site/BackgroundFX";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/laboratorio")({
  head: () => ({
    meta: [
      { title: "Laboratório · Henrique Kenzo Silvatte" },
      { name: "description", content: "Experimentos reais: BillsMap, Bots em Python, Mini-CRMs e exercícios de React." },
      { property: "og:title", content: "Laboratório · Estudos de Henrique" },
      { property: "og:description", content: "O que estudo quando ninguém está olhando." },
    ],
  }),
  component: LabPage,
});

const experiments = [
  { id: "EXP_01", title: "BillsMap Scanner", desc: "Scanner de portas assíncrono construído em Python. Estudo prático de redes e da biblioteca Asyncio.", tag: "Python & Redes", progress: 95 },
  { id: "EXP_02", title: "Bot de Música", desc: "Bot para Discord em Python focado em manipulação de áudio e comandos assíncronos.", tag: "Python", progress: 80 },
  { id: "EXP_03", title: "Mini-CRM CLI", desc: "Integração via API com o Google Sheets para gerenciar contatos através de terminal.", tag: "APIs & Integração", progress: 100 },
  { id: "EXP_04", title: "Exercícios React", desc: "Múltiplos componentes isolados focando em Hooks e gerenciamento de estado complexo.", tag: "React", progress: 60 },
];

function LabPage() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <SiteHeader />
        <section className="px-6 pt-24 pb-12">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionLabel accent="accent">Pesquisa · Laboratório</SectionLabel>
              <div className="flex items-end justify-between flex-wrap gap-6">
                <h1 className="font-display text-5xl md:text-7xl max-w-3xl text-balance">
                  O que estudo quando<br /><span className="text-accent italic">ninguém está olhando.</span>
                </h1>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  STABLE_RELEASES_ONLY: <span className="text-accent">FALSE</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {experiments.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.04}>
                <div className="group h-full border border-dashed border-border bg-white/[0.02] p-6 transition-colors hover:border-accent/60 hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">#{e.id}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{e.tag}</span>
                  </div>
                  <h3 className="font-display text-xl mb-2">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mb-8">{e.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                      <span>PROGRESS</span><span>{e.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5">
                      <div className="h-full bg-accent transition-all" style={{ width: `${e.progress}%` }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <SiteFooter />
      </div>
    </>
  );
}
