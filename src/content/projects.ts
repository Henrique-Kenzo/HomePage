import nomerisPdvPng from "@/assets/nomeris-pdv.png";
import nomerisPdvWebp from "@/assets/nomeris-pdv.webp";
import nomerisProdutosWebp from "@/assets/nomeris-produtos.webp";
import nomerisCaixaWebp from "@/assets/nomeris-caixa.webp";
import nomerisVisaoGerencialWebp from "@/assets/nomeris-visao-gerencial.webp";

export const NOMERIS_RELEASE_README_URL =
  "https://github.com/Henrique-Kenzo/Nomeris-Releases/blob/main/README.md";

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  problem: string;
  solution: string;
  architecture: string[];
  result: { value: string; label: string }[];
  stack: string[];
  status?: string;
  hero?: ProjectMedia;
  ogImage?: string;
  gallery?: ProjectMedia[];
  highlights?: { label: string; title: string; description: string }[];
  externalLink?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "nomeris",
    name: "Nomeris",
    tagline:
      "PDV desktop para distribuidoras de bebidas: vendas, caixa e estoque com dados locais e operação offline durante a validade da licença.",
    category: "Produto desktop",
    status: "Em produção · Windows · operação local",
    problem:
      "Distribuidoras precisam atender rápido no balcão sem perder o controle de estoque, caixa e pós-venda — inclusive quando a conexão cai.",
    solution:
      "Aplicativo desktop com código de barras, pagamentos mistos, estoque por embalagem, devoluções, trocas, relatórios, auditoria e backup local. A operação offline exige licença assinada válida e é bloqueada quando ela expira; a renovação requer conexão.",
    architecture: [
      "Electron dividido em Main, preload e renderer isolado",
      "IPC com allowlist, validação Zod e RBAC no processo Main",
      "MongoDB local com transações e replica set embutido",
      "Atualização, backup e restauração integrados ao aplicativo",
    ],
    result: [
      { value: "Local", label: "Dados e backup no dispositivo" },
      { value: "Commit", label: "Dinheiro e estoque consistentes" },
    ],
    stack: ["Electron", "React", "TypeScript", "MongoDB", "Zod", "Playwright"],
    hero: {
      src: nomerisPdvWebp,
      alt: "Frente de caixa do Nomeris com três produtos no carrinho e total pronto para receber",
      width: 1708,
      height: 960,
      caption: "Frente de caixa para teclado, leitor de código de barras e atendimento no balcão.",
    },
    ogImage: nomerisPdvPng,
    gallery: [
      {
        src: nomerisProdutosWebp,
        alt: "Catálogo de produtos do Nomeris com embalagens, códigos de barras, preços e estoque",
        width: 1708,
        height: 960,
        caption: "Catálogo com múltiplas embalagens e estoque em unidade base.",
      },
      {
        src: nomerisCaixaWebp,
        alt: "Controle de caixa do Nomeris com abertura, sangria, suprimento e conferência",
        width: 1708,
        height: 960,
        caption: "Caixa auditável do valor inicial ao fechamento.",
      },
      {
        src: nomerisVisaoGerencialWebp,
        alt: "Visão gerencial do Nomeris com entradas, saídas, saldo e ranking de produtos",
        width: 1708,
        height: 960,
        caption: "Indicadores do período e desempenho dos produtos em uma tela gerencial.",
      },
    ],
    highlights: [
      {
        label: "01 // Balcão",
        title: "Venda sem atrito",
        description:
          "Leitor de código de barras, busca rápida, atalhos, pagamentos mistos, troco e suspensão de venda.",
      },
      {
        label: "02 // Consistência",
        title: "Dinheiro e estoque transacionais",
        description: "Checkout, cancelamento, devolução e troca só respondem depois do commit no banco.",
      },
      {
        label: "03 // Segurança",
        title: "Permissão no lugar certo",
        description:
          "Renderer isolado, canais IPC permitidos explicitamente e RBAC validado no processo privilegiado.",
      },
      {
        label: "04 // Continuidade",
        title: "Operação local de verdade",
        description:
          "Banco, backup e restauração locais. Sem internet enquanto a licença assinada estiver válida; a expiração bloqueia a operação até a renovação online.",
      },
    ],
    externalLink: {
      label: "Ver download e instruções",
      href: NOMERIS_RELEASE_README_URL,
    },
  },
  {
    slug: "billsmap",
    name: "BillsMap",
    tagline: "Scanner de portas assíncrono em Python.",
    category: "Redes & Python",
    problem:
      "Entender na prática como o Nmap funciona por baixo dos panos e otimizar varreduras em redes corporativas.",
    solution:
      "Implementação de um scanner utilizando chamadas assíncronas em Python para concorrência eficiente.",
    architecture: ["Python Asyncio", "Sockets API", "Processamento assíncrono"],
    result: [],
    stack: ["Python", "Asyncio", "Networking"],
  },
  {
    slug: "mini-crm",
    name: "Mini-CRM",
    tagline: "Integração de APIs externas para controle de CRM via Google Sheets.",
    category: "Automação",
    problem:
      "Controlar leads e fluxo de CRM utilizando ferramentas de uso comum e acessíveis para o time comercial.",
    solution: "Integração do Google Sheets via API para atuar como banco de dados ágil de um mini-CRM.",
    architecture: ["Python scripts", "Google Sheets API", "Integrações"],
    result: [],
    stack: ["Python", "APIs Rest", "Google Cloud"],
  },
  {
    slug: "landing-page-react",
    name: "Landing Page React",
    tagline: "Consolidação de conhecimentos em React.",
    category: "Front-end",
    problem: "Construir uma interface web rápida, moderna e responsiva focada em conversão.",
    solution: "Criação de landing page moderna em React utilizando os melhores padrões de componentização.",
    architecture: ["Componentes React", "Design Responsivo"],
    result: [],
    stack: ["React", "HTML", "CSS"],
  },
  {
    slug: "linktree-01",
    name: "Projeto LinkTree 0.1",
    tagline: "Página agregadora de links otimizada.",
    category: "Front-end",
    problem: "Centralizar links de redes sociais em uma interface limpa e leve.",
    solution: "Desenvolvimento de frontend focado em performance com HTML e CSS puros.",
    architecture: ["Página estática", "Mobile-first"],
    result: [],
    stack: ["HTML", "CSS"],
  },
  {
    slug: "vision-pro",
    name: "Vision Pro",
    tagline: "Sistema empresarial para gestão e monitoramento.",
    category: "Sistemas Empresariais",
    problem:
      "Empresas necessitavam de uma ferramenta robusta e escalável para gerenciar dados corporativos em tempo real.",
    solution:
      "Desenvolvimento de uma plataforma completa com processamento backend em Python e FastAPI, aliada a um frontend moderno.",
    architecture: ["APIs Restful", "PostgreSQL", "React", "Docker"],
    result: [],
    stack: ["Python", "FastAPI", "PostgreSQL", "React"],
  },
];
