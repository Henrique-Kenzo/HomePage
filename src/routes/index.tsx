import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HomeField, PARTICLES, SEED, SHAPE_NAMES, glyph, type FieldState } from "@/components/site/HomeField";
import { seo, PERSON } from "@/lib/site";
import { NOMERIS_RELEASE_README_URL } from "@/content/projects";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Kenzo Dev · Henrique Kenzo — Desenvolvedor full-stack, SaaS e IA",
      description:
        "Kenzo Dev (kenzo.dev) — Henrique Kenzo Silvatte, desenvolvedor full-stack em Londrina-PR. SaaS, ERPs industriais, automação, integrações e IA. Diagnóstico antes do código.",
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

const stack = [
  "Node.js",
  "Next.js",
  "React",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Visão computacional",
  "REST · Webhooks",
];

const servicos = [
  {
    titulo: "Operação manual",
    texto: "Planilhas viram sistemas web com autenticação, histórico e regras de negócio.",
    stack: "Node.js · Next.js · PostgreSQL",
  },
  {
    titulo: "Sistemas isolados",
    texto: "ERP, e-commerce e financeiro conversando via APIs e webhooks.",
    stack: "REST APIs · Webhooks · Python",
  },
  {
    titulo: "Falta de visibilidade",
    texto: "Dashboards e visões do ERP em tempo real para decidir com dado.",
    stack: "React · FastAPI · PostgreSQL",
  },
  {
    titulo: "Tarefas repetitivas",
    texto: "Automações e pipelines de IA, incluindo visão computacional.",
    stack: "Python · IA · Visão computacional",
  },
];

type FeaturedSystem = {
  nome: string;
  area: string;
  descricao: string;
  stack: string;
  arte: ReturnType<typeof glyph>;
  status?: { label: string; tone: "live" | "pre" };
  href?: string;
  cta?: string;
  caseStudy?: string;
};

const sistemas: FeaturedSystem[] = [
  {
    nome: "Nomeris",
    area: "Desktop · Varejo",
    status: { label: "Pré-lançamento", tone: "pre" },
    descricao:
      "PDV desktop para Windows: pagamentos mistos, caixa, estoque, trilha de auditoria e backup local. Funciona offline com licença válida; a renovação exige conexão.",
    stack: "Aplicação desktop · Windows",
    arte: glyph(5, 1.1, SEED + 23),
    href: NOMERIS_RELEASE_README_URL,
    cta: "Release e instruções",
    caseStudy: "/projetos/nomeris",
  },
  {
    nome: "MinhaFabrica",
    area: "Web · Indústria",
    status: { label: "No ar", tone: "live" },
    descricao:
      "Dashboard de operações industriais com autenticação, gestão de usuários e cadastro de produtos.",
    stack: "Node.js · Next.js · MongoDB",
    arte: glyph(3, 0.3, SEED + 11),
  },
  {
    nome: "Vision Pro",
    area: "Web · Dados",
    descricao: "Plataforma corporativa de gestão e monitoramento de dados.",
    stack: "Python · FastAPI · PostgreSQL · Docker",
    arte: glyph(7, 2.0, SEED + 37),
  },
];

const processo = [
  { titulo: "Descobrir", texto: "Entender o processo real antes de escrever código." },
  { titulo: "Modelar", texto: "Arquitetura, dados e regras de negócio planejados." },
  { titulo: "Construir", texto: "Iterações curtas e deploy cedo, com entregas visíveis." },
  { titulo: "Medir", texto: "Horas economizadas, tarefas automatizadas, problemas resolvidos." },
];

const NAV = [
  ["topo", "00", "Início"],
  ["sobre", "01", "Sobre"],
  ["servicos", "02", "Serviços"],
  ["projetos", "03", "Projetos"],
  ["processo", "04", "Processo"],
  ["contato", "05", "Contato"],
] as const;

// o preloader só toca na primeira entrada; navegações de volta à home pulam direto
let introPlayed = false;

