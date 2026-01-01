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
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors">
            <CardHeader className="bg-linear-to-r from-purple-900/30 to-black/20 border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-purple-100">
                    <div className="p-2 rounded-lg bg-purple-500/20 ring-1 ring-purple-500/30">
                        <Pencil className="w-4 h-4 text-purple-400" />
                    </div>
                    Event Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">Event Title</Label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="e.g. Cosmic Music Festival"
                        className="bg-black/20 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 text-lg font-medium"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-400 mt-1">
                            {errors.title.message as string}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Category
                    </Label>
                    <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full bg-black/20 border-white/10">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            <span className="flex items-center gap-2">
                                                <CategoryIcon name={cat.icon} className="w-4 h-4 shrink-0" /> {cat.label}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.category && (
                        <p className="text-sm text-red-400">{errors.category.message as string}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300 flex items-center gap-2">
                        <AlignLeft className="w-4 h-4" /> Description
                    </Label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Tell use more about your event..."
                        rows={5}
                        className="bg-black/20 border-white/10 focus:border-purple-500/50 resize-none"
                    />
                    {errors.description && (
                        <p className="text-sm text-red-400">
                            {errors.description.message as string}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
