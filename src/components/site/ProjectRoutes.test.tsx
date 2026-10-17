import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { getRouter } from "@/router";
import { NOMERIS_RELEASE_README_URL } from "@/content/projects";

// Vitest stubs CSS to an empty string; keep the shell's stylesheet URL valid.
vi.mock("@/styles.css?url", () => ({ default: "/test-styles.css" }));

async function renderPage(path: string) {
  const router = getRouter();
  router.update({ ...router.options, history: createMemoryHistory({ initialEntries: [path] }) });
  await router.load();
  return { html: renderToStaticMarkup(<RouterProvider router={router} />), router };
}

describe("project detail integration", () => {
  it("lists Nomeris first with a working case-study link", async () => {
    const { html } = await renderPage("/projetos");
    expect(html).toContain('href="/projetos/nomeris"');
    expect(html.match(/<h2[^>]*>(.*?)<\/h2>/)?.[1]).toBe("Nomeris");
    expect(html.indexOf('href="/projetos/nomeris"')).toBeLessThan(
      html.indexOf('href="/projetos/minhafabrica"'),
    );
    expect(html).toContain("Dinheiro e estoque consistentes");
  });
  it("features Nomeris first on the home without implying production availability", async () => {
    const { html } = await renderPage("/");
    const cards = html.match(/<article[\s\S]*?<\/article>/g) ?? [];
    const systems = cards.filter((card) => /Nomeris|MinhaFabrica|Vision Pro/.test(card));
    expect(systems).toHaveLength(3);
    expect(systems[0]).toContain("Nomeris");
    expect(systems[0]).toContain("PRÉ-LANÇAMENTO");
    expect(systems[0]).not.toContain("LIVE");
    expect(systems[0]).toContain(`href="${NOMERIS_RELEASE_README_URL}"`);
    expect(systems[0]).toContain('rel="noopener noreferrer"');
    expect(systems[0]).toContain('href="/projetos/nomeris"');
    expect(systems[0]).toContain("licença válida");
    expect(html).not.toContain("Sistemas rodando agora, com usuário de verdade.");
  });

  it("retains the MinhaFabrica media and metadata on the detail route", async () => {
    const { html } = await renderPage("/projetos/minhafabrica");
    expect(html).toContain("minhafabrica-dashboard.webp");
    expect(html).toContain("minhafabrica-dashboard.png");
    expect(html.match(/<figure/g)).toHaveLength(1);
    expect(html).not.toContain("downloadUrl");
  });

  it("keeps a media-free case study usable", async () => {
    const { html } = await renderPage("/projetos/billsmap");
    expect(html).toContain("BillsMap");
    expect(html).toContain("01 // Problema");
    expect(html).not.toContain("<figure");
    expect(html).not.toContain("downloadUrl");
  });
  it("renders Nomeris rich sections once with generic case study content and metadata", async () => {
    const { html, router } = await renderPage("/projetos/nomeris");
    expect(html).toContain("Frente de caixa do Nomeris");
    expect(html.match(/<figure/g)).toHaveLength(4);
    expect(html.match(new RegExp(`href="${NOMERIS_RELEASE_README_URL}"`, "g"))).toHaveLength(2);
    expect(html.match(/01 \/\/ Problema/g)).toHaveLength(1);
    expect(html.indexOf("Galeria do projeto")).toBeLessThan(html.indexOf("01 // Problema"));
    const match = router.state.matches.at(-1)!;
    expect(JSON.stringify(match.meta)).toContain("nomeris-pdv.png");
    expect(JSON.stringify(match.links)).toContain("/projetos/nomeris");
    expect(html).toContain(`"downloadUrl":"${NOMERIS_RELEASE_README_URL}"`);
  });
});
