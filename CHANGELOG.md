# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-09-10

### 🚀 New Features & Enhancements
- **Manual Zone Selector Modal**: Searchable zone picker grouped by Malaysian State (*Negeri*) and District (*Daerah*) covering all JAKIM zones with instant search and GPS auto-detect fallback.
- **Dynamic Dual-Mode Hero Countdown**:
  - Automatically switches between **Iftar Mode** (daytime), **Celebration Banner** (Maghrib window), and **Sahur/Imsak Mode** (nighttime).
  - Manual switcher pill to toggle between Iftar and Sahur countdowns at any time.
- **Takwim Ramadhan (Jadual Waktu Solat Sebulan)**: Full month prayer times table modal with current day highlighting and responsive layout.
- **Panduan Doa & Niat Ramadhan**: Reference modal for *Niat Puasa Ramadhan* (Harian & Sebulan) and *Doa Berbuka Puasa* with Arabic, Rumi, Bahasa Melayu translation, and one-click copy.
- **Web Audio Iftar Chime & Web Notifications**: Harmonic synthesizer chime and browser notification triggered when Iftar arrives with persistent sound toggle.
- **12-Hour / 24-Hour Format Switcher**: Quick toggle in navbar to switch between 12h (AM/PM) and 24h formats with localStorage persistence.
- **Infaq & Sadaqah Modal**: Connected About modal with DuitNow QR and developer links, removing premature auto-closing timer.

### 🐛 Bug Fixes & Code Quality
- Fixed ESLint errors (`react-hooks/static-components`, explicit `any` types, unused variables).
- Fixed next-prayer highlighting after Isha (properly matching tomorrow's Fajr).
- Fixed offline support by caching full-month prayer data in `localStorage` alongside Workbox Service Worker runtime caching.
- Resolved midnight rollover bug by periodically checking and refreshing day data.
- Removed unused dead code (`useViewportScale.ts`).
- Fixed favicon and PWA manifest asset references.
- Added automated unit test suite with Vitest and updated GitHub Actions CI/CD pipeline.

---

## [1.0.0] - 2026-02-09

### 🚀 Launched
- Initial release of **9M2PJU Iftar Time**.
- **Modern UI**: Dark theme with Emerald/Cyan accents.
- **Core Features**:
    - Automatic zone detection.
    - Accurate prayer times fetch from `waktusolat.app`.
    - Real-time countdown to Iftar.
    - Dynamic Hijri date display.

### ✨ Polish & Enhancements
- **Layout**: "Perfect Fit" responsive design.
- **Performance**: PWA Service Worker for offline capability.

---
