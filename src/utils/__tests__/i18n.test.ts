import { describe, it, expect } from 'vitest';
import { TRANSLATIONS } from '../i18n';

describe('i18n translations', () => {
    it('contains valid English and Malay translations', () => {
        expect(TRANSLATIONS.en).toBeDefined();
        expect(TRANSLATIONS.ms).toBeDefined();
    });

    it('has English as comprehensive translation set', () => {
        expect(TRANSLATIONS.en.hero.timeUntilIftar).toBe('Time until');
        expect(TRANSLATIONS.en.prayers.fajr).toBe('Fajr');
        expect(TRANSLATIONS.en.navbar.zone).toBe('Zone');
    });

    it('has proper Bahasa Melayu translation set', () => {
        expect(TRANSLATIONS.ms.hero.timeUntilIftar).toBe('Masa sehingga');
        expect(TRANSLATIONS.ms.prayers.fajr).toBe('Subuh');
        expect(TRANSLATIONS.ms.navbar.zone).toBe('Zon');
    });
});
