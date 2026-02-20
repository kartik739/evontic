import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4 z-10">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 z-10">
                Lost in Space?
            </h2>
            <p className="text-gray-400 max-w-md mb-8 z-10 text-lg">
                The page you are looking for doesn&apos;t exist or has been moved to another galaxy.
            </p>

            <div className="flex gap-4 z-10">
                <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-gray-200">
                    <Link href="/">
                        Return Home
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 hover:bg-white/10">
                    <Link href="/explore">
                        Explore Events
                    </Link>
                </Button>
            </div>
        </div>
    )
}
