import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT, H, W} from '../theme';

type Col = 'ink' | 'gold' | 'cyan' | 'red' | 'mint' | 'violet' | 'muted' | 'blue' | 'amber';
const COLS: Col[] = ['ink', 'gold', 'cyan', 'red', 'mint', 'violet', 'muted', 'blue', 'amber'];

/** Definisi bersama (panah, bayangan kertas). Pasang sekali di setiap <Stage>. */
export const Defs: React.FC = () => (
  <defs>
    {COLS.map((k) => (
      <marker key={k} id={`arrow-${k}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 L2.5,5 Z" fill={C[k]} />
      </marker>
    ))}
    <filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#16213e" floodOpacity="0.1" />
    </filter>
    <radialGradient id="soft-hilite">
      <stop offset="0%" stopColor={C.hilite} stopOpacity="0.8" />
      <stop offset="100%" stopColor={C.hilite} stopOpacity="0" />
    </radialGradient>
  </defs>
);

/** Kanvas SVG penuh 1920×1080 untuk sebuah adegan. */
export const Stage: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <AbsoluteFill style={style}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <Defs />
      {children}
    </svg>
  </AbsoluteFill>
);

export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: Col;
  width?: number;
  opacity?: number;
  dash?: string;
  both?: boolean;
}> = ({x1, y1, x2, y2, color = 'ink', width = 4, opacity = 1, dash, both}) => {
  if (Math.hypot(x2 - x1, y2 - y1) < 2) return null;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={C[color]}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      opacity={opacity}
      markerEnd={`url(#arrow-${color})`}
      markerStart={both ? `url(#arrow-${color})` : undefined}
    />
  );
};

/** Teks SVG dengan gaya konsisten (halo warna kertas agar terbaca di atas garis). */
export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  opacity?: number;
  font?: 'sans' | 'mono' | 'serif';
  italic?: boolean;
  spacing?: number;
  halo?: boolean;
}> = ({x, y, children, size = 30, color = C.ink, anchor = 'middle', weight = 500, opacity = 1, font = 'sans', italic, spacing, halo = true}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline="central"
    fontFamily={FONT[font]}
    fontSize={size}
    fontWeight={weight}
    fill={color}
    opacity={opacity}
    fontStyle={italic ? 'italic' : undefined}
    letterSpacing={spacing}
    style={halo ? {paintOrder: 'stroke', stroke: 'rgba(255,255,255,0.92)', strokeWidth: size * 0.14} : undefined}
  >
    {children}
  </text>
);

/** Path yang tergambar progresif (0..1). */
export const DrawPath: React.FC<{
  d: string;
  p: number;
  stroke: string;
  width?: number;
  opacity?: number;
  len?: number;
  dash?: string;
  fill?: string;
}> = ({d, p, stroke, width = 4, opacity = 1, len = 4000, dash, fill = 'none'}) => {
  if (p <= 0) return null;
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      strokeDasharray={dash ?? `${len} ${len}`}
      strokeDashoffset={dash ? undefined : len * (1 - p)}
      pathLength={dash ? undefined : len}
    />
  );
};

/** Kartu HTML (lembar kertas kecil) yang diposisikan absolut. Letakkan DI LUAR <Stage>. */
export const Card: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  opacity?: number;
  scale?: number;
  rotate?: number;
  anchor?: 'center' | 'left' | 'right';
  accent?: string;
  style?: React.CSSProperties;
  width?: number;
}> = ({x, y, children, opacity = 1, scale = 1, rotate = 0, anchor = 'center', accent = C.gold, style, width}) => {
  const tx = anchor === 'center' ? '-50%' : anchor === 'right' ? '-100%' : '0%';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        transform: `translate(${tx}, -50%) scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: anchor === 'center' ? '50% 50%' : anchor === 'left' ? '0% 50%' : '100% 50%',
        opacity,
        padding: '20px 30px',
        borderRadius: 16,
        background: C.paper,
        border: `1.5px solid ${C.faint}`,
        borderTop: `6px solid ${accent}`,
        boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
        color: C.ink,
        fontFamily: FONT.sans,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Pil label kecil. */
export const Badge: React.FC<{x: number; y: number; text: string; color: string; opacity?: number; scale?: number; size?: number}> = ({
  x,
  y,
  text,
  color,
  opacity = 1,
  scale = 1,
  size = 26,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      padding: '8px 22px',
      borderRadius: 999,
      background: `${color}18`,
      border: `2px solid ${color}`,
      color,
      fontFamily: FONT.sans,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: 1,
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

export const Sub: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => (
  <sub style={{fontSize: '0.62em', verticalAlign: '-0.32em', lineHeight: 0, color, fontStyle: 'normal'}}>{children}</sub>
);

export const Sup: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => (
  <sup style={{fontSize: '0.62em', verticalAlign: '0.55em', lineHeight: 0, color}}>{children}</sup>
);
