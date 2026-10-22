import { useEffect, useRef } from "react";

/* Campo de partículas 3D da home + cursor, botões magnéticos e faixa cinética.
   Cada seção da página tem uma forma; o scroll faz o morph entre elas. */

export const ACCENT = "#8CC7A1";
export const SEED = 427;
export const PARTICLES = 2600;
export const SHAPE_NAMES = ["superfície", "toro", "treliça", "esfera", "hélice", "galáxia"];
export const SECTION_IDS = ["topo", "sobre", "servicos", "projetos", "processo", "contato"];

export type FieldState = { prog: number; active: string; shape: number };

export function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Contornos concêntricos deformados — a "arte" de cada projeto. Determinístico (SSR == cliente). */
export function glyph(freq: number, phase: number, seed: number) {
  const r = rng(seed);
  const out: { d: string; o: string; c: string }[] = [];
  const K = 13,
    cx = 180,
    cy = 112;
  const warp = 0.05 + r() * 0.05;
  for (let k = 1; k <= K; k++) {
    const rad = 6 + k * 7.2;
    let d = "";
    for (let s = 0; s <= 140; s++) {
      const th = (s / 140) * Math.PI * 2;
      const m =
        1 +
        (warp + k * 0.004) * Math.sin(freq * th + phase + k * 0.42) +
        0.03 * Math.cos((freq + 2) * th - k * 0.3);
      d +=
        (s ? " L " : "M ") +
        (cx + Math.cos(th) * rad * m * 1.35).toFixed(1) +
        " " +
        (cy + Math.sin(th) * rad * m * 0.82).toFixed(1);
    }
    out.push({ d: d + " Z", o: (0.12 + (0.6 * k) / K).toFixed(2), c: k === 9 ? ACCENT : "#E8EAE6" });
  }
  return out;
}

// cx, cy (fração da tela), escala (fração do menor lado), alpha — uma linha por seção
const LAYOUT = [
  [0.68, 0.53, 0.4, 1.0],
  [0.24, 0.56, 0.36, 0.95],
  [0.82, 0.5, 0.4, 0.45],
  [0.85, 0.45, 0.36, 0.4],
  [0.5, 0.42, 0.42, 0.55],
  [0.72, 0.52, 0.4, 0.85],
];

