"use client";

import { Linkedin, Twitter, Instagram, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        toast.success("Subscribed to newsletter!", {
            description: "You'll be the first to know about new features."
        });
        setEmail("");
    };

    return (
        <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                <span className="font-bold text-white text-xl">E</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                                Evontic
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Discover extraordinary events and create unforgettable memories. The future of event management is here.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
                            <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">Product</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><FooterLink href="/explore">Explore Events</FooterLink></li>
                            <li><FooterLink href="/how-it-works">How it Works</FooterLink></li>
                            <li><FooterLink href="/pricing">Pricing</FooterLink></li>
                            <li><FooterLink href="/features">Features</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 3: For Creators */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">For Creators</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><FooterLink href="/create-event">Create Event</FooterLink></li>
                            <li><FooterLink href="/my-events">Organizer Dashboard</FooterLink></li>
                            {/* <li><FooterLink href="/resources">Resources</FooterLink></li> */}
                            <li><FooterLink href="/community">Community</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter/Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest events and updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-full transition-colors"
                            />
                            <button type="submit" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors border border-white/10">
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </form>
                        <div className="mt-8 text-xs text-gray-500 space-x-4">
                            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Evontic. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <span className="text-red-500">❤️</span> by Kartik Goel
                    </p>
                </div>
            </div>
        </footer>
    );
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="hover:text-purple-400 transition-colors flex items-center gap-2 group"
        >
            <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            {children}
        </Link>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all"
        >
            {icon}
        </a>
    );
}

export default Footer;
