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
};

export const projects: Project[] = [
  {
    slug: "minhafabrica",
    name: "MinhaFabrica - Desafio Técnico",
    tagline: "Plataforma administrativa fullstack com autenticação JWT e gestão (CRUD) de Usuários e Produtos.",
    category: "Full-Stack Web",
    problem: "Desenvolver uma solução completa e funcional para um processo seletivo, demonstrando habilidades E2E.",
    solution: "Criação de um painel administrativo com separação de responsabilidades (backend/frontend), TypeScript para tipagem segura, e autenticação robusta.",
    architecture: ["Front/back separados", "Camadas controllers/services/models", "MongoDB", "Node.js API", "Next.js Interface"],
    result: [
      { value: "Online", label: "Hospedado na Vercel" },
      { value: "Full-Stack", label: "Sistema E2E" },
    ],
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "JWT", "TypeScript"],
  },
  {
    slug: "billsmap",
    name: "BillsMap",
    tagline: "Scanner de portas assíncrono em Python.",
    category: "Redes & Python",
    problem: "Entender na prática como o Nmap funciona por baixo dos panos e otimizar varreduras em redes corporativas.",
    solution: "Implementação de um scanner utilizando chamadas assíncronas em Python para concorrência eficiente.",
    architecture: ["Python Asyncio", "Sockets API", "Processamento assíncrono"],
    result: [],
    stack: ["Python", "Asyncio", "Networking"],
  },
  {
    slug: "mini-crm",
    name: "Mini-CRM",
    tagline: "Integração de APIs externas para controle de CRM via Google Sheets.",
    category: "Automação",
    problem: "Controlar leads e fluxo de CRM utilizando ferramentas de uso comum e acessíveis para o time comercial.",
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
    problem: "Empresas necessitavam de uma ferramenta robusta e escalável para gerenciar dados corporativos em tempo real.",
    solution: "Desenvolvimento de uma plataforma completa com processamento backend em Python e FastAPI, aliada a um frontend moderno.",
    architecture: ["APIs Restful", "PostgreSQL", "React", "Docker"],
    result: [],
    stack: ["Python", "FastAPI", "PostgreSQL", "React"],
  },
];