export function HomeField({ onChange }: { onChange: (s: FieldState) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d");
    const cur = curRef.current!;
    const dot = dotRef.current!;
    const kin = document.getElementById("hk-kin");
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".hk-magnet"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = { x: 0, y: 0, sx: 0, sy: 0, cx: -9999, cy: -9999, rx: -9999, ry: -9999, on: false };
    let k = 0,
      kS = 0,
      t = 0,
      scrollY = 0,
      W = 0,
      H = 0,
      kinW = 0,
      N = 0;
    let P = new Float32Array(0),
      O = P,
      R = P,
      S = P;
    let last: FieldState | null = null;

    // formas: 0 superfície · 1 toro · 2 treliça · 3 esfera · 4 hélice · 5 galáxia
    const shape = (id: number, i: number, t: number, out: number[]) => {
      const q = R[i],
        TAU = Math.PI * 2;
      if (id === 0) {
        const C = 70,
          rowsN = Math.ceil(N / C);
        const x = -1.35 + (2.7 * (i % C)) / (C - 1),
          y = -1 + (2 * Math.floor(i / C)) / Math.max(1, rowsN - 1);
        const z =
          0.26 * Math.sin(2.6 * x + 0.8 + t * 0.5) * Math.cos(2.1 * y - 0.4 - t * 0.35) +
          0.42 * Math.exp(-((x - 0.2) ** 2 + (y + 0.15) ** 2) * 3.2) +
          0.05 * Math.sin(5 * x + 4 * y - t * 1.6);
        out[0] = x;
        out[1] = -z * 0.95 + 0.15;
        out[2] = y * 0.9;
      } else if (id === 1) {
        const U = Math.round(Math.sqrt(N * 2.6)),
          V = Math.ceil(N / U);
        const u = ((i % U) / U) * TAU + t * 0.15,
          v = (Math.floor(i / U) / V) * TAU;
        const Rr = 0.82,
          r = 0.34 + 0.03 * Math.sin(3 * u + t);
        const X = (Rr + r * Math.cos(v)) * Math.cos(u),
          Y = r * Math.sin(v),
          Z = (Rr + r * Math.cos(v)) * Math.sin(u);
        const ca = Math.cos(0.9),
          sa = Math.sin(0.9);
        out[0] = X;
        out[1] = Y * ca - Z * sa;
        out[2] = Y * sa + Z * ca;
      } else if (id === 2) {
        const g = Math.round(Math.cbrt(N)),
          gi = i % (g * g * g);
        const ix = gi % g,
          iy = Math.floor(gi / g) % g,
          iz = Math.floor(gi / (g * g));
        const s = 1.5 / (g - 1);
        const x = -0.75 + ix * s,
          y = -0.75 + iy * s,
          z = -0.75 + iz * s;
        const w = 1 + 0.08 * Math.sin(t * 1.4 - (Math.abs(x) + Math.abs(y) + Math.abs(z)) * 3);
        out[0] = x * w;
        out[1] = y * w;
        out[2] = z * w;
      } else if (id === 3) {
        const kk = i + 0.5,
          phi = Math.acos(1 - (2 * kk) / N),
          th = Math.PI * (1 + Math.sqrt(5)) * kk;
        const r = 0.95 + 0.07 * Math.sin(phi * 6 + t * 1.2) * Math.cos(th * 0.5);
        out[0] = r * Math.sin(phi) * Math.cos(th);
        out[1] = r * Math.cos(phi);
        out[2] = r * Math.sin(phi) * Math.sin(th);
      } else if (id === 4) {
        const s = i / N,
          kind = i % 4;
        const x = (s * 2 - 1) * 1.7,
          a = s * 16 * Math.PI + t * 0.7;
        const ay = Math.cos(a) * 0.42,
          az = Math.sin(a) * 0.42;
        if (kind === 0 || kind === 2) {
          out[0] = x;
          out[1] = kind ? -ay : ay;
          out[2] = kind ? -az : az;
        } else {
          const mm = q * 2 - 1;
          out[0] = x;
          out[1] = ay * mm;
          out[2] = az * mm;
        }
      } else {
        const arm = i % 3,
          rr = Math.sqrt(q) * 1.15;
        const th = rr * 5.2 + (arm * TAU) / 3 + t * 0.25 + (R[(i * 7) % N] - 0.5) * 0.5;
        out[0] = Math.cos(th) * rr;
        out[2] = Math.sin(th) * rr;
        out[1] = (R[(i * 13) % N] - 0.5) * 0.12 * (1.2 - rr);
      }
    };

    const allocate = () => {
      N = Math.round(PARTICLES * (window.innerWidth < 760 ? 0.5 : 1));
      P = new Float32Array(N * 3);
      O = new Float32Array(N * 2);
      R = new Float32Array(N);
      S = new Float32Array(N * 2);
      const r = rng(SEED + 1);
      for (let i = 0; i < N; i++) R[i] = r();
      const tmp = [0, 0, 0];
      for (let i = 0; i < N; i++) {
        shape(0, i, 0, tmp);
        P[i * 3] = tmp[0] * 3;
        P[i * 3 + 1] = tmp[1] * 3;
        P[i * 3 + 2] = tmp[2] * 3;
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      kinW = kin ? kin.scrollWidth / 2 : 0;
      if (N !== Math.round(PARTICLES * (W < 760 ? 0.5 : 1))) allocate();
    };

    // seção ativa, progresso e posição contínua (k) entre as formas
    const measure = () => {
      const se = document.scrollingElement || document.documentElement;
      scrollY = window.scrollY || se.scrollTop || 0;
      const max = se.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const mid = window.innerHeight * 0.5;
      let active = "topo",
        kk = 0;
      const rects = SECTION_IDS.map((id) => document.getElementById(id)?.getBoundingClientRect() ?? null);
      rects.forEach((r, i) => {
        if (r && r.top < window.innerHeight * 0.45) active = SECTION_IDS[i];
      });
      for (let i = 0; i < rects.length; i++) {
        const r = rects[i],
          n = rects[i + 1];
        if (!r) continue;
        const bottom = n ? n.top : r.bottom;
        if (mid >= r.top && mid < bottom) {
          const local = (mid - r.top) / Math.max(1, bottom - r.top);
          const f = Math.min(1, Math.max(0, (local - 0.6) / 0.4));
          kk = i + (n ? f * f * (3 - 2 * f) : 0);
          break;
        }
        if (i === rects.length - 1 && mid >= bottom) kk = i;
      }
      if (rects[0] && mid < rects[0].top) kk = 0;
      if (p > 0.985) {
        active = "contato";
        kk = 5;
      }
      k = kk;
      const next = { prog: Math.round(p * 100), active, shape: Math.round(kk) };
      if (!last || last.prog !== next.prog || last.active !== next.active || last.shape !== next.shape) {
        last = next;
        onChangeRef.current(next);
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const a = Math.floor(kS),
        b = Math.min(5, a + 1),
        f = kS - a;
      const L = LAYOUT[a].map((v, j) => v + (LAYOUT[b][j] - v) * f);
      if (W < 900) {
        L[0] = 0.5;
        L[1] = 0.45;
        L[3] *= 0.4;
      }
      const [lcx, lcy, lsc, la] = L;
      const cx = W * lcx,
        cy = H * lcy,
        sc = Math.min(W, H) * lsc;
      const ry = t * 0.16 + m.sx * 0.55,
        rx = 0.32 + m.sy * 0.3;
      const cY = Math.cos(ry),
        sY = Math.sin(ry),
        cX = Math.cos(rx),
        sX = Math.sin(rx);
      const A = [0, 0, 0],
        B = [0, 0, 0];
      const mx = m.on ? m.cx : -9999,
        my = m.on ? m.cy : -9999,
        RAD = 110;
      const buckets: number[][] = [[], [], [], []];
      for (let i = 0; i < N; i++) {
        shape(a, i, t, A);
        let tx = A[0],
          ty = A[1],
          tz = A[2];
        if (f > 0.0005) {
          shape(b, i, t, B);
          const x = Math.min(1, Math.max(0, f * 1.5 - R[i] * 0.5));
          const g = x * x * (3 - 2 * x);
          tx += (B[0] - tx) * g;
          ty += (B[1] - ty) * g;
          tz += (B[2] - tz) * g;
        }
        const j = i * 3;
        P[j] += (tx - P[j]) * 0.14;
        P[j + 1] += (ty - P[j + 1]) * 0.14;
        P[j + 2] += (tz - P[j + 2]) * 0.14;
        const x = P[j] * cY + P[j + 2] * sY,
          z = -P[j] * sY + P[j + 2] * cY,
          y = P[j + 1];
        const y2 = y * cX - z * sX,
          z2 = y * sX + z * cX;
        const per = 3.2 / (3.2 + z2);
        let px = cx + x * sc * per,
          py = cy + y2 * sc * per;
        // repulsão do cursor
        const o = i * 2,
          dx = px + O[o] - mx,
          dy = py + O[o + 1] - my,
          d2 = dx * dx + dy * dy;
        if (d2 < RAD * RAD) {
          const d = Math.sqrt(d2) || 1,
            push = (1 - d / RAD) * 9;
          O[o] += (dx / d) * push;
          O[o + 1] += (dy / d) * push;
        }
        O[o] *= 0.9;
        O[o + 1] *= 0.9;
        px += O[o];
        py += O[o + 1];
        S[o] = px;
        S[o + 1] = py;
        const depth = Math.min(1, Math.max(0, (1.3 - z2) / 2.6));
        const alpha = la * (0.12 + 0.88 * depth * depth);
        const bi = i % 9 === 0 ? 3 : alpha > 0.55 ? 2 : alpha > 0.28 ? 1 : 0;
        buckets[bi].push(px, py, per);
      }
      // conexões entre partículas de destaque
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = ACCENT;
      ctx.globalAlpha = 0.16 * la;
      ctx.beginPath();
      for (let i = 0; i + 9 < N; i += 9) {
        const o = i * 2,
          p = (i + 9) * 2,
          dx = S[o] - S[p],
          dy = S[o + 1] - S[p + 1];
        if (dx * dx + dy * dy < 2600) {
          ctx.moveTo(S[o], S[o + 1]);
          ctx.lineTo(S[p], S[p + 1]);
        }
      }
      ctx.stroke();
      const al = [0.2, 0.42, 0.85, 1];
      for (let bi = 0; bi < 4; bi++) {
        const arr = buckets[bi];
        ctx.fillStyle = bi === 3 ? ACCENT : "#E8EAE6";
        ctx.globalAlpha = al[bi] * (bi === 3 ? la : la * 0.95);
        for (let n = 0; n < arr.length; n += 3) {
          const s = (bi === 3 ? 2.2 : 1.5) * arr[n + 2];
          ctx.fillRect(arr[n] - s / 2, arr[n + 1] - s / 2, s, s);
        }
      }
      if (m.on) {
        ctx.globalAlpha = 0.12;
        ctx.strokeStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(m.rx, m.ry, RAD, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      m.sx += (m.x - m.sx) * 0.05;
      m.sy += (m.y - m.sy) * 0.05;
      m.rx += (m.cx - m.rx) * 0.18;
      m.ry += (m.cy - m.ry) * 0.18;
      cur.style.transform = `translate3d(${m.rx.toFixed(1)}px,${m.ry.toFixed(1)}px,0)`;
      dot.style.transform = `translate3d(${m.cx}px,${m.cy}px,0)`;
      for (const el of reduce ? [] : magnets) {
        const r = el.getBoundingClientRect(),
          dx = m.cx - (r.left + r.width / 2),
          dy = m.cy - (r.top + r.height / 2),
          d = Math.hypot(dx, dy);
        const pull = d < 140 ? 1 - d / 140 : 0;
        el.style.transform = pull
          ? `translate(${(dx * 0.28 * pull).toFixed(1)}px,${(dy * 0.38 * pull).toFixed(1)}px)`
          : "";
      }
      if (kin && kinW && !reduce) kin.style.transform = `translate3d(${-((scrollY * 0.45) % kinW)}px,0,0)`;
      kS += (k - kS) * (reduce ? 1 : 0.07);
      draw();
    };

    const onMove = (e: MouseEvent) => {
      m.x = (e.clientX / window.innerWidth) * 2 - 1;
      m.y = (e.clientY / window.innerHeight) * 2 - 1;
      m.cx = e.clientX;
      m.cy = e.clientY;
      if (!m.on) {
        m.rx = e.clientX;
        m.ry = e.clientY;
      }
      m.on = true;
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      const mode = el.closest(".hk-proj") ? "view" : el.closest("a,button") ? "link" : "";
      cur.className = "hk-cur on " + mode;
    };
    const onLeave = () => {
      m.on = false;
      cur.className = "hk-cur";
    };
    const onResize = () => {
      resize();
      measure();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    allocate();
    resize();
    // a fonte web alarga a faixa cinética; remede o ponto de loop quando carregar
    void document.fonts?.ready.then(resize);
    measure();

    let prev = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) {
        prev = now;
        return;
      }
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!reduce) t += dt;
      frame();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(#171A19_1px,transparent_1px)] bg-size-[28px_28px] opacity-80"
      />
      <div ref={curRef} className="hk-cur" aria-hidden>
        <span className="hk-cur-l">ver</span>
      </div>
      <div ref={dotRef} className="hk-dot" aria-hidden />
    </>
  );
}
