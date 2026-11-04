import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const TOOLS = [
  {n: '1', title: 'Kata penghubung', ex: 'selain itu · oleh karena itu · dengan demikian', col: C.blue},
  {n: '2', title: 'Ulangi kata kunci', ex: 'antosianin … zat warna ini … antosianin', col: C.cyan},
  {n: '3', title: 'Urutan yang logis', ex: 'definisi → ciri → contoh', col: C.violet},
];

const LEVELS = [
  {lv: 1, name: 'Sangat sederhana', ex: 'lalu, terus, jadi'},
  {lv: 2, name: 'Dasar', ex: 'dan, karena, kemudian'},
  {lv: 3, name: 'Mahasiswa standar', ex: 'selain itu, oleh karena itu, dengan demikian, misalnya'},
  {lv: 4, name: 'Lanjut', ex: 'sejalan dengan hal tersebut, berdasarkan uraian di atas'},
  {lv: 5, name: 'Terlalu tinggi', ex: 'bertolak dari premis tersebut, dalam kerangka itu'},
];

const BAD = ['Selain itu,', 'Oleh karena itu,', 'Dengan demikian,', 'Selanjutnya,'];

export const Padu: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const paper = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const conn = ramp(t, wordOf(1, 'penghubung') - 0.1, wordOf(1, 'penghubung') + 0.6);
  const key = (k: number) => ramp(t, wordOf(2, 'kunci') + k * 0.4, wordOf(2, 'kunci') + 0.5 + k * 0.4);
  const ord = ramp(t, cue(3), cue(3) + 0.6);
  const pA = slot(t, cue(1) - 0.2, cue(4) - 0.1);
  const pB = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const pC = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const dimPaper = ramp(t, cue(5) - 0.2, cue(5) + 0.4);
  const par = segs(
    {t: 'Antosianin', box: key(0), boxColor: C.cyan},
    ' merupakan zat warna alami yang dapat berubah warna pada pH tertentu (Marka et al., 2025). ',
    {t: 'Zat warna ini', box: key(1), boxColor: C.cyan},
    ' diperoleh dari berbagai tumbuhan, terutama dari bunga dan buah yang berwarna merah, ungu, dan biru (Marka et al., 2025). ',
    {t: 'Contohnya', under: conn, underColor: C.blue},
    ', ekstrak kubis ungu menghasilkan warna yang berbeda-beda pada berbagai pH (Overby & Chang, 2022). ',
    {t: 'Oleh karena itu', under: conn, underColor: C.blue},
    ', ',
    {t: 'antosianin', box: key(2), boxColor: C.cyan},
    ' dapat dimanfaatkan sebagai indikator asam basa alami.',
  );
  const steps = ['definisi', 'ciri', 'contoh'];
  return (
    <>
      <Paper x={110} y={190} w={900} opacity={paper * (1 - 0.5 * dimPaper)} lift={1 - paper} pad="26px 38px" accent={C.blue}>
        <Kicker color={C.blue}>paragraf yang mengalir</Kicker>
        <TypeText parts={par} p={1} t={t} size={32} lh={1.75} caret={false} style={{marginTop: 10}} />
        <div style={{marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', opacity: ord}}>
          {steps.map((s, i) => {
            const q = ramp(t, wordOf(3, s) - 0.1, wordOf(3, s) + 0.4, BACK);
            return (
              <React.Fragment key={s}>
                {i > 0 ? <span style={{color: C.violet, fontSize: 30, opacity: Math.min(1, q)}}>→</span> : null}
                <span style={{padding: '6px 16px', borderRadius: 10, border: `2px solid ${C.violet}`, color: C.violet, fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, opacity: Math.min(1, q), transform: `scale(${(0.85 + 0.15 * Math.min(1, q)).toFixed(3)})`}}>{s}</span>
              </React.Fragment>
            );
          })}
        </div>
      </Paper>
      {/* A: tiga alat penyambung */}
      <div style={{position: 'absolute', left: 1070, top: 200, width: 740, opacity: pA}}>
        <Kicker color={C.ink}>tiga alat penyambung</Kicker>
        {TOOLS.map((tl, i) => {
          const a = ramp(t, cue(i + 1) - 0.2, cue(i + 1) + 0.5, BACK);
          return (
            <div
              key={tl.n}
              style={{
                marginTop: 18,
                padding: '18px 24px',
                background: '#fff',
                border: `1.5px solid ${C.faint}`,
                borderLeft: `8px solid ${tl.col}`,
                borderRadius: 16,
                boxShadow: '0 8px 22px rgba(22,33,62,0.07)',
                opacity: Math.min(1, a),
                transform: `translateX(${((1 - Math.min(1, a)) * 30).toFixed(2)}px)`,
              }}
            >
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: tl.col}}>
                {tl.n}. {tl.title}
              </div>
              <div style={{fontFamily: FONT.sans, fontSize: 25, color: C.ink, marginTop: 4}}>{tl.ex}</div>
            </div>
          );
        })}
      </div>
      {/* B: tingkatan kata penghubung */}
      <div style={{position: 'absolute', left: 1070, top: 190, width: 740, opacity: pB}}>
        <Kicker color={C.ink}>tingkatan kata penghubung</Kicker>
        {LEVELS.map((l, i) => {
          const pick = l.lv === 3 ? ramp(t, wordOf(4, 'umum') - 0.2, wordOf(4, 'umum') + 0.5) : 0;
          const tooHigh = l.lv === 5 ? ramp(t, wordOf(4, 'tinggi') - 0.2, wordOf(4, 'tinggi') + 0.4) : 0;
          const a = ramp(t, cue(4) + i * 0.18, cue(4) + 0.5 + i * 0.18);
          return (
            <div
              key={l.lv}
              style={{
                marginTop: 12,
                padding: '12px 20px',
                borderRadius: 14,
                background: pick > 0 ? `rgba(19,154,99,${(0.1 * pick).toFixed(3)})` : '#fff',
                border: `2px solid ${pick > 0.01 ? C.mint : C.faint}`,
                opacity: a * (1 - 0.45 * tooHigh),
                display: 'flex',
                gap: 18,
                alignItems: 'center',
                transform: `scale(${(1 + 0.03 * pick).toFixed(3)})`,
              }}
            >
              <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 26, color: pick > 0.01 ? C.mint : C.muted, width: 40}}>L{l.lv}</span>
              <div>
                <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: C.ink}}>
                  {l.name}
                  {l.lv === 3 ? <span style={{marginLeft: 12, color: C.mint, opacity: pick}}>✓ pakai ini</span> : null}
                </div>
                <div style={{fontFamily: FONT.sans, fontSize: 21, color: C.muted, textDecoration: tooHigh > 0.5 ? `line-through ${C.red}` : undefined}}>{l.ex}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* C: penghubung berlebihan */}
      <Paper x={1060} y={210} w={750} opacity={pC} lift={1 - pC} accent={C.red} pad="22px 30px">
        <Kicker color={C.red}>terlalu banyak penghubung</Kicker>
        {BAD.map((b, i) => {
          const q = ramp(t, cue(5) + 0.6 + i * 0.4, cue(5) + 1.1 + i * 0.4);
          const mark = ramp(t, wordOf(5, 'diawali') + i * 0.2, wordOf(5, 'diawali') + 0.5 + i * 0.2);
          return (
            <div key={b} style={{marginTop: 14, fontFamily: FONT.serif, fontSize: 30, opacity: q, color: C.ink}}>
              <TypeText parts={segs({t: b, box: mark, boxColor: C.red, bold: true}, ' kalimat ke-' + (i + 2) + ' …')} p={1} t={t} size={30} caret={false} />
            </div>
          );
        })}
        <div style={{marginTop: 22, fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: C.red, opacity: ramp(t, wordOf(5, 'dibuat-buat') - 0.3, wordOf(5, 'dibuat-buat') + 0.3)}}>
          → terasa dibuat-buat
        </div>
      </Paper>
    </>
  );
};
