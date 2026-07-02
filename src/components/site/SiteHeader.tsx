import { Link } from "@tanstack/react-router";

const links = [
  { to: "/sobre", label: "./sobre" },
  { to: "/construo", label: "./construo" },
  { to: "/projetos", label: "./projetos" },
  { to: "/laboratorio", label: "./lab" },
  { to: "/stack", label: "./stack" },
  { to: "/roadmap", label: "./roadmap" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-mono text-[15px] font-bold text-foreground no-underline"
          aria-label="kenzo.dev — página inicial"
        >
          kenzo<span className="text-primary">.dev</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-[11px] tracking-[0.18em] text-foreground/60 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contato"
          className="bg-primary px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
        >
          iniciar_conexao()
        </Link>
      </div>
    </header>
  );
}
