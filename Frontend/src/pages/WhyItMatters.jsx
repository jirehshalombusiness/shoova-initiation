import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CountUp from "../components/CountUp";

const WhyItMatters = () => {
   
     const impactTabs = [
    {
      id: "environment",
      label: "Environment",
      eyebrow: "WHY RESTORATION?",
      title: "Because healthy land sustains life",
      image: "/img/envi.jpg",
      text: "Reclaiming land damaged by illegal mining restores soil health, protects water sources, and rebuilds ecosystems that communities depend on.",
    },
    {
      id: "youth",
      label: "Youth",
      eyebrow: "WHY YOUTH?",
      title: "Because opportunity changes destinies",
      image: "/img/youth.jpg",
      text: "When young people gain technical and environmental skills, they can build dignified livelihoods that replace destructive mining practices.",
    },
    {
      id: "communities",
      label: "Communities",
      eyebrow: "WHY COMMUNITIES?",
      title: "Because restoration begins at home",
      image: "/img/community.jpg",
      text: "Communities that lead restoration efforts protect their environment while creating sustainable opportunities for present and future generations.",
    },
    {
      id: "future",
      label: "Future",
      eyebrow: "WHY THE FUTURE?",
      title: "Because what we restore today shapes tomorrow",
      image: "/img/future.jpg",
      text: "Restoring landscapes today ensures that future generations inherit healthier ecosystems, stronger livelihoods, and renewed hope.",
    },
  ];

    const [activeImpact, setActiveImpact] = useState(impactTabs[0]);

    return (
        <div className="bg-white">

            <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">

                {/* Background Image */}
                <img
                    src="/img/waters.jpg" // use something powerful (damaged land / river / youth)
                    alt="Why it matters"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Gradient depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl">


                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6">
                        This is bigger than land.
                        <br />
                        It’s about life, dignity, and the future.
                    </h1>

                

                    {/* <Link
                        to="/donate"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-semibold rounded-full hover:bg-[#B85D2F] transition"
                    >
                        Be Part of the Solution
                        <span>→</span>
                    </Link> */}

                </div>

            </section>

            {/* HERO HEADER (important addition) */}
            <section className="pt-32  bg-primary/10 text-center px-6">
                <p className="text-md  font-serif uppercase tracking-[0.8em] text-secondary/80 mb-6">
                    WHY RESTORATION?
                </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-textDark max-w-4xl mx-auto leading-tight">
                         Because restoring land restores lives
                       </h2>
            </section>

           {/* Why This Movement Matters */}
                 <section id="why_this_movement_matters" className="py-24 bg-primary/20">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* Heading */}
                     <motion.div
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, amount: 0.3 }}
                       transition={{ duration: 0.8, ease: "easeOut" }}
                       className="text-center mb-14"
                     >
                      
                     </motion.div>
         
                     {/* Tabs */}
                     <div className="flex flex-wrap justify-center gap-3 mb-10">
                       {impactTabs.map((tab) => {
                         const isActive = activeImpact.id === tab.id;
         
                         return (
                           <button
                             key={tab.id}
                             onClick={() => setActiveImpact(tab)}
                             className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border ${isActive
                               ? "bg-secondary text-white border-secondary shadow-md"
                               : "bg-white text-textDark border-gray-300 hover:bg-white/70"
                               }`}
                           >
                             {tab.label}
                           </button>
                         );
                       })}
                     </div>
         
                     {/* Main Visual Block */}
                     <motion.div
                       key={activeImpact.id}
                       initial={{ opacity: 0, y: 35 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.55, ease: "easeOut" }}
                       className="relative rounded-3xl overflow-hidden min-h-[620px] shadow-xl"
                     >
                       {/* Background image */}
                       <img
                         src={activeImpact.image}
                         alt={activeImpact.label}
                         className="absolute inset-0 w-full h-full object-cover"
                       />
         
                       {/* Cinematic overlay */}
                       <div className="absolute inset-0 bg-black/20"></div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
         
                       {/* Floating story card */}
                       <motion.div
                         key={`${activeImpact.id}-card`}
                         initial={{ opacity: 0, y: 25 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                         className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-md shadow-2xl"
                       >
                         <h3 className="text-2xl md:text-3xl font-heading font-bold text-textDark mb-4 leading-snug">
                           {activeImpact.title}
                         </h3>
         
                         <p className="text-text text-base md:text-lg leading-relaxed mb-6">
                           {activeImpact.text}
                         </p>
         
                         <Link
                           to="/about"
                           className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-3 transition-all"
                         >
                           Follow the Journey
                           <ArrowRight className="w-4 h-4" />
                         </Link>
                       </motion.div>
                     </motion.div>
                   </div>
                 </section>

            <section id="impact" className="py-28 bg-white">

                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    {/* HEADER */}
                    <div className="text-center mb-20">

                        <p className="text-sm uppercase tracking-[0.25em] text-secondary/80 mb-4">
                            Projected Impact
                        </p>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark mb-6">
                            The Impact We Are Building
                        </h2>

                        <p className="text-text text-lg max-w-2xl mx-auto">
                            With the establishment of the Shoova Restoration Campus, this is the
                            measurable transformation we are working toward across land, water, and livelihoods.
                        </p>

                    </div>


                    {/* IMPACT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        {/* LAND */}
                        <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-xl transition">

                            <p className="text-xs uppercase tracking-widest text-primary mb-4">
                                Land
                            </p>

                            <h3 className="text-5xl md:text-6xl font-bold text-textDark mb-4">
                                <CountUp end={500} suffix="+" />
                            </h3>

                            <p className="text-lg font-semibold text-textDark mb-2">
                                Acres Restored
                            </p>

                            <p className="text-text text-sm leading-relaxed">
                                Restoring land damaged by illegal mining into thriving ecosystems
                                capable of supporting communities and agriculture.
                            </p>

                        </div>


                        {/* WATER */}
                        <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-xl transition">

                            <p className="text-xs uppercase tracking-widest text-secondary mb-4">
                                Water
                            </p>

                            <h3 className="text-5xl md:text-6xl font-bold text-textDark mb-4">
                                <CountUp end={65} suffix="%" />
                            </h3>

                            <p className="text-lg font-semibold text-textDark mb-2">
                                Pollution Reduction
                            </p>

                            <p className="text-text text-sm leading-relaxed">
                                Improving river systems through the reduction of mercury, silt,
                                and harmful contaminants caused by illegal mining.
                            </p>

                        </div>


                        {/* PEOPLE */}
                        <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-xl transition">

                            <p className="text-xs uppercase tracking-widest text-primary mb-4">
                                People
                            </p>

                            <h3 className="text-5xl md:text-6xl font-bold text-textDark mb-4">
                                <CountUp end={1200} suffix="+" />
                            </h3>

                            <p className="text-lg font-semibold text-textDark mb-2">
                                Youth Empowered
                            </p>

                            <p className="text-text text-sm leading-relaxed">
                                Transitioning young people from dangerous mining into skilled,
                                dignified, and sustainable livelihoods.
                            </p>

                        </div>

                    </div>


                    {/* SMALL DISCLAIMER (VERY IMPORTANT) */}
                    <p className="text-center text-xs text-gray-500 mt-10 max-w-xl mx-auto">
                        Projected impact based on full implementation of the Shoova Restoration Campus.
                    </p>


                    {/* CTA */}
                    <div className="text-center mt-12">
                        <Link
                            to="/donate"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-full hover:bg-secondaryHover transition"
                        >
                            Support This Impact
                            <span>→</span>
                        </Link>
                    </div>

                </div>

            </section>
        </div>
    );
};

export default WhyItMatters;