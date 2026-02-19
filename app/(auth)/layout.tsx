import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20 bg-black">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
