import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (user !== null) {
            const updates: Record<string, any> = {};
            if (user.name !== identity.name) {
                updates.name = identity.name ?? "Anonymous";
            }
            if (user.email !== identity.email) {
                updates.email = identity.email ?? "";
            }
            if (user.imageUrl !== identity.pictureUrl) {
                updates.imageUrl = identity.pictureUrl;
            }

            if (Object.keys(updates).length > 0) {
                updates.updatedAt = Date.now();
                await ctx.db.patch(user._id, updates);
            }

            return user._id;
        }
        return await ctx.db.insert("users", {
            email: identity.email ?? "",
            tokenIdentifier: identity.tokenIdentifier,
            name: identity.name ?? "Anonymous",
            imageUrl: identity.pictureUrl,
            hasCompletedOnboarding: false,
            freeEventsCreated: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            return null;
        }

        return user;
    },
});
export const completeOnboarding = mutation({
    args: {
        location: v.object({
            city: v.string(),
            state: v.optional(v.string()),
            country: v.string(),
        }),
        interests: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const user: any = await ctx.runQuery(api.users.getCurrentUser);

        await ctx.db.patch(user._id, {
            location: args.location,
            interests: args.interests,
            hasCompletedOnboarding: true,
            updatedAt: Date.now(),
        });

        return user._id;
    },
});

export const getUserById = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);

        if (!user) {
            return null;
        }

        return {
            _id: user._id,
            name: user.name,
            imageUrl: user.imageUrl,
            email: user.email,
        };
    },
});
