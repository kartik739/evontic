"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { createLocationSlug } from "@/lib/location-utils";
import { Doc } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "@/components/event-card";
import SearchHeader from "@/components/explore/search-header";
import { motion } from "framer-motion";

export default function ExplorePage() {
    const router = useRouter();
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    // Fetch current user for location
    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

    // Fetch events
    const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
        api.explore.getFeaturedEvents,
        { limit: 3 }
    );

    const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
        api.explore.getEventsByLocation,
        {
            city: currentUser?.location?.city || "Gurugram",
            state: currentUser?.location?.state || "Haryana",
            limit: 4,
        }
    );

    const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
        api.explore.getPopularEvents,
        { limit: 8 }
    );

    const { data: categoryCounts } = useConvexQuery(
        api.explore.getCategoryCounts
    );

    const handleEventClick = (slug: string) => {
        router.push(`/events/${slug}`);
    };

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/explore/${categoryId}`);
    };

    const handleViewLocalEvents = () => {
        const city = currentUser?.location?.city || "Gurugram";
        const state = currentUser?.location?.state || "Haryana";
        const slug = createLocationSlug(city, state);
        router.push(`/explore/${slug}`);
    };

    // Format categories with counts
    const categoriesWithCounts = CATEGORIES.map((cat) => ({
        ...cat,
        count: (categoryCounts as Record<string, number>)?.[cat.id] || 0,
    }));

    // Loading state
    const isLoading = loadingFeatured || loadingLocal || loadingPopular;

    const typedFeaturedEvents = featuredEvents as Doc<"events">[] | undefined;
    const typedLocalEvents = localEvents as Doc<"events">[] | undefined;
    const typedPopularEvents = popularEvents as Doc<"events">[] | undefined;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8 pt-24 md:pt-32 pb-24 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-20">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-gray-300">
                            Discover extraordinary experiences
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Find your next <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-orange-400">
                            adventure.
                        </span>
                    </motion.h1>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <SearchHeader />
                </motion.div>

                {isLoading ? (
                    <div className="flex h-40 items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                ) : (
                    <>
                        {/* Categories */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-semibold">Browse Categories</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                {categoriesWithCounts.map((category, i) => (
                                    <motion.button
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="group relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all text-left"
                                    >
                                        import {CategoryIcon} from "@/components/category-icon";

                                        // ... inside component render ...
                                        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left text-purple-400">
                                            <CategoryIcon name={category.icon} className="w-10 h-10" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-white mb-1">
                                            {category.label}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {category.count} events
                                        </p>
                                    </motion.button>
                                ))}
                            </div>
                        </section>

                        {/* Local Events */}
                        {typedLocalEvents && typedLocalEvents.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-1">Happening Near You</h2>
                                        <p className="text-gray-400 text-sm">
                                            In {currentUser?.location?.city || "your area"}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="text-purple-400 hover:text-purple-300 hover:bg-white/5"
                                        onClick={handleViewLocalEvents}
                                    >
                                        View All <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {typedLocalEvents.map((event, i) => (
                                        <motion.div
                                            key={event._id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                        >
                                            <EventCard
                                                event={event}
                                                variant="grid"
                                                onClick={() => handleEventClick(event.slug)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Popular Events */}
                        {typedPopularEvents && typedPopularEvents.length > 0 && (
                            <section>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-1">Trending Now</h2>
                                    <p className="text-gray-400 text-sm">Most popular events across the country</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {typedPopularEvents.map((event, i) => (
                                        <motion.div
                                            key={event._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <EventCard
                                                event={event}
                                                variant="list" // Use simplified vertical/horizontal card for list
                                                onClick={() => handleEventClick(event.slug)}
                                                className="h-full"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

