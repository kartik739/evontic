import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import "./globals.css";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Evontic - Delightful Events Start Here",
    description: "Discover and create amazing events",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-black text-white antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClerkProvider appearance={{ baseTheme: dark }}>
                        <ConvexClientProvider>
                            <Header />

                            <main className="relative min-h-screen">
                                {/* Background glow effects (global, subtle) */}
                                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-50">
                                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[128px]" />
                                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
                                </div>

                                {children}

                            </main>
                            <Footer />
                            <Toaster position="top-center" richColors />
                        </ConvexClientProvider>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
