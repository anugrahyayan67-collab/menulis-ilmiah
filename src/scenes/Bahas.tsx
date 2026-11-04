import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp} from '../anim';
import {Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const STEPS = [
  {n: '1', t: 'Nyatakan hasil', c: C.blue, s: 'Ekstrak kubis ungu berwarna merah dalam larutan HCl.'},
  {n: '2', t: 'Jelaskan mengapa', c: C.violet, s: 'Hal ini terjadi karena struktur antosianin berubah mengikuti pH larutan (Leba et al., 2023).'},
  {n: '3', t: 'Bandingkan', c: C.amber, s: 'Hasil ini sesuai dengan hipotesis.'},
  {n: '4', t: 'Penyimpangan', c: C.red, s: 'Warna merah yang teramati agak pudar, kemungkinan karena ekstrak terlalu encer.'},
];

export const Bahas: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const head = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const on = (i: number) => ramp(t, cue(i + 1) - 0.2, cue(i + 1) + 0.4);
  const loop = ramp(t, cue(5) - 0.1, cue(5) + 1.2);
  const done = ramp(t, wordOf(5, 'tujuan') - 0.2, wordOf(5, 'tujuan') + 0.5, BACK);
  return (
    <>
      <div style={{position: 'absolute', left: 120, top: 196, fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.ink, opacity: head}}>
        Pembahasan dengan pola tetap
      </div>
      {STEPS.map((s, i) => {
        const q = on(i);
        return (
          <div
            key={s.n}
            style={{
              position: 'absolute',
              left: 120,
              top: 280 + i * 120,
              width: 560,
              height: 100,
              boxSizing: 'border-box',
              borderRadius: 16,
              border: `2px solid ${interpolateColors(q, [0, 1], [C.faint, s.c])}`,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '0 22px',
              opacity: 0.35 + 0.65 * q,
            }}
          >
            <span style={{width: 56, height: 56, borderRadius: 28, background: s.c, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 + 0.7 * q}}>{s.n}</span>
            <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.ink}}>{s.t}</span>
          </div>
        );
      })}
      <Panel x={740} y={280} w={1070} h={470} p={on(0)} title="paragraf pembahasan" col={C.blue}>
        <div style={{fontFamily: FONT.serif, fontSize: 31, lineHeight: 1.65, color: C.ink}}>
          {STEPS.map((s, i) => (
            <span key={s.n} style={{opacity: on(i), borderBottom: `4px solid ${s.c}`, marginRight: 8}}>
              {s.s}
            </span>
          ))}
        </div>
      </Panel>
      <div style={{position: 'absolute', left: 120, top: 770, width: 1690, display: 'flex', alignItems: 'center', gap: 22, opacity: loop}}>
        <svg width={70} height={70} viewBox="-35 -35 70 70">
          <circle r={24} fill="none" stroke={C.mint} strokeWidth={6} strokeDasharray={`${(150 * loop).toFixed(1)} 200`} transform="rotate(-90)" />
          <path d="M0,-34 L10,-24 L0,-14" fill="none" stroke={C.mint} strokeWidth={6} strokeLinecap="round" />
        </svg>
        <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.ink}}>ulangi untuk setiap hasil</span>
        <span style={{marginLeft: 20, padding: '8px 20px', borderRadius: 12, background: C.mint, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, opacity: Math.min(1, done), transform: `scale(${(0.85 + 0.15 * Math.min(1, done)).toFixed(3)})`}}>semua tujuan terjawab ✓</span>
      </div>
    </>
  );
};
