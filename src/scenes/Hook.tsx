import React from 'react';
import {EASE_IN_OUT, ramp} from '../anim';
import {Badge} from '../components/primitives';
import {Kicker, Paper, Pen, TypeText, segs} from '../components/paper';
import {Stage} from '../components/primitives';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const lin = (x: number) => x;

export const Hook: React.FC = () => {
  const {t, cue, cueEnd, wordOf} = useScene();
  const inL = ramp(t, cue(0) - 0.6, cue(0) + 0.4);
  const inR = ramp(t, cue(0) + 0.2, cue(0) + 1.2);
  const typeL = ramp(t, cue(0) + 0.6, cue(1) + 1.2, lin);
  const typeR = ramp(t, cue(2) - 0.2, cueEnd(2) + 0.6, lin);
  const k1 = wordOf(1, 'kaku');
  const box = (i: number) => ramp(t, k1 + i * 0.35, k1 + i * 0.35 + 0.5);
  const s2 = wordOf(2, 'sumbernya');
  const out = ramp(t, cue(5) - 0.3, cue(5) + 0.7, EASE_IN_OUT);
  const same = ramp(t, cue(3), cue(3) + 0.8);
  const blank = ramp(t, cue(5) + 0.4, cue(5) + 1.4);
  const penP = ramp(t, cue(5) + 1.0, cue(5) + 2.4);

  const left = segs(
    'Indikator asam basa ',
    {t: 'bukan sekadar', box: box(0)},
    ' zat pewarna, ',
    {t: 'melainkan', box: box(1)},
    ' senyawa yang ',
    {t: 'tidak hanya', box: box(2)},
    ' berubah warna, ',
    {t: 'tetapi juga', box: box(3)},
    ' mencerminkan pH larutan secara krusial. ',
    {t: 'Penting untuk dicatat', box: box(4)},
    ', antosianin merupakan pigmen multifungsi yang sangat esensial dalam berbagai aplikasi kimia modern.',
  );
  const right = segs(
    'Indikator asam basa merupakan zat yang warnanya berbeda dalam larutan asam dan basa. ',
    {t: 'Banyak', under: ramp(t, cue(2) + 1.6, cue(2) + 2.2)},
    ' indikator asam basa berasal dari pigmen tumbuhan. ',
    {t: 'Contohnya', under: ramp(t, cue(2) + 2.2, cue(2) + 2.8)},
    ', ekstrak kubis ungu menghasilkan warna yang berbeda-beda pada berbagai pH ',
    {t: '(Overby & Chang, 2022)', hl: ramp(t, s2, s2 + 0.6)},
    '.',
  );
  const tags = [
    {w: 'menyusun', text: 'cara menyusun', col: C.blue},
    {w: 'membaca', text: 'cara membaca sumber', col: C.cyan},
    {w: 'merangkai', text: 'cara merangkai kalimat', col: C.violet},
  ];
  return (
    <>
      <Paper x={130} y={200} w={800} lift={1 - inL} opacity={inL * (1 - out)} style={{translate: `${-120 * out}px 0px`}}>
        <Kicker color={C.red}>Paragraf A</Kicker>
        <TypeText parts={left} p={typeL} t={t} size={29} lh={1.55} style={{marginTop: 10}} />
      </Paper>
      <Paper x={990} y={200} w={800} lift={1 - inR} opacity={inR * (1 - out)} style={{translate: `${120 * out}px 0px`}}>
        <Kicker color={C.mint}>Paragraf B</Kicker>
        <TypeText parts={right} p={typeR} t={t} size={29} lh={1.55} style={{marginTop: 10}} />
      </Paper>
      {/* cap "kaku" */}
      <div
        style={{
          position: 'absolute',
          left: 700,
          top: 640,
          opacity: ramp(t, k1 + 1.8, k1 + 2.3) * (1 - out),
          transform: `rotate(-8deg) scale(${1.25 - 0.25 * ramp(t, k1 + 1.8, k1 + 2.3)})`,
          border: `4px solid ${C.red}`,
          color: C.red,
          borderRadius: 10,
          padding: '4px 18px',
          fontFamily: FONT.mono,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 4,
        }}
      >
        KAKU
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1570,
          top: 640,
          opacity: ramp(t, s2 + 0.8, s2 + 1.3) * (1 - out),
          transform: `rotate(6deg) scale(${1.25 - 0.25 * ramp(t, s2 + 0.8, s2 + 1.3)})`,
          border: `4px solid ${C.mint}`,
          color: C.mint,
          borderRadius: 10,
          padding: '4px 18px',
          fontFamily: FONT.mono,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 4,
        }}
      >
        MENGALIR
      </div>
      {/* penulis yang sama */}
      <Stage>
        <g opacity={same * (1 - out) * (1 - ramp(t, wordOf(4, 'menyusun') - 0.4, wordOf(4, 'menyusun') + 0.2))}>
          <path d="M530,700 C530,760 960,740 960,770 C960,740 1390,760 1390,700" fill="none" stroke={C.ink} strokeOpacity={0.5} strokeWidth={3} strokeDasharray="8 8" />
          <circle cx={960} cy={790} r={20} fill={C.ink} opacity={0.75} />
          <path d="M930,840 C935,812 985,812 990,840" fill={C.ink} opacity={0.75} />
        </g>
        {/* halaman kosong + pena */}
        <g opacity={blank}>
          <rect x={660} y={230 - 20 * (1 - blank)} width={600} height={560} rx={8} fill={C.paper} filter="url(#paper-shadow)" />
          {Array.from({length: 9}, (_, i) => (
            <rect key={i} x={690} y={330 + i * 50} width={540} height={1.4} fill={C.rule} opacity={0.6} />
          ))}
          <rect x={722} y={290} width={1.8} height={480} fill={C.red} opacity={0.35} />
          <rect x={745} y={318} width={4} height={34} rx={1} fill={C.blue} opacity={0.5 + 0.5 * Math.cos(t * 7)} />
        </g>
        <Pen x={760 + 40 * (1 - penP)} y={340 - 200 * (1 - penP)} angle={-40} opacity={penP} scale={1.3} />
      </Stage>
      {tags.map((g, i) => {
        const a = ramp(t, wordOf(4, g.w) - 0.1, wordOf(4, g.w) + 0.5);
        return <Badge key={i} x={480 + i * 480} y={890 - 12 * a - 60} text={g.text} color={g.col} opacity={a * (1 - out)} size={30} />;
      })}
    </>
  );
};
