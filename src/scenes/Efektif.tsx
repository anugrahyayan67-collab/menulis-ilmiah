import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Check, Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

type G = {t: string; role?: string; col?: string; strike?: number; pre?: string};

/** Kalimat dengan kelompok kata berlabel (S, P, O, K). */
const Parsed: React.FC<{groups: G[]; p: number; size?: number}> = ({groups, p, size = 44}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0 14px', fontFamily: FONT.serif, fontSize: size, color: C.ink, alignItems: 'flex-start'}}>
    {groups.map((g, i) => (
      <div key={i} style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
        <span>
          {g.pre ? (
            <span style={{position: 'relative', opacity: 1 - 0.5 * (g.strike ?? 0), marginRight: '0.25em'}}>
              {g.pre}
              <span style={{position: 'absolute', left: -3, top: '55%', height: 5, width: `calc(${((g.strike ?? 0) * 100).toFixed(1)}% + 6px)`, background: C.red, borderRadius: 3}} />
            </span>
          ) : null}
          {g.t}
        </span>
        {g.role ? (
          <>
            <span style={{alignSelf: 'stretch', height: 10, borderLeft: `3px solid ${g.col}`, borderRight: `3px solid ${g.col}`, borderBottom: `3px solid ${g.col}`, borderRadius: '0 0 6px 6px', opacity: p, marginTop: 4}} />
            <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: g.col, opacity: p, marginTop: 4}}>{g.role}</span>
          </>
        ) : null}
      </div>
    ))}
  </div>
);

const PRINCIPLES = ['subjek & predikat jelas', 'hemat kata', 'sejajar', 'tidak dipadatkan'];

