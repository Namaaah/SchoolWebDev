<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'SMK Negeri 1 Bantul')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('assets/navigation/navigasi.css') }}">
    @yield('styles')
</head>

<body>

    <header class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-brand">
                <img src="https://smkn1bantul.sch.id/logo.png" alt="Logo SMKN 1 Bantul" class="nav-logo">
                <span class="nav-school-name">SMKN 1 BANTUL</span>
            </div>

            <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Menu">
                <i class="fa-solid fa-bars"></i>
            </button>

            <nav class="nav-menu" id="nav-menu">
                <div class="nav-item">
                    <a href="{{ route('home') }}" class="nav-link">Beranda</a>
                </div>
                <div class="nav-item">
                    <a href="{{ route('join-us') }}" class="nav-link"><i class="fa-solid fa-user-plus"></i> Join Us</a>
                </div>
                <div class="nav-item">
                    <a href="{{ route('ruangan') }}" class="nav-link">Ruangan</a>
                </div>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        Profil Sekolah <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="{{ route('sejarah') }}" class="dropdown-link">Sejarah</a>
                        <a href="{{ route('visi-misi') }}" class="dropdown-link">Visi & Misi</a>
                        <a href="{{ route('struktur-organisasi') }}" class="dropdown-link">Struktur Organisasi</a>
                        <a href="{{ route('sarana-prasarana') }}" class="dropdown-link">Sarana Prasarana</a>
                        <a href="{{ route('teaching-factory') }}" class="dropdown-link">Teaching Factory</a>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        Informasi <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="{{ route('berita') }}" class="dropdown-link">Berita</a>
                        <a href="{{ route('prestasi') }}" class="dropdown-link">Prestasi</a>
                        <a href="{{ route('trophy') }}" class="dropdown-link">Museum Trophy</a>
                        <a href="{{ route('trophy-admin') }}" class="dropdown-link">Admin Museum Trophy</a>
                        <a href="{{ route('download') }}" class="dropdown-link">Download</a>
                        <a href="{{ route('berkas-spmb') }}" class="dropdown-link">Berkas SPMB</a>
                        <a href="{{ route('web-spmb') }}" class="dropdown-link">Web SPMB</a>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        Program Keahlian <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="{{ route('akl') }}" class="dropdown-link">Akuntansi dan Keuangan Lembaga</a>
                        <a href="{{ route('lps') }}" class="dropdown-link">Layanan Perbankan Syariah</a>
                        <a href="{{ route('mp') }}" class="dropdown-link">Manajemen Perkantoran</a>
                        <a href="{{ route('bisnis-ritel') }}" class="dropdown-link">Bisnis Ritel</a>
                        <a href="{{ route('bisnis-digital') }}" class="dropdown-link">Bisnis Digital</a>
                        <a href="{{ route('rpl') }}" class="dropdown-link">Rekayasa Perangkat Lunak</a>
                        <a href="{{ route('dkv') }}" class="dropdown-link">Desain Komunikasi Visual</a>
                        <a href="{{ route('tkj') }}" class="dropdown-link">Teknik Komputer Jaringan</a>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle">
                        Lainnya <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="{{ route('ekstrakurikuler') }}" class="dropdown-link">Ekstrakurikuler</a>
                        <a href="{{ route('organisasi-siswa') }}" class="dropdown-link">Organisasi Siswa</a>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    <div class="mobile-overlay" id="mobile-overlay"></div>

    <main class="content-container" id="content-container">
        @yield('content')
    </main>

    <div class="bottom-info-bar" id="bottom-info-bar">
        <div class="info-inner">
            <div class="info-left">
                <p><i class="fa-solid fa-location-dot"></i> Jl. Khaharjo, Beji, Bantul, DI Yogyakarta 55711</p>
                <p><i class="fa-solid fa-phone"></i> (0274) 367123</p>
            </div>
            <a href="https://www.google.com/maps?q=SMKN+1+Bantul" target="_blank" rel="noopener noreferrer"
                class="info-right">
                <i class="fa-solid fa-map-location-dot"></i>
                <span>Lokasi Sekolah</span>
            </a>
        </div>
    </div>

    <script src="{{ asset('assets/trophy/trophy-store.js') }}"></script>
    <script src="{{ asset('assets/navigation/navigasi.js') }}"></script>
    <script src="{{ asset('assets/chatbot/knowledge-base.js') }}"></script>
    <script src="{{ asset('assets/chatbot/chatbot.js') }}"></script>
    @yield('scripts')
</body>

</html>
