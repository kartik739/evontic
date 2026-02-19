"use client";

import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Calendar as CalendarIconLucide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DateTimeCard() {
    const { register, control, setValue, watch, formState: { errors } } = useFormContext();
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    return (
        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden group hover:border-blue-500/20 transition-all duration-300 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold text-white">
                    <div className="p-3 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        <CalendarIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <span className="block text-lg">Date & Time</span>
                        <span className="block text-sm font-normal text-muted-foreground">When will your event take place?</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 px-6 md:px-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Start Date & Time */}
                    <div className="space-y-3">
                        <Label className="text-gray-200 text-base font-medium">Starts</Label>
                        <div className="space-y-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-black/40 border-white/10 hover:bg-white/5 h-12 rounded-xl text-base",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-3 h-4 w-4 text-blue-400" />
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10 shadow-xl">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => setValue("startDate", date)}
                                        initialFocus
                                        className="p-3"
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className="relative">
                                <Clock className="absolute left-4 top-4 h-4 w-4 text-blue-400" />
                                <Input
                                    type="time"
                                    {...register("startTime")}
                                    className="pl-11 bg-black/40 border-white/10 h-12 rounded-xl text-base focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                            </div>

                            {(errors.startDate || errors.startTime) && (
                                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400" />
                                    {(errors.startDate?.message as string) || (errors.startTime?.message as string)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* End Date & Time */}
                    <div className="space-y-3">
                        <Label className="text-gray-200 text-base font-medium">Ends</Label>
                        <div className="space-y-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-black/40 border-white/10 hover:bg-white/5 h-12 rounded-xl text-base",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-3 h-4 w-4 text-blue-400" />
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-900 border-white/10 shadow-xl">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={(date) => setValue("endDate", date)}
                                        disabled={(date) => date < (startDate || new Date())}
                                        initialFocus
                                        className="p-3"
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className="relative">
                                <Clock className="absolute left-4 top-4 h-4 w-4 text-blue-400" />
                                <Input
                                    type="time"
                                    {...register("endTime")}
                                    className="pl-11 bg-black/40 border-white/10 h-12 rounded-xl text-base focus:border-blue-500/50 focus:ring-blue-500/20"
                                />
                            </div>

                            {(errors.endDate || errors.endTime) && (
                                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400" />
                                    {(errors.endDate?.message as string) || (errors.endTime?.message as string)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
