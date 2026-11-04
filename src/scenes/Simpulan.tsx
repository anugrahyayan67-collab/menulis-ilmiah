import React from 'react';
import {BACK, ramp} from '../anim';
import {Item, Panel} from '../components/kit';
import {Check} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const PAIRS = [
  {tj: 'Mengetahui warna ekstrak kubis ungu dalam larutan asam dan basa.', sp: 'Ekstrak kubis ungu berwarna merah dalam larutan asam dan hijau dalam larutan basa.'},
  {tj: 'Mengetahui kelayakan ekstrak kubis ungu sebagai indikator.', sp: 'Ekstrak kubis ungu dapat digunakan sebagai indikator asam basa alami.'},
];

export const Simpulan: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const a = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const pair = (i: number) => ramp(t, cue(1) + 0.3 + i * 1.2, cue(1) + 0.9 + i * 1.2, BACK);
  const rules = ramp(t, cue(2) - 0.1, cue(2) + 0.5);
  const sar = ramp(t, cue(3) - 0.1, cue(3) + 0.5);
  const good = ramp(t, wordOf(4, 'meter') - 0.4, wordOf(4, 'meter') + 0.4);
  return (
    <>
      <Panel x={120} y={195} w={1690} h={370} p={a} title="simpulan = jawaban singkat atas tujuan" col={C.mint}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 70px 1fr', alignItems: 'center', rowGap: 18}}>
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: C.muted}}>TUJUAN</div>
          <div />
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 22, color: C.muted}}>SIMPULAN</div>
          {PAIRS.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.4, opacity: Math.min(1, pair(i))}}>
                <b style={{color: C.blue}}>{i + 1}.</b> {p.tj}
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Check p={pair(i)} size={44} />
              </div>
              <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.4, opacity: Math.min(1, pair(i))}}>
                <b style={{color: C.mint}}>{i + 1}.</b> {p.sp}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Panel>
      <Panel x={120} y={600} w={760} h={240} p={rules} title="biasanya" col={C.blue}>
        <Item p={ramp(t, wordOf(2, 'sitasi') - 0.2, wordOf(2, 'sitasi') + 0.4)} size={28} cross>
          sitasi
        </Item>
        <Item p={ramp(t, wordOf(2, 'panjang') - 0.2, wordOf(2, 'panjang') + 0.4)} size={28} cross>
          penjelasan panjang (sudah di pembahasan)
        </Item>
      </Panel>
      <Panel x={920} y={600} w={890} h={240} p={sar} title="saran" col={C.amber}>
        <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.5, color: C.muted, position: 'relative', opacity: 1 - 0.6 * good}}>
          “Sebaiknya praktikum dilakukan dengan lebih baik.”
          <span style={{position: 'absolute', left: -4, top: '55%', height: 4, width: `calc(${(good * 100).toFixed(1)}% + 8px)`, background: C.red, borderRadius: 2}} />
        </div>
        <div style={{fontFamily: FONT.serif, fontSize: 28, lineHeight: 1.5, color: C.ink, marginTop: 8, opacity: good}}>
          “Warna sebaiknya dikaitkan dengan nilai pH yang diukur memakai pH meter.”
        </div>
      </Panel>
    </>
  );
};
