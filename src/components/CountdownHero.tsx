import React, { useState, useEffect, useRef } from 'react';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { MapPin, Sparkles, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { playIftarChime, sendIftarNotification } from '../utils/audio';

interface CountdownHeroProps {
    iftarTime: Date | null;
    fajrTime: Date | null;
    imsakTime: Date | null;
    tomorrowImsakTime?: Date | null;
    locationName?: string;
    hijriDate?: string;
    soundEnabled?: boolean;
    onToggleSound?: () => void;
    onOpenZoneModal?: () => void;
}

type Mode = 'iftar' | 'sahur' | 'celebration';

export const CountdownHero: React.FC<CountdownHeroProps> = ({
    iftarTime,
    fajrTime,
    imsakTime,
    tomorrowImsakTime,
    locationName,
    hijriDate,
    soundEnabled = true,
    onToggleSound,
    onOpenZoneModal,
}) => {
    const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [userModeOverride, setUserModeOverride] = useState<Mode | null>(null);
    const hasTriggeredChime = useRef<boolean>(false);

    // Determine default mode based on current time
    const currentMode: Mode = (() => {
        if (userModeOverride) return userModeOverride;
        if (!iftarTime) return 'iftar';

        const now = currentTime.getTime();
        const iftarMs = iftarTime.getTime();
        const celebrationEndMs = iftarMs + 30 * 60 * 1000; // 30 mins after Maghrib

        if (now >= iftarMs && now < celebrationEndMs) {
            return 'celebration';
        }
        if (now >= celebrationEndMs) {
            return 'sahur';
        }
        if (fajrTime && now < fajrTime.getTime()) {
            return 'sahur';
        }
        return 'iftar';
    })();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            if (currentMode === 'celebration') {
                setTimeLeft({ h: 0, m: 0, s: 0 });
                setProgress(100);
                return;
            }

            if (currentMode === 'iftar') {
                if (!iftarTime || !fajrTime) return;

                const totalDuration = iftarTime.getTime() - fajrTime.getTime();
                const elapsed = now.getTime() - fajrTime.getTime();
                const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
                setProgress(pct);

                if (now.getTime() >= iftarTime.getTime()) {
                    setTimeLeft({ h: 0, m: 0, s: 0 });
                    if (!hasTriggeredChime.current) {
                        hasTriggeredChime.current = true;
                        if (soundEnabled) {
                            playIftarChime();
                        }
                        sendIftarNotification(locationName);
                    }
                    return;
                }

                // Reset chime trigger if earlier in the day
                hasTriggeredChime.current = false;

                const h = differenceInHours(iftarTime, now);
                const m = differenceInMinutes(iftarTime, now) % 60;
                const s = differenceInSeconds(iftarTime, now) % 60;
                setTimeLeft({ h, m, s });
            } else if (currentMode === 'sahur') {
                // Countdown to tomorrow's Imsak / Sahur
                const targetImsak = tomorrowImsakTime || imsakTime;
                if (!targetImsak || !iftarTime) return;

                const totalDuration = targetImsak.getTime() - iftarTime.getTime();
                const elapsed = now.getTime() - iftarTime.getTime();
                const pct = totalDuration > 0
                    ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
                    : 50;
                setProgress(pct);

                if (now.getTime() >= targetImsak.getTime()) {
                    setTimeLeft({ h: 0, m: 0, s: 0 });
                    return;
                }

                const h = differenceInHours(targetImsak, now);
                const m = differenceInMinutes(targetImsak, now) % 60;
                const s = differenceInSeconds(targetImsak, now) % 60;
                setTimeLeft({ h, m, s });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [iftarTime, fajrTime, imsakTime, tomorrowImsakTime, currentMode, locationName, soundEnabled]);

    if (!timeLeft && currentMode !== 'celebration') {
        return <div className="animate-pulse h-48 md:h-64 w-full bg-slate-800/50 rounded-3xl" />;
    }

    return (
        <div className="relative w-full flex flex-col items-center justify-center py-1 sm:py-4 md:py-6 2xl:py-2">
            {/* Ambient Background Glow */}
            <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] md:w-[800px] h-[280px] sm:h-[500px] md:h-[800px] ${
                    currentMode === 'celebration'
                        ? 'bg-amber-500/15'
                        : currentMode === 'sahur'
                        ? 'bg-cyan-500/10'
                        : 'bg-emerald-500/10'
                } rounded-full blur-[60px] sm:blur-[100px] md:blur-[140px] -z-10 pointer-events-none transition-colors duration-700`}
            />

            <div className="relative z-10 text-center space-y-3 md:space-y-4 max-w-4xl mx-auto w-full px-2">
                {/* Header Badge & Dates */}
                <div className="flex flex-col items-center gap-1.5 sm:gap-3">
                    {/* Gregorian Date */}
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 tracking-[0.2em] uppercase">
                        {format(currentTime, 'EEEE, d MMMM yyyy')}
                    </p>

                    {/* Hijri Date Badge & Sound Toggle */}
                    <div className="flex items-center gap-2">
                        {hijriDate ? (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-emerald-500/5 backdrop-blur-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                                {hijriDate}
                            </span>
                        ) : (
                            <div className="h-6 w-32 bg-slate-800 animate-pulse rounded-full" />
                        )}

                        {onToggleSound && (
                            <button
                                onClick={onToggleSound}
                                title={soundEnabled ? 'Bunyi Notifikasi Diaktifkan' : 'Bunyi Notifikasi Dimatikan'}
                                className="p-1.5 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/10 transition-colors"
                            >
                                {soundEnabled ? (
                                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                    <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Current Browser Clock */}
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white tabular-nums tracking-tighter leading-none">
                        {format(currentTime, 'HH:mm:ss')}
                    </p>

                    {/* Location Badge (Clickable to change zone) */}
                    {locationName && (
                        <button
                            onClick={onOpenZoneModal}
                            className="group inline-flex items-center justify-center gap-1.5 text-slate-400 hover:text-emerald-300 text-[10px] sm:text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 transition-all max-w-full"
                        >
                            <MapPin className="w-3 h-3 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="truncate max-w-[220px] sm:max-w-md">{locationName}</span>
                            <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                Tukar
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Mode Switcher Pills */}
            <div className="flex items-center gap-1.5 mt-3 sm:mt-4 p-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <button
                    onClick={() => setUserModeOverride('iftar')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
                        currentMode === 'iftar'
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'text-slate-400 hover:text-white'
                    }`}
                >
                    <Sun className="w-3 h-3" />
                    Iftar
                </button>
                <button
                    onClick={() => setUserModeOverride('sahur')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
                        currentMode === 'sahur'
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-white'
                    }`}
                >
                    <Moon className="w-3 h-3" />
                    Sahur / Imsak
                </button>
            </div>

            {/* Celebration State */}
            {currentMode === 'celebration' ? (
                <div className="my-4 sm:my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-amber-950/40 to-emerald-950/80 border border-emerald-500/40 shadow-2xl text-center max-w-xl animate-in zoom-in-95 duration-500">
                    <span className="text-4xl sm:text-6xl block mb-2 animate-bounce">🎉 🍱</span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
                        Selamat Berbuka Puasa!
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                        Iftar Mubarak • Semoga amalan dan puasa kita diterima Allah SWT.
                    </p>
                </div>
            ) : (
                <>
                    {/* Header Title */}
                    <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 mt-2 sm:mt-3 tracking-tight text-center">
                        {currentMode === 'sahur' ? (
                            <>
                                Masa sehingga <span className="text-cyan-400 font-extrabold">Imsak / Sahur</span>
                            </>
                        ) : (
                            <>
                                Masa sehingga <span className="text-emerald-400 font-extrabold">Iftar</span>
                            </>
                        )}
                    </h2>

                    {/* Countdown Digits */}
                    {timeLeft && (
                        <div className="flex items-start gap-3 sm:gap-6 md:gap-8 lg:gap-10 transition-all duration-500">
                            <TimeUnit
                                value={timeLeft.h}
                                label="JAM"
                                color={currentMode === 'sahur' ? 'cyan' : 'emerald'}
                            />
                            <Separator />
                            <TimeUnit
                                value={timeLeft.m}
                                label="MINIT"
                                color={currentMode === 'sahur' ? 'cyan' : 'emerald'}
                            />
                            <Separator />
                            <TimeUnit
                                value={timeLeft.s}
                                label="SAAT"
                                color={currentMode === 'sahur' ? 'cyan' : 'emerald'}
                            />
                        </div>
                    )}

                    {/* Animated Progress Bar */}
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg xl:max-w-xl mt-4 sm:mt-6 px-4 transition-all duration-500">
                        <div className="flex justify-between text-[8px] sm:text-xs text-slate-400 font-semibold tracking-wider mb-1.5 uppercase">
                            <span>{currentMode === 'sahur' ? 'Maghrib' : 'Subuh'}</span>
                            <span className={currentMode === 'sahur' ? 'text-cyan-400' : 'text-emerald-400'}>
                                {progress.toFixed(0)}%
                            </span>
                            <span>{currentMode === 'sahur' ? 'Imsak' : 'Maghrib'}</span>
                        </div>
                        <div className="relative h-2.5 sm:h-3.5 bg-slate-800/80 rounded-full overflow-visible border border-white/10 shadow-inner">
                            {/* Progress Fill */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 ${
                                    currentMode === 'sahur'
                                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-400'
                                        : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                                } rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${progress}%` }}
                            />

                            {/* Runner / Moon Marker */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-10 flex flex-col items-center"
                                style={{ left: `${progress}%` }}
                            >
                                <span className="text-lg sm:text-2xl md:text-3xl filter drop-shadow-md transform -scale-x-100 inline-block">
                                    {currentMode === 'sahur' ? '🌙' : '🏃'}
                                </span>
                            </div>

                            {/* Target Icon */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-0">
                                <span className="text-base sm:text-xl md:text-2xl filter drop-shadow-md">
                                    {currentMode === 'sahur' ? '🥣' : '🍱'}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const TimeUnit = ({
    value,
    label,
    color = 'emerald',
}: {
    value: number;
    label: string;
    color?: 'emerald' | 'cyan';
}) => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-20 sm:w-24 sm:h-32 md:w-32 md:h-40 lg:w-40 lg:h-48 bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
                className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black ${
                    color === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                } tabular-nums tracking-tighter`}
            >
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="mt-1.5 sm:mt-2 text-[8px] sm:text-xs font-bold text-slate-500 tracking-widest uppercase">
            {label}
        </span>
    </div>
);

const Separator = () => (
    <div className="flex flex-col gap-1.5 sm:gap-3 py-4 sm:py-8 opacity-40">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-400" />
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-400" />
    </div>
);
