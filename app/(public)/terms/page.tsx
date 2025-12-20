export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-24 relative">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-lg">
                    <p className="text-gray-400 mb-6">Last updated: December 20, 2025</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-300">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">2. Event Creation & Management</h2>
                        <p className="text-gray-300">
                            Organizers are responsible for all content posted and events created. You agree not to create events that are illegal,
                            offensive, or fraudulent. We reserve the right to remove any event that violates these terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">3. Ticket Purchases & Refunds</h2>
                        <p className="text-gray-300">
                            Evontic acts as a platform for organizers to sell tickets. Refunds are subject to the specific policy set by the event organizer.
                            Please check the event details carefully before purchasing.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
                        <p className="text-gray-300">
                            In no event shall Evontic, nor its directors, employees, partners, agents, suppliers, or affiliates,
                            be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
                            loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
