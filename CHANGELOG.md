# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-09-10

### 🎨 Design & Audio Enhancements
- **Redesigned Official Logo & Icons**:
  - Replaced legacy emblem with an Islamic vector logo featuring a modern crescent (*Hilal*), mosque dome, minaret spire, and radiant 8-point gold sparkle star.
  - Generated crisp multi-resolution assets: `icon.svg`, `pwa-512x512.png`, `pwa-192x192.png`, `apple-touch-icon.png`, and `favicon.ico`.
  - Created reusable `<Logo />` React component.
- **Azan Maghrib Playback at Iftar**:
  - Added authentic Azan Maghrib audio playback triggered automatically when countdown reaches 00:00:00.
  - Added live audio wave visualizer and **"Stop Azan"** controller.
  - Added **"Test Azan"** button to preview playback.
- **Bilingual Support (English Default & Bahasa Melayu)**:
  - English interface set as default.
  - Added one-click **EN / BM** switcher in navbar with `localStorage` persistence.
  - Provided proper standard Bahasa Melayu translations across all UI components and modals.

---

## [1.1.0] - 2026-09-10

### 🚀 Features & Stability
- **Manual Zone Selector Modal**: Searchable zone picker grouped by Malaysian State and District covering all JAKIM zones.
- **Dynamic Dual-Mode Hero Countdown**: Auto-switching between Iftar mode, Iftar celebration banner, and Sahur/Imsak mode.
- **Takwim Ramadhan**: Full month prayer times table modal with current day highlighting.
- **Panduan Doa & Niat Ramadhan**: Du'a guide for fasting intentions and breaking fast.
- **PWA Offline Mode**: LocalStorage cache and Workbox service worker runtime caching.
- **Unit Testing Suite**: Added Vitest test suite and CI workflow verification.

---

## [1.0.0] - 2026-02-09

### 🚀 Launched
- Initial release of **9M2PJU Iftar Time**.
- Modern dark theme with Emerald/Cyan accents.
- Core prayer times fetching from `waktusolat.app`.

---
