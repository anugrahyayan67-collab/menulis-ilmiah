import React from 'react';
import {BACK, EASE_IN_OUT, ramp} from '../anim';
import {Label, Stage} from '../components/primitives';
import {DocPage, Kicker, NoteCard} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const CARDS = [
  {head: 'Overby & Chang (2022)', page: 'hlm. 744', q: '“Many acid-base indicators are plant pigments.”', m: 'Banyak indikator asam basa berasal dari pigmen tumbuhan.', col: C.blue},
  {head: 'Marka et al. (2025)', page: 'hlm. 136', q: '“Antosianin memiliki ciri khas yaitu mengalami perubahan warna pada pH tertentu.”', m: 'Antosianin berubah warna pada pH tertentu.', col: '#7f45a0'},
  {head: 'Marka et al. (2025)', page: 'hlm. 137', q: '“pH merupakan suatu parameter yang digunakan untuk menyatakan tingkat keasaman larutan.”', m: 'pH menyatakan tingkat keasaman larutan.', col: C.cyan},
];

const COLS = ['Asam–basa', 'pH', 'Indikator', 'Antosianin', 'Kestabilan warna'];
const ROWS: {name: string; has: number[]}[] = [
  {name: 'Overby & Chang (2022)', has: [1, 1, 1, 0, 0]},
  {name: 'Marka et al. (2025)', has: [1, 1, 1, 1, 0]},
  {name: 'Ayun et al. (2022)', has: [0, 1, 1, 1, 1]},
  {name: 'Leba et al. (2023)', has: [0, 0, 1, 1, 0]},
];

