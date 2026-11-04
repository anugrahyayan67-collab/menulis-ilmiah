import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Check, Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const lin = (x: number) => x;

type Row = {type: string; ok: boolean; title: string; meta: string};
const ROWS: Row[] = [
  {type: 'Jurnal', ok: true, title: 'Pembuatan indikator alami asam basa terbaru dari buah gendola binahong', meta: 'Marka et al. · 2025 · JS Edu 2(1)'},
  {type: 'Prosiding', ok: false, title: 'Makalah seminar nasional tentang ekstrak antosianin', meta: 'contoh hasil pencarian'},
  {type: 'Jurnal', ok: true, title: 'Pigmen umbi ubi jalar ungu dan rimpang kunyit: indikator ramah lingkungan', meta: 'Leba et al. · 2023 · JISIC 15(2)'},
  {type: 'Skripsi', ok: false, title: 'Skripsi tentang indikator alami dari kubis ungu', meta: 'contoh hasil pencarian'},
  {type: 'Blog', ok: false, title: 'Cara membuat indikator kubis ungu di rumah', meta: 'contoh hasil pencarian'},
];

const DB = [
  {name: 'Garuda', note: 'portal jurnal Indonesia', col: C.blue},
  {name: 'SINTA', note: 'indeks jurnal Indonesia, peringkat S1–S6', col: C.cyan},
  {name: 'DOAJ', note: 'jurnal akses terbuka dari banyak negara', col: C.violet},
];

const FIELDS = [
  {k: 'Nama jurnal', v: 'J. Indonesian Society of Integrated Chemistry'},
  {k: 'Volume (nomor)', v: '15(2)'},
  {k: 'Halaman', v: '99–109'},
  {k: 'ISSN', v: 'tercantum di laman jurnal'},
  {k: 'DOI', v: '10.22437/jisic.v15i2.28648'},
];

const FILES = [
  {bad: 'download (3).pdf', good: 'Leba et al. (2023).pdf'},
  {bad: 'artikel_fix_baru.pdf', good: 'Marka et al. (2025).pdf'},
  {bad: '1-6.pdf', good: 'Ayun et al. (2022).pdf'},
];

