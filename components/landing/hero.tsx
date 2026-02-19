"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-4">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span className="text-sm font-medium text-gray-300">
                            The Future of Event Management
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Create events that <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                            inspire.
                        </span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Evontic combines AI-powered tools with beautiful design to help you
                        craft unforgettable experiences. Host, manage, and discover events
                        effortlessly.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12 text-base"
                        >
                            <Link href="/create-event">
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-white/20 hover:bg-white/5 rounded-full px-8 h-12 text-base"
                        >
                            <Link href="/explore">
                                View Demo
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Floating Cards Effect */}
                    <div className="relative w-full aspect-square">
                        {/* Abstract shapes or a placeholder for 3D elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-10 right-10 w-64 h-80 bg-linear-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-4 shadow-2xl z-20"
                        >
                            {/* Mock Event Card 1 */}
                            <div className="h-40 bg-purple-900/20 rounded-xl mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 to-blue-500/20" />
                            </div>
                            <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                            <div className="h-3 w-1/2 bg-white/5 rounded" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute bottom-10 left-10 w-60 h-72 bg-linear-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-4 shadow-2xl z-10 backdrop-blur-xl"
                        >
                            {/* Mock Event Card 2 */}
                            <div className="h-32 bg-blue-900/20 rounded-xl mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-cyan-500/20" />
                            </div>
                            <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                            <div className="h-3 w-1/2 bg-white/5 rounded" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
