import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Item, Panel, Stamp} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PARTS = [
  {t: 'kutipan yang benar', v: 8, c: C.mint},
  {t: 'daftar pustaka', v: 6, c: C.cyan},
  {t: 'perlu dicek', v: 9, c: C.red},
];

export const Etika: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const sA = slot(t, cue(0) - 0.2, cue(3) - 0.1);
  const sB = ramp(t, cue(3) - 0.1, cue(3) + 0.5);
  const ring = ramp(t, cue(0) + 0.4, cue(0) + 2.4);
  const split = ramp(t, wordOf(1, 'kutipan') - 0.2, wordOf(1, 'terhitung') + 0.4);
  const rule = ramp(t, cue(2) - 0.1, cue(2) + 0.5);
  const tool = ramp(t, cue(4) - 0.1, cue(4) + 0.5);
  const fake = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  const notFound = ramp(t, wordOf(5, 'cek') - 0.3, wordOf(5, 'cek') + 0.4, BACK);
  const resp = ramp(t, cue(6) - 0.1, cueEnd(6));
  const total = 23;
  const R = 110;
  const circ = 2 * Math.PI * R;
  let acc = 0;
  return (
    <>
      <Panel x={120} y={200} w={1680} h={640} p={sA} title="laporan kemiripan · contoh" col={C.blue}>
        <div style={{display: 'flex', alignItems: 'center', gap: 60, marginTop: 10}}>
          <svg width={300} height={300} viewBox="-150 -150 300 300">
            <circle r={R} fill="none" stroke={C.faint} strokeWidth={34} />
            {PARTS.map((p) => {
              const len = (p.v / 100) * circ * ring;
              const off = acc;
              acc += (p.v / 100) * circ * ring;
              return <circle key={p.t} r={R} fill="none" stroke={p.c} strokeWidth={34} strokeDasharray={`${len.toFixed(1)} ${circ.toFixed(1)}`} strokeDashoffset={(-off).toFixed(1)} transform="rotate(-90)" opacity={0.35 + 0.65 * split} />;
            })}
            <text textAnchor="middle" y={18} fontFamily={FONT.sans} fontWeight={800} fontSize={60} fill={C.ink}>
              {Math.round(total * ring)}%
            </text>
          </svg>
          <div>
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 34, color: C.ink}}>Angka kemiripan perlu dibaca teliti</div>
            {PARTS.map((p, i) => (
              <div key={p.t} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, fontFamily: FONT.sans, fontSize: 30, opacity: ramp(split * 3, i, i + 0.8)}}>
                <span style={{width: 26, height: 26, borderRadius: 6, background: p.c}} />
                <span style={{width: 70, fontFamily: FONT.mono, fontWeight: 600}}>{p.v}%</span>
                {p.t}
              </div>
            ))}
            <div style={{marginTop: 30, padding: '14px 20px', borderRadius: 12, background: '#eef3fe', fontFamily: FONT.sans, fontSize: 28, color: C.ink, opacity: rule}}>
              Batas yang diizinkan → <b>ditentukan kampus atau jurnal</b>
            </div>
          </div>
        </div>
      </Panel>
      <Panel x={120} y={200} w={820} h={640} p={sB} title="kecerdasan buatan" col={C.violet}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 90, height: 116, borderRadius: 10, border: `2px solid ${C.violet}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 18, color: C.violet, textAlign: 'center'}}>
            TATA
            <br />
            TERTIB
          </div>
          <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.ink, lineHeight: 1.35}}>
            Aturannya beda di tiap kampus & mata kuliah → <b>baca dulu</b>
          </div>
        </div>
        <div style={{marginTop: 30, fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.muted, opacity: tool}}>Kalau diizinkan, sebagai alat bantu:</div>
        <Item p={ramp(t, wordOf(4, 'ide') - 0.2, wordOf(4, 'ide') + 0.4) * tool} size={28}>
          mencari ide
        </Item>
        <Item p={ramp(t, wordOf(4, 'ejaan') - 0.2, wordOf(4, 'ejaan') + 0.4) * tool} size={28}>
          memeriksa ejaan
        </Item>
        <Item p={tool * ramp(t, cueEnd(4) - 0.3, cueEnd(4) + 0.2)} size={28} cross>
          menyerahkan tulisannya sebagai karya sendiri bila dilarang
        </Item>
      </Panel>
      <Panel x={980} y={200} w={830} h={640} p={Math.min(sB, fake)} title="sitasi dari AI? cek dulu" col={C.red}>
        <div style={{fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.55}}>
          … ekstrak kubis ungu stabil selama enam bulan <span style={{background: '#fde8e8', borderRadius: 4}}>(Pratama &amp; Sari, 2021)</span>.
        </div>
        <div style={{marginTop: 24, display: 'flex', alignItems: 'center', gap: 14, height: 60, borderRadius: 30, border: `2px solid ${C.faint}`, padding: '0 22px', fontFamily: FONT.sans, fontSize: 26, color: C.muted}}>
          ⌕ Pratama Sari 2021 kubis ungu
        </div>
        <div style={{marginTop: 20, fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.red, opacity: Math.min(1, notFound)}}>× tidak ditemukan</div>
        <div style={{marginTop: 14, fontFamily: FONT.sans, fontSize: 24, color: C.muted, opacity: Math.min(1, notFound)}}>contoh sitasi karangan: nama dan klaimnya fiktif</div>
      </Panel>
      <Stamp p={resp * sB} text="TANGGUNG JAWABMU" x={960} y={790} rot={-3} size={36} col={C.ink} />
    </>
  );
};
