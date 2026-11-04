import React from 'react';
import {BACK, ramp} from '../anim';
import {Panel, Pill} from '../components/kit';
import {TypeText, segs} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const lin = (x: number) => x;
const FIELDS = [
  {k: 'Penulis', v: 'Leba, M. A. U., dkk.'},
  {k: 'Tahun', v: '2023'},
  {k: 'Judul', v: 'Pigmen umbi ubi jalar ungu dan rimpang kunyit …'},
  {k: 'Jurnal', v: 'J. Indonesian Society of Integrated Chemistry, 15(2)'},
];

export const Kelola: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const app = ramp(t, cue(0) - 0.2, cue(0) + 0.6);
  const messy = Math.min(ramp(t, cue(0) + 0.3, cue(0) + 1), 1 - ramp(t, cue(1) - 0.3, cue(1) + 0.3));
  const tools = ramp(t, cue(1) - 0.2, cue(1) + 0.5);
  const doi = ramp(t, wordOf(2, 'DOI') - 0.3, wordOf(2, 'DOI') + 1.2, lin);
  const fill = (i: number) => ramp(t, wordOf(2, 'otomatis') - 0.8 + i * 0.25, wordOf(2, 'otomatis') - 0.3 + i * 0.25);
  const word = ramp(t, cue(3) - 0.2, cue(3) + 0.5);
  const cite = ramp(t, wordOf(3, 'disisipkan') - 0.2, wordOf(3, 'disisipkan') + 0.5, BACK);
  const bib = ramp(t, wordOf(3, 'tersusun') - 0.2, cueEnd(3));
  const warn = ramp(t, cue(4) - 0.1, cue(4) + 0.5);
  const fixP = ramp(t, wordOf(4, 'kapital') - 0.2, wordOf(4, 'kapital') + 0.6);
  return (
    <>
      <Panel x={120} y={200} w={820} h={630} p={app} title="pengelola referensi" col={C.violet}>
        <div style={{display: 'flex', gap: 16, opacity: tools}}>
          <Pill on={tools} col={C.violet} size={28}>Zotero</Pill>
          <Pill on={tools} col={C.violet} size={28}>Mendeley</Pill>
          <span style={{alignSelf: 'center', fontFamily: FONT.sans, fontSize: 24, color: C.mint, fontWeight: 700}}>gratis</span>
        </div>
        <div style={{marginTop: 24, display: 'flex', gap: 14, alignItems: 'center'}}>
          <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, color: C.muted, width: 80}}>DOI</span>
          <div style={{flex: 1, height: 54, borderRadius: 12, border: `2px solid ${C.violet}`, display: 'flex', alignItems: 'center', padding: '0 16px'}}>
            <TypeText parts={segs('10.22437/jisic.v15i2.28648')} p={doi} t={t} size={24} font="mono" lh={1.2} />
          </div>
        </div>
        {FIELDS.map((f, i) => (
          <div key={f.k} style={{display: 'flex', gap: 14, marginTop: 16, alignItems: 'baseline'}}>
            <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: C.muted, width: 80}}>{f.k}</span>
            <span style={{flex: 1, padding: '8px 14px', borderRadius: 10, background: `rgba(109,79,224,${(0.08 * fill(i)).toFixed(3)})`, fontFamily: FONT.sans, fontSize: 25, color: C.ink, opacity: fill(i)}}>{f.v}</span>
          </div>
        ))}
        <div style={{position: 'absolute', left: 32, right: 32, bottom: 26, fontFamily: FONT.serif, fontSize: 25, color: C.muted, opacity: messy}}>
          daftar pustaka diketik manual: nama salah eja, tahun tertukar, halaman hilang…
        </div>
      </Panel>
      <Panel x={990} y={200} w={820} h={630} p={word} title="di dalam Word" col={C.blue}>
        <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.6, color: C.ink}}>
          Pigmen ubi jalar ungu dapat digunakan sebagai indikator yang ramah lingkungan{' '}
          <span style={{display: 'inline-block', padding: '0 6px', borderRadius: 6, background: `rgba(47,98,240,${(0.14 * Math.min(1, cite)).toFixed(3)})`, opacity: Math.min(1, cite), transform: `scale(${(0.85 + 0.15 * Math.min(1, cite)).toFixed(3)})`}}>(Leba et al., 2023)</span>.
        </div>
        <div style={{marginTop: 30, fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: C.ink, opacity: bib}}>Daftar Pustaka</div>
        <div style={{marginTop: 10, fontFamily: FONT.serif, fontSize: 24, lineHeight: 1.5, paddingLeft: 30, textIndent: -30, opacity: bib}}>
          Leba, M. A. U., dkk. (2023).{' '}
          <span style={{display: 'inline-grid', textIndent: 0}}>
            <span style={{gridArea: '1 / 1', opacity: 1 - fixP}}>PIGMEN UMBI UBI JALAR UNGU DAN RIMPANG KUNYIT …</span>
            <span style={{gridArea: '1 / 1', opacity: fixP, color: C.mint}}>Pigmen umbi ubi jalar ungu dan rimpang kunyit …</span>
          </span>{' '}
          <i>J. Indonesian Society of Integrated Chemistry, 15</i>(2), 99–109.
        </div>
        <div style={{marginTop: 24, padding: '14px 18px', borderRadius: 12, background: '#fff4c2', border: '1.5px solid #f0d76a', fontFamily: FONT.sans, fontSize: 25, color: C.ink, opacity: warn}}>
          <b style={{color: C.red}}>Tetap periksa:</b> nama penulis, huruf kapital judul, nomor halaman.
        </div>
      </Panel>
    </>
  );
};
