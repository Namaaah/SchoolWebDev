<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.home.home');
})->name('home');

Route::view('/join-us', 'pages.join-us')->name('join-us');
Route::view('/ruangan', 'pages.ruangan')->name('ruangan');

// Profile
Route::prefix('profil')->group(function () {
    Route::view('/sejarah', 'pages.profile.sejarah')->name('sejarah');
    Route::view('/visi-misi', 'pages.profile.visi-misi')->name('visi-misi');
    Route::view('/struktur-organisasi', 'pages.profile.struktur-organisasi')->name('struktur-organisasi');
    Route::view('/sarana-prasarana', 'pages.profile.sarana-prasarana')->name('sarana-prasarana');
    Route::view('/teaching-factory', 'pages.profile.teaching-factory')->name('teaching-factory');
});

// Informasi
Route::prefix('informasi')->group(function () {
    Route::view('/berita', 'pages.information.berita')->name('berita');
    Route::view('/prestasi', 'pages.information.prestasi')->name('prestasi');
    Route::view('/trophy', 'pages.information.trophy')->name('trophy');
    Route::view('/trophy-admin', 'pages.admin.trophy-admin')->name('trophy-admin');
    Route::view('/download', 'pages.information.download')->name('download');
    Route::view('/berkas-spmb', 'pages.information.berkas-spmb')->name('berkas-spmb');
    Route::view('/web-spmb', 'pages.information.web-spmb')->name('web-spmb');
});

// Program Keahlian
Route::prefix('jurusan')->group(function () {
    Route::view('/akl', 'pages.study-programs.akl')->name('akl');
    Route::view('/lps', 'pages.study-programs.lps')->name('lps');
    Route::view('/mp', 'pages.study-programs.mp')->name('mp');
    Route::view('/bisnis-ritel', 'pages.study-programs.bisnis-ritel')->name('bisnis-ritel');
    Route::view('/bisnis-digital', 'pages.study-programs.bisnis-digital')->name('bisnis-digital');
    Route::view('/rpl', 'pages.study-programs.rpl')->name('rpl');
    Route::view('/dkv', 'pages.study-programs.dkv')->name('dkv');
    Route::view('/tkj', 'pages.study-programs.tkj')->name('tkj');
});

// Lainnya
Route::view('/ekstrakurikuler', 'pages.other.ekstrakurikuler')->name('ekstrakurikuler');
Route::view('/organisasi-siswa', 'pages.other.organisasi-siswa')->name('organisasi-siswa');
