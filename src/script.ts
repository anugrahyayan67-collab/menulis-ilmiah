// Naskah narasi "Dari Kepala ke Kertas" — Menulis karya ilmiah dari nol (laporan praktikum, makalah, artikel).
// Setiap adegan berisi baris narasi. Durasi baris dihitung otomatis dari jumlah
// suku kata (lihat timeline.ts) atau dari rekaman suara bila sudah ada,
// jadi cukup ubah teks di sini: visual, subtitle, dan musik ikut menyesuaikan.
//
// Aturan menulis teks narasi (dibaca mesin TTS):
//  - angka & simbol ditulis sebagai kata ("dua puluh meter per detik"),
//  - rumus ditulis sebagai kalimat; rumus rapi tampil di layar (komponen Formula).
// Fakta (EYD V, APA 7, cara membaca 3 putaran, dll.) dicek di naskah/AUDIT.md.
//
// hl     : kata/frasa yang disorot pada subtitle
// pause  : jeda (detik) SETELAH baris dibacakan
// lead   : jeda (detik) sebelum baris pertama adegan
// tail   : jeda (detik) setelah baris terakhir adegan
// fixed  : durasi tetap (detik) untuk adegan tanpa narasi

export type Line = {
  text: string;
  /** Teks khusus TTS (opsional). Bila kosong, dibuat otomatis oleh src/tts.ts. */
  tts?: string;
  hl?: string[];
  pause?: number;
};

export type SceneScript = {
  id: string;
  chapter: string; // nomor bab di heading, "" untuk tanpa heading
  part?: 1 | 2 | 3 | 4 | 5; // 1 persiapan, 2 sumber & membaca, 3 menyusun, 4 mengutip, 5 merakit & revisi
  title: string;
  lines: Line[];
  lead?: number;
  tail?: number;
  fixed?: number;
  mood: 'mystery' | 'title' | 'wonder' | 'build' | 'quantum' | 'tension' | 'bright' | 'resolve' | 'outro';
};

