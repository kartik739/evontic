"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Ticket, QrCode, Search, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-blue-400" />,
            title: "Discover Events",
            description: "Browse through thousands of events in your area or online. Filter by category, date, or location."
        },
        {
            icon: <Ticket className="w-8 h-8 text-purple-400" />,
            title: "Book Tickets",
            description: "Secure your spot instantly with our seamless checkout process. Receive digital tickets immediately."
        },
        {
            icon: <QrCode className="w-8 h-8 text-pink-400" />,
            title: "Check In",
            description: "Show your QR code at the venue for quick, contactless entry. No printing required."
        },
        {
            icon: <PartyPopper className="w-8 h-8 text-orange-400" />,
            title: "Enjoy the Experience",
            description: "Connect with others, learn something new, or just have a great time!"
        }
    ];

    const organizerSteps = [
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "Create with AI",
            description: "Describe your event and let our AI generate details, images, and schedules for you."
        },
        {
            icon: <Calendar className="w-8 h-8 text-green-400" />,
            title: "Manage & Sell",
            description: "Track sales, manage attendees, and view analytics in real-time."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        How Evontic Works
                    </h1>
                    <p className="text-xl text-gray-400">
                        Whether you're looking for something to do or planning the next big thing, we've got you covered.
                    </p>
                </div>

                {/* For Attendees */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 text-center">For Attendees</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="absolute -top-6 left-6 p-4 rounded-xl bg-black border border-white/10 shadow-xl">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mt-8 mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                            <Link href="/explore">Explore Events</Link>
                        </Button>
                    </div>
                </div>

                {/* For Organizers */}
                <div>
                    <h2 className="text-3xl font-bold mb-12 text-center">For Organizers</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {organizerSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="p-4 rounded-xl bg-white/5 h-fit">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white border-0">
                            <Link href="/create-event">Start Organizing</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
