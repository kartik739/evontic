"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Smartphone, Zap, BarChart3 } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            icon: <Sparkles className="w-8 h-8 text-purple-400" />,
            title: "AI-Powered Creation",
            description: "Generate comprehensive event details, schedules, and marketing copy in seconds using advanced AI."
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "Global Reach",
            description: "Host events anywhere. Support for physical, virtual, and hybrid formats with built-in time zone handling."
        },
        {
            icon: <Shield className="w-8 h-8 text-green-400" />,
            title: "Secure Ticketing",
            description: "Fraud-proof QR code ticketing system ensures only valid ticket holders gain entry."
        },
        {
            icon: <Smartphone className="w-8 h-8 text-pink-400" />,
            title: "Mobile First",
            description: "A fully responsive experience for organizers and attendees on any device."
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Instant Check-in",
            description: "Lightning fast scanning capabilities to keep queues moving and attendees happy."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-orange-400" />,
            title: "Real-time Analytics",
            description: "Track views, sales, and attendance in real-time to make data-driven decisions."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] inset-x-0 h-[500px] bg-linear-to-b from-purple-900/20 to-transparent opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        Powerful Features for Modern Events
                    </h1>
                    <p className="text-xl text-gray-400">
                        Everything you need to plan, promote, and manage your events seamlessly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="p-4 rounded-xl bg-black border border-white/10 w-fit mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
