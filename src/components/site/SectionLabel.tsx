import type { ReactNode } from "react";

export function SectionLabel({
  children,
  accent = "primary",
}: {
  children: ReactNode;
  accent?: "primary" | "accent";
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`size-1.5 ${accent === "primary" ? "bg-primary" : "bg-accent"}`} />
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}
