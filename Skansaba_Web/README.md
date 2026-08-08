# Website SMK Negeri 1 Bantul

Proyek ini adalah website statis. Jalankan dari `index.html` di folder utama proyek agar seluruh navigasi dan halaman dapat dimuat dengan benar.

## Struktur folder

```text
.
├── index.html                 # Titik masuk aplikasi
├── assets/
│   ├── navigation/            # Shell navigasi, CSS, dan logika perpindahan halaman
│   └── chatbot/               # Chatbot dan basis pengetahuannya
└── pages/
    ├── home/                  # Halaman beranda
    ├── join-us/               # Halaman pendaftaran/guru
    ├── rooms/                 # Halaman ruangan
    ├── profile/               # Informasi profil sekolah
    ├── information/           # Berita, prestasi, unduhan, dan SPMB
    ├── study-programs/        # Seluruh program keahlian
    └── other/                 # Ekstrakurikuler dan organisasi siswa
```

## Menjalankan proyek

Gunakan ekstensi **Live Server** di VS Code atau server statis lain, lalu buka `index.html` dari folder utama proyek. Jangan menjalankan file halaman di dalam `pages/` secara langsung karena halaman-halaman tersebut dimuat oleh navigasi utama.
