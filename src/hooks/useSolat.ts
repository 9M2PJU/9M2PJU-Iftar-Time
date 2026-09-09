import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { getZoneName } from '../utils/zones';

export interface PrayerTime {
    name: string;
    time: string; // HH:mm format for display
    timestamp: number;
    isTomorrow?: boolean;
}

export interface SolatData {
    hijri: string;
    date?: string;
    day: number;
    imsak: number;
    fajr: number;
    syuruk: number;
    dhuha?: number;
    dhuhr: number;
    asr: number;
    maghrib: number; // Iftar
    isha: number;
}

export interface SolatApiResponse {
    zone: string;
    year: number;
    month: string;
    month_number: number;
    prayers: SolatData[];
}

// Map API keys to display names
const PRAYER_NAMES: Record<string, string> = {
    imsak: 'Imsak',
    fajr: 'Fajr',
    syuruk: 'Syuruk',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
};

const CACHE_PREFIX = 'iftar_solat_cache_';
const CACHE_LAST_ZONE = 'iftar_last_zone_code';

export const useSolat = (
    latitude: number | null,
    longitude: number | null,
    manualZoneCode: string | null = null
) => {
    const [solatData, setSolatData] = useState<SolatData | null>(null);
    const [tomorrowData, setTomorrowData] = useState<SolatData | null>(null);
    const [monthlyPrayers, setMonthlyPrayers] = useState<SolatData[]>([]);
    const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [zone, setZone] = useState<string>('');
    const [zoneCode, setZoneCode] = useState<string>('');

    const monthlyPrayersRef = useRef<SolatData[]>([]);
    monthlyPrayersRef.current = monthlyPrayers;

    const calculateNextPrayer = useCallback((today: SolatData, tomorrow: SolatData | null) => {
        const now = new Date();
        const prayers: PrayerTime[] = [];

        try {
            (['fajr', 'syuruk', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).forEach((key) => {
                const timestamp = today[key];
                if (!timestamp) return;

                const timeMs = timestamp * 1000;
                const dateObj = new Date(timeMs);
                const hours = dateObj.getHours().toString().padStart(2, '0');
                const minutes = dateObj.getMinutes().toString().padStart(2, '0');

                prayers.push({
                    name: PRAYER_NAMES[key] || key,
                    time: `${hours}:${minutes}`,
                    timestamp: timeMs,
                    isTomorrow: false,
                });
            });

            prayers.sort((a, b) => a.timestamp - b.timestamp);

            let next = prayers.find((p) => p.timestamp > now.getTime());

            if (!next && prayers.length > 0) {
                // If past Isha, next prayer is tomorrow's Fajr
                const tomorrowFajrMs = tomorrow?.fajr
                    ? tomorrow.fajr * 1000
                    : prayers[0].timestamp + 24 * 60 * 60 * 1000;

                const tomorrowDateObj = new Date(tomorrowFajrMs);
                const th = tomorrowDateObj.getHours().toString().padStart(2, '0');
                const tm = tomorrowDateObj.getMinutes().toString().padStart(2, '0');

                next = {
                    name: 'Fajr',
                    time: `${th}:${tm}`,
                    timestamp: tomorrowFajrMs,
                    isTomorrow: true,
                };
            }

            setNextPrayer(next || null);
        } catch (err) {
            console.error('Error calculating next prayer:', err);
        }
    }, []);

    const findAndSetDayData = useCallback(
        (prayers: SolatData[]) => {
            if (!prayers || prayers.length === 0) return;

            const now = new Date();
            const currentDay = now.getDate();

            // 1. Match by day number
            let todayIdx = prayers.findIndex((p) => p.day === currentDay);

            // 2. Fallback: match by timestamp range if day index not aligned
            if (todayIdx === -1) {
                const nowSec = Math.floor(now.getTime() / 1000);
                todayIdx = prayers.findIndex((p) => {
                    const dayStart = p.imsak - 7200; // rough start
                    const dayEnd = p.isha + 7200;
                    return nowSec >= dayStart && nowSec <= dayEnd;
                });
            }

            if (todayIdx === -1) {
                todayIdx = 0;
            }

            const today = prayers[todayIdx];
            const tomorrow = prayers[todayIdx + 1] || null;

            setSolatData(today);
            setTomorrowData(tomorrow);
            calculateNextPrayer(today, tomorrow);
        },
        [calculateNextPrayer]
    );

    // Load initial cached data from localStorage if available
    useEffect(() => {
        try {
            const savedZone = manualZoneCode || localStorage.getItem(CACHE_LAST_ZONE) || 'WLY01';
            const cached = localStorage.getItem(`${CACHE_PREFIX}${savedZone}`);
            if (cached) {
                const parsed: SolatApiResponse = JSON.parse(cached);
                if (parsed.prayers && parsed.prayers.length > 0) {
                    setZoneCode(parsed.zone || savedZone);
                    setZone(getZoneName(parsed.zone || savedZone));
                    setMonthlyPrayers(parsed.prayers);
                    findAndSetDayData(parsed.prayers);
                }
            }
        } catch {
            // Ignore cache read errors
        }
    }, [manualZoneCode, findAndSetDayData]);

    const fetchSolat = useCallback(async () => {
        // If no GPS and no manual zone, wait
        if (!manualZoneCode && (!latitude || !longitude)) return;

        setLoading(true);
        setError(null);

        const url = manualZoneCode
            ? `https://api.waktusolat.app/v2/solat/${manualZoneCode}`
            : `https://api.waktusolat.app/v2/solat/gps/${latitude}/${longitude}`;

        try {
            const response = await axios.get<SolatApiResponse>(url, { timeout: 12000 });
            if (response.data && response.data.prayers && response.data.prayers.length > 0) {
                const currentZoneCode = response.data.zone || manualZoneCode || 'WLY01';
                setZoneCode(currentZoneCode);
                setZone(getZoneName(currentZoneCode) || 'Detected Location');
                setMonthlyPrayers(response.data.prayers);

                // Save to localStorage for offline access
                try {
                    localStorage.setItem(`${CACHE_PREFIX}${currentZoneCode}`, JSON.stringify(response.data));
                    localStorage.setItem(CACHE_LAST_ZONE, currentZoneCode);
                } catch {
                    // Ignore quota errors
                }

                findAndSetDayData(response.data.prayers);
            }
        } catch (err) {
            console.warn('Failed to fetch online prayer times, using cache if available', err);
            // Check fallback from cache
            const targetCode = manualZoneCode || localStorage.getItem(CACHE_LAST_ZONE) || 'WLY01';
            const cached = localStorage.getItem(`${CACHE_PREFIX}${targetCode}`);
            if (cached) {
                try {
                    const parsed: SolatApiResponse = JSON.parse(cached);
                    setZoneCode(parsed.zone || targetCode);
                    setZone(getZoneName(parsed.zone || targetCode));
                    setMonthlyPrayers(parsed.prayers);
                    findAndSetDayData(parsed.prayers);
                    setError(null);
                } catch {
                    setError('Gagal memuatkan waktu solat. Sila semak sambungan internet anda.');
                }
            } else {
                setError('Gagal memuatkan waktu solat. Sila semak sambungan internet anda.');
            }
        } finally {
            setLoading(false);
        }
    }, [latitude, longitude, manualZoneCode, findAndSetDayData]);

    useEffect(() => {
        fetchSolat();
    }, [fetchSolat]);

    // Recalculate next prayer and check midnight date rollover every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (monthlyPrayersRef.current.length > 0) {
                findAndSetDayData(monthlyPrayersRef.current);
            } else if (solatData) {
                calculateNextPrayer(solatData, tomorrowData);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [solatData, tomorrowData, findAndSetDayData, calculateNextPrayer]);

    return {
        solatData,
        tomorrowData,
        monthlyPrayers,
        nextPrayer,
        loading,
        error,
        zone,
        zoneCode,
        refetch: fetchSolat,
    };
};
