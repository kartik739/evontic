"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/data";
import { Pencil, AlignLeft, Tag } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";

export default function EventDetailsCard() {
    const { register, control, formState: { errors } } = useFormContext();

    return (
        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden group hover:border-purple-500/20 transition-all duration-300 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="flex items-center gap-4 text-xl font-bold text-white">
                    <div className="p-3 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                        <Pencil className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <span className="block text-lg">Event Details</span>
                        <span className="block text-sm font-normal text-muted-foreground">Basic info about your event</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 px-6 md:px-8">
                {/* Title */}
                <div className="space-y-3">
                    <Label htmlFor="title" className="text-gray-200 text-base font-medium">Event Title</Label>
                    <div className="relative">
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="e.g. Cosmic Music Festival 2024"
                            className="bg-black/40 border-white/10 h-12 text-lg focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl transition-all pl-4"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {errors.title && (
                        <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {errors.title.message as string}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div className="space-y-3">
                    <Label className="text-gray-200 text-base font-medium flex items-center gap-2">
                        Category
                    </Label>
                    <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full bg-black/40 border-white/10 h-12 rounded-xl focus:ring-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-purple-400" />
                                        <SelectValue placeholder="Select a category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 max-h-[300px]">
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id} className="focus:bg-purple-500/20 focus:text-purple-100 cursor-pointer py-3">
                                            <span className="flex items-center gap-3">
                                                <div className="p-1 rounded bg-white/5">
                                                    <CategoryIcon name={cat.icon} className="w-4 h-4 shrink-0 text-purple-400" />
                                                </div>
                                                <span className="font-medium">{cat.label}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && (
                        <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {errors.category.message as string}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <Label htmlFor="description" className="text-gray-200 text-base font-medium">Description</Label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Tell the world what makes your event special..."
                        rows={6}
                        className="bg-black/40 border-white/10 focus:border-purple-500/50 rounded-xl resize-none p-4 leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                    />
                    {errors.description && (
                        <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-400" />
                            {errors.description.message as string}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
