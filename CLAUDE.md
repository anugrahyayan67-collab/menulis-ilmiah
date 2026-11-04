# Konteks repo (untuk asisten AI)

- Video **"Dari Kepala ke Kertas" — menulis karya ilmiah dari nol** milik **Yayan** (Septian Anugrah). Mesin disalin dari `video-orbital-molekul`. Aturan umum & pelajaran teknis: repo `septiananugrah-ship-it/science-intro` → `CLAUDE.md`.
- **Gaya "Studio Tulis"** (pengguna minta modern, tegas, nyaman di mata — BUKAN gelap ala kuantum, BUKAN kertas krem/buram/vintage): latar rata `#f3f5fa` + kisi titik tipis, kartu putih bergaris tepi 1,5 px + garis aksen atas, stabilo kuning `C.hilite`, coretan & koreksi merah `C.red`. Tanpa vignette, tanpa grain, tanpa blur, tanpa kertas miring. Font Outfit (UI) + Source Serif 4 (teks dokumen) + JetBrains Mono (label).
- Merek: kapsul logo S + SCIENTIAN + "Explore Science with Yayan" di judul & penutup; penutup "Disusun oleh Septian Anugrah Dwi Putra". Tanpa intro terpisah.
- Benang merah: contoh berjalan **ekstrak kubis ungu sebagai indikator asam basa** — dari topik → pertanyaan → sumber → kartu catatan → kerangka → paragraf → sitasi → laporan → revisi.
- **Kode warna bagian**: 1 Persiapan biru, 2 Sumber & membaca teal, 3 Menyusun ungu, 4 Mengutip merah, 5 Merakit & merevisi hijau (`PARTS` di `ChapterHeading.tsx`).
- Gaya bahasa naskah mengikuti aturan menulis yang diajarkan: hindari "bukan…melainkan", "tidak hanya…tetapi juga", "Penting untuk dicatat", "Dengan kata lain"; penghubung level 3 (selain itu, oleh karena itu, dengan demikian).
- Komponen: `src/components/paper.tsx` (Paper, TypeText + Seg: stabilo/coret/perbaikan/kotak/garis bawah, NoteCard, Check, DocPage, Magnifier, Pen, Kicker).
- **Claude tidak menjalankan workflow GitHub Actions.** Setelah merge ke `main`, minta pengguna menekan *Run workflow*.
- Narasi belum direkam (Edge TTS gratis tersedia: `mesin: edge`). Selalu sediakan versi tanpa narasi.

## Aturan konten & tata letak
- Klaim faktual & contoh kalimat bersumber dicek di `naskah/AUDIT.md`; data tabel laporan diberi label "contoh data".
- Zona subtitle (bawah 180 px) bebas; margin ≥ 80 px; komponen HTML di luar `<Stage>`.
- Kemulusan: tanpa ganti gaya berdasarkan ambang (pakai `interpolateColors` / silang-pudar), tanpa CSS blur, tanpa emoji (font headless tidak punya glyph → pakai SVG).

## QA
- `CHROME_PATH=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell node scripts/qa-lines.mjs out/x <adegan...>` lalu `python3 scripts/contact.py out/x out/x-s 3`.
- `npm run check` (cek kata `wordOf`), uji kemulusan `node scripts/qa-film.mjs out/a.mp4 0 99999 0.25` lalu `python3 scripts/qa-glitch.py out/a.mp4 0`.
