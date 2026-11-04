import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const STAGES = [
  {t: 'Rencana', w: 'merencanakan', c: C.blue},
  {t: 'Sumber', w: 'mencari', c: C.cyan},
  {t: 'Draf', w: 'draf', c: C.violet},
  {t: 'Revisi', w: 'merevisi', c: C.amber},
  {t: 'Sunting', w: 'menyunting', c: C.mint},
];
const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'];
const SECS = ['Tujuan', 'Dasar teori', 'Cara kerja', 'Hasil', 'Pembahasan', 'Simpulan'];

export const Alur: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const sA = slot(t, cue(2) - 0.2, cue(3) - 0.1);
  const sB = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const sC = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const sD = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const intro = Math.min(ramp(t, cue(0), cue(0) + 0.6), 1 - ramp(t, cue(2) - 0.4, cue(2)));
  return (
    <>
      {/* lima tahap */}
      <div style={{position: 'absolute', left: 120, top: 200, width: 1680, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {STAGES.map((s, i) => {
          const a = ramp(t, cue(0) + 0.3 + i * 0.25, cue(0) + 0.8 + i * 0.25, BACK);
          const on = ramp(t, wordOf(1, s.w) - 0.15, wordOf(1, s.w) + 0.35);
          return (
            <React.Fragment key={s.t}>
              <div
                style={{
                  width: 270,
                  height: 120,
                  borderRadius: 18,
                  background: interpolateColors(on, [0, 1], ['#ffffff', s.c]),
                  border: `2px solid ${s.c}`,
                  color: interpolateColors(on, [0, 1], [s.c, '#ffffff']),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT.sans,
                  opacity: Math.min(1, a),
                  transform: `translateY(${((1 - Math.min(1, a)) * 20 - 8 * on).toFixed(2)}px)`,
                }}
              >
                <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 600}}>tahap {i + 1}</span>
                <span style={{fontWeight: 800, fontSize: 36}}>{s.t}</span>
              </div>
              {i < 4 ? <span style={{fontSize: 40, color: C.muted, opacity: Math.min(1, a)}}>→</span> : null}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center', opacity: intro, fontFamily: FONT.sans, fontWeight: 700, fontSize: 48, color: C.ink}}>
        Satu tahap dalam satu waktu
      </div>
      {/* A: jadwal mundur */}
      <Panel x={120} y={400} w={1680} h={430} p={sA} title="jadwal mundur dari tenggat" col={C.blue}>
        <div style={{display: 'flex', gap: 20, marginTop: 20}}>
          {DAYS.map((d, i) => {
            const label = i === 2 ? 'draf selesai' : i === 3 ? 'revisi' : i === 4 ? 'tenggat' : i === 0 ? 'cari sumber' : 'menulis draf';
            const col = i === 4 ? C.red : i === 2 ? C.violet : i === 3 ? C.amber : C.cyan;
            const q = ramp(t, cue(2) + 2.2 - i * 0.4, cue(2) + 2.7 - i * 0.4);
            return (
              <div key={d} style={{flex: 1, height: 250, borderRadius: 16, border: `2px solid ${C.faint}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 22}}>
                <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, color: C.ink}}>{d}</span>
                <span style={{marginTop: 40, padding: '10px 16px', borderRadius: 12, background: col, color: '#fff', fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, opacity: q, transform: `scale(${(0.85 + 0.15 * q).toFixed(3)})`}}>{label}</span>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 16, fontFamily: FONT.sans, fontSize: 26, color: C.muted}}>susun dari kanan (tenggat) ke kiri</div>
      </Panel>
      {/* B: isi dulu */}
      <Panel x={420} y={400} w={1080} h={430} p={sB} title="saat menulis draf" col={C.violet}>
        <div style={{fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.6, color: C.ink}}>
          antosianin itu pigmen yg berubah warna kalau pHnya beda… <span style={{color: C.muted}}>(nanti cari sumber Marka)</span> terus kubis ungu bisa jadi indikator karena…
        </div>
        <div style={{display: 'flex', gap: 22, marginTop: 30}}>
          <span style={{padding: '10px 22px', borderRadius: 12, background: C.violet, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, opacity: ramp(t, wordOf(3, 'isi') - 0.2, wordOf(3, 'isi') + 0.3)}}>isi dulu</span>
          <span style={{padding: '10px 22px', borderRadius: 12, border: `2px dashed ${C.faint}`, color: C.muted, fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, opacity: ramp(t, wordOf(3, 'Ejaan') - 0.2, wordOf(3, 'Ejaan') + 0.3)}}>ejaan & kerapian → nanti</span>
        </div>
      </Panel>
      {/* C: mulai dari bagian termudah */}
      <Panel x={420} y={400} w={1080} h={430} p={sC} title="tidak harus berurutan" col={C.amber}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 10}}>
          {SECS.map((s, i) => {
            const easy = i === 2 || i === 3;
            const q = easy ? ramp(t, wordOf(4, 'mudah') - 0.2, wordOf(4, 'mudah') + 0.4, BACK) : 0;
            return (
              <div key={s} style={{width: 300, padding: '22px 0', textAlign: 'center', borderRadius: 14, border: `2px solid ${interpolateColors(Math.min(1, q), [0, 1], [C.faint, C.amber])}`, background: interpolateColors(Math.min(1, q), [0, 1], ['#ffffff', '#fff3e0']), fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: C.ink, transform: `scale(${(1 + 0.06 * Math.min(1, q)).toFixed(3)})`}}>
                {s}
                <div style={{fontFamily: FONT.mono, fontSize: 20, color: C.amber, opacity: Math.min(1, q), marginTop: 4}}>mulai di sini</div>
              </div>
            );
          })}
        </div>
      </Panel>
      {/* D: kemajuan harian */}
      <Panel x={420} y={400} w={1080} h={430} p={sD} title="sedikit demi sedikit" col={C.mint}>
        <div style={{display: 'flex', gap: 18, marginTop: 30, justifyContent: 'center'}}>
          {Array.from({length: 7}, (_, i) => {
            const q = ramp(t, cue(5) + 0.5 + i * 0.3, cue(5) + 0.9 + i * 0.3, BACK);
            return (
              <div key={i} style={{width: 110, height: 140, borderRadius: 14, border: `2px solid ${C.faint}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 14, position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${(Math.min(1, q) * 100).toFixed(1)}%`, background: `${C.mint}30`}} />
                <span style={{position: 'relative', fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: C.ink}}>hari {i + 1}</span>
                <span style={{position: 'relative', fontFamily: FONT.mono, fontSize: 18, color: C.mint, opacity: Math.min(1, q)}}>+1 ¶</span>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 30, textAlign: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.mint}}>satu paragraf sehari pun tetap kemajuan</div>
      </Panel>
    </>
  );
};
