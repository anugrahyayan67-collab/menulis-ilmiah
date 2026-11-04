import React from 'react';
import {BACK, ramp} from '../anim';
import {Panel, Stamp} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const hi = (p: number, col: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(${col}, ${col})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${(Math.min(1, p) * 100).toFixed(1)}% 0.5em`,
  backgroundPosition: '0 0.85em',
});

export const Judul: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const head = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const kw = ramp(t, wordOf(1, 'kunci') - 0.2, wordOf(1, 'kunci') + 0.5);
  const bad = ramp(t, cue(2) - 0.1, cue(2) + 0.5, BACK);
  const badX = ramp(t, wordOf(2, 'umum') - 0.2, wordOf(2, 'umum') + 0.4, BACK);
  const good = ramp(t, cue(3) - 0.1, cue(3) + 0.5, BACK);
  const k1 = ramp(t, wordOf(3, 'perubahan') - 0.1, wordOf(3, 'perubahan') + 0.6);
  const k2 = ramp(t, wordOf(3, 'kubis') - 0.2, wordOf(3, 'kubis') + 0.6);
  const k3 = ramp(t, wordOf(3, 'indikator') - 0.1, wordOf(3, 'indikator') + 0.6);
  const strike = ramp(t, wordOf(4, 'suatu') - 0.1, wordOf(4, 'suatu') + 0.8);
  const rule = ramp(t, cue(5) - 0.2, cue(5) + 0.6);
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', opacity: head}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 46, color: C.ink}}>Judul = bagian yang pertama dibaca</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 18, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28}}>
          {['ringkas', 'jelas', 'memuat kata kunci'].map((x, i) => (
            <span key={x} style={{padding: '6px 18px', borderRadius: 10, border: `2px solid ${C.blue}`, color: C.blue, opacity: i < 2 ? head : kw}}>
              {x}
            </span>
          ))}
        </div>
      </div>
      <Panel x={160} y={400} w={1600} p={bad} col={C.red} pad="22px 34px">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontFamily: FONT.serif, fontSize: 44, color: C.ink, position: 'relative'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 22, color: C.red, marginRight: 18}}>1</span>Studi tentang Warna
          </div>
          <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: C.red, opacity: Math.min(1, badX)}}>× terlalu umum</span>
        </div>
      </Panel>
      <Panel x={160} y={560} w={1600} p={good} col={C.mint} pad="22px 34px">
        <div style={{fontFamily: FONT.serif, fontSize: 44, color: C.ink, lineHeight: 1.45}}>
          <span style={{fontFamily: FONT.mono, fontSize: 22, color: C.mint, marginRight: 18}}>2</span>
          <span style={hi(k1, '#ffe58a')}>Perubahan Warna</span> <span style={hi(k2, '#d8c8f5')}>Ekstrak Kubis Ungu</span> sebagai <span style={hi(k3, '#bfe8d4')}>Indikator Asam Basa Alami</span>
        </div>
        <div style={{display: 'flex', gap: 40, marginTop: 10, fontFamily: FONT.sans, fontWeight: 700, fontSize: 22}}>
          <span style={{color: '#a07a00', opacity: k1}}>apa yang diteliti</span>
          <span style={{color: C.violet, opacity: k2}}>objeknya</span>
          <span style={{color: C.mint, opacity: k3}}>konteksnya</span>
        </div>
      </Panel>
      <Stamp p={strike} text="“Suatu studi tentang” → hapus" x={1440} y={800} rot={-4} size={26} />
      <div style={{position: 'absolute', left: 160, top: 770, opacity: rule, fontFamily: FONT.sans, fontSize: 30, color: C.ink, display: 'flex', alignItems: 'center', gap: 18}}>
        <svg width={260} height={40} viewBox="0 0 260 40">
          <rect x={2} y={8} width={256} height={24} rx={4} fill="#fff" stroke={C.ink} strokeWidth={2} />
          {Array.from({length: 13}, (_, i) => (
            <line key={i} x1={12 + i * 20} y1={8} x2={12 + i * 20} y2={i % 5 === 0 ? 24 : 18} stroke={C.ink} strokeWidth={2} />
          ))}
        </svg>
        panjang judul: ikuti aturan dosen atau jurnal
      </div>
    </>
  );
};
