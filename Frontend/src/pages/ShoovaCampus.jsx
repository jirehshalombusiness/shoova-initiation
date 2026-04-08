import React from "react";
import { motion } from "framer-motion";
import { Link } from '../components/Link';
import InteractiveCampusSection from "../components/interactivecampus";

export default function ShoovaCampus() {
    return (
        <div className="text-black bg-[#F9FAFB]">
            <section className="relative h-[95vh] overflow-hidden">

                <motion.img
                    src="/img/engine.jpg"
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1.08 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Shoova Restoration Campus
                        </h1>

                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                            A living system where learning, production, and restoration
                            converge to transform both land and lives.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                    The Shoova Restoration Campus
                </h2>

                <p className="text-lg md:text-xl text-primary/70 max-w-3xl mx-auto">
                    The Shoova Restoration Campus is an 8 acre ultra-modern environment, intentionally designed as a complete
                    ecosystem where learning, production, and community come together
                    to transform lives and restore land.
                </p>
            </div>

            {/* 🔥 CAMPUS EXPERIENCE */}

            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

                    {/* 🧠 TEXT */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4 text-sm">
                            Academic & Strategic Core
                        </p>

                        <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            The Brain
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Designed as the intellectual engine of the campus, this space houses
                            the School of Engineering & Fabrication, the School of Sustainable
                            Futures, and the School of Ethical Leadership — alongside the Data
                            Command Center powering insight and decision-making.
                        </p>
                    </motion.div>

                    {/* 🎥 INTERACTIVE IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] group"
                    >

                        {/* 🔥 IMAGE WITH SUBTLE PAN */}
                        <motion.img
                            src="/img/brain.jpg"
                            alt="Shoova Academic Core"
                            className="w-full h-full object-cover scale-110"
                            initial={{ scale: 1.15 }}
                            whileHover={{ scale: 1.05, x: -20 }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* 🌫️ GRADIENT OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                        {/* 🧠 FLOATING LABEL */}
                        <div className="absolute bottom-6 left-6 backdrop-blur-lg bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white text-sm">
                            Academic Zone
                        </div>

                    </motion.div>

                </div>
            </section>

            <InteractiveCampusSection />

            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

                    {/* 🌿 IMAGE (LEFT) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                    >

                        {/* 🌿 IMAGE */}
                        <motion.img
                            src="/img/residential.jpg"
                            alt="Shoova Residential Community"
                            className="w-full h-full object-cover scale-105"
                            initial={{ scale: 1.08 }}
                            whileInView={{ scale: 1.02 }}
                            transition={{ duration: 1.2 }}
                        />

                        {/* 🌫️ SOFT OVERLAY (lighter than Brain) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* 🌿 LABEL */}
                        <div className="absolute bottom-6 left-6 backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white text-sm">
                            Residential & Community Zone
                        </div>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4 text-sm">
                            Living & Restoration Core
                        </p>

                        <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            The Soul
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Designed as a place of dignity and restoration, this space provides
                            safe housing, community, and reflection. With dedicated residential
                            areas and spaces for stillness, it nurtures healing, purpose,
                            and a renewed sense of identity.
                        </p>

                        <p className="text-gray-400 mt-6 leading-relaxed">
                            More than infrastructure, this is where transformation becomes personal.
                        </p>
                    </motion.div>

                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 pb-16">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >

                    {/* HEADER */}
                    <div className="p-6 md:p-8 border-b border-gray-100 text-center">

                        <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">
                            Location
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Eastern Region, Nsawam Adoagyiri
                        </h3>

                        <p className="text-gray-600 mt-2">
                            The future home of the Shoova Restoration Campus.
                        </p>

                    </div>

                    {/* MAP */}
                    <div className="w-full h-[350px] md:h-[400px]">
                        <iframe
                            title="Shoova Campus Location"
                            src="https://www.google.com/maps?q=Nsawam%20Adoagyiri%20Ghana&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                        ></iframe>
                    </div>

                </motion.div>

            </div>
            {/* 🔥 CTA */}
            <section className="py-28 bg-white text-center px-6">

               

                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    The Shoova Restoration Campus is more than infrastructure —
                    it is a system for long-term transformation.
                </p>
                 <Link
                    to="/donate"
                    className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondaryHover text-white font-semibold rounded-full transition shadow-lg"
                >
                    Build with Us
                </Link>

               

            </section>

        </div>
    );
}