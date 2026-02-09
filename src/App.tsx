
import { useMemo } from 'react';
import { useGeoLocation } from './hooks/useGeoLocation';
import { useSolat } from './hooks/useSolat';
import { Navbar } from './components/Navbar';
import { CountdownHero } from './components/CountdownHero';
import { PrayerGrid } from './components/PrayerGrid';
import { format } from 'date-fns';

function App() {
  const { location, error: geoError, loading: geoLoading } = useGeoLocation();
  const { solatData, nextPrayer, zone } = useSolat(
    location?.latitude || null,
    location?.longitude || null
  );

  const iftarTime = useMemo(() => {
    if (!solatData) return null;
    // solatData.maghrib is a timestamp (seconds)
    return new Date(solatData.maghrib * 1000);
  }, [solatData]);

  const prayerList = useMemo(() => {
    if (!solatData) return [];

    // Helper to format timestamp to HH:mm
    const formatTime = (timestamp: number) => {
      return format(new Date(timestamp * 1000), 'HH:mm');
    };

    // Map API data to our PrayerGrid format
    const list = [
      { name: 'Fajr', time: formatTime(solatData.fajr) },
      { name: 'Syuruk', time: formatTime(solatData.syuruk) },
      { name: 'Dhuhr', time: formatTime(solatData.dhuhr) },
      { name: 'Asr', time: formatTime(solatData.asr) },
      { name: 'Maghrib', time: formatTime(solatData.maghrib) },
      { name: 'Isha', time: formatTime(solatData.isha) },
    ];

    return list.map(p => {
      // Determine if next. 
      const isNext = nextPrayer?.name === p.name || (p.name === 'Maghrib' && nextPrayer?.name === 'Maghrib');

      return {
        ...p,
        isNext: isNext
      };
    });
  }, [solatData, nextPrayer]);

  // Handle loading/error states
  if (geoLoading && !location) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-emerald-500/30">
      <Navbar locationName={zone || "Locating..."} />

      <main className="container mx-auto px-4 pb-20">
        {geoError && (
          <div className="max-w-md mx-auto mt-4 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-center">
            {geoError}
          </div>
        )}

        {/* Hero Section */}
        <CountdownHero iftarTime={iftarTime} locationName={zone} />

        {/* Prayer Grid */}
        {solatData && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <PrayerGrid prayers={prayerList} />
          </div>
        )}



      </main>
    </div>
  );
}

export default App;
