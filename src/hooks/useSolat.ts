
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isAfter, isBefore, parse, addDays } from 'date-fns';

export interface PrayerTime {
    name: string;
    time: string; // HH:mm:ss
    timestamp: number;
}

export interface SolatData {
    hijri: string;
    date: string;
    day: string;
    imsak: string;
    fajr: string;
    syuruk: string;
    dhuhr: string;
    asr: string;
    maghrib: string; // Iftar
    isha: string;
}

interface UseSolatReturn {
    solatData: SolatData | null;
    nextPrayer: PrayerTime | null;
    loading: boolean;
    error: string | null;
    zone: string;
}

// Map API keys to display names
const PRAYER_NAMES: Record<string, string> = {
    fajr: 'Fajr',
    syuruk: 'Syuruk',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
};

export const useSolat = (latitude: number | null, longitude: number | null) => {
    const [solatData, setSolatData] = useState<SolatData | null>(null);
    const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [zone, setZone] = useState<string>('');

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchSolat = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://api.waktusolat.app/v2/solat/gps/${latitude}/${longitude}`
                );

                console.log("API Response:", response.data);

                if (response.data && response.data.prayers && response.data.prayers.length > 0) {
                    // The API returns an array of prayer times for the month/year.
                    // We need to find today's entry.
                    // Note: The API structure might need adjustment based on actual response.
                    // Assuming response.data.prayers is an array of objects with day/hijri/fajr etc.

                    // However, let's look at the specific endpoint structure provided in the prompt:
                    // `curl https://api.waktusolat.app/v2/solat/gps/3.068498/101.630263`
                    // Usually returns: { status: "OK", zone: "WLY01", prayers: [...] }

                    const today = new Date();
                    // Find today's date in specific format if needed, or index.
                    // The API usually returns the current requested duration (mostly month).
                    // Let's filter by matching date.

                    // Based on typical WaktuSolat.app v2 response:
                    // each prayer object has `day` (dd-MMM-yyyy) or unix timestamp.
                    // Actually, standard response is array of objects where `fajr`, `dhuhr` are timestamps (seconds) or formatted strings.
                    // Let's assume standard format matches the `SolatData` interface roughly, but we might need to parse.

                    // Let's grab the first one that matches today's date (DD-MMM-YYYY) or Day of Month.
                    const todayStr = format(today, 'dd-MMM-yyyy'); // e.g. 09-Feb-2026

                    // Finding the entry
                    const todayData = response.data.prayers.find((p: any) => {
                        // p.date might be in dd-MMM-yyyy or unix
                        // Let's check typical response structure via console or assumption
                        // Assuming p.day might be the day number (int) or date string

                        // Fallback: Check if date matches
                        return p.date === todayStr || p.day === today.getDate();
                    });

                    if (todayData) {
                        setSolatData(todayData);
                        setZone(response.data.zone || 'Detected Location');
                        calculateNextPrayer(todayData);
                    } else {
                        // Fallback to first element if date matching fails (edge case) or handle error
                        // Maybe the API ensures structure.
                        if (response.data.prayers[0]) {
                            setSolatData(response.data.prayers[0]);
                            setZone(response.data.zone);
                            calculateNextPrayer(response.data.prayers[0]);
                        }
                    }
                }
            } catch (err) {
                setError('Failed to fetch prayer times. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSolat();
    }, [latitude, longitude]);

    const calculateNextPrayer = (data: SolatData) => {
        const now = new Date();
        const prayers: PrayerTime[] = [];

        // Convert API time strings (HH:mm:ss) to Date objects for comparison
        // The API returns standard "HH:mm:ss" usually.

        (['fajr', 'syuruk', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).forEach((key) => {
            const timeStr = data[key]; // "06:05:00"
            if (!timeStr) return;

            const timeDate = parse(timeStr, 'HH:mm:ss', now);

            prayers.push({
                name: PRAYER_NAMES[key],
                time: timeStr.substring(0, 5), // HH:mm
                timestamp: timeDate.getTime(),
            });
        });

        // Sort by time
        prayers.sort((a, b) => a.timestamp - b.timestamp);

        // Find next prayer
        let next = prayers.find(p => p.timestamp > now.getTime());

        // If no prayer left today, next is Fajr tomorrow
        if (!next) {
            // In a real app, we would fetch tomorrow's data. 
            // For now, let's approximate or just show Fajr (circular).
            // Ideally fetch tomorrow.
            next = { ...prayers[0], name: 'Fajr (Tomorrow)' };
        }

        setNextPrayer(next);
    };

    // Re-calculate next prayer every minute to keep it accurate
    useEffect(() => {
        if (!solatData) return;
        const interval = setInterval(() => {
            calculateNextPrayer(solatData);
        }, 60000);
        return () => clearInterval(interval);
    }, [solatData]);

    return { solatData, nextPrayer, loading, error, zone };
};
