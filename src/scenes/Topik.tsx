import React from 'react';
import {BACK, EASE_IN_OUT, ramp} from '../anim';
import {DrawPath, Label, Stage} from '../components/primitives';
import {Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const lin = (x: number) => x;
const BANDS = [
  {text: 'Indikator asam basa', w: 640, col: C.muted},
  {text: 'Indikator alami', w: 480, col: C.blue},
  {text: 'Kubis ungu', w: 320, col: '#7f45a0'},
];
const SPREAD = ['titrasi', 'pH meter', 'indikator sintetis', 'trayek pH', 'sejarah', 'kertas lakmus', 'industri'];

export const Topik: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const wide = ramp(t, cue(0) - 0.4, cue(0) + 0.5);
  const spread = Math.min(ramp(t, wordOf(0, 'melebar') - 0.3, wordOf(0, 'melebar') + 1.2), 1 - ramp(t, cue(1) + 0.2, cue(1) + 1, EASE_IN_OUT));
  const b1 = ramp(t, wordOf(1, 'persempit') - 0.2, wordOf(1, 'persempit') + 0.5, BACK);
  const b2 = ramp(t, wordOf(1, 'kubis') - 0.2, wordOf(1, 'kubis') + 0.5, BACK);
  const q = ramp(t, cue(2) - 0.2, cue(2) + 0.5);
  const qT = ramp(t, wordOf(2, 'bagaimana') - 0.1, cueEnd(2) + 0.3, lin);
  const comp = ramp(t, cue(3) - 0.2, cue(3) + 0.6);
  const needle = 60 - 150 * ramp(t, cue(3), cue(3) + 2.2, BACK) + 4 * Math.sin(t * 2.2) * (1 - ramp(t, cue(3), cue(3) + 3));
  const tj = ramp(t, cue(4) - 0.2, cue(4) + 0.5);
  const tjT = ramp(t, wordOf(4, 'mengetahui') - 0.1, cueEnd(4) + 0.3, lin);
  const verbs = ['mengetahui', 'menentukan', 'membandingkan'];
  const bands = [wide, b1, b2];
  const arrow = ramp(t, cue(2) - 0.4, cue(2) + 0.6);
  return (
    <>
      <Stage>
        {BANDS.map((b, i) => {
          const a = bands[i];
          const y = 250 + i * 150;
          const nextW = i < 2 ? BANDS[i + 1].w : b.w - 80;
          const d = `M${440 - b.w / 2},${y} L${440 + b.w / 2},${y} L${440 + nextW / 2},${y + 120} L${440 - nextW / 2},${y + 120} Z`;
          return (
            <g key={i} opacity={Math.min(1, a)} transform={`translate(0 ${(1 - Math.min(1, a)) * -20})`}>
              <path d={d} fill={`${b.col}${i === 2 ? '33' : '1c'}`} stroke={b.col} strokeWidth={2.5} strokeLinejoin="round" />
              <Label x={440} y={y + 60} size={i === 2 ? 40 : 36} weight={700} color={i === 2 ? '#6a3591' : C.ink}>
                {b.text}
              </Label>
            </g>
          );
        })}
        {SPREAD.map((s, i) => {
          const ang = Math.PI * 0.12 + (i / (SPREAD.length - 1)) * Math.PI * 0.76;
          const r = 120 + 170 * spread;
          const x = 440 + r * Math.cos(ang) * 1.15;
          const y = 330 + r * Math.sin(ang);
          return (
            <g key={s} opacity={spread}>
              <line x1={440} y1={310} x2={x} y2={y} stroke={C.muted} strokeWidth={2} strokeDasharray="5 7" />
              <rect x={x - 90} y={y - 22} width={180} height={44} rx={22} fill="#fff" stroke={C.faint} strokeWidth={2} />
              <Label x={x} y={y} size={22} color={C.muted}>
                {s}
              </Label>
            </g>
          );
        })}
        <DrawPath d="M560,640 C700,630 790,520 850,330" p={arrow} stroke={C.blue} width={4} len={600} />
        {/* kompas */}
        <g transform="translate(1720 300)" opacity={comp}>
          <circle r={62} fill="#fff" stroke={C.ink} strokeWidth={4} />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1={0} y1={-52} x2={0} y2={-42} stroke={C.ink} strokeWidth={4} transform={`rotate(${a})`} />
          ))}
          <g transform={`rotate(${needle})`}>
            <path d="M0,-46 L10,0 L0,8 L-10,0 Z" fill={C.red} />
            <path d="M0,46 L10,0 L0,-8 L-10,0 Z" fill={C.ink} opacity={0.5} />
          </g>
          <circle r={6} fill={C.ink} />
        </g>
      </Stage>
      <Paper x={870} y={200} w={760} h={220} opacity={q} lift={1 - q} accent={C.blue} pad="22px 32px">
        <Kicker color={C.blue}>Pertanyaan</Kicker>
        <TypeText parts={segs('Bagaimana perubahan warna ekstrak kubis ungu pada larutan asam dan basa?')} p={qT} t={t} size={36} lh={1.4} style={{marginTop: 10}} />
      </Paper>
      <Paper x={870} y={460} w={930} h={200} opacity={tj} lift={1 - tj} accent={C.mint} pad="22px 32px">
        <Kicker color={C.mint}>Tujuan</Kicker>
        <TypeText
          parts={segs({t: 'Mengetahui', hl: ramp(t, wordOf(5, 'mengetahui'), wordOf(5, 'mengetahui') + 0.5)}, ' perubahan warna ekstrak kubis ungu pada berbagai pH.')}
          p={tjT}
          t={t}
          size={36}
          lh={1.4}
          style={{marginTop: 10}}
        />
      </Paper>
      <div style={{position: 'absolute', left: 870, top: 710, display: 'flex', gap: 22, alignItems: 'center'}}>
        <div style={{fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, cue(5) - 0.2, cue(5) + 0.4)}}>kata kerja terukur:</div>
        {verbs.map((v) => {
          const a = ramp(t, wordOf(5, v) - 0.15, wordOf(5, v) + 0.4, BACK);
          return (
            <span
              key={v}
              style={{
                opacity: Math.min(1, a),
                transform: `translateY(${((1 - Math.min(1, a)) * 14).toFixed(2)}px)`,
                padding: '8px 20px',
                borderRadius: 12,
                background: '#fff',
                border: `2px solid ${C.mint}`,
                fontFamily: FONT.sans,
                fontWeight: 700,
                fontSize: 28,
                color: C.mint,
              }}
            >
              {v}
            </span>
          );
        })}
      </div>
    </>
  );
};
