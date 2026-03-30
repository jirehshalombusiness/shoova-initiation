import React from "react";
import { motion } from "framer-motion";

export default function CampusExperienceSection() {
  return (
    <section className="bg-[#F9FAFB] ">

      {/* =========================
          SECTION HEADER
      ========================= */}
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

      {/* =========================
    LOCATION MAP
========================= */}
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

      {/* =========================
          THE BRAIN (SPLIT - LEFT TEXT / RIGHT IMAGE)
      ========================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-widest mb-3">
            The Entryway
          </p>

          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            The Brain
          </h3>

          <p className="text-primary/80 text-lg leading-relaxed">
            Designed as the academic and strategic center of the campus, this
            space will house the School of Engineering & Fabrication, the School
            of Sustainable Futures, and the School of Ethical Leadership —
            alongside the Data Command Center powering insight and decision-making.
          </p>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
        >
          <img
            src="/img/plan.png"
            alt="Campus Academic Center"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* =========================
          THE HEART (CINEMATIC)
      ========================= */}
      <div className="relative min-h-[90vh] flex items-center justify-center text-center">

        {/* Background */}
        <img
          src="/img/engine.jpg"
          alt="Production Workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <motion.div
          className="relative max-w-3xl px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-widest mb-3">
            The Engine
          </p>

          <h3 className="text-3xl md:text-5xl font-bold text-[#D4AF37]  mb-6">
            The Heart
          </h3>

          <p className="text-white/80 text-lg leading-relaxed">
            At the core of the campus, this is where knowledge becomes action.
            Through industrial fabrication labs and restoration demo plots,
            students master welding, solar technology, and hands-on skills —
            supported by real access to startup tools and low-interest funding.
          </p>
        </motion.div>
      </div>

      {/* =========================
          THE SOUL (SPLIT - RIGHT TEXT / LEFT IMAGE)
      ========================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE (LEFT) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
        >
          <img
            src="/img/hostel.jpg"
            alt="Residential Community"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* TEXT (RIGHT) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-widest mb-3">
            The Sanctuary
          </p>

          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            The Soul
          </h3>

          <p className="text-primary/80 text-lg leading-relaxed">
            Designed as a place of dignity and restoration, this space provides
            safe housing, community, and reflection. With dedicated residential
            areas and the Isaiah 42:22 Meditation Garden, it nurtures healing,
            purpose, and a renewed sense of identity.
          </p>
        </motion.div>
      </div>

      {/* =========================
          DISCLAIMER
      ========================= */}
      <div className="text-center text-sm text-white/40 px-6 pb-16">
        Images are representative of the vision for the Shoova Restoration Campus.
      </div>

    </section>
  );
}