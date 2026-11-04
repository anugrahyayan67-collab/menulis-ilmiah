import React from 'react';
import {EASE_IN_OUT, mix, ramp, slot} from '../anim';
import {Stage} from '../components/primitives';
import {Kicker, Paper} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const RULES = [
  {n: '1 penulis', cite: '(Seliwati, 2023)'},
  {n: '2 penulis', cite: '(Lumadya & Wiyarsi, 2024)'},
  {n: '≥ 3 penulis', cite: '(Marka et al., 2025)'},
];

// urutan abjad akhir; START = urutan acak awal
const REFS = [
  {a: 'Ayun, Q., Khomsiyah, & Ajeng, A. (2022).', r: 'Pengaruh pH larutan terhadap kestabilan warna …', j: 'Jurnal Crystal, 4'},
  {a: 'Lumadya, S. A., & Wiyarsi, A. (2024).', r: 'Identifikasi miskonsepsi asam basa …', j: 'Jurnal Riset Pembelajaran Kimia, 9'},
  {a: 'Marka, Zulfajri, M., & Ismulyati, S. (2025).', r: 'Pembuatan indikator alami asam basa …', j: 'JS Edu, 2'},
  {a: 'Overby, J., & Chang, R. (2022).', r: '', j: 'Chemistry'},
  {a: 'Seliwati. (2023).', r: 'Kemampuan memahami persamaan reaksi kimia …', j: 'Jurnal Ilmiah Kanderang Tingang, 14'},
];
const START = [3, 0, 4, 1, 2]; // posisi awal tiap entri

type Part = {t: string; label: string; col: string; it?: boolean};
const JOURNAL: Part[] = [
  {t: 'Lumadya, S. A., & Wiyarsi, A.', label: 'penulis', col: C.blue},
  {t: '(2024).', label: 'tahun', col: C.amber},
  {t: 'Identifikasi miskonsepsi asam basa dengan three-tier multiple choice test menggunakan certainty response index.', label: 'judul artikel', col: C.ink},
  {t: 'Jurnal Riset Pembelajaran Kimia, 9', label: 'nama jurnal & volume (miring)', col: C.violet, it: true},
  {t: '(2), 93–99.', label: 'nomor, halaman', col: C.cyan},
  {t: 'https://doi.org/10.21831/jrpk.v9i2.21286', label: 'DOI', col: C.mint},
];
const BOOK: Part[] = [
  {t: 'Overby, J., & Chang, R.', label: 'penulis', col: C.blue},
  {t: '(2022).', label: 'tahun', col: C.amber},
  {t: 'Chemistry', label: 'judul buku (miring)', col: C.violet, it: true},
  {t: '(14th ed.).', label: 'edisi', col: C.cyan},
  {t: 'McGraw Hill.', label: 'penerbit', col: C.mint},
];

