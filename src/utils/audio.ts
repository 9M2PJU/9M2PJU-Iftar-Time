// Synthesized harmonic chime for Iftar notification using Web Audio API (Zero external assets, works 100% offline)

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    try {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

    // Harmonic chord notes in Hz (F4, A4, C5, E5, G5)
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

export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
};

export const sendIftarNotification = (zoneName?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            new Notification('🌙 Waktu Berbuka Puasa!', {
                body: `Selamat Berbuka Puasa${zoneName ? ` bagi kawasan ${zoneName}` : ''}!`,
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
            });
        } catch (e) {
            console.warn('Could not trigger notification', e);
        }
    }
};
