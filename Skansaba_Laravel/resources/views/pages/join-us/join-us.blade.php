@extends('layouts.app')

@section('title', 'Join Us - SMK Negeri 1 Bantul')

@section('styles')
    <link rel="stylesheet" href="{{ asset('pages-assets/join-us/join-us.css') }}">
@endsection

@section('content')
<div class="join-us-page">
    <!-- HERO SECTION -->
    <section class="join-hero">
        <div class="join-hero-overlay"></div>
        <div class="join-container join-hero-content">
            <span class="hero-badge"><i class="fa-solid fa-sparkles"></i> Pendaftaran Siswa Baru SMKN 1 Bantul</span>
            <h1 class="join-hero-title">Wujudkan Masa Depan Cemerlang Bersama SMK Negeri 1 Bantul</h1>
            <p class="join-hero-subtitle">
                Sekolah Menengah Kejuruan Unggulan Terakreditasi A & SMK Pusat Keunggulan (PK). Tempat terbaik mengasah keahlian vokasi, inovasi digital, serta karakter profesional yang siap bersaing secara global.
            </p>
            <div class="join-hero-actions">
                <a href="#join-jurusan" class="join-btn join-btn-primary"><i class="fa-solid fa-layer-group"></i> Lihat 8 Jurusan</a>
                <a href="#join-benefits" class="join-btn join-btn-outline"><i class="fa-solid fa-award"></i> Keuntungan Bergabung</a>
                <a href="#normada-section" class="join-btn join-btn-light"><i class="fa-solid fa-user-tie"></i> Cari Guru Normada</a>
            </div>

            <div class="join-stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                    <div class="stat-info">
                        <span class="stat-number">8</span>
                        <span class="stat-label">Program Keahlian</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-certificate"></i></div>
                    <div class="stat-info">
                        <span class="stat-number">A</span>
                        <span class="stat-label">Akreditasi Unggul</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-handshake"></i></div>
                    <div class="stat-info">
                        <span class="stat-number">50+</span>
                        <span class="stat-label">Mitra Industri & BKK</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-briefcase"></i></div>
                    <div class="stat-info">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Kesiapan Karir & PTN</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION B: BENEFIT SISWA -->
    <section class="join-section" id="join-benefits">
        <div class="join-container">
            <div class="section-header-center">
                <span class="section-tag"><i class="fa-solid fa-star"></i> Mengapa Kami?</span>
                <h2 class="section-main-title">Keuntungan Bergabung di SMKN 1 Bantul</h2>
                <p class="section-sub-title">Benefit eksklusif dan fasilitas unggulan yang akan mengakselerasi potensi akademik, keterampilan, serta peluang karir Anda.</p>
            </div>

            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-blue">
                        <i class="fa-solid fa-id-card-clip"></i>
                    </div>
                    <h3>Sertifikasi BNSP & Lisensi Industri</h3>
                    <p>Lulusan tidak hanya mendapatkan ijazah formal, tetapi juga Sertifikat Kompetensi BNSP yang diakui oleh dunia kerja skala nasional dan internasional.</p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-indigo">
                        <i class="fa-solid fa-building-user"></i>
                    </div>
                    <h3>Bursa Kerja Khusus (BKK) & Magang</h3>
                    <p>Fasilitas penyaluran kerja langsung dan magang (PKL) di 50+ jaringan perusahaan ternama, BUMN, instansi pemerintah, dan startup terkemuka.</p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-cyan">
                        <i class="fa-solid fa-laptop-code"></i>
                    </div>
                    <h3>Fasilitas Modern & Teaching Factory</h3>
                    <p>Laboratorium komputer spesifikasi tinggi, studio multimedia, mini bank syariah real-action, serta business center untuk praktik bisnis nyata.</p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-emerald">
                        <i class="fa-solid fa-piggy-bank"></i>
                    </div>
                    <h3>Program Beasiswa Lengkap</h3>
                    <p>Tersedia beasiswa bagi siswa berprestasi akademik, non-akademik, beasiswa Program Indonesia Pintar (PIP), serta bantuan dana dari mitra industri.</p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-amber">
                        <i class="fa-solid fa-users-gear"></i>
                    </div>
                    <h3>15+ Ekstrakurikuler & Organisasi</h3>
                    <p>Wadah pengembangan bakat, kreativitas, kepemimpinan, serta ajang kompetisi hingga tingkat nasional melalui berbagai klub dan organisasi siswa.</p>
                </div>

                <div class="benefit-card">
                    <div class="benefit-icon-wrapper bg-purple">
                        <i class="fa-solid fa-route"></i>
                    </div>
                    <h3>Bimbingan Karir & Perguruan Tinggi</h3>
                    <p>Program bimbingan intensif bagi siswa yang ingin melanjutkan studi ke Perguruan Tinggi Negeri (PTN) favorit atau membangun wirausaha mandiri.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION C: JURUSAN YANG TERSEDIA & GURU PENGARAH -->
    <section class="join-section join-bg-light" id="join-jurusan">
        <div class="join-container">
            <div class="section-header-center">
                <span class="section-tag"><i class="fa-solid fa-shapes"></i> Program Keahlian</span>
                <h2 class="section-main-title">8 Jurusan Unggulan Di SMKN 1 Bantul</h2>
                <p class="section-sub-title">Setiap jurusan dirancang khusus sesuai perkembangan teknologi dan kebutuhan industri masa depan, dibimbing oleh guru pengajar profesional.</p>
            </div>

            <!-- Content for Jurusan lists would go here, omitting for brevity in this example -->
            <p>Content untuk 8 Jurusan Unggulan akan dimuat di sini.</p>
        </div>
    </section>

    <!-- SECTION D: ORGANISASI SISWA -->
    <section class="join-section" id="join-organisasi">
        <div class="join-container">
            <div class="section-header-center">
                <span class="section-tag"><i class="fa-solid fa-users"></i> Ekstrakurikuler & Organisasi</span>
                <h2 class="section-main-title">Organisasi Siswa Yang Bisa Diikuti</h2>
                <p class="section-sub-title">Bentuk kepemimpinan, kepribadian, serta jaringan pertemanan melalui berbagai wadah organisasi resmi di SMKN 1 Bantul.</p>
            </div>
            
            <p>Content untuk Organisasi Siswa akan dimuat di sini.</p>
        </div>
    </section>

    <!-- SECTION E: GURU NORMADA & FITUR FILTER -->
    <section class="join-section join-bg-light" id="normada-section">
        <div class="join-container">
            <div class="section-header-center">
                <span class="section-tag"><i class="fa-solid fa-user-graduate"></i> Tenaga Pendidik</span>
                <h2 class="section-main-title">Guru Normatif & Adaptif (Normada)</h2>
                <p class="section-sub-title">Pendidik profesional yang membimbing mata pelajaran umum, karakter, wawasan kebangsaan, dan keilmuan adaptif siswa.</p>
            </div>
            
            <p>Content untuk Guru Normada akan dimuat di sini.</p>
        </div>
    </section>

    <!-- CALL TO ACTION BANNER -->
    <section class="join-cta-banner">
        <div class="join-container cta-content">
            <h2>Siap Bergabung dengan SMK Negeri 1 Bantul?</h2>
            <p>Daftarkan diri Anda sekarang dan amankan kuota pendaftaran SPMB untuk jurusan impian Anda!</p>
            <div class="cta-actions">
                <a href="https://smkn1bantul.sch.id" target="_blank" class="join-btn join-btn-white"><i class="fa-solid fa-paper-plane"></i> Daftar SPMB Online</a>
                <a href="https://wa.me/6281234567890" target="_blank" class="join-btn join-btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> Konsultasi SPMB (WhatsApp)</a>
            </div>
        </div>
    </section>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('pages-assets/join-us/join-us.js') }}"></script>
@endsection
