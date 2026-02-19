import {
    Laptop, Music, Trophy, Palette, Pizza, Briefcase,
    HeartPulse, GraduationCap, Gamepad2, Users, Tent,
    Smile, Calendar
} from "lucide-react";

export const iconMap: Record<string, any> = {
    "Laptop": Laptop,
    "Music": Music,
    "Trophy": Trophy,
    "Palette": Palette,
    "Pizza": Pizza,
    "Briefcase": Briefcase,
    "HeartPulse": HeartPulse,
    "GraduationCap": GraduationCap,
    "Gamepad2": Gamepad2,
    "Users": Users,
    "Tent": Tent,
    "Smile": Smile,
};

interface CategoryIconProps {
    name: string;
    className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
    const Icon = iconMap[name] || Calendar;
    return <Icon className={className} />;
}
