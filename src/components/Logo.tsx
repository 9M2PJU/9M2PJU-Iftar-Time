import React from 'react';

interface LogoProps {
    className?: string;
    size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", size }) => {
    return (
        <div
            style={size ? { width: size, height: size } : undefined}
            className={`relative rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-1 ring-white/20 bg-gradient-to-br from-slate-900 via-[#0f172a] to-emerald-950/80 overflow-hidden shrink-0 group ${className}`}
        >
            <svg
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full p-0.5"
            >
                <defs>
                    {/* Emerald-Cyan Primary Gradient */}
                    <linearGradient id="logoEmeraldCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="45%" stopColor="#10b981" />
                        <stop offset="80%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>

                    {/* Gold Accent Gradient */}
                    <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>

                    {/* Dome Interior Gradient */}
                    <linearGradient id="logoDomeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Background Subtle Geometric Ring */}
                <circle cx="256" cy="256" r="195" stroke="url(#logoEmeraldCyan)" strokeWidth="4" strokeDasharray="8 12" opacity="0.25" />

                {/* 1. Crescent Moon (Hilal) */}
                <path
                    d="M 275 88 C 172 88 90 170 90 273 C 90 376 174 458 277 458 C 335 458 387 431 420 389 C 330 412 232 368 200 282 C 172 208 214 125 292 94 C 286 90 280 88 275 88 Z"
                    fill="url(#logoEmeraldCyan)"
                />

                {/* 2. Mosque Dome Silhouette */}
                <path
                    d="M 205 385 L 205 290 C 205 240 256 195 256 148 C 256 195 307 240 307 290 L 307 385 Z"
                    fill="url(#logoDomeGrad)"
                    stroke="url(#logoEmeraldCyan)"
                    strokeWidth="8"
                    strokeLinejoin="round"
                />

                {/* Dome Inner Archway */}
                <path
                    d="M 234 385 L 234 320 C 234 300 256 288 256 288 C 256 288 278 300 278 320 L 278 385 Z"
                    fill="url(#logoEmeraldCyan)"
                    opacity="0.8"
                />

                {/* Dome Finial & Crescent Top */}
                <circle cx="256" cy="142" r="7" fill="url(#logoGold)" />
                <path d="M 256 137 L 256 120" stroke="url(#logoGold)" strokeWidth="5" strokeLinecap="round" />

                {/* Minaret Tower (Right Side) */}
                <path d="M 326 385 L 326 230 L 344 230 L 344 385 Z" fill="url(#logoDomeGrad)" stroke="url(#logoEmeraldCyan)" strokeWidth="6" strokeLinejoin="round" />
                <path d="M 320 230 L 350 230" stroke="url(#logoEmeraldCyan)" strokeWidth="6" strokeLinecap="round" />
                <path d="M 326 230 C 326 205 335 185 335 185 C 335 185 344 205 344 230 Z" fill="url(#logoEmeraldCyan)" />
                <circle cx="335" cy="180" r="5" fill="url(#logoGold)" />

                {/* Base Line */}
                <path d="M 140 385 L 380 385" stroke="url(#logoEmeraldCyan)" strokeWidth="8" strokeLinecap="round" opacity="0.7" />

                {/* 3. Radiant 8-Point Sparkle Star */}
                <g transform="translate(365, 115) scale(1.1)">
                    <path d="M 0 -32 Q 0 0 32 0 Q 0 0 0 32 Q 0 0 -32 0 Q 0 0 0 -32 Z" fill="url(#logoGold)" />
                    <path d="M 0 -22 Q 0 0 22 0 Q 0 0 0 22 Q 0 0 -22 0 Q 0 0 0 -22 Z" fill="#ffffff" transform="rotate(45)" opacity="0.9" />
                    <circle cx="0" cy="0" r="6" fill="#ffffff" />
                </g>

                {/* Tiny Twinkle Stars */}
                <circle cx="165" cy="155" r="4" fill="#34d399" opacity="0.8" />
                <circle cx="395" cy="210" r="3.5" fill="#fde047" opacity="0.85" />
            </svg>
        </div>
    );
};
