import type React from 'react';
import {Alami} from './Alami';
import {Alur} from './Alur';
import {Angka} from './Angka';
import {Apa} from './Apa';
import {Artikel} from './Artikel';
import {Baca} from './Baca';
import {Bahas} from './Bahas';
import {Baku} from './Baku';
import {Cari} from './Cari';
import {Catat} from './Catat';
import {Ciri} from './Ciri';
import {Efektif} from './Efektif';
import {Ejaan} from './Ejaan';
import {Etika} from './Etika';
import {Hipotesis} from './Hipotesis';
import {Hook} from './Hook';
import {Jenis} from './Jenis';
import {Judul} from './Judul';
import {Kelola} from './Kelola';
import {Kerangka} from './Kerangka';
import {Khusus} from './Khusus';
import {Kutip} from './Kutip';
import {Laporan} from './Laporan';
import {Makalah} from './Makalah';
import {Nilai} from './Nilai';
import {Outro} from './Outro';
import {Padu} from './Padu';
import {Paragraf} from './Paragraf';
import {Recap} from './Recap';
import {Revisi} from './Revisi';
import {Roadmap} from './Roadmap';
import {Simpulan} from './Simpulan';
import {Sintesis} from './Sintesis';
import {Tabel} from './Tabel';
import {Tanda} from './Tanda';
import {Title} from './Title';
import {Topik} from './Topik';
import {Word} from './Word';

// Pemetaan id adegan di naskah → komponen visual.
export const SCENES: Record<string, React.FC> = {
  hook: Hook,
  title: Title,
  roadmap: Roadmap,
  ciri: Ciri,
  jenis: Jenis,
  topik: Topik,
  alur: Alur,
  cari: Cari,
  nilai: Nilai,
  baca: Baca,
  catat: Catat,
  kelola: Kelola,
  kerangka: Kerangka,
  judul: Judul,
  paragraf: Paragraf,
  sintesis: Sintesis,
  padu: Padu,
  efektif: Efektif,
  baku: Baku,
  ejaan: Ejaan,
  tanda: Tanda,
  angka: Angka,
  alami: Alami,
  kutip: Kutip,
  khusus: Khusus,
  apa: Apa,
  etika: Etika,
  laporan: Laporan,
  hipotesis: Hipotesis,
  tabel: Tabel,
  bahas: Bahas,
  simpulan: Simpulan,
  artikel: Artikel,
  makalah: Makalah,
  word: Word,
  revisi: Revisi,
  recap: Recap,
  outro: Outro,
};
