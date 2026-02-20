"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Event Organizer",
        content: "Evontic completely transformed how we manage our conferences. The AI-powered tools saved us hours of work, and checking in 500+ attendees was flawless.",
        rating: 5,
        avatar: "SJ"
    },
    {
        name: "David Chen",
        role: "Concert Promoter",
        content: "The beautiful dark-mode dashboard is a joy to use. I can track my ticket sales and revenue in real-time. My attendees loved the seamless QR ticketing.",
        rating: 5,
        avatar: "DC"
    },
    {
        name: "Emily Rodriguez",
        role: "Community Manager",
        content: "Hosting our local meetups used to be a headache. Now, it's effortless. The dynamic landing pages Evontic generates look so professional.",
        rating: 5,
        avatar: "ER"
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                    >
                        Loved by Creators
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Join thousands of organizers who use Evontic to host unforgettable events.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-purple-500 text-purple-500" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                                &quot;{testimonial.content}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
