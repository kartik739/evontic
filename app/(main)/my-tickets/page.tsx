/* eslint-disable react-hooks/purity */
"use client";

import { useRouter } from "next/navigation";
import { Loader2, Ticket, Receipt, Sparkles } from "lucide-react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import EventCard from "@/components/event-card";
import TicketCard from "./_components/ticket-card";

// Define a type for registration with event populated
type RegistrationWithEvent = Doc<"registrations"> & { event: Doc<"events"> };

export default function MyTicketsPage() {
    const router = useRouter();

    const { data: registrations, isLoading } = useConvexQuery(
        api.registrations.getMyRegistrations
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    const now = Date.now();

    const activeRegistrations = registrations as RegistrationWithEvent[] | undefined;

    const upcomingTickets = activeRegistrations?.filter(
        (reg) =>
            reg.event && reg.event.startDate >= now && reg.status === "confirmed"
    );
    const pastTickets = activeRegistrations?.filter(
        (reg) =>
            reg.event && (reg.event.startDate < now || reg.status === "cancelled")
    );

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8 pt-24 md:pt-32 pb-24 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4"
                        >
                            <Receipt className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-gray-300">
                                Manage your bookings
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400"
                        >
                            My Tickets
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white">
                            <Link href="/explore">
                                <Ticket className="w-4 h-4 mr-2" />
                                Browse Events
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Upcoming Tickets */}
                {upcomingTickets && upcomingTickets.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            Upcoming Events
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingTickets.map((registration, i) => (
                                <motion.div
                                    key={registration._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <TicketCard booking={registration} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Past Tickets */}
                {pastTickets && pastTickets.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-400">Past Events</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastTickets.map((registration, i) => (
                                <motion.div
                                    key={registration._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <EventCard
                                        event={registration.event}
                                        action={null}
                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {(!upcomingTickets || upcomingTickets.length === 0) && (!pastTickets || pastTickets.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-12 text-center bg-white/5 border-white/10 backdrop-blur-sm">
                            <div className="max-w-md mx-auto space-y-4">
                                <div className="text-6xl mb-4 grayscale opacity-50">🎟️</div>
                                <h2 className="text-2xl font-bold text-white">No tickets yet</h2>
                                <p className="text-gray-400">
                                    Register for events to see your tickets here
                                </p>
                                <Button asChild className="gap-2 bg-purple-600 hover:bg-purple-700 text-white border-0">
                                    <Link href="/explore">
                                        <Ticket className="w-4 h-4" /> Browse Events
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

