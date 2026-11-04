import React from 'react';
import {BACK, EASE_IN_OUT, ramp, rand} from '../anim';
import {DrawPath, Stage} from '../components/primitives';
import {TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

/** Kapsul merek: logo S + SCIENTIAN + tagline. */
export const BrandCapsule: React.FC<{opacity?: number; scale?: number}> = ({opacity = 1, scale = 1}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      padding: '10px 26px 10px 12px',
      borderRadius: 999,
      background: C.paper,
      border: `2px solid ${C.ink}22`,
      boxShadow: '0 8px 24px rgba(22,33,62,0.16)',
      opacity,
      transform: `scale(${scale})`,
    }}
  >
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 23,
        background: C.ink,
        color: C.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT.serif,
        fontWeight: 600,
        fontSize: 30,
        fontStyle: 'italic',
      }}
    >
      S
    </div>
    <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: C.ink}}>SCIENTIAN</span>
    <span style={{width: 2, height: 24, background: `${C.ink}33`}} />
    <span style={{fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 24, color: C.muted}}>Explore Science with Yayan</span>
  </div>
);

// Gagasan (titik-titik di "kepala") yang mengalir menjadi baris tulisan.
const DOTS = Array.from({length: 26}, (_, i) => ({a: rand(i * 3.3) * Math.PI * 2, r: 20 + rand(i * 7.1) * 70, row: i % 5, k: rand(i * 1.9)}));

export const Title: React.FC = () => {
  const {t, dur} = useScene();
  const out = ramp(t, dur - 0.8, dur, EASE_IN_OUT);
  const cap = ramp(t, 0.2, 0.9, BACK);
  const typ = ramp(t, 0.6, 2.6, (x) => x);
  const sub = ramp(t, 2.6, 3.4);
  const und = ramp(t, 2.4, 3.4);
  const chips = ['laporan praktikum', 'makalah', 'artikel jurnal', 'karya lomba'];
  return (
    <>
      <Stage>
        {/* kepala → kertas */}
        <g opacity={(1 - out) * ramp(t, 0, 0.8)}>
          <circle cx={250} cy={330} r={110} fill="none" stroke={C.ink} strokeOpacity={0.25} strokeWidth={3} strokeDasharray="6 10" />
          {DOTS.map((d, i) => {
            const fl = ramp(t, 1.2 + d.k * 2.2, 2.4 + d.k * 2.2);
            const x0 = 250 + d.r * Math.cos(d.a + t * 0.6);
            const y0 = 330 + d.r * Math.sin(d.a + t * 0.6);
            const x1 = 1680 + (d.k - 0.5) * 120;
            const y1 = 280 + d.row * 34;
            return <circle key={i} cx={x0 + (x1 - x0) * fl} cy={y0 + (y1 - y0) * fl} r={6 - 3 * fl} fill={i % 3 === 0 ? C.gold : C.blue} opacity={0.75 * (1 - fl * 0.9)} />;
          })}
          <rect x={1555} y={220} width={250} height={230} rx={8} fill={C.paper} filter="url(#paper-shadow)" />
          {Array.from({length: 5}, (_, i) => (
            <rect key={i} x={1580} y={276 + i * 34} width={(160 + 40 * Math.sin(i * 2.1)) * ramp(t, 2 + i * 0.35, 2.8 + i * 0.35)} height={8} rx={4} fill={C.ink} opacity={0.5} />
          ))}
        </g>
        <DrawPath d="M640,566 C820,580 1100,558 1290,572" p={und * (1 - out)} stroke={C.red} width={6} len={700} />
      </Stage>
      <div style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center', opacity: 1 - out}}>
        <BrandCapsule opacity={cap} scale={0.9 + 0.1 * cap} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', opacity: 1 - out, translate: `0px ${-14 * out}px`}}>
        <TypeText parts={segs('Dari Kepala ke Kertas')} p={typ} t={t} size={118} font="serif" lh={1.2} align="center" style={{fontWeight: 600, letterSpacing: -1}} />
        <div style={{marginTop: 40, fontFamily: FONT.sans, fontSize: 40, color: C.muted, opacity: sub, translate: `0px ${(1 - sub) * 12}px`}}>
          Menulis karya ilmiah dari nol
        </div>
        <div style={{marginTop: 34, display: 'flex', justifyContent: 'center', gap: 18}}>
          {chips.map((c, i) => {
            const a = ramp(t, 3.4 + i * 0.25, 4 + i * 0.25);
            return (
              <span
                key={c}
                style={{
                  opacity: a,
                  translate: `0px ${(1 - a) * 14}px`,
                  padding: '6px 18px',
                  borderRadius: 8,
                  border: `2px solid ${C.ink}30`,
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  color: C.ink,
                  background: C.paper,
                }}
              >
                {c}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
