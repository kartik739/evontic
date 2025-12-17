# Evontic — AI Event Organizer

Evontic (a.k.a. ai-event-organiser) is a modern, full-stack event management application built with Next.js (App Router) and Convex for backend services. The app helps organizers create immersive events, manage attendees and tickets, and offers discovery tools for public events. It also integrates AI-assisted event creation using Google's Gemini API and a curated Unsplash-powered image selector.

---

## Table of Contents

- [Demo & Purpose](#demo--purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Key Concepts](#architecture--key-concepts)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Environment Variables](#environment-variables)
- [Seeding Data](#seeding-data)
- [Running & Building](#running--building)
- [Convex Backend Development](#convex-backend-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [File Structure (High Level)](#file-structure-high-level)
- [License & Credits](#license--credits)

---

## Demo & Purpose

Evontic provides a simple and elegant interface for event organizers and attendees. Use it to:

- Create and customize events (with optional AI-generated event details)
- Discover events in your city or category
- Register for events and get QR code tickets
- Manage event attendees and check-in with a camera-based QR scanner

This project is also a great reference for integrating Next.js with Convex (serverless DB/functions), Clerk (auth), Google Gen-AI, and third-party APIs like Unsplash.

---

## Features

- Convex-based backend (events, users, registrations, search, and seed functions)
- Clerk authentication (protected routes and user identity)
- AI-powered event generator using Google Generative AI (Gemini)
- Unsplash image picker for cover images
- Event discovery: featured, popular, by category, by location, search by title
- Event creation form with validations (Zod + react-hook-form)
- Subscription gating for Pro features: unlimited events, custom theme colors
- Registrations with QR-based ticketing and attendee check-in (html5-qrcode)
- Organizer dashboard with attendance and revenue metrics
- Client-side and server-side query helpers for Convex via React hooks
- Seed data for quick startup

---

## Tech Stack

- Frontend: Next.js (app router, React 19) + TailwindCSS + Radix UI
- Backend: Convex (serverless DB & functions)
- Auth: Clerk
- AI: Google Generative AI (Gemini) — `@google/generative-ai`
- Image Search: Unsplash API
- QR: html5-qrcode & react-qr-code
- Validation: zod & react-hook-form

---

## Architecture & Key Concepts

- Next.js app with the `app/` directory. Client components are used for interactive features (forms, dialogs, modals).
- Convex schema is defined under `convex/schema.js` with `users`, `events`, and `registrations` tables.
- Convex functions (under `convex/*.js`) implement business logic: creating events, searching, registrations, check-in and dashboard analytics.
- Clerk middleware (`proxy.js`) secures protected routes and requires a logged-in user for event creation, registrations and management.
- AI generation (`/api/generate-event`) uses Google Gemini to return a JSON object that pre-fills details for a new event.

---

## Getting Started (Local Development)

### Prerequisites

- Node.js (18+ recommended)
- npm / yarn / pnpm
- Convex CLI (optional for running Convex locally)
- Clerk account (for auth) — or mock values for local testing
- Google Cloud account with access to Gemini (GEMINI_API_KEY)
- Unsplash API access key (for image picker)

### Install

Open a terminal and run:

```powershell
# Windows PowerShell
cd d:\Projects\evontic
npm install
```

### Create a `.env.local` file (recommended)

Create a file named `.env.local` at the project root and populate with keys below. Example:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=<your-convex-client-url>

# Unsplash (public key)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<your-unsplash-access-key>

# Google Gemini (server side key)
GEMINI_API_KEY=<your-google-gemini-api-key>

# Clerk (frontend + backend keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable>
CLERK_SECRET_KEY=<your-clerk-secret>
CLERK_JWT_ISSUER_DOMAIN=<your-clerk-issuer-domain>

# Example for local dev, set Convex dev url if using 'convex dev'
# NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:8888
```

> Note: The project reads these env vars in client and server files. Keep secrets private — do not commit them.

---

## Seeding Data

The repository ships with a seed function at `convex/seed.js` with many events. To populate sample events **in Convex**:

1. If using a hosted Convex account, go to the Convex Dashboard and run the `seed.run` function.
2. If using `convex dev` locally, you can run the seed function from your Convex CLI / dashboard UI as well.

This creates a default organizer and a curated set of sample events in the `events` table.

---

## Running & Building

### Development (with Next.js)

```powershell
npm run dev
# Opens at: http://localhost:3000
```

### Production Build

```powershell
npm run build
npm run start
```

### Lint

```powershell
npm run lint
```

---

## Convex Backend Development

- Local development: use `convex dev` to start the Convex local server. This will give you a `NEXT_PUBLIC_CONVEX_URL` local value.
- Deploy: `convex deploy` (or via the Convex console) to publish the latest functions and schema changes.

Important files under `convex/`:

- `schema.js` — Convex data model (users, events, registrations)
- `events.js` — APIs to create, list, delete events
- `registrations.js` — registration flow, QR handling, check-in
- `users.js` — user creation and onboarding
- `seed.js` — seed data

---

## API & Server Routes

- `POST /api/generate-event` — wrapper that calls Google Gemini to generate event JSON for AI-assisted creation. Requires `GEMINI_API_KEY`.

Convex functions should be called using the client helpers in `convex/_generated/api`, and are wrapped with the provided hooks in `hooks/use-convex-query.js` for queries and mutations.

---

## Environment Variables (Summary)

- NEXT_PUBLIC_CONVEX_URL — Convex client URL
- GEMINI_API_KEY — Required for AI event generation
- NEXT_PUBLIC_UNSPLASH_ACCESS_KEY — Unsplash public key used in the image picker
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY — Clerk frontend publishable key
- CLERK_SECRET_KEY — Clerk server secret (for backend APIs)
- CLERK_JWT_ISSUER_DOMAIN — For Convex auth config

Add these to `.env.local` and the deployment environment for production (e.g., Vercel project variables).

---

## Notes on Pro Subscription & Feature Gating

- Free users can create one free event (tracked on the `users` table). Upgrading to Pro unlocks:
  - Unlimited event creation (removes free limit)
  - Custom theme color options

The `events.createEvent` and the UI contain server-side and client-side checks for Pro and will show `Upgrade` prompts if features are gated.

---

## Developer Tips & Utilities

- To use the AI event generation features, ensure `GEMINI_API_KEY` is set. The API uses `gemini-2.5-flash` with a structured system prompt to return JSON suitable for pre-filling the event form.
- The Unsplash image picker uses the public Unsplash API — you need a `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` for searching images.
- To check-in attendees via QR code you can either use the `html5-qrcode` scanner modal or paste the ticket ID manually in the organizer dashboard.
- Convex's `seed` functions are intentionally meant to be run from the Convex Dashboard/CLI.

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Make a new branch for your changes: `git checkout -b feat/my-feature`
3. Run the project locally and verify changes
4. Create a pull request describing the changes and why they're valuable

Coding conventions and guidelines:

- Keep UI consistent with existing Tailwind class patterns
- Add Convex functions inside `convex/` and export them from `_generated` only via the Convex CLI process
- Add relevant tests if you introduce non-trivial logic

---

## File Structure (High Level)

- `app/` — Next.js pages, layouts and route handlers
- `components/` — Shared UI components and modal dialogs
- `convex/` — Convex server code & schema
- `public/` — static assets
- `hooks/` — local React hooks (e.g., `use-convex-query`)
- `lib/` — helper utilities

---

## Troubleshooting & FAQs

Q: The app can’t find SDK keys or shows an auth error
- Ensure your `.env.local` exists and has the required keys. Restart `npm run dev` after changes.

Q: Convex queries return authentication errors
- Make sure Clerk is set up and the `CLERK_JWT_ISSUER_DOMAIN` is configured in `convex/auth.config.js`, and the Clerk token is provided in your dev environment.

Q: AI generation fails with rate limits
- Gemini may rate limit requests; handle 429 responses gracefully. The route implements a 429 response.

---

## License & Credits

- Evontic Project — provided as-is for demonstration and development purposes.
- Uses open-source libraries and tools. Please check individual package licenses in `package.json`.

---

If you'd like, I can also:

- Add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` to guide new contributors
- Add example `.env.local.example` with placeholders
- Add a minimal self-test script or CI config for linting

If you want any of those, tell me which and I’ll update the repo. Happy to refine and add screenshots or quickstart gifs too!



