import React from 'react';
import {BACK, ramp} from '../anim';
import {Item, Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const ROWS = [
  ['HCl encer', 'asam', 'merah'],
  ['Air suling', 'netral', 'ungu'],
  ['NaOH encer', 'basa', 'hijau'],
];
const SW = ['#d8344a', '#8a4fb0', '#2f9a6a'];

export const Tabel: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const page = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const num = ramp(t, wordOf(1, 'nomor') - 0.2, wordOf(1, 'nomor') + 0.5, BACK);
  const above = ramp(t, wordOf(2, 'atas') - 0.2, wordOf(2, 'atas') + 0.5);
  const below = ramp(t, wordOf(2, 'bawah') - 0.2, wordOf(2, 'bawah') + 0.5);
  const src = ramp(t, wordOf(3, 'sumbernya') - 0.2, wordOf(3, 'sumbernya') + 0.5);
  const ref = ramp(t, cue(4) - 0.1, cue(4) + 0.6);
  const expl = ramp(t, cue(5) - 0.1, cue(5) + 0.6);
  return (
    <>
      {/* halaman laporan */}
      <div style={{position: 'absolute', left: 120, top: 195, width: 1040, height: 650, boxSizing: 'border-box', padding: '26px 40px', background: '#fff', border: `1.5px solid ${C.faint}`, borderRadius: 16, boxShadow: '0 10px 28px rgba(22,33,62,0.08)', opacity: page}}>
        <div style={{fontFamily: FONT.serif, fontSize: 24, lineHeight: 1.55, color: C.ink, opacity: 0.35 + 0.65 * ref}}>
          Perubahan warna ekstrak kubis ungu pada setiap larutan uji{' '}
          <span style={{backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundRepeat: 'no-repeat', backgroundSize: `${(ref * 100).toFixed(1)}% 0.55em`, backgroundPosition: '0 0.8em'}}>ditunjukkan pada Tabel 1</span>.
        </div>
        <div style={{marginTop: 16, textAlign: 'center', fontFamily: FONT.serif, fontSize: 24, fontWeight: 600, opacity: above, transform: `translateY(${((1 - above) * -10).toFixed(2)}px)`}}>
          <b style={{color: C.blue, opacity: num}}>Tabel 1.</b> Warna ekstrak kubis ungu pada larutan uji
        </div>
        <div style={{marginTop: 8, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', fontFamily: FONT.sans, fontSize: 24, borderTop: `2.5px solid ${C.ink}`, borderBottom: `2.5px solid ${C.ink}`}}>
          {['Larutan', 'Sifat', 'Warna'].map((h) => (
            <div key={h} style={{fontWeight: 800, padding: '8px 10px', borderBottom: `1.5px solid ${C.ink}`}}>{h}</div>
          ))}
          {ROWS.map((r, i) =>
            r.map((c, k) => (
              <div key={`${i}${k}`} style={{padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10}}>
                {k === 2 ? <span style={{width: 18, height: 18, borderRadius: 9, background: SW[i]}} /> : null}
                {c}
              </div>
            )),
          )}
        </div>
        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
          <div style={{width: 300, height: 130, borderRadius: 10, background: 'linear-gradient(90deg, #d8344a, #d14f8f, #8a4fb0, #3f6fc4, #2f9a6a, #d8c23a)', opacity: 0.85}} />
        </div>
        <div style={{marginTop: 8, textAlign: 'center', fontFamily: FONT.serif, fontSize: 22, opacity: below, transform: `translateY(${((1 - below) * 10).toFixed(2)}px)`}}>
          <b style={{color: C.blue, opacity: num}}>Gambar 1.</b> Rentang warna ekstrak kubis ungu dari asam ke basa
        </div>
        <div style={{textAlign: 'center', fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 20, color: C.muted, opacity: src}}>Sumber: Penulis (Tahun)</div>
        <div style={{marginTop: 14, fontFamily: FONT.serif, fontSize: 24, lineHeight: 1.55, opacity: expl}}>
          Berdasarkan Tabel 1, ekstrak berwarna merah dalam larutan asam dan hijau dalam larutan basa…
        </div>
      </div>
      {/* aturan */}
      <Panel x={1200} y={195} w={610} h={650} p={ramp(t, cue(1) - 0.2, cue(1) + 0.4)} title="aturan" col={C.blue}>
        <Item p={num} size={27}>nomor & judul</Item>
        <Item p={above} size={27}>judul tabel di atas</Item>
        <Item p={below} size={27}>keterangan gambar di bawah</Item>
        <Item p={src} size={27}>sumber bila dari luar</Item>
        <Item p={ref} size={27}>disebut di teks</Item>
        <Item p={expl} size={27}>dijelaskan di paragraf</Item>
        <div style={{marginTop: 26, fontFamily: FONT.sans, fontSize: 22, color: C.muted, opacity: above}}>letak judul: ikuti panduan yang berlaku</div>
      </Panel>
    </>
  );
};
