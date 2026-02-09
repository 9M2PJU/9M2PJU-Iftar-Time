import { useState, useEffect } from 'react';

interface Location {
    latitude: number;
    longitude: number;
}

interface GeoLocationState {
    location: Location | null;
    error: string | null;
    loading: boolean;
}

const CACHE_KEY = 'iftar_last_location';

export const useGeoLocation = () => {
    // 1. Initialize state from localStorage if available
    const [state, setState] = useState<GeoLocationState>(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                return {
                    location: parsed,
                    error: null,
                    loading: false, // Not loading initially if we have cache
                };
            }
        } catch (e) {
            console.warn('Failed to parse cached location', e);
        }
        return {
            location: null,
            error: null,
            loading: true,
        };
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: 'Geolocation is not supported by your browser',
                loading: false,
            }));
            return;
        }

        let mounted = true;

        const handleSuccess = (position: GeolocationPosition) => {
            if (!mounted) return;

            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            // Update cache
            localStorage.setItem(CACHE_KEY, JSON.stringify(newLocation));

            setState({
                location: newLocation,
                error: null,
                loading: false,
            });
        };

        const handleError = (error: GeolocationPositionError) => {
            if (!mounted) return;

            let errorMessage = 'An unknown error occurred.';
            let shouldRetry = false;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please enable location services.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out. Using last known location if available.';
                    shouldRetry = true;
                    break;
            }

            setState((prev) => ({
                ...prev,
                // Keep the previous location (cache) if we have it, don't wipe it on error
                error: prev.location ? null : errorMessage, // Only show error if we have NO data
                loading: false,
            }));
        };

        // increased timeout to 30s and maxAge to 5 mins to accept slightly older cached positions from OS
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 300000,
        });

        return () => {
            mounted = false;
        };
    }, []);

    return state;
};
