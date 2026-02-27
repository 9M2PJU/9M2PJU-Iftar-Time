
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
                <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden flex justify-center items-start sm:items-center p-4">
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
                        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto"
                    >
                        {/* Header Image/Gradient */}
                        <div className="h-20 bg-gradient-to-r from-emerald-600 to-cyan-600 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                                </svg>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 md:p-6 pt-2">
                            <div className="flex flex-col items-center text-center -mt-10 mb-4">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-3 border-4 border-[#0f172a]">
                                    <svg viewBox="0 0 512 512" fill="none" className="w-10 h-10 text-white" stroke="currentColor" strokeWidth="12">
                                        {/* Official Crescent & Dome Paths */}
                                        <path
                                            d="M250 50 C 200 50 150 100 150 200 C 150 350 280 450 400 400 C 350 450 200 420 200 200 C 200 100 250 50 250 50 Z"
                                            fill="currentColor"
                                            stroke="none"
                                        />
                                        <path
                                            d="M300 350 L 300 200 A 50 50 0 0 1 400 200 L 400 350 Z"
                                            stroke="currentColor"
                                            strokeWidth="25"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="350" cy="160" r="20" fill="currentColor" stroke="none" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-0.5">9M2PJU Iftar Time</h2>
                                <p className="text-emerald-400 font-medium text-[10px] tracking-wider uppercase">MODERN COMPANION DURING RAMADHAN</p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-400 text-xs leading-relaxed text-center px-2">
                                    Accurate Iftar and prayer times across Malaysia.
                                    A minimalist tool designed for your spiritual focus.
                                </p>

                                {/* Developer Section */}
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5 leading-none">
                                        <Coffee className="w-3 h-3" /> DEVELOPED BY
                                    </h3>
                                    <a
                                        href="https://hamradio.my"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group"
                                    >
                                        <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">9M2PJU</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                    </a>
                                </div>

                                {/* Sadaqah Section - Compact */}
                                <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10 text-center">
                                    <h3 className="text-emerald-400 font-bold mb-1 flex items-center justify-center gap-2 text-base">
                                        <Heart className="w-4 h-4 fill-emerald-400" /> Support via Sadaqah
                                    </h3>
                                    <p className="text-slate-400 text-[10px] mb-3 leading-tight">
                                        Help support maintenance and hosting.
                                    </p>

                                    <div className="bg-white p-2 rounded-lg inline-block shadow-lg">
                                        <img
                                            src="/sadaqah_qr.png"
                                            alt="Sadaqah QR Code"
                                            className="w-32 h-32 md:w-40 md:h-40 block mx-auto object-contain"
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-500 mt-2 font-medium uppercase tracking-tighter">Scan to Donate</p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-6 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md text-sm active:scale-[0.98]"
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
