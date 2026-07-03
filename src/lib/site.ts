/**
 * URL canônica do site (domínio próprio, apontado para a Vercel).
 * Pode ser sobrescrita com VITE_SITE_URL; se mudar, atualize também
 * public/robots.txt e public/sitemap.xml.
 */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://henriquekenzo.space"
).replace(/\/$/, "");

export const SITE_NAME = "kenzo.dev";

export const PERSON = {
  name: "Henrique Kenzo Silvatte",
  alternateName: ["Henrique Kenzo", "Kenzo", "kenzo.dev", "Kenzo Dev"],
  jobTitle: "Engenheiro de Software Full-Stack",
  email: "henrique.silvatte2@gmail.com",
  city: "Londrina",
  region: "PR",
  country: "BR",
  github: "https://github.com/Henrique-Kenzo",
  linkedin: "https://linkedin.com/in/henrique-kenzo-silvatte-33466220b",
  knowsAbout: [
    "Desenvolvimento de software",
    "Sistemas web full-stack",
    "Node.js",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Inteligência Artificial",
    "Visão Computacional",
    "Machine Learning",
    "ERP industrial",
    "Automação de processos",
    "Integração de sistemas e APIs",
    "PostgreSQL",
    "MongoDB",
    "Docker",
  ],
} as const;

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Imagem OG padrão do site (1200×630, gerada por scripts/og-cover.mjs). */
export const OG_COVER = "/og-cover.jpg";

/** Gera meta + canonical padronizados para o head() de cada rota. */
export function seo({
  title,
  description,
  path,
  image = OG_COVER,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt = "Henrique Kenzo — desenvolvedor de software full-stack (kenzo.dev)",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
}) {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: String(imageWidth) },
      { property: "og:image:height", content: String(imageHeight) },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    alternateName: [...PERSON.alternateName],
    jobTitle: PERSON.jobTitle,
    email: `mailto:${PERSON.email}`,
    url: SITE_URL,
    image: absoluteUrl(OG_COVER),
    sameAs: [PERSON.github, PERSON.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.city,
      addressRegion: PERSON.region,
      addressCountry: PERSON.country,
    },
    knowsAbout: [...PERSON.knowsAbout],
    description:
      "Desenvolvedor de software full-stack especializado em sistemas web, ERPs industriais, automação, integrações e pipelines de IA com visão computacional. Node.js, Python, TypeScript e React.",
  };
}

/** Trilha de navegação (rich results + entendimento da hierarquia do site). */
export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ["Henrique Kenzo", "Henrique Kenzo Silvatte — Portfólio"],
    url: SITE_URL,
    inLanguage: "pt-BR",
    author: { "@id": `${SITE_URL}/#person` },
    description:
      "Portfólio de Henrique Kenzo Silvatte — engenharia de software full-stack, sistemas, IA e automação.",
  };
}
