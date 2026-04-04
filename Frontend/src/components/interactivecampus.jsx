import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveCampusSection() {

  const [scale, setScale] = useState(1);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center text-center overflow-hidden bg-black">

      {/* 🔥 DRAGGABLE + ZOOMABLE IMAGE */}
      <motion.img
        src="/img/arrial-view1.jpg"
        className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
        style={{ scale }}
        whileTap={{ cursor: "grabbing" }}
      />

      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* 🔥 TEXT CONTENT */}
      <div className="relative z-10 max-w-xl px-6 text-white pointer-events-none">
        <p className="text-[#D4AF37] uppercase tracking-[0.25em] mb-3 text-sm">
          Production Core
        </p>

        <h3 className="text-4xl md:text-5xl font-bold mb-6">
          The Heart
        </h3>

        <p className="text-white/80 text-lg leading-relaxed">
          Where knowledge becomes action. Through fabrication labs,
          restoration plots, and hands-on training, individuals gain
          the tools to build, create, and sustain themselves.
        </p>
      </div>

      {/* 🔥 ZOOM CONTROLS */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">

        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.2, 2))}
          className="bg-white/10 backdrop-blur px-4 py-2 rounded text-white"
        >
          +
        </button>

        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.2, 1))}
          className="bg-white/10 backdrop-blur px-4 py-2 rounded text-white"
        >
          −
        </button>

      </div>

    </section>
  );
}