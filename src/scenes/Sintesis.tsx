import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Panel, Pill} from '../components/kit';
import {TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const SOLO = [
  {s: 'Marka et al. (2025)', t: 'menyatakan antosianin berubah warna pada pH tertentu.'},
  {s: 'Leba et al. (2023)', t: 'menjelaskan perubahan bentuk antosianin pada pH berbeda.'},
  {s: 'Ayun et al. (2022)', t: 'meneliti antosianin dari kulit buah naga.'},
];
const SRC = ['Overby & Chang (2022)', 'Marka et al. (2025)', 'Ayun et al. (2022)', 'Leba et al. (2023)'];
const HAS = [0, 1, 1, 1];

export const Sintesis: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const sA = slot(t, cue(0) - 0.2, cue(2) - 0.1);
  const sB = slot(t, cue(2) - 0.1, cue(4) - 0.1);
  const sC = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const sD = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const right = ramp(t, wordOf(1, 'sintesis') - 0.2, wordOf(1, 'sintesis') + 0.5);
  const col = ramp(t, wordOf(2, 'antosianin') - 0.2, wordOf(2, 'antosianin') + 0.5);
  const typ = ramp(t, cue(3) - 0.2, cueEnd(4) + 0.5, (x) => x);
  const cite = ramp(t, wordOf(3, 'sekaligus') - 0.2, wordOf(3, 'sekaligus') + 0.6);
  const par = segs(
    'Antosianin merupakan pigmen alami yang warnanya berubah mengikuti pH ',
    {t: '(Leba et al., 2023; Marka et al., 2025)', hl: cite},
    '. ',
    {t: 'Selain itu', under: ramp(t, wordOf(4, 'menambahkan') - 0.2, wordOf(4, 'menambahkan') + 0.5), underColor: C.blue},
    ', antosianin juga terkandung dalam kulit buah naga merah yang dapat dimanfaatkan sebagai indikator alami (Ayun et al., 2022).',
  );
  return (
    <>
      {/* A: ringkasan satu per satu */}
      <Panel x={120} y={200} w={800} h={620} p={sA} title="ringkasan satu per satu" col={C.red}>
        {SOLO.map((s, i) => {
          const q = ramp(t, cue(0) + 0.4 + i * 0.5, cue(0) + 0.9 + i * 0.5);
          return (
            <div key={i} style={{marginTop: 18, padding: '16px 20px', borderRadius: 12, border: `2px solid ${C.faint}`, fontFamily: FONT.serif, fontSize: 27, lineHeight: 1.45, opacity: q, transform: `rotate(${((i - 1) * 1.2).toFixed(1)}deg)`}}>
              <b>{s.s}</b> {s.t}
            </div>
          );
        })}
        <div style={{marginTop: 24, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.red, opacity: ramp(t, wordOf(0, 'tumpukan') - 0.2, wordOf(0, 'tumpukan') + 0.4)}}>→ terasa seperti tumpukan catatan</div>
      </Panel>
      {/* B: kolom matriks */}
      <Panel x={120} y={200} w={800} h={620} p={sB} title="matriks sumber · kolom antosianin" col={C.violet}>
        {SRC.map((s, i) => {
          const on = HAS[i] * col;
          return (
            <div key={s} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 18px', marginTop: 10, borderRadius: 12, background: interpolateColors(on, [0, 1], ['#ffffff', '#efe9fd']), border: `2px solid ${interpolateColors(on, [0, 1], [C.faint, C.violet])}`, fontFamily: FONT.sans, fontSize: 28}}>
              <span>{s}</span>
              <span style={{width: 28, height: 28, borderRadius: 14, background: HAS[i] ? C.violet : C.faint, opacity: HAS[i] ? 0.4 + 0.6 * col : 0.6}} />
            </div>
          );
        })}
        <div style={{marginTop: 20, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: col}}>3 sumber → satu paragraf</div>
      </Panel>
      {/* C: kata penyambung antarsumber */}
      <Panel x={120} y={200} w={800} h={620} p={sC} title="menyambungkan antarsumber" col={C.blue}>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.mint, marginTop: 6}}>saling melengkapi</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12}}>
          {['Selain itu, …', 'Hal ini sejalan dengan …', '… juga melaporkan …'].map((x) => (
            <Pill key={x} on={ramp(t, wordOf(4, 'menambahkan') - 0.2, wordOf(4, 'menambahkan') + 0.4)} col={C.mint} size={26}>
              {x}
            </Pill>
          ))}
        </div>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.amber, marginTop: 40}}>hasilnya berbeda</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12}}>
          {['Berbeda dengan …', 'Sementara itu, …'].map((x) => (
            <Pill key={x} on={ramp(t, wordOf(4, 'berbeda') - 0.2, wordOf(4, 'berbeda') + 0.4)} col={C.amber} size={26}>
              {x}
            </Pill>
          ))}
        </div>
      </Panel>
      {/* D: membaca kritis */}
      <Panel x={120} y={200} w={800} h={620} p={sD} title="membaca kritis" col={C.cyan}>
        {[
          {w: 'klaim', t: 'Klaim', d: 'apa yang dinyatakan penulis?'},
          {w: 'bukti', t: 'Bukti', d: 'data atau rujukan apa yang mendukungnya?'},
          {w: 'batasannya', t: 'Batasan', d: 'berlaku pada kondisi apa saja?'},
        ].map((x) => {
          const q = ramp(t, wordOf(5, x.w) - 0.15, wordOf(5, x.w) + 0.4, BACK);
          return (
            <div key={x.w} style={{marginTop: 22, padding: '18px 22px', borderRadius: 14, borderLeft: `8px solid ${C.cyan}`, background: '#f2fafb', opacity: Math.min(1, q), transform: `translateX(${((1 - Math.min(1, q)) * -20).toFixed(2)}px)`}}>
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: C.cyan}}>{x.t}</div>
              <div style={{fontFamily: FONT.sans, fontSize: 26, color: C.ink}}>{x.d}</div>
            </div>
          );
        })}
      </Panel>
      {/* paragraf sintesis */}
      <Panel x={980} y={200} w={830} h={620} p={right} title="paragraf sintesis" col={C.mint}>
        <TypeText parts={par} p={typ} t={t} size={31} lh={1.65} />
      </Panel>
    </>
  );
};
