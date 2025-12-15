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
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors">
            <CardHeader className="bg-linear-to-r from-amber-900/30 to-black/20 border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-amber-100">
                    <div className="p-2 rounded-lg bg-amber-500/20 ring-1 ring-amber-500/30">
                        <Ticket className="w-4 h-4 text-amber-400" />
                    </div>
                    Ticketing
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

                <div className="space-y-3">
                    <Label className="text-amber-300">Ticket Type</Label>
                    <Controller
                        control={control}
                        name="ticketType"
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6"
                            >
                                <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-3 bg-black/20 px-4 hover:bg-white/5 transition-colors cursor-pointer w-full">
                                    <RadioGroupItem value="free" id="free" className="text-amber-500 border-amber-500/50" />
                                    <Label htmlFor="free" className="cursor-pointer flex-1">Free Event</Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-3 bg-black/20 px-4 hover:bg-white/5 transition-colors cursor-pointer w-full">
                                    <RadioGroupItem value="paid" id="paid" className="text-amber-500 border-amber-500/50" />
                                    <Label htmlFor="paid" className="cursor-pointer flex-1">Paid Event</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Capacity */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Users className="w-4 h-4" /> Capacity
                        </Label>
                        <Input
                            type="number"
                            {...register("capacity", { valueAsNumber: true })}
                            placeholder="Max attendees"
                            className="bg-black/20 border-white/10"
                        />
                        {errors.capacity && (
                            <p className="text-sm text-red-400">{errors.capacity.message as string}</p>
                        )}
                    </div>

                    {/* Price (if paid) */}
                    {ticketType === "paid" && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <Label className="flex items-center gap-2 text-amber-400">
                                <IndianRupee className="w-4 h-4" /> Price per Ticket
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                                <Input
                                    type="number"
                                    {...register("ticketPrice", { valueAsNumber: true })}
                                    placeholder="0.00"
                                    className="pl-8 bg-black/20 border-amber-500/30 focus:border-amber-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
