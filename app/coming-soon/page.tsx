"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Rocket } from "lucide-react";

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Rocket className="w-12 h-12 text-purple-400" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                    Coming Soon
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed">
                    We're working hard to bring you this feature. <br />
                    Stay tuned for something amazing!
                </p>

                <div className="pt-8">
                    <Button asChild variant="outline" className="gap-2 border-white/10 hover:bg-white/5 text-white">
                        <Link href="/">
                            <MoveLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
