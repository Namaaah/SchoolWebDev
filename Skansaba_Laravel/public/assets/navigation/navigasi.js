document.addEventListener('DOMContentLoaded', () => {

  const pageFiles = {
    'beranda': 'pages/home/dashboard.html',
    'join-us': 'pages/join-us/join-us.html',
    'ruangan': 'pages/rooms/ruangan.html',
    'sejarah': 'pages/profile/history/sejarah.html',
    'visi-misi': 'pages/profile/vision-mission/visi-misi.html',
    'struktur-organisasi': 'pages/profile/organization-structure/struktur-organisasi.html',
    'sarana-prasarana': 'pages/profile/facilities/sarana-prasarana.html',
    'teaching-factory': 'pages/profile/teaching-factory/teaching-factory.html',
    'berita': 'pages/information/news/berita.html',
    'prestasi': 'pages/information/achievements/prestasi.html',
    'trophy': 'pages/information/trophy-museum/trophy.html',
    'trophy-admin': 'pages/admin/trophy-admin/trophy-admin.html',
    'download': 'pages/information/downloads/download.html',
    'berkas-spmb': 'pages/information/enrollment-files/berkas-spmb.html',
    'web-spmb': 'pages/information/enrollment-site/web-spmb.html',
    'akl': 'pages/study-programs/accounting/akl.html',
    'lps': 'pages/study-programs/islamic-banking/lps.html',
    'mp': 'pages/study-programs/office-management/mp.html',
    'bisnis-ritel': 'pages/study-programs/retail-business/bisnis-ritel.html',
    'bisnis-digital': 'pages/study-programs/digital-business/bisnis-digital.html',
    'rpl': 'pages/study-programs/software-engineering/rpl.html',
    'dkv': 'pages/study-programs/visual-communication-design/dkv.html',
    'tkj': 'pages/study-programs/computer-networking/tkj.html',
    'ekstrakurikuler': 'pages/other/extracurricular/ekstrakurikuler.html',
    'organisasi-siswa': 'pages/other/student-organization/organisasi-siswa.html'
  };

  const contentCache = {};

  const contentContainer = document.getElementById('content-container');
  const loadingEl = document.getElementById('page-loading');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-page], .dropdown-link[data-page]');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  let currentPageId = null;
  let scrollObserver = null;

  const heroPages = ['beranda', 'join-us', 'trophy'];

  function updateNavbar() {
    if (!navbar) return;
    const isHeroPage = heroPages.includes(currentPageId);
    if (isHeroPage && window.scrollY <= 50) {
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.add('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  function loadPage(pageId) {
    const filePath = pageFiles[pageId];
    if (!filePath) return;

    if (loadingEl) loadingEl.style.display = 'flex';
    if (contentContainer) contentContainer.style.opacity = '0';

    const applyContent = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const body = doc.body.cloneNode(true);
      body.querySelectorAll('script').forEach(s => s.remove());
      const content = body.innerHTML;

      if (contentContainer) {
        contentContainer.innerHTML = content;
        contentContainer.style.opacity = '1';
      }
      if (loadingEl) loadingEl.style.display = 'none';

      currentPageId = pageId;
      window.scrollTo({ top: 0 });
      updateNavbar();
      initPageScripts(pageId);
    };

    if (contentCache[pageId]) {
      applyContent(contentCache[pageId]);
    } else {
      fetch(filePath)
        .then(res => {
          if (!res.ok) throw new Error('Gagal memuat halaman');
          return res.text();
        })
        .then(html => {
          contentCache[pageId] = html;
          applyContent(html);
        })
        .catch(err => {
          console.error(err);
          if (contentContainer) {
            contentContainer.innerHTML = `<div class="page-error"><i class="fa-solid fa-exclamation-triangle"></i><h2>Gagal Memuat Halaman</h2><p>${err.message}</p></div>`;
            contentContainer.style.opacity = '1';
          }
          if (loadingEl) loadingEl.style.display = 'none';
        });
    }
  }

  // Inject CSS stylesheet once per page type
  function injectPageCSS(id, href) {
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function initPageScripts(pageId) {
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }

    if (pageId === 'beranda') {
      const heroVideo = document.querySelector('.hero-video');
      if (heroVideo) {
        heroVideo.muted = true;
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }

      const speechBody = document.getElementById('principal-speech-body');
      const speechToggle = document.getElementById('speech-toggle-btn');
      if (speechBody && speechToggle && window.innerWidth <= 768) {
        const speechLabel = speechToggle.querySelector('.speech-toggle-label');
        const speechIcon = speechToggle.querySelector('i');
        speechToggle.addEventListener('click', () => {
          const isExpanded = speechBody.classList.toggle('expanded');
          speechToggle.setAttribute('aria-expanded', isExpanded);
          if (speechLabel) speechLabel.textContent = isExpanded ? 'Hide' : 'Show';
          if (speechIcon) speechIcon.classList.toggle('fa-chevron-up', isExpanded);
        });
      }

      const animateElements = document.querySelectorAll('.principal-card, .news-card, .achievement-card, .partner-item, .partner-logo-item, .social-card, .section-title');

      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

      animateElements.forEach(el => {
        el.classList.add('reveal-item');
        scrollObserver.observe(el);
      });
    }

    if (pageId === 'join-us') {
      injectPageCSS('css-join-us', 'pages/join-us/join-us.css');
      initJoinUsPage();
    }

    if (pageId === 'trophy') {
      injectPageCSS('css-trophy', 'pages/information/trophy-museum/trophy.css');
      initTrophyPage();
    }

    if (pageId === 'trophy-admin') {
      injectPageCSS('css-trophy-admin', 'pages/admin/trophy-admin/trophy-admin.css');
      initTrophyAdminPage();
    }
  }

  function initJoinUsPage() {
    const searchInput = document.getElementById('normada-search-input');
    const searchClear = document.getElementById('normada-search-clear');
    const filterChips = document.querySelectorAll('.filter-chip');
    const teacherCards = document.querySelectorAll('.normada-card');
    const countBadge = document.getElementById('normada-count-badge');
    const emptyState = document.getElementById('normada-empty-state');
    const resetBtn = document.getElementById('reset-filter-btn');

    if (!teacherCards.length) return;

    let activeSubject = 'all';

    function filterTeachers() {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      let visibleCount = 0;

      if (searchClear) {
        searchClear.style.display = query.length > 0 ? 'flex' : 'none';
      }

      teacherCards.forEach(card => {
        const subject = card.dataset.subject || '';
        const keywords = card.dataset.keywords || '';
        const textContent = card.textContent.toLowerCase();

        const matchSubject = (activeSubject === 'all') || (subject === activeSubject);
        const matchQuery = !query || keywords.includes(query) || textContent.includes(query);

        if (matchSubject && matchQuery) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countBadge) {
        countBadge.innerHTML = `<i class="fa-solid fa-user-check"></i> Menampilkan ${visibleCount} Guru`;
      }

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeSubject = chip.dataset.subject || 'all';
        filterTeachers();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterTeachers);
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        filterTeachers();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        activeSubject = 'all';
        filterChips.forEach(c => c.classList.remove('active'));
        const allChip = document.querySelector('.filter-chip[data-subject="all"]');
        if (allChip) allChip.classList.add('active');
        filterTeachers();
      });
    }

    filterTeachers();
  }

  function initTrophyPage() {
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

    const DEFAULT_TROPHY_DATA = [
      {
        id: 1,
        title: 'Lomba Kompetensi Siswa (LKS) Web Technologies',
        level: 'Nasional',
        ranking: 'Juara 1',
        date: '2026-07-20',
        prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp5.000.000',
        description: 'Siswa SMKN 1 Bantul berhasil meraih Medali Emas dalam bidang Web Technologies tingkat Nasional. Capaian ini diraih setelah melalui seleksi ketat mulai dari tingkat kabupaten hingga provinsi.',
        participants: [
          { name: 'Andi Pratama', role: 'Kontestan Web Technologies' }
        ],
        image: 'https://smkn1bantul.sch.id/storage/01JA6ZZTT0H12Q4NZRXBZ9E8EC.PNG'
      },
      {
        id: 2,
        title: 'National Robotics & IoT Innovation Contest',
        level: 'Nasional',
        ranking: 'Juara 2',
        date: '2026-06-15',
        prize: 'Piala, Sertifikat, dan Beasiswa Pendidikan',
        description: 'Tim Robotika SMKN 1 Bantul menampilkan karya inovasi prototipe otomasi industri ramah lingkungan yang berhasil menarik perhatian juri nasional.',
        participants: [
          { name: 'Bima Sakti', role: 'Ketua Tim Robotika' },
          { name: 'Citra Lestari', role: 'Programmer IoT' }
        ],
        image: 'https://smkn1bantul.sch.id/storage/01JA702A89MSW043CNGVR85V2S.PNG'
      },
      {
        id: 3,
        title: 'International Youth IT Competition',
        level: 'Internasional',
        ranking: 'Medali Perunggu',
        date: '2026-03-10',
        prize: 'Medali Perunggu dan Sertifikat Internasional',
        description: 'Tim aplikasi mobile SMKN 1 Bantul mewakili Indonesia dalam kompetisi IT tingkat internasional dan berhasil membawa pulang medali perunggu.',
        participants: [
          { name: 'Dewi Anggraini', role: 'Project Manager' },
          { name: 'Eko Prasetyo', role: 'Mobile Developer' },
          { name: 'Fajar Nugroho', role: 'UI/UX Designer' }
        ],
        image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 4,
        title: 'LKS Accounting Software Tingkat Provinsi',
        level: 'Provinsi',
        ranking: 'Juara 1',
        date: '2025-11-08',
        prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp2.500.000',
        description: 'Siswa jurusan Akuntansi dan Keuangan Lembaga meraih juara pertama dalam penguasaan software akuntansi tingkat provinsi DIY.',
        participants: [
          { name: 'Gita Maharani', role: 'Kontestan Accounting Software' }
        ],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 5,
        title: 'Kompetisi English Speech Contest',
        level: 'Kabupaten',
        ranking: 'Juara 1',
        date: '2026-01-22',
        prize: 'Trophy, Sertifikat, dan Paket Buku Bahasa Inggris',
        description: 'Siswi SMKN 1 Bantul berhasil menjadi yang terbaik dalam kompetisi pidato Bahasa Inggris tingkat Kabupaten Bantul.',
        participants: [
          { name: 'Hana Safira', role: 'Kontestan English Speech' }
        ],
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 6,
        title: 'Festival Lomba Seni Siswa Nasional (FLS2N) Desain Grafis',
        level: 'Nasional',
        ranking: 'Juara Harapan 1',
        date: '2025-04-18',
        prize: 'Sertifikat Nasional dan Voucher Peralatan Desain',
        description: 'Karya desain poster digital siswa DKV SMKN 1 Bantul masuk dalam nominasi terbaik ajang FLS2N tingkat nasional.',
        participants: [
          { name: 'Ilham Ramadhan', role: 'Desainer Grafis' }
        ],
        image: 'https://images.unsplash.com/photo-1567093321257-8a6d5de18fd4?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 7,
        title: 'LKS Cloud Computing Tingkat Provinsi',
        level: 'Provinsi',
        ranking: 'Juara 2',
        date: '2024-10-30',
        prize: 'Piala, Sertifikat, dan Uang Pembinaan Rp1.500.000',
        description: 'Tim RPL meraih juara kedua kompetisi cloud computing tingkat provinsi dan berhak mewakili DIY pada babak nasional.',
        participants: [
          { name: 'Joko Susilo', role: 'Kontestan Cloud Computing' },
          { name: 'Kartika Sari', role: 'Cadangan' }
        ],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 8,
        title: 'Lomba Cerdas Cermat Pramuka Tingkat Kabupaten',
        level: 'Kabupaten',
        ranking: 'Juara 1',
        date: '2026-02-05',
        prize: 'Trophy Bergilir, Sertifikat, dan Uang Pembinaan',
        description: 'Regu Pramuka SMKN 1 Bantul menjadi juara umum Lomba Cerdas Cermat tingkat Kabupaten Bantul.',
        participants: [
          { name: 'Laila Rahmawati', role: 'Ketua Regu' },
          { name: 'Muhammad Rizki', role: 'Anggota' },
          { name: 'Nanda Putri', role: 'Anggota' }
        ],
        image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80'
      },
      {
        id: 9,
        title: 'POPDA Futsal Pelajar Tingkat Provinsi',
        level: 'Provinsi',
        ranking: 'Juara 1',
        date: '2025-09-12',
        prize: 'Piala, Medali Emas, dan Sertifikat',
        description: 'Tim futsal putra SMKN 1 Bantul berhasil menjadi juara Pekan Olahraga Pelajar Daerah (POPDA) tingkat Provinsi DIY.',
        participants: [
          { name: 'Oscar Yudha', role: 'Kapten Tim' },
          { name: 'Panji Wirawan', role: 'Kiper' },
          { name: 'Raka Aditya', role: 'Pemain' }
        ],
        image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80'
      }
    ];

    const TROPHY_DATA = window.TrophyStore ? window.TrophyStore.getAll() : DEFAULT_TROPHY_DATA;
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
          <article class="trophy-card" data-id="${t.id}">
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
                <span><i class="fa-solid fa-user-tie"></i> ${mainParticipant.name}</span>
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
              <span class="detail-label"><i class="fa-solid fa-earth-asia"></i> Tingkat</span>
              <span class="detail-value">${item.level}</span>
            </div>
            <div class="trophy-detail-item">
              <span class="detail-label"><i class="fa-regular fa-calendar-days"></i> Tanggal</span>
              <span class="detail-value">${date}</span>
            </div>
            <div class="trophy-detail-item">
              <span class="detail-label"><i class="fa-solid fa-gift"></i> Hadiah</span>
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

    sortOptions.addEventListener('click', e => {
      const btn = e.target.closest('.trophy-sort-btn');
      if (!btn) return;
      activeSort = btn.dataset.sort;
      sortOptions.querySelectorAll('.trophy-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });

    chipsContainer.addEventListener('click', e => {
      const chip = e.target.closest('.trophy-chip');
      if (!chip) return;
      activeLevel = chip.dataset.level;
      chipsContainer.querySelectorAll('.trophy-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });

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

  function initTrophyAdminPage() {
    const store = window.TrophyStore;
    if (!store) return;

    const form = document.getElementById('admin-trophy-form');
    const list = document.getElementById('admin-trophy-list');
    const newButton = document.getElementById('admin-new-trophy');
    const cancelButton = document.getElementById('admin-cancel-edit');
    const deleteButton = document.getElementById('admin-delete-trophy');
    const museumLink = document.querySelector('.admin-view-link');
    const mode = document.getElementById('admin-form-mode');
    const formTitle = document.getElementById('admin-form-title');
    const fields = {
      id: document.getElementById('trophy-id'), title: document.getElementById('trophy-title'),
      level: document.getElementById('trophy-level'), ranking: document.getElementById('trophy-ranking'),
      date: document.getElementById('trophy-date'), prize: document.getElementById('trophy-prize'),
      image: document.getElementById('trophy-image'), description: document.getElementById('trophy-description'),
      participants: document.getElementById('trophy-participants')
    };
    if (!form || !list) return;

    let selectedId = null;
    const placeholderImage = 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=80';
    const items = () => store.getAll();
    const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

    function renderList() {
      const collection = items().sort((a, b) => new Date(b.date) - new Date(a.date));
      list.innerHTML = collection.map(item => `
        <button type="button" class="admin-trophy-item ${item.id === selectedId ? 'active' : ''}" data-id="${item.id}">
          <strong>${escape(item.title)}</strong><span>${escape(item.ranking)} · ${escape(item.level)} · ${escape(item.date)}</span>
        </button>`).join('') || '<p style="padding:16px;color:#64748b">Belum ada display kejuaraan.</p>';
    }

    function clearForm() {
      selectedId = null;
      form.reset();
      fields.id.value = '';
      mode.textContent = 'Tambah display';
      formTitle.textContent = 'Kejuaraan baru';
      deleteButton.hidden = true;
      renderList();
      fields.title.focus();
    }

    function selectItem(id) {
      const item = items().find(entry => entry.id === id);
      if (!item) return;
      selectedId = id;
      fields.id.value = item.id;
      fields.title.value = item.title || '';
      fields.level.value = item.level || 'Nasional';
      fields.ranking.value = item.ranking || '';
      fields.date.value = item.date || '';
      fields.prize.value = item.prize || '';
      fields.image.value = item.image || '';
      fields.description.value = item.description || '';
      fields.participants.value = (item.participants || []).map(person => `${person.name} | ${person.role}`).join('\n');
      mode.textContent = 'Edit display';
      formTitle.textContent = item.title;
      deleteButton.hidden = false;
      renderList();
    }

    list.addEventListener('click', event => {
      const button = event.target.closest('.admin-trophy-item');
      if (button) selectItem(Number(button.dataset.id));
    });
    newButton.addEventListener('click', clearForm);
    cancelButton.addEventListener('click', clearForm);
    if (museumLink) museumLink.addEventListener('click', event => { event.preventDefault(); switchPage('trophy'); });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const participants = fields.participants.value.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
        const [name, ...role] = line.split('|');
        return { name: name.trim(), role: role.join('|').trim() || 'Peserta' };
      });
      const record = {
        id: selectedId || Date.now(), title: fields.title.value.trim(), level: fields.level.value,
        ranking: fields.ranking.value.trim(), date: fields.date.value, prize: fields.prize.value.trim(),
        image: fields.image.value.trim() || placeholderImage, description: fields.description.value.trim(), participants
      };
      const collection = items();
      const index = collection.findIndex(item => item.id === record.id);
      if (index >= 0) collection[index] = record; else collection.push(record);
      store.save(collection);
      selectedId = record.id;
      selectItem(record.id);
    });

    deleteButton.addEventListener('click', () => {
      const current = items().find(item => item.id === selectedId);
      if (!current || !window.confirm(`Hapus display “${current.title}”?`)) return;
      store.save(items().filter(item => item.id !== selectedId));
      clearForm();
    });

    renderList();
    clearForm();
  }

  function switchPage(pageId) {
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.dropdown-toggle.active').forEach(t => t.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"], .dropdown-link[data-page="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      const parentDropdown = activeLink.closest('.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }

    loadPage(pageId);
    closeMobileMenu();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) switchPage(page);
    });
  });

  const defaultLink = document.querySelector('.nav-link[data-page="beranda"]');
  if (defaultLink) defaultLink.classList.add('active');
  loadPage('beranda');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown');
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      }
    });
  });

  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileMenu() {
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  const bottomBar = document.getElementById('bottom-info-bar');
  if (bottomBar) {
    bottomBar.style.transition = 'opacity 0.5s ease';
    const checkVisibility = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      bottomBar.style.opacity = (scrollPos > docHeight * 0.5) ? '1' : '0.3';
    };
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  }

});

