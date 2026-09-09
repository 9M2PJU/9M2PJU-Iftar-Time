import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Navigation, MapPin, Check } from 'lucide-react';
import { ALL_ZONES, ZONE_STATE_MAP, type ZoneItem } from '../utils/zones';

interface ZoneSelectorModalProps {
    isOpen: boolean;
    currentZoneCode: string;
    onSelectZone: (zoneCode: string) => void;
    onUseGps: () => void;
    onClose: () => void;
}

export const ZoneSelectorModal: React.FC<ZoneSelectorModalProps> = ({
    isOpen,
    currentZoneCode,
    onSelectZone,
    onUseGps,
    onClose,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState<string>('ALL');

    const states = useMemo(() => {
        return ['ALL', ...Object.values(ZONE_STATE_MAP)];
    }, []);

    const filteredZones = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        return ALL_ZONES.filter((item: ZoneItem) => {
            const matchesState = selectedState === 'ALL' || item.state === selectedState;
            const matchesSearch =
                !query ||
                item.code.toLowerCase().includes(query) ||
                item.state.toLowerCase().includes(query) ||
                item.locations.toLowerCase().includes(query);
            return matchesState && matchesSearch;
        });
    }, [searchQuery, selectedState]);

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
                        className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60 shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-white">Pilih Zon Waktu Solat</h2>
                                    <p className="text-[10px] sm:text-xs text-slate-400">Senarai rasmi zon JAKIM seluruh Malaysia</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Search & Actions */}
                        <div className="p-3 sm:p-4 border-b border-white/5 space-y-3 bg-slate-900/40 shrink-0">
                            {/* GPS Auto Detect Action Button */}
                            <button
                                onClick={() => {
                                    onUseGps();
                                    onClose();
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99]"
                            >
                                <Navigation className="w-4 h-4 animate-pulse" />
                                Guna Lokasi Semasa Saya (GPS Auto-Detect)
                            </button>

                            {/* Search Input */}
                            <div className="relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Cari daerah, negeri, atau kod zon (cth: Shah Alam, SGR01)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                                    >
                                        Padam
                                    </button>
                                )}
                            </div>

                            {/* State Pills */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                                {states.map((st) => (
                                    <button
                                        key={st}
                                        onClick={() => setSelectedState(st)}
                                        className={`px-3 py-1 rounded-lg font-medium text-[10px] sm:text-xs whitespace-nowrap transition-all ${
                                            selectedState === st
                                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                                        }`}
                                    >
                                        {st === 'ALL' ? 'Semua Negeri' : st}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Zone List */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                            {filteredZones.length === 0 ? (
                                <div className="text-center py-10 text-slate-500 text-xs sm:text-sm">
                                    Tiada zon ditemui untuk &quot;{searchQuery}&quot;
                                </div>
                            ) : (
                                filteredZones.map((item) => {
                                    const isSelected = item.code === currentZoneCode;
                                    return (
                                        <button
                                            key={item.code}
                                            onClick={() => {
                                                onSelectZone(item.code);
                                                onClose();
                                            }}
                                            className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                                                isSelected
                                                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                                                    : 'bg-slate-800/30 border-white/5 hover:bg-slate-800/70 text-slate-300'
                                            }`}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] sm:text-xs">
                                                        {item.code}
                                                    </span>
                                                    <span className="text-xs font-semibold text-slate-400">
                                                        {item.state}
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                                                    {item.locations}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-1">
                                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
