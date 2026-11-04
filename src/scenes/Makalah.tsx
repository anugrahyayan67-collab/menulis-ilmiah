import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Item, Panel} from '../components/kit';
import {Label, Stage} from '../components/primitives';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PYR = [
  {t: 'Keadaan umum', w: 700, c: C.blue},
  {t: 'Masalah', w: 520, c: C.violet},
  {t: 'Mengapa penting dibahas', w: 340, c: C.amber},
];

export const Makalah: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const sA = slot(t, cue(0) - 0.2, cue(4) - 0.1);
  const sB = ramp(t, cue(4) - 0.1, cue(4) + 0.5);
  const sec = (w: string) => ramp(t, wordOf(1, w) - 0.15, wordOf(1, w) + 0.4);
  const pyr = (i: number) => ramp(t, cue(2) + 0.8 + i * 0.9, cue(2) + 1.3 + i * 0.9, BACK);
  const map = ramp(t, cue(3) - 0.1, cue(3) + 0.8);
  const ide = (w: string) => ramp(t, wordOf(4, w) - 0.15, wordOf(4, w) + 0.4, BACK);
  const jury = (w: string) => ramp(t, wordOf(5, w) - 0.2, wordOf(5, w) + 0.4);
  return (
    <>
      <Panel x={120} y={195} w={700} h={650} p={sA} title="makalah" col={C.blue}>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30}}>BAB I Pendahuluan</div>
        {[
          {w: 'latar', t: '1.1 Latar belakang'},
          {w: 'rumusan', t: '1.2 Rumusan masalah'},
          {w: 'tujuan', t: '1.3 Tujuan penulisan'},
        ].map((x) => (
          <div key={x.w} style={{marginLeft: 26, marginTop: 10, fontFamily: FONT.sans, fontSize: 27, opacity: 0.3 + 0.7 * sec(x.w)}}>{x.t}</div>
        ))}
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, marginTop: 26}}>BAB II Pembahasan</div>
        {['2.1 … (menjawab rumusan 1)', '2.2 … (menjawab rumusan 2)'].map((x) => (
          <div key={x} style={{marginLeft: 26, marginTop: 10, fontFamily: FONT.sans, fontSize: 27, opacity: 0.3 + 0.7 * map}}>{x}</div>
        ))}
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, marginTop: 26}}>BAB III Penutup</div>
        <div style={{marginLeft: 26, marginTop: 10, fontFamily: FONT.sans, fontSize: 27, opacity: 0.3 + 0.7 * map}}>3.1 Simpulan</div>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, marginTop: 26}}>Daftar Pustaka</div>
      </Panel>
      <div style={{opacity: sA}}>
        <div style={{position: 'absolute', left: 900, top: 205, fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.ink, opacity: ramp(t, cue(2) - 0.1, cue(2) + 0.5)}}>
          Latar belakang = piramida terbalik
        </div>
        <Stage>
          {PYR.map((p, i) => {
            const q = Math.min(1, pyr(i));
            const y = 290 + i * 120;
            const w1 = p.w;
            const w2 = i < 2 ? PYR[i + 1].w : p.w - 180;
            return (
              <g key={p.t} opacity={q} transform={`translate(0 ${((1 - q) * -16).toFixed(2)})`}>
                <path d={`M${1350 - w1 / 2},${y} L${1350 + w1 / 2},${y} L${1350 + w2 / 2},${y + 104} L${1350 - w2 / 2},${y + 104} Z`} fill={p.c} fillOpacity={0.14} stroke={p.c} strokeWidth={3} strokeLinejoin="round" />
                <Label x={1350} y={y + 52} size={i === 2 ? 24 : 30} weight={800} halo={false}>
                  {p.t}
                </Label>
              </g>
            );
          })}
        </Stage>
        <div style={{position: 'absolute', left: 900, top: 680, width: 900, fontFamily: FONT.sans, fontSize: 28, color: C.ink, opacity: map}}>
          rumusan masalah 1, 2 → dijawab di subbab 2.1, 2.2 → penutup: simpulan
        </div>
      </div>
      <Panel x={120} y={195} w={1690} h={650} p={sB} title="karya tulis lomba" col={C.amber}>
        <div style={{display: 'flex', gap: 24}}>
          {[
            {w: 'solusinya', t: 'Solusi', d: 'apa gagasannya?'},
            {w: 'kebaruannya', t: 'Kebaruan', d: 'apa bedanya dengan yang sudah ada?'},
            {w: 'menerapkannya', t: 'Penerapan', d: 'bagaimana langkah nyatanya?'},
          ].map((x) => {
            const q = ide(x.w);
            return (
              <div key={x.w} style={{flex: 1, padding: '22px 24px', borderRadius: 16, background: '#fff7ec', border: `2px solid ${C.amber}`, opacity: Math.min(1, q), transform: `translateY(${((1 - Math.min(1, q)) * 18).toFixed(2)}px)`}}>
                <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.amber}}>{x.t}</div>
                <div style={{fontFamily: FONT.sans, fontSize: 26, color: C.ink, marginTop: 6}}>{x.d}</div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 34, fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.muted, opacity: ramp(t, cue(5) - 0.1, cue(5) + 0.4)}}>yang biasanya dinilai juri:</div>
        <div style={{display: 'flex', gap: 40}}>
          <Item p={jury('kejelasan')} size={28}>kejelasan masalah</Item>
          <Item p={jury('kekuatan')} size={28}>kekuatan data & sumber</Item>
          <Item p={jury('masuk')} size={28}>gagasan masuk akal</Item>
        </div>
      </Panel>
    </>
  );
};
