import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin } from 'lucide-react';
import type { SolatData } from '../hooks/useSolat';
import { formatHijriDate } from '../utils/hijri';
import { type Language, TRANSLATIONS } from '../utils/i18n';

interface TakwimModalProps {
    isOpen: boolean;
    prayers: SolatData[];
    zoneName: string;
    zoneCode: string;
    is24Hour: boolean;
    language?: Language;
    onClose: () => void;
}

const formatCellTime = (timestamp: number, is24Hour: boolean) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp * 1000);
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');

    if (is24Hour) {
        return `${h.toString().padStart(2, '0')}:${m}`;
    }
    const h12 = h % 12 || 12;
    return `${h12}:${m}`;
};

export const TakwimModal: React.FC<TakwimModalProps> = ({
    isOpen,
    prayers,
    zoneName,
    zoneCode,
    is24Hour,
    language = 'en',
    onClose,
}) => {
    const todayDate = new Date().getDate();
    const t = TRANSLATIONS[language].takwimModal;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden flex justify-center items-center p-2 sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#020617]/85 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-white">{t.title}</h2>
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 mt-0.5">
                                        <MapPin className="w-3 h-3 text-emerald-400" />
                                        <span>{zoneName}</span>
                                        <span className="font-mono text-emerald-400">({zoneCode})</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Table Area */}
                        <div className="flex-1 overflow-auto p-2 sm:p-4">
                            {prayers.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 text-xs sm:text-sm">
                                    {t.noSchedule}
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-2xl border border-white/5">
                                    <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                                        <thead>
                                            <tr className="bg-slate-800/80 text-slate-400 uppercase font-semibold tracking-wider border-b border-white/10">
                                                <th className="p-2.5 sm:p-3 text-center">{t.day}</th>
                                                <th className="p-2.5 sm:p-3">{t.hijriDate}</th>
                                                <th className="p-2.5 sm:p-3 text-cyan-400">{t.imsak}</th>
                                                <th className="p-2.5 sm:p-3">{t.fajr}</th>
                                                <th className="p-2.5 sm:p-3">{t.syuruk}</th>
                                                <th className="p-2.5 sm:p-3">{t.dhuhr}</th>
                                                <th className="p-2.5 sm:p-3">{t.asr}</th>
                                                <th className="p-2.5 sm:p-3 text-emerald-400 font-bold">{t.maghrib}</th>
                                                <th className="p-2.5 sm:p-3">{t.isha}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {prayers.map((p) => {
                                                const isToday = p.day === todayDate;
                                                return (
                                                    <tr
                                                        key={p.day}
                                                        className={`transition-colors ${
                                                            isToday
                                                                ? 'bg-emerald-500/15 font-bold text-white ring-1 ring-emerald-500/40'
                                                                : 'hover:bg-slate-800/40 text-slate-300'
                                                        }`}
                                                    >
                                                        <td className="p-2.5 sm:p-3 text-center font-mono">
                                                            {isToday ? (
                                                                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                                                                    {p.day}
                                                                </span>
                                                            ) : (
                                                                p.day
                                                            )}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 text-slate-400 font-medium">
                                                            {p.hijri ? formatHijriDate(p.hijri) : '-'}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 text-cyan-400 font-semibold tabular-nums">
                                                            {formatCellTime(p.imsak, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 tabular-nums">
                                                            {formatCellTime(p.fajr, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 text-slate-400 tabular-nums">
                                                            {formatCellTime(p.syuruk, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 tabular-nums">
                                                            {formatCellTime(p.dhuhr, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 tabular-nums">
                                                            {formatCellTime(p.asr, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 text-emerald-400 font-bold tabular-nums">
                                                            {formatCellTime(p.maghrib, is24Hour)}
                                                        </td>
                                                        <td className="p-2.5 sm:p-3 tabular-nums">
                                                            {formatCellTime(p.isha, is24Hour)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
