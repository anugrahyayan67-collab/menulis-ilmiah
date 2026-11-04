import React from 'react';
import {interpolateColors} from 'remotion';
import {BACK, ramp, slot} from '../anim';
import {Check, Kicker} from '../components/paper';
import {useScene} from '../SceneContext';
import {C, FONT} from '../theme';

const SECTIONS = ['Tujuan', 'Dasar teori', 'Alat & bahan', 'Cara kerja', 'Hasil pengamatan', 'Pembahasan', 'Simpulan'];
// baris narasi → bagian yang disorot
const ACTIVE: number[][] = [[], [0, 1], [2, 3], [4], [5], [5], [6]];

const Panel: React.FC<{p: number; title: string; col: string; children: React.ReactNode}> = ({p, title, col, children}) => (
  <div
    style={{
      position: 'absolute',
      left: 640,
      top: 200,
      width: 1170,
      height: 640,
      boxSizing: 'border-box',
      padding: '26px 36px',
      background: '#fff',
      border: `1.5px solid ${C.faint}`,
      borderTop: `6px solid ${col}`,
      borderRadius: 16,
      boxShadow: '0 10px 28px rgba(22,33,62,0.08)',
      opacity: p,
      transform: `translateY(${((1 - p) * 18).toFixed(2)}px)`,
    }}
  >
    <Kicker color={col}>{title}</Kicker>
    <div style={{marginTop: 14}}>{children}</div>
  </div>
);

const ROWS = [
  {l: 'HCl encer', s: 'asam', w: 'merah', c: '#d8344a'},
  {l: 'Air suling', s: 'netral', w: 'ungu', c: '#8a4fb0'},
  {l: 'NaOH encer', s: 'basa', w: 'hijau', c: '#2f9a6a'},
];

