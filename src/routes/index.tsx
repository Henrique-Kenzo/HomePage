import { createFileRoute } from "@tanstack/react-router";
import { FxNeural } from "@/components/site/FxNeural";
import { seo, PERSON } from "@/lib/site";
import minhafabricaImg from "@/assets/minhafabrica-dashboard.webp";
import visionprodImg from "@/assets/visionprod-dashboard.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Henrique Kenzo — Eu encontro a causa, não o sintoma",
      description:
        "Henrique Kenzo Silvatte (kenzo.dev) — engenharia de software full-stack em Londrina-PR. ERPs industriais, automação, integrações e IA. Diagnóstico antes do código.",
      path: "/",
    }),
  component: Home,
});

/** Flags de configuração do cartão de visitas (ver README do handoff). */
const CONFIG = {
  disponivel: true,
  mostrarSistemas: true,
  mensagemWhatsApp: "Oi Henrique! Vi seu site e tenho um problema que queria te mostrar.",
};

const WA_LINK = `https://wa.me/5543996773272?text=${encodeURIComponent(CONFIG.mensagemWhatsApp)}`;

const dores = [
  {
    tag: "operação manual",
    problema: "A planilha virou o sistema — e virou o gargalo.",
    saida:
      "Sistema web com dono, autenticação, histórico e regra de negócio no lugar certo. A planilha volta a ser planilha.",
    stack: "Node.js · Next.js · PostgreSQL",
  },
  {
    tag: "sistemas isolados",
    problema: "ERP, e-commerce e financeiro que não se falam.",
    saida:
      "Integrações via API e webhooks que sincronizam sozinhas — sem redigitar nada, sem 'esperar o fechamento do mês'.",
    stack: "APIs REST · Webhooks · Python",
  },
  {
    tag: "sem visibilidade",
    problema: "Decisão tomada no escuro, número descoberto tarde.",
    saida:
      "Painéis e ERP com o número certo na tela, em tempo real. Quem opera enxerga; quem decide confia.",
    stack: "React · FastAPI · PostgreSQL",
  },
  {
    tag: "tarefa repetitiva",
    problema: "Horas de gente boa gastas em copiar-e-colar.",
    saida:
      "Automação e pipelines de IA (incluindo visão computacional) medidos em horas economizadas por mês.",
    stack: "Python · IA · Visão computacional",
  },
];

const sistemas = [
  {
    nome: "MinhaFabrica",
    label: "minhafabrica.com · online",
    live: true,
    descricao:
      "Operação industrial sem visibilidade centralizada → painel completo com autenticação, usuários e produtos. Node.js · Next.js · MongoDB.",
    img: minhafabricaImg,
    alt: "Painel administrativo do sistema MinhaFabrica",
    width: 1440,
    height: 900,
  },
  {
    nome: "Vision Pro",
    label: "visionprod · dashboard",
    live: false,
    descricao:
      "Dados corporativos sem ferramenta robusta → plataforma de gestão e monitoramento. Python · FastAPI · PostgreSQL · Docker.",
    img: visionprodImg,
    alt: "Dashboard do sistema empresarial Vision Pro",
    width: 1440,
    height: 810,
  },
];

const processo = [
  {
    step: "01 descobrir",
    text: "Entendo o processo real antes do código. O problema certo vale mais que a solução elegante.",
    border: "border-neon",
  },
  {
    step: "02 modelar",
    text: "Arquitetura, dados e regras de negócio no papel. Camadas claras: controllers, services, models.",
    border: "border-neon/50",
  },
  {
    step: "03 construir",
    text: "Entregas curtas, deploy cedo. Sistema em produção ensina mais que sistema em staging.",
    border: "border-neon/30",
  },
  {
    step: "04 medir",
    text: "O que o sistema economizou, automatizou ou destravou. Sem número, não acabou.",
    border: "border-neon/15",
  },
];

