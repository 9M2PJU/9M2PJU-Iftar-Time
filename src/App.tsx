
import { useMemo } from 'react';
import { useGeoLocation } from './hooks/useGeoLocation';
import { useSolat } from './hooks/useSolat';
import { Navbar } from './components/Navbar';
import { CountdownHero } from './components/CountdownHero';
import { PrayerGrid } from './components/PrayerGrid';
import { parse } from 'date-fns';

const parseTime = (timeStr: string, baseDate: Date) => {
  try {
    return parse(timeStr, 'HH:mm:ss', baseDate);
  } catch {
    try {
      return parse(timeStr, 'HH:mm', baseDate);
    } catch (e) {
      console.error("Time parse error", timeStr, e);
      return baseDate;
    }
  }
};

function App() {
  const { location, error: geoError, loading: geoLoading } = useGeoLocation();
  const { solatData, nextPrayer, zone } = useSolat(
    location?.latitude || null,
    location?.longitude || null
  );

  const iftarTime = useMemo(() => {
    if (!solatData) return null;
    return parseTime(solatData.maghrib, new Date());
  }, [solatData]);

  const prayerList = useMemo(() => {
    if (!solatData) return [];

    // Map API data to our PrayerGrid format
    const list = [
      { name: 'Fajr', time: solatData.fajr },
      { name: 'Syuruk', time: solatData.syuruk }, // Optional to show
      { name: 'Dhuhr', time: solatData.dhuhr },
      { name: 'Asr', time: solatData.asr },
      { name: 'Maghrib', time: solatData.maghrib },
      { name: 'Isha', time: solatData.isha },
    ];

    return list.map(p => {
      // Determine if next. Note: this is a simple check. nextPrayer from hook might be better.
      // But for visual grid, we want to highlight the *next* or *current* relevant one.
      // Let's use the nextPrayer from hook to decide which card gets highlighted/glow.
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

        {/* Dua Section */}
        <div className="max-w-3xl mx-auto mt-12 md:mt-20 p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

          <div className="flex gap-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Dua for Breaking Fast</h3>
              <p className="text-emerald-100/80 italic text-lg leading-relaxed mb-4">
                "Dhahaba al-zamau wa'btallat al-'uruq wa thabata al-ajru in sha Allah"
              </p>
              <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">
                Thirst has gone, the veins are moistened, and the reward is certain, if Allah wills.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
