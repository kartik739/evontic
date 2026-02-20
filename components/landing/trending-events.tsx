"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import EventCard from "@/components/event-card";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@/convex/_generated/dataModel";

export default function TrendingEvents() {
    // Fetch top 3 or 6 popular events for the homepage
    const { data: popularEvents, isLoading } = useConvexQuery(
        api.explore.getPopularEvents,
        { limit: 6 }
    );

    const typedEvents = popularEvents as Doc<"events">[] | undefined;

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4"
                        >
                            <Flame className="w-4 h-4" />
                            <span>Hot Right Now</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                        >
                            Trending Events
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-xl text-lg"
                        >
                            Discover the most sought-after experiences everyone is talking about. Don't miss out on these exclusive gatherings.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/explore"
                            className="group inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl border border-white/10"
                        >
                            Explore all
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col space-y-3">
                                <Skeleton className="h-48 w-full rounded-xl bg-white/5" />
                                <Skeleton className="h-6 w-3/4 bg-white/5" />
                                <Skeleton className="h-4 w-1/2 bg-white/5" />
                            </div>
                        ))}
                    </div>
                ) : typedEvents && typedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {typedEvents.map((event, i) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <EventCard
                                    event={event}
                                    variant="list"
                                    className="h-full bg-white/5 border-white/10 hover:bg-white/10"
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                        <Flame className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">Check back soon</h3>
                        <p className="text-gray-400">We're gathering the hottest events for you.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
