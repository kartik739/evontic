"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Ticket, IndianRupee, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function TicketPriceCard() {
    const { register, control, watch, formState: { errors } } = useFormContext();
    const ticketType = watch("ticketType");

    return (
        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden group hover:border-amber-500/20 transition-all duration-300 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold text-white">
                    <div className="p-3 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                        <Ticket className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <span className="block text-lg">Ticketing</span>
                        <span className="block text-sm font-normal text-muted-foreground">Manage capacity and pricing</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 px-6 md:px-8">

                <div className="space-y-3">
                    <Label className="text-gray-200 text-base font-medium">Ticket Type</Label>
                    <Controller
                        control={control}
                        name="ticketType"
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-6"
                            >
                                <div className={`flex items-center space-x-3 border rounded-xl p-4 transition-all cursor-pointer ${field.value === 'free' ? 'bg-amber-500/10 border-amber-500/50' : 'bg-black/40 border-white/10 hover:bg-white/5'}`}>
                                    <RadioGroupItem value="free" id="free" className="text-amber-500 border-amber-500/50" />
                                    <Label htmlFor="free" className="cursor-pointer flex-1 font-medium text-base">Free Event</Label>
                                </div>
                                <div className={`flex items-center space-x-3 border rounded-xl p-4 transition-all cursor-pointer ${field.value === 'paid' ? 'bg-amber-500/10 border-amber-500/50' : 'bg-black/40 border-white/10 hover:bg-white/5'}`}>
                                    <RadioGroupItem value="paid" id="paid" className="text-amber-500 border-amber-500/50" />
                                    <Label htmlFor="paid" className="cursor-pointer flex-1 font-medium text-base">Paid Event</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Capacity */}
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-gray-200 text-base font-medium">
                            Capacity
                        </Label>
                        <div className="relative group/input">
                            <Users className="absolute left-4 top-4 h-4 w-4 text-amber-500 group-focus-within/input:text-amber-400 transition-colors" />
                            <Input
                                type="number"
                                {...register("capacity", { valueAsNumber: true })}
                                placeholder="Max attendees"
                                className="pl-11 bg-black/40 border-white/10 h-12 rounded-xl text-base focus:border-amber-500/50 focus:ring-amber-500/20"
                            />
                        </div>
                        {errors.capacity && (
                            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-400" />
                                {errors.capacity.message as string}
                            </p>
                        )}
                    </div>

                    {/* Price (if paid) */}
                    {ticketType === "paid" && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                            <Label className="flex items-center gap-2 text-amber-400 text-base font-medium">
                                Price per Ticket
                            </Label>
                            <div className="relative group/input">
                                <IndianRupee className="absolute left-4 top-4 h-4 w-4 text-amber-500 group-focus-within/input:text-amber-400 transition-colors" />
                                <Input
                                    type="number"
                                    {...register("ticketPrice", { valueAsNumber: true })}
                                    placeholder="0.00"
                                    className="pl-11 bg-black/40 border-amber-500/30 focus:border-amber-500 h-12 rounded-xl text-base"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
