import React from 'react';
import {BACK, ramp} from '../anim';
import {Label, Stage} from '../components/primitives';
import {Magnifier, clamp01} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const X0 = 180;
const W0 = 580;
const rowsAt = (y0: number, n: number, seed: number) =>
  Array.from({length: n}, (_, i) => ({y: y0 + i * 16, w: (0.6 + 0.4 * Math.abs(Math.sin(i * 1.9 + seed))) * (W0 - 60)}));

const SECTIONS = {
  pend: rowsAt(444, 5, 1),
  met: rowsAt(569, 3, 2),
  hasil: rowsAt(748, 2, 3),
  simp: rowsAt(814, 2, 4),
};

const Row: React.FC<{y: number; w: number; hi?: number; col?: string; o?: number}> = ({y, w, hi = 0, col = C.hilite, o = 0.22}) => (
  <g>
    {hi > 0 ? <rect x={X0 + 26} y={y - 7} width={(w + 8) * clamp01(hi)} height={14} rx={3} fill={col} opacity={0.9} /> : null}
    <rect x={X0 + 30} y={y - 2.5} width={w} height={5} rx={2.5} fill={C.ink} opacity={o + 0.3 * clamp01(hi)} />
  </g>
);

const PassCard: React.FC<{y: number; h: number; n: string; title: string; sub: string; col: string; ghost: number; on: number; done: number}> = ({y, h, n, title, sub, col, ghost, on, done}) => (
  <div
    style={{
      position: 'absolute',
      left: 880,
      top: y,
      width: 930,
      height: h,
      boxSizing: 'border-box',
      borderRadius: 16,
      background: '#fff',
      border: `2px ${on > 0.01 ? 'solid' : 'dashed'} ${on > 0.01 ? col : C.faint}`,
      boxShadow: `0 ${8 + 12 * on}px ${22 + 14 * on}px rgba(22,33,62,${(0.05 + 0.08 * on).toFixed(3)})`,
      opacity: ghost * (0.5 + 0.5 * Math.max(on, done)),
      transform: `translateX(${(-14 * on).toFixed(2)}px)`,
      padding: '18px 26px',
      display: 'flex',
      gap: 22,
      alignItems: 'center',
    }}
  >
    <div style={{width: 74, height: 74, borderRadius: 37, background: col, opacity: 0.25 + 0.75 * Math.max(on, done), color: '#fff', fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
      {n}
    </div>
    <div>
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.ink}}>{title}</div>
      <div style={{fontFamily: FONT.sans, fontSize: 25, color: C.muted, marginTop: 4}}>{sub}</div>
    </div>
  </div>
);

