"use client";

import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Clock, Calendar as CalendarIconLucide } from "lucide-react";
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
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors">
            <CardHeader className="bg-linear-to-r from-blue-900/30 to-black/20 border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-blue-100">
                    <div className="p-2 rounded-lg bg-blue-500/20 ring-1 ring-blue-500/30">
                        <CalendarIconLucide className="w-4 h-4 text-blue-400" />
                    </div>
                    Date & Time
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Start Date & Time */}
                    <div className="space-y-4">
                        <Label className="text-blue-300 font-medium">Starts</Label>
                        <div className="space-y-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-black/20 border-white/10 hover:bg-white/5",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => setValue("startDate", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="time"
                                    {...register("startTime")}
                                    className="pl-9 bg-black/20 border-white/10"
                                />
                            </div>

                            {(errors.startDate || errors.startTime) && (
                                <p className="text-sm text-red-400">
                                    {(errors.startDate?.message as string) || (errors.startTime?.message as string)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* End Date & Time */}
                    <div className="space-y-4">
                        <Label className="text-blue-300 font-medium">Ends</Label>
                        <div className="space-y-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-black/20 border-white/10 hover:bg-white/5",
                                            !endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
                                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-zinc-950 border-white/10">
                                    <Calendar
                                        mode="single"
                                        selected={endDate}
                                        onSelect={(date) => setValue("endDate", date)}
                                        disabled={(date) => date < (startDate || new Date())}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="time"
                                    {...register("endTime")}
                                    className="pl-9 bg-black/20 border-white/10"
                                />
                            </div>

                            {(errors.endDate || errors.endTime) && (
                                <p className="text-sm text-red-400">
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
