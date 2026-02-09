
import React, { useState, useEffect } from 'react';
import { differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { MapPin } from 'lucide-react';

interface CountdownHeroProps {
    iftarTime: Date | null;
    locationName?: string;
    hijriDate?: string;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({ iftarTime, locationName, hijriDate }) => {
    const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        if (!iftarTime) return;

        const interval = setInterval(() => {
            const now = new Date();
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
    }, [iftarTime]);

    if (!timeLeft) return <div className="animate-pulse h-48 w-full bg-slate-800/50 rounded-3xl" />;

    return (
        <div className="relative w-full flex flex-col items-center justify-center py-6 md:py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />



            <div className="relative z-10 text-center space-y-6 md:space-y-4 max-w-4xl mx-auto">

                {/* Header Badge */}
                <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100 flex flex-col items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide shadow-lg shadow-emerald-500/5 backdrop-blur-sm">
                        {hijriDate || format(new Date(), 'd MMMM yyyy')}
                    </span>

                    {locationName && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs md:text-sm font-medium tracking-wider uppercase animate-in fade-in slide-in-from-top-2 duration-700 delay-200">
                            <MapPin className="w-3.5 h-3.5 text-emerald-500/50" />
                            <span>{locationName}</span>
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-6 tracking-tight">
                Time until <span className="text-emerald-400">Iftar</span>
            </h2>

            <div className="flex items-start gap-4 md:gap-8">
                <TimeUnit value={timeLeft.h} label="HOURS" />
                <Separator />
                <TimeUnit value={timeLeft.m} label="MINUTES" />
                <Separator />
                <TimeUnit value={timeLeft.s} label="SECONDS" />
            </div>

            <div className="bg-emerald-900/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider mt-8 border border-emerald-500/20">
                FAST PROGRESS: 75% COMPLETE
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="w-24 h-28 md:w-32 md:h-36 bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-5xl md:text-7xl font-bold text-emerald-400 tabular-nums tracking-tighter glow-text">
                {value.toString().padStart(2, '0')}
            </span>
        </div>
        <span className="mt-4 text-xs md:text-sm font-semibold text-slate-500 tracking-widest">{label}</span>
    </div>
);

const Separator = () => (
    <div className="flex flex-col gap-3 py-8 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
    </div>
);