function Home() {
  const [skip] = useState(() => introPlayed);
  const [armed, setArmed] = useState(false);
  const [rv, setRv] = useState<Record<string, boolean>>({});
  const [field, setField] = useState<FieldState>({ prog: 0, active: "topo", shape: 0 });
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // preloader: o CSS cuida da saída; aqui só o contador 000→100
  useEffect(() => {
    introPlayed = true;
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1500),
        e = 1 - Math.pow(1 - p, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(e * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.width = (e * 100).toFixed(1) + "%";
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skip]);

  // revelação por scroll — sem JS ou com movimento reduzido, tudo já aparece
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window))
      return;
    const io = new IntersectionObserver(
      (entries) => {
        const add: Record<string, boolean> = {};
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          add[en.target.getAttribute("data-reveal")!] = true;
          io.unobserve(en.target);
        }
        if (Object.keys(add).length) setRv((s) => ({ ...s, ...add }));
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    setArmed(true);
    return () => io.disconnect();
  }, []);

  const inCls = (key: string) => (!armed || rv[key] ? "in" : "");
  const shapeName = SHAPE_NAMES[field.shape] ?? SHAPE_NAMES[0];
  const label = (key: string, text: string) => <ScrambleLabel text={text} run={armed && !!rv[key]} />;

  return (
    <div
      className={`hk relative min-h-screen overflow-x-hidden bg-hk-bg font-inter text-base leading-[1.6] text-hk-fg ${armed ? "armed" : ""} ${skip ? "skip" : ""}`}
    >
      {/* preloader */}
      <div className="hk-loader" aria-hidden>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs text-hk-faint">kenzo.dev / inicializando campo</span>
            <span className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.03em]">
              Henrique Kenzo
            </span>
          </div>
          <span
            ref={countRef}
            className="font-mono text-[clamp(56px,10vw,140px)] font-medium leading-[0.9] text-hk-acc"
          >
            000
          </span>
        </div>
        <div className="mt-7 h-px bg-[#222624]">
          <div ref={barRef} className="h-px w-0 bg-hk-acc" />
        </div>
      </div>

      <HomeField onChange={setField} />

      {/* trilho esquerdo */}
      <nav className="hk-rail left-7 flex flex-col gap-0.5 font-mono" aria-label="Navegação lateral">
        {NAV.map(([id, num, nome]) => (
          <a key={id} href={`#${id}`} className={`hk-rl ${id === field.active ? "active" : ""}`}>
            <span className="hk-rl-bar" />
            <span>{num}</span>
            <span className="hk-rl-label">{nome}</span>
          </a>
        ))}
      </nav>

      {/* trilho direito */}
      <div
        className="hk-rail right-7 flex flex-col items-center gap-3.5 font-mono text-[11px] text-hk-faint"
        aria-hidden
      >
        <span className="[writing-mode:vertical-rl]">{shapeName}</span>
        <div className="relative h-[180px] w-px bg-[#2C312E]">
          <div className="absolute left-0 top-0 w-px bg-hk-acc" style={{ height: `${field.prog}%` }} />
          <div
            className="absolute -left-[3px] -mt-[3px] size-[7px] rounded-full bg-hk-acc"
            style={{ top: `${field.prog}%` }}
          />
        </div>
        <span className="text-hk-fg">{String(field.prog).padStart(2, "0")}%</span>
      </div>

      <div className="relative z-[1]">
        {/* HEADER */}
        <header className="hk-fade border-b border-hk-line bg-[rgba(12,14,14,0.6)] backdrop-blur-[10px]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-8 py-5">
            <a
              href="#topo"
              className="flex items-center gap-3 font-semibold tracking-[-0.01em] hover:text-white"
            >
              <span className="flex size-7 items-center justify-center border border-hk-edge font-mono text-xs text-hk-acc">
                HK
              </span>
              Henrique Kenzo
              <span className="font-mono text-xs font-normal text-hk-faint">/ kenzo.dev</span>
            </a>
            <nav className="hidden gap-8 text-sm min-[761px]:flex" aria-label="Seções">
              {NAV.slice(1, 5).map(([id, , nome]) => (
                <a key={id} className="hk-ulink text-hk-dim" href={`#${id}`}>
                  {nome}
                </a>
              ))}
            </nav>
            <a
              className="hk-ghost flex min-h-11 items-center border border-hk-edge px-[18px] py-2.5 text-sm font-medium hover:text-white"
              href="#contato"
            >
              Contato
            </a>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section
            id="topo"
            className="relative mx-auto flex min-h-[calc(100vh-85px)] max-w-[1200px] flex-col justify-center gap-14 px-8"
          >
            <div className="flex flex-wrap items-center gap-14 pt-[72px]">
              <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
                <div
                  className="hk-intro flex items-center gap-3 font-mono text-[13px] text-hk-dim"
                  style={{ "--d": "0.1s" } as CSSProperties}
                >
                  <span className="hk-ping size-2 rounded-full bg-hk-acc" />
                  {CONFIG.disponivel
                    ? "Disponível para projetos · PJ, freelance ou remoto"
                    : "Em projeto · respondo em até 24h"}
                </div>
                <h1 className="m-0 text-[clamp(44px,6.6vw,92px)] font-semibold leading-none tracking-[-0.045em]">
                  <span className="sr-only">
                    Kenzo Dev — Henrique Kenzo, desenvolvedor de software full-stack:{" "}
                  </span>
                  <Words words={["Encontro", "a", "causa,"]} start={0.15} />
                  <br />
                  <Words words={["não", "o", "sintoma."]} start={0.4} className="text-[#7E8681]" />
                </h1>
                <p
                  className="hk-intro m-0 max-w-[500px] text-[19px] leading-[1.6] text-hk-body"
                  style={{ "--d": "0.7s" } as CSSProperties}
                >
                  Sou o Kenzo, desenvolvedor full-stack em Londrina, PR. Construo SaaS, ERPs industriais,
                  automações, integrações e pipelines de IA com Node, Python e React — sempre começando pelo
                  diagnóstico.
                </p>
                <div
                  className="hk-intro flex flex-wrap gap-3 pt-1"
                  style={{ "--d": "0.85s" } as CSSProperties}
                >
                  <PrimaryButton href={WA_LINK}>Conversar no WhatsApp</PrimaryButton>
                  <a
                    className="hk-ghost hk-magnet flex min-h-[50px] items-center border border-hk-edge bg-[rgba(12,14,14,0.5)] px-6 py-[15px] text-[15px] font-medium"
                    href="#projetos"
                  >
                    Ver projetos
                  </a>
                </div>
              </div>
              <div
                className="hk-intro relative hidden h-[440px] min-w-0 flex-[1_1_380px] font-mono text-[11px] text-hk-faint min-[761px]:block"
                style={{ "--d": "1s" } as CSSProperties}
                aria-hidden
              >
                <span className="absolute left-0 top-0 size-4 border-l border-t border-hk-acc" />
                <span className="absolute right-0 top-0 size-4 border-r border-t border-hk-acc" />
                <span className="absolute bottom-0 left-0 size-4 border-b border-l border-hk-acc" />
                <span className="absolute bottom-0 right-0 size-4 border-b border-r border-hk-acc" />
                <span className="absolute left-[26px] top-0 flex items-center gap-2">
                  <span className="hk-pulse size-1.5 rounded-full bg-hk-acc" />
                  render · ao vivo
                </span>
                <span className="absolute right-[26px] top-0">{PARTICLES.toLocaleString("pt-BR")} pts</span>
                <span className="absolute -bottom-0.5 left-[26px]">fig. 01 — {shapeName}</span>
                <span className="absolute -bottom-0.5 right-[26px]">
                  seed {String(SEED).padStart(4, "0")}
                </span>
              </div>
            </div>
            <div
              className="hk-intro flex items-center justify-between gap-6 pb-10 font-mono text-xs text-hk-faint"
              style={{ "--d": "1.15s" } as CSSProperties}
            >
              <span>
                ~/kenzo-dev $ diagnosticar --antes-de-codar
                <span className="hk-caret" />
              </span>
              <span className="flex items-center gap-3.5">
                role para explorar <span className="hk-cue" />
              </span>
            </div>
          </section>

          {/* STACK (marquee) */}
          <section
            aria-label="Tecnologias"
            className="border-y border-hk-line bg-[rgba(12,14,14,0.75)] backdrop-blur-[6px]"
          >
            <div className="hk-mqwrap py-[22px] font-mono text-[13px] text-hk-dim">
              <div className="hk-mq gap-14 pr-14">
                {[...stack, ...stack].map((item, i) => (
                  <span key={i} className="contents">
                    <span aria-hidden={i >= stack.length || undefined}>{item}</span>
                    <span className="text-hk-acc" aria-hidden>
                      ◆
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SOBRE */}
          <section
            id="sobre"
            className="mx-auto grid min-h-[80vh] max-w-[1200px] items-start gap-12 px-8 pb-10 pt-40 md:grid-cols-3"
          >
            <div data-reveal="sobre" className={`hk-reveal ${inCls("sobre")} flex flex-col gap-3`}>
              <span className="font-mono text-[13px] text-hk-acc">{label("sobre", "01 — Sobre")}</span>
              <h2 className="m-0 text-[clamp(32px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Software que resolve o problema certo.
              </h2>
              <span className="mt-[260px] font-mono text-xs text-hk-faint" aria-hidden>
                fig. 02 — {shapeName}
              </span>
            </div>
            <div
              className={`hk-reveal ${inCls("sobre")} flex flex-col gap-5 bg-[rgba(12,14,14,0.55)] py-2 text-[17px] text-hk-body backdrop-blur-[4px] md:col-span-2`}
              style={{ transitionDelay: "0.15s" }}
            >
              <p className="m-0 text-[clamp(22px,2.2vw,28px)] leading-[1.45] tracking-[-0.015em] text-hk-fg">
                Antes de escrever código, entendo como a operação funciona de verdade: onde a informação se
                perde, que tarefa se repete, qual decisão fica sem dado.
              </p>
              <p className="m-0">
                Só então desenho a solução. Trabalho de ponta a ponta — banco de dados, APIs, interfaces e
                deploy — em sistemas para indústria, varejo e gestão de dados.
              </p>
              <dl
                className={`hk-stagger ${inCls("sobre")} mt-2 mb-0 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 border-t border-[#222624] pt-6`}
              >
                {[
                  ["Base", `${PERSON.city}, ${PERSON.region}`],
                  ["Atuação", "Full-stack"],
                  ["Formato", "PJ · Freelance · Remoto"],
                  ["Conhecido como", "Kenzo · kenzo.dev"],
                ].map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="font-mono text-xs text-[#8C948F]">{dt}</dt>
                    <dd className="mt-1 ml-0 text-hk-fg">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* SERVIÇOS */}
          <section id="servicos" className="mx-auto flex max-w-[1200px] flex-col gap-10 px-8 pt-[140px]">
            <div
              data-reveal="servicos"
              className={`hk-reveal ${inCls("servicos")} flex flex-wrap items-end justify-between gap-4`}
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[13px] text-hk-acc">
                  {label("servicos", "02 — Serviços")}
                </span>
                <h2 className="m-0 text-[clamp(32px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                  O que eu resolvo
                </h2>
              </div>
              <p className="m-0 max-w-[420px] text-hk-dim">
                Quatro problemas recorrentes em operações — e como cada um vira sistema.
              </p>
            </div>
            <div
              className={`hk-stagger ${inCls("servicos")} grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-hk-line bg-hk-line`}
            >
              {servicos.map((s, i) => (
                <article
                  key={s.titulo}
                  className="hk-card flex min-h-[280px] flex-col gap-3.5 bg-[rgba(12,14,14,0.88)] px-7 pb-11 pt-9"
                >
                  <span className="hk-big" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="hk-k font-mono text-xs text-[#8C948F]">2.{i + 1}</span>
                  <h3 className="m-0 text-[21px] font-semibold tracking-[-0.01em]">{s.titulo}</h3>
                  <p className="m-0 grow text-[15px] text-hk-body">{s.texto}</p>
                  <span className="font-mono text-xs text-hk-dim">{s.stack}</span>
                </article>
              ))}
            </div>
          </section>

          {/* PROJETOS */}
          {CONFIG.mostrarSistemas && (
            <section id="projetos" className="mx-auto flex max-w-[1200px] flex-col gap-10 px-8 pt-40">
              <div data-reveal="projetos" className={`hk-reveal ${inCls("projetos")} flex flex-col gap-3`}>
                <span className="font-mono text-[13px] text-hk-acc">
                  {label("projetos", "03 — Projetos")}
                </span>
                <h2 className="m-0 text-[clamp(32px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                  Trabalho selecionado
                </h2>
              </div>
              <div className="flex flex-col border-t border-hk-line">
                {sistemas.map((s, i) => (
                  <article
                    key={s.nome}
                    data-reveal={`p${i}`}
                    className={`hk-proj hk-reveal ${inCls(`p${i}`)} flex flex-wrap items-center gap-12 border-b border-hk-line py-12`}
                  >
                    <div className="hk-tilt relative min-w-0 flex-[1_1_340px] overflow-hidden border border-hk-line bg-[rgba(15,18,17,0.9)]">
                      <span
                        className="absolute left-3 top-2.5 z-[1] font-mono text-[11px] text-hk-faint"
                        aria-hidden
                      >
                        p.0{i + 1}
                      </span>
                      <svg
                        className="hk-draw block h-auto w-full"
                        role="img"
                        aria-label={`Padrão gerativo do projeto ${s.nome}`}
                        viewBox="0 0 360 220"
                      >
                        {s.arte.map((p, j) => (
                          <path
                            key={j}
                            pathLength={1}
                            d={p.d}
                            fill="none"
                            stroke={p.c}
                            strokeWidth={0.8}
                            strokeOpacity={p.o}
                          />
                        ))}
                      </svg>
                    </div>
                    <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
                      <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                        {s.status?.tone === "live" && (
                          <span className="flex items-center gap-2 border border-hk-acc px-2.5 py-1 text-hk-acc">
                            <span className="hk-pulse size-1.5 rounded-full bg-hk-acc" />
                            {s.status.label}
                          </span>
                        )}
                        {s.status?.tone === "pre" && (
                          <span className="border border-hk-gold px-2.5 py-1 text-hk-gold">
                            {s.status.label}
                          </span>
                        )}
                        <span className="border border-hk-edge px-2.5 py-1 text-hk-dim">{s.area}</span>
                      </div>
                      <h3 className="m-0 text-[clamp(28px,3vw,38px)] font-semibold tracking-[-0.025em]">
                        {s.nome}
                      </h3>
                      <p className="m-0 max-w-[560px] text-[17px] text-hk-body">{s.descricao}</p>
                      <span className="font-mono text-[13px] text-hk-dim">{s.stack}</span>
                      {(s.caseStudy || s.href) && (
                        <div className="flex flex-wrap gap-6 pt-1 text-sm font-medium">
                          {s.caseStudy && (
                            <a
                              href={s.caseStudy}
                              className="hk-ulink flex items-center gap-2 hover:text-white"
                            >
                              Ver estudo de caso <Arrow />
                            </a>
                          )}
                          {s.href && s.cta && (
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hk-ulink flex items-center gap-2 text-hk-dim hover:text-white"
                            >
                              {s.cta} ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* FAIXA CINÉTICA */}
          <div
            aria-hidden
            className="mt-[140px] overflow-hidden border-y border-hk-line bg-[rgba(12,14,14,0.5)] py-7"
          >
            <div id="hk-kin" className="hk-kin">
              {[0, 1].flatMap((n) =>
                processo.flatMap((p) => [
                  <span key={`${n}${p.titulo}`}>{p.titulo}</span>,
                  <span key={`${n}${p.titulo}→`} className="f">
                    →
                  </span>,
                ]),
              )}
            </div>
          </div>

          {/* PROCESSO */}
          <section id="processo" className="mx-auto flex max-w-[1200px] flex-col gap-10 px-8 pt-[120px]">
            <div data-reveal="processo" className={`hk-reveal ${inCls("processo")} flex flex-col gap-3`}>
              <span className="font-mono text-[13px] text-hk-acc">{label("processo", "04 — Processo")}</span>
              <h2 className="m-0 text-[clamp(32px,3.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Como eu trabalho
              </h2>
            </div>
            <ol
              className={`hk-stagger ${inCls("processo")} m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 p-0`}
            >
              {processo.map((p, i) => (
                <li key={p.titulo} className="flex flex-col gap-3.5">
                  <div className="hk-pline" />
                  <span className="font-mono text-[13px] text-hk-acc">0{i + 1}</span>
                  <h3 className="m-0 text-xl font-semibold">{p.titulo}</h3>
                  <p className="m-0 text-[15px] text-hk-body">{p.texto}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CONTATO */}
          <section id="contato" className="mx-auto max-w-[1200px] px-8 pb-24 pt-40">
            <div
              data-reveal="contato"
              className={`hk-reveal ${inCls("contato")} relative flex flex-wrap justify-between gap-12 border border-hk-line bg-[rgba(15,18,17,0.82)] p-[clamp(32px,5vw,64px)] backdrop-blur-[8px]`}
            >
              <span
                className="absolute -left-px -top-px size-[18px] border-l border-t border-hk-acc"
                aria-hidden
              />
              <span
                className="absolute -bottom-px -right-px size-[18px] border-b border-r border-hk-acc"
                aria-hidden
              />
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
                <span className="font-mono text-[13px] text-hk-acc">{label("contato", "05 — Contato")}</span>
                <h2 className="m-0 text-[clamp(32px,4vw,54px)] font-semibold leading-[1.05] tracking-[-0.035em]">
                  Tem um processo que poderia funcionar melhor?
                </h2>
                <p className="m-0 max-w-[460px] text-[17px] text-hk-body">
                  Conte o cenário. Eu respondo com um diagnóstico inicial e os próximos passos.
                </p>
                <PrimaryButton href={WA_LINK} className="self-start">
                  Conversar no WhatsApp
                </PrimaryButton>
              </div>
              <ul
                className={`hk-stagger ${inCls("contato")} m-0 flex min-w-0 flex-[1_1_300px] list-none flex-col p-0 text-[15px]`}
              >
                <ContactRow label="WhatsApp">
                  <a className="hk-ulink hover:text-white" href={WA_LINK} target="_blank" rel="noopener">
                    +55 43 99677-3272
                  </a>
                </ContactRow>
                <ContactRow label="E-mail">
                  <a className="hk-ulink hover:text-white" href={`mailto:${PERSON.email}`}>
                    {PERSON.email}
                  </a>
                </ContactRow>
                <ContactRow label="GitHub">
                  <a
                    className="hk-ulink hover:text-white"
                    href={PERSON.github}
                    target="_blank"
                    rel="me noopener"
                  >
                    Henrique-Kenzo
                  </a>
                </ContactRow>
                <ContactRow label="LinkedIn">
                  <a
                    className="hk-ulink hover:text-white"
                    href={PERSON.linkedin}
                    target="_blank"
                    rel="me noopener"
                  >
                    Henrique Kenzo Silvatte
                  </a>
                </ContactRow>
                <ContactRow label="Local" last>
                  <span>
                    {PERSON.city}, {PERSON.region}
                  </span>
                </ContactRow>
              </ul>
            </div>
          </section>
        </main>

        <footer className="border-t border-hk-line bg-[rgba(12,14,14,0.85)]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-8 py-7 font-mono text-xs text-[#8C948F]">
            <span>© {new Date().getFullYear()} Henrique Kenzo Silvatte · kenzo.dev</span>
            <span>Londrina, PR · Brasil</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Words({ words, start, className = "" }: { words: string[]; start: number; className?: string }) {
  return words.map((w, i) => (
    <span key={w}>
      {i > 0 && " "}
      <span className="hk-mask">
        <span className={`hk-word ${className}`} style={{ "--d": `${start + i * 0.07}s` } as CSSProperties}>
          {w}
        </span>
      </span>
    </span>
  ));
}

function Arrow() {
  return (
    <svg
      className="hk-arrow"
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`hk-btn hk-magnet flex min-h-[50px] items-center gap-2.5 bg-hk-fg px-6 py-[15px] text-[15px] font-semibold text-hk-bg ${className}`}
      href={href}
      target="_blank"
      rel="noopener"
    >
      {children}
      <Arrow />
    </a>
  );
}

function ContactRow({ label, last, children }: { label: string; last?: boolean; children: ReactNode }) {
  return (
    <li className={`flex justify-between gap-4 py-4 ${last ? "" : "border-b border-[#222624]"}`}>
      <span className="font-mono text-xs text-[#8C948F]">{label}</span>
      {children}
    </li>
  );
}

/** Rótulo de seção que se "decodifica" ao entrar na tela. */
function ScrambleLabel({ text, run }: { text: string; run: boolean }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (!run) return;
    const chars = "01<>/_#*+=:;[]{}";
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      const n = Math.floor(text.length * p);
      let s = text.slice(0, n);
      for (let i = n; i < text.length; i++)
        s += text[i] === " " ? " " : chars[Math.floor(Math.random() * chars.length)];
      setShown(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, text]);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </>
  );
}
