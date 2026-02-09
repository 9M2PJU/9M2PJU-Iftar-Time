# 9M2PJU Iftar Time

A modern, beautiful PWA for checking Iftar and prayer times, designed with a premium dark Islamic aesthetic.

## Features
- **Accurate Iftar Countdown**: Big, clear timer to Maghrib.
- **Geolocation**: Automatically detects your zone and fetches data from `waktusolat.app`.
- **Prayer Times**: Grid view of all prayer times (Fajr, Syuruk, Dhuhr, Asr, Maghrib, Isha).
- **PWA Support**: Installable on Desktop and Mobile.
- **Offline Capable**: Works without internet after initial load.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   - Ensure `vite.config.ts` has the correct `base` URL (currently `/9M2PJU-Iftar-Time/`).
   - Push to GitHub.
   - Go to Settings > Pages > Source: `gh-pages` branch (or configure Actions).

## Tech Stack
- React + TypeScript + Vite
- TailwindCSS (v4)
- Framer Motion
- date-fns
- Lucide React
