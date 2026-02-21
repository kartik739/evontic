"use client";

import { Calendar, MapPin, Users, Trash2, X, QrCode, Eye, Pencil, Heart } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { getCategoryIcon, getCategoryLabel } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

interface EventCardProps {
    event: Doc<"events">;
    onClick?: (e?: MouseEvent) => void;
    onDelete?: (id: Id<"events">) => void;
    onEdit?: (id: Id<"events">) => void;
    variant?: "grid" | "list";
    action?: "event" | "ticket" | null;
    className?: string;
}

export default function EventCard({
    event,
    onClick,
    onDelete,
    onEdit,
    variant = "grid", // "grid" or "list"
    action = null, // "event" | "ticket" | null
    className = "",
}: EventCardProps) {
    const toggleSave = useMutation(api.savedEvents.toggleSavedEvent);
    const isSaved = useQuery(api.savedEvents.isEventSaved, { eventId: event._id });

    const handleToggleSave = async () => {
        try {
            const saved = await toggleSave({ eventId: event._id });
            toast.success(saved ? "Event saved" : "Event removed from saved");
        } catch (error) {
            console.error("Failed to save event", error);
            toast.error("Failed to save event. Please try again.");
        }
    };

    // List variant (compact horizontal layout)
    if (variant === "list") {
        return (
            <Card
                className={cn(
                    "py-0 group cursor-pointer hover:shadow-xl transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10",
                    className
                )}
                onClick={onClick}
            >
                <CardContent className="p-3 flex gap-3 sm:gap-4">
                    {/* Event Image */}
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg shrink-0 overflow-hidden relative">
                        {event.coverImage ? (
                            <Image
                                src={event.coverImage}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div
                                className="absolute inset-0 flex items-center justify-center text-3xl relative overflow-hidden"
                                style={{ background: `linear-gradient(135deg, ${event.themeColor || '#1e1b4b'} 0%, #000000 100%)` }}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
                                <div className="relative z-10 drop-shadow-lg">
                                    {getCategoryIcon(event.category)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-semibold text-base mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
                            {event.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                            {format(event.startDate, "EEE, dd MMM, HH:mm")}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">
                                {event.locationType === "online" ? "Online Event" : event.city}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Grid variant (default - original design)
    return (
        <Card
            className={cn(
                "overflow-hidden group pt-0 border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300",
                onClick && "cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:bg-white/10",
                className
            )}
            onClick={onClick}
        >
            <div className="relative h-48 overflow-hidden">
                {event.coverImage ? (
                    <Image
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={500}
                        height={192}
                        priority
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center text-4xl relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${event.themeColor || '#1e1b4b'} 0%, #000000 100%)` }}
                    >
                        {/* Cosmic Nebula Effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

                        <div className="relative z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl">
                            {getCategoryIcon(event.category)}
                        </div>
                    </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                        className={cn("h-8 w-8 rounded-full bg-black/50 backdrop-blur hover:bg-black/70 border-none", isSaved && "text-red-500 hover:text-red-400")}
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSave();
                        }}
                    >
                        <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
                    </Button>
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur text-white border-none">
                        {event.ticketType === "free" ? "Free" : "Paid"}
                    </Badge>
                </div>
            </div>

            <CardContent className="space-y-4 pt-4">
                <div>
                    <Badge variant="outline" className="mb-2 border-white/10 text-gray-300">
                        {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                    </Badge>
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-400 transition-colors leading-tight">
                        {event.title}
                    </h3>
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{format(event.startDate, "PPP")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="line-clamp-1">
                            {event.locationType === "online"
                                ? "Online Event"
                                : `${event.city}, ${event.state || event.country}`}
                        </span>
                    </div>
                </div>

                {action && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {/* Primary button */}
                        <Button
                            variant="default"
                            size="sm"
                            className="flex-1 gap-2 bg-white/10 hover:bg-white/20 text-white border-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.(e);
                            }}
                        >
                            {action === "event" ? (
                                <>
                                    <Eye className="w-4 h-4" />
                                    View
                                </>
                            ) : (
                                <>
                                    <QrCode className="w-4 h-4" />
                                    Show Ticket
                                </>
                            )}
                        </Button>

                        {/* Edit button */}
                        {onEdit && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 border-white/10 text-gray-300 hover:text-white hover:bg-white/10 bg-transparent"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(event._id);
                                }}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                        )}

                        {/* Secondary button - delete / cancel */}
                        {onDelete && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 border-red-900/50 text-red-500 hover:text-red-400 hover:bg-red-900/20 bg-transparent"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(event._id);
                                }}
                            >
                                {action === "event" ? (
                                    <Trash2 className="w-4 h-4" />
                                ) : (
                                    <X className="w-4 h-4" />
                                )}
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

