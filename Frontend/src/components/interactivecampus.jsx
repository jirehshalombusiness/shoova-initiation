import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/img/campus12.jpeg",
  "/img/campus11.jpeg",
  "/img/campus7.jpeg",
  "/img/campus5.jpeg",
  "/img/campus6.jpeg",
  "/img/campus8.jpeg",
];

export default function InteractiveCampusSection() {
  const [scale, setScale] = useState(1);
  const [index, setIndex] = useState(0);

  // 🔥 AUTO SLIDE ENGINE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5s per slide (premium pacing)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* 🧠 LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-[#D4AF37] uppercase tracking-[0.35em] text-sm">
            Production Core
          </p>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            The Heart
          </h2>

          <div className="w-16 h-[2px] bg-[#D4AF37]" />

          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            The production core is where theory transitions into practice —
            a living ecosystem of fabrication, restoration, and applied learning.
          </p>

          <p className="text-gray-500 leading-relaxed max-w-xl">
            Here, individuals work directly with materials and systems,
            transforming knowledge into real-world capability and output.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            A space built for making, repairing, and sustaining long-term human progress.
          </p>
        </motion.div>

        {/* 🏗️ RIGHT: AUTO SLIDING CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative h-[520px] rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
        >

          {/* 🔥 SLIDES */}
          <AnimatePresence mode="wait">
            <div className="relative w-full h-full">
  {images.map((img, i) => (
    <motion.img
      key={img}
      src={img}
      className="absolute inset-0 w-full h-full object-cover"
      initial={false}
      animate={{
        opacity: i === index ? 1 : 0,
        scale: i === index ? 1.02 : 1.08,
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
      }}
      style={{ scale }}
    />
  ))}
</div>
          </AnimatePresence>

          {/* 🌫️ OVERLAY */}
          <div className="absolute inset-0 bg-black/30" />

          {/* LABEL */}
          <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-white text-sm">
            Production Zone
          </div>

          {/* 🔥 PROGRESS DOTS */}
          <div className="absolute top-6 right-6 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}