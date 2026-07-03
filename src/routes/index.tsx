import { createFileRoute, Link } from "@tanstack/react-router";
import { FxNeural } from "@/components/site/FxNeural";
import { seo, PERSON } from "@/lib/site";
import minhafabricaImg from "@/assets/minhafabrica-dashboard.webp";
import visionprodImg from "@/assets/visionprod-dashboard.webp";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Henrique Kenzo · Desenvolvedor de Software Full-Stack",
      description:
        "Henrique Kenzo Silvatte (kenzo.dev) — desenvolvedor de software full-stack em Londrina-PR. Sistemas web, ERPs industriais, automação, integrações e IA.",
      path: "/",
    }),
  component: Home,
});

const navLinks = [
  { href: "#sistemas", label: "./sistemas" },
  { href: "#lab", label: "./lab" },
  { href: "#stack", label: "./stack" },
  { href: "#processo", label: "./processo" },
];

const manifesto = [
  { n: "/01", text: <>Sistemas devem trabalhar sozinhos.</> },
  { n: "/02", text: <>Interfaces devem responder.</> },
  {
    n: "/03",
    text: (
      <>
        Código deve <span className="text-neon">durar.</span>
      </>
    ),
  },
];

const labs = [
  {
    spec: "spec/01 · redes",
    title: "BillsMap",
    hipotese: "dá para entender o Nmap por baixo dos panos reimplementando-o.",
    metodo: "scanner de portas com Python Asyncio e sockets crus.",
    aprendizado: "concorrência assíncrona aplicada a varredura de redes corporativas.",
    tags: ["Python", "Asyncio", "Sockets"],
  },
  {
    spec: "spec/02 · automação",
    title: "Mini-CRM",
    hipotese: "um time comercial consegue operar um CRM dentro do Google Sheets.",
    metodo: "Sheets como banco ágil, integrado via API com scripts Python.",
    aprendizado: "integração de APIs externas e desenho de fluxo para usuários não-técnicos.",
    tags: ["Python", "Sheets API", "Google Cloud"],
  },
  {
    spec: "spec/03 · front-end",
    title: "Landing Page React",
    hipotese: "componentização bem feita acelera qualquer interface de conversão.",
    metodo: "landing responsiva em React com padrões de componentização.",
    aprendizado: "arquitetura de componentes e performance percebida.",
    tags: ["React", "HTML", "CSS"],
  },
  {
    spec: "spec/04 · front-end",
    title: "LinkTree 0.1",
    hipotese: "uma página útil pode pesar quase nada.",
    metodo: "agregador de links em HTML e CSS puros, mobile-first.",
    aprendizado: "performance como restrição de design, não otimização posterior.",
    tags: ["HTML", "CSS"],
  },
];

