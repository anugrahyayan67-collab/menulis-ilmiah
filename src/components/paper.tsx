// Perangkat visual "Meja Tulis": lembar kertas, teks terketik, stabilo, coretan pena merah,
// kartu catatan, centang, ikon dokumen. Semua dikendalikan progres p (0..1) dari frame.
import React from 'react';
import {C, FONT} from '../theme';

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/* ------------------------------------------------------------------ */
/* Lembar kertas                                                        */
/* ------------------------------------------------------------------ */

export const Paper: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  rot?: number;
  opacity?: number;
  lift?: number; // 0..1 → kertas turun dari atas saat masuk
  ruled?: boolean;
  margin?: boolean;
  pad?: string;
  accent?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  tape?: boolean;
}> = ({x, y, w, h, rot = 0, opacity = 1, lift = 0, ruled, margin, pad = '34px 44px', accent, children, style, tape}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      transform: `translateY(${(-26 * lift).toFixed(2)}px) rotate(${rot}deg)`,
      opacity,
      padding: pad,
      boxSizing: 'border-box',
      background: C.paper,
      backgroundImage: ruled
        ? `repeating-linear-gradient(180deg, transparent 0px, transparent 47px, ${C.rule}55 47px, ${C.rule}55 48.5px)`
        : undefined,
      backgroundPosition: ruled ? '0 30px' : undefined,
      borderRadius: 16,
      border: `1.5px solid ${C.faint}`,
      borderTop: accent ? `6px solid ${accent}` : `1.5px solid ${C.faint}`,
      boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
      color: C.ink,
      fontFamily: FONT.serif,
      ...style,
    }}
  >
    {margin ? <div style={{position: 'absolute', left: 30, top: 0, bottom: 0, width: 2, background: `${C.red}40`}} /> : null}
    {tape ? (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: -16,
          width: 120,
          height: 32,
          marginLeft: -60,
          background: 'rgba(255,236,170,0.75)',
          transform: 'rotate(-3deg)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        }}
      />
    ) : null}
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Teks terketik dengan tanda (stabilo, coret, warna)                   */
/* ------------------------------------------------------------------ */

export type Seg = {
  t: string;
  hl?: number; // progres sapuan stabilo 0..1
  strike?: number; // progres coretan merah 0..1
  fix?: string; // teks perbaikan (muncul bersama coretan, tinta merah)
  fixP?: number;
  color?: string;
  italic?: boolean;
  bold?: boolean;
  under?: number; // garis bawah tinta 0..1
  underColor?: string;
  dim?: number; // 0..1 meredupkan
  box?: number; // kotak pena 0..1
  boxColor?: string;
};

export const segs = (...parts: (string | Seg)[]): Seg[] => parts.map((p) => (typeof p === 'string' ? {t: p} : p));

const hiBg = (p: number, color = C.hilite): React.CSSProperties => ({
  backgroundImage: `linear-gradient(${color}, ${color})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${(clamp01(p) * 100).toFixed(2)}% 0.62em`,
  backgroundPosition: '0 0.78em',
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
});

/** Satu potongan teks bertanda. `vis` = jumlah huruf yang sudah terketik dari potongan ini. */
const SegSpan: React.FC<{s: Seg; vis: number}> = ({s, vis}) => {
  const shown = s.t.slice(0, vis);
  const rest = s.t.slice(vis);
  const st: React.CSSProperties = {
    color: s.color ?? 'inherit',
    fontStyle: s.italic ? 'italic' : undefined,
    fontWeight: s.bold ? 700 : undefined,
    opacity: s.dim !== undefined ? 1 - 0.65 * clamp01(s.dim) : undefined,
    ...(s.hl ? hiBg(s.hl) : {}),
  };
  const strike = clamp01(s.strike ?? 0);
  const under = clamp01(s.under ?? 0);
  const box = clamp01(s.box ?? 0);
  const fixP = clamp01(s.fixP ?? strike);
  return (
    <span style={{position: 'relative', ...st}}>
      {shown}
      {rest ? <span style={{opacity: 0}}>{rest}</span> : null}
      {strike > 0 ? (
        <span
          style={{
            position: 'absolute',
            left: -2,
            top: '52%',
            height: 4,
            width: `calc(${(strike * 100).toFixed(2)}% + 4px)`,
            background: C.red,
            borderRadius: 2,
            transform: 'rotate(-1.2deg)',
            opacity: 0.9,
          }}
        />
      ) : null}
      {under > 0 ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-0.06em',
            height: 3,
            width: `${(under * 100).toFixed(2)}%`,
            background: s.underColor ?? C.blue,
            borderRadius: 2,
          }}
        />
      ) : null}
      {box > 0 ? (
        <span
          style={{
            position: 'absolute',
            left: -6,
            right: -6,
            top: '-0.08em',
            bottom: '-0.12em',
            border: `3px solid ${s.boxColor ?? C.red}`,
            borderRadius: 10,
            opacity: box,
            transform: `scale(${(0.9 + 0.1 * box).toFixed(3)}) rotate(-0.8deg)`,
          }}
        />
      ) : null}
      {s.fix && fixP > 0 ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '88%',
            whiteSpace: 'nowrap',
            fontFamily: FONT.serif,
            fontStyle: 'italic',
            fontSize: '0.82em',
            color: C.red,
            opacity: fixP,
            transform: `translateY(${((1 - fixP) * 8).toFixed(2)}px) rotate(-2deg)`,
          }}
        >
          {s.fix}
        </span>
      ) : null}
    </span>
  );
};

