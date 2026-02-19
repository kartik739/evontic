"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Monitor, QrCode, Sparkles, Zap } from "lucide-react";
import React from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default function Features() {
    return (
        <section className="py-20 bg-black/20">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything you need
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Powerful features packaged in a beautiful interface.
                    </p>
                </div>

                <BentoGrid className="max-w-4xl mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}

// Mock UI Components for Features
const MockAI = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden group">
        <div className="absolute top-2 left-2 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
        </div>
        <div className="mt-4 space-y-2">
            <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
            <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse delay-75" />
            <div className="h-20 w-full bg-purple-500/10 rounded-lg mt-4 border border-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full group-hover:bg-purple-500/20 transition-colors" />
    </div>
);

const MockRealTime = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden flex items-end justify-center gap-1">
        {[40, 70, 50, 90, 60, 80].map((h, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-4 bg-blue-500/40 rounded-t-sm hover:bg-blue-400 transition-colors"
            />
        ))}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">LIVE</span>
        </div>
    </div>
);

const MockQR = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 relative overflow-hidden flex items-center justify-center group">
        <div className="w-24 h-24 bg-white p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
            <QrCode className="w-full h-full text-black" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-white">
                Scan to Check-in
            </div>
        </div>
    </div>
);

const MockDashboard = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 p-4 relative overflow-hidden flex flex-col gap-3">
        <div className="flex justify-between items-center">
            <div className="h-2 w-20 bg-white/20 rounded" />
            <div className="h-4 w-4 bg-white/10 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded p-2 border border-white/5">
                <div className="text-[10px] text-gray-400">Sales</div>
                <div className="text-sm font-bold text-white mt-1">₹12.5k</div>
            </div>
            <div className="bg-white/5 rounded p-2 border border-white/5">
                <div className="text-[10px] text-gray-400">Visitors</div>
                <div className="text-sm font-bold text-white mt-1">854</div>
            </div>
        </div>
        <div className="flex-1 bg-white/5 rounded border border-white/5 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-purple-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-purple-500/30" />
        </div>
    </div>
);

const items = [
    {
        title: "AI-Powered Creation",
        description: "Generate event details, descriptions, and images instantly with Gemini AI.",
        header: <MockAI />,
        icon: <Sparkles className="h-4 w-4 text-purple-400" />,
    },
    {
        title: "Real-time Updates",
        description: "Live attendee tracking and instant notifications via Convex.",
        header: <MockRealTime />,
        icon: <Zap className="h-4 w-4 text-blue-400" />,
    },
    {
        title: "QR Ticketing",
        description: "Seamless check-ins with built-in QR code generation and scanning.",
        header: <MockQR />,
        icon: <QrCode className="h-4 w-4 text-green-400" />,
    },
    {
        title: "Beautiful Dashboard",
        description:
            "Track revenue, registrations, and analytics in a stunning dark-mode value interface.",
        header: <MockDashboard />,
        icon: <Monitor className="h-4 w-4 text-orange-400" />,
    },
];
