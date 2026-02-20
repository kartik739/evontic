# Evontic — AI Event Organizer

![Evontic Banner](public/og-image.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/Convex-Backend-orange?style=for-the-badge&logo=convex)](https://www.convex.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Evontic** is a modern, full-stack event management platform designed to simplify event creation and discovery. 

It leverages **AI** (Google Gemini) to assist organizers in generating compelling event descriptions and details, while providing a seamless experience for attendees to browse, register, and check in to events using QR codes.

## ✨ Features

- **AI-Powered Event Creation**: Automatically generate event details using Google Gemini.
- **Real-time Backend**: Built on [Convex](https://www.convex.dev/) for reactive data updates.
- **Secure Authentication**: Integrated with [Clerk](https://clerk.com/) for robust user management.
- **QR Code Ticketing**: Generate and scan QR codes for attendee check-in.
- **Image Integration**: Built-in Unsplash image search for event covers.
- **Organizer Dashboard**: Track registrations, revenue, and attendee check-ins.
- **Responsive UI**: Beautifully designed with Tailwind CSS and Radix UI components.

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Convex](https://www.convex.dev/) (Serverless Database & Functions)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: [Google Generative AI](https://ai.google.dev/)
- **State Management**: React Query (via Convex)
- **Validation**: [Zod](https://zpc.io/) & [React Hook Form](https://react-hook-form.com/)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kartik739/evontic.git
    cd evontic
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your keys:

    ```env
    # Convex
    NEXT_PUBLIC_CONVEX_URL=<your-convex-url>

    # Clerk Auth
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
    CLERK_SECRET_KEY=<your-clerk-secret-key>
    CLERK_JWT_ISSUER_DOMAIN=<your-clerk-issuer-domain>

    # AI & Integrations
    GEMINI_API_KEY=<your-google-gemini-key>
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<your-unsplash-access-key>
    ```

4.  **Run the Development Server**
    Start both the Next.js frontend and Convex backend:

    ```bash
    npm run dev
    ```
    
    In a separate terminal, run Convex if not handled by the dev script:
    ```bash
    npx convex dev
    ```

5.  **Open the App**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel** and includes robust CI/CD features.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables from your `.env.local` file to the Vercel project settings.
4.  **Important**: Update the **Build Command** in Vercel to:
    ```bash
    npm run build:convex
    ```
    This ensures the correct Convex deployment command runs in production.

### Cloud-Native DevOps & CI/CD
*   **GitHub Actions:** The project enforces rigorous code quality tests. Every Pull Request triggers a GitHub action (`ci.yml`) that runs strict Linting and TypeScript checks before allowing merges.
*   **Vercel Preview Environments:** Out of the box, Vercel dynamically provisions preview URLs for every Pull Request.
    > [!IMPORTANT]
    > **Convex Preview Branches**: When reviewing features via Vercel Preview URLs, remember that Vercel needs a database environment to point to. By default, Convex matches Vercel deployments automatically so your Vercel preview app talks to isolated, temporary Convex environments. You can manage these inside the Convex Dashboard.
*   **Sentry Error Tracking:** The app is instrumented with `@sentry/nextjs`. Once your `NEXT_PUBLIC_SENTRY_DSN` is set in Vercel production, all unhandled frontend UI errors and API exceptions will be caught automatically.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Kartik Goel](https://github.com/kartik739)
