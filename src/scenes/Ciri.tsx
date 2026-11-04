import React from 'react';
import {BACK, ramp} from '../anim';
import {Check, Kicker, Paper, TypeText, segs} from '../components/paper';
import {Stage} from '../components/primitives';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const lin = (x: number) => x;

const Pillar: React.FC<{x: number; a: number; n: string; title: string; color: string; children: React.ReactNode}> = ({x, a, n, title, color, children}) => (
  <Paper x={x} y={430} w={520} h={420} lift={1 - a} opacity={a} accent={color} pad="22px 30px">
    <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
      <span style={{fontFamily: FONT.serif, fontWeight: 600, fontSize: 52, color, lineHeight: 1}}>{n}</span>
      <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.ink}}>{title}</span>
    </div>
    <div style={{marginTop: 18}}>{children}</div>
  </Paper>
);

export const Ciri: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const sheet = ramp(t, cue(0) - 0.5, cue(0) + 0.4);
  const typ = ramp(t, cue(0) + 0.2, cue(0) + 3.2, lin);
  const def = segs(
    'Tulisan ilmiah menyajikan fakta dan hasil pemikiran secara ',
    {t: 'runtut', hl: ramp(t, wordOf(0, 'runtut'), wordOf(0, 'runtut') + 0.5)},
    ', ',
    {t: 'objektif', hl: ramp(t, wordOf(0, 'objektif'), wordOf(0, 'objektif') + 0.5)},
    ', dan ',
    {t: 'dapat dipertanggungjawabkan', hl: ramp(t, wordOf(0, 'dipertanggungjawabkan'), wordOf(0, 'dipertanggungjawabkan') + 0.8)},
    '.',
  );
  const a1 = ramp(t, cue(2) - 0.2, cue(2) + 0.6, BACK);
  const a2 = ramp(t, cue(3) - 0.2, cue(3) + 0.6, BACK);
  const a3 = ramp(t, cue(4) - 0.2, cue(4) + 0.6, BACK);
  const pre = ramp(t, cue(1), cue(1) + 0.8);
  // kartu 1: opini dicoret → data
  const strike = ramp(t, wordOf(2, 'diganti'), wordOf(2, 'diganti') + 0.6);
  const fixT = ramp(t, wordOf(2, 'misalnya'), cueEnd(2) + 0.3, lin);
  // kartu 2: rantai runtut
  const chain = ['Masalah', 'Teori', 'Data', 'Pembahasan', 'Simpulan'];
  const chainP = ramp(t, cue(3) + 0.8, cueEnd(3), lin);
  // kartu 3: klaim → sumber
  const cite = ramp(t, wordOf(4, 'sumbernya') - 0.4, wordOf(4, 'sumbernya') + 0.3);
  const fin = ramp(t, cue(5), cue(5) + 0.6);
  return (
    <>
      <Paper x={200} y={190} w={1520} h={200} lift={1 - sheet} opacity={sheet} pad="26px 44px">
        <TypeText parts={def} p={typ} t={t} size={40} lh={1.5} />
        <div style={{position: 'absolute', right: 40, bottom: 18, display: 'flex', gap: 26, fontFamily: FONT.sans, fontSize: 26, color: C.mint, fontWeight: 600}}>
          {['baku', 'sederhana', 'mudah dipahami'].map((w, i) => {
            const q = ramp(t, cue(5) + 0.3 + i * 0.5, cue(5) + 0.9 + i * 0.5);
            return (
              <span key={w} style={{display: 'flex', alignItems: 'center', gap: 8, opacity: Math.min(1, q * 3)}}>
                <Check p={q} size={30} />
                {w}
              </span>
            );
          })}
        </div>
      </Paper>
      <div style={{position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', opacity: pre * (1 - a1)}}>
        <Kicker color={C.ink} size={26}>tiga pegangan</Kicker>
      </div>
      <Pillar x={140} a={a1} n="1" title="Objektif" color={C.blue}>
        <div style={{fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.5, opacity: 1 - 0.4 * fin}}>
          <TypeText parts={segs({t: '“Menurut saya warnanya cantik.”', strike, italic: true, color: C.muted})} p={1} t={t} size={30} caret={false} />
          <div style={{marginTop: 26, fontFamily: FONT.sans, fontSize: 20, color: C.mint, fontWeight: 700, letterSpacing: 2, opacity: Math.min(1, fixT * 4)}}>DATA</div>
          <TypeText parts={segs('Warna larutan berubah dari ', {t: 'ungu', color: '#7f45a0', bold: true}, ' menjadi ', {t: 'hijau', color: C.mint, bold: true}, '.')} p={fixT} t={t} size={30} />
        </div>
      </Pillar>
      <Pillar x={700} a={a2} n="2" title="Logis & runtut" color={C.violet}>
        <div style={{position: 'relative', opacity: 1 - 0.4 * fin}}>
          {chain.map((c, i) => {
            const q = ramp(chainP * chain.length, i, i + 0.6);
            return (
              <div key={c} style={{display: 'flex', alignItems: 'center', gap: 16, height: 56, opacity: 0.25 + 0.75 * q}}>
                <span style={{width: 34, height: 34, borderRadius: 17, border: `3px solid ${C.violet}`, background: q > 0 ? `rgba(106,76,156,${(0.2 * q).toFixed(3)})` : 'transparent', flex: 'none'}} />
                <span style={{fontFamily: FONT.sans, fontSize: 30, color: C.ink, fontWeight: 500}}>{c}</span>
              </div>
            );
          })}
        </div>
      </Pillar>
      <Pillar x={1260} a={a3} n="3" title="Bersumber" color={C.red}>
        <div style={{fontFamily: FONT.serif, fontSize: 29, lineHeight: 1.5, opacity: 1 - 0.4 * fin}}>
          Banyak indikator asam basa berasal dari pigmen tumbuhan{' '}
          <span
            style={{
              display: 'inline-block',
              padding: '0 8px',
              borderRadius: 8,
              background: `rgba(255,227,110,${(0.95 * cite).toFixed(3)})`,
              border: `2px solid rgba(200,53,43,${cite.toFixed(3)})`,
              opacity: 0.3 + 0.7 * cite,
              fontFamily: FONT.sans,
              fontSize: 26,
            }}
          >
            (Overby & Chang, 2022)
          </span>
          .
        </div>
      </Pillar>
      <Stage>
        {/* buku sumber yang ditunjuk sitasi */}
        <g opacity={cite * a3 * (1 - 0.4 * fin)} transform={`translate(1520 ${770 - 10 * cite})`}>
          <rect x={-70} y={-48} width={140} height={96} rx={6} fill={C.blue} />
          <rect x={-60} y={-40} width={6} height={80} fill="#fff" opacity={0.5} />
          <text x={6} y={-6} textAnchor="middle" fontFamily={FONT.sans} fontWeight={700} fontSize={20} fill="#fff">
            Chemistry
          </text>
          <text x={6} y={22} textAnchor="middle" fontFamily={FONT.mono} fontSize={17} fill={C.hilite}>
            hlm. 744
          </text>
        </g>
        <path d="M1410,690 C1430,730 1440,760 1440,770" fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="6 7" opacity={cite * a3} markerEnd="url(#arrow-red)" />
      </Stage>
    </>
  );
};
