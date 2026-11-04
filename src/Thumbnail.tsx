import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Background} from './components/Background';
import {BrandCapsule} from './scenes/Title';
import {C, FONT} from './theme';

/** Gambar mini 2560×1440: judul besar di atas kertas, coretan pena merah & stabilo. */
export const Thumbnail: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${2560 / 1920})`, transformOrigin: '0 0'}}>
      <Background />
      <div
        style={{
          position: 'absolute',
          left: 1180,
          top: 170,
          width: 600,
          height: 720,
          background: C.paper,
          transform: 'rotate(4deg)',
          boxShadow: '0 30px 60px rgba(22,33,62,0.28)',
          borderRadius: 8,
          padding: '50px 46px',
          fontFamily: FONT.serif,
          fontSize: 30,
          lineHeight: 1.6,
          color: C.ink,
        }}
      >
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, marginBottom: 18}}>BAB II · Dasar Teori</div>
        Antosianin merupakan zat warna alami yang{' '}
        <span style={{backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundSize: '100% 0.6em', backgroundPosition: '0 0.8em', backgroundRepeat: 'no-repeat'}}>
          berubah warna pada pH tertentu
        </span>{' '}
        (Marka et al., 2025).{' '}
        <span style={{textDecoration: `line-through ${C.red} 4px`}}>Penting untuk dicatat,</span> Zat warna ini diperoleh dari bunga dan buah...
        <div style={{marginTop: 30, color: C.red, fontStyle: 'italic', fontSize: 34, transform: 'rotate(-3deg)'}}>✓ runtut · ✓ bersumber</div>
      </div>
      <div style={{position: 'absolute', left: 110, top: 150}}>
        <BrandCapsule />
      </div>
      <div style={{position: 'absolute', left: 110, top: 300, width: 1050, fontFamily: FONT.serif, fontWeight: 600, fontSize: 150, lineHeight: 1.02, color: C.ink, letterSpacing: -2}}>
        Dari Kepala
        <br />
        ke{' '}
        <span style={{backgroundImage: `linear-gradient(${C.hilite}, ${C.hilite})`, backgroundSize: '100% 0.45em', backgroundPosition: '0 0.62em', backgroundRepeat: 'no-repeat'}}>
          Kertas
        </span>
      </div>
      <div style={{position: 'absolute', left: 116, top: 650, fontFamily: FONT.sans, fontWeight: 600, fontSize: 52, color: C.red}}>Menulis karya ilmiah dari nol</div>
      <div style={{position: 'absolute', left: 116, top: 740, fontFamily: FONT.mono, fontSize: 30, color: C.muted, letterSpacing: 2}}>
        cari sumber · baca jurnal · paragraf · sitasi APA · laporan
      </div>
    </div>
  </AbsoluteFill>
);
