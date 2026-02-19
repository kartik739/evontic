"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doc } from "@/convex/_generated/dataModel";
import { Loader2, MapPin, Calendar, Mail } from "lucide-react";
import EventCard from "@/components/event-card";
import { motion } from "framer-motion";

export default function OrganizerProfilePage() {
    const params = useParams();
    const organizerId = params.id as string;

    const { data: organizer, isLoading: isLoadingOrganizer } = useConvexQuery(api.users.getUserById, { userId: organizerId });
    const { data: events, isLoading: isLoadingEvents } = useConvexQuery(api.events.getEventsByOrganizer, { organizerId: organizerId });

    if (isLoadingOrganizer || isLoadingEvents) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!organizer) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Organizer Not Found</h1>
                    <p className="text-gray-400">The organizer you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative">
            {/* Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-purple-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Profile */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-purple-500/30">
                        <AvatarImage src={organizer.imageUrl} />
                        <AvatarFallback className="bg-purple-500/20 text-purple-200 text-4xl font-bold">
                            {organizer.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center md:text-left space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">{organizer.name}</h1>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                                    Organizer
                                </span>
                            </div>
                            {organizer.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{organizer.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Events Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-purple-500" />
                        Events by {organizer.name}
                    </h2>

                    {!events || events.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-gray-400 text-lg">No events found for this organizer.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event: Doc<"events">, index: number) => (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
