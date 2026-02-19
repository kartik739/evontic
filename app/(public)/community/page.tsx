"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-6 rounded-full bg-white/5 border border-white/10">
                        <Users className="w-16 h-16 text-purple-400" />
                    </div>
                </motion.div>

                <h1 className="text-5xl font-bold mb-6">Join the Community</h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Connect with fellow organizers, share tips, and help shape the future of Evontic.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Discord Server</h3>
                        <p className="text-sm text-gray-400 mb-4">Chat live with the team and community.</p>
                        <Button variant="outline" className="w-full">Join Discord</Button>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Twitter / X</h3>
                        <p className="text-sm text-gray-400 mb-4">Follow for updates and highlights.</p>
                        <Button variant="outline" className="w-full">Follow Us</Button>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Users className="w-8 h-8 text-green-400 mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Organizer Forum</h3>
                        <p className="text-sm text-gray-400 mb-4">Deep discussions and feature requests.</p>
                        <Button variant="outline" className="w-full">Visit Forum</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
