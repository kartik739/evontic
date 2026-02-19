export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert prose-lg">
                    <p className="text-gray-400 mb-6">Last updated: December 20, 2025</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-gray-300">
                            Welcome to Evontic. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                        <p className="text-gray-300">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                            <li>Identity Data includes first name, last name, username or similar identifier.</li>
                            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
                        <p className="text-gray-300">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
