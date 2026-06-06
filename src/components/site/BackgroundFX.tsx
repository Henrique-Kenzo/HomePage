export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute -top-[20%] -left-[10%] h-[60vh] w-[60vh] glow-blue opacity-25" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[60vh] w-[60vh] glow-purple opacity-20" />
      <div className="absolute inset-0">
        <div className="h-[220px] w-full bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent animate-scanline" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#050505_85%)]" />
    </div>
  );
}
