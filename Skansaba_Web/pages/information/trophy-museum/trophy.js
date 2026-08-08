document.addEventListener('DOMContentLoaded', () => {
  initTrophyPage();
});

const LEVEL_RANK = {
  'Internasional': 4,
  'Nasional': 3,
  'Provinsi': 2,
  'Kabupaten': 1
};

const LEVEL_ICON = {
  'Internasional': 'fa-earth-asia',
  'Nasional': 'fa-flag',
  'Provinsi': 'fa-map-location-dot',
  'Kabupaten': 'fa-city'
};

const TROPHY_DATA = [
  {
    id: 1,
    title: 'Lomba Kompetensi Siswa (LKS) Web Technologies',
    level: 'Nasional',
    ranking: 'Juara 1 (Medali Emas)',
    date: '2026-07-20',
    prize: 'Piala Emas, Sertifikat Kemenristek & Uang Pembinaan Rp5.000.000',
    description: 'Siswa SMKN 1 Bantul berhasil meraih Medali Emas dalam bidang Web Technologies tingkat Nasional XXXIV. Capaian ini diraih setelah menjuarai seleksi ketat tingkat Kabupaten Bantul hingga Provinsi DIY.',
    participants: [
      { name: 'Andi Pratama', role: 'Kontestan Web Development' },
      { name: 'Budi Santoso, S.Kom', role: 'Guru Pembimbing' }
    ],
    image: 'https://smkn1bantul.sch.id/storage/01JA6ZZTT0H12Q4NZRXBZ9E8EC.PNG'
  },
  {
    id: 2,
    title: 'International Youth Cyber Security & Hackathon',
    level: 'Internasional',
    ranking: 'Juara 2 (Medali Perak)',
    date: '2026-05-14',
    prize: 'Piala Kristal, Medali Perak, Sertifikat Internasional & Hadiah $1.500',
    description: 'Dimenangkan pada ajang International Youth Cyber Security & Hackathon di Singapura. Tim SMKN 1 Bantul berhasil merancang sistem pertahanan siber otomatis berbasis AI untuk pengamanan IoT.',
    participants: [
      { name: 'Rian Hidayat', role: 'Leader & Security Analyst' },
      { name: 'Siti Nurhaliza', role: 'System Architect' },
      { name: 'Drs. H. M. Fauzi', role: 'Pembimbing Utama' }
    ],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'National Robotics & IoT Innovation Contest',
    level: 'Nasional',
    ranking: 'Juara 2',
    date: '2026-06-15',
    prize: 'Piala Perak, Sertifikat Nasional & Beasiswa Pendidikan',
    description: 'Dimenangkan pada National Robotics & IoT Innovation Contest. Tim Robotika SMKN 1 Bantul menampilkan karya inovasi prototipe otomasi industri ramah lingkungan yang memukau juri nasional.',
    participants: [
      { name: 'Bima Sakti', role: 'Ketua Tim Hardware' },
      { name: 'Citra Lestari', role: 'Programmer Embedded System' }
    ],
    image: 'https://smkn1bantul.sch.id/storage/01JA702A89MSW043CNGVR85V2S.PNG'
  },
  {
    id: 4,
    title: 'International Youth IT & App Challenge',
    level: 'Internasional',
    ranking: 'Medali Perunggu (Juara 3)',
    date: '2026-03-10',
    prize: 'Medali Perunggu, Certificate of Excellence & Trophy Internasional',
    description: 'Dimenangkan pada International Youth IT & App Challenge. Tim aplikasi mobile SMKN 1 Bantul mewakili Indonesia dan sukses membawa pulang medali perunggu.',
    participants: [
      { name: 'Dewi Anggraini', role: 'Project Manager' },
      { name: 'Eko Prasetyo', role: 'Mobile Developer' },
      { name: 'Fajar Nugroho', role: 'UI/UX Designer' }
    ],
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    title: 'LKS Accounting Software Tingkat Provinsi',
    level: 'Provinsi',
    ranking: 'Juara 1',
    date: '2025-11-08',
    prize: 'Piala Gubernur DIY, Sertifikat & Uang Pembinaan Rp3.000.000',
    description: 'Dimenangkan pada LKS Software Akuntansi Tingkat Provinsi DIY. Siswi jurusan Akuntansi dan Keuangan Lembaga meraih nilai tertinggi dalam simulasi pengolahan data akuntansi akurat.',
    participants: [
      { name: 'Gita Maharani', role: 'Kontestan Accounting Software' },
      { name: 'Sri Wahyuni, S.E.', role: 'Pembimbing Akuntansi' }
    ],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    title: 'Kompetisi English Speech Contest Pelajar',
    level: 'Kabupaten',
    ranking: 'Juara 1',
    date: '2026-01-22',
    prize: 'Trophy Bupati, Sertifikat & Beasiswa Bahasa Inggris',
    description: 'Dimenangkan pada Kompetisi English Speech Contest Tingkat Kabupaten Bantul. Siswi SMKN 1 Bantul tampil mengagumkan membawakan pidato bertema Literasi Digital.',
    participants: [
      { name: 'Hana Safira', role: 'Kontestan English Speech' }
    ],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    title: 'Festival Lomba Seni Siswa Nasional (FLS2N) Desain Grafis',
    level: 'Nasional',
    ranking: 'Juara Harapan 1',
    date: '2025-04-18',
    prize: 'Plakat Nasional, Sertifikat Kemenbud & Pen Tablet Wacom',
    description: 'Dimenangkan pada FLS2N Tingkat Nasional Bidang Desain Poster & Ilustrasi Digital. Karya seni visual kreatif siswa DKV SMKN 1 Bantul masuk nominasi poster terbaik nasional.',
    participants: [
      { name: 'Ilham Ramadhan', role: 'Desainer Grafis' }
    ],
    image: 'https://images.unsplash.com/photo-1567093321257-8a6d5de18fd4?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    title: 'LKS Cloud Computing Tingkat Provinsi',
    level: 'Provinsi',
    ranking: 'Juara 2',
    date: '2024-10-30',
    prize: 'Piala, Sertifikat Disdikpora & Uang Pembinaan Rp2.000.000',
    description: 'Dimenangkan pada LKS Cloud Computing & AWS Architecture Tingkat Provinsi. Tim RPL meraih posisi kedua dan melaju mewakili DIY di babak nasional.',
    participants: [
      { name: 'Joko Susilo', role: 'Kontestan Cloud Architect' },
      { name: 'Kartika Sari', role: 'Cadangan / Support' }
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    title: 'Lomba Cerdas Cermat Pramuka & Kedisiplinan',
    level: 'Kabupaten',
    ranking: 'Juara 1 (Juara Umum)',
    date: '2026-02-05',
    prize: 'Trophy Bergilir Bupati, Sertifikat & Uang Pembinaan Rp1.500.000',
    description: 'Dimenangkan pada Lomba Cerdas Cermat Pramuka Tingkat Kabupaten Bantul. Regu SMKN 1 Bantul unggul di bidang wawasan kebangsaan dan ketangkasan kepramukaan.',
    participants: [
      { name: 'Laila Rahmawati', role: 'Ketua Regu' },
      { name: 'Muhammad Rizki', role: 'Anggota' },
      { name: 'Nanda Putri', role: 'Anggota' }
    ],
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    title: 'POPDA Futsal Pelajar Tingkat Provinsi',
    level: 'Provinsi',
    ranking: 'Juara 1',
    date: '2025-09-12',
    prize: 'Piala Utama, Medali Emas, Sertifikat & Uang Pembinaan Rp4.000.000',
    description: 'Dimenangkan pada Pekan Olahraga Pelajar Daerah (POPDA) Futsal Putra Tingkat Provinsi DIY. Tim futsal SMKN 1 Bantul meraih kemenangan dramatis di babak final.',
    participants: [
      { name: 'Oscar Yudha', role: 'Kapten Tim' },
      { name: 'Panji Wirawan', role: 'Kiper Utama' },
      { name: 'Raka Aditya', role: 'Striker' }
    ],
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80'
  }
];

function initTrophyPage() {
  const grid = document.getElementById('trophy-grid');
  const statsGrid = document.getElementById('trophy-stats-grid');
  const emptyBox = document.getElementById('trophy-empty');
  const countBadge = document.getElementById('trophy-count-badge');
  const searchInput = document.getElementById('trophy-search-input');
  const searchClear = document.getElementById('trophy-search-clear');
  const sortOptions = document.getElementById('trophy-sort-options');
  const chipsContainer = document.getElementById('trophy-chips');
  const modal = document.getElementById('trophy-modal');
  const modalBody = document.getElementById('trophy-modal-body');
  const modalClose = document.getElementById('trophy-modal-close');
  const modalOverlay = document.getElementById('trophy-modal-overlay');

  if (!grid || !TROPHY_DATA.length) return;

  let activeSort = 'newest';
  let activeLevel = 'all';
  let query = '';

  function formatDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function buildStats() {
    if (!statsGrid) return;
    const total = TROPHY_DATA.length;
    const international = TROPHY_DATA.filter(t => t.level === 'Internasional').length;
    const national = TROPHY_DATA.filter(t => t.level === 'Nasional').length;
    const regional = TROPHY_DATA.filter(t => t.level === 'Provinsi' || t.level === 'Kabupaten').length;

    const stats = [
      { icon: 'fa-trophy', value: total, label: 'Total Trophy', cls: 'trophy-stat-gold' },
      { icon: 'fa-earth-asia', value: international, label: 'Internasional', cls: 'trophy-stat-blue' },
      { icon: 'fa-flag', value: national, label: 'Nasional', cls: 'trophy-stat-silver' },
      { icon: 'fa-award', value: regional, label: 'Provinsi & Kab.', cls: 'trophy-stat-bronze' }
    ];

    statsGrid.innerHTML = stats.map(s => `
      <div class="trophy-stat-card ${s.cls}">
        <div class="stat-icon"><i class="fa-solid ${s.icon}"></i></div>
        <span class="stat-number">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  function getFilteredSorted() {
    let list = TROPHY_DATA.slice();

    if (activeLevel !== 'all') {
      list = list.filter(t => t.level === activeLevel);
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(t => {
        const participantText = (t.participants || []).map(p => `${p.name} ${p.role}`).join(' ').toLowerCase();
        return t.title.toLowerCase().includes(q) ||
          t.ranking.toLowerCase().includes(q) ||
          t.prize.toLowerCase().includes(q) ||
          t.level.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          participantText.includes(q);
      });
    }

    switch (activeSort) {
      case 'newest':
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'level-high':
        list.sort((a, b) => LEVEL_RANK[b.level] - LEVEL_RANK[a.level] || new Date(b.date) - new Date(a.date));
        break;
      case 'level-low':
        list.sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || new Date(a.date) - new Date(b.date));
        break;
    }

    return list;
  }

  function render() {
    const list = getFilteredSorted();

    if (countBadge) {
      countBadge.innerHTML = `<i class="fa-solid fa-trophy"></i> Menampilkan ${list.length} Trophy`;
    }

    if (searchClear) {
      searchClear.style.display = query.length > 0 ? 'flex' : 'none';
    }

    if (emptyBox) {
      emptyBox.style.display = list.length === 0 ? 'block' : 'none';
    }

    grid.innerHTML = list.map(t => {
      const levelClass = 'level-' + t.level.toLowerCase();
      const date = formatDate(t.date);
      const mainParticipant = (t.participants && t.participants[0]) || { name: '-', role: '' };

      return `
        <article class="trophy-card" data-id="${t.id}" tabindex="0">
          <div class="trophy-card-img-wrapper">
            <img src="${t.image}" alt="${t.title}" class="trophy-card-img" loading="lazy">
            <span class="trophy-level-badge ${levelClass}">
              <i class="fa-solid ${LEVEL_ICON[t.level]}"></i> ${t.level}
            </span>
            <span class="trophy-date-badge"><i class="fa-regular fa-calendar-days"></i> ${date}</span>
          </div>
          <div class="trophy-card-content">
            <h3 class="trophy-card-title">${t.ranking} - ${t.title}</h3>
            <p class="trophy-card-desc">${t.description}</p>
            <div class="trophy-card-meta">
              <span><i class="fa-solid fa-user-tie"></i> ${mainParticipant.name} (${mainParticipant.role})</span>
              <span><i class="fa-solid fa-gift"></i> ${t.prize}</span>
            </div>
            <span class="trophy-card-link">Lihat Detail <i class="fa-solid fa-arrow-right-long"></i></span>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.trophy-card').forEach(card => {
      card.addEventListener('click', () => {
        const item = TROPHY_DATA.find(t => t.id === parseInt(card.dataset.id, 10));
        if (item) openModal(item);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const item = TROPHY_DATA.find(t => t.id === parseInt(card.dataset.id, 10));
          if (item) openModal(item);
        }
      });
    });
  }

  function openModal(item) {
    if (!modal || !modalBody) return;
    const levelClass = 'level-' + item.level.toLowerCase();
    const date = formatDate(item.date);
    const participants = item.participants || [];

    modalBody.innerHTML = `
      <div class="trophy-modal-hero">
        <img src="${item.image}" alt="${item.title}">
        <div class="trophy-modal-hero-shade"></div>
        <span class="trophy-modal-level ${levelClass}">
          <i class="fa-solid ${LEVEL_ICON[item.level]}"></i> ${item.level} - ${item.ranking}
        </span>
        <span class="trophy-modal-date"><i class="fa-regular fa-calendar-days"></i> ${date}</span>
      </div>
      <div class="trophy-modal-content">
        <h2 class="trophy-modal-title">${item.title}</h2>
        <p class="trophy-modal-desc">${item.description}</p>
        <div class="trophy-detail-grid">
          <div class="trophy-detail-item">
            <span class="detail-label"><i class="fa-solid fa-trophy"></i> Peringkat</span>
            <span class="detail-value">${item.ranking}</span>
          </div>
          <div class="trophy-detail-item">
            <span class="detail-label"><i class="fa-solid fa-earth-asia"></i> Tingkat Kejuaraan</span>
            <span class="detail-value">${item.level}</span>
          </div>
          <div class="trophy-detail-item">
            <span class="detail-label"><i class="fa-regular fa-calendar-days"></i> Tanggal Diraih</span>
            <span class="detail-value">${date}</span>
          </div>
          <div class="trophy-detail-item">
            <span class="detail-label"><i class="fa-solid fa-gift"></i> Hadiah Yang Didapat</span>
            <span class="detail-value">${item.prize}</span>
          </div>
        </div>
        <div class="trophy-participants-block">
          <h4 class="trophy-participants-title">
            <i class="fa-solid fa-users"></i> Peserta Yang Terlibat
          </h4>
          <ul class="trophy-participants-list">
            ${participants.map(p => `
              <li>
                <img class="trophy-participant-avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=2563eb&color=fff&size=80&bold=true" alt="${p.name}">
                <div class="trophy-participant-info">
                  <span class="trophy-participant-name">${p.name}</span>
                  <span class="trophy-participant-role">${p.role}</span>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (sortOptions) {
    sortOptions.addEventListener('click', e => {
      const btn = e.target.closest('.trophy-sort-btn');
      if (!btn) return;
      activeSort = btn.dataset.sort;
      sortOptions.querySelectorAll('.trophy-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  }

  if (chipsContainer) {
    chipsContainer.addEventListener('click', e => {
      const chip = e.target.closest('.trophy-chip');
      if (!chip) return;
      activeLevel = chip.dataset.level;
      chipsContainer.querySelectorAll('.trophy-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      query = searchInput.value.trim();
      render();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      query = '';
      render();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  buildStats();
  render();
}
