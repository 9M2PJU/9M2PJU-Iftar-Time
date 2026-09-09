import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Sparkles, Copy, Check } from 'lucide-react';

interface DoaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DoaModal: React.FC<DoaModalProps> = ({ isOpen, onClose }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const doaItems = [
        {
            title: 'Doa Berbuka Puasa (Iftar)',
            arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
            rumi: 'Allahumma laka sumtu wa bika aamantu wa ala rizqika aftartu.',
            translation: 'Ya Allah, kerana-Mu aku berpuasa, dengan-Mu aku beriman, dan dengan rezeki-Mu aku berbuka.',
            source: 'HR. Abu Daud',
        },
        {
            title: 'Doa Berbuka Puasa (Riwayat Sahih)',
            arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
            rumi: 'Dhahaba adh-dhama’u wabtallatil-‘urooqu wa thabatal-ajru in sha’ Allah.',
            translation: 'Telah hilang dahaga, telah basah urat-urat dan telah tetap pahala insya-Allah.',
            source: 'HR. Abu Daud (Sahih)',
        },
        {
            title: 'Lafaz Niat Puasa Ramadhan (Harian)',
            arabic: 'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى',
            rumi: 'Nawaitu sawma ghadin ‘an adaa’i fardhi shahri ramadhana hadhihis-sanati lillahi ta‘ala.',
            translation: 'Sahaja aku berpuasa esok hari bagi menunaikan fardu bulan Ramadan tahun ini kerana Allah Taala.',
            source: 'Lafaz Tradisi Mazhab Syafi‘i',
        },
        {
            title: 'Lafaz Niat Puasa Ramadhan (Sebulan)',
            arabic: 'نَوَيْتُ صَوْمَ شَهْرِ رَمَضَانَ كُلِّهِ لِلَّهِ تَعَالَى',
            rumi: 'Nawaitu sawma shahri ramadhana kullihi lillahi ta‘ala.',
            translation: 'Sahaja aku berpuasa sebulan Ramadan seluruhnya kerana Allah Taala.',
            source: 'Mazhab Maliki (Diharuskan dibaca pada awal Ramadan)',
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden flex justify-center items-center p-3 sm:p-4">
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
                        className="relative w-full max-w-xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-white">Doa & Niat Ramadhan</h2>
                                    <p className="text-[10px] sm:text-xs text-slate-400">Panduan lafaz niat dan doa berbuka puasa</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
                            {doaItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 space-y-3 relative group hover:border-emerald-500/30 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(`${item.arabic}\n\n${item.rumi}\n\n${item.translation}`, idx)}
                                            title="Salin Teks"
                                            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                        >
                                            {copiedIndex === idx ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Arabic */}
                                    <p
                                        dir="rtl"
                                        className="text-xl sm:text-2xl text-white font-serif leading-relaxed text-right py-1"
                                    >
                                        {item.arabic}
                                    </p>

                                    {/* Rumi Transliteration */}
                                    <p className="text-xs text-emerald-300/90 italic bg-slate-900/50 p-2 rounded-lg border border-white/5">
                                        &quot;{item.rumi}&quot;
                                    </p>

                                    {/* Translation */}
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        {item.translation}
                                    </p>

                                    <span className="text-[10px] text-slate-500 block font-medium">
                                        Sumber: {item.source}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
