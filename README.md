# Dari Kepala ke Kertas — menulis karya ilmiah dari nol

Film edukasi menulis ilmiah untuk mahasiswa, dibuat dengan [Remotion](https://remotion.dev). ±28 menit, 38 adegan, 2K 30 FPS, subtitle kata-per-kata, gaya terang modern "Studio Tulis".

Isi (5 bagian, 34 bab): ciri tulisan ilmiah → jenis karya → topik jadi pertanyaan → tahapan & jadwal menulis → berburu sumber (Scholar, Garuda, SINTA, DOAJ, DOI) → menilai sumber (peer review, jurnal predator) → membaca jurnal tiga putaran → kartu catatan & matriks sumber → Zotero/Mendeley → kerangka → judul → paragraf → sintesis beberapa sumber & membaca kritis → kepaduan & tingkatan kata penghubung → kalimat efektif → kata baku → EYD V → tanda baca → angka, satuan, rumus → gaya wajar → kutipan & parafrase → kutipan blok, sumber sekunder, teknik parafrase → APA 7 → cek kemiripan & etika AI → laporan praktikum → hipotesis → tabel & gambar → pembahasan → simpulan & saran → artikel & abstrak → makalah & esai lomba → merapikan di Word → revisi → rangkuman. Contoh berjalan: ekstrak kubis ungu sebagai indikator asam basa.

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
