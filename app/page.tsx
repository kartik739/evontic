import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Hero />
            <Features />
        </main>
    );
}
