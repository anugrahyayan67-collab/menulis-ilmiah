// Komponen bantu tata letak untuk adegan-adegan "aturan": panel, baris poin, cap, pil.
import React from 'react';
import {interpolateColors} from 'remotion';
import {C, FONT} from '../theme';
import {Check, Kicker} from './paper';

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  p: number;
  title?: string;
  col?: string;
  pad?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, w, h, p, title, col = C.blue, pad = '24px 32px', children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      boxSizing: 'border-box',
      padding: pad,
      background: '#fff',
      border: `1.5px solid ${C.faint}`,
      borderTop: `6px solid ${col}`,
      borderRadius: 16,
      boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
      opacity: Math.min(1, p),
      transform: `translateY(${((1 - Math.min(1, p)) * 18).toFixed(2)}px)`,
      ...style,
    }}
  >
    {title ? <Kicker color={col}>{title}</Kicker> : null}
    <div style={{marginTop: title ? 14 : 0}}>{children}</div>
  </div>
);

/** Baris poin dengan centang / tanda silang yang tergambar. */
export const Item: React.FC<{p: number; children: React.ReactNode; size?: number; cross?: boolean; col?: string; gap?: number}> = ({p, children, size = 30, cross, col, gap = 18}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: gap, fontFamily: FONT.sans, fontSize: size, color: C.ink, opacity: 0.3 + 0.7 * Math.min(1, p)}}>
    <Check p={p} size={size * 1.25} cross={cross} color={col ?? (cross ? C.red : C.mint)} />
    <span>{children}</span>
  </div>
);

/** Pil yang menyala (warna batas & isi diinterpolasi, tanpa ambang). */
export const Pill: React.FC<{on: number; children: React.ReactNode; col?: string; size?: number; style?: React.CSSProperties}> = ({on, children, col = C.blue, size = 26, style}) => (
  <span
    style={{
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: 999,
      fontFamily: FONT.sans,
      fontWeight: 700,
      fontSize: size,
      border: `2px solid ${interpolateColors(on, [0, 1], [C.faint, col])}`,
      color: interpolateColors(on, [0, 1], [C.muted, col]),
      background: '#fff',
      ...style,
    }}
  >
    {children}
  </span>
);

/** Cap miring (stempel) yang "jatuh" ke kertas. */
export const Stamp: React.FC<{p: number; text: string; col?: string; x: number; y: number; rot?: number; size?: number}> = ({p, text, col = C.red, x, y, rot = -6, size = 34}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      opacity: Math.min(1, p),
      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${(1.3 - 0.3 * Math.min(1, p)).toFixed(3)})`,
      border: `4px solid ${col}`,
      borderRadius: 12,
      padding: '4px 20px',
      background: '#fff',
      color: col,
      fontFamily: FONT.mono,
      fontWeight: 600,
      fontSize: size,
      letterSpacing: 3,
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

/** Pasangan salah → benar dengan coretan merah dan perbaikan hijau. */
export const Fix: React.FC<{bad: string; good: string; p: number; size?: number}> = ({bad, good, p, size = 36}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 20px', fontFamily: FONT.serif, fontSize: size, marginTop: 14}}>
    <span style={{position: 'relative', color: C.muted}}>
      {bad}
      <span style={{position: 'absolute', left: -4, top: '55%', height: 4, width: `calc(${(Math.min(1, p * 2) * 100).toFixed(1)}% + ${(8 * (Math.min(1, p * 2))).toFixed(2)}px)`, background: C.red, borderRadius: 2}} />
    </span>
    <span style={{color: C.mint, fontFamily: FONT.sans, fontWeight: 800, opacity: Math.max(0, Math.min(1, p * 2 - 0.6))}}>→</span>
    <span style={{color: C.ink, fontWeight: 600, opacity: Math.max(0, Math.min(1, p * 2 - 1)), backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(Math.max(0, Math.min(1, p * 2 - 1)) * 100).toFixed(1)}% 0.55em`, backgroundPosition: '0 0.8em'}}>
      {good}
    </span>
  </div>
);
