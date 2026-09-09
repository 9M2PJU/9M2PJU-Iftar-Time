import React from 'react';
import { MapPin, Calendar, BookOpen, Heart, Clock } from 'lucide-react';

interface NavbarProps {
    zoneCode?: string;
    is24Hour: boolean;
    onToggle24Hour: () => void;
    onOpenZoneModal: () => void;
    onOpenTakwimModal: () => void;
    onOpenDoaModal: () => void;
    onOpenAboutModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
    zoneCode,
    is24Hour,
    onToggle24Hour,
    onOpenZoneModal,
    onOpenTakwimModal,
    onOpenDoaModal,
    onOpenAboutModal,
}) => {
    return (
        <nav className="sticky top-0 w-full px-3 sm:px-6 py-2.5 flex items-center justify-between z-50 transition-all duration-300 backdrop-blur-md bg-[#0f172a]/90 border-b border-white/5 supports-[backdrop-filter]:bg-[#0f172a]/75">
            {/* Left Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                    onClick={onOpenZoneModal}
                    title="Pilih Zon Waktu Solat"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline font-mono">{zoneCode || 'Zon'}</span>
                    <span className="sm:hidden font-mono text-[11px]">{zoneCode || 'Zon'}</span>
                </button>

                <button
                    onClick={onOpenTakwimModal}
                    title="Takwim Sebulan"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">Takwim</span>
                </button>
            </div>

            {/* Centered Brand */}
            <div className="flex flex-col items-center select-none px-2">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 ring-1 ring-white/20 shrink-0">
                        <svg viewBox="0 0 512 512" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 text-white" stroke="currentColor" strokeWidth="12">
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
                    <h1 className="text-base sm:text-lg md:text-xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent truncate tracking-tight">
                        9M2PJU Iftar Time
                    </h1>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                    onClick={onOpenDoaModal}
                    title="Doa & Niat Ramadhan"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">Doa</span>
                </button>

                <button
                    onClick={onToggle24Hour}
                    title="Tukar Format Masa (12H / 24H)"
                    className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-all text-[11px] font-bold font-mono active:scale-95"
                >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{is24Hour ? '24H' : '12H'}</span>
                </button>

                <button
                    onClick={onOpenAboutModal}
                    title="Tentang & Infaq"
                    className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all active:scale-95"
                >
                    <Heart className="w-4 h-4 fill-emerald-400/20" />
                </button>
            </div>
        </nav>
    );
};
