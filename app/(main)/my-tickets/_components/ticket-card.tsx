"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, MapPin, QrCode, ArrowRight, CornerUpLeft } from "lucide-react";
import Image from "next/image";
import QRCode from "react-qr-code"; // Ensure this package is installed
import { Doc } from "@/convex/_generated/dataModel";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

interface TicketCardProps {
    booking: Doc<"registrations"> & { event: Doc<"events"> };
}

export default function TicketCard({ booking }: TicketCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showFullQR, setShowFullQR] = useState(false);

    return (
        <>
            <div
                className="group w-full h-[320px] [perspective:1000px] cursor-pointer"
                onClick={() => !showFullQR && setIsFlipped(!isFlipped)}
            >
                <div
                    className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                >

                    {/* FRONT FACE */}
                    <div className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col [backface-visibility:hidden]">
                        {/* Event Image Header */}
                        <div className="relative h-32 bg-gray-900">
                            {booking.event.coverImage ? (
                                <Image
                                    src={booking.event.coverImage}
                                    alt={booking.event.title}
                                    fill
                                    className="object-cover opacity-80"
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center text-4xl relative overflow-hidden"
                                    style={{ background: `linear-gradient(135deg, ${booking.event.themeColor || '#1e1b4b'} 0%, #000000 100%)` }}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />
                            <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10 uppercase tracking-widest font-bold">
                                {booking.event.ticketType === "free" ? "Free" : "Paid"}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{booking.event.title}</h3>
                                <p className="text-gray-400 text-sm flex items-center gap-2 mb-3">
                                    <MapPin className="w-3 h-3 text-purple-400" />
                                    {booking.event.locationType === "online" ? "Online" : booking.event.city}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 p-2 rounded-lg border border-white/5">
                                    <Calendar className="w-3 h-3 text-purple-400" />
                                    {format(booking.event.startDate, "EEE, MMM d • h:mm a")}
                                </div>
                            </div>

                            {/* Flip Button Prompt */}
                            <div
                                className="w-full mt-4 text-purple-300 text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors group/btn cursor-pointer hover:text-white"
                            >
                                <QrCode className="w-4 h-4" />
                                Tap for Ticket <ArrowRight className="w-3 h-3 opacity-50 group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* BACK FACE */}
                    <div
                        className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center border-4 border-purple-500/20 [transform:rotateY(180deg)] [backface-visibility:hidden]"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />

                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="absolute top-3 left-3 text-gray-400 hover:text-gray-900 transition-colors p-2"
                        >
                            <CornerUpLeft className="w-5 h-5" />
                        </button>

                        <div
                            className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm mb-4 cursor-zoom-in hover:shadow-md transition-shadow"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowFullQR(true);
                            }}
                        >
                            <QRCode value={booking.qrCode} size={140} />
                        </div>

                        <div className="space-y-1">
                            <p className="font-bold text-gray-900 text-lg leading-tight">{booking.attendeeName}</p>
                            <p className="text-xs text-gray-400 font-mono tracking-wider break-all">{booking.qrCode}</p>
                        </div>

                        <div className="mt-auto w-full border-t border-dashed border-gray-200 pt-3 flex justify-between text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                            <span>Admit One</span>
                            <span>Tap QR to Expand</span>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={showFullQR} onOpenChange={setShowFullQR}>
                <DialogContent className="sm:max-w-md bg-white text-black border-0">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold">{booking.event.title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="p-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
                            <QRCode value={booking.qrCode} size={256} />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="font-bold text-2xl tracking-wider">{booking.qrCode}</p>
                            <p className="text-sm text-gray-500">Show this code at the entrance</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                            <p>{booking.attendeeName}</p>
                            <span>•</span>
                            <p>{booking.event.ticketType === 'free' ? 'Free Ticket' : 'Paid Ticket'}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
