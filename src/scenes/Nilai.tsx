import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Item, Panel, Stamp} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const FLAGS = ['janji terbit sangat cepat', 'biaya tanpa proses telaah yang jelas', 'undangan massal lewat surel', 'mencantumkan indeks yang tidak jelas'];

export const Nilai: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const s1 = slot(t, cue(0) - 0.2, cue(4) - 0.1);
  const s2 = ramp(t, cue(4) - 0.1, cue(4) + 0.5);
  const doubt = ramp(t, wordOf(0, 'layak') - 0.3, wordOf(0, 'layak') + 0.4, BACK);
  const pr = ramp(t, wordOf(1, 'peer') - 0.2, wordOf(1, 'ahli') + 0.4);
  const sinta = ramp(t, wordOf(2, 'SINTA') - 0.2, wordOf(2, 'SINTA') + 0.4);
  const rank = ramp(t, wordOf(2, 'peringkatnya') - 0.3, wordOf(2, 'peringkatnya') + 0.6);
  const pred = ramp(t, cue(3) - 0.2, cue(3) + 0.5);
  const book = ramp(t, cue(5) - 0.2, cue(5) + 0.5, BACK);
  return (
    <>
      <Panel x={120} y={200} w={800} h={630} p={s1} title="layak dikutip?" col={C.blue}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{width: 120, height: 150, borderRadius: 12, border: `2px solid ${C.faint}`, position: 'relative', flex: 'none'}}>
            {[0, 1, 2, 3, 4].map((k) => (
              <div key={k} style={{position: 'absolute', left: 16, top: 22 + k * 22, width: 88 - (k % 2) * 20, height: 6, borderRadius: 3, background: C.ink, opacity: 0.25}} />
            ))}
            <span style={{position: 'absolute', right: -18, top: -18, width: 46, height: 46, borderRadius: 23, background: C.amber, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, doubt)}}>?</span>
          </div>
          <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.ink, lineHeight: 1.35}}>Terlihat seperti jurnal belum tentu layak dikutip.</div>
        </div>
        <Item p={pr} size={30} gap={34}>
          <b>Peer review</b>: naskah ditelaah ahli sebelum terbit
        </Item>
        <Item p={sinta} size={30}>
          Terdaftar di <b>SINTA</b>
        </Item>
        <div style={{display: 'flex', gap: 10, marginTop: 20, marginLeft: 54}}>
          {[1, 2, 3, 4, 5, 6].map((s, i) => {
            const q = ramp(rank * 6, i, i + 0.8);
            return (
              <span key={s} style={{width: 92, padding: '10px 0', textAlign: 'center', borderRadius: 10, fontFamily: FONT.mono, fontWeight: 600, fontSize: 24, color: interpolateColors(q, [0, 1], [C.muted, '#ffffff']), background: interpolateColors(q, [0, 1], ['#ffffff', C.cyan]), opacity: 0.3 + 0.7 * (1 - i * 0.1) * Math.min(1, q * 3), border: `2px solid ${C.cyan}`}}>
                S{s}
              </span>
            );
          })}
        </div>
        <div style={{marginLeft: 54, marginTop: 8, fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: rank}}>S1 tertinggi · S6 terendah</div>
      </Panel>
      <Panel x={980} y={200} w={820} h={630} p={Math.min(s1, pred)} title="tanda jurnal predator" col={C.red}>
        {FLAGS.map((f, i) => {
          const q = ramp(t, cue(3) + 0.5 + i * 0.6, cue(3) + 1 + i * 0.6);
          return (
            <Item key={f} p={q} cross size={30} gap={26}>
              {f}
            </Item>
          );
        })}
      </Panel>
      <Stamp p={ramp(t, wordOf(3, 'surel') - 0.1, wordOf(3, 'surel') + 0.4) * s1} text="HINDARI" x={1610} y={720} rot={-8} />
      <Panel x={120} y={200} w={980} h={630} p={s2} title="nilai isinya" col={C.mint}>
        {[
          {w: 'relevan', t: 'Relevan dengan pertanyaanmu?'},
          {w: 'baru', t: 'Cukup baru? (jurnal: misalnya 5 tahun terakhir)'},
          {w: 'metodenya', t: 'Metodenya jelas dan bisa diikuti?'},
        ].map((x) => (
          <Item key={x.w} p={ramp(t, wordOf(4, x.w) - 0.15, wordOf(4, x.w) + 0.45)} size={32} gap={36}>
            {x.t}
          </Item>
        ))}
      </Panel>
      <div
        style={{
          position: 'absolute',
          left: 1170,
          top: 260,
          width: 620,
          opacity: Math.min(1, book) * s2,
          transform: `translateY(${((1 - Math.min(1, book)) * 20).toFixed(2)}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div style={{width: 230, height: 300, borderRadius: 12, background: C.blue, boxShadow: '10px 10px 0 #1d3f9e', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: FONT.sans, fontWeight: 800}}>
          <span style={{fontSize: 34}}>Buku</span>
          <span style={{fontSize: 34}}>teks</span>
          <span style={{fontSize: 20, fontWeight: 600, opacity: 0.8, marginTop: 10}}>konsep dasar</span>
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.ink, textAlign: 'center', lineHeight: 1.35}}>
          tetap kuat untuk konsep dasar,
          <br />
          walaupun terbitnya agak lama
        </div>
      </div>
    </>
  );
};
