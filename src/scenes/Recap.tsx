import React from 'react';
import {BACK, EASE_IN_OUT, ramp} from '../anim';
import {PARTS} from '../components/ChapterHeading';
import {DrawPath, Stage} from '../components/primitives';
import {Pen} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const ST = [
  {x: 250, y: 560, t: 'Jenis karya\n& pertanyaan', line: 1, part: 1},
  {x: 600, y: 420, t: 'Sumber, baca\n& catat', line: 2, part: 2},
  {x: 960, y: 560, t: 'Kerangka, paragraf\n& kalimat', line: 3, part: 3},
  {x: 1320, y: 420, t: 'Kutip\n& sitasi', line: 4, part: 4},
  {x: 1670, y: 560, t: 'Rakit\n& revisi', line: 4, part: 5},
];
const PATH = 'M250,560 C420,560 430,420 600,420 C770,420 790,560 960,560 C1130,560 1150,420 1320,420 C1490,420 1500,560 1670,560';

export const Recap: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const head = ramp(t, cue(0) - 0.3, cue(0) + 0.5);
  const prog = ramp(t, cue(1) - 0.2, cueEnd(4), (x) => x);
  const stOn = (i: number) => ramp(t, cue(ST[i].line) - 0.2 + (i === 4 ? 1.6 : 0), cue(ST[i].line) + 0.4 + (i === 4 ? 1.6 : 0), BACK);
  const fin = ramp(t, cue(5) - 0.3, cue(5) + 0.7, EASE_IN_OUT);
  const fill = ramp(t, cue(5) + 0.3, cue(5) + 2.4, (x) => x);
  const hello = ramp(t, wordOf(5, 'Selamat') - 0.2, wordOf(5, 'Selamat') + 0.5, BACK);
  // posisi pena di sepanjang jalur (perkiraan dari titik stasiun)
  const seg = Math.min(3.999, prog * 4);
  const k = Math.floor(seg);
  const f = seg - k;
  const a = ST[k];
  const b = ST[k + 1];
  const ease = (1 - Math.cos(Math.PI * f)) / 2;
  const px = a.x + (b.x - a.x) * f;
  const py = a.y + (b.y - a.y) * ease;
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', opacity: head * (1 - fin)}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 50, color: C.ink}}>Perjalanan dari kepala ke kertas</div>
      </div>
      <Stage>
        <g opacity={1 - fin}>
          <path d={PATH} fill="none" stroke={C.faint} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 18" />
          <DrawPath d={PATH} p={prog} stroke={C.blue} width={8} len={1800} />
          <Pen x={px} y={py} angle={-38} opacity={Math.min(1, prog * 8)} scale={0.9} />
        </g>
        {/* halaman yang kini terisi */}
        <g opacity={fin}>
          <rect x={660} y={230} width={600} height={560} rx={14} fill="#fff" stroke={C.faint} strokeWidth={1.5} filter="url(#paper-shadow)" />
          <rect x={700} y={270} width={360} height={18} rx={9} fill={C.ink} opacity={0.75} />
          {Array.from({length: 14}, (_, i) => {
            const w = (0.6 + 0.4 * Math.abs(Math.sin(i * 1.3 + 0.5))) * 500;
            const q = ramp(fill * 14, i, i + 1);
            return <rect key={i} x={700 + (i === 0 || i === 7 ? 30 : 0)} y={320 + i * 30} width={(w - (i === 0 || i === 7 ? 30 : 0)) * q} height={7} rx={3.5} fill={C.ink} opacity={0.3} />;
          })}
          <rect x={700} y={356} width={260 * ramp(t, cue(5) + 1.2, cue(5) + 1.8)} height={14} rx={3} fill={C.hilite} opacity={0.8} />
        </g>
      </Stage>
      {ST.map((s, i) => {
        const on = stOn(i);
        const part = PARTS[s.part];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y + (s.y < 500 ? -130 : 54),
              transform: `translate(-50%, 0) scale(${(0.9 + 0.1 * Math.min(1, on)).toFixed(3)})`,
              opacity: Math.min(1, on) * (1 - fin),
              width: 300,
              textAlign: 'center',
              padding: '14px 10px',
              borderRadius: 14,
              background: '#fff',
              border: `2px solid ${part.color}`,
              boxShadow: '0 8px 22px rgba(22,33,62,0.08)',
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 27,
              lineHeight: 1.25,
              color: C.ink,
              whiteSpace: 'pre-line',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontSize: 20, color: part.color, display: 'block', marginBottom: 4}}>{i + 1}</span>
            {s.t}
          </div>
        );
      })}
      <Stage>
        {ST.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={16 * Math.min(1, stOn(i))} fill={PARTS[s.part].color} opacity={1 - fin} />
        ))}
      </Stage>
      <div style={{position: 'absolute', left: 0, right: 0, top: 812, textAlign: 'center', opacity: Math.min(1, hello)}}>
        <span style={{fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 52, color: C.blue, display: 'inline-block', transform: `scale(${(0.85 + 0.15 * Math.min(1, hello)).toFixed(3)})`}}>Selamat menulis!</span>
      </div>
    </>
  );
};
