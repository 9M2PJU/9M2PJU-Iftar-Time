// Azan Maghrib Audio & Web Audio Synthesizer Engine

let audioCtx: AudioContext | null = null;
let azanAudio: HTMLAudioElement | null = null;
const stateListeners: Set<(isPlaying: boolean) => void> = new Set();

const notifyListeners = (isPlaying: boolean) => {
    stateListeners.forEach((fn) => fn(isPlaying));
};

const getAudioContext = (): AudioContext | null => {
    try {
        if (!audioCtx) {
            const AudioContextClass =
                window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    } catch {
        return null;
    }
};

export const playIftarChime = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic pentatonic chime chord (F4, A4, C5, E5, G5)
    const frequencies = [349.23, 440.0, 523.25, 659.25, 783.99];
    const now = ctx.currentTime;

    frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.12);

        // Attack & Decay Envelope
        gain.gain.setValueAtTime(0, now + index * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, now + index * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.12);
        osc.stop(now + index * 0.12 + 2.6);
    });
};

export const playAzanMaghrib = (): Promise<void> => {
    return new Promise((resolve) => {
        try {
            if (!azanAudio) {
                azanAudio = new Audio('/audio/azan_maghrib.mp3');
                azanAudio.preload = 'auto';

                azanAudio.addEventListener('play', () => notifyListeners(true));
                azanAudio.addEventListener('pause', () => notifyListeners(false));
                azanAudio.addEventListener('ended', () => notifyListeners(false));
                azanAudio.addEventListener('error', () => {
                    console.warn('Could not load Azan MP3, falling back to harmonic chime');
                    playIftarChime();
                    notifyListeners(false);
                });
            }

            azanAudio.currentTime = 0;
            azanAudio.volume = 1.0;

            const playPromise = azanAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        console.warn('Autoplay prevented or audio error:', err);
                        // Fallback to Web Audio synthesized chime
                        playIftarChime();
                        notifyListeners(false);
                        resolve();
                    });
            } else {
                resolve();
            }
        } catch {
            playIftarChime();
            notifyListeners(false);
            resolve();
        }
    });
};

export const stopAzanMaghrib = () => {
    if (azanAudio) {
        azanAudio.pause();
        azanAudio.currentTime = 0;
        notifyListeners(false);
    }
};

export const isAzanPlaying = (): boolean => {
    return Boolean(azanAudio && !azanAudio.paused && !azanAudio.ended);
};

export const subscribeAzanState = (callback: (isPlaying: boolean) => void): (() => void) => {
    stateListeners.add(callback);
    callback(isAzanPlaying());
    return () => {
        stateListeners.delete(callback);
    };
};

export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
};

export const sendIftarNotification = (zoneName?: string, language: 'en' | 'ms' = 'en') => {
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            const title = language === 'ms' ? '🌙 Waktu Berbuka Puasa!' : '🌙 Time for Iftar!';
            const body =
                language === 'ms'
                    ? `Selamat Berbuka Puasa${zoneName ? ` bagi kawasan ${zoneName}` : ''}!`
                    : `Iftar Mubarak${zoneName ? ` for ${zoneName}` : ''}!`;

            new Notification(title, {
                body,
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
            });
        } catch (e) {
            console.warn('Could not trigger notification', e);
        }
    }
};
