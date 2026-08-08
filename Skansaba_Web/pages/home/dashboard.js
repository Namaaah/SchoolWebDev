
document.addEventListener('DOMContentLoaded', () => {

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Video autoplay initial block resolved:", error);
            });
        }
    }

    const staggeredContainers = document.querySelectorAll('.partners-grid, .achievements-container, .social-media-grid');

    staggeredContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {

            if (!child.classList.contains('reveal') &&
                !child.classList.contains('reveal-left') &&
                !child.classList.contains('reveal-right') &&
                !child.classList.contains('reveal-scale')) {
                child.classList.add('reveal-scale');
            }

            const delay = Math.min(index * 0.05, 1.2);
            child.style.setProperty('--stagger-delay', `${delay}s`);
        });
    });

    const revealTargetSelector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealTargetSelector);

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                entry.target.classList.add('active');
            } else {

                entry.target.classList.remove('active');
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const speechBody = document.getElementById('principal-speech-body');
    const speechToggle = document.getElementById('speech-toggle-btn');
    if (speechBody && speechToggle) {
        const speechLabel = speechToggle.querySelector('.speech-toggle-label');
        const speechIcon = speechToggle.querySelector('i');
        speechToggle.addEventListener('click', () => {
            const isExpanded = speechBody.classList.toggle('expanded');
            speechToggle.setAttribute('aria-expanded', isExpanded);
            if (speechLabel) speechLabel.textContent = isExpanded ? 'Hide' : 'Show';
            if (speechIcon) speechIcon.classList.toggle('fa-chevron-up', isExpanded);
        });
    }

    const newsShowMoreBtn = document.getElementById('news-show-more-btn');
    if (newsShowMoreBtn) {
        newsShowMoreBtn.addEventListener('click', () => {
            alert("Halaman detail berita selengkapnya akan segera dibuka saat sistem admin dihubungkan.");
        });
    }

    const otherNewsPageLink = document.getElementById('other-news-page-link');
    if (otherNewsPageLink) {
        otherNewsPageLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Navigasi ke halaman Arsip Berita Sekolah akan dihubungkan.");
        });
    }

    const achievementsShowMoreBtn = document.getElementById('achievements-show-more-btn');
    if (achievementsShowMoreBtn) {
        achievementsShowMoreBtn.addEventListener('click', () => {
            alert("Arsip riwayat prestasi siswa akan ditampilkan di sini setelah dikonfigurasi melalui Halaman Admin.");
        });
    }

});