export const SCRIPT: SceneScript[] = [
  {
    "id": "hook",
    "chapter": "",
    "title": "Pembuka",
    "mood": "mystery",
    "lead": 1.6,
    "tail": 1.2,
    "lines": [
      {
        "text": "Coba lihat dua paragraf ini. Topiknya sama, yaitu indikator asam basa.",
        "hl": [
          "dua paragraf"
        ],
        "pause": 0.8
      },
      {
        "text": "Paragraf pertama padat dan penuh istilah. Rasanya kaku, seperti ditulis mesin.",
        "hl": [
          "kaku"
        ],
        "pause": 0.8
      },
      {
        "text": "Paragraf kedua mengalir. Setiap kalimat menyambung ke kalimat berikutnya, dan setiap klaim jelas sumbernya.",
        "hl": [
          "mengalir",
          "jelas sumbernya"
        ],
        "pause": 0.9
      },
      {
        "text": "Dua-duanya bisa ditulis oleh mahasiswa yang sama.",
        "pause": 0.6
      },
      {
        "text": "Bedanya ada pada cara menyusun, cara membaca sumber, dan cara merangkai kalimat.",
        "hl": [
          "cara menyusun",
          "membaca sumber",
          "merangkai kalimat"
        ],
        "pause": 0.9
      },
      {
        "text": "Kabar baiknya, semua itu bisa dipelajari langkah demi langkah, mulai dari halaman kosong.",
        "hl": [
          "halaman kosong"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "title",
    "chapter": "",
    "title": "Dari Kepala ke Kertas",
    "mood": "title",
    "fixed": 7,
    "lines": []
  },
  {
    "id": "roadmap",
    "chapter": "",
    "title": "Peta video",
    "mood": "wonder",
    "lead": 0.8,
    "tail": 1.4,
    "lines": [
      {
        "text": "Perjalanan kita punya lima bagian.",
        "hl": [
          "lima bagian"
        ],
        "pause": 0.6
      },
      {
        "text": "Pertama, menyiapkan tulisan: mengenal jenis karya ilmiah, lalu mengubah topik menjadi pertanyaan.",
        "hl": [
          "menyiapkan tulisan"
        ],
        "pause": 0.6
      },
      {
        "text": "Kedua, berburu sumber dan membaca jurnal dengan cepat tanpa tenggelam.",
        "hl": [
          "berburu sumber"
        ],
        "pause": 0.6
      },
      {
        "text": "Ketiga, menyusun kerangka, paragraf, dan kalimat yang enak dibaca.",
        "hl": [
          "menyusun"
        ],
        "pause": 0.6
      },
      {
        "text": "Keempat, mengutip sumber dan menulis daftar pustaka dengan benar.",
        "hl": [
          "mengutip"
        ],
        "pause": 0.6
      },
      {
        "text": "Kelima, merakit semuanya menjadi laporan atau artikel, lalu merevisinya.",
        "hl": [
          "merakit"
        ],
        "pause": 0.8
      },
      {
        "text": "Sepanjang video, kita menulis satu contoh nyata: ekstrak kubis ungu sebagai indikator asam basa.",
        "hl": [
          "kubis ungu"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "ciri",
    "chapter": "01",
    "title": "Apa itu tulisan ilmiah",
    "mood": "build",
    "part": 1,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Tulisan ilmiah menyajikan fakta dan hasil pemikiran secara runtut, objektif, dan dapat dipertanggungjawabkan.",
        "hl": [
          "runtut",
          "objektif",
          "dapat dipertanggungjawabkan"
        ],
        "pause": 0.8
      },
      {
        "text": "Ada tiga pegangan yang perlu diingat.",
        "pause": 0.5
      },
      {
        "text": "Pertama, objektif. Kalimat seperti menurut saya warnanya cantik diganti dengan data, misalnya warna larutan berubah dari ungu menjadi hijau.",
        "hl": [
          "objektif"
        ],
        "pause": 0.8
      },
      {
        "text": "Kedua, logis dan runtut. Setiap bagian menyambung ke bagian berikutnya, dari masalah sampai simpulan.",
        "hl": [
          "logis dan runtut"
        ],
        "pause": 0.7
      },
      {
        "text": "Ketiga, bersumber. Setiap klaim yang bukan hasil pengamatanmu sendiri harus menunjuk ke sumbernya.",
        "hl": [
          "bersumber"
        ],
        "pause": 0.8
      },
      {
        "text": "Bahasanya baku dan tetap sederhana. Tulisan ilmiah yang baik mudah dipahami pembacanya.",
        "hl": [
          "mudah dipahami"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "jenis",
    "chapter": "02",
    "title": "Kenali jenis karyanya",
    "mood": "build",
    "part": 1,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sebelum menulis, kenali dulu jenis karya yang diminta, karena setiap jenis punya kerangka sendiri.",
        "hl": [
          "kerangka sendiri"
        ],
        "pause": 0.7
      },
      {
        "text": "Laporan praktikum menceritakan percobaan: tujuan, dasar teori, alat dan bahan, cara kerja, hasil, pembahasan, dan simpulan.",
        "hl": [
          "Laporan praktikum"
        ],
        "pause": 0.7
      },
      {
        "text": "Makalah membahas satu topik dari berbagai sumber, dengan pendahuluan, pembahasan, dan penutup.",
        "hl": [
          "Makalah"
        ],
        "pause": 0.7
      },
      {
        "text": "Artikel jurnal melaporkan penelitian dengan pola IMRaD: pendahuluan, metode, hasil, dan pembahasan.",
        "hl": [
          "Artikel jurnal",
          "IMRaD"
        ],
        "pause": 0.7,
        "tts": "Artikel jurnal melaporkan penelitian dengan pola imrad: pendahuluan, metode, hasil, dan pembahasan."
      },
      {
        "text": "Karya tulis untuk lomba biasanya mirip artikel, ditambah gagasan atau solusi yang ditawarkan.",
        "hl": [
          "lomba"
        ],
        "pause": 0.7
      },
      {
        "text": "Jadi langkah pertama selalu sama: baca aturan dari dosen atau panitia, lalu ikuti formatnya.",
        "hl": [
          "baca aturan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "topik",
    "chapter": "03",
    "title": "Dari topik ke pertanyaan",
    "mood": "wonder",
    "part": 1,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Topik yang terlalu luas membuat tulisan melebar ke mana-mana.",
        "hl": [
          "terlalu luas"
        ],
        "pause": 0.7
      },
      {
        "text": "Indikator asam basa masih sangat luas. Kita persempit menjadi indikator alami dari kubis ungu.",
        "hl": [
          "persempit"
        ],
        "pause": 0.7
      },
      {
        "text": "Lalu ubah menjadi pertanyaan: bagaimana perubahan warna ekstrak kubis ungu pada larutan asam dan basa?",
        "hl": [
          "pertanyaan"
        ],
        "pause": 0.8
      },
      {
        "text": "Pertanyaan ini menjadi kompas. Setiap paragraf yang kamu tulis nanti harus membantu menjawabnya.",
        "hl": [
          "kompas"
        ],
        "pause": 0.7
      },
      {
        "text": "Dari pertanyaan, tujuan bisa langsung dirumuskan: mengetahui perubahan warna ekstrak kubis ungu pada berbagai pH.",
        "hl": [
          "tujuan"
        ],
        "pause": 0.7,
        "tts": "Dari pertanyaan, tujuan bisa langsung dirumuskan: mengetahui perubahan warna ekstrak kubis ungu pada berbagai pe ha."
      },
      {
        "text": "Tujuan yang baik memakai kata kerja yang bisa diukur, seperti mengetahui, menentukan, atau membandingkan.",
        "hl": [
          "bisa diukur"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "cari",
    "chapter": "04",
    "title": "Berburu sumber",
    "mood": "build",
    "part": 2,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sekarang saatnya mencari sumber. Tempat yang paling mudah adalah Google Scholar.",
        "hl": [
          "Google Scholar"
        ],
        "pause": 0.6,
        "tts": "Sekarang saatnya mencari sumber. Tempat yang paling mudah adalah Gugel Skolar."
      },
      {
        "text": "Untuk jurnal Indonesia ada Garuda dan SINTA, sedangkan DOAJ mengumpulkan jurnal akses terbuka dari banyak negara.",
        "hl": [
          "Garuda",
          "SINTA",
          "DOAJ"
        ],
        "pause": 0.7,
        "tts": "Untuk jurnal Indonesia ada Garuda dan Sinta, sedangkan de o a je mengumpulkan jurnal akses terbuka dari banyak negara."
      },
      {
        "text": "Pakai kata kunci yang spesifik, misalnya antosianin kubis ungu indikator, lalu batasi tahun terbitnya.",
        "hl": [
          "kata kunci"
        ],
        "pause": 0.7
      },
      {
        "text": "Banyak dosen meminta jurnal dan buku, jadi prosiding, skripsi, dan blog sebaiknya disaring dulu.",
        "hl": [
          "disaring"
        ],
        "pause": 0.7
      },
      {
        "text": "Jurnal yang jelas punya nama jurnal, volume, nomor, halaman, ISSN, dan biasanya DOI.",
        "hl": [
          "ISSN",
          "DOI"
        ],
        "pause": 0.7,
        "tts": "Jurnal yang jelas punya nama jurnal, volume, nomor, halaman, i es es en, dan biasanya de o i."
      },
      {
        "text": "DOI adalah alamat tetap sebuah artikel. Dengan DOI, siapa pun bisa menemukan artikel yang sama.",
        "hl": [
          "alamat tetap"
        ],
        "pause": 0.7,
        "tts": "De o i adalah alamat tetap sebuah artikel. Dengan de o i, siapa pun bisa menemukan artikel yang sama."
      },
      {
        "text": "Simpan setiap PDF dengan nama penulis dan tahun, supaya mudah dicari saat menulis.",
        "hl": [
          "nama penulis dan tahun"
        ],
        "pause": 1.0,
        "tts": "Simpan setiap pe de ef dengan nama penulis dan tahun, supaya mudah dicari saat menulis."
      }
    ]
  },
  {
    "id": "baca",
    "chapter": "05",
    "title": "Membaca jurnal tanpa tenggelam",
    "mood": "wonder",
    "part": 2,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Satu artikel jurnal bisa lebih dari sepuluh halaman. Kamu tidak perlu membacanya dari awal sampai akhir sekaligus.",
        "hl": [
          "sepuluh halaman"
        ],
        "pause": 0.7
      },
      {
        "text": "Pakai cara tiga putaran.",
        "hl": [
          "tiga putaran"
        ],
        "pause": 0.5
      },
      {
        "text": "Putaran pertama hanya lima sampai sepuluh menit: baca judul, abstrak, judul bagian, dan simpulan.",
        "hl": [
          "Putaran pertama"
        ],
        "pause": 0.7
      },
      {
        "text": "Di sini kamu memutuskan, apakah artikel ini membantu menjawab pertanyaanku?",
        "hl": [
          "memutuskan"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau ya, masuk putaran kedua: baca bagian yang relevan dengan teliti, termasuk tabel dan gambarnya.",
        "hl": [
          "putaran kedua"
        ],
        "pause": 0.7
      },
      {
        "text": "Putaran ketiga hanya untuk artikel inti, saat kamu perlu memahami metodenya secara mendalam.",
        "hl": [
          "Putaran ketiga"
        ],
        "pause": 0.7
      },
      {
        "text": "Selama membaca, tandai kalimat yang bisa kamu pakai, lalu catat nomor halamannya.",
        "hl": [
          "nomor halamannya"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "catat",
    "chapter": "06",
    "title": "Mencatat dengan rapi",
    "mood": "build",
    "part": 2,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Kesalahan yang sering terjadi: membaca banyak, mencatat sedikit, lalu lupa sumbernya.",
        "hl": [
          "lupa sumbernya"
        ],
        "pause": 0.7
      },
      {
        "text": "Biasakan membuat kartu catatan. Satu kartu berisi satu gagasan, lengkap dengan penulis, tahun, dan halaman.",
        "hl": [
          "kartu catatan"
        ],
        "pause": 0.7
      },
      {
        "text": "Tulis kutipan aslinya, lalu di bawahnya tulis ulang dengan kalimatmu sendiri.",
        "hl": [
          "kalimatmu sendiri"
        ],
        "pause": 0.7
      },
      {
        "text": "Kumpulkan kartu dalam tabel sederhana: sumber di baris, subtopik di kolom.",
        "hl": [
          "tabel sederhana"
        ],
        "pause": 0.7
      },
      {
        "text": "Dari tabel ini kelihatan subtopik mana yang sudah kuat dan mana yang masih kurang sumber.",
        "hl": [
          "kurang sumber"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau ada klaim yang belum ketemu sumbernya, tandai dulu dan jangan dikarang.",
        "hl": [
          "jangan dikarang"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "kerangka",
    "chapter": "07",
    "title": "Kerangka dulu, kalimat kemudian",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sebelum menulis paragraf, susun kerangka, yaitu daftar subbab dan poin utama yang akan dibahas.",
        "hl": [
          "kerangka"
        ],
        "pause": 0.7
      },
      {
        "text": "Untuk dasar teori kubis ungu, kerangkanya bisa seperti ini: asam dan basa, pH, indikator, lalu antosianin.",
        "hl": [
          "asam dan basa",
          "antosianin"
        ],
        "pause": 0.7,
        "tts": "Untuk dasar teori kubis ungu, kerangkanya bisa seperti ini: asam dan basa, pe ha, indikator, lalu antosianin."
      },
      {
        "text": "Urutkan dari yang umum ke yang khusus, supaya pembaca dibawa pelan-pelan menuju topik utama.",
        "hl": [
          "umum ke yang khusus"
        ],
        "pause": 0.7
      },
      {
        "text": "Di bawah setiap subbab, tempelkan kartu catatan yang cocok.",
        "hl": [
          "kartu catatan"
        ],
        "pause": 0.7
      },
      {
        "text": "Dengan cara ini, setiap paragraf sudah punya bahan dan sumber sebelum kamu mulai menulis.",
        "hl": [
          "bahan dan sumber"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "paragraf",
    "chapter": "08",
    "title": "Membangun paragraf",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Paragraf yang baik membahas satu gagasan pokok.",
        "hl": [
          "satu gagasan pokok"
        ],
        "pause": 0.6
      },
      {
        "text": "Gagasan itu ditulis dalam kalimat utama, lalu didukung beberapa kalimat penjelas.",
        "hl": [
          "kalimat utama",
          "kalimat penjelas"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau kalimat utama ada di awal, polanya disebut deduktif. Pola ini paling sering dipakai di tulisan ilmiah.",
        "hl": [
          "deduktif"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau kalimat utama ada di akhir sebagai simpulan, polanya disebut induktif.",
        "hl": [
          "induktif"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau ada di awal lalu ditegaskan lagi di akhir, polanya disebut campuran.",
        "hl": [
          "campuran"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalimat penjelas bisa berisi definisi, contoh, data, atau sebab dan akibat.",
        "hl": [
          "definisi",
          "contoh",
          "data"
        ],
        "pause": 0.7
      },
      {
        "text": "Satu paragraf biasanya tiga sampai tujuh kalimat. Begitu masuk gagasan baru, buat paragraf baru.",
        "hl": [
          "paragraf baru"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "padu",
    "chapter": "09",
    "title": "Kalimat yang saling menyambung",
    "mood": "wonder",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Paragraf terasa mengalir kalau kalimat-kalimatnya saling menyambung.",
        "hl": [
          "saling menyambung"
        ],
        "pause": 0.6
      },
      {
        "text": "Ada tiga alat penyambung. Pertama, kata penghubung, seperti selain itu, oleh karena itu, dan dengan demikian.",
        "hl": [
          "kata penghubung"
        ],
        "pause": 0.7
      },
      {
        "text": "Kedua, mengulang kata kunci. Kalimat berikutnya menyebut lagi antosianin, atau menyebutnya senyawa tersebut.",
        "hl": [
          "kata kunci"
        ],
        "pause": 0.7
      },
      {
        "text": "Ketiga, urutan yang logis: definisi dulu, lalu ciri, lalu contoh.",
        "hl": [
          "urutan yang logis"
        ],
        "pause": 0.7
      },
      {
        "text": "Pilih kata penghubung yang umum dipakai mahasiswa. Kata yang terlalu tinggi tidak perlu.",
        "hl": [
          "umum dipakai"
        ],
        "pause": 0.7
      },
      {
        "text": "Penghubung juga tidak perlu ada di setiap kalimat. Kalau semua kalimat diawali penghubung, tulisan malah terasa dibuat-buat.",
        "hl": [
          "dibuat-buat"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "efektif",
    "chapter": "10",
    "title": "Kalimat efektif",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Kalimat efektif menyampaikan maksud penulis dengan tepat dan mudah dipahami.",
        "hl": [
          "tepat",
          "mudah dipahami"
        ],
        "pause": 0.7
      },
      {
        "text": "Cek dulu subjek dan predikatnya. Kalimat dalam hasil pengamatan menunjukkan perubahan warna tidak punya subjek.",
        "hl": [
          "subjek dan predikatnya"
        ],
        "pause": 0.7
      },
      {
        "text": "Buang kata dalam, sehingga hasil pengamatan menjadi subjeknya.",
        "hl": [
          "subjeknya"
        ],
        "pause": 0.7
      },
      {
        "text": "Hemat kata. Para mahasiswa-mahasiswa cukup ditulis para mahasiswa.",
        "hl": [
          "Hemat kata"
        ],
        "pause": 0.7
      },
      {
        "text": "Jaga kesejajaran. Kalau daftar memakai kata kerja, semua unsurnya kata kerja: menimbang, melarutkan, dan menyaring.",
        "hl": [
          "kesejajaran"
        ],
        "pause": 0.7
      },
      {
        "text": "Jangan terlalu dipadatkan. Satu kalimat yang memuat tiga gagasan lebih baik dipecah menjadi dua atau tiga kalimat.",
        "hl": [
          "dipecah"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "ejaan",
    "chapter": "11",
    "title": "Ejaan dan bahasa baku",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Pegangan ejaan bahasa Indonesia saat ini adalah EYD edisi kelima, yang terbit tahun dua ribu dua puluh dua.",
        "hl": [
          "EYD edisi kelima"
        ],
        "pause": 0.7,
        "tts": "Pegangan ejaan bahasa Indonesia saat ini adalah e ye de edisi kelima, yang terbit tahun dua ribu dua puluh dua."
      },
      {
        "text": "Kata depan di ditulis terpisah, seperti di laboratorium. Awalan di ditulis serangkai, seperti dipanaskan.",
        "hl": [
          "terpisah",
          "serangkai"
        ],
        "pause": 0.7
      },
      {
        "text": "Istilah asing yang belum diserap dicetak miring, misalnya buffer. Nama latin juga miring, seperti Brassica oleracea.",
        "hl": [
          "dicetak miring"
        ],
        "pause": 0.7,
        "tts": "Istilah asing yang belum diserap dicetak miring, misalnya bafer. Nama latin juga miring, seperti Brasika oleracea."
      },
      {
        "text": "Angka di awal kalimat ditulis dengan huruf.",
        "hl": [
          "ditulis dengan huruf"
        ],
        "pause": 0.6
      },
      {
        "text": "Hindari dimana sebagai kata penghubung. Gunakan yang atau tempat, sesuai maksudnya.",
        "hl": [
          "dimana"
        ],
        "pause": 0.7
      },
      {
        "text": "Cara kerja di laporan praktikum biasanya ditulis dalam kalimat pasif, seperti larutan dipanaskan selama lima menit.",
        "hl": [
          "kalimat pasif"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "alami",
    "chapter": "12",
    "title": "Menulis dengan wajar",
    "mood": "tension",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sekarang soal gaya. Banyak tulisan terasa kaku karena memakai pola yang sama berulang-ulang.",
        "hl": [
          "pola yang sama"
        ],
        "pause": 0.7
      },
      {
        "text": "Contohnya pola perbandingan seperti bukan ini melainkan itu, atau tidak hanya ini tetapi juga itu, hampir di setiap paragraf.",
        "hl": [
          "pola perbandingan"
        ],
        "pause": 0.7
      },
      {
        "text": "Ada juga frasa yang terlalu sering dipakai, seperti penting untuk dicatat, atau dengan kata lain.",
        "hl": [
          "terlalu sering"
        ],
        "pause": 0.7
      },
      {
        "text": "Cara memperbaikinya sederhana: tulis langsung intinya.",
        "hl": [
          "tulis langsung intinya"
        ],
        "pause": 0.7
      },
      {
        "text": "Ikuti istilah dan gaya bahasa jurnal Indonesia yang kamu kutip, karena itulah bahasa yang umum di bidangmu.",
        "hl": [
          "jurnal Indonesia"
        ],
        "pause": 0.7
      },
      {
        "text": "Lalu baca tulisanmu dengan suara keras. Kalimat yang membuatmu tersandung biasanya perlu ditulis ulang.",
        "hl": [
          "suara keras"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "kutip",
    "chapter": "13",
    "title": "Mengutip dan memparafrase",
    "mood": "build",
    "part": 4,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Ada dua cara memakai sumber: kutipan langsung dan parafrase.",
        "hl": [
          "kutipan langsung",
          "parafrase"
        ],
        "pause": 0.6
      },
      {
        "text": "Kutipan langsung menyalin kalimat persis, diberi tanda petik, dan menyebut halamannya. Pakai seperlunya saja.",
        "hl": [
          "tanda petik"
        ],
        "pause": 0.7
      },
      {
        "text": "Parafrase menulis ulang gagasan sumber dengan kalimatmu sendiri, tetap dengan sitasi.",
        "hl": [
          "tetap dengan sitasi"
        ],
        "pause": 0.7
      },
      {
        "text": "Caranya: baca sampai paham, tutup sumbernya, tulis dengan kalimatmu, lalu cocokkan lagi dengan aslinya.",
        "hl": [
          "tutup sumbernya"
        ],
        "pause": 0.7
      },
      {
        "text": "Pastikan maknanya tetap sama. Parafrase tidak boleh menambah klaim yang tidak ada di sumber.",
        "hl": [
          "maknanya tetap sama"
        ],
        "pause": 0.7
      },
      {
        "text": "Mengganti beberapa kata dari kalimat asli tanpa menyebut sumbernya tetap termasuk plagiarisme.",
        "hl": [
          "plagiarisme"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "apa",
    "chapter": "14",
    "title": "Sitasi dan daftar pustaka APA",
    "mood": "build",
    "part": 4,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Gaya sitasi yang banyak dipakai adalah APA edisi ketujuh.",
        "hl": [
          "APA edisi ketujuh"
        ],
        "pause": 0.6,
        "tts": "Gaya sitasi yang banyak dipakai adalah a pe a edisi ketujuh."
      },
      {
        "text": "Di dalam teks, tulis nama belakang penulis dan tahun terbitnya, misalnya Ayun et al., dua ribu dua puluh dua.",
        "hl": [
          "nama belakang penulis dan tahun"
        ],
        "pause": 0.7,
        "tts": "Di dalam teks, tulis nama belakang penulis dan tahun terbitnya, misalnya Ayun et al, dua ribu dua puluh dua."
      },
      {
        "text": "Penulis satu atau dua orang ditulis semua namanya. Tiga orang atau lebih cukup nama pertama lalu et al.",
        "hl": [
          "et al."
        ],
        "pause": 0.7,
        "tts": "Penulis satu atau dua orang ditulis semua namanya. Tiga orang atau lebih cukup nama pertama lalu et al."
      },
      {
        "text": "Di daftar pustaka, sumber diurutkan menurut abjad nama penulis.",
        "hl": [
          "abjad"
        ],
        "pause": 0.6
      },
      {
        "text": "Untuk jurnal: penulis, tahun, judul artikel, nama jurnal dan volume yang dicetak miring, nomor, halaman, lalu DOI.",
        "hl": [
          "jurnal"
        ],
        "pause": 0.7,
        "tts": "Untuk jurnal: penulis, tahun, judul artikel, nama jurnal dan volume yang dicetak miring, nomor, halaman, lalu de o i."
      },
      {
        "text": "Untuk buku: penulis, tahun, judul buku yang dicetak miring, edisi, lalu penerbit.",
        "hl": [
          "buku"
        ],
        "pause": 0.7
      },
      {
        "text": "Setiap sitasi di teks harus ada di daftar pustaka, dan sebaliknya.",
        "hl": [
          "dan sebaliknya"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "laporan",
    "chapter": "15",
    "title": "Merakit laporan praktikum",
    "mood": "bright",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sekarang semua bahan dirakit, mulai dari laporan praktikum.",
        "hl": [
          "laporan praktikum"
        ],
        "pause": 0.6
      },
      {
        "text": "Tujuan ditulis singkat sesuai panduan. Dasar teori berisi konsep yang dibutuhkan untuk menjelaskan hasil, lengkap dengan sitasi.",
        "hl": [
          "Dasar teori"
        ],
        "pause": 0.7
      },
      {
        "text": "Alat, bahan, dan cara kerja ditulis sesuai yang benar-benar dilakukan.",
        "hl": [
          "benar-benar dilakukan"
        ],
        "pause": 0.6
      },
      {
        "text": "Hasil pengamatan berisi data apa adanya, biasanya dalam tabel.",
        "hl": [
          "apa adanya"
        ],
        "pause": 0.6
      },
      {
        "text": "Pembahasan adalah bagian terpenting. Di sini kamu menjelaskan mengapa hasilnya begitu, lalu membandingkannya dengan teori.",
        "hl": [
          "Pembahasan"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau hasil berbeda dari teori, jelaskan kemungkinan penyebabnya dengan jujur.",
        "hl": [
          "dengan jujur"
        ],
        "pause": 0.7
      },
      {
        "text": "Simpulan menjawab tujuan satu per satu, tanpa menambah bahasan baru.",
        "hl": [
          "menjawab tujuan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "artikel",
    "chapter": "16",
    "title": "Artikel dan abstrak",
    "mood": "bright",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Artikel jurnal mengikuti pola IMRaD.",
        "hl": [
          "IMRaD"
        ],
        "pause": 0.6,
        "tts": "Artikel jurnal mengikuti pola imrad."
      },
      {
        "text": "Pendahuluan berangkat dari masalah, menunjukkan apa yang sudah diteliti, lalu menyebut celah dan tujuan penelitian.",
        "hl": [
          "Pendahuluan"
        ],
        "pause": 0.7
      },
      {
        "text": "Metode ditulis cukup rinci supaya orang lain bisa mengulang penelitianmu.",
        "hl": [
          "mengulang"
        ],
        "pause": 0.7
      },
      {
        "text": "Hasil menyajikan data, sedangkan pembahasan menafsirkan data itu dan mengaitkannya dengan penelitian lain.",
        "hl": [
          "Hasil",
          "pembahasan"
        ],
        "pause": 0.7
      },
      {
        "text": "Abstrak ditulis paling akhir, walaupun letaknya paling depan.",
        "hl": [
          "paling akhir"
        ],
        "pause": 0.7
      },
      {
        "text": "Isinya latar belakang, tujuan, metode, hasil utama, dan simpulan, biasanya dalam satu paragraf.",
        "hl": [
          "satu paragraf"
        ],
        "pause": 0.7
      },
      {
        "text": "Panjang abstrak dan formatnya mengikuti aturan penulis di jurnal tujuan.",
        "hl": [
          "aturan penulis"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "revisi",
    "chapter": "17",
    "title": "Revisi",
    "mood": "resolve",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Tulisan pertama adalah draf. Tulisan yang baik lahir saat revisi.",
        "hl": [
          "revisi"
        ],
        "pause": 0.7
      },
      {
        "text": "Diamkan drafmu sebentar, lalu baca lagi dengan mata pembaca.",
        "hl": [
          "mata pembaca"
        ],
        "pause": 0.7
      },
      {
        "text": "Periksa dari yang besar ke yang kecil: isi dan urutan dulu, lalu paragraf, lalu kalimat, terakhir ejaan.",
        "hl": [
          "besar ke yang kecil"
        ],
        "pause": 0.7
      },
      {
        "text": "Cocokkan setiap klaim dengan sumber dan nomor halamannya.",
        "hl": [
          "setiap klaim"
        ],
        "pause": 0.7
      },
      {
        "text": "Terakhir, periksa format: ukuran kertas, margin, huruf, spasi, dan penomoran, sesuai panduan.",
        "hl": [
          "format"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau bisa, minta teman membaca. Bagian yang membuatnya bingung adalah bagian yang perlu diperjelas.",
        "hl": [
          "perlu diperjelas"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "recap",
    "chapter": "18",
    "title": "Dari kepala ke kertas",
    "mood": "resolve",
    "lead": 1.0,
    "tail": 2.4,
    "lines": [
      {
        "text": "Mari kita rangkum perjalanannya.",
        "pause": 0.6
      },
      {
        "text": "Kenali jenis karya, lalu ubah topik menjadi pertanyaan.",
        "hl": [
          "pertanyaan"
        ],
        "pause": 0.6
      },
      {
        "text": "Cari sumber yang jelas, baca dengan tiga putaran, dan catat lengkap dengan halamannya.",
        "hl": [
          "tiga putaran"
        ],
        "pause": 0.6
      },
      {
        "text": "Susun kerangka, bangun paragraf dengan satu gagasan pokok, dan tulis kalimat yang efektif.",
        "hl": [
          "satu gagasan pokok"
        ],
        "pause": 0.6
      },
      {
        "text": "Kutip dengan jujur, lalu rakit dan revisi sampai tulisanmu enak dibaca.",
        "hl": [
          "Kutip dengan jujur"
        ],
        "pause": 0.8
      },
      {
        "text": "Halaman kosong tadi sekarang sudah punya jalan. Selamat menulis.",
        "hl": [
          "Selamat menulis"
        ],
        "pause": 1.2
      }
    ]
  },
  {
    "id": "outro",
    "chapter": "",
    "title": "Penutup",
    "mood": "outro",
    "fixed": 15,
    "lines": []
  }
];