export const Efektif: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const s0 = slot(t, cue(0) - 0.3, cue(1) - 0.1);
  const s1 = slot(t, cue(1) - 0.1, cue(3) - 0.1);
  const s2 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const s3 = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const s4 = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const lab1 = ramp(t, wordOf(1, 'subjek') - 0.2, wordOf(1, 'subjek') + 0.5);
  const noS = ramp(t, wordOf(1, 'tidak') - 0.2, wordOf(1, 'tidak') + 0.4, BACK);
  const cut = ramp(t, wordOf(2, 'Buang') - 0.1, wordOf(2, 'Buang') + 0.6);
  const fixed = ramp(t, wordOf(2, 'sehingga') - 0.2, wordOf(2, 'sehingga') + 0.5);
  const hemat = ramp(t, wordOf(3, 'cukup') - 0.2, wordOf(3, 'cukup') + 0.6);
  const sej = ramp(t, wordOf(4, 'menimbang') - 0.4, wordOf(4, 'menimbang') + 0.4);
  const split = ramp(t, wordOf(5, 'dipecah') - 0.2, wordOf(5, 'dipecah') + 0.8);
  const prIdx = [cue(1), cue(3), cue(4), cue(5)];
  return (
    <>
      {/* prinsip di atas */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 190, display: 'flex', justifyContent: 'center', gap: 16}}>
        {PRINCIPLES.map((p, i) => {
          const on = ramp(t, prIdx[i] - 0.1, prIdx[i] + 0.5);
          const cur = Math.min(on, 1 - ramp(t, (prIdx[i + 1] ?? cueEnd(5) + 5) - 0.1, (prIdx[i + 1] ?? cueEnd(5) + 5) + 0.4));
          return (
            <span
              key={p}
              style={{
                padding: '8px 20px',
                borderRadius: 999,
                fontFamily: FONT.sans,
                fontWeight: 700,
                fontSize: 24,
                border: `2px solid ${interpolateColors(on, [0, 1], [C.faint, C.blue])}`,
                background: interpolateColors(cur, [0, 1], ['#ffffff', '#dce5fd']),
                color: interpolateColors(on, [0, 1], [C.muted, C.blue]),
                opacity: 0.4 + 0.6 * on,
              }}
            >
              {i + 1}. {p}
            </span>
          );
        })}
      </div>
      {/* 0: pengertian */}
      <Paper x={460} y={330} w={1000} opacity={s0} lift={1 - s0} accent={C.blue} pad="30px 44px">
        <Kicker color={C.blue}>kalimat efektif</Kicker>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 44, marginTop: 10}}>menyampaikan maksud penulis…</div>
        {['dengan tepat', 'dan mudah dipahami'].map((w, i) => {
          const q = ramp(t, wordOf(0, i === 0 ? 'tepat' : 'mudah') - 0.1, wordOf(0, i === 0 ? 'tepat' : 'mudah') + 0.4);
          return (
            <div key={w} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, fontFamily: FONT.sans, fontSize: 36, opacity: 0.3 + 0.7 * q}}>
              <Check p={q} size={40} /> {w}
            </div>
          );
        })}
      </Paper>
      {/* 1: subjek hilang */}
      <Paper x={210} y={300} w={1500} opacity={s1} lift={1 - s1} accent={C.red} pad="30px 44px">
        <Kicker color={C.red}>tanpa subjek</Kicker>
        <div style={{marginTop: 16}}>
          <Parsed
            p={lab1}
            groups={[
              {pre: 'Dalam', t: 'hasil pengamatan', role: 'K (keterangan)', col: C.muted, strike: cut},
              {t: 'menunjukkan', role: 'P', col: C.violet},
              {t: 'perubahan warna.', role: 'O', col: C.cyan},
            ]}
          />
        </div>
        <div style={{position: 'absolute', right: 44, top: 30, opacity: noS, transform: `scale(${(0.8 + 0.2 * Math.min(1, noS)).toFixed(3)})`, fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.red}}>S = ?</div>
        <div style={{marginTop: 34, opacity: fixed, transform: `translateY(${((1 - fixed) * 14).toFixed(2)}px)`}}>
          <Kicker color={C.mint}>diperbaiki</Kicker>
          <div style={{marginTop: 12}}>
            <Parsed
              p={fixed}
              groups={[
                {t: 'Hasil pengamatan', role: 'S', col: C.blue},
                {t: 'menunjukkan', role: 'P', col: C.violet},
                {t: 'perubahan warna.', role: 'O', col: C.cyan},
              ]}
            />
          </div>
        </div>
      </Paper>
      {/* 2: hemat */}
      <Paper x={360} y={330} w={1200} opacity={s2} lift={1 - s2} accent={C.amber} pad="30px 44px">
        <Kicker color={C.amber}>hemat kata</Kicker>
        <div style={{marginTop: 26}}>
          <TypeText parts={segs('para mahasiswa', {t: '-mahasiswa', strike: hemat})} p={1} t={t} size={52} caret={false} />
        </div>
        <div style={{marginTop: 18, fontFamily: FONT.sans, fontSize: 34, color: C.mint, fontWeight: 700, opacity: hemat}}>→ para mahasiswa</div>
        <div style={{marginTop: 26, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: hemat}}>“para” sudah menyatakan jamak, jadi kata ulangnya tidak perlu.</div>
      </Paper>
      {/* 3: sejajar */}
      <Paper x={260} y={330} w={1400} opacity={s3} lift={1 - s3} accent={C.violet} pad="30px 44px">
        <Kicker color={C.violet}>kesejajaran</Kicker>
        <div style={{marginTop: 22}}>
          <TypeText
            parts={segs('Langkahnya: menimbang, ', {t: 'pelarutan', strike: sej, fix: 'melarutkan', fixP: sej}, ', dan ', {t: 'saring', strike: sej, fix: 'menyaring', fixP: sej}, '.')}
            p={1}
            t={t}
            size={48}
            lh={2.1}
            caret={false}
          />
        </div>
        <div style={{marginTop: 10, fontFamily: FONT.sans, fontSize: 28, color: C.muted, opacity: sej}}>semua unsur daftar memakai bentuk yang sama: kata kerja me-</div>
      </Paper>
      {/* 4: dipecah */}
      <Paper x={210} y={290} w={1500} opacity={s4} lift={1 - s4} accent={C.mint} pad="26px 44px">
        <Kicker color={C.mint}>jangan terlalu dipadatkan</Kicker>
        <div style={{marginTop: 14, fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.55, color: C.ink, opacity: 1 - 0.55 * split}}>
          Antosianin merupakan zat warna alami yang dapat berubah warna pada pH tertentu yang diperoleh dari bunga dan buah sehingga dapat digunakan sebagai indikator.
        </div>
        <div style={{marginTop: 20}}>
          {[
            'Antosianin merupakan zat warna alami yang dapat berubah warna pada pH tertentu.',
            'Zat warna ini diperoleh dari bunga dan buah.',
            'Oleh karena itu, antosianin dapat digunakan sebagai indikator.',
          ].map((s, i) => {
            const q = ramp(t, wordOf(5, 'dipecah') + 0.3 + i * 0.5, wordOf(5, 'dipecah') + 0.8 + i * 0.5);
            return (
              <div key={i} style={{display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 8, opacity: q, transform: `translateX(${((1 - q) * 20).toFixed(2)}px)`}}>
                <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 24, color: C.mint}}>{i + 1}</span>
                <span style={{fontFamily: FONT.serif, fontSize: 32, color: C.ink}}>{s}</span>
              </div>
            );
          })}
        </div>
      </Paper>
    </>
  );
};
