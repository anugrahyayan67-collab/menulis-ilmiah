import React from 'react';
import {BACK, ramp} from '../anim';
import {C, FONT} from '../theme';
import {useScene} from '../SceneContext';

/** Tanda baca yang "jatuh" ke tempatnya (merah, lalu menjadi tinta). */
const Mark: React.FC<{p: number; ch: string; col?: string}> = ({p, ch, col = C.red}) => (
  <span style={{display: 'inline-block', color: col, fontWeight: 800, opacity: Math.min(1, p), transform: `translateY(${((1 - Math.min(1, p)) * -30).toFixed(2)}px) scale(${(1 + 0.6 * (1 - Math.min(1, p))).toFixed(3)})`, margin: '0 1px'}}>{ch}</span>
);

const Row: React.FC<{y: number; a: number; label: string; children: React.ReactNode; col?: string}> = ({y, a, label, children, col = C.blue}) => (
  <div
    style={{
      position: 'absolute',
      left: 120,
      top: y,
      width: 1680,
      height: 104,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      padding: '0 30px',
      background: '#fff',
      border: `1.5px solid ${C.faint}`,
      borderLeft: `8px solid ${col}`,
      borderRadius: 14,
      opacity: Math.min(1, a),
      transform: `translateX(${((1 - Math.min(1, a)) * 30).toFixed(2)}px)`,
    }}
  >
    <span style={{width: 330, flex: 'none', fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: col}}>{label}</span>
    <span style={{fontFamily: FONT.serif, fontSize: 34, color: C.ink}}>{children}</span>
  </div>
);

export const Tanda: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const a = (i: number) => ramp(t, cue(i) - 0.2, cue(i) + 0.4, BACK);
  const m = (i: number, w: string, d = 0.4) => ramp(t, wordOf(i, w) - 0.1, wordOf(i, w) + d, BACK);
  const colonBad = ramp(t, wordOf(4, 'tidak') - 0.1, wordOf(4, 'tidak') + 0.5);
  const split = ramp(t, wordOf(5, 'dipecah') - 0.2, wordOf(5, 'dipecah') + 0.6);
  const head = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  return (
    <>
      <div style={{position: 'absolute', left: 120, top: 196, fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.ink, opacity: head}}>
        Tanda baca yang tepat → kalimat lebih jelas
      </div>
      <Row y={270} a={a(1)} label="koma sebelum tetapi / melainkan / sedangkan">
        Ekstrak berwarna merah dalam asam
        <Mark p={m(1, 'sedangkan')} ch="," /> sedangkan dalam basa berwarna hijau.
      </Row>
      <Row y={388} a={a(2)} label="koma setelah penghubung antarkalimat">
        Oleh karena itu
        <Mark p={m(2, 'oleh')} ch="," /> antosianin dapat dipakai sebagai indikator.
      </Row>
      <Row y={506} a={a(3)} label="anak kalimat di depan → koma">
        Karena larutannya asam
        <Mark p={m(3, 'karena')} ch="," /> warnanya menjadi merah.
      </Row>
      <Row y={624} a={a(4)} label="titik dua sebelum rincian" col={C.violet}>
        <span>
          Bahan<Mark p={m(4, 'rincian')} ch=":" col={C.mint} /> kubis ungu, air, dan HCl.
          <span style={{marginLeft: 40, color: C.muted, position: 'relative'}}>
            Bahannya adalah<span style={{color: C.red, fontWeight: 800}}>:</span> kubis ungu …
            <span style={{position: 'absolute', left: -4, top: '55%', height: 4, width: `calc(${(colonBad * 100).toFixed(1)}% + 8px)`, background: C.red, borderRadius: 2}} />
          </span>
        </span>
      </Row>
      <Row y={742} a={a(5)} label="terlalu banyak koma → pecah" col={C.mint}>
        <span style={{display: 'inline-grid', fontSize: 30}}>
          <span style={{gridArea: '1 / 1', opacity: 1 - split}}>
            Larutan dipanaskan<b style={{color: C.red}}>,</b> didinginkan<b style={{color: C.red}}>,</b> disaring<b style={{color: C.red}}>,</b> lalu ekstrak ditambahkan<b style={{color: C.red}}>,</b> dikocok<b style={{color: C.red}}>,</b> dan diamati.
          </span>
          <span style={{gridArea: '1 / 1', opacity: split}}>
            Larutan dipanaskan, lalu didinginkan<b style={{color: C.mint}}>.</b> Ekstrak kemudian ditambahkan<b style={{color: C.mint}}>.</b> Setelah itu, warnanya diamati.
          </span>
        </span>
      </Row>
    </>
  );
};
