import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/sobre", label: "sobre" },
  { to: "/construo", label: "construo" },
  { to: "/projetos", label: "projetos" },
  { to: "/laboratorio", label: "laboratório" },
  { to: "/stack", label: "stack" },
  { to: "/roadmap", label: "roadmap" },
  { to: "/contato", label: "contato" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6">
        <nav aria-label="Mapa do site" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footerLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-[10px] tracking-[0.2em] text-foreground/45 transition-colors hover:text-primary"
            >
              ./{l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/45">
            © {new Date().getFullYear()} kenzo.dev — Henrique Kenzo Silvatte
          </span>
          <span className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-foreground/45">
            <span className="animate-blinkdot size-1.5 rounded-full bg-primary" />
            LAT -23.3103 · LON -51.1628 · Londrina-PR
          </span>
        </div>
      </div>
    </footer>
  );
}
