import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp} from '../anim';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const TABS = ['Home', 'Insert', 'Layout', 'References'];

export const Word: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const win = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  // Layout: kertas/margin (baris 1) & Section Break (baris 4); Home: Styles (baris 2); References: Insert Caption (baris 3)
  const WIN: number[][] = [[2], [], [1, 4], [3]];
  const tabOn = (i: number) => WIN[i].reduce((m, l) => Math.max(m, Math.min(ramp(t, cue(l) - 0.1, cue(l) + 0.3), 1 - ramp(t, cue(l + 1) - 0.3, cue(l + 1)))), 0);
  const lay = ramp(t, cue(1) + 0.4, cue(1) + 2.6);
  const sty = ramp(t, wordOf(2, 'Heading') - 0.2, wordOf(2, 'Heading') + 0.5);
  const toc = ramp(t, wordOf(2, 'Daftar') - 0.2, wordOf(2, 'Daftar') + 0.8);
  const cap = ramp(t, wordOf(3, 'Caption') - 0.2, wordOf(3, 'Caption') + 0.6);
  const capN = ramp(t, wordOf(3, 'urut') - 0.3, wordOf(3, 'urut') + 0.6);
  const sec = ramp(t, cue(4) - 0.1, cue(4) + 0.6);
  const brk = ramp(t, wordOf(4, 'Section') - 0.2, wordOf(4, 'Section') + 0.6, BACK);
  const pdf = ramp(t, cue(5) - 0.1, cue(5) + 0.6, BACK);
  return (
    <>
      {/* jendela pengolah kata (generik) */}
      <div style={{position: 'absolute', left: 120, top: 195, width: 1690, height: 650, boxSizing: 'border-box', background: '#fff', border: `1.5px solid ${C.faint}`, borderRadius: 16, boxShadow: '0 10px 28px rgba(22,33,62,0.08)', overflow: 'hidden', opacity: win}}>
        <div style={{height: 64, background: '#eef3fe', display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: `1.5px solid ${C.faint}`}}>
          {TABS.map((tb, i) => {
            const on = tabOn(i);
            return (
              <span key={tb} style={{padding: '8px 18px', borderRadius: 10, fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, background: interpolateColors(on, [0, 1], ['#eef3fe', C.blue]), color: interpolateColors(on, [0, 1], [C.ink, '#ffffff'])}}>
                {tb}
              </span>
            );
          })}
          <span style={{marginLeft: 'auto', fontFamily: FONT.mono, fontSize: 20, color: C.muted}}>Laporan_Praktikum.docx</span>
        </div>
        <div style={{display: 'flex', height: 586}}>
          {/* panel kiri: pengaturan sesuai baris */}
          <div style={{width: 640, borderRight: `1.5px solid ${C.faint}`, padding: '24px 28px', position: 'relative'}}>
            <div style={{position: 'absolute', inset: '24px 28px', opacity: Math.min(lay, 1 - ramp(t, cue(2) - 0.3, cue(2)))}}>
              {['Ukuran kertas: A4', 'Margin: sesuai panduan', 'Huruf: Times New Roman 12', 'Spasi: 1,5'].map((x, i) => (
                <div key={x} style={{marginTop: 18, padding: '14px 18px', borderRadius: 12, border: `2px solid ${C.faint}`, fontFamily: FONT.sans, fontSize: 27, opacity: ramp(lay * 4, i, i + 0.8)}}>{x}</div>
              ))}
            </div>
            <div style={{position: 'absolute', inset: '24px 28px', opacity: Math.min(sty, 1 - ramp(t, cue(3) - 0.3, cue(3)))}}>
              <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: C.muted}}>Styles</div>
              {[
                {s: 'Heading 1', f: 34, w: 800},
                {s: 'Heading 2', f: 29, w: 700},
                {s: 'Normal', f: 24, w: 400},
              ].map((x) => (
                <div key={x.s} style={{marginTop: 16, padding: '12px 18px', borderRadius: 12, border: `2px solid ${C.blue}`, fontFamily: FONT.sans, fontSize: x.f, fontWeight: x.w}}>{x.s}</div>
              ))}
            </div>
            <div style={{position: 'absolute', inset: '24px 28px', opacity: Math.min(cap, 1 - ramp(t, cue(4) - 0.3, cue(4)))}}>
              <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: C.muted}}>Insert Caption</div>
              {['Tabel 1. Warna ekstrak …', 'Tabel 2. Data pengamatan …', 'Gambar 1. Ekstrak kubis ungu …'].map((x, i) => (
                <div key={x} style={{marginTop: 16, padding: '12px 18px', borderRadius: 12, border: `2px solid ${C.violet}`, fontFamily: FONT.serif, fontSize: 26, opacity: ramp(capN * 3, i, i + 0.8)}}>{x}</div>
              ))}
            </div>
            <div style={{position: 'absolute', inset: '24px 28px', opacity: Math.min(sec, 1 - ramp(t, cue(5) - 0.3, cue(5)))}}>
              <div style={{display: 'flex', gap: 14}}>
                {['i', 'ii', 'iii'].map((r) => (
                  <div key={r} style={{width: 120, height: 160, borderRadius: 10, border: `2px solid ${C.faint}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10, fontFamily: FONT.serif, fontSize: 26}}>{r}</div>
                ))}
              </div>
              <div style={{margin: '18px 0', height: 0, borderTop: `4px dashed ${C.amber}`, opacity: brk, position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, top: 6, fontFamily: FONT.mono, fontWeight: 600, fontSize: 22, color: C.amber}}>Section Break</span>
              </div>
              <div style={{display: 'flex', gap: 14, marginTop: 40}}>
                {['1', '2', '3'].map((r) => (
                  <div key={r} style={{width: 120, height: 160, borderRadius: 10, border: `2px solid ${C.faint}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10, fontFamily: FONT.serif, fontSize: 26, opacity: brk}}>{r}</div>
                ))}
              </div>
            </div>
            <div style={{position: 'absolute', inset: '24px 28px', opacity: pdf, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
              <div style={{width: 170, height: 220, borderRadius: 14, background: C.red, color: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 20, fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, transform: `scale(${(0.85 + 0.15 * Math.min(1, pdf)).toFixed(3)})`}}>PDF</div>
              <div style={{fontFamily: FONT.sans, fontSize: 26, color: C.ink, textAlign: 'center'}}>tampilan tetap sama di perangkat lain</div>
            </div>
          </div>
          {/* panel kanan: halaman dokumen */}
          <div style={{flex: 1, background: '#f6f7fb', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: 470, height: 540, background: '#fff', boxShadow: '0 6px 18px rgba(22,33,62,0.12)', padding: '30px 40px 30px 54px', boxSizing: 'border-box', fontFamily: FONT.serif}}>
              <div style={{fontSize: 22, fontWeight: 700, opacity: toc}}>DAFTAR ISI</div>
              {['BAB I Pendahuluan ........ 1', '1.1 Latar belakang ..... 1', 'BAB II Dasar Teori ....... 3', '2.1 Antosianin ........ 4'].map((x, i) => (
                <div key={x} style={{fontSize: 17, marginTop: 6, marginLeft: i % 2 ? 18 : 0, opacity: ramp(toc * 4, i, i + 0.8)}}>{x}</div>
              ))}
              <div style={{marginTop: 26, fontSize: 24, fontWeight: 800, color: C.ink, opacity: 0.3 + 0.7 * sty}}>BAB II DASAR TEORI</div>
              <div style={{marginTop: 8, fontSize: 20, fontWeight: 700, opacity: 0.3 + 0.7 * sty}}>2.1 Antosianin</div>
              {[0, 1, 2, 3].map((k) => (
                <div key={k} style={{marginTop: 10, height: 6, width: `${86 - k * 9}%`, borderRadius: 3, background: C.ink, opacity: 0.2}} />
              ))}
              <div style={{marginTop: 18, fontSize: 16, textAlign: 'center', color: C.violet, opacity: cap}}>Tabel 1. Warna ekstrak kubis ungu …</div>
              <div style={{marginTop: 6, height: 70, borderRadius: 6, border: `1.5px solid ${C.faint}`, opacity: cap}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
