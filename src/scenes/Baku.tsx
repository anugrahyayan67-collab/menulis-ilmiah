import React from 'react';
import {ramp, slot} from '../anim';
import {Fix, Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PAIRS: {bad: string; good: string; line: number; w: string}[] = [
  {bad: 'analisa', good: 'analisis', line: 1, w: 'analisa'},
  {bad: 'praktek', good: 'praktik', line: 1, w: 'praktek'},
  {bad: 'hipotesa', good: 'hipotesis', line: 2, w: 'Hipotesa'},
  {bad: 'resiko', good: 'risiko', line: 2, w: 'resiko'},
  {bad: 'sistim', good: 'sistem', line: 2, w: 'sistim'},
];

export const Baku: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const sA = slot(t, cue(0) - 0.2, cue(3) - 0.1);
  const sB = slot(t, cue(3) - 0.1, cue(5) - 0.1);
  const sC = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const kbbi = ramp(t, wordOf(4, 'KBBI') - 0.2, wordOf(4, 'KBBI') + 0.5);
  const pr = (w: string, line: number) => ramp(t, wordOf(line, w) - 0.1, wordOf(line, w) + 1.0);
  return (
    <>
      <Panel x={360} y={200} w={1200} h={630} p={sA} title="kata baku" col={C.blue}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 60}}>
          {PAIRS.map((p) => (
            <Fix key={p.bad} bad={p.bad} good={p.good} p={pr(p.w, p.line)} size={44} />
          ))}
        </div>
        <div style={{marginTop: 40, fontFamily: FONT.sans, fontSize: 28, color: C.muted, opacity: ramp(t, cue(0) + 1, cue(0) + 1.6)}}>salah tulis karena terbawa kebiasaan</div>
      </Panel>
      <Panel x={120} y={200} w={820} h={630} p={sB} title="hindari bahasa percakapan" col={C.red}>
        {['nggak', 'banget', 'gimana'].map((w, i) => {
          const q = ramp(t, wordOf(3, w) - 0.1, wordOf(3, w) + 0.6);
          return (
            <div key={w} style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 52, color: C.muted, marginTop: 24, position: 'relative', width: 'fit-content'}}>
              {w}
              <span style={{position: 'absolute', left: -6, top: '55%', height: 6, width: `calc(${(q * 100).toFixed(1)}% + 12px)`, background: C.red, borderRadius: 3}} />
              <span style={{display: 'none'}}>{i}</span>
            </div>
          );
        })}
      </Panel>
      <Panel x={980} y={200} w={820} h={630} p={sB * Math.min(1, kbbi * 2)} title="kalau ragu" col={C.cyan}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 70, borderRadius: 35, border: `2px solid ${C.cyan}`, padding: '0 26px', fontFamily: FONT.sans, fontSize: 32}}>
          <span style={{color: C.cyan, fontWeight: 800}}>KBBI daring</span>
          <span style={{color: C.muted}}>|</span>
          <span>praktek</span>
        </div>
        <div style={{marginTop: 30, padding: '20px 26px', borderRadius: 14, background: '#f2fafb', fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.6, opacity: kbbi}}>
          <b>praktek</b> <span style={{color: C.muted}}>bentuk tidak baku dari</span> <b style={{color: C.cyan}}>praktik</b>
        </div>
      </Panel>
      <Panel x={260} y={200} w={1400} h={630} p={sC} title="kata ganti orang" col={C.violet}>
        <Fix bad="Kami memanaskan larutan selama lima menit." good="Larutan dipanaskan selama lima menit." p={ramp(t, wordOf(5, 'pasif') - 0.4, wordOf(5, 'pasif') + 0.8)} size={36} />
        <div style={{marginTop: 40, fontFamily: FONT.sans, fontSize: 30, color: C.ink, opacity: ramp(t, wordOf(5, 'objeknya') - 0.2, wordOf(5, 'objeknya') + 0.4)}}>
          atau sebut objeknya langsung: <i style={{fontFamily: FONT.serif}}>“Larutan berubah warna menjadi merah.”</i>
        </div>
      </Panel>
    </>
  );
};