export const Laporan: React.FC = () => {
  const {t, cue, wordOf} = useScene();
  const p0 = slot(t, cue(0) - 0.2, cue(1) - 0.1);
  const p1 = slot(t, cue(1) - 0.1, cue(2) - 0.1);
  const p2 = slot(t, cue(2) - 0.1, cue(3) - 0.1);
  const p3 = slot(t, cue(3) - 0.1, cue(4) - 0.1);
  const p4 = slot(t, cue(4) - 0.1, cue(6) - 0.1);
  const p6 = ramp(t, cue(6) - 0.1, cue(6) + 0.5);
  const why = ramp(t, wordOf(4, 'mengapa') - 0.2, wordOf(4, 'mengapa') + 0.4, BACK);
  const theory = ramp(t, wordOf(4, 'teori') - 0.3, wordOf(4, 'teori') + 0.4);
  const diff = ramp(t, cue(5) - 0.1, cue(5) + 0.5);
  return (
    <>
      {/* tab bagian laporan */}
      {SECTIONS.map((s, i) => {
        const a = ramp(t, cue(0) + 0.2 + i * 0.22, cue(0) + 0.7 + i * 0.22, BACK);
        // sorotan halus: bagian aktif menurut baris narasi (silang-pudar per baris)
        const on = ACTIVE.reduce((acc, list, li) => (list.includes(i) ? Math.max(acc, Math.min(ramp(t, cue(li) - 0.2, cue(li) + 0.3), 1 - ramp(t, cue(li + 1) - 0.3, cue(li + 1) + 0.1))) : acc), 0);
        const big = i === 5 ? ramp(t, wordOf(4, 'terpenting') - 0.2, wordOf(4, 'terpenting') + 0.4) : 0;
        return (
          <div
            key={s}
            style={{
              position: 'absolute',
              left: 110,
              top: 200 + i * 92,
              width: 480,
              height: 76,
              boxSizing: 'border-box',
              borderRadius: 14,
              background: interpolateColors(on, [0, 1], ['#ffffff', '#eaf0fe']),
              border: `2px solid ${interpolateColors(on, [0, 1], [C.faint, C.blue])}`,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '0 22px',
              opacity: Math.min(1, a),
              transform: `translateX(${((1 - Math.min(1, a)) * -40 + 18 * on).toFixed(2)}px) scale(${(1 + 0.05 * big).toFixed(3)})`,
              transformOrigin: '0% 50%',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 22, color: C.blue}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 30, color: C.ink}}>{s}</span>
            {i === 5 ? <span style={{marginLeft: 'auto', fontFamily: FONT.sans, fontWeight: 800, fontSize: 20, color: '#fff', background: C.red, borderRadius: 8, padding: '3px 10px', opacity: big}}>TERPENTING</span> : null}
          </div>
        );
      })}
      <Panel p={p0} title="laporan praktikum" col={C.blue}>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 54, color: C.ink, lineHeight: 1.15, marginTop: 40}}>
          Semua bahan
          <br />
          dirakit jadi satu
        </div>
        <div style={{fontFamily: FONT.sans, fontSize: 30, color: C.muted, marginTop: 24}}>kerangka · kartu catatan · data pengamatan</div>
        <div style={{fontFamily: FONT.sans, fontSize: 24, color: C.muted, marginTop: 30}}>urutan bagian mengikuti format laboratorium masing-masing</div>
      </Panel>
      <Panel p={p1} title="tujuan & dasar teori" col={C.blue}>
        <div style={{fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.5}}>
          <b>Tujuan:</b> mengetahui perubahan warna ekstrak kubis ungu pada berbagai pH.
        </div>
        <div style={{marginTop: 26, fontFamily: FONT.serif, fontSize: 30, lineHeight: 1.6, color: C.ink, opacity: ramp(t, wordOf(1, 'Dasar') - 0.2, wordOf(1, 'Dasar') + 0.5)}}>
          <b>Dasar teori:</b> Antosianin merupakan zat warna alami yang dapat berubah warna pada pH tertentu{' '}
          <span style={{background: `rgba(255,216,77,${ramp(t, wordOf(1, 'sitasi') - 0.2, wordOf(1, 'sitasi') + 0.4).toFixed(3)})`, borderRadius: 4}}>(Marka et al., 2025)</span>. …
        </div>
      </Panel>
      <Panel p={p2} title="alat, bahan & cara kerja" col={C.cyan}>
        <div style={{display: 'flex', gap: 40}}>
          <div style={{flex: 1}}>
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28}}>Alat & bahan</div>
            {['kubis ungu', 'air', 'gelas kimia', 'tabung reaksi', 'larutan uji'].map((x, i) => (
              <div key={x} style={{fontFamily: FONT.sans, fontSize: 28, marginTop: 10, opacity: ramp(t, cue(2) + 0.3 + i * 0.2, cue(2) + 0.7 + i * 0.2)}}>• {x}</div>
            ))}
          </div>
          <div style={{flex: 1.6}}>
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28}}>Cara kerja (kalimat pasif)</div>
            {['Kubis ungu dipotong kecil-kecil.', 'Potongan kubis direbus dalam air.', 'Ekstrak diteteskan ke setiap larutan uji.'].map((x, i) => (
              <div key={x} style={{fontFamily: FONT.serif, fontSize: 29, marginTop: 12, opacity: ramp(t, wordOf(2, 'cara') + 0.3 + i * 0.4, wordOf(2, 'cara') + 0.8 + i * 0.4)}}>
                {i + 1}. {x}
              </div>
            ))}
          </div>
        </div>
      </Panel>
      <Panel p={p3} title="hasil pengamatan · contoh data" col={C.violet}>
        <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.4fr', fontFamily: FONT.sans, fontSize: 30}}>
          {['Larutan', 'Sifat', 'Warna ekstrak'].map((h) => (
            <div key={h} style={{fontWeight: 800, padding: '12px 8px', borderBottom: `3px solid ${C.ink}`}}>{h}</div>
          ))}
          {ROWS.map((r, i) => {
            const q = ramp(t, cue(3) + 0.4 + i * 0.5, cue(3) + 0.9 + i * 0.5);
            return (
              <React.Fragment key={r.l}>
                <div style={{padding: '16px 8px', borderBottom: `1.5px solid ${C.faint}`, opacity: q}}>{r.l}</div>
                <div style={{padding: '16px 8px', borderBottom: `1.5px solid ${C.faint}`, opacity: q}}>{r.s}</div>
                <div style={{padding: '16px 8px', borderBottom: `1.5px solid ${C.faint}`, opacity: q, display: 'flex', alignItems: 'center', gap: 14}}>
                  <span style={{width: 34, height: 34, borderRadius: 17, background: r.c}} /> {r.w}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div style={{marginTop: 20, fontFamily: FONT.sans, fontSize: 24, color: C.muted}}>data apa adanya, tanpa penjelasan dulu</div>
      </Panel>
      <Panel p={p4} title="pembahasan" col={C.red}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div style={{padding: '14px 20px', borderRadius: 14, border: `2px solid ${C.faint}`, fontFamily: FONT.sans, fontSize: 28}}>
            Air suling → <b style={{color: '#8a4fb0'}}>ungu</b>
          </div>
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 46, color: C.red, opacity: why, transform: `scale(${(0.8 + 0.2 * Math.min(1, why)).toFixed(3)})`}}>mengapa?</div>
        </div>
        <div style={{marginTop: 22, padding: '16px 22px', borderRadius: 14, background: `${C.blue}0d`, border: `2px solid ${C.blue}`, fontFamily: FONT.serif, fontSize: 29, lineHeight: 1.55, opacity: theory}}>
          Struktur antosianin berubah mengikuti pH. Pada pH netral, kation flavilium terdeprotonasi menjadi basa kuinoidal yang berwarna ungu (Leba et al., 2023).
        </div>
        <div style={{marginTop: 22, opacity: diff}}>
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 28, color: C.ink}}>Hasil berbeda dari teori? Tulis kemungkinan penyebabnya:</div>
          {['ekstrak terlalu encer', 'pengamatan warna bersifat subjektif', 'jumlah tetes tidak sama'].map((x, i) => (
            <div key={x} style={{fontFamily: FONT.sans, fontSize: 27, color: C.muted, marginTop: 8, opacity: ramp(t, cue(5) + 0.8 + i * 0.4, cue(5) + 1.3 + i * 0.4)}}>• {x}</div>
          ))}
        </div>
      </Panel>
      <Panel p={p6} title="simpulan ↔ tujuan" col={C.mint}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center', rowGap: 26, marginTop: 10}}>
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.muted}}>TUJUAN</div>
          <div />
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.muted}}>SIMPULAN</div>
          <div style={{fontFamily: FONT.serif, fontSize: 29, lineHeight: 1.45}}>Mengetahui perubahan warna ekstrak kubis ungu pada berbagai pH.</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Check p={ramp(t, wordOf(6, 'menjawab') - 0.1, wordOf(6, 'menjawab') + 0.5)} size={46} />
          </div>
          <div style={{fontFamily: FONT.serif, fontSize: 29, lineHeight: 1.45, opacity: ramp(t, wordOf(6, 'menjawab') - 0.2, wordOf(6, 'menjawab') + 0.6)}}>
            Ekstrak kubis ungu berwarna merah dalam larutan asam, ungu dalam larutan netral, dan hijau dalam larutan basa.
          </div>
        </div>
        <div style={{marginTop: 30, fontFamily: FONT.sans, fontSize: 26, color: C.red, fontWeight: 600, opacity: ramp(t, wordOf(6, 'tanpa') - 0.2, wordOf(6, 'tanpa') + 0.4)}}>
          tanpa bahasan baru di simpulan
        </div>
      </Panel>
    </>
  );
};
