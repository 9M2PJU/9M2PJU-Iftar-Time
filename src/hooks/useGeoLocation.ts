import { useState, useEffect, useCallback } from 'react';

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
    const [state, setState] = useState<GeoLocationState>(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                return {
                    location: parsed,
                    error: null,
                    loading: false,
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

    const requestLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: 'Geolocation is not supported by your browser',
                loading: false,
            }));
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        const handleSuccess = (position: GeolocationPosition) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify(newLocation));
            } catch {
                // Ignore storage error
            }

            setState({
                location: newLocation,
                error: null,
                loading: false,
            });
        };

        const handleError = (error: GeolocationPositionError) => {
            let errorMessage = 'An unknown error occurred.';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please select your zone manually.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out. Using last known location if available.';
                    break;
            }

            setState((prev) => ({
                ...prev,
                error: prev.location ? null : errorMessage,
                loading: false,
            }));
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000,
        });
    }, []);

    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    return { ...state, requestLocation };
};
