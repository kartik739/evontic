/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { Plus, Loader2, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EventCard from "@/components/event-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyEventsPage() {
    const router = useRouter();

    const { data: events, isLoading } = useConvexQuery(api.events.getMyEvents);
    const { mutate: deleteEvent } = useConvexMutation(api.events.deleteEvent);

    const handleDelete = async (eventId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event? This action cannot be undone and will permanently delete the event and all associated registrations."
        );

        if (!confirmed) return;

        try {
            await deleteEvent({ eventId: eventId as Id<"events"> });
            toast.success("Event deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete event");
        }
    };

    const handleEdit = (eventId: string) => {
        router.push(`/edit-event/${eventId}`);
    };

    // Navigate to event details
    const handleEventClick = (eventId: string) => {
        router.push(`/events/${events?.find((e: Doc<"events">) => e._id === eventId)?.slug}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    const upcomingEvents = events?.filter((e: Doc<"events">) => e.endDate >= Date.now()) || [];
    const pastEvents = events?.filter((e: Doc<"events">) => e.endDate < Date.now()) || [];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8 pt-24 md:pt-32 pb-24 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] left-[-10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
                        >
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-gray-300">
                                Organizer Dashboard
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400"
                        >
                            My Events
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button asChild className="gap-2 bg-purple-600 hover:bg-purple-700 text-white border-0">
                            <Link href="/create-event">
                                <Plus className="w-4 h-4" />
                                Create New Event
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="bg-white/5 border border-white/10 text-gray-400">
                        <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                            Upcoming ({upcomingEvents.length})
                        </TabsTrigger>
                        <TabsTrigger value="past" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                            Past ({pastEvents.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-8">
                        {upcomingEvents.length === 0 ? (
                            <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-xl font-bold text-white mb-2">No upcoming events</h2>
                                <p className="text-gray-400 mb-6">You don't have any upcoming events scheduled.</p>
                                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                                    <Link href="/create-event">Create Event</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upcomingEvents.map((event: Doc<"events">, i: number) => (
                                    <motion.div
                                        key={event._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <EventCard
                                            event={event}
                                            action="event"
                                            onClick={() => handleEventClick(event._id)}
                                            onDelete={() => handleDelete(event._id)}
                                            onEdit={() => handleEdit(event._id)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="past" className="mt-8">
                        {pastEvents.length === 0 ? (
                            <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                                <h2 className="text-xl font-bold text-white mb-2">No past events</h2>
                                <p className="text-gray-400">Your event history will appear here.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pastEvents.map((event: Doc<"events">, i: number) => (
                                    <motion.div
                                        key={event._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="relative opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                            <EventCard
                                                event={event}
                                                action="event"
                                                onClick={() => handleEventClick(event._id)}
                                                onDelete={() => handleDelete(event._id)}
                                            // No edit for past events typically, or maybe keep it? Let's keep it but maybe it's less relevant.
                                            />
                                            <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white font-bold border border-white/10 backdrop-blur">
                                                ENDED
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