const Anatomy: React.FC<{parts: Part[]; p: number; t0: number; t: number; title: string}> = ({parts, p, t0, t, title}) => (
  <div style={{position: 'absolute', left: 110, top: 600, width: 1700, opacity: p}}>
    <Kicker color={C.ink}>{title}</Kicker>
    <div style={{marginTop: 12, padding: '20px 26px', borderRadius: 16, background: '#fff', border: `1.5px solid ${C.faint}`, boxShadow: '0 10px 26px rgba(22,33,62,0.08)', display: 'flex', flexWrap: 'wrap', gap: '10px 12px', alignItems: 'flex-start'}}>
      {parts.map((x, i) => {
        const q = ramp(t, t0 + i * 0.45, t0 + 0.4 + i * 0.45);
        return (
          <div key={i} style={{display: 'inline-flex', flexDirection: 'column', maxWidth: 1000}}>
            <span style={{fontFamily: FONT.serif, fontSize: 29, color: C.ink, fontStyle: x.it ? 'italic' : undefined, borderBottom: `4px solid ${x.col}`, paddingBottom: 2, opacity: 0.45 + 0.55 * q}}>{x.t}</span>
            <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 19, color: x.col, marginTop: 4, opacity: q}}>{x.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const Apa: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const left = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const big = ramp(t, cue(1), cue(1) + 0.6);
  const nm = ramp(t, wordOf(1, 'belakang') - 0.2, wordOf(1, 'belakang') + 0.4);
  const yr = ramp(t, wordOf(1, 'tahun') - 0.2, wordOf(1, 'tahun') + 0.4);
  const right = ramp(t, cue(3) - 0.3, cue(3) + 0.5);
  const sort = ramp(t, wordOf(3, 'abjad') - 0.2, wordOf(3, 'abjad') + 1.4, EASE_IN_OUT);
  const aJ = slot(t, cue(4) - 0.2, cue(5) - 0.1);
  const aB = slot(t, cue(5) - 0.1, cue(6) - 0.1);
  const link = ramp(t, cue(6), cue(6) + 1.2);
  const ROW = 64;
  return (
    <>
      {/* di dalam teks */}
      <Paper x={110} y={190} w={760} h={380} opacity={left} lift={1 - left} accent={C.blue} pad="22px 32px">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Kicker color={C.blue}>di dalam teks</Kicker>
          <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, color: '#fff', background: C.blue, borderRadius: 8, padding: '4px 12px'}}>APA edisi 7</span>
        </div>
        <div style={{marginTop: 14, fontFamily: FONT.serif, fontSize: 46, opacity: big}}>
          (<span style={{background: `rgba(47,98,240,${(0.14 * nm).toFixed(3)})`, borderRadius: 6}}>Ayun</span> et al.,{' '}
          <span style={{background: `rgba(224,122,0,${(0.18 * yr).toFixed(3)})`, borderRadius: 6}}>2022</span>)
        </div>
        <div style={{display: 'flex', gap: 30, fontFamily: FONT.sans, fontSize: 20, fontWeight: 700, marginTop: 2}}>
          <span style={{color: C.blue, opacity: nm}}>↑ nama belakang</span>
          <span style={{color: C.amber, opacity: yr}}>↑ tahun</span>
        </div>
        <div style={{marginTop: 14}}>
          {RULES.map((r, i) => {
            const q = ramp(t, cue(2) + 0.3 + i * 0.9, cue(2) + 0.8 + i * 0.9);
            return (
              <div key={r.n} style={{display: 'flex', alignItems: 'center', gap: 18, height: 48, opacity: q, transform: `translateX(${((1 - q) * -16).toFixed(2)}px)`}}>
                <span style={{width: 150, fontFamily: FONT.mono, fontSize: 22, color: C.muted, fontWeight: 600}}>{r.n}</span>
                <span style={{fontFamily: FONT.serif, fontSize: 30, color: C.ink}}>{r.cite}</span>
              </div>
            );
          })}
        </div>
      </Paper>
      {/* daftar pustaka */}
      <Paper x={920} y={190} w={890} h={380} opacity={right} lift={1 - right} accent={C.mint} pad="22px 32px">
        <Kicker color={C.mint}>daftar pustaka · urut abjad</Kicker>
        <div style={{position: 'relative', marginTop: 10, height: 5 * ROW}}>
          {REFS.map((r, i) => {
            const y = mix(START[i], i, sort) * ROW;
            const x = Math.sin(Math.PI * sort) * (i % 2 ? 26 : -26);
            return (
              <div key={i} style={{position: 'absolute', left: 0, right: 0, top: y, transform: `translateX(${x.toFixed(2)}px)`, fontFamily: FONT.serif, fontSize: 22, lineHeight: 1.3, color: C.ink, paddingLeft: 26, textIndent: -26, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                <b style={{color: C.blue}}>{r.a.split(',')[0].split('.')[0]}</b>
                {r.a.slice(r.a.split(',')[0].split('.')[0].length)} {r.r} <i>{r.j}</i>
              </div>
            );
          })}
        </div>
      </Paper>
      <Anatomy parts={JOURNAL} p={aJ} t0={cue(4) + 0.4} t={t} title="jurnal" />
      <Anatomy parts={BOOK} p={aB} t0={cue(5) + 0.3} t={t} title="buku" />
      {/* dua arah: teks ↔ daftar pustaka */}
      <Stage>
        <g opacity={link}>
          {[0, 1, 2].map((k) => {
            const fy = 384 + k * 48; // baris aturan di panel kiri
            const ty = 262 + [4, 1, 2][k] * ROW; // Seliwati, Lumadya, Marka di daftar pustaka
            return <path key={k} d={`M780,${fy} C860,${fy} 860,${ty} 936,${ty}`} fill="none" stroke={C.mint} strokeWidth={3} strokeDasharray="6 6" markerEnd="url(#arrow-mint)" markerStart="url(#arrow-mint)" />;
          })}
        </g>
      </Stage>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', opacity: link}}>
        <div style={{display: 'inline-block', padding: '18px 34px', borderRadius: 16, background: '#fff', border: `2px solid ${C.mint}`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 38, color: C.ink}}>
          sitasi di teks <span style={{color: C.mint}}>⇄</span> daftar pustaka: harus cocok
        </div>
      </div>
    </>
  );
};