/** Teks yang terketik progresif (p 0..1) dengan kursor. Tata letak tetap (sisa teks tak terlihat). */
export const TypeText: React.FC<{
  parts: Seg[];
  p: number;
  t: number;
  size?: number;
  font?: 'serif' | 'sans' | 'mono';
  lh?: number;
  caret?: boolean;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'justify';
}> = ({parts, p, t, size = 34, font = 'serif', lh = 1.55, caret = true, style, align = 'left'}) => {
  const total = parts.reduce((s, x) => s + x.t.length, 0);
  let n = Math.round(clamp01(p) * total);
  const out: React.ReactNode[] = [];
  let caretPlaced = false;
  const caretOpacity = caret ? Math.min(1, (1 - clamp01(p)) * 30, clamp01(p) * 60) * (0.55 + 0.45 * Math.cos(t * 7)) : 0;
  parts.forEach((s, i) => {
    const vis = Math.max(0, Math.min(s.t.length, n));
    n -= vis;
    out.push(<SegSpan key={i} s={s} vis={vis} />);
    if (!caretPlaced && (vis < s.t.length || i === parts.length - 1)) {
      caretPlaced = true;
      if (caretOpacity > 0.01)
        out.push(
          <span
            key={`c${i}`}
            style={{display: 'inline-block', width: 0, position: 'relative'}}
          >
            <span
              style={{
                position: 'absolute',
                left: 1,
                top: '-0.85em',
                width: 3,
                height: '1.05em',
                background: C.blue,
                opacity: caretOpacity,
                borderRadius: 1,
              }}
            />
          </span>,
        );
    }
  });
  return (
    <div style={{fontFamily: FONT[font], fontSize: size, lineHeight: lh, color: C.ink, textAlign: align, ...style}}>{out}</div>
  );
};

/** Stabilo pada teks biasa. */
export const Hi: React.FC<{p: number; children: React.ReactNode; color?: string}> = ({p, children, color}) => (
  <span style={hiBg(p, color)}>{children}</span>
);

/* ------------------------------------------------------------------ */
/* Kartu catatan                                                         */
/* ------------------------------------------------------------------ */

export const NoteCard: React.FC<{
  x: number;
  y: number;
  w?: number;
  rot?: number;
  opacity?: number;
  scale?: number;
  head: React.ReactNode;
  page?: string;
  quote?: React.ReactNode;
  mine?: React.ReactNode;
  accent?: string;
  size?: number;
}> = ({x, y, w = 420, rot = 0, opacity = 1, scale = 1, head, page, quote, mine, accent = C.cyan, size = 22}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
      opacity,
      background: '#ffffff',
      border: `1.5px solid ${C.faint}`,
      borderRadius: 14,
      boxShadow: '0 10px 26px rgba(22,33,62,0.1)',
      overflow: 'hidden',
      fontFamily: FONT.serif,
      color: C.ink,
      fontSize: size,
      lineHeight: 1.45,
    }}
  >
    <div style={{background: `${accent}`, height: 8}} />
    <div style={{padding: '10px 18px 14px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.sans, fontWeight: 700, fontSize: size * 0.95, color: accent}}>
        <span>{head}</span>
        {page ? <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: size * 0.85, color: C.red}}>{page}</span> : null}
      </div>
      {quote ? <div style={{fontStyle: 'italic', marginTop: 6}}>{quote}</div> : null}
      {mine ? <div style={{marginTop: 6, fontFamily: FONT.sans, fontSize: size * 0.92, color: C.ink}}>{mine}</div> : null}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Kotak centang                                                         */
/* ------------------------------------------------------------------ */

export const Check: React.FC<{p: number; size?: number; color?: string; cross?: boolean}> = ({p, size = 34, color = C.mint, cross}) => {
  const q = clamp01(p);
  const len = 60;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{display: 'inline-block', verticalAlign: 'middle', overflow: 'visible', flex: 'none'}}>
      <rect x="3" y="3" width="34" height="34" rx="9" fill="#ffffff" stroke={C.ink} strokeOpacity={0.45} strokeWidth="2.5" />
      {cross ? (
        <path
          d="M11,11 L29,29 M29,11 L11,29"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${len} ${len}`}
          strokeDashoffset={len * (1 - q)}
          pathLength={len}
        />
      ) : (
        <path
          d="M9,21 L17,29 L32,10"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${len} ${len}`}
          strokeDashoffset={len * (1 - q)}
          pathLength={len}
        />
      )}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* SVG: dokumen mini (PDF), kaca pembesar, pena                          */
