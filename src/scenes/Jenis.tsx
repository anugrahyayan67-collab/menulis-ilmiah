import React from 'react';
import {BACK, ramp} from '../anim';
import {Kicker, Paper} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

type Doc = {title: string; color: string; line: number; items: string[]; tag?: string[]};
const DOCS: Doc[] = [
  {title: 'Laporan praktikum', color: C.blue, line: 1, items: ['Tujuan', 'Dasar teori', 'Alat & bahan', 'Cara kerja', 'Hasil', 'Pembahasan', 'Simpulan']},
  {title: 'Makalah', color: C.cyan, line: 2, items: ['Pendahuluan', 'Pembahasan', 'Penutup']},
  {title: 'Artikel jurnal', color: C.violet, line: 3, items: ['Pendahuluan', 'Metode', 'Hasil', 'Pembahasan'], tag: ['I', 'M', 'R', 'D']},
  {title: 'Karya lomba', color: C.amber, line: 4, items: ['Pendahuluan', 'Metode', 'Hasil & bahasan', 'Gagasan / solusi']},
];

export const Jenis: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const intro = ramp(t, cue(0), cue(0) + 0.8);
  const rule = ramp(t, wordOf(5, 'aturan') - 0.2, wordOf(5, 'aturan') + 0.5, BACK);
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', opacity: intro * (1 - ramp(t, cue(1) - 0.3, cue(1) + 0.3))}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 56, color: C.ink}}>Setiap jenis karya punya kerangka sendiri</div>
      </div>
      {DOCS.map((d, i) => {
        const a = ramp(t, cue(d.line) - 0.3, cue(d.line) + 0.5, BACK);
        const on = Math.min(ramp(t, cue(d.line), cue(d.line) + 0.5), 1 - ramp(t, cueEnd(d.line) + 0.2, cueEnd(d.line) + 0.8));
        const dim = rule;
        return (
          <Paper
            key={d.title}
            x={100 + i * 440}
            y={190}
            w={400}
            h={620}
            lift={1 - Math.min(1, a)}
            opacity={Math.min(1, a) * (1 - 0.35 * dim)}
            accent={d.color}
            pad="24px 28px"
            style={{transform: `translateY(${(-26 * (1 - Math.min(1, a)) - 16 * on).toFixed(2)}px)`, boxShadow: `0 ${10 + 16 * on}px ${28 + 18 * on}px rgba(22,33,62,${(0.08 + 0.08 * on).toFixed(3)})`}}
          >
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.ink}}>{d.title}</div>
            <div style={{marginTop: 22}}>
              {d.items.map((it, k) => {
                const q = ramp(t, cue(d.line) + 0.5 + k * 0.32, cue(d.line) + 0.9 + k * 0.32);
                return (
                  <div
                    key={it}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      height: 60,
                      borderBottom: `1.5px solid ${C.faint}`,
                      opacity: q,
                      transform: `translateX(${((1 - q) * 18).toFixed(2)}px)`,
                    }}
                  >
                    {d.tag ? (
                      <span style={{width: 40, height: 40, borderRadius: 10, background: d.color, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
                        {d.tag[k]}
                      </span>
                    ) : (
                      <span style={{fontFamily: FONT.mono, fontSize: 20, color: d.color, fontWeight: 600, width: 30, flex: 'none'}}>{String(k + 1).padStart(2, '0')}</span>
                    )}
                    <span style={{fontFamily: FONT.sans, fontSize: 28, color: C.ink}}>{it}</span>
                  </div>
                );
              })}
              {d.tag ? (
                <div style={{marginTop: 26, fontFamily: FONT.mono, fontSize: 30, fontWeight: 600, color: d.color, letterSpacing: 6, opacity: ramp(t, wordOf(3, 'IMRaD'), wordOf(3, 'IMRaD') + 0.5)}}>
                  IMRaD
                </div>
              ) : null}
            </div>
          </Paper>
        );
      })}
      {/* aturan dosen / panitia */}
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 500,
          opacity: rule,
          transform: `translate(-50%, -50%) scale(${(0.85 + 0.15 * Math.min(1, rule)).toFixed(3)}) rotate(-3deg)`,
          background: C.paper,
          border: `4px solid ${C.red}`,
          borderRadius: 18,
          padding: '26px 46px',
          boxShadow: '0 20px 50px rgba(22,33,62,0.2)',
          textAlign: 'center',
        }}
      >
        <Kicker color={C.red} size={24}>langkah pertama</Kicker>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 58, color: C.ink, marginTop: 6}}>Baca aturannya dulu</div>
        <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.muted, marginTop: 8}}>format dari dosen atau panitia</div>
      </div>
    </>
  );
};
