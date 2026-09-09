import React from 'react';
import { MapPin, Calendar, BookOpen, Heart, Clock, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { type Language, TRANSLATIONS } from '../utils/i18n';

interface NavbarProps {
    zoneCode?: string;
    is24Hour: boolean;
    language: Language;
    onToggle24Hour: () => void;
    onToggleLanguage: () => void;
    onOpenZoneModal: () => void;
    onOpenTakwimModal: () => void;
    onOpenDoaModal: () => void;
    onOpenAboutModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
    zoneCode,
    is24Hour,
    language,
    onToggle24Hour,
    onToggleLanguage,
    onOpenZoneModal,
    onOpenTakwimModal,
    onOpenDoaModal,
    onOpenAboutModal,
}) => {
    const t = TRANSLATIONS[language].navbar;

    return (
        <nav className="sticky top-0 w-full px-2.5 sm:px-6 py-2.5 flex items-center justify-between z-50 transition-all duration-300 backdrop-blur-md bg-[#0f172a]/90 border-b border-white/5 supports-[backdrop-filter]:bg-[#0f172a]/75">
            {/* Left Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
                <button
                    onClick={onOpenZoneModal}
                    title={t.zone}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline font-mono">{zoneCode || t.zone}</span>
                    <span className="sm:hidden font-mono text-[11px]">{zoneCode || t.zone}</span>
                </button>

                <button
                    onClick={onOpenTakwimModal}
                    title={t.takwim}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">{t.takwim}</span>
                </button>
            </div>

            {/* Centered Brand */}
            <div className="flex flex-col items-center select-none px-1">
                <div className="flex items-center gap-2">
                    <Logo className="w-7 h-7 sm:w-8 sm:h-8" />
                    <div className="flex flex-col">
                        <h1 className="text-sm sm:text-base md:text-lg font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent truncate tracking-tight leading-tight">
                            9M2PJU Iftar Time
                        </h1>
                        <span className="hidden sm:block text-[8px] font-bold text-slate-500 tracking-wider uppercase leading-none">
                            {t.tagline}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                    onClick={onOpenDoaModal}
                    title={t.doa}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all text-xs font-semibold active:scale-95"
                >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">{t.doa}</span>
                </button>

                {/* Language Switcher */}
                <button
                    onClick={onToggleLanguage}
                    title="Change Language (English / Bahasa Melayu)"
                    className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-white/5 transition-all text-[11px] font-bold font-mono active:scale-95"
                >
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span>{language === 'en' ? 'EN' : 'BM'}</span>
                </button>

                {/* 12h/24h Switcher */}
                <button
                    onClick={onToggle24Hour}
                    title="Time Format (12H / 24H)"
                    className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-all text-[11px] font-bold font-mono active:scale-95"
                >
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{is24Hour ? '24H' : '12H'}</span>
                </button>

                {/* About & Infaq */}
                <button
                    onClick={onOpenAboutModal}
                    title={t.about}
                    className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all active:scale-95"
                >
                    <Heart className="w-4 h-4 fill-emerald-400/20" />
                </button>
            </div>
        </nav>
    );
};
