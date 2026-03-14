
import React from 'react';
import clsx from 'clsx';
import { Sun, Moon, CloudSun, Sunrise } from 'lucide-react';

interface PrayerTime {
    name: string;
    time: string | undefined | null; // HH:mm format
    isNext?: boolean;
    isPast?: boolean;
}

interface PrayerGridProps {
    prayers: PrayerTime[];
}

export const PrayerGrid: React.FC<PrayerGridProps> = ({ prayers }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 xl:gap-5 2xl:gap-6 w-full max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 pb-2 md:pb-6">
            {prayers.map((prayer) => (
                <PrayerCard key={prayer.name} prayer={prayer} />
            ))}
        </div>
    );
};

const PrayerCard = ({ prayer }: { prayer: PrayerTime }) => {
    const Icon = getIconForPrayer(prayer.name);

    return (
        <div className={clsx(
            "relative p-3 sm:p-5 md:p-6 xl:p-7 2xl:p-8 rounded-2xl sm:rounded-3xl 2xl:rounded-[32px] border transition-all duration-300 overflow-hidden group flex flex-col justify-between",
            prayer.isNext
                ? "bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.02]"
                : "bg-slate-800/40 border-white/5 hover:bg-slate-800/60"
        )}>
            {prayer.isNext && (
                <div className="absolute top-3 right-3 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]" />
                </div>
            )}

            <div className="flex justify-between items-center mb-3 sm:mb-4">
                <Icon className={clsx("w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8", prayer.isNext ? "text-emerald-400" : "text-slate-400")} />
                {prayer.isNext && (
                    <span className="px-1.5 py-0.5 xl:px-3 xl:py-1 rounded xl:rounded-md text-[9px] xl:text-xs font-bold bg-emerald-500 text-slate-900">NEXT</span>
                )}
                {!prayer.isNext && prayer.time && (
                    <span className="px-1.5 py-0.5 xl:px-2.5 xl:py-1 rounded xl:rounded-md text-[9px] sm:text-[10px] xl:text-xs font-medium bg-slate-700/50 text-slate-400 uppercase">
                        {parseInt(prayer.time) >= 12 ? 'PM' : 'AM'}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-[10px] sm:text-xs xl:text-sm 2xl:text-base font-semibold text-slate-400 tracking-wider uppercase mb-1 xl:mb-1.5">{prayer.name}</h3>
                <p className={clsx("text-xl sm:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight", prayer.isNext ? "text-white" : "text-slate-200")}>
                    {formatTime12Hour(prayer.time)}
                </p>
                {prayer.name === 'Maghrib' && prayer.isNext && (
                    <p className="text-[10px] sm:text-xs xl:text-sm text-emerald-400 mt-1.5 xl:mt-2 font-medium tracking-wide">IFTAR TIME</p>
                )}
            </div>

            {/* Green Glow for active card */}
            {prayer.isNext && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 rounded-b-3xl" />
            )}
        </div>
    );
};

// Helper Functions
const getIconForPrayer = (name: string) => {
    switch (name.toLowerCase()) {
        case 'fajr': return Sunrise;
        case 'syuruk': return Sun;
        case 'dhuhr': return Sun;
        case 'asr': return CloudSun;
        case 'maghrib': return Moon; // Sunset/Moon
        case 'isha': return Moon;
        default: return Sun;
    }
};

const formatTime12Hour = (time24: string | undefined | null) => {
    if (!time24 || typeof time24 !== 'string') return '--:--';
    const [h, m] = time24.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return time24;
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')}`;
};
