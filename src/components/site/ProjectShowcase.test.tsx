import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { projects, NOMERIS_RELEASE_README_URL } from "@/content/projects";
import { ProjectShowcase } from "./ProjectShowcase";

describe("ProjectShowcase", () => {
  it("renders real media, highlights and a safe release README CTA", () => {
    const project = projects.find((item) => item.slug === "nomeris")!;
    const html = renderToStaticMarkup(<ProjectShowcase project={project} />);
    expect(html).toContain(`href="${NOMERIS_RELEASE_README_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("Venda sem atrito");
    expect(html).toContain("Operação local de verdade");
    expect(html).toContain("Frente de caixa do Nomeris");
    expect(html.match(/<figure/g)).toHaveLength(4);
    expect(html.match(/loading="lazy"/g)).toHaveLength(3);
    expect(html.match(/loading="eager"/g)).toHaveLength(1);
    expect(html).toMatch(/class="grid gap-6 lg:grid-cols-2"><div><div/);
    expect(html).toMatch(/<div class="lg:col-span-2"><div[^>]*><figure/);
    expect(html.indexOf("Venda sem atrito")).toBeLessThan(html.indexOf("Catálogo de produtos"));
  });

  it("preserves the MinhaFabrica screenshot through the generic model", () => {
    const project = projects.find((item) => item.slug === "minhafabrica")!;
    const html = renderToStaticMarkup(<ProjectShowcase project={project} />);
    expect(html).toContain("minhafabrica-dashboard.webp");
    expect(html).toContain('width="1440" height="900"');
    expect(html).toContain("minhafabrica.com · online · vercel");
    expect(html.match(/<figure/g)).toHaveLength(1);
    expect(html).not.toContain("Release oficial");
    expect(html).not.toContain("Galeria do projeto");
  });

  it("does not invent rich sections for older projects without media", () => {
    for (const project of projects.filter((item) => !["nomeris", "minhafabrica"].includes(item.slug))) {
      expect(renderToStaticMarkup(<ProjectShowcase project={project} />)).toBe("");
    }
  });

  it("omits empty optional galleries and highlights", () => {
    const project = { ...projects.find((item) => item.slug === "billsmap")!, gallery: [], highlights: [] };
    expect(renderToStaticMarkup(<ProjectShowcase project={project} />)).toBe("");
  });
});