export const Cari: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const win = ramp(t, cue(0) - 0.4, cue(0) + 0.5);
  const query = ramp(t, wordOf(2, 'antosianin') - 0.3, wordOf(2, 'indikator') + 0.8, lin);
  const filt = ramp(t, wordOf(2, 'batasi'), wordOf(2, 'batasi') + 0.5, BACK);
  const res = (i: number) => ramp(t, wordOf(2, 'indikator') + 0.6 + i * 0.25, wordOf(2, 'indikator') + 1.1 + i * 0.25);
  const sieve = ramp(t, wordOf(3, 'prosiding') - 0.2, cueEnd(3));
  const pA = slot(t, cue(1) - 0.2, cue(4) - 0.1);
  const pB = slot(t, cue(4) - 0.1, cue(6) - 0.1);
  const pC = ramp(t, cue(6) - 0.1, cue(6) + 0.5);
  const doi = ramp(t, wordOf(5, 'alamat'), wordOf(5, 'alamat') + 0.6);
  return (
    <>
      {/* jendela peramban */}
      <Paper x={110} y={190} w={960} h={670} opacity={win} lift={1 - win} pad="0">
        <div style={{height: 54, borderBottom: `1.5px solid ${C.faint}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px'}}>
          {[C.red, C.amber, C.mint].map((c) => (
            <span key={c} style={{width: 14, height: 14, borderRadius: 7, background: c, opacity: 0.8}} />
          ))}
          <span style={{marginLeft: 18, flex: 1, height: 32, borderRadius: 16, background: C.bg, fontFamily: FONT.mono, fontSize: 18, color: C.muted, display: 'flex', alignItems: 'center', padding: '0 16px'}}>
            scholar.google.com
          </span>
        </div>
        <div style={{padding: '24px 30px'}}>
          <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
            <div style={{flex: 1, height: 62, borderRadius: 31, border: `2px solid ${C.blue}`, display: 'flex', alignItems: 'center', padding: '0 26px', background: '#fff'}}>
              <span style={{fontSize: 26, marginRight: 14, color: C.blue}}>⌕</span>
              <TypeText parts={segs('antosianin kubis ungu indikator')} p={query} t={t} size={28} font="sans" lh={1.2} />
            </div>
            <span
              style={{
                opacity: Math.min(1, filt),
                transform: `scale(${(0.8 + 0.2 * Math.min(1, filt)).toFixed(3)})`,
                padding: '10px 18px',
                borderRadius: 12,
                background: `${C.blue}14`,
                border: `2px solid ${C.blue}`,
                fontFamily: FONT.sans,
                fontWeight: 700,
                fontSize: 22,
                color: C.blue,
                whiteSpace: 'nowrap',
              }}
            >
              2021 – sekarang
            </span>
          </div>
          <div style={{marginTop: 18}}>
            {ROWS.map((r, i) => {
              const a = res(i);
              const bad = r.ok ? 0 : ramp(sieve * 3, i * 0.5 - 0.5, i * 0.5);
              const good = r.ok ? ramp(t, cueEnd(3) - 0.2, cueEnd(3) + 0.4) : 0;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    padding: '12px 4px',
                    borderBottom: `1.5px solid ${C.faint}`,
                    opacity: a * (1 - 0.6 * bad),
                    transform: `translateY(${((1 - a) * 14).toFixed(2)}px)`,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 116,
                      textAlign: 'center',
                      padding: '4px 0',
                      borderRadius: 8,
                      fontFamily: FONT.mono,
                      fontWeight: 600,
                      fontSize: 18,
                      color: r.ok ? C.mint : C.muted,
                      border: `2px solid ${r.ok ? C.mint : C.faint}`,
                      background: r.ok ? `rgba(19,154,99,${(0.12 * good).toFixed(3)})` : '#fff',
                    }}
                  >
                    {r.type}
                  </span>
                  <div>
                    <div style={{fontFamily: FONT.sans, fontWeight: 600, fontSize: 24, color: r.ok ? C.blue : C.ink, lineHeight: 1.25}}>{r.title}</div>
                    <div style={{fontFamily: FONT.sans, fontSize: 19, color: C.muted, marginTop: 4}}>{r.meta}</div>
                  </div>
                  {!r.ok ? (
                    <span style={{position: 'absolute', left: 0, top: '50%', height: 4, width: `${(bad * 100).toFixed(1)}%`, background: C.red, borderRadius: 2, opacity: 0.85}} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Paper>
      {/* panel kanan A: basis data */}
      <div style={{position: 'absolute', left: 1130, top: 200, width: 680, opacity: pA}}>
        <Kicker color={C.ink}>tempat mencari</Kicker>
        {DB.map((d, i) => {
          const a = ramp(t, wordOf(1, d.name) - 0.2, wordOf(1, d.name) + 0.4, BACK);
          return (
            <div
              key={d.name}
              style={{
                marginTop: 18,
                padding: '18px 24px',
                borderRadius: 16,
                background: '#fff',
                border: `1.5px solid ${C.faint}`,
                borderLeft: `8px solid ${d.col}`,
                boxShadow: '0 8px 22px rgba(22,33,62,0.07)',
                opacity: Math.min(1, a),
                transform: `translateX(${((1 - Math.min(1, a)) * 30).toFixed(2)}px)`,
              }}
            >
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, color: d.col}}>{d.name}</div>
              <div style={{fontFamily: FONT.sans, fontSize: 25, color: C.ink, marginTop: 2}}>{d.note}</div>
            </div>
          );
        })}
        <div style={{marginTop: 26, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, cue(3), cue(3) + 0.6)}}>
          Saring: <b style={{color: C.mint}}>jurnal</b> & <b style={{color: C.mint}}>buku</b> dulu.
        </div>
      </div>
      {/* panel kanan B: anatomi jurnal */}
      <Paper x={1120} y={190} w={700} h={600} opacity={pB} lift={1 - pB} accent={C.mint} pad="22px 30px">
        <Kicker color={C.mint}>ciri jurnal yang jelas</Kicker>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, marginTop: 8}}>Leba et al. (2023)</div>
        {FIELDS.map((f, i) => {
          const q = ramp(t, cue(4) + 0.6 + i * 0.55, cue(4) + 1.1 + i * 0.55);
          const isDoi = f.k === 'DOI';
          return (
            <div key={f.k} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, opacity: 0.35 + 0.65 * q}}>
              <Check p={q} size={34} />
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 18, color: C.muted}}>{f.k}</div>
                <div
                  style={{
                    fontFamily: isDoi ? FONT.mono : FONT.sans,
                    fontSize: isDoi ? 24 : 26,
                    color: C.ink,
                    backgroundImage: isDoi ? `linear-gradient(${C.hilite}, ${C.hilite})` : undefined,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${(doi * 100).toFixed(1)}% 0.6em`,
                    backgroundPosition: '0 0.75em',
                  }}
                >
                  {f.v}
                </div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 26,
            padding: '14px 18px',
            borderRadius: 12,
            background: `${C.blue}10`,
            border: `2px dashed ${C.blue}`,
            fontFamily: FONT.mono,
            fontSize: 21,
            color: C.blue,
            opacity: ramp(t, wordOf(5, 'siapa'), wordOf(5, 'siapa') + 0.5),
          }}
        >
          https://doi.org/10.22437/jisic.v15i2.28648 → artikel yang sama
        </div>
      </Paper>
      {/* panel kanan C: nama berkas */}
      <Paper x={1120} y={240} w={700} h={420} opacity={pC} lift={1 - pC} accent={C.amber} pad="22px 30px">
        <Kicker color={C.amber}>simpan dengan rapi</Kicker>
        {FILES.map((f, i) => {
          const s = ramp(t, wordOf(6, 'penulis') + i * 0.4, wordOf(6, 'penulis') + 0.5 + i * 0.4);
          return (
            <div key={i} style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 16}}>
              <span style={{width: 40, height: 50, borderRadius: 6, background: C.red, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6, flex: 'none'}}>
                PDF
              </span>
              <div style={{position: 'relative', fontFamily: FONT.mono, fontSize: 25}}>
                <TypeText parts={segs({t: f.bad, strike: s, fix: f.good, fixP: s, color: C.muted})} p={1} t={t} size={25} font="mono" caret={false} />
              </div>
            </div>
          );
        })}
      </Paper>
    </>
  );
};
