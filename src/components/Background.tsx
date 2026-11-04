import React from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, H, MOOD_TINT, W} from '../theme';
import {TIMELINE} from '../timeline.ts';

const tintAt = (t: number) => {
  const stops: number[] = [];
  const colors: string[] = [];
  TIMELINE.scenes.forEach((s) => {
    stops.push(s.start + 0.01, Math.max(s.start + 0.02, s.end - 1.5));
    colors.push(MOOD_TINT[s.mood], MOOD_TINT[s.mood]);
  });
  return interpolateColors(t, stops, colors);
};

const GAP = 44;

/** Latar modern: warna rata + kisi titik tegas yang bergeser pelan + bentuk garis tipis. Tanpa buram. */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const tint = tintAt(t);
  const ox = (t * 5) % GAP;
  const oy = (t * 3) % GAP;
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, overflow: 'hidden'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="dots" width={GAP} height={GAP} patternUnits="userSpaceOnUse" x={ox} y={oy}>
            <circle cx={GAP / 2} cy={GAP / 2} r={1.7} fill="#c2cadb" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" />
        {/* bentuk geometris tipis di sudut */}
        <g fill="none" stroke={tint} strokeOpacity={0.14} strokeWidth={2}>
          <circle cx={1790 + 10 * Math.sin(t * 0.2)} cy={150} r={170} />
          <circle cx={1790 + 10 * Math.sin(t * 0.2)} cy={150} r={120} />
          <rect x={-90} y={860 + 8 * Math.sin(t * 0.17)} width={260} height={260} rx={36} transform={`rotate(${(12 + t * 1.5) % 360} 40 990)`} />
        </g>
        {/* garis aksen di tepi atas */}
        <rect x={0} y={0} width={W} height={6} fill={tint} />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => null;