function Home() {
  return (
    <div className="relative min-h-screen bg-ink font-grotesk text-paper">
      {/* REDE VIVA — fundo fixo, reage a mouse e clique na página inteira */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <FxNeural />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_30%,rgba(7,9,7,0.55)_100%)]" />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-10 flex items-center gap-9 border-b border-white/[0.06] bg-ink/70 px-6 py-5 backdrop-blur-xl md:px-12">
          <a href="#topo" className="font-mono text-[15px] font-bold text-paper no-underline">
            kenzo<span className="text-neon">.dev</span>
          </a>
          <nav className="ml-auto flex items-center gap-7" aria-label="Navegação principal">
            <a
              href="#resolvo"
              className="hidden font-mono text-[11px] tracking-[0.18em] text-paper/60 transition-colors hover:text-neon md:inline"
            >
              ./resolvo
            </a>
            <a
              href="#processo"
              className="hidden font-mono text-[11px] tracking-[0.18em] text-paper/60 transition-colors hover:text-neon md:inline"
            >
              ./processo
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener"
              className="bg-neon px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] text-ink transition-colors hover:bg-neon-bright"
            >
              chamar_no_whatsapp()
            </a>
          </nav>
        </header>

        <main>
          {/* HERO */}
          <section id="topo" className="flex min-h-[calc(100vh-73px)] flex-col px-6 md:px-12">
            <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center gap-7 py-16">
              <div className="animate-fade-up inline-flex items-center gap-2 self-start border border-neon/35 px-3.5 py-[7px]">
                <span className="animate-blinkdot size-1.5 rounded-full bg-neon" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-neon">
                  rede ativa · londrina-pr · {CONFIG.disponivel ? "disponível" : "em projeto"}
                </span>
              </div>
              <h1
                className="animate-fade-up m-0 max-w-[15ch] text-[clamp(48px,6.5vw,92px)] font-bold leading-none tracking-[-0.03em]"
                style={{ animationDelay: "0.08s" }}
              >
                <span className="sr-only">
                  Henrique Kenzo, desenvolvedor de software full-stack —{" "}
                </span>
                Sintoma qualquer um vê. Eu resolvo <span className="text-neon">a causa.</span>
              </h1>
              <p
                className="animate-fade-up m-0 max-w-[52ch] text-[19px] leading-[1.6] text-paper/60"
                style={{ animationDelay: "0.16s" }}
              >
                Henrique Kenzo · engenharia full-stack. ERPs industriais, automação, integrações e
                pipelines de IA — sistemas que continuam funcionando depois que o deploy acaba. Node,
                Python e React, do banco ao pixel.
              </p>
              <div className="animate-fade-up flex flex-wrap gap-3.5" style={{ animationDelay: "0.24s" }}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener"
                  className="inline-block bg-neon px-7 py-4 font-mono text-[13px] font-bold text-ink transition-all hover:bg-neon-bright hover:shadow-[0_0_34px_rgba(182,243,74,0.45)]"
                >
                  me_conta_o_problema()
                </a>
                <a
                  href="#resolvo"
                  className="inline-block border border-paper/25 px-7 py-4 font-mono text-[13px] text-paper transition-colors hover:border-neon hover:text-neon"
                >
                  ver_o_que_eu_resolvo()
                </a>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[1200px] items-center pb-[26px]">
              <span className="font-mono text-[10px] tracking-[0.18em] text-paper/35">
                LAT -23.3103 · LON -51.1628 · nó: cartao/01 · sinapses: 118
              </span>
              <span className="ml-auto hidden font-mono text-[10px] tracking-[0.18em] text-neon/60 md:inline">
                mova o mouse · clique para propagar um pulso · scroll ↓
              </span>
            </div>
          </section>

          {/* O QUE EU RESOLVO */}
          <section id="resolvo" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
              <div className="flex flex-col gap-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./resolvo — do problema ao sistema
                </div>
                <h2 className="m-0 max-w-[20ch] text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                  Se está te custando tempo, dá pra virar sistema.
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3.5">
                {dores.map((dor) => (
                  <article
                    key={dor.tag}
                    className="flex flex-col gap-4 border border-white/[0.08] bg-white/[0.012] p-[26px] transition-colors hover:border-neon/45"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon">
                      {dor.tag}
                    </div>
                    <div className="text-lg font-bold leading-[1.3]">{dor.problema}</div>
                    <div className="text-sm leading-[1.6] text-paper/65">{dor.saida}</div>
                    <div className="mt-auto pt-2 font-mono text-[11px] text-paper/50">
                      → {dor.stack}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* PROVA EM PRODUÇÃO */}
          {CONFIG.mostrarSistemas && (
            <section id="producao" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
              <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
                <div className="flex flex-col gap-3.5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                    ./producao — não é mockup
                  </div>
                  <h2 className="m-0 max-w-[22ch] text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                    Sistemas rodando agora, com usuário de verdade.
                  </h2>
                </div>
                <div className="grid gap-3.5 md:grid-cols-[repeat(auto-fit,minmax(380px,1fr))]">
                  {sistemas.map((s) => (
                    <article
                      key={s.nome}
                      className="flex flex-col border border-white/10 bg-[#0a0d0a] transition-colors hover:border-neon/40"
                    >
                      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3.5 py-2.5">
                        <TrafficDots />
                        <span className="ml-2.5 font-mono text-[10px] tracking-[0.12em] text-paper/40">
                          {s.label}
                        </span>
                        {s.live && (
                          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-neon">
                            <span className="animate-blinkdot size-[5px] rounded-full bg-neon" />
                            LIVE
                          </span>
                        )}
                      </div>
                      <img
                        src={s.img}
                        alt={s.alt}
                        width={s.width}
                        height={s.height}
                        loading="lazy"
                        className="block h-auto w-full"
                      />
                      <div className="flex flex-col gap-2 px-6 py-5">
                        <div className="text-xl font-bold">{s.nome}</div>
                        <div className="text-[13.5px] leading-[1.6] text-paper/65">{s.descricao}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PROCESSO */}
          <section id="processo" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
              <div className="flex flex-col gap-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./processo — o pipeline
                </div>
                <h2 className="m-0 text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                  Descobrir → modelar → construir → medir.
                </h2>
              </div>
              <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                {processo.map((p) => (
                  <div
                    key={p.step}
                    className={`flex flex-col gap-2.5 border-l-2 ${p.border} py-1.5 pl-[22px] pr-6`}
                  >
                    <span className="font-mono text-xs text-neon">{p.step}</span>
                    <span className="text-sm leading-[1.6] text-paper/70">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTATO */}
          <section id="contato" className="border-t border-white/[0.07] px-6 pb-[100px] pt-[140px] md:px-12">
            <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[7fr_5fr]">
              <div className="flex flex-col gap-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./contato — handshake
                </div>
                <h2 className="m-0 text-[clamp(40px,5vw,68px)] font-bold leading-[1.02] tracking-[-0.03em]">
                  Me conta o problema. O diagnóstico é <span className="text-neon">comigo.</span>
                </h2>
                <p className="m-0 max-w-[44ch] text-lg leading-[1.6] text-paper/60">
                  Uma mensagem descrevendo o que está travando sua operação já é o suficiente pra
                  começar. Full-stack, sistemas e integrações — PJ, freelance ou remoto.
                </p>
                <div className="flex flex-wrap gap-3.5">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener"
                    className="inline-block bg-neon px-7 py-4 font-mono text-[13px] font-bold text-ink transition-all hover:bg-neon-bright hover:shadow-[0_0_34px_rgba(182,243,74,0.45)]"
                  >
                    chamar_no_whatsapp()
                  </a>
                  <a
                    href={`mailto:${PERSON.email}`}
                    className="inline-block border border-paper/25 px-7 py-4 font-mono text-[13px] text-paper transition-colors hover:border-neon hover:text-neon"
                  >
                    e-mail
                  </a>
                  <a
                    href={PERSON.github}
                    target="_blank"
                    rel="me noopener"
                    className="inline-block border border-paper/25 px-7 py-4 font-mono text-[13px] text-paper transition-colors hover:border-neon hover:text-neon"
                  >
                    github ↗
                  </a>
                  <a
                    href={PERSON.linkedin}
                    target="_blank"
                    rel="me noopener"
                    className="inline-block border border-paper/25 px-7 py-4 font-mono text-[13px] text-paper transition-colors hover:border-neon hover:text-neon"
                  >
                    linkedin ↗
                  </a>
                </div>
              </div>
              <div className="border border-white/10 bg-[rgba(10,13,10,0.85)] backdrop-blur-[10px]">
                <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3.5 py-2.5">
                  <TrafficDots />
                  <span className="ml-2.5 font-mono text-[10px] tracking-[0.12em] text-paper/40">
                    kenzo@rede:~
                  </span>
                </div>
                <div className="px-6 py-[22px] font-mono text-[13px] leading-[2.1] text-paper/80">
                  <div>
                    <span className="text-neon">$</span> iniciar_conexao --via whatsapp
                  </div>
                  <div className="text-paper/50">resolvendo nó… ok</div>
                  <div className="text-paper/50">handshake… ok</div>
                  <div className="text-paper/50">latência: Londrina-PR → você: 0ms</div>
                  <div>
                    <span className="text-neon">$</span> status
                  </div>
                  <div className="text-neon">
                    {CONFIG.disponivel
                      ? "disponível para novos sistemas"
                      : "em projeto — respondo em até 24h"}
                    <span className="ml-1.5 inline-block h-[15px] w-2 animate-[blinkdot_1s_infinite] bg-neon align-middle" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="flex flex-col gap-2 border-t border-white/[0.07] bg-ink/70 px-6 py-7 md:flex-row md:items-center md:px-12">
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper/45">
            © {new Date().getFullYear()} kenzo.dev — renderizado em tempo real · 60fps
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-paper/45 md:ml-auto">
            Henrique Kenzo Silvatte · Londrina-PR
          </span>
        </footer>
      </div>
    </div>
  );
}

function TrafficDots() {
  return (
    <>
      <span className="size-2 rounded-full bg-[rgba(255,95,86,0.7)]" />
      <span className="size-2 rounded-full bg-[rgba(255,189,46,0.7)]" />
      <span className="size-2 rounded-full bg-[rgba(39,201,63,0.7)]" />
    </>
  );
}
