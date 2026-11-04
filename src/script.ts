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
    "id": "alur",
    "chapter": "04",
    "title": "Menulis itu bertahap",
    "mood": "build",
    "part": 1,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Menulis jadi lebih ringan kalau dibagi menjadi beberapa tahap.",
        "hl": [
          "beberapa tahap"
        ],
        "pause": 0.7
      },
      {
        "text": "Tahapnya: merencanakan, mencari dan membaca sumber, menulis draf, merevisi, lalu menyunting.",
        "hl": [
          "merencanakan",
          "menulis draf",
          "menyunting"
        ],
        "pause": 0.7
      },
      {
        "text": "Buat jadwal mundur dari tenggat. Misalnya tenggatnya hari Jumat, maka draf harus selesai hari Rabu supaya ada waktu untuk revisi.",
        "hl": [
          "jadwal mundur"
        ],
        "pause": 0.7
      },
      {
        "text": "Saat menulis draf, fokus pada isi dulu. Ejaan dan kerapian bisa diperbaiki belakangan.",
        "hl": [
          "isi dulu"
        ],
        "pause": 0.7
      },
      {
        "text": "Kamu juga tidak harus menulis berurutan. Mulailah dari bagian yang paling mudah, misalnya cara kerja atau hasil pengamatan.",
        "hl": [
          "paling mudah"
        ],
        "pause": 0.7
      },
      {
        "text": "Yang penting, setiap hari ada kemajuan, walaupun hanya satu paragraf.",
        "hl": [
          "setiap hari ada kemajuan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "cari",
    "chapter": "05",
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
    "id": "nilai",
    "chapter": "06",
    "title": "Menilai sumber",
    "mood": "tension",
    "part": 2,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Tidak semua yang terlihat seperti jurnal layak dikutip.",
        "hl": [
          "layak dikutip"
        ],
        "pause": 0.7
      },
      {
        "text": "Cek dulu apakah jurnalnya melakukan peer review, yaitu naskah ditelaah oleh ahli sebelum terbit.",
        "hl": [
          "peer review"
        ],
        "pause": 0.7,
        "tts": "Cek dulu apakah jurnalnya melakukan pir rivyu, yaitu naskah ditelaah oleh ahli sebelum terbit."
      },
      {
        "text": "Untuk jurnal Indonesia, cek juga apakah jurnal itu terdaftar di SINTA dan berapa peringkatnya.",
        "hl": [
          "SINTA"
        ],
        "pause": 0.7,
        "tts": "Untuk jurnal Indonesia, cek juga apakah jurnal itu terdaftar di Sinta dan berapa peringkatnya."
      },
      {
        "text": "Waspadai jurnal predator: menjanjikan terbit sangat cepat, meminta biaya tanpa proses telaah yang jelas, dan sering mengirim undangan lewat surel.",
        "hl": [
          "jurnal predator"
        ],
        "pause": 0.7
      },
      {
        "text": "Setelah itu, nilai isinya. Apakah relevan dengan pertanyaanmu, cukup baru, dan metodenya jelas?",
        "hl": [
          "relevan",
          "cukup baru",
          "metodenya jelas"
        ],
        "pause": 0.7
      },
      {
        "text": "Buku teks tetap sumber yang kuat untuk konsep dasar, walaupun terbitnya sudah agak lama.",
        "hl": [
          "Buku teks"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "baca",
    "chapter": "07",
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
    "chapter": "08",
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
    "id": "kelola",
    "chapter": "09",
    "title": "Mengelola referensi",
    "mood": "build",
    "part": 2,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Kalau sumbernya sudah banyak, menulis daftar pustaka secara manual mudah salah.",
        "hl": [
          "mudah salah"
        ],
        "pause": 0.7
      },
      {
        "text": "Gunakan pengelola referensi seperti Zotero atau Mendeley. Keduanya bisa dipakai gratis.",
        "hl": [
          "Zotero",
          "Mendeley"
        ],
        "pause": 0.7,
        "tts": "Gunakan pengelola referensi seperti Zotero atau Mendelei. Keduanya bisa dipakai gratis."
      },
      {
        "text": "Simpan artikel dengan sekali klik dari peramban, atau masukkan DOI-nya, lalu penulis, tahun, dan judulnya terisi otomatis.",
        "hl": [
          "sekali klik",
          "terisi otomatis"
        ],
        "pause": 0.7,
        "tts": "Simpan artikel dengan sekali klik dari peramban, atau masukkan de o i nya, lalu penulis, tahun, dan judulnya terisi otomatis."
      },
      {
        "text": "Di Word, sitasi bisa disisipkan langsung, dan daftar pustaka tersusun sendiri dengan gaya APA.",
        "hl": [
          "tersusun sendiri"
        ],
        "pause": 0.7,
        "tts": "Di Word, sitasi bisa disisipkan langsung, dan daftar pustaka tersusun sendiri dengan gaya a pe a."
      },
      {
        "text": "Tetap periksa hasilnya. Data otomatis kadang salah, misalnya nama penulis atau huruf kapital pada judul.",
        "hl": [
          "Tetap periksa"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "kerangka",
    "chapter": "10",
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
    "id": "judul",
    "chapter": "11",
    "title": "Menyusun judul",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Judul adalah bagian yang pertama kali dibaca, jadi buat ringkas dan jelas.",
        "hl": [
          "ringkas dan jelas"
        ],
        "pause": 0.7
      },
      {
        "text": "Judul yang baik memuat kata kunci utama: apa yang diteliti, dan kalau perlu, pada objek apa.",
        "hl": [
          "kata kunci utama"
        ],
        "pause": 0.7
      },
      {
        "text": "Bandingkan dua judul ini. Judul pertama, studi tentang warna, masih terlalu umum.",
        "hl": [
          "terlalu umum"
        ],
        "pause": 0.7
      },
      {
        "text": "Judul kedua, perubahan warna ekstrak kubis ungu sebagai indikator asam basa alami, langsung menunjukkan isinya.",
        "hl": [
          "langsung menunjukkan isinya"
        ],
        "pause": 0.7
      },
      {
        "text": "Hindari singkatan yang tidak umum dan kata yang tidak perlu, seperti suatu studi tentang.",
        "hl": [
          "kata yang tidak perlu"
        ],
        "pause": 0.7
      },
      {
        "text": "Panjang judul mengikuti aturan dari dosen atau jurnal tujuan.",
        "hl": [
          "aturan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "paragraf",
    "chapter": "12",
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
    "id": "sintesis",
    "chapter": "13",
    "title": "Menggabungkan beberapa sumber",
    "mood": "wonder",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Dasar teori yang hanya berisi ringkasan sumber satu per satu terasa seperti tumpukan catatan.",
        "hl": [
          "tumpukan catatan"
        ],
        "pause": 0.7
      },
      {
        "text": "Cara yang lebih baik adalah sintesis, yaitu menggabungkan beberapa sumber yang membahas gagasan yang sama ke dalam satu paragraf.",
        "hl": [
          "sintesis"
        ],
        "pause": 0.7
      },
      {
        "text": "Gunakan matriks sumber tadi. Lihat kolom antosianin, lalu kumpulkan semua sumber yang membahasnya.",
        "hl": [
          "matriks sumber"
        ],
        "pause": 0.7
      },
      {
        "text": "Tulis gagasan utamanya, lalu cantumkan beberapa sumber sekaligus dalam satu sitasi, dipisah titik koma.",
        "hl": [
          "beberapa sumber sekaligus"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau sumber saling melengkapi, tulis bahwa sumber lain menambahkan atau mendukung. Kalau hasilnya berbeda, sebutkan perbedaannya.",
        "hl": [
          "saling melengkapi",
          "berbeda"
        ],
        "pause": 0.7
      },
      {
        "text": "Cara ini juga melatih membaca kritis: memperhatikan klaim, bukti yang mendukungnya, dan batasannya.",
        "hl": [
          "membaca kritis"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "padu",
    "chapter": "14",
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
    "chapter": "15",
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
    "id": "baku",
    "chapter": "16",
    "title": "Kata baku",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Tulisan ilmiah memakai kata baku. Banyak kata yang sering salah tulis karena terbawa kebiasaan.",
        "hl": [
          "kata baku"
        ],
        "pause": 0.7
      },
      {
        "text": "Contohnya, analisa yang baku adalah analisis, dan praktek yang baku adalah praktik.",
        "hl": [
          "analisis",
          "praktik"
        ],
        "pause": 0.7
      },
      {
        "text": "Hipotesa menjadi hipotesis, resiko menjadi risiko, dan sistim menjadi sistem.",
        "hl": [
          "hipotesis",
          "risiko",
          "sistem"
        ],
        "pause": 0.7
      },
      {
        "text": "Hindari juga kata percakapan seperti nggak, banget, atau gimana.",
        "hl": [
          "percakapan"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau ragu, cek di KBBI daring. Bentuk baku dan tidak baku dicantumkan di sana.",
        "hl": [
          "KBBI daring"
        ],
        "pause": 0.7,
        "tts": "Kalau ragu, cek di ka be be i daring. Bentuk baku dan tidak baku dicantumkan di sana."
      },
      {
        "text": "Kata ganti saya, kita, atau kami juga sebaiknya dihindari di laporan. Gunakan kalimat pasif, atau sebut objeknya langsung.",
        "hl": [
          "kalimat pasif"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "ejaan",
    "chapter": "17",
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
    "id": "tanda",
    "chapter": "18",
    "title": "Tanda baca",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Tanda baca yang tepat membuat kalimat lebih jelas.",
        "hl": [
          "lebih jelas"
        ],
        "pause": 0.6
      },
      {
        "text": "Koma dipakai sebelum kata penghubung tetapi, melainkan, dan sedangkan.",
        "hl": [
          "sebelum"
        ],
        "pause": 0.7
      },
      {
        "text": "Koma juga dipakai setelah penghubung antarkalimat di awal kalimat, seperti oleh karena itu, dan dengan demikian.",
        "hl": [
          "setelah"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau anak kalimat mendahului induk kalimat, beri koma di antaranya. Contohnya, karena larutannya asam, warnanya menjadi merah.",
        "hl": [
          "anak kalimat"
        ],
        "pause": 0.7
      },
      {
        "text": "Titik dua dipakai sebelum rincian, dan tidak dipakai kalau rincian itu melengkapi kalimat, misalnya sesudah kata adalah.",
        "hl": [
          "Titik dua"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalimat yang dipenuhi banyak koma biasanya perlu dipecah menjadi beberapa kalimat.",
        "hl": [
          "dipecah"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "angka",
    "chapter": "19",
    "title": "Angka, satuan, dan rumus",
    "mood": "build",
    "part": 3,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Di laporan kimia, angka dan satuan muncul di mana-mana, jadi tulis dengan konsisten.",
        "hl": [
          "konsisten"
        ],
        "pause": 0.7
      },
      {
        "text": "Bahasa Indonesia memakai koma untuk desimal, misalnya nol koma satu molar, dan titik untuk ribuan.",
        "hl": [
          "koma untuk desimal"
        ],
        "pause": 0.7
      },
      {
        "text": "Beri spasi antara angka dan satuan, misalnya lima mililiter, dan pakai satuan resmi seperti mililiter, gram, dan derajat Celsius.",
        "hl": [
          "spasi"
        ],
        "pause": 0.7,
        "tts": "Beri spasi antara angka dan satuan, misalnya lima mililiter, dan pakai satuan resmi seperti mililiter, gram, dan derajat Selsius."
      },
      {
        "text": "Rumus kimia ditulis dengan subskrip yang benar, misalnya H dua O, dan persamaan reaksi diberi wujud zat.",
        "hl": [
          "subskrip"
        ],
        "pause": 0.7,
        "tts": "Rumus kimia ditulis dengan subskrip yang benar, misalnya ha dua o, dan persamaan reaksi diberi wujud zat."
      },
      {
        "text": "Simbol besaran dicetak miring, misalnya t untuk waktu, sedangkan satuannya ditulis tegak.",
        "hl": [
          "dicetak miring"
        ],
        "pause": 0.7,
        "tts": "Simbol besaran dicetak miring, misalnya te untuk waktu, sedangkan satuannya ditulis tegak."
      },
      {
        "text": "Bilangan yang bisa ditulis dengan satu atau dua kata ditulis dengan huruf, kecuali bila diikuti satuan atau berupa data.",
        "hl": [
          "satu atau dua kata"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "alami",
    "chapter": "20",
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
    "chapter": "21",
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
    "id": "khusus",
    "chapter": "22",
    "title": "Kutipan panjang dan sumber sekunder",
    "mood": "build",
    "part": 4,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Ada beberapa kasus khusus dalam mengutip.",
        "pause": 0.5
      },
      {
        "text": "Kutipan langsung yang panjangnya empat puluh kata atau lebih ditulis sebagai blok terpisah, menjorok, tanpa tanda petik.",
        "hl": [
          "empat puluh kata"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau kamu membaca gagasan seorang tokoh dari buku orang lain, itu sumber sekunder. Contohnya teori Arrhenius yang kamu baca dari buku Overby dan Chang.",
        "hl": [
          "sumber sekunder"
        ],
        "pause": 0.7,
        "tts": "Kalau kamu membaca gagasan seorang tokoh dari buku orang lain, itu sumber sekunder. Contohnya teori Arenius yang kamu baca dari buku Overbi dan Cang."
      },
      {
        "text": "Di daftar pustaka, cukup tulis sumber yang benar-benar kamu baca. Kalau bisa, cari juga sumber aslinya.",
        "hl": [
          "benar-benar kamu baca"
        ],
        "pause": 0.7
      },
      {
        "text": "Untuk parafrase, ada tiga teknik yang bisa digabung: ubah struktur kalimat, pakai padanan kata, lalu gabungkan atau pecah kalimatnya.",
        "hl": [
          "tiga teknik"
        ],
        "pause": 0.7
      },
      {
        "text": "Ingat, ketiganya tetap butuh sitasi.",
        "hl": [
          "tetap butuh sitasi"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "apa",
    "chapter": "23",
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
    "id": "etika",
    "chapter": "24",
    "title": "Cek kemiripan dan etika AI",
    "mood": "tension",
    "part": 4,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Banyak kampus memeriksa naskah dengan perangkat pengecek kemiripan, misalnya Turnitin.",
        "hl": [
          "Turnitin"
        ],
        "pause": 0.7,
        "tts": "Banyak kampus memeriksa naskah dengan perangkat pengecek kemiripan, misalnya Tarnitin."
      },
      {
        "text": "Angka kemiripan perlu dibaca dengan teliti, karena kutipan yang benar dan daftar pustaka juga ikut terhitung.",
        "hl": [
          "dibaca dengan teliti"
        ],
        "pause": 0.7
      },
      {
        "text": "Batas yang diizinkan ditentukan oleh kampus atau jurnal, jadi tanyakan aturannya.",
        "hl": [
          "ditentukan"
        ],
        "pause": 0.7
      },
      {
        "text": "Sekarang soal kecerdasan buatan. Aturan pemakaiannya berbeda di setiap kampus dan mata kuliah, jadi baca tata tertibnya dulu.",
        "hl": [
          "tata tertibnya"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau diizinkan, pakai sebagai alat bantu, misalnya untuk mencari ide atau memeriksa ejaan.",
        "hl": [
          "alat bantu"
        ],
        "pause": 0.7
      },
      {
        "text": "Kecerdasan buatan bisa mengarang sumber yang tidak ada, jadi setiap sitasi harus kamu buka dan cek sendiri.",
        "hl": [
          "mengarang sumber"
        ],
        "pause": 0.7
      },
      {
        "text": "Pada akhirnya, kamu yang bertanggung jawab atas setiap kalimat yang kamu kumpulkan.",
        "hl": [
          "bertanggung jawab"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "laporan",
    "chapter": "25",
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
    "id": "hipotesis",
    "chapter": "26",
    "title": "Hipotesis di laporan sementara",
    "mood": "build",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sebelum praktikum, biasanya ada laporan sementara yang memuat hipotesis.",
        "hl": [
          "hipotesis"
        ],
        "pause": 0.7
      },
      {
        "text": "Hipotesis adalah dugaan sementara tentang hasil percobaan yang disusun berdasarkan teori.",
        "hl": [
          "dugaan sementara"
        ],
        "pause": 0.7
      },
      {
        "text": "Polanya sederhana: apa yang diduga terjadi, lalu alasannya, lalu sitasi.",
        "hl": [
          "alasannya"
        ],
        "pause": 0.7
      },
      {
        "text": "Contohnya, ekstrak kubis ungu diduga berwarna merah dalam larutan asam kuat, karena struktur antosianin berubah mengikuti pH.",
        "hl": [
          "diduga"
        ],
        "pause": 0.7,
        "tts": "Contohnya, ekstrak kubis ungu diduga berwarna merah dalam larutan asam kuat, karena struktur antosianin berubah mengikuti pe ha."
      },
      {
        "text": "Pakai kata diduga, karena hasilnya belum diamati.",
        "hl": [
          "belum diamati"
        ],
        "pause": 0.7
      },
      {
        "text": "Setelah praktikum, hipotesis dibandingkan dengan hasil di bagian pembahasan.",
        "hl": [
          "dibandingkan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "tabel",
    "chapter": "27",
    "title": "Tabel dan gambar",
    "mood": "build",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Data yang banyak lebih mudah dibaca dalam tabel atau gambar.",
        "hl": [
          "tabel atau gambar"
        ],
        "pause": 0.6
      },
      {
        "text": "Setiap tabel dan gambar diberi nomor dan judul, misalnya Tabel 1 atau Gambar 1.",
        "hl": [
          "nomor dan judul"
        ],
        "pause": 0.7
      },
      {
        "text": "Pada umumnya, judul tabel diletakkan di atas tabel, sedangkan keterangan gambar diletakkan di bawah gambar. Ikuti panduan yang berlaku.",
        "hl": [
          "di atas",
          "di bawah"
        ],
        "pause": 0.7
      },
      {
        "text": "Kalau tabel atau gambar diambil dari sumber lain, tulis sumbernya di bawahnya.",
        "hl": [
          "sumbernya"
        ],
        "pause": 0.7
      },
      {
        "text": "Setiap tabel dan gambar harus disebut di dalam teks, misalnya seperti yang ditunjukkan pada Tabel 1.",
        "hl": [
          "disebut di dalam teks"
        ],
        "pause": 0.7
      },
      {
        "text": "Tabel juga perlu dijelaskan. Tulis di paragraf apa yang penting dari tabel itu.",
        "hl": [
          "dijelaskan"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "bahas",
    "chapter": "28",
    "title": "Menulis pembahasan",
    "mood": "wonder",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Pembahasan sering terasa paling sulit, jadi pakai pola yang tetap.",
        "hl": [
          "pola yang tetap"
        ],
        "pause": 0.6
      },
      {
        "text": "Pertama, nyatakan hasilnya. Misalnya, ekstrak kubis ungu berwarna merah dalam larutan HCl.",
        "hl": [
          "nyatakan hasilnya"
        ],
        "pause": 0.7,
        "tts": "Pertama, nyatakan hasilnya. Misalnya, ekstrak kubis ungu berwarna merah dalam larutan ha ce el."
      },
      {
        "text": "Kedua, jelaskan mengapa dengan teori dan sitasi, misalnya karena struktur antosianin berubah mengikuti pH larutan.",
        "hl": [
          "jelaskan mengapa"
        ],
        "pause": 0.7,
        "tts": "Kedua, jelaskan mengapa dengan teori dan sitasi, misalnya karena struktur antosianin berubah mengikuti pe ha larutan."
      },
      {
        "text": "Ketiga, bandingkan dengan hipotesis atau penelitian lain, apakah sesuai atau berbeda.",
        "hl": [
          "bandingkan"
        ],
        "pause": 0.7
      },
      {
        "text": "Keempat, kalau ada penyimpangan, jelaskan kemungkinan penyebabnya.",
        "hl": [
          "penyimpangan"
        ],
        "pause": 0.7
      },
      {
        "text": "Ulangi pola ini untuk setiap hasil, sampai semua tujuan terjawab.",
        "hl": [
          "setiap hasil"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "simpulan",
    "chapter": "29",
    "title": "Simpulan dan saran",
    "mood": "resolve",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Simpulan adalah jawaban singkat atas tujuan.",
        "hl": [
          "jawaban singkat"
        ],
        "pause": 0.6
      },
      {
        "text": "Kalau tujuannya ada dua, simpulannya juga dua, dengan urutan yang sama.",
        "hl": [
          "urutan yang sama"
        ],
        "pause": 0.7
      },
      {
        "text": "Simpulan biasanya ditulis tanpa sitasi dan tanpa penjelasan panjang, karena penjelasannya sudah ada di pembahasan.",
        "hl": [
          "tanpa sitasi"
        ],
        "pause": 0.7
      },
      {
        "text": "Saran berisi masukan yang muncul dari kegiatanmu, misalnya cara memperbaiki percobaan berikutnya.",
        "hl": [
          "Saran"
        ],
        "pause": 0.7
      },
      {
        "text": "Saran yang baik bisa dilakukan, misalnya memakai pH meter supaya warna bisa dikaitkan dengan nilai pH yang tepat.",
        "hl": [
          "bisa dilakukan"
        ],
        "pause": 1.0,
        "tts": "Saran yang baik bisa dilakukan, misalnya memakai pe ha meter supaya warna bisa dikaitkan dengan nilai pe ha yang tepat."
      }
    ]
  },
  {
    "id": "artikel",
    "chapter": "30",
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
    "id": "makalah",
    "chapter": "31",
    "title": "Makalah dan esai lomba",
    "mood": "bright",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Makalah membahas satu topik dari berbagai sumber.",
        "hl": [
          "Makalah"
        ],
        "pause": 0.6
      },
      {
        "text": "Pendahuluannya berisi latar belakang, rumusan masalah, dan tujuan penulisan.",
        "hl": [
          "latar belakang",
          "rumusan masalah"
        ],
        "pause": 0.7
      },
      {
        "text": "Latar belakang disusun seperti piramida terbalik: dari keadaan umum, ke masalah, lalu ke alasan topik ini penting dibahas.",
        "hl": [
          "piramida terbalik"
        ],
        "pause": 0.7
      },
      {
        "text": "Pembahasan menjawab rumusan masalah satu per satu, dan penutup berisi simpulan.",
        "hl": [
          "satu per satu"
        ],
        "pause": 0.7
      },
      {
        "text": "Karya tulis untuk lomba menambahkan gagasan: apa solusinya, apa kebaruannya, dan bagaimana cara menerapkannya.",
        "hl": [
          "kebaruannya"
        ],
        "pause": 0.7
      },
      {
        "text": "Juri biasanya menilai kejelasan masalah, kekuatan data dan sumber, serta apakah gagasan itu masuk akal untuk diterapkan.",
        "hl": [
          "masuk akal"
        ],
        "pause": 1.0
      }
    ]
  },
  {
    "id": "word",
    "chapter": "32",
    "title": "Merapikan di Word",
    "mood": "build",
    "part": 5,
    "lead": 1.2,
    "tail": 1.4,
    "lines": [
      {
        "text": "Sekarang rapikan dokumenmu di Word dengan fitur yang tepat.",
        "hl": [
          "fitur yang tepat"
        ],
        "pause": 0.6
      },
      {
        "text": "Atur ukuran kertas, margin, huruf, dan spasi sejak awal, sesuai panduan.",
        "hl": [
          "sejak awal"
        ],
        "pause": 0.7
      },
      {
        "text": "Pakai Styles, misalnya Heading 1 dan Heading 2, untuk judul bab dan subbab. Daftar isi bisa dibuat otomatis dari situ.",
        "hl": [
          "Styles"
        ],
        "pause": 0.7,
        "tts": "Pakai Stails, misalnya Heding wan dan Heding tu, untuk judul bab dan subbab. Daftar isi bisa dibuat otomatis dari situ."
      },
      {
        "text": "Pakai Insert Caption untuk nomor tabel dan gambar, supaya nomornya urut sendiri.",
        "hl": [
          "Insert Caption"
        ],
        "pause": 0.7,
        "tts": "Pakai Insert Kepsyen untuk nomor tabel dan gambar, supaya nomornya urut sendiri."
      },
      {
        "text": "Kalau halaman awal memakai angka romawi dan isi memakai angka biasa, pisahkan dengan Section Break.",
        "hl": [
          "Section Break"
        ],
        "pause": 0.7,
        "tts": "Kalau halaman awal memakai angka romawi dan isi memakai angka biasa, pisahkan dengan Seksyen Breik."
      },
      {
        "text": "Terakhir, simpan juga sebagai PDF supaya tampilannya tidak berubah saat dibuka di perangkat lain.",
        "hl": [
          "PDF"
        ],
        "pause": 1.0,
        "tts": "Terakhir, simpan juga sebagai pe de ef supaya tampilannya tidak berubah saat dibuka di perangkat lain."
      }
    ]
  },
  {
    "id": "revisi",
    "chapter": "33",
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
    "chapter": "34",
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
