# Dari Kepala ke Kertas — menulis karya ilmiah dari nol

Film edukasi menulis ilmiah untuk mahasiswa, dibuat dengan [Remotion](https://remotion.dev). ±16 menit, 22 adegan, 2K 30 FPS, subtitle kata-per-kata, gaya terang modern "Studio Tulis".

Isi (5 bagian, 18 bab): ciri tulisan ilmiah → jenis karya (laporan, makalah, artikel IMRaD, lomba) → topik jadi pertanyaan & tujuan → berburu sumber (Google Scholar, Garuda, SINTA, DOAJ, ciri jurnal, DOI) → membaca jurnal tiga putaran → kartu catatan & matriks sumber → kerangka → paragraf (deduktif, induktif, campuran) → kepaduan & tingkatan kata penghubung → kalimat efektif → EYD V → menulis dengan wajar (pola yang terasa kaku) → kutipan & parafrase, plagiarisme → APA 7 → merakit laporan praktikum → artikel & abstrak → revisi → rangkuman. Contoh berjalan: ekstrak kubis ungu sebagai indikator asam basa.

## Render
Actions → **Render Menulis Ilmiah 2K 30FPS** → *Run workflow* (branch `main`). Hasil: versi dengan narasi (bila sudah ada suara) dan tanpa narasi.

Narasi: Actions → **Buat voice-over + render 2K** (pilih `edge` untuk suara gratis, atau `elevenlabs` bila kredit ada).

## Lokal
```bash
npm ci
npm run dev        # Remotion Studio
npm run timeline   # tulis naskah/ & public/timeline.json
npm run check      # cek penanda kata
```
