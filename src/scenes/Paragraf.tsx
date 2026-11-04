import React from 'react';
import {BACK, EASE_IN_OUT, ramp, slot} from '../anim';
import {Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const BX = 140;
const BW = 480;
const BH = 64;
const GAP = 16;
const Y0 = 330;
const TAGS = ['definisi', 'contoh', 'sebab–akibat'];

const Block: React.FC<{y: number; main?: boolean; label: string; opacity: number; dash?: boolean; tag?: string; tagP?: number}> = ({y, main, label, opacity, dash, tag, tagP = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: BX,
      top: y,
      width: BW,
      height: BH,
      boxSizing: 'border-box',
      borderRadius: 12,
      background: main ? C.blue : '#fff',
      border: main ? 'none' : `2px ${dash ? 'dashed' : 'solid'} ${C.faint}`,
      color: main ? '#fff' : C.ink,
      opacity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
      fontFamily: FONT.sans,
      fontWeight: main ? 700 : 500,
      fontSize: 26,
      boxShadow: main ? '0 8px 20px rgba(47,98,240,0.25)' : 'none',
    }}
  >
    <span>{label}</span>
    {tag ? (
      <span style={{opacity: tagP, fontFamily: FONT.mono, fontSize: 20, color: C.violet, fontWeight: 600, border: `2px solid ${C.violet}`, borderRadius: 8, padding: '2px 10px', transform: `scale(${(0.8 + 0.2 * tagP).toFixed(3)})`}}>{tag}</span>
    ) : null}
  </div>
);

export const Paragraf: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const diag = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const ku = ramp(t, wordOf(1, 'utama') - 0.2, wordOf(1, 'utama') + 0.5);
  const pj = ramp(t, wordOf(1, 'penjelas') - 0.2, wordOf(1, 'penjelas') + 0.5);
  // posisi kalimat utama: atas (deduktif) → bawah (induktif) → atas + bawah (campuran)
  const toBottom = Math.min(ramp(t, cue(3) - 0.1, cue(3) + 1.0, EASE_IN_OUT), 1 - ramp(t, cue(4) - 0.1, cue(4) + 1.0, EASE_IN_OUT));
  const both = ramp(t, cue(4) + 0.4, cue(4) + 1.3);
  const shift = toBottom; // penjelas naik saat KU turun
  const kuY = Y0 + toBottom * 3 * (BH + GAP);
  const name1 = slot(t, cue(2) - 0.1, cue(3) - 0.1);
  const name2 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const name3 = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const tagP = (i: number) => ramp(t, wordOf(5, ['definisi', 'contoh', 'sebab'][i]) - 0.1, wordOf(5, ['definisi', 'contoh', 'sebab'][i]) + 0.4, BACK);
  const cnt = ramp(t, wordOf(6, 'tiga') - 0.2, wordOf(6, 'tiga') + 0.5);
  const np = ramp(t, wordOf(6, 'baru', 1) - 0.4, wordOf(6, 'baru', 1) + 0.4);
  const paper = ramp(t, cue(0), cue(0) + 0.8);
  const typ = ramp(t, cue(0) + 0.4, cue(1) + 3.5, (x) => x);
  const par = segs(
    {t: 'Antosianin merupakan zat warna alami yang dapat berubah warna pada pH tertentu (Marka et al., 2025).', hl: ku},
    ' ',
    {t: 'Zat warna ini diperoleh dari berbagai tumbuhan, terutama dari bunga dan buah yang berwarna merah, ungu, dan biru (Marka et al., 2025).'},
    ' ',
    {t: 'Contohnya, ekstrak kubis ungu menghasilkan warna yang berbeda-beda pada berbagai pH (Overby & Chang, 2022).'},
    ' ',
    {t: 'Oleh karena itu, antosianin dapat dimanfaatkan sebagai indikator asam basa alami.'},
  );
  const names = [
    {p: name1, text: 'Deduktif', sub: 'kalimat utama di awal'},
    {p: name2, text: 'Induktif', sub: 'kalimat utama di akhir'},
    {p: name3, text: 'Campuran', sub: 'di awal, ditegaskan di akhir'},
  ];
  return (
    <>
      {/* nama pola */}
      {names.map((n) => (
        <div key={n.text} style={{position: 'absolute', left: BX, top: 196, opacity: n.p, transform: `translateY(${((1 - n.p) * 10).toFixed(2)}px)`}}>
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 52, color: C.ink, lineHeight: 1}}>{n.text}</div>
          <div style={{fontFamily: FONT.sans, fontSize: 26, color: C.muted, marginTop: 6}}>{n.sub}</div>
        </div>
      ))}
      <div style={{position: 'absolute', left: BX, top: 230, opacity: diag * (1 - Math.max(name1, ramp(t, cue(2) - 0.3, cue(2)))), fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.ink}}>
        1 paragraf = <span style={{color: C.blue}}>1 gagasan pokok</span>
      </div>
      <div style={{opacity: diag}}>
        <Block y={kuY} main label="Kalimat utama" opacity={0.35 + 0.65 * ku} />
        {[0, 1, 2].map((i) => (
          <Block key={i} y={Y0 + (i + 1) * (BH + GAP) - shift * (BH + GAP)} label="Kalimat penjelas" opacity={0.35 + 0.65 * pj} tag={TAGS[i]} tagP={tagP(i)} />
        ))}
        <div style={{opacity: both}}>
          <Block y={Y0 + 4 * (BH + GAP)} main label="Kalimat utama (penegasan)" opacity={0.75 * both} />
        </div>
      </div>
      {/* hitungan kalimat */}
      <div
        style={{
          position: 'absolute',
          left: BX + BW + 18,
          top: Y0,
          height: 4 * (BH + GAP) - GAP,
          width: 18,
          borderTop: `3px solid ${C.amber}`,
          borderBottom: `3px solid ${C.amber}`,
          borderRight: `3px solid ${C.amber}`,
          borderRadius: '0 8px 8px 0',
          opacity: cnt,
        }}
      />
      <div style={{position: 'absolute', left: BX, top: Y0 + 5 * (BH + GAP) + 10, opacity: cnt, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.amber}}>
        biasanya 3–7 kalimat
      </div>
      {/* contoh paragraf */}
      <Paper x={720} y={200} w={1080} opacity={paper} lift={1 - paper} pad="24px 38px" accent={C.blue}>
        <Kicker color={C.blue}>contoh paragraf deduktif</Kicker>
        <TypeText parts={par} p={typ} t={t} size={31} lh={1.6} style={{marginTop: 10, textIndent: 48}} />
        <div style={{marginTop: 18, height: 50, opacity: np, display: 'flex', alignItems: 'center', gap: 16}}>
          <span style={{width: 48}} />
          <span style={{width: 3, height: 36, background: C.blue, opacity: 0.6 + 0.4 * Math.cos(t * 7)}} />
          <span style={{fontFamily: FONT.sans, fontSize: 24, color: C.blue, fontWeight: 600}}>← gagasan baru, paragraf baru</span>
        </div>
      </Paper>
    </>
  );
};
