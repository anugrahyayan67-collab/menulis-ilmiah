import React from 'react';
import {BACK, ramp} from '../anim';
import {Panel} from '../components/kit';
import {Sub} from '../components/primitives';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const big: React.CSSProperties = {fontFamily: FONT.serif, fontSize: 40, color: C.ink, lineHeight: 1.5};
const note: React.CSSProperties = {fontFamily: FONT.sans, fontSize: 22, color: C.muted};

const Duo: React.FC<{ok: React.ReactNode; bad: React.ReactNode; p: number}> = ({ok, bad, p}) => (
  <div style={{display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 6}}>
    <span style={big}>
      {ok} <b style={{color: C.mint, fontFamily: FONT.sans, fontSize: 30, opacity: p}}>✓</b>
    </span>
    <span style={{...big, fontSize: 32, color: C.muted, position: 'relative', opacity: 0.4 + 0.6 * p}}>
      {bad}
      <span style={{position: 'absolute', left: -4, top: '55%', height: 4, width: `calc(${(p * 100).toFixed(1)}% + 8px)`, background: C.red, borderRadius: 2}} />
    </span>
  </div>
);

export const Angka: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const a = (i: number) => ramp(t, cue(i) - 0.2, cue(i) + 0.5, BACK);
  const w = (i: number, x: string, d = 0.6) => ramp(t, wordOf(i, x) - 0.1, wordOf(i, x) + d);
  const head = ramp(t, cue(0) - 0.2, cue(0) + 0.5);
  const gone = 1 - ramp(t, cue(5) - 0.5, cue(5) - 0.1);
  const pos = [
    [120, 270],
    [690, 270],
    [1260, 270],
    [120, 560],
  ];
  return (
    <>
      <div style={{position: 'absolute', left: 120, top: 196, fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.ink, opacity: head}}>
        Angka, satuan, dan rumus: tulis dengan konsisten
      </div>
      <Panel x={pos[0][0]} y={pos[0][1]} w={540} h={270} p={a(1)} title="desimal & ribuan" col={C.blue}>
        <Duo ok="0,1 M" bad="0.1 M" p={w(1, 'desimal')} />
        <Duo ok="1.000 g" bad="1,000 g" p={w(1, 'ribuan')} />
      </Panel>
      <Panel x={pos[1][0]} y={pos[1][1]} w={540} h={270} p={a(2)} title="spasi & satuan resmi" col={C.cyan}>
        <Duo ok="5 mL" bad="5mL" p={w(2, 'spasi')} />
        <Duo ok="25 °C" bad="25 derajat" p={w(2, 'resmi')} />
      </Panel>
      <Panel x={pos[2][0]} y={pos[2][1]} w={540} h={270} p={a(3)} title="rumus kimia" col={C.violet}>
        <Duo
          ok={
            <>
              H<Sub>2</Sub>O
            </>
          }
          bad="H2O"
          p={w(3, 'subskrip')}
        />
        <div style={{...note, marginTop: 10, opacity: w(3, 'wujud')}}>persamaan reaksi diberi wujud zat (s, l, g, aq)</div>
      </Panel>
      <Panel x={pos[3][0]} y={pos[3][1]} w={830} h={270} p={Math.min(ramp(t, wordOf(3, 'persamaan') - 0.2, wordOf(3, 'persamaan') + 0.5), gone)} title="persamaan reaksi" col={C.violet}>
        <div style={{...big, fontSize: 36}}>
          HCl<Sub>(aq)</Sub> + NaOH<Sub>(aq)</Sub> → NaCl<Sub>(aq)</Sub> + H<Sub>2</Sub>O<Sub>(l)</Sub>
        </div>
        <div style={{...note, marginTop: 10}}>wujud zat ditulis sebagai subskrip dalam kurung</div>
      </Panel>
      <Panel x={pos[3][0] + 870} y={pos[3][1]} w={810} h={270} p={Math.min(a(4), gone)} title="simbol besaran" col={C.amber}>
        <div style={big}>
          <i>t</i> = 30 s
          <span style={{...note, marginLeft: 26, fontSize: 24}}>
            <i style={{fontFamily: FONT.serif}}>t</i> miring (besaran) · s tegak (satuan)
          </span>
        </div>
        <div style={{...big, marginTop: 4}}>
          <i>V</i> = 10 mL
        </div>
      </Panel>
      <Panel x={120} y={560} w={1680} h={270} p={ramp(t, cue(5) - 0.1, cue(5) + 0.5)} title="bilangan dalam teks" col={C.mint}>
        <div style={{display: 'flex', gap: 80}}>
          <div>
            <div style={big}>
              <b>tiga</b> tabung reaksi
            </div>
            <div style={note}>bisa ditulis satu–dua kata → huruf</div>
          </div>
          <div style={{opacity: w(5, 'satuan')}}>
            <div style={big}>
              <b>3 mL</b> larutan
            </div>
            <div style={note}>diikuti satuan → angka</div>
          </div>
          <div style={{opacity: w(5, 'data')}}>
            <div style={big}>
              pH <b>2</b>, <b>7</b>, dan <b>12</b>
            </div>
            <div style={note}>data → angka</div>
          </div>
        </div>
      </Panel>
    </>
  );
};
