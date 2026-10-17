import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("sitemap", () => {
  it("indexes the Nomeris case study once and dates the updated catalog", async () => {
    const sitemap = await readFile("public/sitemap.xml", "utf8");
    expect(sitemap.match(/<loc>https:\/\/henriquekenzo.space\/projetos\/nomeris<\/loc>/g)).toHaveLength(1);
    expect(sitemap).toMatch(
      /<loc>https:\/\/henriquekenzo.space\/projetos<\/loc>\s*<lastmod>2026-10-17<\/lastmod>/,
    );
    expect(sitemap).toMatch(
      /<loc>https:\/\/henriquekenzo.space\/projetos\/nomeris<\/loc>\s*<lastmod>2026-10-17<\/lastmod>/,
    );
  });
});
