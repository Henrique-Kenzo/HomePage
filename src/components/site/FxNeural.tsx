import { useEffect, useRef } from "react";

/* Rede sináptica: nós, conexões, atração ao mouse e pulso propagante no clique */
export function FxNeural({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const c = document.createElement("canvas");
    c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    host.appendChild(c);
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 1;
    let h = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      w = Math.max(host.clientWidth, 1);
      h = Math.max(host.clientHeight, 1);
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const N = 118;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.024,
      vy: (Math.random() - 0.5) * 0.024,
      r: 1.2 + Math.random() * 1.8,
      f: 0,
    }));
    let pulses: { x: number; y: number; r: number; a: number }[] = [];
    let mx = -1e4;
    let my = -1e4;
    const A = "182,243,74";

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.width < 1) return;
      mx = ((e.clientX - r.left) / r.width) * w;
      my = ((e.clientY - r.top) / r.height) * h;
      if (mx < -60 || my < -60 || mx > w + 60 || my > h + 60) {
        mx = -1e4;
        my = -1e4;
      }
    };
    const onDown = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * w;
      const y = ((e.clientY - r.top) / r.height) * h;
      if (x < 0 || y < 0 || x > w || y > h) return;
      pulses.push({ x, y, r: 0, a: 1 });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);

    let vis = true;
    const io = new IntersectionObserver((en) => {
      vis = en[0].isIntersecting;
    });
    io.observe(host);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let last = 0;
    let raf = 0;
    const loop = (t: number) => {
      if (!reducedMotion) raf = requestAnimationFrame(loop);
      if (!vis && !reducedMotion) return;
      const dt = Math.min((t - last) / 1000, 0.05) || 0.016;
      last = t;
      ctx.clearRect(0, 0, w, h);
      const LINK = 140;
      const ML = 210;

      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.x = Math.max(0, Math.min(1, n.x));
        n.y = Math.max(0, Math.min(1, n.y));
        const px = n.x * w;
        const py = n.y * h;
        const dm = Math.hypot(mx - px, my - py);
        if (dm < ML) {
          n.vx += ((mx - px) / w) * dt * 0.6;
          n.vy += ((my - py) / h) * dt * 0.6;
        }
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 0.055) {
          n.vx *= 0.055 / sp;
          n.vy *= 0.055 / sp;
        }
        n.f = Math.max(0, n.f - dt * 1.6);
      }

      pulses = pulses.filter((p) => p.a > 0);
      for (const p of pulses) {
        p.r += 440 * dt;
        p.a -= dt * 0.85;
        for (const n of nodes) {
          const d = Math.hypot(n.x * w - p.x, n.y * h - p.y);
          if (Math.abs(d - p.r) < 26) n.f = Math.min(1, n.f + 0.9);
        }
        ctx.strokeStyle = `rgba(${A},${(p.a * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${A},${(p.a * 0.18).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.7, 0, 6.283);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        const ax = a.x * w;
        const ay = a.y * h;
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const bx = b.x * w;
          const by = b.y * h;
          const dx = ax - bx;
          const dy = ay - by;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const al = (1 - d / LINK) * (0.15 + 0.55 * Math.max(a.f, b.f));
          ctx.strokeStyle = `rgba(${A},${al.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
        const dm = Math.hypot(ax - mx, ay - my);
        if (dm < ML) {
          const al = (1 - dm / ML) * 0.55;
          ctx.strokeStyle = `rgba(${A},${al.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const px = n.x * w;
        const py = n.y * h;
        const rr = n.r + n.f * 2.5;
        if (n.f > 0.02) {
          ctx.fillStyle = `rgba(${A},${(n.f * 0.25).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, rr * 4, 0, 6.283);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${n.f > 0.4 ? "230,255,190" : A},${(0.45 + 0.55 * n.f).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, rr, 0, 6.283);
        ctx.fill();
      }

      if (mx > -100) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        g.addColorStop(0, `rgba(${A},0.10)`);
        g.addColorStop(1, `rgba(${A},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mx - 90, my - 90, 180, 180);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      host.removeChild(c);
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={className} style={{ position: "absolute", inset: 0 }} />;
}
