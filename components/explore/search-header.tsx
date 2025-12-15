/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Loader2, Filter } from "lucide-react";
import { State, City } from "country-state-city";
import { format } from "date-fns";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { createLocationSlug } from "@/lib/location-utils";
import { getCategoryIcon } from "@/lib/data";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchHeader() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { data: currentUser, isLoading } = useConvexQuery(
        api.users.getCurrentUser
    );
    const { mutate: updateLocation } = useConvexMutation(
        api.users.completeOnboarding
    );

    const { data: searchResults, isLoading: searchLoading } = useConvexQuery(
        api.search.searchEvents,
        searchQuery.trim().length >= 2 ? { query: searchQuery, limit: 5 } : "skip"
    );

    const indianStates = useMemo(() => State.getStatesOfCountry("IN"), []);

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        if (currentUser?.location) {
            setSelectedState(currentUser.location.state || "");
            setSelectedCity(currentUser.location.city || "");
        }
    }, [currentUser, isLoading]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function debounce(func: (...args: any[]) => void, wait: number) {
        let timeout: NodeJS.Timeout;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const cities = useMemo(() => {
        if (!selectedState) return [];
        const state = indianStates.find((s) => s.name === selectedState);
        if (!state) return [];
        return City.getCitiesOfState("IN", state.isoCode);
    }, [selectedState, indianStates]);

    const debouncedSetQuery = useRef(
        debounce((value) => setSearchQuery(value), 300)
    ).current;

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncedSetQuery(value);
        setShowSearchResults(value.length >= 2);
    };

    const handleEventClick = (slug: string) => {
        setShowSearchResults(false);
        setSearchQuery("");
        router.push(`/events/${slug}`);
    };

    const handleLocationSelect = async (city: string, state: string) => {
        try {
            if (currentUser?.interests && currentUser?.location) {
                await updateLocation({
                    location: { city, state, country: "India" },
                    interests: currentUser.interests,
                });
            }
            const slug = createLocationSlug(city, state);
            router.push(`/explore/${slug}`);
        } catch (error) {
            console.error("Failed to update location:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto mb-12 relative z-30">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                {/* Search Bar */}
                <div className="relative flex-1" ref={searchRef}>
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search for events, artists, or venues..."
                        onChange={handleSearchInput}
                        onFocus={() => {
                            if (searchQuery.length >= 2) setShowSearchResults(true);
                        }}
                        className="pl-12 w-full h-12 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-gray-500"
                    />

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {showSearchResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-4 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                            >
                                {searchLoading ? (
                                    <div className="p-8 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
                                    </div>
                                ) : searchResults &&
                                    (searchResults as Doc<"events">[]).length > 0 ? (
                                    <div className="py-2">
                                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 tracking-wider">
                                            SEARCH RESULTS
                                        </p>
                                        {(searchResults as Doc<"events">[]).map(
                                            (event) => (
                                                <button
                                                    key={event._id}
                                                    onClick={() => handleEventClick(event.slug)}
                                                    className="w-full px-4 py-3 hover:bg-white/5 text-left transition-colors flex items-start gap-4 group"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl shrink-0 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                                                        {getCategoryIcon(event.category)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
                                                            {event.title}
                                                        </p>
                                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {format(
                                                                    event.startDate,
                                                                    "MMM dd"
                                                                )}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {event.city}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {event.ticketType === "free" && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-white/10 text-white"
                                                        >
                                                            Free
                                                        </Badge>
                                                    )}
                                                </button>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No events found matching "{searchQuery}"
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* divider */}
                <div className="hidden md:block w-px bg-white/10 my-2" />

                <div className="flex gap-2">
                    {/* State Select */}
                    <Select
                        value={selectedState}
                        onValueChange={(value) => {
                            setSelectedState(value);
                            setSelectedCity("");
                        }}
                    >
                        <SelectTrigger className="w-full md:w-40 h-12 bg-transparent border-none focus:ring-0 text-gray-300">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <SelectValue placeholder="State" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                            {indianStates.map((state) => (
                                <SelectItem key={state.isoCode} value={state.name}>
                                    {state.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* City Select */}
                    <Select
                        value={selectedCity}
                        onValueChange={(value) => {
                            setSelectedCity(value);
                            if (value && selectedState) {
                                handleLocationSelect(value, selectedState);
                            }
                        }}
                        disabled={!selectedState}
                    >
                        <SelectTrigger className="w-full md:w-40 h-12 bg-transparent border-none focus:ring-0 text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-purple-400" />
                                <SelectValue placeholder="City" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                            {cities.map((city) => (
                                <SelectItem key={city.name} value={city.name}>
                                    {city.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-12 w-12 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl"
                    >
                        <Filter className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
