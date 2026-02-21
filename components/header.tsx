"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building, Crown, Plus, Ticket, Heart, Search as SearchIcon, Compass, CreditCard, LayoutDashboard, Menu } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInButton, SignOutButton, useAuth, UserButton, useClerk } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { useOnboarding } from "@/hooks/use-onboarding";
import OnboardingModal from "./onboarding-modal";
import SearchLocationBar from "./search-location-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UpgradeModal from "./upgrade-modal";
import { Badge } from "./ui/badge";

export default function Header() {
    const pathname = usePathname();
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const { isLoading } = useStoreUser();
    const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
        useOnboarding();

    const { has } = useAuth();
    const { openUserProfile } = useClerk();
    // @ts-ignore - Clerk types for `has` might not be updated or require specific setup
    const hasPro = has?.({ plan: "pro" });

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-wrap items-center justify-between gap-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/evontic.png"
                            alt="evontic logo"
                            width={500}
                            height={500}
                            className="w-full h-11"
                            priority
                        />
                        {/* <span className="text-purple-500 text-2xl font-bold">evontic*</span> */}
                        {hasPro && (
                            <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-2 md:ml-3">
                                <Crown className="w-3 h-3" />
                                <span className="hidden sm:inline">Pro</span>
                            </Badge>
                        )}
                    </Link>

                    {/* Search & Location - Desktop Only */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <SearchLocationBar />
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Search Toggle (Modal) */}
                        {pathname !== "/explore" && (
                            <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden"
                                    >
                                        <SearchIcon className="w-5 h-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[95vw] max-w-[425px] p-4 sm:p-6 rounded-2xl bg-background border-white/10 top-[20%] translate-y-0">
                                    <DialogHeader className="mb-4">
                                        <DialogTitle className="text-xl">Search Events</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-4">
                                        <SearchLocationBar />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Button variant="ghost" className="w-full" onClick={() => setIsMobileSearchOpen(false)}>
                                            Close
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}

                        {/* Show Pro badge or Upgrade button */}
                        {!hasPro && (
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="hidden md:inline-flex"
                            >
                                <Link href="/pricing">Pricing</Link>
                            </Button>
                        )}

                        <Button variant="ghost" size="sm" asChild className="mr-2 hidden md:inline-flex">
                            <Link href="/explore">Explore</Link>
                        </Button>

                        <Authenticated>
                            {/* Create Event Button */}
                            <Button size="sm" asChild className="flex gap-2 mr-2 md:mr-4">
                                <Link href="/create-event">
                                    <Plus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Create Event</span>
                                </Link>
                            </Button>

                            {/* Desktop User Button */}
                            <div className="hidden md:block">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-9 h-9",
                                        },
                                    }}
                                >
                                    <UserButton.MenuItems>
                                        <UserButton.Link
                                            label="My Tickets"
                                            labelIcon={<Ticket size={16} />}
                                            href="/my-tickets"
                                        />
                                        <UserButton.Link
                                            label="My Events"
                                            labelIcon={<Building size={16} />}
                                            href="/my-events"
                                        />
                                        <UserButton.Link
                                            label="Saved Events"
                                            labelIcon={<Heart size={16} />}
                                            href="/saved-events"
                                        />
                                        <UserButton.Action label="manageAccount" />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </div>

                            {/* Mobile Unified Menu */}
                            <div className="md:hidden flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="ml-1">
                                            <Menu className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 mt-2">
                                        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/explore" className="cursor-pointer flex items-center">
                                                <Compass className="mr-2 h-4 w-4" />
                                                Explore Events
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer flex items-center"
                                            onClick={() => setShowUpgradeModal(true)}
                                        >
                                            <Crown className="mr-2 h-4 w-4" />
                                            {hasPro ? "Manage Subscription" : "Pro Details"}
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            className="cursor-pointer flex items-center"
                                            onClick={() => openUserProfile()}
                                        >
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Manage Account
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/my-events" className="cursor-pointer flex items-center">
                                                <Building className="mr-2 h-4 w-4" />
                                                My Events
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/my-tickets" className="cursor-pointer flex items-center">
                                                <Ticket className="mr-2 h-4 w-4" />
                                                My Tickets
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/saved-events" className="cursor-pointer flex items-center">
                                                <Heart className="mr-2 h-4 w-4" />
                                                Saved Events
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <SignOutButton>
                                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-500">
                                                Sign out
                                            </DropdownMenuItem>
                                        </SignOutButton>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton mode="modal">
                                <Button size="sm">Sign In</Button>
                            </SignInButton>
                        </Unauthenticated>
                    </div>
                </div>

                {isLoading && (
                    <div className="absolute bottom-0 left-0 w-full">
                        <BarLoader width={"100%"} color="#a855f7" />
                    </div>
                )}
            </nav>

            {/* Onboarding Modal */}
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={handleOnboardingSkip}
                onComplete={handleOnboardingComplete}
            />

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                trigger="header"
            />
        </>
    );
}
