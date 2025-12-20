"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-400">
                        Start for free, upgrade when you need more power.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col"
                    >
                        <h3 className="text-2xl font-bold text-gray-200 mb-2">Starter</h3>
                        <div className="text-5xl font-bold mb-6">Free</div>
                        <p className="text-gray-400 mb-8">Perfect for trying out the platform and hosting small events.</p>

                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-400" />
                                <span>Create 1 Event per month</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-400" />
                                <span>Standard Analytics</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-400" />
                                <span>Basic Support</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <X className="w-5 h-5" />
                                <span>AI Event Generation</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500">
                                <X className="w-5 h-5" />
                                <span>Custom Branding</span>
                            </div>
                        </div>

                        <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5">
                            <Link href="/create-event">Get Started</Link>
                        </Button>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-3xl bg-linear-to-b from-purple-900/20 to-black border border-purple-500/30 backdrop-blur-sm relative flex flex-col"
                    >
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-bold">$29</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <p className="text-purple-200 mb-8">For serious organizers who need professional tools.</p>

                        <div className="space-y-4 mb-8 flex-1">
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span>Unlimited Events</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span>Advanced Analytics & Insights</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span>AI Event Generation Tools</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span>Custom Branding & Themes</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span>Priority 24/7 Support</span>
                            </div>
                        </div>

                        <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0">
                            <Link href="/create-event">Upgrade to Pro</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
