import React from 'react';
import {BACK, ramp, slot} from '../anim';
import {Item, Panel} from '../components/kit';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const TECH = [
  {w: 'struktur', t: 'Ubah struktur', ex: 'Perubahan warna pada pH tertentu merupakan ciri khas antosianin.'},
  {w: 'padanan', t: 'Padanan kata', ex: 'Sifat khas antosianin adalah warnanya berubah pada pH tertentu.'},
  {w: 'gabungkan', t: 'Gabung / pecah', ex: 'Antosianin merupakan zat warna alami. Warnanya berubah pada pH tertentu.'},
];

export const Khusus: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const sA = slot(t, cue(0) - 0.2, cue(2) - 0.1);
  const sB = slot(t, cue(2) - 0.1, cue(4) - 0.1);
  const sC = ramp(t, cue(4) - 0.1, cue(4) + 0.5);
  const blk = ramp(t, wordOf(1, 'blok') - 0.3, wordOf(1, 'blok') + 0.6);
  const chain = (i: number) => ramp(t, cue(2) + 0.6 + i * 0.9, cue(2) + 1.2 + i * 0.9, BACK);
  const cite = ramp(t, wordOf(2, 'Overby') - 0.2, wordOf(2, 'Overby') + 0.6);
  const ref = ramp(t, cue(3) - 0.1, cue(3) + 0.5);
  const orig = ramp(t, wordOf(3, 'aslinya') - 0.2, wordOf(3, 'aslinya') + 0.4);
  const allCite = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  return (
    <>
      <Panel x={260} y={200} w={1400} h={640} p={sA} title="kutipan langsung ≥ 40 kata" col={C.amber}>
        <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.55, color: C.ink}}>Leba et al. (2023) menjelaskan perubahan bentuk antosianin sebagai berikut.</div>
        <div
          style={{
            marginTop: 16,
            marginLeft: 70 * blk,
            paddingLeft: 24,
            borderLeft: `4px solid rgba(224,122,0,${blk.toFixed(3)})`,
            fontFamily: FONT.serif,
            fontSize: 26,
            lineHeight: 1.55,
            color: C.ink,
          }}
        >
          <span style={{color: C.red, opacity: 1 - blk}}>“</span>Dalam larutan asam kuat, pH 1-2 antosianin berada dalam spesi kation flavylium (AH+) yang merupakan spesi yang paling dominan dan stabil. Dalam asam lemah pH 3-6, kation flavylium dihidrasi menjadi carbinol (B), spesi yang tidak berwarna, sehingga menyebabkan warna merah memudar menjadi pink.
          <span style={{color: C.red, opacity: 1 - blk}}>”</span> (hlm. 103)
        </div>
        <div style={{display: 'flex', gap: 26, marginTop: 24, fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, opacity: blk}}>
          <span style={{color: C.amber}}>✓ blok terpisah</span>
          <span style={{color: C.amber}}>✓ menjorok</span>
          <span style={{color: C.amber}}>✓ tanpa tanda petik</span>
          <span style={{color: C.amber}}>✓ nomor halaman</span>
        </div>
      </Panel>
      <Panel x={120} y={200} w={1000} h={640} p={sB} title="sumber sekunder" col={C.violet}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20}}>
          {[
            {t: 'Arrhenius', d: '1887 · teori asli', c: C.muted},
            {t: 'Overby & Chang', d: '2022 · buku yang dibaca', c: C.violet},
            {t: 'Kamu', d: 'menulis laporan', c: C.blue},
          ].map((n, i) => (
            <React.Fragment key={n.t}>
              <div style={{width: 260, padding: '22px 10px', textAlign: 'center', borderRadius: 16, border: `2px solid ${n.c}`, opacity: Math.min(1, chain(i)), transform: `scale(${(0.85 + 0.15 * Math.min(1, chain(i))).toFixed(3)})`}}>
                <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: n.c}}>{n.t}</div>
                <div style={{fontFamily: FONT.sans, fontSize: 22, color: C.muted}}>{n.d}</div>
              </div>
              {i < 2 ? <span style={{fontSize: 40, color: C.muted, opacity: Math.min(1, chain(i + 1))}}>→</span> : null}
            </React.Fragment>
          ))}
        </div>
        <div style={{marginTop: 40, fontFamily: FONT.serif, fontSize: 34, color: C.ink, opacity: cite}}>
          … <span style={{background: `rgba(255,216,77,${cite.toFixed(3)})`, borderRadius: 4}}>(Arrhenius, 1887, dalam Overby & Chang, 2022)</span>.
        </div>
      </Panel>
      <Panel x={1160} y={200} w={650} h={640} p={Math.min(sB, ref)} title="daftar pustaka" col={C.mint}>
        <Item p={ramp(t, wordOf(3, 'benar-benar') - 0.2, wordOf(3, 'benar-benar') + 0.5)} size={28}>
          Overby, J., & Chang, R. (2022). <i>Chemistry</i> …
        </Item>
        <Item p={ramp(t, wordOf(3, 'benar-benar') + 0.3, wordOf(3, 'benar-benar') + 0.9)} size={28} cross>
          Arrhenius (1887) — tidak dibaca langsung
        </Item>
        <div style={{marginTop: 40, padding: '16px 20px', borderRadius: 12, background: '#fff4c2', fontFamily: FONT.sans, fontSize: 26, opacity: orig}}>
          Kalau bisa, cari dan baca sumber aslinya.
        </div>
      </Panel>
      <Panel x={120} y={200} w={1680} h={640} p={sC} title="tiga teknik parafrase" col={C.blue}>
        <div style={{fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 28, color: C.muted}}>
          Asli: “Antosianin memiliki ciri khas yaitu mengalami perubahan warna pada pH tertentu.” (Marka et al., 2025, hlm. 136)
        </div>
        <div style={{display: 'flex', gap: 26, marginTop: 26}}>
          {TECH.map((x, i) => {
            const q = ramp(t, wordOf(4, x.w) - 0.15, wordOf(4, x.w) + 0.5, BACK);
            return (
              <div key={x.t} style={{flex: 1, padding: '20px 22px', borderRadius: 16, border: `2px solid ${C.blue}`, opacity: Math.min(1, q), transform: `translateY(${((1 - Math.min(1, q)) * 20).toFixed(2)}px)`}}>
                <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: C.blue}}>
                  {i + 1}. {x.t}
                </div>
                <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.5, marginTop: 10, color: C.ink}}>
                  {x.ex}{' '}
                  <span style={{background: `rgba(255,216,77,${allCite.toFixed(3)})`, borderRadius: 4, fontFamily: FONT.sans, fontSize: 22}}>(Marka et al., 2025)</span>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
};
