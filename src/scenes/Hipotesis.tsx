import React from 'react';
import {BACK, ramp} from '../anim';
import {Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PAT = [
  {k: 'apa yang diduga', c: C.blue, ex: 'Ekstrak kubis ungu diduga berwarna merah dalam larutan asam kuat,'},
  {k: 'alasannya', c: C.violet, ex: 'karena struktur antosianin berubah mengikuti pH larutan'},
  {k: 'sitasi', c: C.amber, ex: '(Leba et al., 2023).'},
];

export const Hipotesis: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const doc = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const def = ramp(t, cue(1) - 0.1, cue(1) + 0.5);
  const pat = (i: number) => ramp(t, cue(2) + 0.5 + i * 0.7, cue(2) + 1.0 + i * 0.7, BACK);
  const ex = (i: number) => ramp(t, cue(3) + 0.3 + i * 1.6, cue(3) + 1.0 + i * 1.6);
  const dg = ramp(t, wordOf(4, 'diduga') - 0.2, wordOf(4, 'diduga') + 0.5);
  const cmp = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const res = ramp(t, wordOf(5, 'pembahasan') - 0.2, cueEnd(5));
  return (
    <>
      <Panel x={120} y={200} w={520} h={640} p={doc} title="laporan sementara" col={C.blue}>
        {['Judul', 'Tujuan', 'Alur kerja', 'Persamaan reaksi', 'Hipotesis'].map((s, i) => {
          const on = i === 4 ? ramp(t, wordOf(0, 'hipotesis') - 0.2, wordOf(0, 'hipotesis') + 0.5) : 0;
          return (
            <div key={s} style={{marginTop: 14, padding: '16px 20px', borderRadius: 12, border: `2px solid ${i === 4 ? C.blue : C.faint}`, background: `rgba(47,98,240,${(0.12 * on).toFixed(3)})`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.ink, transform: `scale(${(1 + 0.05 * on).toFixed(3)})`}}>
              {s}
            </div>
          );
        })}
        <div style={{marginTop: 18, fontFamily: FONT.sans, fontSize: 21, color: C.muted}}>contoh susunan; ikuti panduan praktikum</div>
      </Panel>
      <div style={{position: 'absolute', left: 690, top: 210, width: 1110, opacity: def, transform: `translateY(${((1 - def) * 14).toFixed(2)}px)`}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.ink}}>
          Hipotesis = <span style={{color: C.blue}}>dugaan sementara</span> berdasarkan teori
        </div>
      </div>
      <div style={{position: 'absolute', left: 690, top: 300, width: 1110, display: 'flex', gap: 14, alignItems: 'center'}}>
        {PAT.map((p, i) => (
          <React.Fragment key={p.k}>
            <span style={{padding: '12px 24px', borderRadius: 12, background: p.c, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, opacity: Math.min(1, pat(i)), transform: `scale(${(0.85 + 0.15 * Math.min(1, pat(i))).toFixed(3)})`}}>{p.k}</span>
            {i < 2 ? <span style={{fontSize: 34, color: C.muted, opacity: Math.min(1, pat(i + 1))}}>+</span> : null}
          </React.Fragment>
        ))}
      </div>
      <Panel x={690} y={400} w={1110} h={250} p={ramp(t, cue(3) - 0.1, cue(3) + 0.4)} title="contoh hipotesis" col={C.violet}>
        <div style={{fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.6}}>
          {PAT.map((p, i) => (
            <span key={p.k} style={{borderBottom: `4px solid ${p.c}`, opacity: ex(i), marginRight: 8}}>
              {i === 0 ? (
                <>
                  Ekstrak kubis ungu <span style={{backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(dg * 100).toFixed(1)}% 0.55em`, backgroundPosition: '0 0.8em'}}>diduga</span> berwarna merah dalam larutan asam kuat,
                </>
              ) : (
                p.ex
              )}
            </span>
          ))}
        </div>
      </Panel>
      <div style={{position: 'absolute', left: 690, top: 690, width: 1110, opacity: cmp, display: 'flex', alignItems: 'center', gap: 22}}>
        <span style={{padding: '14px 22px', borderRadius: 12, border: `2px solid ${C.violet}`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28}}>hipotesis</span>
        <span style={{fontSize: 34, color: C.muted}}>⇄</span>
        <span style={{padding: '14px 22px', borderRadius: 12, border: `2px solid ${C.mint}`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 28}}>hasil pengamatan</span>
        <span style={{fontFamily: FONT.sans, fontSize: 28, color: C.ink, opacity: res}}>→ dibahas di <b>pembahasan</b>: sesuai atau berbeda?</span>
      </div>
    </>
  );
};
