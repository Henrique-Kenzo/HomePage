import { FxNeural } from "@/components/site/FxNeural";

/* Mesmo fundo da homepage: rede sináptica interativa + vinheta radial */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <FxNeural />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_30%,rgba(7,9,7,0.55)_100%)]" />
    </div>
  );
}
