
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink, Coffee } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    React.useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header Image/Gradient */}
                        <div className="h-24 bg-gradient-to-r from-emerald-600 to-cyan-600 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                                </svg>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-8 pt-4">
                            <div className="flex flex-col items-center text-center -mt-12 mb-6">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-4 border-4 border-[#0f172a]">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-white" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-1">9M2PJU Iftar Time</h2>
                                <p className="text-emerald-400 font-medium text-sm tracking-wider uppercase">MODERN COMPANION DURING RAMADHAN</p>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Designed to provide the most accurate Iftar and prayer times across Malaysia.
                                    A simple, minimalist tool to help you stay focused on your ibadah during this holy month.
                                </p>

                                {/* Developer Section */}
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Coffee className="w-3 h-3" /> DEVELOPED BY
                                    </h3>
                                    <a
                                        href="https://hamradio.my"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group"
                                    >
                                        <span className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">9M2PJU</span>
                                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                    </a>
                                </div>

                                {/* Sadaqah Section */}
                                <div className="bg-emerald-500/10 rounded-2xl p-6 border border-emerald-500/20 text-center">
                                    <h3 className="text-emerald-400 font-bold mb-2 flex items-center justify-center gap-2 text-lg">
                                        <Heart className="w-5 h-5 fill-emerald-400" /> Support via Sadaqah
                                    </h3>
                                    <p className="text-slate-300 text-xs mb-4">
                                        If you find this tool helpful, consider making a small contribution to support its maintenance.
                                    </p>

                                    <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                                        {/* Using /sadaqah_qr.png from public folder */}
                                        <img
                                            src="/sadaqah_qr.png"
                                            alt="Sadaqah QR Code"
                                            className="w-48 h-48 block mx-auto"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-3 font-medium uppercase tracking-tighter">Scan to Donate</p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-8 py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-[0.98]"
                            >
                                Continue to App
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
