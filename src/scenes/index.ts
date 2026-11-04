import type React from 'react';
import {Alami} from './Alami';
import {Apa} from './Apa';
import {Artikel} from './Artikel';
import {Baca} from './Baca';
import {Cari} from './Cari';
import {Catat} from './Catat';
import {Ciri} from './Ciri';
import {Efektif} from './Efektif';
import {Ejaan} from './Ejaan';
import {Hook} from './Hook';
import {Jenis} from './Jenis';
import {Kerangka} from './Kerangka';
import {Kutip} from './Kutip';
import {Laporan} from './Laporan';
import {Outro} from './Outro';
import {Padu} from './Padu';
import {Paragraf} from './Paragraf';
import {Recap} from './Recap';
import {Revisi} from './Revisi';
import {Roadmap} from './Roadmap';
import {Title} from './Title';
import {Topik} from './Topik';

// Pemetaan id adegan di naskah → komponen visual.
export const SCENES: Record<string, React.FC> = {
  hook: Hook,
  title: Title,
  roadmap: Roadmap,
  ciri: Ciri,
  jenis: Jenis,
  topik: Topik,
  cari: Cari,
  baca: Baca,
  catat: Catat,
  kerangka: Kerangka,
  paragraf: Paragraf,
  padu: Padu,
  efektif: Efektif,
  ejaan: Ejaan,
  alami: Alami,
  kutip: Kutip,
  apa: Apa,
  laporan: Laporan,
  artikel: Artikel,
  revisi: Revisi,
  recap: Recap,
  outro: Outro,
};
