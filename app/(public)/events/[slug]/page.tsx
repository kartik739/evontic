/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Share2,
    Ticket,
    ExternalLink,
    Loader2,
    CheckCircle,
    ArrowLeft,
    Heart,
    ArrowRight,
} from "lucide-react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCategoryIcon, getCategoryLabel } from "@/lib/data";
import RegisterModal from "./_components/register-model";
import { cn } from "@/lib/utils";

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Fetch event details
    const { data: event, isLoading } = useConvexQuery(api.events.getEventBySlug, {
        slug: params.slug as string,
    });

    // Check if user is already registered
    const { data: registration } = useConvexQuery(
        api.registrations.checkRegistration,
        event?._id ? { eventId: event._id } : "skip"
    );

    const [isSaved, setIsSaved] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share && event) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.description.slice(0, 100) + "...",
                    url: url,
                });
            } catch (error) {
                // User cancelled or error occurred
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        }
    };

    const handleAddToCalendar = () => {
        if (!event) return;

        const startTime = new Date(event.startDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endTime = new Date(event.endDate).toISOString().replace(/-|:|\.\d\d\d/g, "");

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description.slice(0, 100)}...
LOCATION:${event.venue ? `${event.venue}, ` : ""}${event.city}, ${event.country}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${event.slug}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        toast.success(isSaved ? "Removed from favorites" : "Saved to favorites!");
    };

    const handleViewProfile = () => {
        toast.info("Organizer profiles are coming soon!");
    };

    const handleRegister = () => {
        if (!user) {
            toast.error("Please sign in to register");
            return;
        }
        setShowRegisterModal(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!event) {
        notFound();
    }

    const isEventFull = event.registrationCount >= event.capacity;
    const isEventPast = event.endDate < Date.now();
    const isOrganizer = user?.id === event.organizerId;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                {/* Background Image with Blur */}
                {event.coverImage ? (
                    <Image
                        src={event.coverImage}
                        alt="Background"
                        fill
                        className="object-cover blur-[50px] opacity-50 scale-110"
                        priority
                    />
                ) : (
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{ backgroundColor: event.themeColor }}
                    />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black" />

                <div className="relative container mx-auto h-full px-4 flex flex-col justify-end pb-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6"
                    >
                        <Button
                            variant="ghost"
                            className="text-white/70 hover:text-white hover:bg-white/10 mb-6 pl-0"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Explore
                        </Button>

                        <div className="flex gap-2 mb-4">
                            <Badge
                                variant="secondary"
                                className="bg-white/10 backdrop-blur-md text-white border-white/10 hover:bg-white/20"
                            >
                                {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "border-white/10 text-white backdrop-blur-md",
                                    event.ticketType === "free" ? "bg-green-500/20 text-green-200 border-green-500/20" : "bg-purple-500/20 text-purple-200 border-purple-500/20"
                                )}
                            >
                                {event.ticketType === "free" ? "Free Event" : `Starts at ₹${event.ticketPrice}`}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70 leading-tight mb-4 max-w-4xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                <span>{format(event.startDate, "EEEE, MMMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-purple-400" />
                                <span>{event.city}, {event.state || event.country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-400" />
                                <span>{event.registrationCount} attending</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Event Image (Focus) */}
                        {event.coverImage && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={event.coverImage}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* About Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-white">About This Event</h2>
                                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {event.description}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Location Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                        Location & Venue
                                    </h2>
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-semibold text-white">{event.venue || "Venue Details"}</h3>
                                            <p className="text-gray-400">
                                                {event.address ? event.address + ", " : ""}
                                                {event.city}, {event.state || event.country}
                                            </p>
                                        </div>

                                        {event.venue && (
                                            <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white" asChild>
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + " " + event.city)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Open in Maps <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Organizer Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold mb-6 text-white">Organizer</h2>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16 border-2 border-purple-500/20">
                                            <AvatarImage src="" />
                                            <AvatarFallback className="bg-purple-500/20 text-purple-200 text-xl font-bold">
                                                {event.organizerName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-lg text-white">{event.organizerName}</p>
                                            <p className="text-gray-400">Event Organizer</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="ml-auto text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                                            onClick={handleViewProfile}
                                        >
                                            View Profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sticky Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:sticky lg:top-24 h-fit space-y-4"
                    >
                        <Card className="bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
                            <div className="h-2 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500" />
                            <CardContent className="p-6 space-y-6">
                                {/* Date and Time */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white">Date & Time</h3>
                                    <div className="flex items-start gap-4 text-gray-300">
                                        <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-white">{format(event.startDate, "EEEE, MMMM dd, yyyy")}</p>
                                            <p className="text-sm text-gray-400">
                                                {format(event.startDate, "h:mm a")} - {format(event.endDate, "h:mm a")}
                                            </p>
                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-purple-400 mt-1"
                                                onClick={handleAddToCalendar}
                                            >
                                                Add to Calendar
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-white/10" />

                                {/* Ticket Info */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Ticket Price</span>
                                        <span className="text-2xl font-bold text-white">
                                            {event.ticketType === "free" ? "Free" : `₹${event.ticketPrice}`}
                                        </span>
                                    </div>
                                    {event.ticketType === "paid" && (
                                        <p className="text-xs text-gray-500 text-right">
                                            *Payment to be collected at venue
                                        </p>
                                    )}
                                </div>

                                {/* Call to Action */}
                                <div className="pt-2">
                                    {registration ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="font-medium">
                                                    You&apos;re registered!
                                                </span>
                                            </div>
                                            <Button
                                                className="w-full h-12 gap-2 bg-white text-black hover:bg-gray-200"
                                                onClick={() => router.push("/my-tickets")}
                                            >
                                                <Ticket className="w-4 h-4" />
                                                View Ticket
                                            </Button>
                                        </div>
                                    ) : isEventPast ? (
                                        <Button className="w-full h-12 bg-gray-800 text-gray-400 cursor-not-allowed" disabled>
                                            Event Ended
                                        </Button>
                                    ) : isEventFull ? (
                                        <Button className="w-full h-12 bg-gray-800 text-gray-400 cursor-not-allowed" disabled>
                                            Sold Out
                                        </Button>
                                    ) : isOrganizer ? (
                                        <Button
                                            className="w-full h-12 bg-white/10 hover:bg-white/20 text-white"
                                            onClick={() => router.push(`/events/${event.slug}/manage`)}
                                        >
                                            Manage Event
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full h-12 gap-2 text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25"
                                            onClick={handleRegister}
                                        >
                                            Register Now
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full gap-2 border-white/10 hover:bg-white/5 hover:text-white"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </Button>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full gap-2 border-white/10 hover:bg-white/5 hover:text-white",
                                        isSaved && "text-red-500 border-red-500/20 bg-red-500/10 hover:bg-red-500/20 hover:text-red-400"
                                    )}
                                    onClick={handleSave}
                                >
                                    <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
                                    {isSaved ? "Saved" : "Save"}
                                </Button>

                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Register Modal */}
            {
                showRegisterModal && (
                    <RegisterModal
                        event={event}
                        isOpen={showRegisterModal}
                        onClose={() => setShowRegisterModal(false)}
                    />
                )
            }
        </div >
    );
}

