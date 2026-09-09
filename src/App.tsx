import { useState, useMemo, useEffect } from 'react';
import { useGeoLocation } from './hooks/useGeoLocation';
import { useSolat } from './hooks/useSolat';
import { Navbar } from './components/Navbar';
import { CountdownHero } from './components/CountdownHero';
import { PrayerGrid, type PrayerTimeItem } from './components/PrayerGrid';
import { ZoneSelectorModal } from './components/ZoneSelectorModal';
import { TakwimModal } from './components/TakwimModal';
import { DoaModal } from './components/DoaModal';
import { AboutModal } from './components/AboutModal';
import { format } from 'date-fns';
import { formatHijriDate } from './utils/hijri';
import { requestNotificationPermission } from './utils/audio';

const STORAGE_KEY_MANUAL_ZONE = 'iftar_manual_zone';
const STORAGE_KEY_24H = 'iftar_is_24h';
const STORAGE_KEY_SOUND = 'iftar_sound_enabled';

function App() {
  const [manualZoneCode, setManualZoneCode] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_MANUAL_ZONE) || null;
  });

  const [is24Hour, setIs24Hour] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_24H) === 'true';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SOUND);
    return saved === null ? true : saved === 'true';
  });

  // Modal visibility states
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [isTakwimModalOpen, setIsTakwimModalOpen] = useState(false);
  const [isDoaModalOpen, setIsDoaModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const { location, error: geoError, loading: geoLoading, requestLocation } = useGeoLocation();

  const {
    solatData,
    tomorrowData,
    monthlyPrayers,
    nextPrayer,
    zone,
    zoneCode,
    loading: solatLoading,
    error: solatError,
  } = useSolat(
    location?.latitude || null,
    location?.longitude || null,
    manualZoneCode
  );

  const handleSelectZone = (code: string) => {
    setManualZoneCode(code);
    localStorage.setItem(STORAGE_KEY_MANUAL_ZONE, code);
  };

  const handleUseGps = () => {
    setManualZoneCode(null);
    localStorage.removeItem(STORAGE_KEY_MANUAL_ZONE);
    requestLocation();
  };

  const handleToggle24Hour = () => {
    setIs24Hour((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_24H, String(next));
      return next;
    });
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_SOUND, String(next));
      if (next) {
        requestNotificationPermission();
      }
      return next;
    });
  };

  // Request browser notification permission on first interaction if sound enabled
  useEffect(() => {
    if (soundEnabled) {
      requestNotificationPermission();
    }
  }, [soundEnabled]);

  const iftarTime = useMemo(() => {
    if (!solatData?.maghrib) return null;
    return new Date(solatData.maghrib * 1000);
  }, [solatData]);

  const fajrTime = useMemo(() => {
    if (!solatData?.fajr) return null;
    return new Date(solatData.fajr * 1000);
  }, [solatData]);

  const imsakTime = useMemo(() => {
    if (!solatData?.imsak) return null;
    return new Date(solatData.imsak * 1000);
  }, [solatData]);

  const tomorrowImsakTime = useMemo(() => {
    if (tomorrowData?.imsak) {
      return new Date(tomorrowData.imsak * 1000);
    }
    if (solatData?.imsak) {
      return new Date((solatData.imsak + 86400) * 1000);
    }
    return null;
  }, [tomorrowData, solatData]);

  const prayerList = useMemo<PrayerTimeItem[]>(() => {
    if (!solatData) return [];

    const formatTime = (timestamp: number) => {
      return format(new Date(timestamp * 1000), 'HH:mm');
    };

    const list = [
      { name: 'Fajr', displayName: 'Subuh', time: formatTime(solatData.fajr) },
      { name: 'Syuruk', displayName: 'Syuruk', time: formatTime(solatData.syuruk) },
      { name: 'Dhuhr', displayName: 'Zohor', time: formatTime(solatData.dhuhr) },
      { name: 'Asr', displayName: 'Asar', time: formatTime(solatData.asr) },
      { name: 'Maghrib', displayName: 'Maghrib', time: formatTime(solatData.maghrib), isIftar: true },
      { name: 'Isha', displayName: 'Isyak', time: formatTime(solatData.isha) },
    ];

    return list.map((p) => {
      const isNext = nextPrayer?.name.toLowerCase() === p.name.toLowerCase();
      return {
        ...p,
        isNext,
      };
    });
  }, [solatData, nextPrayer]);

  // Handle initial full-screen loading state when no data exists yet
  if ((geoLoading || solatLoading) && !solatData) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase animate-pulse">
          Memuatkan Waktu Solat...
        </p>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full bg-[#0f172a] text-white selection:bg-emerald-500/30 flex flex-col items-center relative pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-hidden">
      <div className="flex flex-col w-full max-w-7xl 2xl:max-w-[1600px] flex-1 h-full overflow-hidden transition-all duration-700">
        <Navbar
          zoneCode={zoneCode}
          is24Hour={is24Hour}
          onToggle24Hour={handleToggle24Hour}
          onOpenZoneModal={() => setIsZoneModalOpen(true)}
          onOpenTakwimModal={() => setIsTakwimModalOpen(true)}
          onOpenDoaModal={() => setIsDoaModalOpen(true)}
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
        />

        <main className="flex-1 w-full overflow-y-auto sm:overflow-hidden px-3 sm:px-4 flex flex-col">
          <div className="flex-1 w-full flex flex-col items-center justify-between py-2 sm:py-4 md:py-6 2xl:py-2">
            {/* Error or Notice Banner */}
            {(geoError && !manualZoneCode) || solatError ? (
              <div className="w-full max-w-md mx-auto mb-2 bg-slate-800/80 border border-emerald-500/30 text-slate-200 p-3 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-lg">
                <span className="truncate">{solatError || geoError}</span>
                <button
                  onClick={() => setIsZoneModalOpen(true)}
                  className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-[11px] shrink-0 hover:bg-emerald-400 transition-colors"
                >
                  Pilih Zon
                </button>
              </div>
            ) : null}

            {/* Countdown Hero Section */}
            <div className="w-full flex justify-center">
              <CountdownHero
                iftarTime={iftarTime}
                fajrTime={fajrTime}
                imsakTime={imsakTime}
                tomorrowImsakTime={tomorrowImsakTime}
                locationName={zone}
                hijriDate={solatData?.hijri ? formatHijriDate(solatData.hijri) : undefined}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                onOpenZoneModal={() => setIsZoneModalOpen(true)}
              />
            </div>

            {/* Prayer Grid */}
            {solatData && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-6 duration-700 mt-2 sm:mt-0">
                <PrayerGrid prayers={prayerList} is24Hour={is24Hour} />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-2 text-slate-500 text-[10px] sm:text-[11px] font-medium tracking-wide shrink-0 border-t border-white/5 bg-[#0f172a]/60">
          <div className="flex items-center justify-center gap-1.5 flex-wrap px-2">
            <span>Dikuasakan oleh data rasmi JAKIM melalui waktusolat.app</span>
            <span>•</span>
            <span>
              Dibina oleh{' '}
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="text-emerald-400 hover:underline font-bold uppercase"
              >
                9M2PJU
              </button>
            </span>
          </div>
        </footer>
      </div>

      {/* Interactive Modals */}
      <ZoneSelectorModal
        isOpen={isZoneModalOpen}
        currentZoneCode={zoneCode}
        onSelectZone={handleSelectZone}
        onUseGps={handleUseGps}
        onClose={() => setIsZoneModalOpen(false)}
      />

      <TakwimModal
        isOpen={isTakwimModalOpen}
        prayers={monthlyPrayers}
        zoneName={zone}
        zoneCode={zoneCode}
        is24Hour={is24Hour}
        onClose={() => setIsTakwimModalOpen(false)}
      />

      <DoaModal
        isOpen={isDoaModalOpen}
        onClose={() => setIsDoaModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
