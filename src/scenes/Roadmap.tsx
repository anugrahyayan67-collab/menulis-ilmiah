import React from 'react';
import {BACK, ramp} from '../anim';
import {PARTS} from '../components/ChapterHeading';
import {Stage} from '../components/primitives';
import {Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const ITEMS: string[][] = [
  ['Ciri tulisan ilmiah', 'Jenis karya', 'Topik → pertanyaan'],
  ['Mencari sumber', 'Membaca jurnal', 'Mencatat'],
  ['Kerangka & paragraf', 'Kalimat & ejaan', 'Gaya yang wajar'],
  ['Kutipan & parafrase', 'Sitasi APA', 'Daftar pustaka'],
  ['Laporan praktikum', 'Artikel & abstrak', 'Revisi'],
];

/** Kubis ungu sederhana + tabung reaksi berwarna (contoh berjalan sepanjang video). */
export const Cabbage: React.FC<{x: number; y: number; s?: number; t: number; opacity?: number}> = ({x, y, s = 1, t, opacity = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i / 6) * Math.PI * 2 + 0.03 * Math.sin(t * 0.8 + i);
      return <ellipse key={i} cx={34 * Math.cos(a)} cy={30 * Math.sin(a)} rx={48} ry={36} fill={i % 2 ? '#6d3a8c' : '#7f45a0'} transform={`rotate(${(a * 180) / Math.PI} ${34 * Math.cos(a)} ${30 * Math.sin(a)})`} />;
    })}
    <circle r={46} fill="#8d52ad" />
    <path d="M-30,-10 C-10,-30 20,-28 32,-6 M-26,14 C-6,-6 18,-4 30,16" stroke="#c8a8e0" strokeWidth={3} fill="none" opacity={0.7} />
  </g>
);

export const TUBE_COLORS = ['#d8344a', '#d14f8f', '#8a4fb0', '#3f6fc4', '#2f9a6a', '#d8c23a'];

export const Tubes: React.FC<{x: number; y: number; p: number; t: number; gap?: number}> = ({x, y, p, t, gap = 62}) => (
  <g>
    {TUBE_COLORS.map((col, i) => {
      const a = Math.min(1, Math.max(0, p * 7 - i));
      const lvl = 70 * a;
      const wob = 2 * Math.sin(t * 2 + i);
      return (
        <g key={i} transform={`translate(${x + i * gap} ${y})`}>
          <path d={`M-16,-110 L-16,40 A16,16 0 0 0 16,40 L16,-110`} fill="#ffffff" fillOpacity={0.6} stroke={C.ink} strokeOpacity={0.5} strokeWidth={3} />
          <path d={`M-13,${50 - lvl + wob * a} L13,${50 - lvl - wob * a} L13,40 A13,13 0 0 1 -13,40 Z`} fill={col} opacity={0.9 * a} />
          <rect x={-20} y={-114} width={40} height={6} rx={3} fill={C.ink} opacity={0.5} />
        </g>
      );
    })}
  </g>
);

export const Roadmap: React.FC = () => {
  const {t, cue, cueEnd} = useScene();
  const ex = ramp(t, cue(6) - 0.2, cue(6) + 0.8);
  return (
    <>
      {ITEMS.map((items, i) => {
        const part = PARTS[i + 1];
        const a = ramp(t, cue(0) + i * 0.2, cue(0) + i * 0.2 + 0.8, BACK);
        const on = Math.min(ramp(t, cue(i + 1) - 0.1, cue(i + 1) + 0.5), 1 - ramp(t, cueEnd(i + 1) + 0.3, cueEnd(i + 1) + 0.9));
        const done = ramp(t, cueEnd(i + 1) + 0.3, cueEnd(i + 1) + 0.9);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 120 + i * 344,
              top: 200,
              width: 318,
              height: 330,
              transform: `translateY(${(-40 * (1 - a) - 22 * on).toFixed(2)}px) scale(${(1 + 0.05 * on).toFixed(3)})`,
              opacity: Math.min(1, a),
              background: C.paper,
              borderRadius: 10,
              borderTop: `10px solid ${part.color}`,
              boxShadow: `0 ${14 + 16 * on}px ${34 + 20 * on}px rgba(22,33,62,${0.18 + 0.1 * on})`,
              padding: '22px 26px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}>
              <span style={{fontFamily: FONT.serif, fontWeight: 600, fontSize: 64, color: part.color, lineHeight: 1}}>{i + 1}</span>
              <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1.15}}>{part.short}</span>
            </div>
            <div style={{marginTop: 22}}>
              {items.map((it, k) => {
                const q = Math.max(ramp(t, cue(i + 1) + 0.4 + k * 0.35, cue(i + 1) + 0.9 + k * 0.35), done);
                return (
                  <div key={k} style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.sans, fontSize: 25, color: C.ink, marginBottom: 14, opacity: 0.45 + 0.55 * q}}>
                    <span style={{width: 10, height: 10, borderRadius: 5, background: part.color, opacity: 0.4 + 0.6 * q, flex: 'none'}} />
                    <span style={{backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(on * q * 100).toFixed(1)}% 0.55em`, backgroundPosition: '0 0.8em'}}>{it}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* contoh berjalan */}
      <div
        style={{
          position: 'absolute',
          left: 330,
          top: 600,
          width: 1260,
          height: 250,
          opacity: ex,
          transform: `translateY(${(1 - ex) * 30}px)`,
          background: C.paper,
          borderRadius: 10,
          boxShadow: '0 16px 36px rgba(22,33,62,0.2)',
          borderLeft: `10px solid #7f45a0`,
        }}
      >
        <div style={{position: 'absolute', left: 300, top: 40, width: 470}}>
          <Kicker color="#7f45a0">Contoh berjalan</Kicker>
          <div style={{fontFamily: FONT.serif, fontSize: 38, lineHeight: 1.25, marginTop: 12, color: C.ink}}>
            Ekstrak kubis ungu sebagai indikator asam basa
          </div>
        </div>
      </div>
      <Stage>
        <g opacity={ex}>
          <Cabbage x={500} y={725 + (1 - ex) * 30} s={1.15} t={t} />
          <Tubes x={1150} y={735 + (1 - ex) * 30} p={ramp(t, cue(6) + 0.8, cue(6) + 3.5)} t={t} />
        </g>
      </Stage>
    </>
  );
};