/* ------------------------------------------------------------------ */

/** Halaman dokumen mini di SVG: judul, baris teks, blok gambar/tabel. `scan` 0..1 menyorot baris. */
export const DocPage: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  rot?: number;
  opacity?: number;
  title?: string;
  accent?: string;
  seed?: number;
  hi?: number[]; // indeks baris yang distabilo
  hiP?: number;
  figure?: boolean;
  dim?: number;
}> = ({x, y, w = 220, h = 300, rot = 0, opacity = 1, title, accent = C.blue, seed = 1, hi = [], hiP = 1, figure, dim = 0}) => {
  const rows = Math.floor((h - 70) / 16);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={opacity}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={12} fill="#ffffff" stroke={C.faint} strokeWidth={1.5} filter="url(#paper-shadow)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={8} rx={3} fill={accent} />
      {title ? (
        <text x={0} y={-h / 2 + 32} textAnchor="middle" fontFamily={FONT.sans} fontWeight={700} fontSize={Math.min(20, w / 11)} fill={C.ink}>
          {title}
        </text>
      ) : null}
      {Array.from({length: rows}, (_, i) => {
        const yy = -h / 2 + 56 + i * 16;
        if (figure && i >= rows * 0.45 && i < rows * 0.7) {
          if (Math.abs(i - Math.floor(rows * 0.45)) > 0) return null;
          return <rect key={i} x={-w / 2 + 18} y={yy} width={w - 36} height={rows * 0.25 * 16 - 6} rx={4} fill={`${accent}22`} stroke={`${accent}66`} strokeWidth={1.5} />;
        }
        const ln = (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + seed * 3.1))) * (w - 36);
        const isHi = hi.includes(i);
        return (
          <g key={i}>
            {isHi ? <rect x={-w / 2 + 16} y={yy - 6} width={(ln + 4) * clamp01(hiP)} height={12} rx={3} fill={C.hilite} opacity={0.95} /> : null}
            <rect x={-w / 2 + 18} y={yy - 2.5} width={ln} height={5} rx={2.5} fill={C.ink} opacity={(isHi ? 0.55 : 0.22) * (1 - 0.6 * dim)} />
          </g>
        );
      })}
    </g>
  );
};

export const Magnifier: React.FC<{x: number; y: number; r?: number; opacity?: number}> = ({x, y, r = 60, opacity = 1}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <circle r={r} fill="rgba(255,255,255,0.35)" stroke={C.ink} strokeWidth={7} />
    <circle r={r - 10} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={3} strokeDasharray="30 400" />
    <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.6} y2={r * 1.6} stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
  </g>
);

/** Pena (tampak samping) dengan ujung di (x, y). */
export const Pen: React.FC<{x: number; y: number; angle?: number; opacity?: number; color?: string; scale?: number}> = ({
  x,
  y,
  angle = -35,
  opacity = 1,
  color = C.ink,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} opacity={opacity}>
    <path d="M0,0 L18,-7 L18,7 Z" fill="#c9a24a" />
    <path d="M2,0 L12,-2 L12,2 Z" fill="#6b5320" />
    <rect x={18} y={-9} width={34} height={18} rx={3} fill="#d8b860" />
    <rect x={52} y={-11} width={150} height={22} rx={9} fill={color} />
    <rect x={60} y={-8} width={130} height={4} rx={2} fill="#fff" opacity={0.25} />
    <rect x={120} y={-14} width={6} height={28} rx={2} fill="#d8b860" />
  </g>
);

/** Judul kecil berhuruf kapital renggang. */
export const Kicker: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color = C.muted, size = 22, style}) => (
  <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: size, letterSpacing: 3, color, textTransform: 'uppercase', ...style}}>{children}</div>
);

/** Posisi absolut sederhana untuk blok HTML. */
export const At: React.FC<{
  x: number;
  y: number;
  w?: number;
  anchor?: 'left' | 'center' | 'right';
  opacity?: number;
  dy?: number;
  dx?: number;
  scale?: number;
  rot?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, w, anchor = 'left', opacity = 1, dy = 0, dx = 0, scale = 1, rot = 0, children, style}) => {
  const tx = anchor === 'center' ? '-50%' : anchor === 'right' ? '-100%' : '0%';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        opacity,
        transform: `translate(calc(${tx} + ${dx.toFixed(2)}px), ${dy.toFixed(2)}px) scale(${scale}) rotate(${rot}deg)`,
        transformOrigin: anchor === 'center' ? '50% 50%' : anchor === 'right' ? '100% 0%' : '0% 0%',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
