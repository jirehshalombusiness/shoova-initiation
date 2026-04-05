import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Heart } from 'lucide-react';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { MapPin } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Text } from '../components/Text';
import { motion } from "framer-motion"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountUp from "../components/CountUp"
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF, FaYoutube, FaShareAlt } from "react-icons/fa";

export const IndexPage = ({ className, children, variant, contentKey, ...props }) => {

  // const [birthday, setBirthday] = useState(null);
  // const [subscribed, setSubscribed] = useState(false);

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   birthdayMonth: "",
  //   birthdayDay: "",
  //   birthdayYear: "",
  //   birthdayReminder: false
  // });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value
  //   });
  // };
  // const handleSubscribe = async (e) => {

  //   e.preventDefault();

  //   try {

  //     const res = await fetch("https://shoova-initiation.onrender.com/newsletter/subscribe", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //         birthday: birthday ? birthday.toISOString() : null
  //       })
  //     });

  //     const data = await res.json();

  //     console.log("SERVER RESPONSE:", data);

  //     if (data.success) {
  //       setSubscribed(true);

  //       // clear form
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         birthdayMonth: "",
  //         birthdayDay: "",
  //         birthdayYear: "",
  //         birthdayReminder: false
  //       });

  //       setBirthday(null);

  //       window.scrollTo({ top: 0, behavior: "smooth" });
  //     }

  //   } catch (error) {

  //     console.error("Subscription failed:", error);

  //   }

  // };

  // const impactTabs = [
  //   {
  //     id: "environment",
  //     label: "Environment",
  //     eyebrow: "WHY RESTORATION?",
  //     title: "Because healthy land sustains life",
  //     image: "/img/envi.jpg",
  //     text: "Reclaiming land damaged by illegal mining restores soil health, protects water sources, and rebuilds ecosystems that communities depend on.",
  //   },
  //   {
  //     id: "youth",
  //     label: "Youth",
  //     eyebrow: "WHY YOUTH?",
  //     title: "Because opportunity changes destinies",
  //     image: "/img/youth.jpg",
  //     text: "When young people gain technical and environmental skills, they can build dignified livelihoods that replace destructive mining practices.",
  //   },
  //   {
  //     id: "communities",
  //     label: "Communities",
  //     eyebrow: "WHY COMMUNITIES?",
  //     title: "Because restoration begins at home",
  //     image: "/img/community.jpg",
  //     text: "Communities that lead restoration efforts protect their environment while creating sustainable opportunities for present and future generations.",
  //   },
  //   {
  //     id: "future",
  //     label: "Future",
  //     eyebrow: "WHY THE FUTURE?",
  //     title: "Because what we restore today shapes tomorrow",
  //     image: "/img/future.jpg",
  //     text: "Restoring landscapes today ensures that future generations inherit healthier ecosystems, stronger livelihoods, and renewed hope.",
  //   },
  // ];
  // const [activeImpact, setActiveImpact] = useState(impactTabs[0]);

  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const scrollY = window.scrollY;

      // Move video slower than scroll → parallax effect
      videoRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut"
      }
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };
  return (

    <div className="font-body cursor-default antialiased">
      {/* {subscribed && (
        <div className="fixed -top-2 left-0 w-full bg-primary text-white py-4 px-6 flex justify-between items-center z-[9999] shadow-lg">

          <p className="text-sm md:text-base">
            You're signed up! You'll now receive Shoova restoration updates.
          </p>

          <button
            onClick={() => setSubscribed(false)}
            className="text-white text-xl font-bold"
          >
            ×
          </button>

        </div>
      )} */}
      <>
        {/* Hero Section */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}

          id="hero"
          className="relative h-screen w-full flex items-center overflow-hidden"
        >
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110"
            >
              <source src="/img/planting.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
            <div className="max-w-lg text-left text-white">

              {/* 🔥 HEADLINE (TIGHT STACKED BLOCKS) */}
              <div className="flex flex-col items-start leading-none  mb-4">
                <div className="bg-white text-black px-4 py-2 rounded-sm shadow">
                  <span className="text-2xl md:text-4xl lg:text-5xl font-bold">
                    Halt illegal mining,
                  </span>
                </div>
                <div className="bg-secondary px-4 mr-16 py-2 rounded-sm shadow">
                  <span className="text-2xl md:text-3xl lg:text-3xl font-bold text-white uppercase">
                    Stop Galamsey!
                  </span>
                </div>
                <div className="bg-white px-4 ml-10 py-2 rounded-sm shadow">
                  <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-secondary">
                    Heal the Land.
                  </span>
                </div>

              </div>

              <div className="mb-6">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide">
                  ONE STUDENT <br /> AT A TIME
                </h2>

                <p className="mt-4 text-white/80 text-sm md:text-base max-w-sm">
                  Building the Shoova Restoration Campus in Ghana.
                </p>
              </div>

              {/* 🔥 CTA (MATCHED TO DESIGN SYSTEM) */}
              {/* <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondaryHover text-white px-6 py-3 rounded-sm font-bold text-sm md:text-base tracking-wide transition shadow-md active:scale-[0.97]"
              >
                Donate Now
                <span className="text-lg">→</span>
              </Link> */}

            </div>
          </div>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-8 left-10 text-white/70 animate-bounce">
            ↓
          </div>
        </motion.section>

        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="py-28 bg-gray-50 relative overflow-hidden"
        >

          {/* BACKGROUND */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-0 top-0 w-1/2 h-full -skew-x-12 origin-top-left"
          />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16 relative z-10">

            {/* IMAGE */}
            <motion.div
              variants={fadeLeft}
              className="relative flex justify-center md:justify-start"
            >
              <div className="relative">

                <motion.img
                  src="/img/founders.png"
                  alt="Shoova Founder"
                  className="w-[420px] md:w-[850px] lg:w-[820px] object-contain  -mt-16 md:-mt-52"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                />


                {/* glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="absolute inset-0 bg-secondary/10 blur-3xl -z-10"
                />
              </div>
            </motion.div>

            {/* TEXT */}
            <motion.div variants={fadeRight} className="max-w-xl">

              {/* label */}
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-widest text-secondary font-semibold mb-4"
              >
                Founder’s Message
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-widest text-primary font-semibold mb-4"
              >
                Rooted in a Higher Vision
              </motion.p>


              {/* quote */}
              <motion.div
                variants={fadeUp}
                className="relative pl-6 mb-8"
              >
                <span className="absolute left-0 top-0 text-4xl text-secondary leading-none">
                  “
                </span>

                <p className="text-2xl md:text-xl font-semibold text-gray-900 leading-snug">
                  The desolation caused by illegal mining (galamsey) isn&#39;t just an environmental crisis; it is a human one.
                  We saw a generation of youth trapped in extractive labor and a landscape that had become prey to
                  destruction. It was then that we realized our skills weren&#39;t just to help the boardroom, they were also
                  meant to help the people and the land.
                </p>
                <p className="text-2xl md:text-xl font-semibold text-gray-900 leading-snug ">
                  Our motivation and love sacrifice are anchored in Isaiah 42:22: &#39;But this is a people plundered and
                  looted; all of them are trapped in holes and hidden in prisons. They have become prey with no one to
                  rescue them, spoil with no one to say, Restore!&#39;
                </p>
                <p className="text-2xl md:text-xl font-semibold text-gray-900 leading-snug mb-4">
                  We are here to say, &#39;Restore.&#39; We invite you to join us as we turn the &#39;cracked earth&#39; of the past into
                  the &#39;Rising Sun&#39; of a sustainable future for Ghana.
                </p>



                <span className="text-secondary text-3xl ml-1">”</span>
              </motion.div>

              {/* NAME */}
              <motion.h2
                variants={fadeUp}
                transition={{ delay: 0.2 }}
                className="text-gray-800 font-medium"
              >
                <span className="font-semibold">William Agyekum &amp; Salome Agyekum</span>
                <span className="text-gray-500">, Co-Founders, Shoova Initiative</span>
              </motion.h2>

            </motion.div>

          </div>
        </motion.section>

        <section className="relative w-full h-screen flex items-center overflow-hidden">

          {/* PARALLAX BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/img/galamsey.jpg')" }}
          ></div>

          {/* OVERLAYS */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full">
            <div className="max-w-md text-white">

              {/* OPTIONAL LABEL */}
              <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">
                The Problem of Galamsey
              </p>

              {/* HEADLINE */}
              <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight">
                Become a regular giver <br />
                and <span className="text-secondary">restore lives beyond galamsey.</span>
              </h2>

              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-10 space-y-4">
                Ghana is facing an ecological and humanitarian crisis.
                Illegal mining has poisoned water sources, destroyed forests, and trapped thousands of young people in dangerous, low-paying work.
              </p>

              {/* CTA */}
              <button className="bg-secondary hover:bg-secondaryHover text-white px-8 py-3.5 font-bold text-sm tracking-wide uppercase rounded-md transition shadow-lg">
                Donate
              </button>

            </div>
          </div>

        </section>

        <motion.section
          id="solution"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="py-28 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            {/* HEADER */}
            <motion.div
              variants={fadeUp}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-heading font-bold text-textDark mb-6 leading-tight">
                Shoova Restoration Campus
              </h2>

              <p className="text-text text-lg md:text-xl leading-relaxed">
                We are building an 8-acre vocational institute dedicated to hands-on,
                high-impact training that dignifies labor, equips youth with real skills,
                and restores the environment.
              </p>
            </motion.div>

            {/* GRID */}
            <motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16"
            >

              {/* CARD 1 */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center text-center max-w-sm mx-auto transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary mb-6">
                  <img src="/img/school.png" alt="" className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-textDark mb-4">
                  School of Engineering & Fabrication
                </h3>

                <p className="text-text text-base leading-relaxed">
                  Mastering the trades that build nations precision welding, heavy machinery repair,
                  and metal fabrication. We turn raw talent into industrial expertise.
                </p>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center text-center max-w-sm mx-auto transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary mb-6">
                  <img src="/img/school.png" alt="" className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-textDark mb-4">
                  School of Sustainable Futures
                </h3>

                <p className="text-text text-base leading-relaxed">
                  Leading the green transition through solar installation, land reclamation,
                  and sustainable agriculture equipping youth to restore and protect ecosystems.
                </p>
              </motion.div>

              {/* CARD 3 */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center text-center max-w-sm mx-auto transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary mb-6">
                  <img src="/img/school.png" alt="" className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-textDark mb-4">
                  School of Ethical Leadership
                </h3>

                <p className="text-text text-base leading-relaxed">
                  Training in business, data-driven management, and cooperative ethics so graduates
                  don’t just find jobs, but create opportunities for others.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </motion.section>
        {/* ================= OUR PROCESS ================= */}
        <section className="relative bg-white pt-24 pb-10">

          {/* HEADER */}
          <div className="text-center mb-12 md:mb-16 px-6">

            <p className="text-sm uppercase tracking-[0.25em] text-secondary/80 mb-4">
              Our Process
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-textDark mb-4 leading-tight">
              Turning destruction into restoration
            </h2>

            <div className="w-16 h-[2px] bg-secondary mx-auto mb-32"></div>

          </div>

          {/* PROCESS CARD */}
          <div className="relative -mt-16 md:-mt-20 mb-20 md:mb-28 px-6 md:px-10 z-20">

            <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl">

              <div className="grid grid-cols-1 md:grid-cols-3">

                {/* STEP 1 */}
                <div className="bg-[#0f2f44] text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

                  <p className="text-md uppercase tracking-widest text-white/60 mb-3">
                    Step 01
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Reclaim
                  </h3>

                  <p className="text-white/80 text-md leading-relaxed">
                    We identify lands devastated by illegal mining and engage local
                    communities to begin environmental recovery.
                  </p>

                </div>


                {/* STEP 2 */}
                <div className="bg-[#c9a96a] text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

                  <p className="text-md uppercase tracking-widest text-white/70 mb-3">
                    Step 02
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Train
                  </h3>

                  <p className="text-white/90 text-md leading-relaxed">
                    We equip youth with engineering, environmental, and vocational
                    skills that create real alternatives to galamsey.
                  </p>

                </div>


                {/* STEP 3 */}
                <div className="bg-[#d94a34] text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

                  <p className="text-md uppercase tracking-widest text-white/70 mb-3">
                    Step 03
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Restore
                  </h3>

                  <p className="text-white/90 text-md leading-relaxed">
                    Our graduates rebuild ecosystems, restore livelihoods, and lead
                    communities away from destructive mining practices.
                  </p>

                </div>

              </div>

            </div>
          </div>

        </section>
        {/* Why This Movement Matters */}
        {/* <section id="why_this_movement_matters" className="py-24 bg-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-secondary/80 mb-4">
                {activeImpact.eyebrow}
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-textDark max-w-4xl mx-auto leading-tight">
                Because restoring land restores lives
              </h2>
            </motion.div>

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

            <motion.div
              key={activeImpact.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden min-h-[620px] shadow-xl"
            >
           
              <img
                src={activeImpact.image}
                alt={activeImpact.label}
                className="absolute inset-0 w-full h-full object-cover"
              />

             
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

             
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
        </section> */}

        {/* Ready to Restore the Land */}
        <section id="ready_to_restore" className="py-24 bg-[#f7f3ea]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <div className="text-center mb-16">
              <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-4">
                Restoration Tiers
              </p>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark mb-6">
                Choose Your Impact
              </h2>

              <p className="text-xl text-text max-w-2xl mx-auto">
                Every contribution fuels restoration — from soil testing to building the Shoova Restoration Campus.
              </p>
            </div>


            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              grabCursor
              spaceBetween={24}
              slidesPerView={1.2}
              loop

              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
            >

              {/* Root Seed */}
              <SwiperSlide>
                <Link
                  to="/donate " state={{ amount: 25 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/restore.jpg"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  {/* Default Title */}
                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      The Root Seed
                    </h3>
                  </div>

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$25</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      The Root Seed
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Funds one day of land reclamation soil-testing for a student field team.
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Join the Restoration
                    </button>

                  </div>

                </Link>
              </SwiperSlide>


              {/* Tool Kit */}
              <SwiperSlide>
                <Link
                  to="/donate " state={{ amount: 100 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/train.jpg"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      The Tool Kit
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$100</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      The Tool Kit
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Provides a set of high-quality tools for one student.
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Sponsor a Future Architect
                    </button>

                  </div>

                </Link>
              </SwiperSlide>


              {/* Scholar Path */}
              <SwiperSlide>
                <Link
                  to="/donate " state={{ amount: 500 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/youth.jpg"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      The Scholar's Path
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$500</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      The Scholar's Path
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Covers a full semester of training for a youth transitioning out of galamsey.
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Sponsor a Future Architect
                    </button>

                  </div>

                </Link>
              </SwiperSlide>
              {/* Restoration Fello*/}
              <SwiperSlide>
                <Link
                  to="/donate " state={{ amount: 1000 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/2.png"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      The Scholar's Path
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$1,000</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      The Scholar's Path
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Covers a full semester of tuition/training and boarding for a local youth transitioning out of galamsey.
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Sponsor a Restoration Fellow
                    </button>

                  </div>

                </Link>
              </SwiperSlide>
              {/* Lab Anchor*/}
              <SwiperSlide>
                <Link
                  to="/donate " state={{ amount: 2500 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/eng.jpg"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      The Lab Anchor
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$2,500</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      The Lab Anchor
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Equips our Engineering Lab with a major piece of machinery
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Equip the Engineering Lab
                    </button>

                  </div>

                </Link>
              </SwiperSlide>


              {/* Campus Catalyst */}
              <SwiperSlide>
                <Link
                  to="/donate" state={{ amount: 5000 }}
                  className="group relative h-[420px] rounded-xl overflow-hidden block"
                >

                  <img
                    src="/img/community.jpg"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/80 transition duration-500" />

                  <div className="absolute bottom-6 left-6 text-white z-10 group-hover:opacity-0 transition">
                    <h3 className="text-xl font-heading font-bold">
                      Campus Catalyst
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="text-secondary font-bold text-sm mb-3">$5000+</p>

                    <h3 className="text-2xl font-heading font-bold mb-4">
                      Campus Catalyst
                    </h3>

                    <p className="text-white/90 text-sm mb-6 max-w-xs">
                      Directly funds the construction of dormitories or staff housing at the Shoova Restoration Campus.
                    </p>

                    <button className="bg-secondary hover:bg-secondaryHover px-6 py-3 rounded-full font-semibold">
                      Fund a Hectare of Hope
                    </button>

                  </div>

                </Link>
              </SwiperSlide>

            </Swiper>

          </div>
        </section>
        {/* PROJECTED IMPACT */}
        {/* <section id="impact" className="py-28 bg-white">

          <div className="max-w-7xl mx-auto px-6 md:px-10">

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
            <p className="text-center text-xs text-gray-500 mt-10 max-w-xl mx-auto">
              Projected impact based on full implementation of the Shoova Restoration Campus.
            </p>
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
        </section> */}
        <section className="py-16 bg-[#F9FAFB] relative overflow-hidden">

          {/* SUBTLE BACKGROUND ACCENT */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.08),transparent_60%)]"></div>

          <div className="relative max-w-5xl mx-auto px-6 text-center">

            {/* LABEL */}
            <p className="text-sm uppercase font-bold tracking-[0.3em] text-[#D4AF37] mb-4">
              Campus Development
            </p>

            {/* TITLE */}
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              The Shoova Restoration Campus is Under Development
            </h2>

            {/* BODY */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
              Our 8-acre campus in Ghana’s Eastern Region is currently in its planning phase.
              This space will soon host academic training, technical production, and a
              residential community designed to restore both land and livelihoods.
            </p>

            {/* STATUS BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-gray-800 font-semibold mb-10"
            >
              🚧 Coming Soon
            </motion.div>

            {/* OPTIONAL CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                to="/contact"
                className="px-8 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondaryHover transition"
              >
                Partner With Us
              </Link>

              <Link
                to="/about"
                className="px-8 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                Learn More
              </Link>

            </div>

          </div>

        </section>

        {/* NEWS LETTER SECTION */}
        {/* <motion.section
          id="restoration_report"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 bg-white border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              
              <motion.div variants={fadeLeft} className="relative">

                <motion.img
                  src="/img/Header.png"
                  alt="Receive real-time updates on land restoration."
                  className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                />

              
                <motion.div
                  variants={fadeUp}
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg max-w-xs"
                >
                  <p className="text-sm text-gray-700 font-medium">
                    Receive real-time updates on land restoration, student progress, and the impact your support is making.
                  </p>
                </motion.div>

              </motion.div>

            
              <motion.form
                onSubmit={handleSubscribe}
                variants={fadeRight}
                className="bg-[#f7f7f7] p-10 rounded-2xl shadow-sm space-y-6"
              >

                <motion.div variants={fadeUp}>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-textDark mb-3">
                    Subscribe to the Shoova Restoration Report
                  </h2>

                  <p className="text-lg text-text leading-relaxed">
                    Receive updates on land restoration, youth training, and the progress of the Shoova Restoration Campus.
                  </p>
                </motion.div>
                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wide mb-2">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wide mb-2">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                    />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold tracking-wide mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                  />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold tracking-wide mb-2">
                    BIRTHDAY (OPTIONAL)
                  </label>

                  <DatePicker
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.birthdayReminder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        birthdayReminder: e.target.checked
                      })
                    }
                    className="mt-1"
                  />

                  <p className="text-sm text-gray-700 leading-relaxed">
                    Set a reminder to pledge my birthday and help restore land and empower communities.
                  </p>
                </motion.div>
                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondaryHover text-white font-semibold py-4 rounded-md transition shadow-md"
                >
                  Keep Me Informed
                </motion.button>
                <motion.p variants={fadeUp} className="text-xs text-gray-500 leading-relaxed">
                  By clicking “Subscribe”, you agree to receive updates from the Shoova Restoration Initiative.
                </motion.p>

              </motion.form>

            </div>

          </div>
        </motion.section> */}

        {/* Share the Story */}
        {/* <section id="share_the_story" className="py-24 bg-background border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/img/share.jpg"
                alt="Illegal mining destruction in Ghana"
                className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
              />

            </div>

            <div>

              <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-4">
                Share the Story
              </p>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark mb-6">
                From Galamsey to Growth
              </h2>

              <p className="text-lg text-text leading-relaxed mb-8">
                The destruction caused by illegal mining is one of the most urgent
                environmental crises facing Ghana today. But restoration is possible.
                Help more people understand the challenge — and the solution — by
                sharing the Shoova restoration story.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">

               
                <button
                  onClick={() => {
                
                    fetch("http://localhost:5000/engagement/track-download", {
                      method: "POST"
                    });

                 
                    window.open("/docs/galamsey-to-growth.pdf", "_blank");
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondaryHover text-white font-semibold rounded-full transition shadow-lg"
                >
                  Download Fact Sheet
                </button>

                
                <button

                  onClick={async () => {
                    const url = window.location.origin + "#share_the_story";

                    const text =
                      "Galamsey is destroying lands across Ghana.\n\n" +
                      "Shoova is restoring these ecosystems and communities.\n\n" +
                      "Learn more:";

                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: "Shoova Restoration Initiative",
                          text,
                          url,
                        });
                      } else {
                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
                        window.open(whatsappUrl, "_blank");
                      }
                    } catch (err) {
                      console.warn("Share cancelled or failed:", err);
                     
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
                      window.open(whatsappUrl, "_blank");
                    }
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition"
                >
                  Share With Your Network
                </button>

              </div>

              <p className="text-sm text-gray-500 mt-6">
                Community awareness is the first step toward environmental restoration.
              </p>

            </div>

          </div>
        </section> */}

        {/* Meet the People Behind the Restoration */}
        <section id="meet_the_team" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left Content */}
              <div>
                <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-4">
                  Leadership & Trust
                </p>

                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                  Meet the People Behind the Restoration
                </h2>

                <p className="text-teal-100 text-lg mb-8 leading-relaxed max-w-xl">
                  Shoova Initiative is led by a coalition of project managers, data
                  scientists, engineers, and community leaders united by one mission:
                  to restore land, rebuild livelihoods, and equip the next generation
                  of technical leaders in Ghana’s Eastern Region.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <Text className="text-xl font-medium">
                      Minnesota-based leadership and governance
                    </Text>
                  </li>

                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <Text className="text-xl font-medium">
                      Ghana-rooted operations and partnerships
                    </Text>
                  </li>

                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <Text className="text-xl font-medium">
                      Financial stewardship and accountability
                    </Text>
                  </li>

                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <Text className="text-xl font-medium">
                      Technical, legal, and community expertise
                    </Text>
                  </li>
                </ul>

                <Link
                  to="/about"
                  className="inline-block mt-8 px-7 py-3 border border-white/40 rounded-full font-semibold hover:bg-white hover:text-primary transition"
                >
                  Meet the Full Team
                </Link>
              </div>

              {/* Right Portrait Grid */}
              <div className="grid grid-cols-2 gap-6">

                {/* Member 1 */}
                <div className="group relative transform translate-y-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/portriat.jpg"
                      alt="William Agyekum"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Expanding Social Rail */}
                    {/* Expanding Social Rail */}
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">

                        {/* Main Share Icon */}
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>

                        {/* Hidden Icons */}
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">

                          <a
                            href="https://web.facebook.com/william.o.agyekum.7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaFacebookF className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://x.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaXTwitter size={30} color="white" className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaInstagram className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaYoutube className="w-4 h-4 text-white" />
                          </a>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Mr. William Agyekum</h3>
                    <p className="text-sm text-teal-100 mt-1">Co-Founder &amp; President</p>
                    <p className="text-xs text-white/70 mt-1">USA</p>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/salome.jpg"
                      alt="Salome Agyekum"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Expanding Social Rail */}
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">

                        {/* Main Share Icon */}
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>
                        {/* Hidden Icons */}
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">
                          <a
                            href="https://facebook.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaFacebookF className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://x.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaXTwitter size={30} color="white" className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaInstagram className="w-4 h-4 text-white" />
                          </a>
                          <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaYoutube className="w-4 h-4 text-white" />
                          </a>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Mrs. Salome Agyekum, CA</h3>
                    <p className="text-sm text-teal-100 mt-1">Co-Founder &amp;Treasurer</p>
                    <p className="text-xs text-white/70 mt-1">USA</p>
                  </div>
                </div>

                {/* Member 3 */}
                <div className="group relative transform translate-y-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/opon.jpg"
                      alt="Kwame Opon-Yeboah"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Expanding Social Rail */}
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">

                        {/* Main Share Icon */}
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>

                        {/* Hidden Icons */}
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">

                          <a
                            href="https://facebook.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaFacebookF className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://x.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaXTwitter size={30} color="white" className="w-4 h-4 text-white" />
                          </a>
                          <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaInstagram className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaYoutube className="w-4 h-4 text-white" />
                          </a>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Mr. Kwame Opon-Yeboah</h3>
                    <p className="text-sm text-teal-100 mt-1">Head of Ghana Operations</p>
                    <p className="text-xs text-white/70 mt-1">Ghana</p>
                  </div>
                </div>

                {/* Member 4 */}
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/juliuss.jpg"
                      alt="Julius Botchway "
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Expanding Social Rail */}
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">

                        {/* Main Share Icon */}
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>

                        {/* Hidden Icons */}
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">

                          <a
                            href="https://web.facebook.com/roland.glin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaFacebookF className="w-4 h-4 text-white" />
                          </a>


                          <a
                            href="https://x.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaXTwitter size={30} color="white" className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://instagram.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaInstagram className="w-4 h-4 text-white" />
                          </a>

                          <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaYoutube className="w-4 h-4 text-white" />
                          </a>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Mr. Julius Botchway</h3>
                    <p className="text-sm text-teal-100 mt-1">Director of Ghana Operations</p>
                    <p className="text-xs text-white/70 mt-1">Ghana</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* Final CTA */}
        {/* <section id="join_the_restoration" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary">
            <Image
              variant="cover"
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              src="/img/community.jpg"
              alt="Shoova restoration movement"
            />
          </div>

          <div className="absolute inset-0 bg-black/30"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">

            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Help Turn Scars Back Into Strength
            </h2>

            <p className="text-xl text-teal-100 mb-10">
              Restore land. Equip youth. Rebuild communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                className="px-10 py-5 bg-secondary hover:bg-secondaryHover text-white font-bold text-xl rounded-full transition-all shadow-xl transform hover:scale-105"
                to="/donate"
              >
                Join the Restoration
              </Link>

              <Link
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-bold text-xl rounded-full transition-all"
                to="/contact"
              >
                Partner With Us
              </Link>

            </div>

          </div>
        </section> */}
      </>
    </div>
  );
};

