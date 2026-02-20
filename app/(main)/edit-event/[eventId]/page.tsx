/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import UnsplashImagePicker from "@/components/unsplash-image-picker";
import AIEventCreator from "@/app/(main)/create-event/_components/ai-event-creator";
import UpgradeModal from "@/components/upgrade-modal";

import EventDetailsCard from "@/app/(main)/create-event/_components/event-details-card";
import DateTimeCard from "@/app/(main)/create-event/_components/date-time-card";
import LocationCard from "@/app/(main)/create-event/_components/location-card";
import TicketPriceCard from "@/app/(main)/create-event/_components/ticket-price-card";

// HH:MM in 24h
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const eventSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Please select a category"),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    startTime: z.string().regex(timeRegex, "Start time must be HH:MM"),
    endTime: z.string().regex(timeRegex, "End time must be HH:MM"),
    locationType: z.enum(["physical", "online"]).default("physical"),
    venue: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    address: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    ticketType: z.enum(["free", "paid"]).default("free"),
    ticketPrice: z.number().optional(),
    coverImage: z.string().optional(),
    themeColor: z.string().default("#1e3a8a"),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.eventId as Id<"events">;

    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<"limit" | "color">("limit");

    const { has } = useAuth();
    const hasPro = has?.({ plan: "pro" }) ?? false;

    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
    const { data: event, isLoading: isEventLoading } = useConvexQuery(api.events.getEventById, { eventId });

    const { mutate: updateEvent, isLoading: isUpdating } = useConvexMutation(
        api.events.updateEvent
    );

    const methods = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema) as any,
        defaultValues: {
            locationType: "physical",
            ticketType: "free",
            capacity: 50,
            themeColor: "#1e3a8a",
            category: "",
            state: "",
            city: "",
            startTime: "",
            endTime: "",
            venue: "",
            address: "",
            coverImage: "",
        },
    });

    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    // Load existing event data when ready
    useEffect(() => {
        if (event && currentUser) {
            // Authorized check
            if (event.organizerId !== currentUser._id) {
                toast.error("You are not authorized to edit this event.");
                router.push("/my-events");
                return;
            }

            const formatTime = (dateNum: number) => {
                const date = new Date(dateNum);
                return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            };

            reset({
                title: event.title,
                description: event.description,
                category: event.category,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
                startTime: formatTime(event.startDate),
                endTime: formatTime(event.endDate),
                locationType: event.locationType,
                venue: event.venue || "",
                address: event.address || "",
                city: event.city,
                state: event.state || "",
                capacity: event.capacity,
                ticketType: event.ticketType,
                ticketPrice: event.ticketPrice || 0,
                coverImage: event.coverImage || "",
                themeColor: event.themeColor || "#1e3a8a",
            });
        }
    }, [event, currentUser, reset, router]);

    const themeColor = watch("themeColor");
    const coverImage = watch("coverImage");

    const colorPresets = [
        "#1e3a8a",
        ...(hasPro ? ["#4c1d95", "#065f46", "#92400e", "#7f1d1d", "#831843"] : []),
    ];

    const handleColorClick = (color: string) => {
        if (color !== "#1e3a8a" && !hasPro) {
            setUpgradeReason("color");
            setShowUpgradeModal(true);
            return;
        }
        setValue("themeColor", color);
    };

    const combineDateTime = (date: Date, time: string) => {
        if (!date || !time) return null;
        const [hh, mm] = time.split(":").map(Number);
        const d = new Date(date);
        d.setHours(hh, mm, 0, 0);
        return d;
    };

    const onSubmit = async (data: EventFormValues) => {
        try {
            const start = combineDateTime(data.startDate!, data.startTime);
            const end = combineDateTime(data.endDate!, data.endTime);

            if (!start || !end) {
                toast.error("Please select both date and time for start and end.");
                return;
            }
            if (end.getTime() <= start.getTime()) {
                toast.error("End date/time must be after start date/time.");
                return;
            }

            if (data.themeColor !== "#1e3a8a" && !hasPro) {
                setUpgradeReason("color");
                setShowUpgradeModal(true);
                return;
            }

            await updateEvent({
                eventId,
                title: data.title,
                description: data.description,
                category: data.category,
                tags: [data.category],
                startDate: start.getTime(),
                endDate: end.getTime(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                locationType: data.locationType,
                venue: data.venue || undefined,
                address: data.address || undefined,
                city: data.city,
                state: data.state || undefined,
                country: "India",
                capacity: data.capacity,
                ticketType: data.ticketType,
                ticketPrice: data.ticketPrice || undefined,
                coverImage: data.coverImage || undefined,
                themeColor: data.themeColor,
                hasPro,
            });

            toast.success("Event updated successfully! ✏️");
            router.push(`/events/${event?.slug}/manage`);
        } catch (error: any) {
            toast.error(error.message || "Failed to update event");
        }
    };

    const handleAIGenerate = (generatedData: any) => {
        setValue("title", generatedData.title);
        setValue("description", generatedData.description);
        setValue("category", generatedData.category);
        setValue("capacity", generatedData.suggestedCapacity);
        // @ts-ignore
        setValue("ticketType", generatedData.suggestedTicketType);
        toast.success("Event details filled! Customize as needed.");
    };

    if (isEventLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h1 className="text-3xl font-bold">Event Not Found</h1>
                <p className="text-gray-400">This event may have been deleted or does not exist.</p>
                <Button onClick={() => router.push("/my-events")} variant="outline" className="border-white/20">
                    Back to My Events
                </Button>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen transition-colors duration-500 px-6 py-8 pt-24 lg:rounded-md"
            style={{ backgroundColor: themeColor }}
        >
            <FormProvider {...methods}>
                <div className="max-w-6xl mx-auto flex flex-col gap-5 md:flex-row justify-between mb-10 animate-in fade-in slide-in-from-top-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-black/20 px-4 py-2 rounded-xl inline-block backdrop-blur-sm border border-white/10">Edit Event</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <AIEventCreator onEventGenerated={handleAIGenerate} />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-10">
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div
                            className="aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer border-2 border-dashed border-white/20 bg-black/10 hover:bg-black/20 hover:border-white/40 transition-all group relative"
                            onClick={() => setShowImagePicker(true)}
                        >
                            {coverImage ? (
                                <Image
                                    src={coverImage}
                                    alt="Cover"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    width={500}
                                    height={500}
                                    priority
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-white">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <span className="opacity-70 text-sm font-medium">
                                        Update Cover Image
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white">
                                Click to change
                            </div>
                        </div>

                        <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-sm text-white">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Theme Color</Label>
                                {!hasPro && (
                                    <Badge variant="secondary" className="text-xs gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                                        <Sparkles className="w-3 h-3" />
                                        Pro
                                    </Badge>
                                )}
                            </div>
                            <div className="flex gap-3 flex-wrap justify-center">
                                {colorPresets.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`w-10 h-10 rounded-full shadow-lg transition-transform ${!hasPro && color !== "#1e3a8a"
                                            ? "opacity-40 cursor-not-allowed"
                                            : "hover:scale-110 active:scale-95"
                                            } ${themeColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorClick(color)}
                                        title={
                                            !hasPro && color !== "#1e3a8a"
                                                ? "Upgrade to Pro for custom colors"
                                                : "Select color"
                                        }
                                    />
                                ))}
                                {!hasPro && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUpgradeReason("color");
                                            setShowUpgradeModal(true);
                                        }}
                                        className="w-10 h-10 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all text-white"
                                        title="Unlock more colors with Pro"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                        <EventDetailsCard />
                        <DateTimeCard />
                        <LocationCard />
                        <TicketPriceCard />

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full py-8 text-xl rounded-xl border-white/20 bg-black/20 text-white hover:bg-black/40"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                size="lg"
                                className="w-full py-8 text-xl rounded-xl shadow-2xl bg-white text-black hover:bg-gray-100 hover:scale-[1.01] transition-all font-bold"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                                    </>
                                ) : (
                                    "Save Changes ✓"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </FormProvider>

            {showImagePicker && (
                <UnsplashImagePicker
                    isOpen={showImagePicker}
                    onClose={() => setShowImagePicker(false)}
                    onSelect={(url) => {
                        setValue("coverImage", url);
                        setShowImagePicker(false);
                    }}
                />
            )}

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                trigger={upgradeReason}
            />
        </div>
    );
}
