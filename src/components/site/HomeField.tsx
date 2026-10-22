import { useEffect, useRef } from "react";
import { PORTRAIT_GRID } from "@/components/site/portrait-grid";

/* Campo de caracteres 3D da home: no hero vira o retrato ASCII do Henrique (com as cores da foto);
   nas outras seções vira toro, treliça, esfera, hélice e galáxia. Inclui cursor, botões magnéticos
   e faixa cinética. */

export const ACCENT = "#8CC7A1";
export const SEED = 427;
export const SHAPE_NAMES = ["retrato ascii", "toro", "treliça", "esfera", "hélice", "galáxia"];
export const SECTION_IDS = ["topo", "sobre", "servicos", "projetos", "processo", "contato"];

export type FieldState = { prog: number; active: string; shape: number; count: number };

const RAMP = " .:-=+*#%@";
const SPEED = 1;
const COLOR = 1; // saturação das cores da foto (0 = cinza)

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

// cx, cy (fração da tela), escala (fração do menor lado), alpha — seções 1..5 (a 0 segue o quadro do hero)
const LAYOUT = [
  [0.24, 0.56, 0.36, 0.95],
  [0.82, 0.5, 0.4, 0.45],
  [0.85, 0.45, 0.36, 0.4],
  [0.5, 0.42, 0.42, 0.55],
  [0.72, 0.52, 0.4, 0.85],
];

type Atlas = { cv: HTMLCanvasElement; cw: number; chh: number; dpr: number; fs: number; pals: number };

