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

    // Get all Indian states
    const indianStates = State.getStatesOfCountry("IN");

    // Sort states by length (descending) to match longer names first (e.g. "West Bengal" before "Bengal" if that existed)
    const sortedStates = indianStates.sort((a, b) => b.name.length - a.name.length);

    let foundState: any = null;
    let citySlugPart: string = "";

    // Try to find a state suffix
    for (const state of sortedStates) {
        const stateSlug = state.name.toLowerCase().replace(/\s+/g, "-");

        // Check if slug ends with this state
        // We look for "-state-slug" at the end, or if the whole slug IS the state (though unlikely for city-state)
        if (slug.endsWith(`-${stateSlug}`)) {
            foundState = state;
            // Extract city part (everything before the -state-slug)
            citySlugPart = slug.substring(0, slug.lastIndexOf(`-${stateSlug}`));
            break;
        }
    }

    if (!foundState || !citySlugPart) {
        return { city: null, state: null, isValid: false };
    }

    // Convert city slug back to readable format (approximate)
    // We can't know the exact casing or spacing without looking it up, but we can try to find it in the city list.
    const cities = City.getCitiesOfState("IN", foundState.isoCode);

    // Create a lookup for city slugs
    const citySlug = citySlugPart.toLowerCase(); // "karol-bagh"

    // Find a city that matches this slug
    const foundCity = cities.find(c => {
        const cSlug = c.name.toLowerCase().replace(/\s+/g, "-");
        return cSlug === citySlug;
    });

    if (!foundCity) {
        // Fallback: If strict city lookup fails (maybe custom location?), currently we return invalid.
        // But for "Karol Bagh", it might not be in the standard list depending on the library version.
        // Let's rely on the library check as requested by the original strictness.
        return { city: null, state: null, isValid: false };
    }

    return { city: foundCity.name, state: foundState.name, isValid: true };
}

/**
 * Create location slug from city and state
 * @param city - City name
 * @param state - State name
 * @returns {string} - URL slug (e.g., "gurugram-haryana")
 */
export function createLocationSlug(city: string | null, state: string | null): string {
    if (!city || !state) return "";

    const citySlug = city.toLowerCase().replace(/\s+/g, "-");
    const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

    return `${citySlug}-${stateSlug}`;
}
