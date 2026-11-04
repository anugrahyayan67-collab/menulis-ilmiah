import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, EASE_IN_OUT, ramp, slot} from '../anim';
import {Label, Stage} from '../components/primitives';
import {Check, Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const CX = 410;
const SHAPES = [
  {k: 'I', name: 'Pendahuluan', col: C.blue, d: `M${CX - 240},250 L${CX + 240},250 L${CX + 80},380 L${CX - 80},380 Z`, ly: 300},
  {k: 'M', name: 'Metode', col: C.cyan, d: `M${CX - 80},392 L${CX + 80},392 L${CX + 80},462 L${CX - 80},462 Z`, ly: 427},
  {k: 'R', name: 'Hasil', col: C.violet, d: `M${CX - 80},474 L${CX + 80},474 L${CX + 80},544 L${CX - 80},544 Z`, ly: 509},
  {k: 'D', name: 'Pembahasan', col: C.amber, d: `M${CX - 80},556 L${CX + 80},556 L${CX + 240},686 L${CX - 240},686 Z`, ly: 640},
];
const ABS = [
  {t: 'latar belakang', c: C.blue},
  {t: 'tujuan', c: C.cyan},
  {t: 'metode', c: C.violet},
  {t: 'hasil utama', c: C.amber},
  {t: 'simpulan', c: C.mint},
];

const Box: React.FC<{p: number; title: string; col: string; children: React.ReactNode}> = ({p, title, col, children}) => (
  <div
    style={{
      position: 'absolute',
      left: 770,
      top: 210,
      width: 1040,
      height: 600,
      boxSizing: 'border-box',
      padding: '26px 36px',
      background: '#fff',
      border: `1.5px solid ${C.faint}`,
      borderTop: `6px solid ${col}`,
      borderRadius: 16,
      boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
      opacity: p,
      transform: `translateY(${((1 - p) * 18).toFixed(2)}px)`,
    }}
  >
    <Kicker color={col}>{title}</Kicker>
    <div style={{marginTop: 16}}>{children}</div>
  </div>
);

export const Artikel: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const draw = (i: number) => ramp(t, cue(0) + 0.2 + i * 0.3, cue(0) + 0.8 + i * 0.3, BACK);
  const on = [
    Math.min(ramp(t, cue(1) - 0.2, cue(1) + 0.3), 1 - ramp(t, cue(2) - 0.3, cue(2))),
    Math.min(ramp(t, cue(2) - 0.2, cue(2) + 0.3), 1 - ramp(t, cue(3) - 0.3, cue(3))),
    Math.min(ramp(t, wordOf(3, 'Hasil') - 0.2, wordOf(3, 'Hasil') + 0.3), 1 - ramp(t, wordOf(3, 'pembahasan') - 0.3, wordOf(3, 'pembahasan'))),
    Math.min(ramp(t, wordOf(3, 'pembahasan') - 0.2, wordOf(3, 'pembahasan') + 0.3), 1 - ramp(t, cue(4) - 0.3, cue(4))),
  ];
  const b1 = slot(t, cue(1) - 0.2, cue(2) - 0.1);
  const b2 = slot(t, cue(2) - 0.1, cue(3) - 0.1);
  const b3 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const b4 = slot(t, cue(4) - 0.1, cue(6) - 0.1);
  const b6 = ramp(t, cue(6) - 0.1, cue(6) + 0.5);
  const absIn = ramp(t, cue(4) - 0.2, cue(4) + 0.4);
  const absMove = ramp(t, wordOf(4, 'walaupun') - 0.2, wordOf(4, 'depan') + 0.4, EASE_IN_OUT);
  const absY = 720 + (190 - 720) * absMove;
  const loop = ramp(t, wordOf(2, 'mengulang') - 0.3, wordOf(2, 'mengulang') + 0.8);
  return (
    <>
      <Stage>
        {SHAPES.map((s, i) => {
          const a = Math.min(1, draw(i));
          return (
            <g key={s.k} opacity={a}>
              <path d={s.d} fill={s.col} fillOpacity={0.07 + 0.25 * on[i]} stroke={s.col} strokeWidth={3 + 2 * on[i]} strokeLinejoin="round" />
              <Label x={CX} y={s.ly} size={i === 0 || i === 3 ? 32 : 26} weight={800} color={C.ink} halo={false}>
                {s.name}
              </Label>
              <Label x={i === 0 || i === 3 ? CX - 280 : CX - 120} y={s.ly} size={34} weight={800} color={s.col} font="mono" halo={false}>
                {s.k}
              </Label>
            </g>
          );
        })}
        <g opacity={Math.min(1, draw(0))}>
          <Label x={CX} y={730} size={22} color={C.muted} weight={600} halo={false}>
            luas → sempit → luas
          </Label>
        </g>
      </Stage>
      {/* kartu abstrak yang pindah dari akhir ke depan */}
      <div
        style={{
          position: 'absolute',
          left: CX - 250,
          top: absY,
          width: 500,
          height: 48,
          borderRadius: 12,
          background: C.mint,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          boxSizing: 'border-box',
          fontFamily: FONT.sans,
          fontWeight: 800,
          fontSize: 26,
          opacity: absIn,
          boxShadow: '0 10px 24px rgba(19,154,99,0.3)',
        }}
      >
        <span>Abstrak</span>
        <span style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap'}}>ditulis terakhir · letak di depan</span>
      </div>
      <Box p={b1} title="I · pendahuluan" col={C.blue}>
        {['Masalah', 'Yang sudah diteliti', 'Celah penelitian', 'Tujuan penelitian'].map((x, i) => {
          const q = ramp(t, cue(1) + 0.4 + i * 0.7, cue(1) + 0.9 + i * 0.7, BACK);
          const w = 900 - i * 150;
          return (
            <div key={x} style={{width: w, marginTop: 16, padding: '16px 24px', borderRadius: 14, background: `rgba(47,98,240,${(0.06 + i * 0.05).toFixed(3)})`, border: `2px solid ${C.blue}`, fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.ink, opacity: Math.min(1, q), transform: `translateX(${((1 - Math.min(1, q)) * 30).toFixed(2)}px)`}}>
              {x}
            </div>
          );
        })}
      </Box>
      <Box p={b2} title="M · metode" col={C.cyan}>
        <div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
          <div style={{flex: 1, fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.7}}>
            {['bahan & alat yang dipakai', 'jumlah, konsentrasi, suhu', 'urutan langkah', 'cara mengukur & mengolah data'].map((x, i) => (
              <div key={x} style={{opacity: ramp(t, cue(2) + 0.3 + i * 0.35, cue(2) + 0.7 + i * 0.35)}}>• {x}</div>
            ))}
          </div>
          <svg width={240} height={240} viewBox="-120 -120 240 240" style={{opacity: loop}}>
            <circle r={84} fill="none" stroke={C.cyan} strokeWidth={8} strokeDasharray={`${(528 * loop).toFixed(1)} 600`} transform="rotate(-90)" />
            <path d="M0,-104 L18,-84 L0,-64" fill="none" stroke={C.cyan} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={loop} transform={`rotate(${(360 * loop - 90 + 90).toFixed(1)})`} />
            <text textAnchor="middle" y={10} fontFamily={FONT.sans} fontWeight={800} fontSize={30} fill={C.cyan}>
              bisa
            </text>
            <text textAnchor="middle" y={42} fontFamily={FONT.sans} fontWeight={800} fontSize={30} fill={C.cyan}>
              diulang
            </text>
          </svg>
        </div>
      </Box>
      <Box p={b3} title="R & D · hasil dan pembahasan" col={C.violet}>
        <div style={{display: 'flex', gap: 30}}>
          <div style={{flex: 1, padding: 20, borderRadius: 14, border: `2px solid ${C.violet}`}}>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: C.violet}}>Hasil = data</div>
            <svg width={380} height={220} viewBox="0 0 380 220" style={{marginTop: 10}}>
              <line x1={20} y1={200} x2={370} y2={200} stroke={C.ink} strokeWidth={3} />
              {[60, 110, 150, 90].map((h, i) => {
                const q = ramp(t, cue(3) + 0.3 + i * 0.25, cue(3) + 0.8 + i * 0.25);
                return <rect key={i} x={50 + i * 80} y={200 - h * 1.2 * q} width={50} height={h * 1.2 * q} rx={6} fill={C.violet} opacity={0.75} />;
              })}
            </svg>
          </div>
          <div style={{flex: 1, padding: 20, borderRadius: 14, border: `2px solid ${C.amber}`, opacity: ramp(t, wordOf(3, 'pembahasan') - 0.2, wordOf(3, 'pembahasan') + 0.4)}}>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: C.amber}}>Pembahasan = tafsiran</div>
            <div style={{fontFamily: FONT.sans, fontSize: 28, lineHeight: 1.6, marginTop: 14}}>
              • mengapa datanya begitu?
              <br />• sejalan dengan penelitian lain?
              <br />• apa artinya bagi pertanyaan?
            </div>
          </div>
        </div>
      </Box>
      <Box p={b4} title="abstrak" col={C.mint}>
        <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.ink}}>
          Ditulis <b>paling akhir</b>, setelah semua bagian selesai.
        </div>
        <div style={{display: 'flex', marginTop: 36, borderRadius: 14, overflow: 'hidden', border: `2px solid ${C.faint}`}}>
          {ABS.map((a, i) => {
            const q = ramp(t, wordOf(5, a.t.split(' ')[0]) - 0.15, wordOf(5, a.t.split(' ')[0]) + 0.35);
            return (
              <div key={a.t} style={{flex: 1, position: 'relative', padding: '22px 8px', textAlign: 'center', background: '#fff', borderLeft: i ? `2px solid #fff` : undefined}}>
                <div style={{position: 'absolute', inset: 0, background: a.c, opacity: q}} />
                <span style={{position: 'relative', fontFamily: FONT.sans, fontWeight: 700, fontSize: 25, color: interpolateColors(q, [0, 1], [C.muted, '#ffffff'])}}>{a.t}</span>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 18, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, wordOf(5, 'satu') - 0.2, wordOf(5, 'satu') + 0.4)}}>biasanya satu paragraf</div>
      </Box>
      <Box p={b6} title="pedoman penulis jurnal tujuan" col={C.ink}>
        {['panjang abstrak (jumlah kata)', 'templat & format naskah', 'gaya sitasi yang diminta', 'batas jumlah halaman'].map((x, i) => {
          const q = ramp(t, cue(6) + 0.4 + i * 0.45, cue(6) + 0.9 + i * 0.45);
          return (
            <div key={x} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 20, fontFamily: FONT.sans, fontSize: 32, opacity: 0.35 + 0.65 * q}}>
              <Check p={q} size={40} /> {x}
            </div>
          );
        })}
        <div style={{marginTop: 28, fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, cueEnd(6) - 0.5, cueEnd(6))}}>cari di laman jurnal: “Author Guidelines” / “Pedoman Penulis”</div>
      </Box>
    </>
  );
};