export const Catat: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const mess = Math.min(ramp(t, cue(0) - 0.4, cue(0) + 0.6), 1 - ramp(t, cue(1) - 0.4, cue(1) + 0.4, EASE_IN_OUT));
  const lupa = ramp(t, wordOf(0, 'lupa'), wordOf(0, 'lupa') + 0.5);
  const tbl = ramp(t, cue(3) - 0.3, cue(3) + 0.5);
  const weak = ramp(t, wordOf(4, 'kurang') - 0.3, wordOf(4, 'kurang') + 0.4);
  const strong = ramp(t, wordOf(4, 'kuat') - 0.3, wordOf(4, 'kuat') + 0.4);
  const sticky = ramp(t, cue(5) - 0.2, cue(5) + 0.5, BACK);
  const stamp = ramp(t, wordOf(5, 'dikarang') - 0.2, wordOf(5, 'dikarang') + 0.4, BACK);
  return (
    <>
      <Stage>
        {/* tumpukan berantakan */}
        <g opacity={mess}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <DocPage key={i} x={560 + i * 150 + 10 * Math.sin(t + i)} y={520 + (i % 2) * 60} w={200} h={270} rot={(i - 2.5) * 9 + 3 * Math.sin(t * 0.7 + i)} seed={i} figure={i % 2 === 0} />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={lupa} transform={`translate(${700 + i * 260} ${330 - 10 * Math.sin(t * 2 + i)})`}>
              <circle r={34} fill={C.red} />
              <Label x={0} y={2} size={40} weight={800} color="#fff" halo={false}>
                ?
              </Label>
            </g>
          ))}
        </g>
        <g opacity={mess * lupa}>
          <Label x={960} y={860} size={34} weight={700} color={C.red}>
            “Ini dari jurnal mana, ya?”
          </Label>
        </g>
      </Stage>
      {CARDS.map((c, i) => {
        const a = ramp(t, wordOf(1, 'kartu') - 0.2 + i * 0.35, wordOf(1, 'kartu') + 0.5 + i * 0.35, BACK);
        const mine = ramp(t, wordOf(2, 'ulang') + i * 0.4, wordOf(2, 'ulang') + 0.6 + i * 0.4);
        const focus = Math.min(ramp(t, cue(2) - 0.2, cue(2) + 0.4), 1 - ramp(t, cue(3) - 0.4, cue(3) + 0.2)) * (i === 0 ? 1 : 0);
        return (
          <NoteCard
            key={i}
            x={400 + 20 * (1 - Math.min(1, a))}
            y={300 + i * 225}
            w={560}
            rot={(i - 1) * 1.2 * (1 - focus)}
            scale={(0.92 + 0.08 * Math.min(1, a)) * (1 + 0.04 * focus)}
            opacity={Math.min(1, a)}
            head={c.head}
            page={c.page}
            accent={c.col}
            size={21}
            quote={c.q}
            mine={
              <span style={{opacity: mine, display: 'inline-block', transform: `translateY(${((1 - mine) * 6).toFixed(2)}px)`}}>
                <b style={{color: C.mint}}>Kalimatku:</b> {c.m}
              </span>
            }
          />
        );
      })}
      {/* matriks sumber */}
      <div
        style={{
          position: 'absolute',
          left: 760,
          top: 205,
          width: 1060,
          opacity: tbl,
          transform: `translateY(${((1 - tbl) * 20).toFixed(2)}px)`,
          background: '#fff',
          border: `1.5px solid ${C.faint}`,
          borderRadius: 16,
          boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
          padding: '18px 22px',
        }}
      >
        <Kicker color={C.ink}>matriks sumber</Kicker>
        <div style={{display: 'grid', gridTemplateColumns: '250px repeat(5, 1fr)', marginTop: 12, fontFamily: FONT.sans}}>
          <div />
          {COLS.map((c, k) => {
            const isWeak = k === 4;
            const isStrong = k === 2;
            return (
              <div
                key={c}
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 21,
                  padding: '8px 4px',
                  borderRadius: 10,
                  color: C.ink,
                  background: isWeak ? `rgba(224,57,62,${(0.14 * weak).toFixed(3)})` : isStrong ? `rgba(19,154,99,${(0.14 * strong).toFixed(3)})` : undefined,
                }}
              >
                {c}
              </div>
            );
          })}
          {ROWS.map((r, i) => (
            <React.Fragment key={r.name}>
              <div style={{fontSize: 22, color: C.ink, padding: '14px 0', borderTop: `1.5px solid ${C.faint}`}}>{r.name}</div>
              {r.has.map((h, k) => {
                const q = ramp(t, cue(3) + 0.6 + (i * 5 + k) * 0.07, cue(3) + 0.9 + (i * 5 + k) * 0.07, BACK);
                return (
                  <div key={k} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: `1.5px solid ${C.faint}`}}>
                    {h ? (
                      <span style={{width: 26, height: 26, borderRadius: 13, background: k === 4 ? C.red : C.blue, opacity: Math.min(1, q), transform: `scale(${q.toFixed(3)})`}} />
                    ) : (
                      <span style={{width: 12, height: 3, borderRadius: 2, background: C.faint}} />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <div style={{fontSize: 20, color: C.muted, padding: '12px 0', borderTop: `1.5px solid ${C.faint}`}}>jumlah sumber</div>
          {COLS.map((_, k) => {
            const n = ROWS.reduce((s, r) => s + r.has[k], 0);
            const show = Math.max(strong, weak);
            return (
              <div key={k} style={{textAlign: 'center', padding: '12px 0', borderTop: `1.5px solid ${C.faint}`, fontFamily: FONT.mono, fontWeight: 600, fontSize: 24, color: n <= 1 ? C.red : C.mint, opacity: show}}>
                {n}
              </div>
            );
          })}
        </div>
      </div>
      {/* catatan klaim tanpa sumber */}
      <div
        style={{
          position: 'absolute',
          left: 1100,
          top: 680,
          width: 700,
          opacity: Math.min(1, sticky),
          transform: `rotate(${(-1.5 * Math.min(1, sticky)).toFixed(2)}deg) scale(${(0.9 + 0.1 * Math.min(1, sticky)).toFixed(3)})`,
          background: '#fff4c2',
          borderRadius: 12,
          border: `1.5px solid #f0d76a`,
          padding: '16px 22px',
          boxShadow: '0 10px 26px rgba(22,33,62,0.12)',
          fontFamily: FONT.sans,
        }}
      >
        <div style={{fontWeight: 700, fontSize: 24, color: C.ink}}>Klaim: warna ekstrak tetap stabil berminggu-minggu</div>
        <div style={{fontSize: 22, color: C.red, marginTop: 6, fontWeight: 600}}>Sumber? Belum ketemu → tandai dulu</div>
        <div
          style={{
            position: 'absolute',
            right: 18,
            top: -26,
            opacity: Math.min(1, stamp),
            transform: `rotate(6deg) scale(${(1.3 - 0.3 * Math.min(1, stamp)).toFixed(3)})`,
            border: `3px solid ${C.red}`,
            background: '#fff',
            color: C.red,
            borderRadius: 10,
            padding: '2px 14px',
            fontFamily: FONT.mono,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          JANGAN DIKARANG
        </div>
      </div>
    </>
  );
};
