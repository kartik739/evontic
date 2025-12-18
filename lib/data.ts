export interface EventCategory {
    id: string;
    label: string;
    icon: string;
    description: string;
}

// Event Categories
export const CATEGORIES: EventCategory[] = [
    {
        id: "tech",
        label: "Technology",
        icon: "Laptop",
        description: "Tech meetups, hackathons, and developer conferences",
    },
    {
        id: "music",
        label: "Music",
        icon: "Music",
        description: "Concerts, festivals, and live performances",
    },
    {
        id: "sports",
        label: "Sports",
        icon: "Trophy",
        description: "Sports events, tournaments, and fitness activities",
    },
    {
        id: "art",
        label: "Art & Culture",
        icon: "Palette",
        description: "Art exhibitions, cultural events, and creative workshops",
    },
    {
        id: "food",
        label: "Food & Drink",
        icon: "Pizza",
        description: "Food festivals, cooking classes, and culinary experiences",
    },
    {
        id: "business",
        label: "Business",
        icon: "Briefcase",
        description: "Networking events, conferences, and startup meetups",
    },
    {
        id: "health",
        label: "Health & Wellness",
        icon: "HeartPulse",
        description: "Yoga, meditation, wellness workshops, and health seminars",
    },
    {
        id: "education",
        label: "Education",
        icon: "GraduationCap",
        description: "Workshops, seminars, and learning experiences",
    },
    {
        id: "gaming",
        label: "Gaming",
        icon: "Gamepad2",
        description: "Gaming tournaments, esports, and gaming conventions",
    },
    {
        id: "networking",
        label: "Networking",
        icon: "Users",
        description: "Professional networking and community building events",
    },
    {
        id: "outdoor",
        label: "Outdoor & Adventure",
        icon: "Tent",
        description: "Hiking, camping, and outdoor activities",
    },
    {
        id: "community",
        label: "Community",
        icon: "Smile",
        description: "Local community gatherings and social events",
    },
];

// Get category by ID
export const getCategoryById = (id: string): EventCategory | undefined => {
    return CATEGORIES.find((cat) => cat.id === id);
};

// Get category label by ID
export const getCategoryLabel = (id: string): string => {
    const category = getCategoryById(id);
    return category ? category.label : id;
};

// Get category icon by ID
export const getCategoryIcon = (id: string): string => {
    const category = getCategoryById(id);
    return category ? category.icon : "📅";
};