const clusters = [
  {
    title: "backend & apis",
    items: ["Node.js · Express", "Python · FastAPI", "REST APIs", "Autenticação JWT"],
  },
  { title: "front-end", items: ["React · Next.js", "TypeScript", "HTML / CSS", "Design responsivo"] },
  { title: "dados", items: ["MongoDB", "PostgreSQL", "SQL · modelagem", "Persistência segura"] },
  {
    title: "automação & ia",
    items: ["Integrações via API", "Webhooks", "Visão computacional", "Pipelines de IA"],
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_30%,rgba(7,9,7,0.55)_100%)]" />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-10 flex items-center gap-9 border-b border-white/[0.06] bg-ink/70 px-6 py-5 backdrop-blur-xl md:px-12">
          <a href="#topo" className="font-mono text-[15px] font-bold text-paper no-underline">
            kenzo<span className="text-neon">.dev</span>
          </a>
          <nav className="ml-auto flex items-center gap-7" aria-label="Navegação principal">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hidden font-mono text-[11px] tracking-[0.18em] text-paper/60 transition-colors hover:text-neon md:inline"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/sobre"
              className="hidden font-mono text-[11px] tracking-[0.18em] text-paper/60 transition-colors hover:text-neon md:inline"
            >
              ./sobre
            </Link>
            <a
              href="#contato"
              className="bg-neon px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] text-ink transition-colors hover:bg-neon-bright"
            >
              iniciar_conexao()
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
                  rede ativa · londrina-pr · disponível
                </span>
              </div>
              <h1
                className="animate-fade-up m-0 max-w-[14ch] text-[clamp(48px,6.5vw,92px)] font-bold leading-none tracking-[-0.03em]"
                style={{ animationDelay: "0.08s" }}
              >
                <span className="sr-only">
                  Henrique Kenzo, desenvolvedor de software full-stack —{" "}
                </span>
                Eu não faço páginas. Eu construo <span className="text-neon">sistemas vivos.</span>
              </h1>
              <p
                className="animate-fade-up m-0 max-w-[52ch] text-[19px] leading-[1.6] text-paper/60"
                style={{ animationDelay: "0.16s" }}
              >
                Henrique Kenzo · engenharia full-stack. ERPs industriais, pipelines de IA e visão
                computacional, integrações que trabalham enquanto você dorme. Node, Python e React — do banco
                ao pixel.
              </p>
              <div className="animate-fade-up flex flex-wrap gap-3.5" style={{ animationDelay: "0.24s" }}>
                <a
                  href="#sistemas"
                  className="inline-block bg-neon px-7 py-4 font-mono text-[13px] font-bold text-ink transition-all hover:bg-neon-bright hover:shadow-[0_0_34px_rgba(182,243,74,0.45)]"
                >
                  acessar_rede()
                </a>
                <a
                  href="#contato"
                  className="inline-block border border-paper/25 px-7 py-4 font-mono text-[13px] text-paper transition-colors hover:border-neon hover:text-neon"
                >
                  transmitir_mensagem()
                </a>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[1200px] items-center pb-[26px]">
              <span className="font-mono text-[10px] tracking-[0.18em] text-paper/35">
                LAT -23.3103 · LON -51.1628 · nó: hero/01 · sinapses: 118
              </span>
              <span className="ml-auto hidden font-mono text-[10px] tracking-[0.18em] text-neon/60 md:inline">
                mova o mouse · clique para propagar um pulso · scroll ↓
              </span>
            </div>
          </section>

          {/* MANIFESTO */}
          <section className="border-t border-white/[0.07] px-6 py-[140px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">manifesto</div>
              <div className="flex flex-col gap-9">
                {manifesto.map((m) => (
                  <div key={m.n} className="grid grid-cols-[60px_1fr] items-baseline gap-6">
                    <span className="font-mono text-sm text-neon/70">{m.n}</span>
                    <span className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.1] tracking-[-0.02em]">
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SISTEMAS */}
          <section id="sistemas" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
              <div className="flex flex-col gap-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./sistemas — cases reais
                </div>
                <h2 className="m-0 max-w-[20ch] text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                  Sistemas em produção, de ponta a ponta.
                </h2>
              </div>

              {/* CASE 01 */}
              <article className="grid items-center gap-12 border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-neon/40 md:p-10 lg:grid-cols-[5fr_7fr]">
                <div className="flex flex-col gap-[18px]">
                  <div className="font-mono text-[11px] tracking-[0.25em] text-neon/80">
                    case/01 · full-stack web
                  </div>
                  <h3 className="m-0 text-[34px] font-bold tracking-[-0.02em]">MinhaFabrica</h3>
                  <div className="grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 text-sm leading-[1.6]">
                    <CaseLabel>problema</CaseLabel>
                    <span className="text-paper/75">
                      Operação industrial sem visibilidade centralizada de usuários, produtos e processos.
                    </span>
                    <CaseLabel>solução</CaseLabel>
                    <span className="text-paper/75">
                      Painel administrativo completo com autenticação JWT, CRUD de usuários e produtos,
                      backend e frontend separados por responsabilidade.
                    </span>
                    <CaseLabel>arquitetura</CaseLabel>
                    <span className="text-paper/75">
                      Controllers → services → models · API Node.js · interface Next.js · MongoDB.
                    </span>
                    <CaseLabel>status</CaseLabel>
                    <span className="text-neon">online · hospedado na Vercel</span>
                  </div>
                  <TagRow tags={["Next.js", "Node.js", "Express", "MongoDB", "JWT", "TypeScript"]} />
                </div>
                <BrowserFrame label="minhafabrica.com · online" live>
                  <img
                    src={minhafabricaImg}
                    alt="Painel administrativo do sistema MinhaFabrica — gestão de usuários e produtos"
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
              </article>

              {/* CASE 02 */}
              <article className="grid items-center gap-12 border border-white/[0.08] bg-white/[0.015] p-6 transition-colors hover:border-neon/40 md:p-10 lg:grid-cols-[7fr_5fr]">
                <BrowserFrame label="visionprod · dashboard" className="order-last lg:order-first">
                  <img
                    src={visionprodImg}
                    alt="Dashboard do sistema empresarial Vision Pro — gestão e monitoramento de dados"
                    width={1440}
                    height={810}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
                <div className="flex flex-col gap-[18px]">
                  <div className="font-mono text-[11px] tracking-[0.25em] text-neon/80">
                    case/02 · sistemas empresariais
                  </div>
                  <h3 className="m-0 text-[34px] font-bold tracking-[-0.02em]">Vision Pro</h3>
                  <div className="grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 text-sm leading-[1.6]">
                    <CaseLabel>problema</CaseLabel>
                    <span className="text-paper/75">
                      Empresas sem ferramenta robusta para gerenciar dados corporativos em tempo real.
                    </span>
                    <CaseLabel>solução</CaseLabel>
                    <span className="text-paper/75">
                      Plataforma completa de gestão e monitoramento: backend Python/FastAPI, frontend React,
                      containerizada com Docker.
                    </span>
                    <CaseLabel>arquitetura</CaseLabel>
                    <span className="text-paper/75">APIs REST · PostgreSQL · React · Docker.</span>
                  </div>
                  <TagRow tags={["Python", "FastAPI", "PostgreSQL", "React", "Docker"]} />
                </div>
              </article>

              <Link
                to="/projetos"
                className="self-start font-mono text-[11px] tracking-[0.25em] text-paper/50 transition-colors hover:text-neon"
              >
                ver_todos_os_projetos() →
              </Link>
            </div>
          </section>

          {/* LAB */}
          <section id="lab" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
              <div className="flex flex-col gap-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./lab — experimentos
                </div>
                <h2 className="m-0 max-w-[24ch] text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                  Onde eu quebro coisas de propósito.
                </h2>
                <p className="m-0 max-w-[60ch] text-base text-paper/55">
                  Experimentos têm cara de experimento: hipótese, método, aprendizado. É aqui que novas
                  tecnologias entram na rede.
                </p>
              </div>
              <div className="grid gap-3.5 md:grid-cols-2">
                {labs.map((lab) => (
                  <article
                    key={lab.title}
                    className="flex flex-col gap-3 border border-white/[0.08] bg-white/[0.012] p-7 transition-colors hover:border-neon/45"
                  >
                    <div className="font-mono text-[10px] tracking-[0.25em] text-neon/70">{lab.spec}</div>
                    <div className="text-[22px] font-bold">{lab.title}</div>
                    <div className="grid grid-cols-[100px_1fr] gap-x-3.5 gap-y-1.5 text-[13.5px] leading-[1.6] text-paper/70">
                      <LabLabel>hipótese</LabLabel>
                      <span>{lab.hipotese}</span>
                      <LabLabel>método</LabLabel>
                      <span>{lab.metodo}</span>
                      <LabLabel>aprendizado</LabLabel>
                      <span>{lab.aprendizado}</span>
                    </div>
                    <div className="mt-auto flex gap-2 pt-2">
                      {lab.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-white/[0.12] px-[9px] py-1 font-mono text-[10px] text-paper/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <Link
                to="/laboratorio"
                className="self-start font-mono text-[11px] tracking-[0.25em] text-paper/50 transition-colors hover:text-neon"
              >
                abrir_laboratorio() →
              </Link>
            </div>
          </section>

          {/* STACK */}
          <section id="stack" className="border-t border-white/[0.07] px-6 py-[120px] md:px-12">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
              <div className="flex flex-col gap-3.5">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon">
                  ./stack — o grafo
                </div>
                <h2 className="m-0 text-[clamp(34px,4vw,52px)] font-bold tracking-[-0.02em]">
                  Quatro clusters, uma rede.
                </h2>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {clusters.map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-col gap-4 border border-white/[0.08] bg-white/[0.012] p-[26px] transition-colors hover:border-neon/45"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon">
                      {c.title}
                    </div>
                    <div className="flex flex-col gap-2 font-mono text-[13px] text-paper/80">
                      {c.items.map((it) => (
                        <span key={it}>◦ {it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/stack"
                className="self-start font-mono text-[11px] tracking-[0.25em] text-paper/50 transition-colors hover:text-neon"
              >
                expandir_grafo() →
              </Link>
            </div>
          </section>

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
                  Traga um problema <span className="text-neon">difícil.</span>
                </h2>
                <p className="m-0 max-w-[44ch] text-lg leading-[1.6] text-paper/60">
                  É assim que toda boa arquitetura começa. Aberto a oportunidades full-stack, implementação de
                  sistemas e integrações — CLT, PJ ou remoto.
                </p>
                <div className="flex flex-wrap gap-3.5">
                  <a
                    href={`mailto:${PERSON.email}`}
                    className="inline-block bg-neon px-7 py-4 font-mono text-[13px] font-bold text-ink transition-all hover:bg-neon-bright hover:shadow-[0_0_34px_rgba(182,243,74,0.45)]"
                  >
                    transmitir_mensagem()
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
                <div className="px-6 py-[22px] font-mono text-[13px] leading-8 text-paper/80">
                  <div>
                    <span className="text-neon">$</span> iniciar_conexao --alvo kenzo
                  </div>
                  <div className="text-paper/50">resolvendo nó… ok</div>
                  <div className="text-paper/50">handshake… ok</div>
                  <div className="text-paper/50">latência: Londrina-PR → você: 0ms</div>
                  <div>
                    <span className="text-neon">$</span> status
                  </div>
                  <div className="text-neon">
                    disponível para novos sistemas
                    <span className="ml-1.5 inline-block h-[15px] w-2 animate-[blinkdot_1s_infinite] bg-neon align-middle" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="flex flex-col gap-4 border-t border-white/[0.07] bg-ink/70 px-6 py-7 md:px-12">
          <nav aria-label="Mapa do site" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(
              [
                ["/sobre", "sobre"],
                ["/construo", "construo"],
                ["/projetos", "projetos"],
                ["/laboratorio", "laboratório"],
                ["/stack", "stack"],
                ["/roadmap", "roadmap"],
                ["/contato", "contato"],
              ] as const
            ).map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="font-mono text-[10px] tracking-[0.2em] text-paper/45 transition-colors hover:text-neon"
              >
                ./{label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="font-mono text-[11px] tracking-[0.14em] text-paper/45">
              © {new Date().getFullYear()} kenzo.dev — renderizado em tempo real · 60fps
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-paper/45 md:ml-auto">
              Henrique Kenzo Silvatte · Londrina-PR
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CaseLabel({ children }: { children: string }) {
  return <span className="pt-0.5 font-mono text-[11px] text-paper/45">{children}</span>;
}

function LabLabel({ children }: { children: string }) {
  return <span className="pt-0.5 font-mono text-[10px] text-paper/40">{children}</span>;
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="border border-white/[0.12] px-2.5 py-[5px] font-mono text-[10px] tracking-[0.1em] text-paper/70"
        >
          {t}
        </span>
      ))}
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

function BrowserFrame({
  label,
  live,
  className,
  children,
}: {
  label: string;
  live?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border border-white/10 bg-[#0a0d0a] ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3.5 py-2.5">
        <TrafficDots />
        <span className="ml-2.5 font-mono text-[10px] tracking-[0.12em] text-paper/40">{label}</span>
        {live && (
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-neon">
            <span className="animate-blinkdot size-[5px] rounded-full bg-neon" />
            LIVE
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
