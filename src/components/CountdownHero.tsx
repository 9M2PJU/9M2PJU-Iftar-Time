
import React, { useState, useEffect } from 'react';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { MapPin } from 'lucide-react';

interface CountdownHeroProps {
    iftarTime: Date | null;
    fajrTime: Date | null;
    locationName?: string;
    hijriDate?: string;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({ iftarTime, fajrTime, locationName, hijriDate }) => {
    const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        if (!iftarTime || !fajrTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // Progress Calculation
            const totalDuration = iftarTime.getTime() - fajrTime.getTime();
            const elapsed = now.getTime() - fajrTime.getTime();
            const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
            setProgress(pct);

            if (now >= iftarTime) {
                setTimeLeft({ h: 0, m: 0, s: 0 }); // Iftar time reached!
                return;
            }

            const h = differenceInHours(iftarTime, now);
            const m = differenceInMinutes(iftarTime, now) % 60;
            const s = differenceInSeconds(iftarTime, now) % 60;

            setTimeLeft({ h, m, s });
        }, 1000);

        return () => clearInterval(interval);
    }, [iftarTime, fajrTime]);

    if (!timeLeft) return <div className="animate-pulse h-48 md:h-64 w-full bg-slate-800/50 rounded-3xl" />;

    return (
        <div className="relative w-full flex flex-col items-center justify-center py-1 sm:py-6 md:py-10 2xl:py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px] md:w-[800px] h-[240px] sm:h-[500px] md:h-[800px] bg-emerald-500/10 rounded-full blur-[50px] sm:blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />



            <div className="relative z-10 text-center space-y-4 md:space-y-4 max-w-4xl mx-auto">

                {/* Header Badge & Dates */}
                <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100 flex flex-col items-center gap-1.5 sm:gap-4">
                    {/* Gregorian Date */}
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-[0.2em] uppercase">
                        {format(currentTime, 'EEEE, d MMMM yyyy')}
                    </p>

                    {/* Hijri Date Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-base font-bold tracking-wide shadow-lg shadow-emerald-500/5 backdrop-blur-sm">
                        {hijriDate || '24 Ramadan 1447'}
                    </span>

                    {/* Current Browser Time */}
                    <p className="text-xl sm:text-3xl font-black text-white tabular-nums tracking-tighter glow-text-sm leading-none">
                        {format(currentTime, 'HH:mm:ss')}
                    </p>

                    {locationName && (
                        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[10px] sm:text-sm font-medium tracking-wider uppercase animate-in fade-in slide-in-from-top-2 duration-700 delay-200 px-4 text-center leading-relaxed">
                            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500/50 shrink-0" />
                            <span className="truncate max-w-[250px] sm:max-w-none">{locationName}</span>
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-base sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 sm:mb-6 md:mb-4 2xl:mb-2 mt-2 sm:mt-4 md:mt-4 2xl:mt-1 tracking-tight text-center transition-all duration-700">
                Time until <span className="text-emerald-400">Iftar</span>
            </h2>

            <div className="flex items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-10 2xl:gap-8 transition-all duration-500">
                <TimeUnit value={timeLeft.h} label="HOURS" />
                <Separator />
                <TimeUnit value={timeLeft.m} label="MINUTES" />
                <Separator />
                <TimeUnit value={timeLeft.s} label="SECONDS" />
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mt-6 sm:mt-8 md:mt-4 2xl:mt-2 px-4 transition-all duration-500">
                <div className="flex justify-between text-[8px] sm:text-xs xl:text-sm 2xl:text-base text-slate-400 font-medium tracking-wider mb-1 xl:mb-3 uppercase">
                    <span>Fajr</span>
                    <span>{progress.toFixed(0)}%</span>
                    <span>Maghrib</span>
                </div>
                <div className="relative h-3 lg:h-4 2xl:h-5 bg-slate-800/50 rounded-full overflow-visible border border-white/5">
                    {/* Progress Fill */}
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />

                    {/* Running Person Emoji Marker */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-10 flex flex-col items-center"
                        style={{ left: `${progress}%` }}
                    >
                        <div className="relative">
                            <span className="text-xl sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl filter drop-shadow-lg transform -scale-x-100 inline-block animate-bounce-slight">🏃</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-sm rounded-full" />
                        </div>
                    </div>

                    {/* Food Target at the end */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 z-0">
                        <span className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl filter drop-shadow-lg">🍱</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-16 h-24 sm:w-28 sm:h-36 md:w-36 md:h-48 lg:w-44 lg:h-56 xl:w-48 xl:h-56 2xl:w-52 2xl:h-60 bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-[32px] 2xl:rounded-[32px] flex items-center justify-center shadow-2xl relative overflow-hidden group transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-[8rem] font-bold text-emerald-400 tabular-nums tracking-tighter glow-text">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="mt-2 sm:mt-3 xl:mt-3 text-[9px] sm:text-xs md:text-sm xl:text-sm 2xl:text-base font-semibold text-slate-500 tracking-widest">{label}</span>
    </div>
);

const Separator = () => (
    <div className="flex flex-col gap-1.5 sm:gap-4 md:gap-6 py-4 sm:py-10 md:py-20 opacity-50">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400" />
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400" />
    </div>
);
