export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} Henrique Kenzo Silvatte // All systems operational
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
          LAT -23.5505 · LONG -46.6333
        </div>
      </div>
    </footer>
  );
}
