import { Link } from "@tanstack/react-router";

const links = [
  { to: "/sobre", label: "Sobre" },
  { to: "/construo", label: "Construo" },
  { to: "/projetos", label: "Projetos" },
  { to: "/laboratorio", label: "Laboratório" },
  { to: "/stack", label: "Stack" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-2 bg-primary shadow-[0_0_12px_#3b82f6] animate-pulse-soft" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/90 group-hover:text-primary transition-colors">
            Kenzo.Systems <span className="text-muted">// v3.0</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contato"
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors"
        >
          Contato →
        </Link>
      </div>
    </header>
  );
}
