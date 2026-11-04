import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Kicker, Paper, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const ICONS: Record<string, React.ReactNode> = {
  baca: <path d="M6,12 C14,8 22,8 30,12 L30,34 C22,30 14,30 6,34 Z M30,12 C38,8 46,8 54,12 L54,34 C46,30 38,30 30,34" fill="none" stroke={C.blue} strokeWidth={3.5} strokeLinejoin="round" />,
  tutup: <g fill="none" stroke={C.blue} strokeWidth={3.5} strokeLinejoin="round"><rect x={14} y={6} width={32} height={36} rx={4} /><line x1={20} y1={6} x2={20} y2={42} /></g>,
  tulis: <g fill="none" stroke={C.blue} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14,40 L18,28 L40,6 L48,14 L26,36 Z" /><line x1={10} y1={44} x2={50} y2={44} /></g>,
  cocokkan: <g fill="none" stroke={C.blue} strokeWidth={3.5} strokeLinecap="round"><circle cx={26} cy={22} r={13} /><line x1={36} y1={32} x2={48} y2={44} /><path d="M20,22 L25,27 L33,17" /></g>,
};

const STEPS = [
  {k: 'baca', label: 'Baca sampai paham'},
  {k: 'tutup', label: 'Tutup sumbernya'},
  {k: 'tulis', label: 'Tulis kalimatmu'},
  {k: 'cocokkan', label: 'Cocokkan lagi'},
];

