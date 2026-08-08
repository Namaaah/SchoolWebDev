@extends('layouts.app')

@section('title', 'Ruangan - SMK Negeri 1 Bantul')

@section('styles')
    <link rel="stylesheet" href="{{ asset('pages-assets/rooms/ruangan.css') }}">
@endsection

@section('content')
<main class="page-main">
    <div class="page-hero">
        <div class="page-hero-icon"><i class="fa-solid fa-door-open"></i></div>
        <h1 class="page-hero-title">Ruangan</h1>
        <p class="page-hero-subtitle">Fasilitas ruangan di SMK Negeri 1 Bantul</p>
    </div>
</main>
@endsection

@section('scripts')
    <script src="{{ asset('pages-assets/rooms/ruangan.js') }}"></script>
@endsection
