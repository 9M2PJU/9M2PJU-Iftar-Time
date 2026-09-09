import React from 'react';
import clsx from 'clsx';
import { Sun, Moon, CloudSun, Sunrise, Sunset, Clock } from 'lucide-react';

export interface PrayerTimeItem {
    name: string;
    displayName?: string;
    time: string | undefined | null; // HH:mm format
    isNext?: boolean;
    isIftar?: boolean;
}

interface PrayerGridProps {
    prayers: PrayerTimeItem[];
    is24Hour?: boolean;
}

const PRAYER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    imsak: Clock,
    fajr: Sunrise,
    subuh: Sunrise,
    syuruk: Sun,
    dhuhr: Sun,
    zohor: Sun,
    asr: CloudSun,
    asar: CloudSun,
    maghrib: Sunset,
    isha: Moon,
    isyak: Moon,
};

const formatDisplayTime = (time24: string | undefined | null, is24Hour: boolean) => {
    if (!time24 || typeof time24 !== 'string') return '--:--';
    if (is24Hour) return time24;

    const [hStr, mStr] = time24.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m)) return time24;

    const h12 = h % 12 || 12;
    return `${h12}:${mStr.padStart(2, '0')}`;
};

const getAmPm = (time24: string | undefined | null) => {
    if (!time24 || typeof time24 !== 'string') return '';
    const h = parseInt(time24.split(':')[0], 10);
    if (isNaN(h)) return '';
    return h >= 12 ? 'PM' : 'AM';
};

const PrayerCard: React.FC<{ prayer: PrayerTimeItem; is24Hour: boolean }> = ({ prayer, is24Hour }) => {
    const key = prayer.name.toLowerCase();
    const IconComponent = PRAYER_ICONS[key] || Sun;

    return (
        <div
            className={clsx(
                "relative p-2.5 sm:p-4 md:p-5 xl:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[90px] sm:min-h-0 select-none",
                prayer.isNext
                    ? "bg-gradient-to-b from-slate-900 to-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.02] ring-1 ring-emerald-400/50"
                    : "bg-slate-800/40 border-white/5 hover:bg-slate-800/60"
            )}
        >
            {prayer.isNext && (
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                </div>
            )}

            <div className="flex justify-between items-center mb-2 sm:mb-3">
                <IconComponent
                    className={clsx(
                        "w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6",
                        prayer.isNext ? "text-emerald-400" : "text-slate-400"
                    )}
                />
                {prayer.isNext ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-extrabold bg-emerald-500 text-slate-950 uppercase tracking-wider">
                        SETERUSNYA
                    </span>
                ) : (
                    prayer.time && !is24Hour && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold bg-slate-700/50 text-slate-400 uppercase">
                            {getAmPm(prayer.time)}
                        </span>
                    )
                )}
            </div>

            <div className="mt-auto">
                <h3 className="text-[9px] sm:text-xs font-semibold text-slate-400 tracking-wider uppercase mb-0.5 truncate">
                    {prayer.displayName || prayer.name}
                </h3>
                <p
                    className={clsx(
                        "text-base sm:text-xl md:text-2xl xl:text-3xl font-black tracking-tight tabular-nums",
                        prayer.isNext ? "text-white" : "text-slate-200"
                    )}
                >
                    {formatDisplayTime(prayer.time, is24Hour)}
                </p>
                {prayer.isIftar && (
                    <p className="text-[8px] sm:text-[10px] text-emerald-400 mt-0.5 font-bold tracking-wider uppercase">
                        IFTAR 🌙
                    </p>
                )}
            </div>

            {prayer.isNext && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 rounded-b-3xl" />
            )}
        </div>
    );
};

export const PrayerGrid: React.FC<PrayerGridProps> = ({ prayers, is24Hour = false }) => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2 sm:gap-3 xl:gap-4 w-full max-w-6xl 2xl:max-w-[1300px] mx-auto px-2 sm:px-4 pb-1 transition-all duration-500">
            {prayers.map((prayer) => (
                <PrayerCard key={prayer.name} prayer={prayer} is24Hour={is24Hour} />
            ))}
        </div>
    );
};
