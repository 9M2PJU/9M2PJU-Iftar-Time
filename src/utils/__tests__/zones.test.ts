import { describe, it, expect } from 'vitest';
import { getZoneName, getZoneState, ALL_ZONES } from '../zones';

describe('zones utility', () => {
    it('returns correct zone name for known Malaysian codes', () => {
        expect(getZoneName('WLY01')).toBe('Kuala Lumpur, Putrajaya');
        expect(getZoneName('SGR01')).toContain('Gombak, Petaling');
        expect(getZoneName('PNG01')).toBe('Seluruh Negeri Pulau Pinang');
    });

    it('returns zone code as fallback if not found', () => {
        expect(getZoneName('UNKNOWN')).toBe('UNKNOWN');
    });

    it('returns correct state name by prefix', () => {
        expect(getZoneState('SGR01')).toBe('Selangor');
        expect(getZoneState('WLY01')).toBe('Wilayah Persekutuan');
        expect(getZoneState('JHR02')).toBe('Johor');
    });

    it('contains all Malaysian zones list with valid structure', () => {
        expect(ALL_ZONES.length).toBeGreaterThan(40);
        const wly = ALL_ZONES.find(z => z.code === 'WLY01');
        expect(wly).toBeDefined();
        expect(wly?.state).toBe('Wilayah Persekutuan');
    });
});
