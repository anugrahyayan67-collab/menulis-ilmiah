import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Label, Stage} from '../components/primitives';
import {Check, Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const DX = 120;
const DW = 560;
const ROWS = Array.from({length: 22}, (_, i) => ({y: 300 + i * 24, w: (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7 + 0.4))) * (DW - 80), para: i === 7 || i === 15}));

const Box: React.FC<{p: number; title: string; col: string; children: React.ReactNode}> = ({p, title, col, children}) => (
  <div
    style={{
      position: 'absolute',
      left: 780,
      top: 200,
      width: 1030,
      height: 640,
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

const LEVELS = [
  {t: 'Isi & urutan', w: 900, c: C.blue},
  {t: 'Paragraf', w: 740, c: C.cyan},
  {t: 'Kalimat', w: 580, c: C.violet},
  {t: 'Ejaan', w: 420, c: C.mint},
];
const FORMAT = ['kertas A4', 'margin sesuai panduan (contoh: kiri 4 cm, lainnya 3 cm)', 'huruf Times New Roman 12', 'spasi 1,5', 'nomor halaman'];

export const Revisi: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const doc = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const draf = ramp(t, wordOf(0, 'draf') - 0.2, wordOf(0, 'draf') + 0.4, BACK);
  const marks = ramp(t, wordOf(0, 'revisi') - 0.2, cue(5) + 2, (x) => x);
  const b1 = slot(t, cue(1) - 0.2, cue(2) - 0.1);
  const b2 = slot(t, cue(2) - 0.1, cue(3) - 0.1);
  const b3 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const b4 = slot(t, cue(4) - 0.1, cue(5) - 0.1);
  const b5 = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const wait = ramp(t, cue(1), wordOf(1, 'lalu'), (x) => x);
  const eye = ramp(t, wordOf(1, 'mata') - 0.2, wordOf(1, 'mata') + 0.4);
  const claim = ramp(t, wordOf(3, 'sumber') - 0.2, wordOf(3, 'sumber') + 0.4);
  const pg = ramp(t, wordOf(3, 'halamannya') - 0.2, wordOf(3, 'halamannya') + 0.4);
  const q = (k: number) => ramp(t, wordOf(5, 'bingung') - 0.4 + k * 0.3, wordOf(5, 'bingung') + k * 0.3, BACK);
  // tanda pena merah yang makin banyak di draf
  const MARKS = [
    {y: 324, x: 160, w: 260},
    {y: 444, x: 240, w: 200},
    {y: 492, x: 150, w: 330},
    {y: 612, x: 300, w: 180},
    {y: 708, x: 170, w: 240},
  ];
  return (
    <>
      <Stage>
        <g opacity={doc}>
          <rect x={DX} y={200} width={DW} height={640} rx={14} fill="#fff" stroke={C.faint} strokeWidth={1.5} filter="url(#paper-shadow)" />
          <rect x={DX + 40} y={236} width={DW - 220} height={18} rx={9} fill={C.ink} opacity={0.7} />
          {ROWS.map((r, i) => (
            <rect key={i} x={DX + 40 + (r.para ? 30 : 0)} y={r.y} width={r.w - (r.para ? 30 : 0)} height={7} rx={3.5} fill={C.ink} opacity={0.22} />
          ))}
          {MARKS.map((m, i) => {
            const p = ramp(marks * MARKS.length, i, i + 0.8);
            return (
              <g key={i}>
                <path d={`M${m.x},${m.y + 4} q${m.w / 4},6 ${m.w / 2},0 t${m.w / 2},0`} fill="none" stroke={C.red} strokeWidth={4} strokeLinecap="round" strokeDasharray={`${m.w * 1.2} ${m.w * 1.2}`} strokeDashoffset={m.w * 1.2 * (1 - p)} />
                <circle cx={m.x + m.w + 30} cy={m.y + 2} r={14 * p} fill="none" stroke={C.red} strokeWidth={3} />
              </g>
            );
          })}
          {[0, 1, 2].map((k) => (
            <g key={k} opacity={q(k)} transform={`translate(${DX + DW - 40} ${360 + k * 170})`}>
              <circle r={26} fill={C.amber} />
              <Label x={0} y={2} size={32} weight={800} color="#fff" halo={false}>
                ?
              </Label>
            </g>
          ))}
        </g>
      </Stage>
      <div
        style={{
          position: 'absolute',
          left: DX + DW - 230,
          top: 222,
          opacity: Math.min(1, draf),
          transform: `rotate(-6deg) scale(${(1.3 - 0.3 * Math.min(1, draf)).toFixed(3)})`,
          border: `4px solid ${C.red}`,
          borderRadius: 12,
          padding: '2px 18px',
          fontFamily: FONT.mono,
          fontWeight: 600,
          fontSize: 34,
          letterSpacing: 4,
          color: C.red,
          background: '#fff',
        }}
      >
        DRAF 1
      </div>
      <Box p={b1} title="diamkan sebentar" col={C.blue}>
        <div style={{display: 'flex', alignItems: 'center', gap: 50, marginTop: 40}}>
          <svg width={240} height={240} viewBox="-120 -120 240 240">
            <circle r={100} fill="#fff" stroke={C.ink} strokeWidth={6} />
            <path d={`M0,0 L0,-100 A100,100 0 ${wait > 0.5 ? 1 : 0} 1 ${(100 * Math.sin(2 * Math.PI * wait)).toFixed(2)},${(-100 * Math.cos(2 * Math.PI * wait)).toFixed(2)} Z`} fill={C.blue} opacity={0.18} />
            <line x1={0} y1={0} x2={(70 * Math.sin(2 * Math.PI * wait)).toFixed(2)} y2={(-70 * Math.cos(2 * Math.PI * wait)).toFixed(2)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <circle r={8} fill={C.ink} />
          </svg>
          <div>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 48, color: C.ink}}>istirahat dulu</div>
            <div style={{fontFamily: FONT.sans, fontSize: 32, color: C.muted, marginTop: 8}}>beberapa jam, atau besok</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 30, opacity: eye}}>
              <svg width={70} height={44} viewBox="0 0 70 44">
                <path d="M3,22 C15,4 55,4 67,22 C55,40 15,40 3,22 Z" fill="#fff" stroke={C.blue} strokeWidth={4} />
                <circle cx={35} cy={22} r={10} fill={C.blue} />
              </svg>
              <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.blue}}>baca sebagai pembaca</span>
            </div>
          </div>
        </div>
      </Box>
      <Box p={b2} title="dari yang besar ke yang kecil" col={C.violet}>
        {LEVELS.map((l, i) => {
          const a = ramp(t, wordOf(2, ['isi', 'paragraf', 'kalimat', 'ejaan'][i]) - 0.15, wordOf(2, ['isi', 'paragraf', 'kalimat', 'ejaan'][i]) + 0.4, BACK);
          return (
            <div key={l.t} style={{width: l.w, margin: '18px auto 0', padding: '20px 0', textAlign: 'center', borderRadius: 14, background: l.c, color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, opacity: Math.min(1, a), transform: `scale(${(0.9 + 0.1 * Math.min(1, a)).toFixed(3)})`}}>
              {i + 1}. {l.t}
            </div>
          );
        })}
      </Box>
      <Box p={b3} title="cocokkan klaim dengan sumber" col={C.red}>
        <div style={{fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.6}}>
          “Antosianin merupakan zat warna alami yang dapat berubah warna pada pH tertentu{' '}
          <span style={{background: `rgba(255,216,77,${claim.toFixed(3)})`, borderRadius: 4}}>(Marka et al., 2025)</span>.”
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 30, opacity: claim}}>
          <span style={{fontSize: 40, color: C.red}}>↓</span>
          <div style={{padding: '16px 22px', borderRadius: 14, border: `2px solid ${C.faint}`, fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 28}}>
            “Antosianin memiliki ciri khas yaitu mengalami perubahan warna pada pH tertentu.”
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, opacity: pg, fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.mint}}>
          <Check p={pg} size={44} /> Marka et al. (2025), hlm. 136 · sesuai
        </div>
      </Box>
      <Box p={b4} title="cek format sesuai panduan" col={C.cyan}>
        {FORMAT.map((f, i) => {
          const k = ramp(t, cue(4) + 0.8 + i * 0.5, cue(4) + 1.3 + i * 0.5);
          return (
            <div key={f} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, fontFamily: FONT.sans, fontSize: 32, opacity: 0.35 + 0.65 * k}}>
              <Check p={k} size={42} /> {f}
            </div>
          );
        })}
      </Box>
      <Box p={b5} title="minta teman membaca" col={C.amber}>
        <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 30}}>
          <svg width={220} height={220} viewBox="0 0 220 220">
            <circle cx={110} cy={80} r={50} fill={C.amber} opacity={0.85} />
            <path d="M30,210 C40,140 180,140 190,210 Z" fill={C.amber} opacity={0.85} />
            <circle cx={170} cy={36} r={24 * q(0)} fill="#fff" stroke={C.amber} strokeWidth={4} />
            <text x={170} y={47} textAnchor="middle" fontFamily={FONT.sans} fontWeight={800} fontSize={30} fill={C.amber} opacity={q(0)}>
              ?
            </text>
          </svg>
          <div style={{fontFamily: FONT.sans, fontSize: 36, lineHeight: 1.45, color: C.ink}}>
            Bagian yang membuatnya
            <br />
            <b style={{color: C.amber}}>bingung</b> → <b>perlu diperjelas</b>
          </div>
        </div>
      </Box>
    </>
  );
};
