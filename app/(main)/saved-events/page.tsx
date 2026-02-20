"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Loader2, Heart } from "lucide-react";
import EventCard from "@/components/event-card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Doc } from "@/convex/_generated/dataModel";

export default function SavedEventsPage() {
    const router = useRouter();
    const { data: savedEvents, isLoading } = useConvexQuery(api.savedEvents.getSavedEvents);

    const handleEventClick = (slug: string) => {
        router.push(`/events/${slug}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    const typedSavedEvents = savedEvents as Doc<"events">[] | undefined;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[10%] w-[30%] h-[40%] bg-pink-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Saved Events</h1>
                    <p className="text-gray-400">Events you&apos;re interested in.</p>
                </div>

                {!typedSavedEvents || typedSavedEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                        <div className="p-6 bg-black/40 rounded-full mb-6 border border-white/5">
                            <Heart className="w-12 h-12 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No saved events yet</h2>
                        <p className="text-gray-400 max-w-md text-center">
                            Browse events and tap the heart icon to save them for later.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {typedSavedEvents.map((event, i) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <EventCard
                                    event={event}
                                    variant="grid"
                                    onClick={() => handleEventClick(event.slug)}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
