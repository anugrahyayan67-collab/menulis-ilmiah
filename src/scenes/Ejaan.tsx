import React from 'react';
import {BACK, ramp} from '../anim';
import {Kicker, TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const Card: React.FC<{i: number; a: number; title: string; col: string; children: React.ReactNode}> = ({i, a, title, col, children}) => {
  const x = 120 + (i % 3) * 570;
  const y = 195 + Math.floor(i / 3) * 345;
  const q = Math.min(1, a);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 540,
        height: 320,
        boxSizing: 'border-box',
        padding: '22px 28px',
        background: '#fff',
        border: `1.5px solid ${C.faint}`,
        borderTop: `6px solid ${col}`,
        borderRadius: 16,
        boxShadow: '0 10px 26px rgba(22,33,62,0.08)',
        opacity: q,
        transform: `translateY(${((1 - q) * 24).toFixed(2)}px) scale(${(0.94 + 0.06 * a).toFixed(3)})`,
      }}
    >
      <Kicker color={col}>{title}</Kicker>
      <div style={{marginTop: 14}}>{children}</div>
    </div>
  );
};

const Ok: React.FC<{p: number}> = ({p}) => <span style={{color: C.mint, fontWeight: 800, opacity: p, marginLeft: 10}}>✓</span>;

export const Ejaan: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const a = (i: number) => ramp(t, cue(i) - 0.2, cue(i) + 0.5, BACK);
  const w = (i: number, word: string, d = 0.5) => ramp(t, wordOf(i, word) - 0.1, wordOf(i, word) + d);
  const sp = w(1, 'terpisah');
  const sr = w(1, 'serangkai');
  const it1 = w(2, 'buffer', 0.6);
  const it2 = w(2, 'Brassica', 0.6);
  const num = w(3, 'huruf', 0.6);
  const dm = w(4, 'Gunakan', 0.6);
  const pas = w(5, 'pasif', 0.6);
  const big = {fontFamily: FONT.serif, fontSize: 38, color: C.ink, lineHeight: 1.45};
  return (
    <>
      <Card i={0} a={a(0)} title="pedoman ejaan" col={C.blue}>
        <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
          <div style={{width: 120, height: 160, borderRadius: 10, background: C.blue, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, boxShadow: '6px 6px 0 #1d3f9e', transform: `rotate(${(-3 + 2 * Math.sin(t)).toFixed(2)}deg)`}}>
            <span style={{fontSize: 36}}>EYD</span>
            <span style={{fontSize: 22, opacity: 0.85}}>Edisi V</span>
          </div>
          <div>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.ink}}>EYD Edisi V</div>
            <div style={{fontFamily: FONT.sans, fontSize: 28, color: C.muted, marginTop: 6}}>terbit 2022</div>
            <div style={{fontFamily: FONT.sans, fontSize: 24, color: C.muted, marginTop: 6}}>Badan Bahasa</div>
          </div>
        </div>
      </Card>
      <Card i={1} a={a(1)} title="di: kata depan atau awalan?" col={C.cyan}>
        <div style={big}>
          di<span style={{display: 'inline-block', width: '0.4em', background: `rgba(11,143,156,${(0.25 * sp).toFixed(3)})`, height: '0.9em', verticalAlign: 'middle', borderRadius: 4}} />laboratorium
          <Ok p={sp} />
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: sp}}>kata depan (tempat) → dipisah</div>
        <div style={{...big, marginTop: 14}}>
          <span style={{background: `rgba(11,143,156,${(0.25 * sr).toFixed(3)})`, borderRadius: 4}}>di</span>panaskan
          <Ok p={sr} />
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: sr}}>awalan (kata kerja) → disambung</div>
      </Card>
      <Card i={2} a={a(2)} title="dicetak miring" col={C.violet}>
        <div style={big}>
          larutan{' '}
          <span style={{display: 'inline-grid'}}>
            <span style={{gridArea: '1 / 1', opacity: 1 - it1}}>buffer</span>
            <span style={{gridArea: '1 / 1', fontStyle: 'italic', opacity: it1}}>buffer</span>
          </span>
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: it1}}>istilah asing yang belum diserap</div>
        <div style={{...big, marginTop: 14}}>
          <span style={{fontStyle: 'italic', opacity: 0.4 + 0.6 * it2}}>Brassica oleracea</span>
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: it2}}>nama latin kubis</div>
      </Card>
      <Card i={3} a={a(3)} title="angka di awal kalimat" col={C.amber}>
        <div style={{height: 26}} />
        <TypeText parts={segs({t: '5', strike: num, fix: 'Lima', fixP: num}, ' mL larutan ditambahkan ke dalam tabung.')} p={1} t={t} size={36} lh={2} caret={false} />
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: num, marginTop: 6}}>angka di awal kalimat → ditulis dengan huruf</div>
      </Card>
      <Card i={4} a={a(4)} title="hindari “dimana”" col={C.red}>
        <div style={{height: 26}} />
        <TypeText parts={segs('Tabung ', {t: 'dimana', strike: dm, fix: 'tempat', fixP: dm}, ' larutan dipanaskan diletakkan di rak.')} p={1} t={t} size={34} lh={2} caret={false} />
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: dm, marginTop: 6}}>ganti dengan “yang” atau “tempat”</div>
      </Card>
      <Card i={5} a={a(5)} title="cara kerja: kalimat pasif" col={C.mint}>
        <div style={big}>
          Larutan <span style={{background: `rgba(19,154,99,${(0.2 * pas).toFixed(3)})`, borderRadius: 4}}>di</span>panaskan selama lima menit.
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: pas, marginTop: 8}}>menonjolkan perlakuan pada bahan</div>
      </Card>
    </>
  );
};
