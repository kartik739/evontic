import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import TrendingEvents from "@/components/landing/trending-events";
import Testimonials from "@/components/landing/testimonials";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Hero />
            <TrendingEvents />
            <Testimonials />
            <Features />
        </main>
    );
}
