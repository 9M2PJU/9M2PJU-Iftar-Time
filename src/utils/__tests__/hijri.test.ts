import { describe, it, expect } from 'vitest';
import { formatHijriDate } from '../hijri';

describe('formatHijriDate', () => {
    it('formats a valid Hijri date string correctly', () => {
        expect(formatHijriDate('1447-09-01')).toBe('1 Ramadan 1447');
        expect(formatHijriDate('1448-03-19')).toBe("19 Rabi' al-Awwal 1448");
        expect(formatHijriDate('1447-08-29')).toBe("29 Sha'ban 1447");
    });

    it('returns empty string for undefined or null', () => {
        expect(formatHijriDate(undefined)).toBe('');
        expect(formatHijriDate(null)).toBe('');
        expect(formatHijriDate('')).toBe('');
    });

    it('handles invalid format gracefully without crashing', () => {
        expect(formatHijriDate('invalid-date')).toBe('invalid-date');
        expect(formatHijriDate('1447-99-01')).toBe('1447-99-01');
    });
});
