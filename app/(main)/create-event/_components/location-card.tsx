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
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors">
            <CardHeader className="bg-linear-to-r from-emerald-900/30 to-black/20 border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-emerald-100">
                    <div className="p-2 rounded-lg bg-emerald-500/20 ring-1 ring-emerald-500/30">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                    </div>
                    Location
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">

                <Controller
                    control={control}
                    name="locationType"
                    render={({ field }) => (
                        <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-black/40 p-1 mb-6">
                                <TabsTrigger value="physical" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300">
                                    <Building2 className="w-4 h-4 mr-2" /> In-Person
                                </TabsTrigger>
                                <TabsTrigger value="online" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                                    <Globe className="w-4 h-4 mr-2" /> Online
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    {/* State Selection */}
                    <div className="space-y-2">
                        <Label>State</Label>
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
                                    <SelectTrigger className="bg-black/20 border-white/10">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {indianStates.map((s) => (
                                            <SelectItem key={s.isoCode} value={s.name}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* City Selection */}
                    <div className="space-y-2">
                        <Label>City</Label>
                        <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={!selectedState}
                                >
                                    <SelectTrigger className="bg-black/20 border-white/10">
                                        <SelectValue
                                            placeholder={selectedState ? "Select city" : "Select state first"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((c) => (
                                            <SelectItem key={c.name} value={c.name}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.city && (
                            <p className="text-sm text-red-400">{errors.city.message as string}</p>
                        )}
                    </div>
                </div>

                {locationType === "physical" && (
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>Venue & Address</Label>
                            <div className="relative">
                                <Navigation className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input
                                    {...register("address")}
                                    placeholder="Street address, landmark, building..."
                                    className="pl-9 bg-black/20 border-white/10"
                                />
                            </div>
                            <div className="relative mt-2">
                                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input
                                    {...register("venue")}
                                    placeholder="Google Maps Link (URL)"
                                    type="url"
                                    className="pl-9 bg-black/20 border-white/10"
                                />
                            </div>
                            {errors.venue && (
                                <p className="text-sm text-red-400">{errors.venue.message as string}</p>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
