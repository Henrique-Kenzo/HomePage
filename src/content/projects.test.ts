import { describe, expect, it } from "vitest";
import { NOMERIS_RELEASE_README_URL, projects } from "./projects";

describe("Nomeris project contract", () => {
  it("publishes Nomeris first with rich media and the exact release README", () => {
    const nomeris = projects.find((project) => project.slug === "nomeris");
    expect(nomeris).toBeDefined();
    expect(projects[0]?.slug).toBe("nomeris");
    expect(nomeris?.externalLink).toEqual({
      label: "Ver download e instruções",
      href: NOMERIS_RELEASE_README_URL,
    });
    expect(NOMERIS_RELEASE_README_URL).toBe(
      "https://github.com/Henrique-Kenzo/Nomeris-Releases/blob/main/README.md",
    );
    expect(nomeris?.hero).toMatchObject({ width: 1708, height: 960 });
    expect(nomeris?.gallery).toHaveLength(3);
    expect(nomeris?.highlights).toHaveLength(4);
    expect(nomeris?.result).toContainEqual({ value: "Commit", label: "Dinheiro e estoque consistentes" });
    expect(nomeris?.status).toContain("Pré-lançamento");
    expect(nomeris?.solution).toContain("licença");
    expect(nomeris?.solution).toContain("fiscal");
  });
});
