"use client";

import { useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { State, City } from "country-state-city";
import { MapPin, Globe, Navigation, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function LocationCard() {
    const { register, control, watch, setValue, formState: { errors } } = useFormContext();

    const locationType = watch("locationType");
    const selectedState = watch("state");

    const indianStates = useMemo(() => State.getStatesOfCountry("IN"), []);
    const cities = useMemo(() => {
        if (!selectedState) return [];
        const st = indianStates.find((s) => s.name === selectedState);
        if (!st) return [];
        return City.getCitiesOfState("IN", st.isoCode);
    }, [selectedState, indianStates]);

    return (
        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden group hover:border-emerald-500/20 transition-all duration-300 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold text-white">
                    <div className="p-3 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <span className="block text-lg">Location</span>
                        <span className="block text-sm font-normal text-muted-foreground">Where is it happening?</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 px-6 md:px-8">

                <Controller
                    control={control}
                    name="locationType"
                    render={({ field }) => (
                        <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-black/40 p-1 mb-8 h-12 rounded-xl">
                                <TabsTrigger
                                    value="physical"
                                    className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 h-10 rounded-lg text-base"
                                >
                                    <Building2 className="w-4 h-4 mr-2" /> In-Person
                                </TabsTrigger>
                                <TabsTrigger
                                    value="online"
                                    className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 h-10 rounded-lg text-base"
                                >
                                    <Globe className="w-4 h-4 mr-2" /> Online
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-8">
                    {/* State Selection */}
                    <div className="space-y-3">
                        <Label className="text-gray-200 text-base font-medium">State</Label>
                        <Controller
                            control={control}
                            name="state"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                        setValue("city", "");
                                    }}
                                >
                                    <SelectTrigger className="bg-black/40 border-white/10 h-12 rounded-xl text-base focus:ring-emerald-500/20">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 max-h-[300px]">
                                        {indianStates.map((s) => (
                                            <SelectItem key={s.isoCode} value={s.name} className="focus:bg-emerald-500/20 cursor-pointer py-2">
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* City Selection */}
                    <div className="space-y-3">
                        <Label className="text-gray-200 text-base font-medium">City</Label>
                        <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={!selectedState}
                                >
                                    <SelectTrigger className="bg-black/40 border-white/10 h-12 rounded-xl text-base focus:ring-emerald-500/20">
                                        <SelectValue
                                            placeholder={selectedState ? "Select city" : "Select state first"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 max-h-[300px]">
                                        {cities.map((c) => (
                                            <SelectItem key={c.name} value={c.name} className="focus:bg-emerald-500/20 cursor-pointer py-2">
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.city && (
                            <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-400" />
                                {errors.city.message as string}
                            </p>
                        )}
                    </div>
                </div>

                {locationType === "physical" && (
                    <div className="space-y-6 pt-2 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-4">
                            <Label className="text-gray-200 text-base font-medium">Venue & Address</Label>

                            <div className="relative group/input">
                                <Navigation className="absolute left-4 top-4 h-4 w-4 text-emerald-500 group-focus-within/input:text-emerald-400 transition-colors" />
                                <Input
                                    {...register("address")}
                                    placeholder="Street address, landmark, building..."
                                    className="pl-11 bg-black/40 border-white/10 h-12 rounded-xl text-base focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                />
                            </div>

                            <div className="relative mt-4 group/input">
                                <Globe className="absolute left-4 top-4 h-4 w-4 text-emerald-500 group-focus-within/input:text-emerald-400 transition-colors" />
                                <Input
                                    {...register("venue")}
                                    placeholder="Google Maps Link (URL)"
                                    type="url"
                                    className="pl-11 bg-black/40 border-white/10 h-12 rounded-xl text-base focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                />
                            </div>
                            {errors.venue && (
                                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400" />
                                    {errors.venue.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
