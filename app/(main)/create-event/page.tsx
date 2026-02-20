/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import UnsplashImagePicker from "@/components/unsplash-image-picker";
import AIEventCreator from "./_components/ai-event-creator";
import UpgradeModal from "@/components/upgrade-modal";

// Import new modular components
import EventDetailsCard from "./_components/event-details-card";
import DateTimeCard from "./_components/date-time-card";
import LocationCard from "./_components/location-card";
import TicketPriceCard from "./_components/ticket-price-card";

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

export default function CreateEventPage() {
    const router = useRouter();
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<"limit" | "color">("limit");

    // Check if user has Pro plan
    const { has } = useAuth();
    const hasPro = has?.({ plan: "pro" }) ?? false;

    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
    const { mutate: createEvent, isLoading } = useConvexMutation(
        api.events.createEvent
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
        formState: { errors },
    } = methods;

    const themeColor = watch("themeColor");
    const ticketType = watch("ticketType");
    const coverImage = watch("coverImage");

    // Color presets - show all for Pro, only default for Free
    const colorPresets = [
        "#1e3a8a", // Default color (always available)
        ...(hasPro ? ["#4c1d95", "#065f46", "#92400e", "#7f1d1d", "#831843"] : []),
    ];

    const handleColorClick = (color: string) => {
        // If not default color and user doesn't have Pro
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

            // Manual validation for dates (since they are optional in schema but required for logic)
            if (!start || !end) {
                toast.error("Please select both date and time for start and end.");
                return;
            }
            if (end.getTime() <= start.getTime()) {
                toast.error("End date/time must be after start date/time.");
                return;
            }

            // Check event limit for Free users
            if (!hasPro && (currentUser?.freeEventsCreated ?? 0) >= 1) {
                setUpgradeReason("limit");
                setShowUpgradeModal(true);
                return;
            }

            // Check if trying to use custom color without Pro
            if (data.themeColor !== "#1e3a8a" && !hasPro) {
                setUpgradeReason("color");
                setShowUpgradeModal(true);
                return;
            }

            await createEvent({
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

            toast.success("Event created successfully! 🎉");
            router.push("/my-events");
        } catch (error: any) {
            toast.error(error.message || "Failed to create event");
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

    return (
        <div
            className="min-h-screen transition-colors duration-500 px-6 py-8 pt-24 lg:rounded-md"
            style={{ backgroundColor: themeColor }}
        >
            <FormProvider {...methods}>
                {/* Header */}
                <div className="max-w-6xl mx-auto flex flex-col gap-5 md:flex-row justify-between mb-10 animate-in fade-in slide-in-from-top-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-black/20 px-4 py-2 rounded-xl inline-block backdrop-blur-sm border border-white/10">Create Event</h1>
                        {!hasPro && (
                            <p className="text-sm text-white/70 mt-2 px-1">
                                Free: {currentUser?.freeEventsCreated || 0}/1 events created
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* We can put other actions here */}
                        <AIEventCreator onEventGenerated={handleAIGenerate} />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-10">
                    {/* LEFT: Image + Theme */}
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
                                        Add Cover Image
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to change
                            </div>
                        </div>

                        <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
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
                                        className="w-10 h-10 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all"
                                        title="Unlock more colors with Pro"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                        <EventDetailsCard />
                        <DateTimeCard />
                        <LocationCard />
                        <TicketPriceCard />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            size="lg"
                            className="w-full py-8 text-xl rounded-xl shadow-2xl bg-white text-black hover:bg-gray-100 hover:scale-[1.01] transition-all font-bold"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Your Event...
                                </>
                            ) : (
                                "Launch Event 🚀"
                            )}
                        </Button>
                    </form>
                </div>
            </FormProvider>

            {/* Unsplash Picker */}
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

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                trigger={upgradeReason}
            />
        </div>
    );
}
