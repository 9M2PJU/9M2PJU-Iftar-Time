import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink, Coffee, Radio } from 'lucide-react';
import { Logo } from './Logo';
import { type Language, TRANSLATIONS } from '../utils/i18n';

interface AboutModalProps {
    isOpen: boolean;
    language?: Language;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, language = 'en', onClose }) => {
    const t = TRANSLATIONS[language].aboutModal;

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
                        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto"
                    >
                        {/* Header Gradient */}
                        <div className="h-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden flex items-center justify-between px-6">
                            <div className="flex items-center gap-2 text-white/90">
                                <Radio className="w-5 h-5 animate-pulse" />
                                <span className="font-mono font-bold tracking-widest text-xs">9M2PJU PROJECT</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 md:p-6 pt-0">
                            <div className="flex flex-col items-center text-center -mt-9 mb-4">
                                <Logo className="w-18 h-18 sm:w-20 sm:h-20 mb-3 border-4 border-[#0f172a] shadow-2xl" />
                                <h2 className="text-xl font-bold text-white mb-0.5">9M2PJU Iftar Time</h2>
                                <p className="text-emerald-400 font-bold text-[10px] tracking-wider uppercase">
                                    {t.tagline}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-slate-300 text-xs leading-relaxed text-center px-2">
                                    {t.desc}
                                </p>

                                {/* Developer Section */}
                                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5">
                                    <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                        <Coffee className="w-3.5 h-3.5 text-emerald-400" /> {t.developedBy}
                                    </h3>
                                    <a
                                        href="https://hamradio.my"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group pt-1"
                                    >
                                        <div>
                                            <span className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                                                9M2PJU
                                            </span>
                                            <p className="text-[10px] text-slate-400">hamradio.my</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                                            <span>{t.visit}</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </div>
                                    </a>
                                </div>

                                {/* Sadaqah Section */}
                                <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 text-center">
                                    <h3 className="text-emerald-400 font-bold mb-1 flex items-center justify-center gap-2 text-sm sm:text-base">
                                        <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" /> {t.supportTitle}
                                    </h3>
                                    <p className="text-slate-400 text-[10px] sm:text-xs mb-3 leading-tight">
                                        {t.supportDesc}
                                    </p>

                                    <div className="bg-white p-2 rounded-xl inline-block shadow-lg">
                                        <img
                                            src="/sadaqah_qr.png"
                                            alt="Sadaqah QR Code"
                                            className="w-32 h-32 sm:w-40 sm:h-40 block mx-auto object-contain"
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-wider">
                                        {t.scanPrompt}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-4 py-2.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md text-xs sm:text-sm active:scale-[0.98]"
                            >
                                {t.backToApp}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
