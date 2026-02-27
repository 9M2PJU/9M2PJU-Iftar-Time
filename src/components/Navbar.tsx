
import React from 'react';
import { Heart } from 'lucide-react';

interface NavbarProps {
    onAboutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAboutClick }) => {
    return (
        <nav className="sticky top-0 w-full p-4 flex items-center justify-between z-50 transition-all duration-300 backdrop-blur-md bg-[#0f172a]/80 border-b border-white/5 supports-[backdrop-filter]:bg-[#0f172a]/60">
            {/* Left Spacer for centering title */}
            <div className="w-10 md:w-32 hidden sm:block" />

            {/* Centered Title with Logo */}
            <div className="flex flex-col items-center flex-1">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        9M2PJU Iftar Time
                    </h1>
                </div>
                <p className="text-xs text-slate-400 tracking-wider text-center mt-1">MODERN COMPANION DURING RAMADHAN</p>
            </div>

            {/* Right Action Button */}
            <div className="flex justify-end sm:w-32">
                <button
                    onClick={onAboutClick}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 group shadow-lg shadow-emerald-500/5"
                >
                    <Heart className="w-4 h-4 fill-emerald-500/20 group-hover:fill-emerald-500 transition-colors" />
                    <span className="text-xs font-bold tracking-tight hidden xs:inline">Sadaqah</span>
                </button>
            </div>
        </nav>
    );
};
