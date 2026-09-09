export type Language = 'en' | 'ms';

export interface TranslationStrings {
    navbar: {
        tagline: string;
        zone: string;
        takwim: string;
        doa: string;
        about: string;
        soundOn: string;
        soundOff: string;
    };
    hero: {
        timeUntilIftar: string;
        timeUntilSahur: string;
        iftar: string;
        sahur: string;
        hours: string;
        minutes: string;
        seconds: string;
        change: string;
        iftarCelebration: string;
        iftarCelebrationSub: string;
        fajr: string;
        maghrib: string;
        imsak: string;
        modeIftar: string;
        modeSahur: string;
        azanPlaying: string;
        stopAzan: string;
        testAzan: string;
    };
    prayers: {
        imsak: string;
        fajr: string;
        syuruk: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        next: string;
        iftarTag: string;
    };
    zoneModal: {
        title: string;
        subtitle: string;
        useGps: string;
        searchPlaceholder: string;
        allStates: string;
        clear: string;
        noResults: string;
    };
    takwimModal: {
        title: string;
        day: string;
        hijriDate: string;
        imsak: string;
        fajr: string;
        syuruk: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        noSchedule: string;
    };
    doaModal: {
        title: string;
        subtitle: string;
        copyText: string;
        sourcePrefix: string;
    };
    aboutModal: {
        tagline: string;
        desc: string;
        developedBy: string;
        visit: string;
        supportTitle: string;
        supportDesc: string;
        scanPrompt: string;
        backToApp: string;
    };
    footer: {
        poweredBy: string;
        builtBy: string;
    };
    error: {
        locationDenied: string;
        fetchFailed: string;
        selectZone: string;
        loading: string;
    };
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
    en: {
        navbar: {
            tagline: 'MODERN COMPANION DURING RAMADHAN',
            zone: 'Zone',
            takwim: 'Monthly',
            doa: "Du'a",
            about: 'About & Infaq',
            soundOn: 'Sound & Azan enabled',
            soundOff: 'Sound & Azan muted',
        },
        hero: {
            timeUntilIftar: 'Time until',
            timeUntilSahur: 'Time until',
            iftar: 'Iftar',
            sahur: 'Imsak / Sahur',
            hours: 'HOURS',
            minutes: 'MINUTES',
            seconds: 'SECONDS',
            change: 'Change',
            iftarCelebration: 'Selamat Berbuka Puasa!',
            iftarCelebrationSub: 'Iftar Mubarak • May our fast and good deeds be accepted by Allah SWT.',
            fajr: 'Fajr',
            maghrib: 'Maghrib',
            imsak: 'Imsak',
            modeIftar: 'Iftar',
            modeSahur: 'Sahur / Imsak',
            azanPlaying: 'Playing Azan Maghrib',
            stopAzan: 'Stop Azan',
            testAzan: 'Test Azan',
        },
        prayers: {
            imsak: 'Imsak',
            fajr: 'Fajr',
            syuruk: 'Syuruk',
            dhuhr: 'Dhuhr',
            asr: 'Asr',
            maghrib: 'Maghrib',
            isha: 'Isha',
            next: 'NEXT',
            iftarTag: 'IFTAR 🌙',
        },
        zoneModal: {
            title: 'Select Prayer Zone',
            subtitle: 'Official JAKIM prayer zones across Malaysia',
            useGps: 'Use My Current Location (GPS Auto-Detect)',
            searchPlaceholder: 'Search district, state, or zone code (e.g. Shah Alam, SGR01)...',
            allStates: 'All States',
            clear: 'Clear',
            noResults: 'No zones found matching',
        },
        takwimModal: {
            title: 'Monthly Prayer Times Schedule',
            day: 'Day',
            hijriDate: 'Hijri Date',
            imsak: 'Imsak',
            fajr: 'Fajr',
            syuruk: 'Syuruk',
            dhuhr: 'Dhuhr',
            asr: 'Asr',
            maghrib: 'Maghrib (Iftar)',
            isha: 'Isha',
            noSchedule: 'No schedule loaded. Please check your internet connection.',
        },
        doaModal: {
            title: "Ramadhan Du'a & Intentions",
            subtitle: 'Guide to fasting intentions and Iftar supplications',
            copyText: 'Copy Text',
            sourcePrefix: 'Source:',
        },
        aboutModal: {
            tagline: 'MODERN COMPANION DURING RAMADHAN',
            desc: 'An accurate prayer times and real-time Iftar / Sahur countdown companion based on official JAKIM Malaysia prayer zones.',
            developedBy: 'DEVELOPED BY',
            visit: 'Visit',
            supportTitle: 'Support & Infaq (Sadaqah)',
            supportDesc: 'Help support server hosting and future development.',
            scanPrompt: 'DuitNow QR / Scan to Donate',
            backToApp: 'Back to App',
        },
        footer: {
            poweredBy: 'Powered by official JAKIM data via waktusolat.app',
            builtBy: 'Built by',
        },
        error: {
            locationDenied: 'Location access denied. Please select your zone manually.',
            fetchFailed: 'Failed to fetch prayer times. Please check your internet connection.',
            selectZone: 'Select Zone',
            loading: 'Loading Prayer Times...',
        },
    },
    ms: {
        navbar: {
            tagline: 'TEMAN MODEN KETIKA RAMADHAN',
            zone: 'Zon',
            takwim: 'Takwim',
            doa: 'Doa',
            about: 'Tentang & Infaq',
            soundOn: 'Bunyi & Azan diaktifkan',
            soundOff: 'Bunyi & Azan dimatikan',
        },
        hero: {
            timeUntilIftar: 'Masa sehingga',
            timeUntilSahur: 'Masa sehingga',
            iftar: 'Iftar',
            sahur: 'Imsak / Sahur',
            hours: 'JAM',
            minutes: 'MINIT',
            seconds: 'SAAT',
            change: 'Tukar',
            iftarCelebration: 'Selamat Berbuka Puasa!',
            iftarCelebrationSub: 'Iftar Mubarak • Semoga amalan dan puasa kita diterima Allah SWT.',
            fajr: 'Subuh',
            maghrib: 'Maghrib',
            imsak: 'Imsak',
            modeIftar: 'Iftar',
            modeSahur: 'Sahur / Imsak',
            azanPlaying: 'Azan Maghrib Berkumandang',
            stopAzan: 'Hentikan Azan',
            testAzan: 'Dengar Azan',
        },
        prayers: {
            imsak: 'Imsak',
            fajr: 'Subuh',
            syuruk: 'Syuruk',
            dhuhr: 'Zohor',
            asr: 'Asar',
            maghrib: 'Maghrib',
            isha: 'Isyak',
            next: 'SETERUSNYA',
            iftarTag: 'IFTAR 🌙',
        },
        zoneModal: {
            title: 'Pilih Zon Waktu Solat',
            subtitle: 'Senarai rasmi zon JAKIM seluruh Malaysia',
            useGps: 'Guna Lokasi Semasa Saya (GPS Auto-Detect)',
            searchPlaceholder: 'Cari daerah, negeri, atau kod zon (cth: Shah Alam, SGR01)...',
            allStates: 'Semua Negeri',
            clear: 'Padam',
            noResults: 'Tiada zon ditemui untuk',
        },
        takwimModal: {
            title: 'Takwim Waktu Solat Sebulan',
            day: 'Hari',
            hijriDate: 'Tarikh Hijri',
            imsak: 'Imsak',
            fajr: 'Subuh',
            syuruk: 'Syuruk',
            dhuhr: 'Zohor',
            asr: 'Asar',
            maghrib: 'Maghrib (Iftar)',
            isha: 'Isyak',
            noSchedule: 'Tiada jadual dimuatkan. Sila semak sambungan internet.',
        },
        doaModal: {
            title: 'Doa & Niat Ramadhan',
            subtitle: 'Panduan lafaz niat dan doa berbuka puasa',
            copyText: 'Salin Teks',
            sourcePrefix: 'Sumber:',
        },
        aboutModal: {
            tagline: 'TEMAN MODEN KETIKA RAMADHAN',
            desc: 'Aplikasi panduan waktu solat dan kiraan detik waktu berbuka puasa / sahur tepat berasaskan zon rasmi JAKIM Malaysia.',
            developedBy: 'DIBANGUNKAN OLEH',
            visit: 'Lawati',
            supportTitle: 'Infaq & Sokongan',
            supportDesc: 'Sokong penyelenggaraan pelayan dan pembangunan aplikasi ini.',
            scanPrompt: 'DuitNow QR / Scan untuk Infaq',
            backToApp: 'Kembali ke Aplikasi',
        },
        footer: {
            poweredBy: 'Dikuasakan oleh data rasmi JAKIM melalui waktusolat.app',
            builtBy: 'Dibina oleh',
        },
        error: {
            locationDenied: 'Akses lokasi ditolak. Sila pilih zon anda secara manual.',
            fetchFailed: 'Gagal memuatkan waktu solat. Sila semak sambungan internet anda.',
            selectZone: 'Pilih Zon',
            loading: 'Memuatkan Waktu Solat...',
        },
    },
};