/** `introDelay`: ms até o preloader sair — só então o retrato começa a se montar. */
export function HomeField({
  introDelay,
  onChange,
}: {
  introDelay: number;
  onChange: (s: FieldState) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const delayRef = useRef(introDelay);

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d");
    const cur = curRef.current!;
    const dot = dotRef.current!;
    const kin = document.getElementById("hk-kin");
    const hud = document.getElementById("hk-hud");
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".hk-magnet"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = { x: 0, y: 0, sx: 0, sy: 0, cx: -9999, cy: -9999, rx: -9999, ry: -9999, on: false };
    const loadT = performance.now() + (reduce ? 0 : delayRef.current);
    let k = 0,
      kS = 0,
      t = 0,
      scrollY = 0,
      W = 0,
      H = 0,
      kinW = 0,
      N = 0,
      spin = 0,
      vel = 0,
      lastSy = -1,
      cellH = 0.027;
    // retrato: posição (PT), caractere (PC), brilho (PB), índice de cor da foto (PI)
    let PT = new Float32Array(0),
      PB = PT,
      PC = new Uint8Array(0),
      PI: Uint8Array | null = null;
    let ART: { C: number; colStep: number } | null = null;
    let palette: string[] = [];
    let P = new Float32Array(0),
      O = P,
      R = P,
      S = P,
      Cd = new Uint8Array(0);
    let atlas: Atlas | null = null;
    let shock: { x: number; y: number; t0: number } | null = null;
    let last: FieldState | null = null;

    const emit = (next: Omit<FieldState, "count">) => {
      const s = { ...next, count: N };
      if (
        !last ||
        last.prog !== s.prog ||
        last.active !== s.active ||
        last.shape !== s.shape ||
        last.count !== s.count
      ) {
        last = s;
        onChangeRef.current(s);
      }
    };

    // retrato em ASCII (arte reamostrada 3×2) — cada caractere vira uma partícula
    const buildPortrait = () => {
      const G = PORTRAIT_GRID,
        Hh = G.length;
      const Wc = G.reduce((a, s) => Math.max(a, s.length), 0);
      const pts: number[] = [],
        ch: number[] = [],
        br: number[] = [];
      const cellW = (0.825 * 2) / (Hh - 1);
      for (let y = 0; y < Hh; y++) {
        const row = G[y];
        let lo = -1,
          hi = -1;
        for (let x = 0; x < row.length; x++)
          if (row[x] !== " ") {
            if (lo < 0) lo = x;
            hi = x;
          }
        if (lo < 0) continue;
        const c = (lo + hi) / 2,
          hw = Math.max(3, (hi - lo) / 2);
        for (let x = 0; x < row.length; x++) {
          const kk = RAMP.indexOf(row[x]);
          if (kk <= 0) continue;
          const dz = Math.sqrt(Math.max(0, 1 - ((x - c) / hw) ** 2));
          const Z = -0.34 * dz * Math.min(1, hw / 18) - 0.05 * (1 - (kk - 1) / 8);
          pts.push((x - Wc / 2) * cellW, (y / (Hh - 1)) * 2 - 1, Z);
          ch.push(kk);
          br.push(0.3 + 0.7 * ((kk - 1) / 8));
        }
      }
      PT = new Float32Array(pts);
      PC = new Uint8Array(ch);
      PB = new Float32Array(br);
      cellH = 2 / (Hh - 1);
    };

    // versão em resolução total: partículas (2×1, ou 2×2 no celular) + cor da foto por caractere
    const buildPortraitHi = (L: string[], rgb: Uint8Array | null, cols?: number) => {
      const Rr = L.length,
        C = L.reduce((a, s) => Math.max(a, s.length), 0);
      if (Rr < 10 || C < 10) return;
      const RC = cols || C;
      const pal =
        rgb && palette.length
          ? palette.map((h) => [
              parseInt(h.slice(1, 3), 16),
              parseInt(h.slice(3, 5), 16),
              parseInt(h.slice(5, 7), 16),
            ])
          : null;
      const pidx: number[] = [];
      const rowStep = 2 / (Rr - 1),
        colStep = rowStep * 0.55;
      const lo = new Int16Array(Rr),
        hi = new Int16Array(Rr),
        rowZ = new Float32Array(Rr);
      for (let r = 0; r < Rr; r++) {
        const s = L[r];
        let a = -1,
          b = -1;
        for (let x = 0; x < s.length; x++)
          if (s[x] !== " ") {
            if (a < 0) a = x;
            b = x;
          }
        lo[r] = a;
        hi[r] = b;
        const hw = a < 0 ? 0 : (b - a) / 2;
        rowZ[r] = a < 0 ? 0 : -0.25 * Math.min(1, 70 / Math.max(1, hw));
      }
      const SX = 2,
        SY = window.innerWidth < 760 ? 2 : 1;
      const pts: number[] = [],
        ch: number[] = [],
        br: number[] = [];
      for (let gy = 0; gy * SY < Rr; gy++) {
        for (let gx = 0; gx * SX < C; gx++) {
          let sum = 0,
            n = 0,
            cr = 0,
            cg = 0,
            cb = 0;
          for (let yy = gy * SY; yy < Math.min(Rr, gy * SY + SY); yy++)
            for (let xx = gx * SX; xx < gx * SX + SX; xx++) {
              const c = L[yy][xx];
              if (c && c !== " ") {
                sum += RAMP.indexOf(c);
                n++;
                if (pal && rgb) {
                  const q = (yy * RC + xx) * 3;
                  cr += rgb[q];
                  cg += rgb[q + 1];
                  cb += rgb[q + 2];
                }
              }
            }
          if (n < Math.max(1, Math.floor((SX * SY) / 3))) continue;
          const kk = Math.max(1, Math.round(sum / n));
          const sx = gx * SX + (SX - 1) / 2,
            sy = gy * SY + (SY - 1) / 2,
            r = Math.min(Rr - 1, gy * SY);
          const c0 = (lo[r] + hi[r]) / 2,
            hw = Math.max(3, (hi[r] - lo[r]) / 2);
          const dz = Math.sqrt(Math.max(0, 1 - ((sx - c0) / hw) ** 2));
          pts.push(
            (sx - C / 2) * colStep,
            sy * rowStep - 1,
            rowZ[r] * (0.4 + 0.9 * dz) - 0.04 * ((kk - 1) / 8),
          );
          ch.push(kk);
          br.push(0.3 + 0.7 * ((kk - 1) / 8));
          if (pal) {
            cr /= n;
            cg /= n;
            cb /= n;
            let best = 0,
              bd = 1e9;
            for (let p = 0; p < pal.length; p++) {
              const d = (pal[p][0] - cr) ** 2 + (pal[p][1] - cg) ** 2 + (pal[p][2] - cb) ** 2;
              if (d < bd) {
                bd = d;
                best = p;
              }
            }
            pidx.push(best);
          }
        }
      }
      PT = new Float32Array(pts);
      PC = new Uint8Array(ch);
      PB = new Float32Array(br);
      PI = pal ? new Uint8Array(pidx) : null;
      ART = { C, colStep };
      cellH = rowStep * SY;
    };

    // partículas começam espalhadas numa casca esférica, à deriva até a montagem
    const allocate = () => {
      if (!PT.length) buildPortrait();
      N = PC.length;
      P = new Float32Array(N * 3);
      O = new Float32Array(N * 2);
      R = new Float32Array(N);
      S = new Float32Array(N * 2);
      Cd = new Uint8Array(N);
      const r = rng(SEED + 1);
      for (let i = 0; i < N; i++) R[i] = r();
      for (let i = 0; i < N; i++) {
        const a = r() * Math.PI * 2,
          b = Math.acos(2 * r() - 1),
          rad = 2.4 + r() * 2.6;
        P[i * 3] = Math.sin(b) * Math.cos(a) * rad;
        P[i * 3 + 1] = Math.cos(b) * rad;
        P[i * 3 + 2] = Math.sin(b) * Math.sin(a) * rad;
        Cd[i] = 1 + Math.floor(r() * 9);
      }
    };

    // atlas de glifos — linhas: 0 neutro, 1 destaque, 2.. cores da foto
    const buildAtlas = (): Atlas => {
      const dpr = Math.min(2, window.devicePixelRatio || 1),
        fs = 10;
      const cw = Math.ceil(fs * 0.68 * dpr) + 2,
        chh = Math.ceil(fs * 1.25 * dpr) + 2;
      const pal = palette.map((h) => {
        const r = parseInt(h.slice(1, 3), 16),
          g = parseInt(h.slice(3, 5), 16),
          b = parseInt(h.slice(5, 7), 16);
        const l = 0.299 * r + 0.587 * g + 0.114 * b,
          mix = (v: number) => Math.round(l + (v - l) * COLOR);
        return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
      });
      const rowsN = 2 + pal.length;
      const acv = document.createElement("canvas");
      acv.width = cw * 10;
      acv.height = chh * rowsN;
      const c = acv.getContext("2d")!;
      c.font = `500 ${fs * dpr}px 'JetBrains Mono', monospace`;
      c.textAlign = "center";
      c.textBaseline = "middle";
      for (let rr = 0; rr < rowsN; rr++) {
        c.fillStyle = rr === 0 ? "#E8EAE6" : rr === 1 ? ACCENT : pal[rr - 2];
        for (let kk = 1; kk < 10; kk++) c.fillText(RAMP[kk], kk * cw + cw / 2, rr * chh + chh / 2);
      }
      return { cv: acv, cw, chh, dpr, fs, pals: pal.length };
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      kinW = kin ? kin.scrollWidth / 2 : 0;
      atlas = null;
    };

    // formas: 0 retrato · 1 toro · 2 treliça · 3 esfera · 4 hélice · 5 galáxia
    const shape = (id: number, i: number, t: number, out: number[]) => {
      const q = R[i],
        TAU = Math.PI * 2;
      if (id === 0) {
        const j = i * 3,
          y = PT[j + 1];
        out[0] = PT[j];
        out[1] = y;
        out[2] = PT[j + 2] + 0.025 * Math.sin(y * 9 - t * 1.4);
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

    // o retrato se encaixa no quadro do hero e rola junto com a página
    const layout0 = () => {
      if (hud) {
        const r = hud.getBoundingClientRect();
        if (r.width > 40 && r.height > 40) {
          const span = ART ? ART.C * ART.colStep + 0.14 : 2.4;
          const sc = Math.min(r.width / span, r.height / 2.14);
          return [(r.left + r.width / 2) / W, (r.top + r.height / 2) / H, sc / Math.min(W, H), 1];
        }
      }
      return [0.5, 0.34, 0.36, 0.35];
    };

    const layout = (kk: number) => {
      const L = [layout0(), ...LAYOUT];
      const a = Math.floor(kk),
        b = Math.min(5, a + 1),
        f = kk - a;
      const out = L[a].map((v, j) => v + (L[b][j] - v) * f);
      if (W < 900 && kk > 0.5) {
        out[0] = 0.5;
        out[1] = 0.45;
        out[3] *= 0.4;
      }
      return out;
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
      emit({ prog: Math.round(p * 100), active, shape: Math.round(kk) });
    };

    const ease3 = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const smooth = (x: number) => x * x * (3 - 2 * x);
    const rnd = () => 1 + ((Math.random() * 9) | 0);

    const draw = () => {
      if (!ctx || !N) return;
      if (!atlas || atlas.pals !== palette.length) atlas = buildAtlas();
      const AT = atlas;
      const PIx = PI && AT.pals && PI.length === N ? PI : null;
      const now = performance.now();
      ctx.clearRect(0, 0, W, H);
      const a = Math.floor(kS),
        b = Math.min(5, a + 1),
        f = kS - a;
      const pw0 = a === 0 ? 1 - f : 0; // peso do retrato
      const [lcx, lcy, lsc, la] = layout(kS);
      const cx = W * lcx,
        cy = H * lcy,
        sc = Math.min(W, H) * lsc;
      // efeitos em ciclo sobre o retrato: 0 onda de relevo · 1 giro 360° · 2 dissolver e recompor
      const el = (now - loadT) / 1000;
      let fxT = -1,
        fxP = 0;
      if (el > 5 && pw0 > 0.9 && !reduce) {
        const cyc = (el - 5) % 8,
          idx = Math.floor((el - 5) / 8) % 3,
          dur = [1.8, 2.4, 2.2][idx];
        if (cyc < dur) {
          fxT = idx;
          fxP = cyc / dur;
        }
      }
      const fxSpin = fxT === 1 ? ease3(fxP) * Math.PI * 2 : 0;
      const waveY = -1.3 + 2.6 * fxP;
      const dis = fxT === 2 ? Math.pow(Math.sin(Math.PI * fxP), 1.5) : 0;
      // onda de choque do clique
      let shR = -1,
        shS = 0;
      if (shock) {
        const s = (now - shock.t0) / 1000;
        if (s < 1.2) {
          shR = s * 950;
          shS = 1 - s / 1.2;
        } else shock = null;
      }
      const sway = 0.16 * Math.sin(t * 0.45);
      const ry = m.sx * 0.55 + pw0 * (sway + fxSpin) + (1 - pw0) * spin;
      const rx = 0.32 * (1 - pw0) + m.sy * 0.28;
      const cY = Math.cos(ry),
        sY = Math.sin(ry),
        cX = Math.cos(rx),
        sX = Math.sin(rx);
      const A = [0, 0, 0],
        B = [0, 0, 0];
      const mx = m.on ? m.cx : -9999,
        my = m.on ? m.cy : -9999,
        RAD = 110;
      // montagem inicial: caracteres chegam de fora e se assentam de cima para baixo
      const settled = el > 3.2;
      // linha de varredura sobre o retrato
      const band = ((t * 0.3) % 1.7) - 0.35;
      // tamanho do caractere acompanha o espaçamento entre linhas do retrato
      const gs = Math.max(0.3, Math.min(1.5, (sc * cellH * 1.18) / (AT.fs * 1.25)));
      const gw = AT.cw / AT.dpr,
        gh = AT.chh / AT.dpr;
      const linePts: number[] = [];
      for (let i = 0; i < N; i++) {
        const j = i * 3;
        const start = settled ? 0 : el < 0 ? 1e9 : R[i] * 0.7 + (PT[j + 1] + 1) * 0.45;
        const moving = el >= start;
        if (moving) {
          shape(a, i, t, A);
          let tx = A[0],
            ty = A[1],
            tz = A[2];
          if (f > 0.0005) {
            shape(b, i, t, B);
            const g = smooth(Math.min(1, Math.max(0, f * 1.5 - R[i] * 0.5)));
            tx += (B[0] - tx) * g;
            ty += (B[1] - ty) * g;
            tz += (B[2] - tz) * g;
            // transição em redemoinho: cada caractere viaja num arco, não em linha reta
            if (g > 0 && g < 1) {
              const sw = Math.sin(Math.PI * g),
                ph = sw * 1.7 * (R[i] > 0.5 ? 1 : -1),
                c = Math.cos(ph),
                s = Math.sin(ph);
              const x0 = tx;
              tx = x0 * c - tz * s;
              tz = x0 * s + tz * c;
              ty += sw * 0.35 * (R[(i * 7) % N] - 0.5);
            }
          }
          if (pw0 > 0.5) {
            // onda de relevo atravessando o rosto
            if (fxT === 0) {
              const dy = PT[j + 1] - waveY;
              tz -= 0.24 * Math.exp((-dy * dy) / 0.012);
            }
            // dissolver e recompor
            if (dis) {
              tx += dis * 0.9 * (R[i] - 0.5);
              ty += dis * 0.9 * (R[(i * 7) % N] - 0.5);
              tz += dis * 1.4 * (R[(i * 13) % N] - 0.5);
            }
            // lupa: o rosto se projeta para frente perto do cursor
            if (m.on) {
              const ex = S[i * 2] - m.cx,
                ey = S[i * 2 + 1] - m.cy,
                ed = ex * ex + ey * ey;
              if (ed < 19600) {
                const q = 1 - Math.sqrt(ed) / 140;
                tz -= 0.3 * q * q * pw0;
              }
            }
          }
          const lf = settled ? 0.14 : 0.075;
          P[j] += (tx - P[j]) * lf;
          P[j + 1] += (ty - P[j + 1]) * lf;
          P[j + 2] += (tz - P[j + 2]) * lf;
        } else {
          // à deriva, girando devagar enquanto espera
          const c = Math.cos(0.004),
            s = Math.sin(0.004),
            x0 = P[j];
          P[j] = x0 * c - P[j + 2] * s;
          P[j + 2] = x0 * s + P[j + 2] * c;
        }
        // caracteres: decodificando na chegada, depois com cintilação ocasional
        if (!moving || el - start < 0.9) {
          if (Math.random() < 0.5) Cd[i] = rnd();
        } else if (Cd[i] !== PC[i] && Math.random() < 0.12) Cd[i] = PC[i];
        // rotação + perspectiva
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
        let near = 0;
        if (d2 < RAD * RAD) {
          const d = Math.sqrt(d2) || 1,
            push = (1 - d / RAD) * 9;
          near = 1 - d / RAD;
          O[o] += (dx / d) * push;
          O[o + 1] += (dy / d) * push;
        }
        // onda de choque: anel que empurra os caracteres ao passar
        if (shock && shR > 0) {
          const sx2 = px - shock.x,
            sy2 = py - shock.y,
            sd = Math.sqrt(sx2 * sx2 + sy2 * sy2) || 1,
            w = Math.abs(sd - shR);
          if (w < 60) {
            const q = (1 - w / 60) * shS * 18;
            O[o] += (sx2 / sd) * q;
            O[o + 1] += (sy2 / sd) * q;
            if (Math.random() < 0.6) Cd[i] = rnd();
          }
        }
        O[o] *= 0.9;
        O[o + 1] *= 0.9;
        px += O[o];
        py += O[o + 1] + vel * (0.2 + R[i] * 1.1);
        S[o] = px;
        S[o + 1] = py;
        // perto do cursor (ou no scroll rápido) os caracteres se embaralham
        if (
          (near > 0.35 && Math.random() < 0.3) ||
          (Math.abs(vel) > 12 && Math.random() < Math.abs(vel) / 160) ||
          (dis > 0.4 && Math.random() < dis * 0.5)
        )
          Cd[i] = rnd();
        if (px < -20 || py < -20 || px > W + 20 || py > H + 20) continue;
        // brilho: no retrato, cores da foto (ou tons da arte); nas outras formas, a profundidade
        const depth = Math.min(1, Math.max(0, (1.3 - z2) / 2.6));
        const useCol = PIx && R[i] < pw0 * 1.05;
        const shade = pw0 * (PIx ? 0.94 : PB[i]) + (1 - pw0) * (0.12 + 0.88 * depth * depth);
        const inScan = pw0 > 0.5 && Math.abs(PT[j + 1] - band) < 0.03;
        const inWave = fxT === 0 && Math.abs(PT[j + 1] - waveY) < 0.035;
        const isAcc = inScan || inWave || (i % 13 === 0 && pw0 < 0.5);
        const row = isAcc ? 1 : useCol && PIx ? 2 + PIx[i] : 0;
        const dw = gw * gs * per,
          dh = gh * gs * per;
        if (i % 13 === 0) linePts.push(px, py);
        const alpha = la * (isAcc && pw0 > 0.5 ? 1 : Math.min(1, shade + near * 0.4)) * (moving ? 1 : 0.35);
        if (alpha < 0.03) continue;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(AT.cv, Cd[i] * AT.cw, row * AT.chh, AT.cw, AT.chh, px - dw / 2, py - dh / 2, dw, dh);
      }
      // constelações entre caracteres de destaque (só fora do retrato)
      if (pw0 < 0.95) {
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = ACCENT;
        ctx.globalAlpha = 0.18 * la * (1 - pw0);
        ctx.beginPath();
        for (let n = 0; n + 3 < linePts.length; n += 2) {
          const dx = linePts[n] - linePts[n + 2],
            dy = linePts[n + 1] - linePts[n + 3];
          if (dx * dx + dy * dy < 2600) {
            ctx.moveTo(linePts[n], linePts[n + 1]);
            ctx.lineTo(linePts[n + 2], linePts[n + 3]);
          }
        }
        ctx.stroke();
      }
      // flicker vivo: alguns caracteres trocam por instantes
      if (settled) for (let q = 0; q < 5; q++) Cd[(Math.random() * N) | 0] = rnd();
      if (shock && shR > 0) {
        ctx.globalAlpha = 0.55 * shS;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(shock.x, shock.y, shR, 0, Math.PI * 2);
        ctx.stroke();
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

    const frame = (dt: number) => {
      m.sx += (m.x - m.sx) * 0.05;
      m.sy += (m.y - m.sy) * 0.05;
      m.rx += (m.cx - m.rx) * 0.18;
      m.ry += (m.cy - m.ry) * 0.18;
      cur.style.transform = `translate3d(${m.rx.toFixed(1)}px,${m.ry.toFixed(1)}px,0)`;
      dot.style.transform = `translate3d(${m.cx}px,${m.cy}px,0)`;
      for (const el of magnets) {
        const r = el.getBoundingClientRect(),
          dx = m.cx - (r.left + r.width / 2),
          dy = m.cy - (r.top + r.height / 2),
          d = Math.hypot(dx, dy);
        const pull = d < 140 ? 1 - d / 140 : 0;
        el.style.transform = pull
          ? `translate(${(dx * 0.28 * pull).toFixed(1)}px,${(dy * 0.38 * pull).toFixed(1)}px)`
          : "";
      }
      if (kin && kinW) kin.style.transform = `translate3d(${-((scrollY * 0.45) % kinW)}px,0,0)`;
      kS += (k - kS) * (reduce ? 1 : 0.07);
      spin += dt * SPEED * 0.16 * Math.min(1, kS);
      // velocidade do scroll (px por quadro, suavizada) — rastro nas partículas
      const dv = lastSy < 0 ? 0 : Math.max(-80, Math.min(80, scrollY - lastSy));
      lastSy = scrollY;
      vel += (dv - vel) * 0.25;
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
    // clique = onda de choque nas partículas
    const onDown = (e: PointerEvent) => {
      shock = { x: e.clientX, y: e.clientY, t0: performance.now() };
    };
    const onResize = () => {
      resize();
      measure();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    allocate();
    resize();
    measure();
    // a fonte web muda os glifos e a largura da faixa cinética
    void document.fonts?.ready.then(resize);

    // arte ASCII em resolução total + cores da foto alinhadas a cada caractere
    let alive = true;
    fetch("/retrato-ascii.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`retrato ${r.status}`))))
      .then((d: { lines: string[]; rgb: string; cols: number; palette: string[] }) => {
        if (!alive) return;
        let rgb: Uint8Array | null = null;
        try {
          const bin = atob(d.rgb);
          rgb = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) rgb[i] = bin.charCodeAt(i);
        } catch {
          rgb = null; // sem cor: o retrato fica nos tons da arte
        }
        palette = Array.isArray(d.palette) ? d.palette : [];
        buildPortraitHi(d.lines, rgb, d.cols);
        atlas = null;
        allocate();
        measure();
      })
      // ponytail: sem o JSON fica o retrato em baixa resolução embutido — ainda é o rosto, só menos nítido
      .catch((err) => console.warn("[HomeField] retrato completo indisponível:", err));

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
      if (!reduce) t += dt * SPEED;
      frame(dt);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
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
