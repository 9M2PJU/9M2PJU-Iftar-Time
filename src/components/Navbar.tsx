
import React from 'react';
import { MapPin } from 'lucide-react';


interface NavbarProps {
    locationName?: string;
    onLocationClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ locationName = "Detecting Location...", onLocationClick }) => {
    return (
        <nav className="w-full p-4 flex items-center justify-between z-50 relative">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="md:hidden text-emerald-400">
                            <MapPin size={20} />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            9M2PJU Iftar Time
                        </h1>
                    </div>
                    <p className="text-xs text-slate-400 tracking-wider">MODERN COMPANION</p>
                </div>
            </div>

            <div className="hidden md:flex items-center bg-slate-800/50 backdrop-blur-md rounded-full px-6 py-2 border border-white/5 space-x-8">
                <a href="#" className="text-emerald-400 font-medium text-sm">Dashboard</a>
                <a href="#" className="text-slate-300 hover:text-white transition text-sm">Dua Library</a>
                <a href="#" className="text-slate-300 hover:text-white transition text-sm">Mosque Finder</a>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onLocationClick}
                    className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 px-4 py-2 rounded-full border border-white/5 transition-all text-sm backdrop-blur-sm"
                >
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="max-w-[120px] truncate">{locationName}</span>
                </button>
            </div>
        </nav>
    );
};