export const Baca: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const doc = ramp(t, cue(0) - 0.4, cue(0) + 0.5);
  const fan = Math.min(ramp(t, cue(0) + 0.4, cue(0) + 1.6), 1 - ramp(t, cue(1) - 0.3, cue(1) + 0.6));
  const ghost = ramp(t, cue(1) - 0.2, cue(1) + 0.6);
  const p1 = ramp(t, cue(2) - 0.2, cue(2) + 0.4);
  const p1hi = (w: string) => ramp(t, wordOf(2, w) - 0.1, wordOf(2, w) + 0.5);
  const fade1 = ramp(t, cue(4) - 0.2, cue(4) + 0.5);
  const dec = Math.min(ramp(t, cue(3) - 0.2, cue(3) + 0.4), 1 - ramp(t, cue(4) - 0.2, cue(4) + 0.3));
  const p2 = ramp(t, cue(4) - 0.2, cue(4) + 0.4);
  const mag = Math.min(ramp(t, wordOf(4, 'tabel') - 0.5, wordOf(4, 'tabel') + 0.3), 1 - ramp(t, cue(5) - 0.3, cue(5) + 0.3));
  const p3 = ramp(t, cue(5) - 0.2, cue(5) + 0.4);
  const met = ramp(t, wordOf(5, 'metodenya') - 0.4, wordOf(5, 'metodenya') + 0.6);
  const tab = ramp(t, wordOf(6, 'halamannya') - 0.5, wordOf(6, 'halamannya') + 0.3, BACK);
  const hl6 = ramp(t, wordOf(6, 'tandai'), wordOf(6, 'tandai') + 0.6);
  const head = (y: number, txt: string, hi: number) => (
    <g>
      {hi > 0 ? <rect x={X0 + 24} y={y - 13} width={260 * clamp01(hi)} height={26} rx={4} fill={C.hilite} opacity={0.9 * (1 - 0.6 * fade1)} /> : null}
      <Label x={X0 + 30} y={y} size={20} weight={700} anchor="start" halo={false}>
        {txt}
      </Label>
    </g>
  );
  const hHead = p1hi('bagian');
  return (
    <>
      <Stage>
        {/* tumpukan halaman */}
        {Array.from({length: 9}, (_, i) => (
          <rect key={i} x={X0} y={190} width={W0} height={660} rx={12} fill="#fff" stroke={C.faint} strokeWidth={1.5} opacity={fan * doc} transform={`rotate(${(i + 1) * 2.2 * fan} ${X0 + W0 / 2} 850) translate(${(i + 1) * 6 * fan} 0)`} />
        ))}
        <g opacity={fan}>
          <rect x={X0 + W0 - 40} y={150} width={170} height={56} rx={28} fill={C.ink} />
          <Label x={X0 + W0 + 45} y={178} size={26} weight={700} color="#fff" halo={false}>
            10+ halaman
          </Label>
        </g>
        {/* halaman artikel */}
        <g opacity={doc}>
          <rect x={X0} y={190} width={W0} height={660} rx={12} fill="#fff" stroke={C.faint} strokeWidth={1.5} filter="url(#paper-shadow)" />
          {/* judul */}
          <rect x={X0 + 26} y={208} width={(W0 - 52) * p1hi('judul')} height={58} rx={5} fill={C.hilite} opacity={0.9 * (1 - 0.6 * fade1)} />
          <rect x={X0 + 50} y={218} width={W0 - 100} height={14} rx={7} fill={C.ink} opacity={0.75} />
          <rect x={X0 + 110} y={242} width={W0 - 220} height={14} rx={7} fill={C.ink} opacity={0.75} />
          <rect x={X0 + 170} y={278} width={W0 - 340} height={7} rx={3.5} fill={C.muted} opacity={0.6} />
          {/* abstrak */}
          <rect x={X0 + 26} y={300} width={W0 - 52} height={96} rx={8} fill={C.bg} stroke={C.faint} />
          <rect x={X0 + 26} y={300} width={(W0 - 52) * p1hi('abstrak')} height={96} rx={8} fill={C.hilite} opacity={0.75 * (1 - 0.6 * fade1)} />
          <Label x={X0 + 44} y={318} size={16} weight={700} anchor="start" halo={false} color={C.muted}>
            ABSTRAK
          </Label>
          {rowsAt(340, 4, 5).map((r, i) => (
            <rect key={i} x={X0 + 44} y={r.y - 2.5} width={r.w - 40} height={5} rx={2.5} fill={C.ink} opacity={0.25} />
          ))}
          {head(420, 'Pendahuluan', hHead)}
          {SECTIONS.pend.map((r, i) => (
            <Row key={i} {...r} />
          ))}
          {head(545, 'Metode', hHead)}
          {SECTIONS.met.map((r, i) => (
            <Row key={i} {...r} hi={met} col={`${C.violet}55`} />
          ))}
          {head(632, 'Hasil dan Pembahasan', hHead)}
          <rect x={X0 + 30} y={652} width={W0 - 60} height={80} rx={6} fill={`${C.cyan}14`} stroke={`${C.cyan}88`} strokeWidth={1.5} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={X0 + 60 + k * 120} y={712 - (20 + 12 * k)} width={60} height={20 + 12 * k} rx={3} fill={C.cyan} opacity={0.5 + 0.4 * p2} />
          ))}
          {SECTIONS.hasil.map((r, i) => (
            <Row key={i} {...r} hi={i === 0 ? hl6 : 0} />
          ))}
          {head(792, 'Simpulan', hHead)}
          {SECTIONS.simp.map((r, i) => (
            <Row key={i} {...r} hi={p1hi('simpulan') * (1 - 0.6 * fade1)} />
          ))}
        </g>
        <Magnifier x={X0 + 300 + 30 * Math.sin(t * 0.9)} y={690} r={78} opacity={mag} />
        {/* label halaman */}
        <g opacity={tab} transform={`translate(${X0 + W0 - 150 + 20 * (1 - tab)} 748)`}>
          <rect x={0} y={-24} width={130} height={48} rx={10} fill={C.red} />
          <Label x={65} y={0} size={24} weight={700} color="#fff" halo={false} font="mono">
            hlm. 103
          </Label>
        </g>
      </Stage>
      <PassCard y={200} h={170} n="1" title="Putaran pertama · 5–10 menit" sub="judul, abstrak, judul bagian, simpulan" col={C.blue} ghost={ghost} on={p1 * (1 - 0.5 * fade1)} done={p1} />
      <div
        style={{
          position: 'absolute',
          left: 940,
          top: 392,
          width: 870,
          height: 104,
          opacity: dec,
          transform: `translateY(${((1 - dec) * 12).toFixed(2)}px)`,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          fontFamily: FONT.sans,
          fontSize: 28,
          color: C.ink,
        }}
      >
        <span style={{fontWeight: 700}}>Membantu menjawab pertanyaanku?</span>
        <span style={{padding: '6px 16px', borderRadius: 10, background: `${C.mint}18`, border: `2px solid ${C.mint}`, color: C.mint, fontWeight: 700}}>Ya → lanjut</span>
        <span style={{padding: '6px 16px', borderRadius: 10, border: `2px solid ${C.faint}`, color: C.muted}}>Tidak → simpan</span>
      </div>
      <PassCard y={520} h={150} n="2" title="Putaran kedua" sub="bagian yang relevan, termasuk tabel & gambar" col={C.cyan} ghost={ghost} on={p2 * (1 - 0.5 * p3)} done={p2} />
      <PassCard y={690} h={150} n="3" title="Putaran ketiga" sub="khusus artikel inti: pahami metodenya" col={C.violet} ghost={ghost} on={p3} done={p3} />
      <div style={{position: 'absolute', left: 1810, top: 852, transform: 'translateX(-100%)', fontFamily: FONT.sans, fontSize: 20, color: C.muted, opacity: ghost, whiteSpace: 'nowrap'}}>
        cara tiga putaran (Keshav, 2007)
      </div>
    </>
  );
};
