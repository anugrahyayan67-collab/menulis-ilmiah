import React from 'react';
import {EASE_IN_OUT, ramp} from '../anim';
import {Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';
import {BrandCapsule} from './Title';

// Rujukan nyata (APA 7). Contoh paragraf di video memakai sumber jurnal & buku yang sudah dicek halamannya.
const REFS: React.ReactNode[] = [
  <>American Psychological Association. (2020). <i>Publication manual of the American Psychological Association</i> (7th ed.).</>,
  <>Badan Pengembangan dan Pembinaan Bahasa. (2022). <i>Ejaan Bahasa Indonesia yang Disempurnakan (EYD) Edisi V</i>.</>,
  <>Gastel, B., & Day, R. A. (2022). <i>How to write and publish a scientific paper</i> (9th ed.). Cambridge University Press.</>,
  <>Keshav, S. (2007). How to read a paper. <i>ACM SIGCOMM Computer Communication Review, 37</i>(3), 83–84.</>,
];
const EXAMPLES: React.ReactNode[] = [
  <>Overby, J., & Chang, R. (2022). <i>Chemistry</i> (14th ed.). McGraw Hill.</>,
  <>Marka, Zulfajri, M., & Ismulyati, S. (2025). <i>JS Edu: Jurnal Seramoe Education, 2</i>(1), 135–147.</>,
  <>Leba, M. A. U., dkk. (2023). <i>Journal of the Indonesian Society of Integrated Chemistry, 15</i>(2), 99–109.</>,
  <>Lumadya, S. A., & Wiyarsi, A. (2024). <i>Jurnal Riset Pembelajaran Kimia, 9</i>(2), 93–99.</>,
];

export const Outro: React.FC = () => {
  const {t, dur} = useScene();
  const a = ramp(t, 0, 0.8);
  const out = ramp(t, dur - 1.2, dur, EASE_IN_OUT);
  const item = (i: number) => ramp(t, 0.6 + i * 0.25, 1.1 + i * 0.25);
  const by = ramp(t, 3, 3.8);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: a * (1 - out)}}>
      <div style={{position: 'absolute', left: 120, top: 110}}>
        <BrandCapsule />
      </div>
      <div style={{position: 'absolute', right: 120, top: 112, textAlign: 'right', opacity: by}}>
        <div style={{fontFamily: FONT.sans, fontSize: 24, color: C.muted}}>Disusun oleh</div>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, color: C.ink}}>Septian Anugrah Dwi Putra</div>
      </div>
      <div style={{position: 'absolute', left: 120, top: 230, width: 1680, display: 'flex', gap: 40}}>
        <div style={{flex: 1.15, background: '#fff', border: `1.5px solid ${C.faint}`, borderTop: `6px solid ${C.blue}`, borderRadius: 16, padding: '22px 30px'}}>
          <Kicker color={C.blue}>rujukan</Kicker>
          {REFS.map((r, i) => (
            <div key={i} style={{fontFamily: FONT.serif, fontSize: 23, lineHeight: 1.45, color: C.ink, marginTop: 14, paddingLeft: 28, textIndent: -28, opacity: item(i)}}>
              {r}
            </div>
          ))}
        </div>
        <div style={{flex: 1, background: '#fff', border: `1.5px solid ${C.faint}`, borderTop: `6px solid ${C.mint}`, borderRadius: 16, padding: '22px 30px'}}>
          <Kicker color={C.mint}>sumber contoh kalimat</Kicker>
          {EXAMPLES.map((r, i) => (
            <div key={i} style={{fontFamily: FONT.serif, fontSize: 23, lineHeight: 1.45, color: C.ink, marginTop: 14, paddingLeft: 28, textIndent: -28, opacity: item(i + 4)}}>
              {r}
            </div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontFamily: FONT.sans, fontSize: 26, color: C.muted, opacity: ramp(t, 4, 5)}}>
        Format laporan selalu ikuti panduan dosen atau laboratorium masing-masing.
      </div>
    </div>
  );
};
