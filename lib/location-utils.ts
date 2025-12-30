import { State, City } from "country-state-city";

interface LocationSlugResult {
    city: string | null;
    state: string | null;
    isValid: boolean;
}

/**
 * Parse and validate location slug (format: city-state)
 * @param slug - The URL slug (e.g., "gurugram-haryana")
 * @returns {LocationSlugResult} - { city, state, isValid }
 */
export function parseLocationSlug(slug: string): LocationSlugResult {
    if (!slug || typeof slug !== "string") {
        return { city: null, state: null, isValid: false };
    }

    const indianStates = State.getStatesOfCountry("IN");

    const sortedStates = indianStates.sort((a, b) => b.name.length - a.name.length);

    let foundState: any = null;
    let citySlugPart: string = "";

    for (const state of sortedStates) {
        const stateSlug = state.name.toLowerCase().replace(/\s+/g, "-");

        if (slug.endsWith(`-${stateSlug}`)) {
            foundState = state;
            citySlugPart = slug.substring(0, slug.lastIndexOf(`-${stateSlug}`));
            break;
        }
    }

    if (!foundState || !citySlugPart) {
        return { city: null, state: null, isValid: false };
    }

    const cities = City.getCitiesOfState("IN", foundState.isoCode);

    const citySlug = citySlugPart.toLowerCase();

    const foundCity = cities.find(c => {
        const cSlug = c.name.toLowerCase().replace(/\s+/g, "-");
        return cSlug === citySlug;
    });

    if (!foundCity) {
        return { city: null, state: null, isValid: false };
    }

    return { city: foundCity.name, state: foundState.name, isValid: true };
}

/**
 * Create location slug from city and state
 * @param city 
 * @param state 
 * @returns {string}
 */
export function createLocationSlug(city: string | null, state: string | null): string {
    if (!city || !state) return "";

    const citySlug = city.toLowerCase().replace(/\s+/g, "-");
    const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

    return `${citySlug}-${stateSlug}`;
}
