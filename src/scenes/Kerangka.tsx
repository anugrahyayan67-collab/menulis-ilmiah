import React from 'react';
import {BACK, ramp} from '../anim';
import {Label, Stage} from '../components/primitives';
import {Check, Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const NODES = [
  {n: '1', text: 'Asam dan basa', w: 980, word: 'asam', src: 'Overby & Chang (2022) · hlm. 138', col: C.blue},
  {n: '2', text: 'pH', w: 880, word: 'pH', src: 'Marka et al. (2025) · hlm. 137', col: C.cyan},
  {n: '3', text: 'Indikator', w: 780, word: 'indikator', src: 'Overby & Chang (2022) · hlm. 744', col: C.violet},
  {n: '4', text: 'Antosianin', w: 680, word: 'antosianin', src: 'Marka et al. (2025) · hlm. 135–136', col: '#7f45a0'},
];

export const Kerangka: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const head = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const um = ramp(t, wordOf(2, 'umum') - 0.3, wordOf(2, 'umum') + 0.8);
  return (
    <>
      <div style={{position: 'absolute', left: 200, top: 180, opacity: head}}>
        <Kicker color={C.blue}>kerangka</Kicker>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 46, color: C.ink}}>BAB II · Dasar Teori</div>
      </div>
      <Stage>
        {/* panah umum → khusus */}
        <g opacity={um}>
          <line x1={140} y1={340} x2={140} y2={340 + 480 * um} stroke={C.ink} strokeWidth={5} strokeLinecap="round" markerEnd="url(#arrow-ink)" />
          <Label x={140} y={312} size={24} weight={700} color={C.muted}>
            umum
          </Label>
          <Label x={140} y={856} size={24} weight={700} color={C.muted}>
            khusus
          </Label>
        </g>
      </Stage>
      {NODES.map((nd, i) => {
        const a = ramp(t, wordOf(1, nd.word) - 0.2, wordOf(1, nd.word) + 0.5, BACK);
        const y = 330 + i * 140;
        const w = 830 + (nd.w - 830) * um;
        const chip = ramp(t, cue(3) + 0.3 + i * 0.45, cue(3) + 0.9 + i * 0.45, BACK);
        const ok = ramp(t, cue(4) + 0.4 + i * 0.4, cue(4) + 0.9 + i * 0.4);
        return (
          <React.Fragment key={nd.n}>
            <div style={{position: 'absolute', left: 200, top: y, width: 830, height: 100, boxSizing: 'border-box', borderRadius: 14, border: `2px dashed ${C.faint}`, opacity: head * (1 - Math.min(1, a))}} />
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: y,
                width: w * Math.min(1, a),
                height: 100,
                opacity: Math.min(1, a),
                background: '#fff',
                border: `1.5px solid ${C.faint}`,
                borderLeft: `10px solid ${nd.col}`,
                borderRadius: 14,
                boxShadow: '0 8px 22px rgba(22,33,62,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '0 26px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 30, color: nd.col}}>{nd.n}</span>
              <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 38, color: C.ink, flex: 1}}>{nd.text}</span>
              <span style={{display: 'flex', gap: 10, alignItems: 'center', fontFamily: FONT.sans, fontSize: 20, color: C.mint, fontWeight: 600, opacity: Math.min(1, ok * 3)}}>
                <Check p={ok} size={24} /> bahan
                <Check p={ok} size={24} /> sumber
              </span>
            </div>
            {/* kartu catatan yang ditempel */}
            <div
              style={{
                position: 'absolute',
                left: 200 + w + 28,
                top: y + 50,
                transform: `translate(${((1 - Math.min(1, chip)) * 160).toFixed(2)}px, -50%) rotate(${(1.5 - i).toFixed(1)}deg)`,
                opacity: Math.min(1, chip),
                background: '#fff4c2',
                border: '1.5px solid #f0d76a',
                borderRadius: 10,
                padding: '10px 16px',
                fontFamily: FONT.sans,
                fontSize: 21,
                color: C.ink,
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 16px rgba(22,33,62,0.1)',
              }}
            >
              <span style={{color: C.red, fontWeight: 700}}>kartu · </span>
              {nd.src}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
