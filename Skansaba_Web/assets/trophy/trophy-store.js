(function () {
  'use strict';

  const STORAGE_KEY = 'skansaba-trophy-collection-v1';

  const DEFAULTS = [
    { id: 1, title: 'Lomba Kompetensi Siswa (LKS) Web Technologies', level: 'Nasional', ranking: 'Juara 1', date: '2026-07-20', prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp5.000.000', description: 'Siswa SMKN 1 Bantul berhasil meraih Medali Emas dalam bidang Web Technologies tingkat Nasional.', participants: [{ name: 'Andi Pratama', role: 'Kontestan Web Technologies' }], image: 'https://smkn1bantul.sch.id/storage/01JA6ZZTT0H12Q4NZRXBZ9E8EC.PNG' },
    { id: 2, title: 'National Robotics & IoT Innovation Contest', level: 'Nasional', ranking: 'Juara 2', date: '2026-06-15', prize: 'Piala, Sertifikat, dan Beasiswa Pendidikan', description: 'Tim Robotika SMKN 1 Bantul menampilkan karya inovasi prototipe otomasi industri ramah lingkungan.', participants: [{ name: 'Bima Sakti', role: 'Ketua Tim Robotika' }, { name: 'Citra Lestari', role: 'Programmer IoT' }], image: 'https://smkn1bantul.sch.id/storage/01JA702A89MSW043CNGVR85V2S.PNG' },
    { id: 3, title: 'International Youth IT Competition', level: 'Internasional', ranking: 'Medali Perunggu', date: '2026-03-10', prize: 'Medali Perunggu dan Sertifikat Internasional', description: 'Tim aplikasi mobile SMKN 1 Bantul mewakili Indonesia dalam kompetisi IT tingkat internasional.', participants: [{ name: 'Dewi Anggraini', role: 'Project Manager' }, { name: 'Eko Prasetyo', role: 'Mobile Developer' }], image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80' },
    { id: 4, title: 'LKS Accounting Software Tingkat Provinsi', level: 'Provinsi', ranking: 'Juara 1', date: '2025-11-08', prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp2.500.000', description: 'Siswa jurusan Akuntansi dan Keuangan Lembaga meraih juara pertama tingkat provinsi DIY.', participants: [{ name: 'Gita Maharani', role: 'Kontestan Accounting Software' }], image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80' },
    { id: 5, title: 'Kompetisi English Speech Contest', level: 'Kabupaten', ranking: 'Juara 1', date: '2026-01-22', prize: 'Trophy, Sertifikat, dan Paket Buku Bahasa Inggris', description: 'Siswi SMKN 1 Bantul menjadi yang terbaik dalam kompetisi pidato Bahasa Inggris tingkat Kabupaten Bantul.', participants: [{ name: 'Hana Safira', role: 'Kontestan English Speech' }], image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80' },
    { id: 6, title: 'Festival Lomba Seni Siswa Nasional (FLS2N) Desain Grafis', level: 'Nasional', ranking: 'Juara Harapan 1', date: '2025-04-18', prize: 'Sertifikat Nasional dan Voucher Peralatan Desain', description: 'Karya desain poster digital siswa DKV SMKN 1 Bantul masuk dalam nominasi terbaik ajang FLS2N tingkat nasional.', participants: [{ name: 'Ilham Ramadhan', role: 'Desainer Grafis' }], image: 'https://images.unsplash.com/photo-1567093321257-8a6d5de18fd4?auto=format&fit=crop&w=900&q=80' },
    { id: 7, title: 'LKS Cloud Computing Tingkat Provinsi', level: 'Provinsi', ranking: 'Juara 2', date: '2024-10-30', prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp1.500.000', description: 'Tim RPL meraih juara kedua kompetisi cloud computing tingkat provinsi.', participants: [{ name: 'Joko Susilo', role: 'Kontestan Cloud Computing' }, { name: 'Kartika Sari', role: 'Cadangan' }], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80' },
    { id: 8, title: 'Lomba Cerdas Cermat Pramuka Tingkat Kabupaten', level: 'Kabupaten', ranking: 'Juara 1', date: '2026-02-05', prize: 'Trophy Bergilir, Sertifikat, dan Uang Pembinaan', description: 'Regu Pramuka SMKN 1 Bantul menjadi juara umum Lomba Cerdas Cermat tingkat Kabupaten Bantul.', participants: [{ name: 'Laila Rahmawati', role: 'Ketua Regu' }, { name: 'Muhammad Rizki', role: 'Anggota' }], image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80' },
    { id: 9, title: 'POPDA Futsal Pelajar Tingkat Provinsi', level: 'Provinsi', ranking: 'Juara 1', date: '2025-09-12', prize: 'Piala, Medali Emas, dan Sertifikat', description: 'Tim futsal putra SMKN 1 Bantul berhasil menjadi juara POPDA tingkat Provinsi DIY.', participants: [{ name: 'Oscar Yudha', role: 'Kapten Tim' }, { name: 'Panji Wirawan', role: 'Kiper' }], image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80' }
  ];

  const clone = value => JSON.parse(JSON.stringify(value));
  function getAll() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : clone(DEFAULTS);
    } catch (_) {
      return clone(DEFAULTS);
    }
  }
  function save(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
  function reset() { localStorage.removeItem(STORAGE_KEY); }

  window.TrophyStore = { getAll, save, reset, defaults: () => clone(DEFAULTS) };
})();
