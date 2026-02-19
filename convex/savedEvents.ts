import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const toggleSavedEvent = mutation({
    args: {
        eventId: v.id("events"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const existing = await ctx.db
            .query("savedEvents")
            .withIndex("by_user_event", (q) =>
                q.eq("userId", user._id).eq("eventId", args.eventId)
            )
            .unique();

        if (existing) {
            await ctx.db.delete(existing._id);
            return false; // Unsaved
        } else {
            await ctx.db.insert("savedEvents", {
                userId: user._id,
                eventId: args.eventId,
                savedAt: Date.now(),
            });
            return true; // Saved
        }
    },
});

export const isEventSaved = query({
    args: {
        eventId: v.id("events"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return false;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            return false;
        }

        const saved = await ctx.db
            .query("savedEvents")
            .withIndex("by_user_event", (q) =>
                q.eq("userId", user._id).eq("eventId", args.eventId)
            )
            .unique();

        return !!saved;
    },
});

export const getSavedEvents = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            return [];
        }

        const savedStats = await ctx.db
            .query("savedEvents")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .order("desc") // Most recently saved first
            .collect();

        // Join with events
        const events = await Promise.all(
            savedStats.map(async (saved) => {
                const event = await ctx.db.get(saved.eventId);
                return event;
            })
        );

        return events.filter((e) => e !== null);
    },
});
