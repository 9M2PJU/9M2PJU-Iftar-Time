
import React from 'react';
import { MapPin } from 'lucide-react';


interface NavbarProps {
    locationName?: string;
    onLocationClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ locationName = "Detecting Location...", onLocationClick }) => {
    return (
        <nav className="w-full p-4 flex items-center justify-between z-50 relative">
            {/* Centered Title with Logo */}
            <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center w-full">
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
        </nav>
    );
};
