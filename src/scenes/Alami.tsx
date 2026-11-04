import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PATTERNS = [
  {t: 'bukan …, melainkan …', line: 1, w: 'bukan'},
  {t: 'tidak hanya …, tetapi juga …', line: 1, w: 'hanya'},
  {t: 'Penting untuk dicatat, …', line: 2, w: 'penting'},
  {t: 'Dengan kata lain, …', line: 2, w: 'kata'},
];

const PHRASES = ['Berdasarkan hasil penelitian, …', 'Hal ini sejalan dengan …', 'Selain itu, …', 'Oleh karena itu, …'];

export const Alami: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const left = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const s0 = slot(t, cue(0), cue(3) - 0.1);
  const s1 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const s2 = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const s3 = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const rep = (i: number) => ramp(t, wordOf(0, 'berulang-ulang') - 0.6 + i * 0.3, wordOf(0, 'berulang-ulang') + i * 0.3);
  const fix = ramp(t, wordOf(3, 'langsung') - 0.2, wordOf(3, 'langsung') + 0.5);
  const fixT = ramp(t, wordOf(3, 'intinya'), wordOf(3, 'intinya') + 2.6, (x) => x);
  const loud = ramp(t, wordOf(5, 'keras') - 0.4, wordOf(5, 'keras') + 0.3);
  const bump = ramp(t, wordOf(5, 'tersandung') - 0.2, wordOf(5, 'tersandung') + 0.5);
  return (
    <>
      <Paper x={110} y={200} w={760} opacity={left} lift={1 - left} accent={C.red} pad="24px 34px">
        <Kicker color={C.red}>pola yang terasa kaku</Kicker>
        {PATTERNS.map((p) => {
          const q = ramp(t, wordOf(p.line, p.w) - 0.2, wordOf(p.line, p.w) + 0.5, BACK);
          return (
            <div key={p.t} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, opacity: Math.min(1, q), transform: `translateX(${((1 - Math.min(1, q)) * -24).toFixed(2)}px)`}}>
              <span style={{width: 40, height: 40, borderRadius: 20, background: C.red, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>×</span>
              <span style={{fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 36, color: C.ink}}>{p.t}</span>
            </div>
          );
        })}
        <div style={{marginTop: 26, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, cue(2) + 1, cue(2) + 1.6)}}>
          sesekali boleh, asal tidak di setiap paragraf
        </div>
      </Paper>
      {/* 0: pola yang berulang */}
      <div style={{position: 'absolute', left: 940, top: 200, width: 870, opacity: s0}}>
        <Kicker color={C.ink}>pola sama, berulang-ulang</Kicker>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{marginTop: 18, padding: '16px 22px', borderRadius: 14, background: '#fff', border: `1.5px solid ${C.faint}`, opacity: 0.35 + 0.65 * rep(i), fontFamily: FONT.serif, fontSize: 28, color: C.ink}}>
            <span style={{fontFamily: FONT.mono, fontSize: 18, color: C.muted, marginRight: 12}}>¶{i + 1}</span>
            … <span style={{border: `3px solid rgba(224,57,62,${rep(i).toFixed(3)})`, borderRadius: 8, padding: '0 6px'}}>bukan sekadar</span> … <span style={{border: `3px solid rgba(224,57,62,${rep(i).toFixed(3)})`, borderRadius: 8, padding: '0 6px'}}>melainkan</span> …
          </div>
        ))}
      </div>
      {/* 1: sebelum / sesudah */}
      <div style={{position: 'absolute', left: 940, top: 200, width: 870, opacity: s1}}>
        <Kicker color={C.red}>sebelum</Kicker>
        <div style={{marginTop: 10, padding: '18px 24px', borderRadius: 14, background: '#fff', border: `1.5px solid ${C.faint}`, fontFamily: FONT.serif, fontSize: 31, lineHeight: 1.5, color: C.ink, opacity: 1 - 0.45 * fix}}>
          Indikator <span style={{color: C.red}}>bukan sekadar</span> pewarna, <span style={{color: C.red}}>melainkan</span> senyawa yang <span style={{color: C.red}}>sangat krusial</span> dalam menunjukkan pH.
        </div>
        <div style={{marginTop: 26, opacity: fix}}>
          <Kicker color={C.mint}>sesudah: langsung ke inti</Kicker>
          <div style={{marginTop: 10, padding: '18px 24px', borderRadius: 14, background: '#fff', border: `2px solid ${C.mint}`}}>
            <TypeText parts={segs('Indikator asam basa merupakan zat yang warnanya berbeda dalam larutan asam dan basa.')} p={fixT} t={t} size={31} lh={1.5} />
          </div>
        </div>
      </div>
      {/* 2: ikuti gaya jurnal Indonesia */}
      <div style={{position: 'absolute', left: 940, top: 200, width: 870, opacity: s2}}>
        <Kicker color={C.blue}>frasa yang umum di jurnal Indonesia</Kicker>
        {PHRASES.map((p, i) => {
          const q = ramp(t, cue(4) + 0.6 + i * 0.4, cue(4) + 1.1 + i * 0.4, BACK);
          return (
            <div
              key={p}
              style={{
                marginTop: 16,
                padding: '14px 22px',
                borderRadius: 14,
                background: '#fff',
                border: `1.5px solid ${C.faint}`,
                borderLeft: `8px solid ${C.blue}`,
                fontFamily: FONT.serif,
                fontSize: 32,
                color: C.ink,
                opacity: Math.min(1, q),
                transform: `translateX(${((1 - Math.min(1, q)) * 30).toFixed(2)}px)`,
              }}
            >
              {p}
            </div>
          );
        })}
      </div>
      {/* 3: baca dengan suara keras */}
      <div style={{position: 'absolute', left: 940, top: 200, width: 870, opacity: s3}}>
        <Kicker color={C.violet}>baca dengan suara keras</Kicker>
        <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 20}}>
          <svg width={160} height={140} viewBox="0 0 160 140">
            <circle cx={50} cy={70} r={42} fill={C.ink} />
            <ellipse cx={72} cy={84} rx={10} ry={6 + 4 * Math.abs(Math.sin(t * 9)) * loud} fill="#fff" />
            {[0, 1, 2].map((k) => {
              const ph = ((t * 0.9 + k / 3) % 1 + 1) % 1;
              return <path key={k} d={`M${100 + ph * 40},${48 - ph * 10} Q${116 + ph * 40},70 ${100 + ph * 40},${92 + ph * 10}`} stroke={C.violet} strokeWidth={5} fill="none" strokeLinecap="round" opacity={loud * Math.min(1, ph * 6) * (1 - ph)} />;
            })}
          </svg>
          <div style={{fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.6, color: C.ink}}>
            Larutan yang telah diencerkan yang kemudian{' '}
            <span style={{textDecoration: `underline wavy rgba(224,57,62,${bump.toFixed(3)})`, textUnderlineOffset: 8, textDecorationThickness: 3}}>yang mana yang</span> dipanaskan …
          </div>
        </div>
        <div style={{marginTop: 22, fontFamily: FONT.sans, fontSize: 28, color: C.red, fontWeight: 700, opacity: bump}}>tersandung? → tulis ulang kalimatnya</div>
      </div>
    </>
  );
};
