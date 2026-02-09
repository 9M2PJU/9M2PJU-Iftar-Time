
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-4xl mx-auto px-4">
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
            "relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden group",
            prayer.isNext
                ? "bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.02]"
                : "bg-slate-800/40 border-white/5 hover:bg-slate-800/60"
        )}>
            {prayer.isNext && (
                <div className="absolute top-3 right-3 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]" />
                </div>
            )}

            <div className="flex justify-between items-center mb-3">
                <Icon className={clsx("w-5 h-5", prayer.isNext ? "text-emerald-400" : "text-slate-400")} />
                {prayer.isNext && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-slate-900">NEXT</span>
                )}
                {!prayer.isNext && prayer.time && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700/50 text-slate-400 uppercase">
                        {parseInt(prayer.time) >= 12 ? 'PM' : 'AM'}
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-0.5">{prayer.name}</h3>
                <p className={clsx("text-xl font-bold tracking-tight", prayer.isNext ? "text-white" : "text-slate-200")}>
                    {formatTime12Hour(prayer.time)}
                </p>
                {prayer.name === 'Maghrib' && prayer.isNext && (
                    <p className="text-[10px] text-emerald-400 mt-2 font-medium tracking-wide">IFTAR TIME</p>
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