export const Kutip: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const L = ramp(t, cue(0) - 0.2, cue(0) + 0.5, BACK);
  const R = ramp(t, wordOf(0, 'parafrase') - 0.2, wordOf(0, 'parafrase') + 0.5, BACK);
  const q1 = ramp(t, cue(1), cue(1) + 0.6);
  const pg = ramp(t, wordOf(1, 'halamannya') - 0.2, wordOf(1, 'halamannya') + 0.4);
  const p2 = ramp(t, cue(2) + 0.2, cueEnd(2) + 0.4, (x) => x);
  const cit = ramp(t, wordOf(2, 'sitasi') - 0.2, wordOf(2, 'sitasi') + 0.4);
  const sA = slot(t, cue(3) - 0.2, cue(4) - 0.1);
  const sB = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const sC = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const eq = ramp(t, wordOf(4, 'sama') - 0.2, wordOf(4, 'sama') + 0.4);
  const extra = ramp(t, wordOf(4, 'menambah') - 0.2, wordOf(4, 'menambah') + 0.4);
  const xExtra = ramp(t, wordOf(4, 'klaim') + 0.2, wordOf(4, 'klaim') + 0.7);
  const swap = ramp(t, wordOf(5, 'Mengganti') - 0.1, wordOf(5, 'Mengganti') + 1.4);
  const stamp = ramp(t, wordOf(5, 'plagiarisme') - 0.2, wordOf(5, 'plagiarisme') + 0.4, BACK);
  return (
    <>
      <Paper x={110} y={190} w={830} h={300} opacity={Math.min(1, L)} lift={1 - Math.min(1, L)} accent={C.amber} pad="22px 32px">
        <Kicker color={C.amber}>kutipan langsung</Kicker>
        <div style={{fontFamily: FONT.serif, fontSize: 31, lineHeight: 1.5, marginTop: 10, opacity: q1}}>
          <span style={{color: C.amber, fontWeight: 700}}>“</span>Antosianin memiliki ciri khas yaitu mengalami perubahan warna pada pH tertentu<span style={{color: C.amber, fontWeight: 700}}>”</span>{' '}
          <span style={{fontFamily: FONT.sans, fontSize: 26, padding: '0 6px', borderRadius: 6, background: `rgba(255,216,77,${(0.95 * pg).toFixed(3)})`}}>(Marka et al., 2025, hlm. 136)</span>.
        </div>
        <div style={{position: 'absolute', left: 32, bottom: 18, fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: pg}}>persis · tanda petik · nomor halaman · seperlunya</div>
      </Paper>
      <Paper x={980} y={190} w={830} h={300} opacity={Math.min(1, R)} lift={1 - Math.min(1, R)} accent={C.blue} pad="22px 32px">
        <Kicker color={C.blue}>parafrase</Kicker>
        <TypeText
          parts={segs('Warna antosianin dapat berubah pada pH tertentu ', {t: '(Marka et al., 2025)', hl: cit}, '.')}
          p={p2}
          t={t}
          size={31}
          lh={1.5}
          style={{marginTop: 10}}
        />
        <div style={{position: 'absolute', left: 32, bottom: 18, fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: cit}}>kalimat sendiri · makna sama · tetap disitasi</div>
      </Paper>
      {/* A: empat langkah */}
      <div style={{position: 'absolute', left: 110, top: 540, width: 1700, display: 'flex', justifyContent: 'space-between', opacity: sA}}>
        {STEPS.map((s, i) => {
          const on = ramp(t, wordOf(3, s.k) - 0.15, wordOf(3, s.k) + 0.35, BACK);
          return (
            <React.Fragment key={s.k}>
              <div
                style={{
                  width: 360,
                  height: 230,
                  borderRadius: 18,
                  background: '#fff',
                  border: `2px solid ${interpolateColors(Math.min(1, on), [0, 1], [C.faint, C.blue])}`,
                  boxShadow: `0 ${8 + 10 * on}px ${22 + 12 * on}px rgba(22,33,62,${(0.06 + 0.06 * on).toFixed(3)})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  opacity: 0.4 + 0.6 * Math.min(1, on),
                  transform: `translateY(${(-12 * Math.min(1, on)).toFixed(2)}px)`,
                }}
              >
                <div style={{width: 76, height: 76, borderRadius: 38, background: `${C.blue}18`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width={60} height={50} viewBox="0 0 60 50">{ICONS[s.k]}</svg>
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 22, color: C.blue, fontWeight: 600}}>langkah {i + 1}</div>
                <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: C.ink}}>{s.label}</div>
              </div>
              {i < 3 ? <div style={{alignSelf: 'center', fontSize: 44, color: C.blue, opacity: Math.min(1, on)}}>→</div> : null}
            </React.Fragment>
          );
        })}
      </div>
      {/* B: makna sama, tanpa klaim baru */}
      <div style={{position: 'absolute', left: 110, top: 540, width: 1700, opacity: sB, display: 'flex', alignItems: 'center', gap: 30}}>
        <div style={{flex: 1, padding: '20px 26px', borderRadius: 16, background: '#fff', border: `1.5px solid ${C.faint}`, fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.45}}>
          <Kicker>sumber</Kicker>
          mengalami perubahan warna pada pH tertentu
        </div>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 64, color: C.mint, opacity: eq}}>=</div>
        <div style={{flex: 1.4, padding: '20px 26px', borderRadius: 16, background: '#fff', border: `2px solid ${C.mint}`, fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.45}}>
          <Kicker color={C.mint}>parafrase</Kicker>
          dapat berubah pada pH tertentu{' '}
          <span style={{position: 'relative', color: C.red, opacity: extra}}>
            dan aman dikonsumsi
            <span style={{position: 'absolute', left: -3, top: '55%', height: 4, width: `calc(${(xExtra * 100).toFixed(1)}% + ${(6 * (xExtra)).toFixed(2)}px)`, background: C.red, borderRadius: 2}} />
          </span>
          <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.red, fontWeight: 600, marginTop: 6, opacity: xExtra}}>klaim tambahan yang tidak ada di sumber → hapus</div>
        </div>
      </div>
      {/* C: ganti kata tanpa sumber */}
      <div style={{position: 'absolute', left: 110, top: 540, width: 1700, opacity: sC}}>
        <div style={{padding: '22px 30px', borderRadius: 16, background: '#fff', border: `2px solid ${C.red}`, fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.6, color: C.ink, position: 'relative'}}>
          <Kicker color={C.red}>hanya mengganti beberapa kata, tanpa sumber</Kicker>
          Antosianin{' '}
          {[
            ['memiliki', 'mempunyai'],
            ['ciri khas', 'sifat khusus'],
          ].map(([a, b], i) => {
            const q = ramp(swap * 2, i * 0.5, i * 0.5 + 0.8);
            return (
              <span key={a} style={{display: 'inline-grid', marginRight: '0.25em'}}>
                <span style={{gridArea: '1 / 1', opacity: 1 - q}}>{a}</span>
                <span style={{gridArea: '1 / 1', opacity: q, background: `rgba(224,57,62,${(0.14 * q).toFixed(3)})`, borderRadius: 4}}>{b}</span>
              </span>
            );
          })}
          yaitu mengalami perubahan warna pada pH tertentu.
          <span style={{marginLeft: 12, fontFamily: FONT.sans, fontSize: 24, color: C.red, opacity: swap}}>( tanpa sitasi )</span>
          <div
            style={{
              position: 'absolute',
              right: 30,
              bottom: -30,
              opacity: Math.min(1, stamp),
              transform: `rotate(-6deg) scale(${(1.3 - 0.3 * Math.min(1, stamp)).toFixed(3)})`,
              background: '#fff',
              border: `4px solid ${C.red}`,
              color: C.red,
              borderRadius: 12,
              padding: '4px 22px',
              fontFamily: FONT.mono,
              fontWeight: 600,
              fontSize: 36,
              letterSpacing: 4,
            }}
          >
            PLAGIARISME
          </div>
        </div>
      </div>
    </>
  );
};
