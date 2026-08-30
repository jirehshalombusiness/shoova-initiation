import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowRight, GraduationCapIcon } from 'lucide-react';
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
import { FaLinkedin } from "react-icons/fa";
import GalamseySection from '../components/GalamseySection';
import { GraduationCap, Leaf, Briefcase, Shield ,ArrowDownRight,ArrowUpRight} from "lucide-react";
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
  //     text: "Reclaiming land damaged by Irresponsible mining restores soil health, protects water sources, and rebuilds ecosystems that communities depend on.",
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

  const launchDate = new Date("2026-08-28T10:00:00+00:00");

  const calculateTimeLeft = () => {
    const difference = launchDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const scrollY = window.scrollY;
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
      <>
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}

          id="hero"
          className="relative min-h-[100svh] lg:h-screen w-full flex items-center overflow-hidden"
        >

          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110"
            >
              <source src="/img/Shoova.mp4" type="video/mp4" />
            </video>
          </div>


          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>


          <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-10 py-24 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="max-w-lg text-left text-white">

                <div className="flex flex-col items-start leading-none  mb-3">
                  <div className="bg-white text-black px-4 py-2 rounded-sm shadow">
                    <span className="text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold">
                      Say Yes To Responsible Mining,
                    </span>
                  </div>
                  <div className="bg-secondary px-4 mr-16 py-2 rounded-sm shadow">
                    <span className="text-2xl md:text-3xl lg:text-3xl font-bold text-white uppercase">
                      Sustainable Future
                    </span>
                  </div>
                  <div className="bg-white px-4 ml-10 py-2 rounded-sm shadow">
                    <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-secondary">
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


                {/* <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondaryHover text-white px-6 py-3 rounded-sm font-bold text-sm md:text-base tracking-wide transition shadow-md active:scale-[0.97]"
              >
                Donate Now
                <span className="text-lg">→</span>
              </Link> */}

              </div>

              {/* <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <div className="w-full max-w-xl">

                  <div className="bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">

                    <p className="text-secondary uppercase tracking-[0.35em] text-sm font-bold mb-3">
                      The Countdown Has Begun
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Shoova Ghana Launch
                    </h2>

                    <p className="text-white/70 mb-8">
                      Friday, 28 August 2026 · 10:00 AM
                    </p>

                    <div className="grid grid-cols-4 gap-2 sm:gap-3">

                      <div className="bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-4 text-center min-w-0">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                          {String(timeLeft.days).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-white/50 mt-2 whitespace-nowrap">
                          Days
                        </div>
                      </div>

                      <div className="bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-4 text-center min-w-0">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-white/50 mt-2 whitespace-nowrap">
                          Hours
                        </div>
                      </div>

                      <div className="bg-white/10 border border-white/10 rounded-xl p-2.5 sm:p-4 text-center min-w-0">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-white/50 mt-2 whitespace-nowrap">
                          Minutes
                        </div>
                      </div>

                      <div className="bg-secondary/90 rounded-xl p-2.5 sm:p-4 text-center min-w-0">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-widest text-white/80 mt-2 whitespace-nowrap">
                          Seconds
                        </div>
                      </div>

                    </div>

                    <div className="mt-6 flex items-center gap-3 text-white/70 text-sm">
                      <MapPin className="w-4 h-4 text-secondary" />
                      Cedi Conference Centre · University of Ghana
                    </div>

                  </div>

                </div>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <div className="w-full max-w-xl">

                  <div className="relative overflow-hidden bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">

                    {/* Subtle gold glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative z-10">

                      {/* Eyebrow */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>

                        <p className="text-secondary uppercase tracking-[0.3em] text-xs sm:text-sm font-bold">
                          The Journey Has Begun
                        </p>
                      </div>

                      {/* Heading */}
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                        Shoova Ghana
                        <span className="block text-secondary">
                          Is Now Officially Live.
                        </span>
                      </h2>

                      {/* Description */}
                      <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-7">
                        On 28 August 2026, the Shoova vision came to life at the
                        Cedi Conference Centre, University of Ghana.
                      </p>

                      {/* Launch details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">

                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                            Official Launch
                          </p>

                          <p className="text-white font-semibold text-sm sm:text-base">
                            28 August 2026
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">
                            Location
                          </p>

                          <p className="text-white font-semibold text-sm sm:text-base">
                            University of Ghana
                          </p>
                        </div>

                      </div>

                      {/* Mission statement */}
                      <div className="border-l-2 border-secondary pl-4 mb-7">
                        <p className="text-white/80 text-sm sm:text-base italic leading-relaxed">
                          Restoring land. Creating opportunity. Building a sustainable
                          future for the next generation.
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-3">

                        <Link
                          to="/about"
                          className="inline-flex items-center justify-center gap-2
                       bg-secondary hover:bg-secondaryHover
                       text-white px-6 py-3.5
                       rounded-full font-semibold
                       text-sm sm:text-base
                       transition-all duration-300
                       shadow-lg hover:shadow-secondary/20
                       active:scale-[0.97]"
                        >
                          Discover Shoova
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center gap-2
                       border border-white/25
                       hover:bg-white hover:text-black
                       text-white px-6 py-3.5
                       rounded-full font-semibold
                       text-sm sm:text-base
                       transition-all duration-300
                       active:scale-[0.97]"
                        >
                          Get Involved
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>
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
          className="py-32 bg-gray-100 relative overflow-hidden"
        >

          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/img/campus12.jpeg"
              alt="Shoova Emblem"
              className="
      w-full h-full
      object-cover
      opacity-10
    "
            />
          </div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10"
            >
              The Restoration Mandate
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="space-y-6 text-gray-800 leading-relaxed text-justify"
            >

              <p className="text-lg md:text-xl">
                The desolation caused by Irresponsible mining (galamsey) isn't just an environmental crisis;
                it is a human one. We saw a generation of youth trapped in extractive labor and a landscape
                that had become prey to destruction.
              </p>

              <p className="text-lg md:text-xl">
                We are called to be faithful stewards of what is committed to us. For us, this is a mandate
                to help the people and the land. Our motivation and sacrificial love are anchored in the Word.
              </p>

              <p className="text-lg md:text-xl font-semibold">
                We are here to say,
                <span className="text-primary font-bold"> “Restore.”</span>
              </p>

              <p className="text-base md:text-lg italic text-gray-600">
                "But this is a people plundered and looted; all of them are trapped in holes and hidden
                in prisons. They have become prey with no one to rescue them, spoil with no one to say, Restore!"
                — Isaiah 42:22
              </p>

              <p className="text-lg md:text-xl">
                We invite you to join us as we turn the "cracked earth" of the past into the
                <span className="text-primary font-semibold"> "Rising Sun"</span> of a sustainable future for Ghana.
              </p>

            </motion.div>

          </div>
        </motion.section>

        <section className="relative w-full h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/img/galamsey.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>
          <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full">
            <div className="max-w-md text-white">
              <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">
                The Problem of Galamsey
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6 tracking-tight">
                Become a part of the solution.<br />
                <span className="text-secondary">Let’s restore lives beyond galamsey.</span>
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed mb-10 space-y-4">
                Ghana is facing an ecological and humanitarian crisis.
                Irresponsible mining has poisoned water sources, destroyed forests, and trapped thousands of young people in dangerous, low-paying work.
              </p>

            </div>
          </div>

        </section>
        <GalamseySection />
        {/* LAUNCH SECTION */}
        {/* <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-black text-white py-20 md:py-24"
        >
       
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-250px] right-[-100px] w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

            <p className="text-secondary uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5">
              The Moment Has Arrived
            </p>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Shoova Ghana Launch
            </h2>

            <p className="max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed mb-10">
              A new chapter in responsible mining, environmental restoration,
              and opportunity for the next generation begins here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">

              <div className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                  Date
                </p>
                <p className="font-semibold">
                  Friday, 28 August 2026
                </p>
              </div>

              <div className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                  Time
                </p>
                <p className="font-semibold">
                  10:00 AM
                </p>
              </div>

              <div className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                  Venue
                </p>
                <p className="font-semibold">
                  Cedi Conference Centre
                </p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <Link
                to="/about"
                className="px-7 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondaryHover transition"
              >
                Discover Shoova
              </Link>

              <Link
                to="/contact"
                className="px-7 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Get Involved
              </Link>

            </div>

          </div>
        </motion.section> */}

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden bg-black text-white py-24 md:py-32"
        >
          {/* Background atmosphere */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/15 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-250px] left-[-150px] w-[450px] h-[450px] bg-secondary/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

            {/* SECTION INTRO */}
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-secondary uppercase tracking-[0.35em] text-xs md:text-sm font-bold mb-5"
              >
                The Beginning
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
              >
                The Journey
                <span className="block text-secondary">
                  Has Begun.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-7 max-w-2xl mx-auto text-white/65 text-base md:text-lg leading-relaxed"
              >
                On 28 August 2026, the Shoova Initiative officially launched its
                vision to restore degraded land, create pathways to opportunity,
                and equip the next generation to build a sustainable future.
              </motion.p>

            </div>


            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 mb-16"
            >

              <div className="flex items-center gap-3 text-white/70 text-sm">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="uppercase tracking-widest">
                  28 August 2026
                </span>
              </div>

              <div className="hidden md:block w-px h-5 bg-white/20" />

              <div className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>
                  Cedi Conference Centre · University of Ghana
                </span>
              </div>

            </motion.div>


            {/* ========================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

              {/* MAIN IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9 }}
                className="lg:col-span-7 relative group"
              >

                <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-2xl border border-white/10">

                 
                  <img
                    src="/img/IMG_shoova.jpg"
                    alt="Shoova Ghana launch"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

                    <p className="text-secondary text-xs uppercase tracking-[0.3em] font-bold mb-2">
                      Shoova Ghana
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold">
                      A Vision Becomes a Movement
                    </h3>

                  </div>

                </div>

              </motion.div>


            
              <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-5">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="relative group h-[250px] md:h-[270px] lg:h-[267px] overflow-hidden rounded-2xl border border-white/10"
                >

                  <img
                    src="/img/IMG_shoova1.jpg"
                    alt="Shoova team at launch"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="text-white font-semibold text-sm md:text-base">
                      The People Behind the Vision
                    </p>
                  </div>

                </motion.div>


                {/* IMAGE 03 */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="relative group h-[250px] md:h-[270px] lg:h-[267px] overflow-hidden rounded-2xl border border-white/10"
                >


                  <img
                    src="/img/IMG_shoova2.jpg"
                    alt="Guests at Shoova Ghana launch"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <p className="text-white font-semibold text-sm md:text-base">
                      A Community United for Restoration
                    </p>
                  </div>

                </motion.div>

              </div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-16 md:mt-20 grid md:grid-cols-2 gap-10 items-center"
            >

              <div>

                <p className="text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-4">
                  More Than A Launch
                </p>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  This is where
                  <span className="text-secondary"> restoration begins.</span>
                </h3>

              </div>

              <div className="md:border-l md:border-white/15 md:pl-10">

                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                  The launch marks the beginning of a long-term commitment to
                  restoring land, rebuilding livelihoods, expanding access to
                  technical education, and creating new possibilities for
                  communities affected by irresponsible mining.
                </p>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-7 text-secondary font-semibold hover:text-white transition-colors"
                >
                  Discover the Shoova vision
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </motion.div>

            <div className="mt-20 md:mt-24 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <div className="w-2 h-2 rounded-full bg-secondary" />

              <div className="h-px flex-1 bg-white/10" />

            </div>

          </div>
        </motion.section>
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="py-24 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">

            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <motion.div
                variants={fadeLeft}
                className="lg:col-span-3 relative"
              >
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/img/community.jpg"
                    alt="Shoova Community Restoration"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="absolute bottom-6 left-6 bg-white px-6 py-4 rounded-xl shadow-xl">

                  <p className="text-secondary text-sm font-bold uppercase tracking-wider">
                    Shoova Impact
                  </p>

                  <h4 className="text-xl font-bold text-textDark">
                    Turning Destroyers Into Restorers
                  </h4>

                </div>
              </motion.div>
              <motion.div
                variants={fadeRight}
                className="lg:col-span-2"
              >
                <p className="text-secondary font-bold uppercase tracking-[0.25em] text-sm mb-4">
                  Say Yes To Responsible Mining
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-textDark leading-tight mb-6">
                  Why Shoova Institute Is Key To Ending Irresponsible Mining
                </h2>
                <p className="text-lg text-text leading-relaxed mb-8">
                  Irresponsible mining thrives where poverty, educational exclusion,
                  and unemployment intersect. Shoova creates a direct pathway
                  from vulnerability to opportunity.
                </p>
                <div className="bg-primary text-white p-6 rounded-xl shadow-lg mb-5">
                  <h3 className="text-xl font-bold mb-3">
                    The Fuel of Galamsey
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Our findings reveal that many young people in mining-affected communities drop out of school early or lack the specific WASSCE qualifications required for university admission.
                    Because traditional higher education builds a rigid academic wall, these youth are left ineligible for traditional advancement.
                    With no formal skills and an urgent need to survive, they become highly vulnerable to exploitative mining syndicates.
                  </p>
                </div>
                <div className="bg-secondary text-white p-6 rounded-xl shadow-lg mb-8">
                  <h3 className="text-xl font-bold mb-3">
                    The Interruption
                  </h3>

                  <p className="text-white/95 leading-relaxed">
                    The Shoova Initiative intentionally builds a bridge where traditional academic systems have built a wall.
                    By lowering artificial entry barriers, emphasizing flexible, hands-on learning,
                    and providing a direct economic exit ramp,
                    we target the exact demographic most vulnerable to galamsey.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center border border-gray-200 rounded-xl p-4">
                    <h4 className="text-3xl font-bold text-primary">
                      6–12
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Months Training
                    </p>
                  </div>

                  <div className="text-center border border-gray-200 rounded-xl p-4">
                    <h4 className="text-3xl font-bold text-primary">
                      4
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Specialized Schools
                    </p>
                  </div>

                  <div className="text-center border border-gray-200 rounded-xl p-4">
                    <h4 className="text-3xl font-bold text-primary">
                      100%
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Restoration Focus
                    </p>
                  </div>

                </div>

              </motion.div>

            </div>

          </div>
        </motion.section>
        <section className="relative min-h-screen py-32 bg-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-[-20%] left-1/2 w-[700px] h-[700px] bg-red-200/20 blur-3xl rounded-full -translate-x-1/2" />
            <div className="absolute bottom-[-25%] right-1/2 w-[700px] h-[700px] bg-green-200/20 blur-3xl rounded-full translate-x-1/2" />
          </div>
          <div className="relative max-w-5xl mx-auto text-center px-6 mb-24">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
              From Extraction to Regeneration
            </h2>
            <p className="mt-6 text-gray-500 text-lg md:text-xl">
              Two systems. One defines decline. The other defines possibility.
            </p>
          </div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-200 via-gray-200 to-green-300 opacity-60 hidden md:block" />


          <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6">
            <motion.div
              initial={{ opacity: 0, x: -90 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative"
            >
              {/* glow layer */}
              <div className="absolute inset-0 bg-red-50/40 rounded-3xl blur-xl" />

              <div className="relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-red-100 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.35)]">

                <div className="mb-10">
                  <p className="text-xs tracking-[0.3em] text-red-400">
                    SYSTEM A — ENTRENCHED REALITY
                  </p>
                  <h3 className="text-2xl font-semibold text-red-700 mt-3">
                    The Galamsey Trap (Extractive)
                  </h3>
                </div>

                <div className="space-y-10 text-gray-800">

                  <div>
                    <p className="text-lg font-medium">Academic exclusion</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Out of school, missing WASSCE credentials, and locked out of formal career advancement.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-medium">Exploitative Daily Wage </p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Dangerous and toxic labor that leaves youth dependent on mining syndicates.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-medium">Environmental Destruction</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Paid to poison local water bodies and crack open fertile ancestral farming land.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 90 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-50/40 rounded-3xl blur-xl" />

              <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/60 to-green-50/40 backdrop-blur-xl border border-green-100 shadow-[0_25px_90px_-35px_rgba(0,0,0,0.3)]">

                <div className="mb-10">
                  <p className="text-xs tracking-[0.3em] text-green-500">
                    SYSTEM B — EMERGING PIPELINE
                  </p>
                  <h3 className="text-2xl font-semibold text-green-700 mt-3">
                    The Shoova Pipeline(Regenerative)
                  </h3>
                </div>

                <div className="space-y-10 text-gray-800">

                  <div>
                    <p className="text-lg font-medium">Radical Accessibility</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Flexible entry requirements that prioritize determination
                      and hands-on capability over standardized test scores.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-medium">High-value technical Skill</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Mastery in structural welding, precision mechanics, solar engineering, and ICT.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-medium">Ecosystem Restoration</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Direct, specialized training in soil biology, heavy metal neutralization, and advanced land reclamation.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative text-center mt-28 px-6"
          >
            <div className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white shadow-2xl">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              We replace extraction with regeneration
            </div>
          </motion.div>

        </section>
        <motion.section
          id="solution"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative py-32 bg-gray-50 overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-[-15%] left-1/2 w-[700px] h-[700px] bg-green-100/30 blur-3xl rounded-full -translate-x-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
            <motion.div variants={fadeUp} className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
                Shoova Restoration Campus
              </h2>

              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                We are not just teaching trades — We are empowering our youth to reclaim their economic self-reliance, transforming the very people who were once paid to destroy the land into the technical experts who will heal it.
              </p>

              <p className="mt-4 text-base text-gray-500">
                Four specialized systems producing builders, creators, and ethical leaders who restore land, economy, and communities.
              </p>
            </motion.div>

            {/* GRID */}
            <motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16"
            >

              {/* 🔧 CARD TEMPLATE 1 */}
              <motion.div
                variants={fadeUp}
                className="group relative p-9 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >

                {/* glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">

                  {/* 🧭 ICON BADGE */}
                  <div className="mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">

                      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-50 blur-xl transition" />

                      <Shield className="w-7 h-7 relative z-10 text-gray-600" />
                    </div>
                  </div>

                  {/* LABEL */}
                  <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
                    SYSTEM 01
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Engineering & Technical Systems
                  </h3>


                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Structural welding, solar technology, heavy machinery repair, and precision fabrication that power national infrastructure.
                  </p>

                  {/* OUTCOME */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-sm text-gray-900 font-medium">
                      Outcome: Infrastructure builders & energy technicians
                    </p>
                  </div>

                </div>
              </motion.div>


              <motion.div
                variants={fadeUp}
                className="group relative p-9 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">

                  <div className="mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-green-100 opacity-0 group-hover:opacity-50 blur-xl transition" />

                      <Leaf className="w-7 h-7 relative z-10 text-green-600" />
                    </div>
                  </div>

                  <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
                    SYSTEM 02
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Agribusiness & Environmental Stewardship
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Organic farming, land reclamation, and regenerative systems that convert degraded land into productive ecosystems.
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-sm text-gray-900 font-medium">
                      Outcome: Ecosystem restorers & agripreneurs
                    </p>
                  </div>

                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative p-9 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">

                  <div className="mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-50 blur-xl transition" />

                      <Briefcase className="w-7 h-7 relative z-10 text-blue-600" />
                    </div>
                  </div>

                  <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
                    SYSTEM 03
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Business & Entrepreneurship
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Enterprise development, logistics, financial literacy, and data-driven decision systems for job creation.
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-sm text-gray-900 font-medium">
                      Outcome: Job creators & economic builders
                    </p>
                  </div>

                </div>
              </motion.div>


              <motion.div
                variants={fadeUp}
                className="group relative p-9 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 to-white opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">

                  <div className="mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-50 blur-xl transition" />

                      <GraduationCap className="w-7 h-7 relative z-10 text-purple-600" />
                    </div>
                  </div>

                  <p className="text-xs tracking-[0.3em] text-gray-400 mb-3">
                    SYSTEM 04
                  </p>

                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                    Leadership & Public Service
                  </h3>

                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Building character and integrity to resist corruption and lead community transformation.
                  </p>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="text-sm text-gray-900 font-medium">
                      Outcome: Ethical leaders & institutional reformers
                    </p>
                  </div>

                </div>
              </motion.div>

            </motion.div>

          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden bg-[#f7f3ea] py-24 md:py-32"
        >

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-180px] right-[-120px] w-[420px] h-[420px] bg-secondary/10 blur-[110px] rounded-full" />
            <div className="absolute bottom-[-200px] left-[-120px] w-[400px] h-[400px] bg-primary/10 blur-[110px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7"
              >

                <p className="text-secondary uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-5">
                  How We Work
                </p>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-[1.05]">
                  The Shoova
                  <span className="block text-secondary">
                    Restoration Method
                  </span>
                </h2>

              </motion.div>


              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-5"
              >

                <p className="text-primary/70 text-base md:text-lg leading-relaxed">
                  A common operating logic has been tested across business,
                  engineering, living systems, communities and public institutions.
                  Shoova applies that logic to the work of restoration.
                </p>

              </motion.div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 rounded-2xl overflow-hidden shadow-sm">


              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group bg-white p-7 md:p-10 hover:bg-primary transition-all duration-500"
              >

                <div className="flex items-start justify-between mb-8">

                  <span className="text-sm font-bold text-secondary tracking-[0.2em]">
                    01
                  </span>

<ArrowDownRight
  className="w-7 h-7 text-primary/20 group-hover:text-white/20 transition"
/>

                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-white mb-4 transition">
                  Diagnose
                </h3>

                <p className="text-primary/65 group-hover:text-white/70 leading-relaxed transition">
                  Understand the real system before prescribing: evidence,
                  people, history, incentives, formal and informal institutions,
                  assets, risks and previous interventions.
                </p>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group bg-[#eef2ef] p-7 md:p-10 hover:bg-secondary transition-all duration-500"
              >

                <div className="flex items-start justify-between mb-8">

                  <span className="text-sm font-bold text-secondary group-hover:text-white tracking-[0.2em] transition">
                    02
                  </span>

                  <ArrowUpRight
                    className="w-7 h-7 text-primary/20 group-hover:text-white/20 transition"
                  />

                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-white mb-4 transition">
                  Heal
                </h3>

                <p className="text-primary/65 group-hover:text-white/90 leading-relaxed transition">
                  Restore function, capability, safety, dignity, ecological
                  capacity, value, trust or institutional performance without
                  creating avoidable downstream harm.
                </p>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group bg-[#eef2ef] p-7 md:p-10 hover:bg-secondary transition-all duration-500"
              >

                <div className="flex items-start justify-between mb-8">

                  <span className="text-sm font-bold text-secondary group-hover:text-white tracking-[0.2em] transition">
                    03
                  </span>

                  <ArrowDownLeft
                    className="w-7 h-7 text-primary/20 group-hover:text-white/20 transition"
                  />

                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-white mb-4 transition">
                  Mobilize
                </h3>

                <p className="text-primary/65 group-hover:text-white/90 leading-relaxed transition">
                  Build the human, technical, financial and institutional
                  capability required to sustain, adapt and extend the
                  improvement.
                </p>

              </motion.div>


              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="group bg-white p-7 md:p-10 hover:bg-primary transition-all duration-500"
              >

                <div className="flex items-start justify-between mb-8">

                  <span className="text-sm font-bold text-secondary tracking-[0.2em]">
                    04
                  </span>

                  <ArrowUpRight
                    className="w-7 h-7 text-primary/20 group-hover:text-white/20 transition"
                  />

                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-white mb-4 transition">
                  Return & Learn
                </h3>

                <p className="text-primary/65 group-hover:text-white/70 leading-relaxed transition">
                  Follow up where appropriate. Measure establishment rather
                  than ceremony. Learn what endured, what failed, what adapted
                  and what the next steward needs.
                </p>

              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-16 md:mt-20"
            >

              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-4">

                  <p className="text-secondary uppercase tracking-[0.25em] text-xs font-bold mb-4">
                    The Discipline Behind the Method
                  </p>

                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight">
                    Methodological
                    <span className="block text-secondary">
                      Disciplines
                    </span>
                  </h3>

                  <p className="mt-5 text-primary/60 leading-relaxed">
                    Restoration requires more than good intentions. It requires
                    understanding what has already happened, who holds influence,
                    and what must remain in place after an intervention ends.
                  </p>

                </div>
                <div className="lg:col-span-8">

                  <div className="divide-y divide-primary/10">


                    <div className="py-5 first:pt-0 flex gap-5">

                      <span className="text-secondary font-bold text-sm pt-1">
                        01
                      </span>

                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          Development Archaeology
                        </h4>

                        <p className="text-primary/60 mt-1 leading-relaxed">
                          Investigate what has already been tried and what remains
                          before building something new.
                        </p>
                      </div>

                    </div>

                    <div className="py-5 flex gap-5">

                      <span className="text-secondary font-bold text-sm pt-1">
                        02
                      </span>

                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          Formal + Informal System Mapping
                        </h4>

                        <p className="text-primary/60 mt-1 leading-relaxed">
                          Understand official authority and the networks, norms
                          and trusted actors people actually use.
                        </p>
                      </div>

                    </div>
                    <div className="py-5 flex gap-5">

                      <span className="text-secondary font-bold text-sm pt-1">
                        03
                      </span>

                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          Transition Architecture
                        </h4>

                        <p className="text-primary/60 mt-1 leading-relaxed">
                          Design the bridge so people can survive and participate
                          in the journey to a better system.
                        </p>
                      </div>

                    </div>

                    <div className="py-5 flex gap-5">

                      <span className="text-secondary font-bold text-sm pt-1">
                        04
                      </span>

                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          Professional Restraint
                        </h4>

                        <p className="text-primary/60 mt-1 leading-relaxed">
                          Know when to intervene, when to wait, when to refer and
                          when another institution is better positioned.
                        </p>
                      </div>

                    </div>

                    <div className="py-5 last:pb-0 flex gap-5">

                      <span className="text-secondary font-bold text-sm pt-1">
                        05
                      </span>

                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          Handover & Succession
                        </h4>

                        <p className="text-primary/60 mt-1 leading-relaxed">
                          Preserve the reasoning, records, capability and
                          responsibility needed by the next steward.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 pt-10 border-t border-primary/10"
            >

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <p className="text-primary/70 text-sm md:text-base max-w-2xl leading-relaxed">
                  Restoration is not a single intervention. It is a process of
                  understanding, action, recovery, learning and responsible
                  handover.
                </p>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors whitespace-nowrap"
                >
                  Learn about Shoova
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </motion.div>

          </div>
        </motion.section>

        <section className="relative bg-white pt-24 pb-10">
          <div className="text-center mb-12 md:mb-16 px-6">

            <p className="text-sm uppercase tracking-[0.25em] text-secondary/80 mb-4">
              Our Process
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-textDark mb-4 leading-tight">
              Turning destruction into restoration
            </h2>

            <div className="w-16 h-[2px] bg-secondary mx-auto mb-32"></div>

          </div>
          <div className="relative -mt-16 md:-mt-20 mb-20 md:mb-28 px-6 md:px-10 z-20">

            <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl">

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="bg-secondary text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

                  <p className="text-md uppercase tracking-widest text-white/60 mb-3">
                    Step 01
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Reclaim
                  </h3>

                  <p className="text-white/80 text-md leading-relaxed">
                    We identify lands devastated by Irresponsible mining and engage local
                    communities to begin environmental recovery.
                  </p>

                </div>
                <div className="bg-[#D4AF37] text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

                  <p className="text-md uppercase tracking-widest text-white/70 mb-3">
                    Step 02
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Train
                  </h3>

                  <p className="text-white/90 text-md leading-relaxed">
                    We equip youth with engineering, environmental, and vocational
                    skills that create real alternatives to Irresponsible mining (galamsey).
                  </p>

                </div>
                <div className="bg-[#1B5E20] text-white px-8 py-28 flex flex-col justify-center hover:-translate-y-1 transition">

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

        <section className="py-16 bg-[#F9FAFB] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.08),transparent_60%)]"></div>

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm uppercase font-bold tracking-[0.3em] text-[#D4AF37] mb-4">
              Campus Development
            </p>
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              The Shoova Restoration Campus is Under Development
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">
              Our 8-acre campus in Ghana is currently in its planning phase.
              This space will soon host academic training, technical production, and a
              residential community designed to restore both land and livelihoods.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-gray-800 font-semibold mb-10"
            >
              🚧 Coming Soon
            </motion.div>
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
        <section id="meet_the_team" className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                  of technical leaders in Ghana.
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
                  to="/about#meet_our_leadership"
                  className="inline-block mt-8 px-7 py-3 border border-white/40 rounded-full font-semibold hover:bg-white hover:text-primary transition"
                >
                  Meet the Full Team
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="group relative transform translate-y-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/williey.png"
                      alt="William Agyekum"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">
                          <a
                            href="https://www.linkedin.com/in/william-agyekum-00681b2a1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaLinkedin className="w-4 h-4 text-white" />
                          </a>

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">William Agyekum</h3>
                    <p className="text-sm text-teal-100 mt-1">Co-Founder &amp; President</p>
                    <p className="text-xs text-white/70 mt-1">USA</p>
                  </div>
                </div>


                <div className="group relative">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/sal.png"
                      alt="Salome Agyekum"
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">


                          <a
                            href="https://www.linkedin.com/in/salome-agyekum-741a79233?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaLinkedin className="w-4 h-4 text-white" />
                          </a>


                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Salome Agyekum, CA</h3>
                    <p className="text-sm text-teal-100 mt-1">Co-Founder &amp; Treasurer</p>
                    <p className="text-xs text-white/70 mt-1">USA</p>
                  </div>
                </div>
                <div className="group relative transform translate-y-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/pastor.jpg"
                      alt="Kwame Opon-Yeboah"
                      className="w-full h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">

                          <a
                            href="https://youtube.com/yourchannel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaLinkedin className="w-4 h-4 text-white" />
                          </a>


                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Kwame Opon-Yeboah</h3>
                    <p className="text-sm text-teal-100 mt-1">Executive Director &amp; Head of Ghana Operations</p>
                    <p className="text-xs text-white/70 mt-1">Ghana</p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src="/img/juliuss.jpg"
                      alt="Julius Botchway "
                      className="w-full h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-0 bottom-0 group/social">
                      <div className="bg-secondary w-12 h-12 group-hover:h-48 transition-all duration-500 overflow-hidden flex flex-col items-center">
                        <div className="w-full h-12 flex items-center justify-center border-b border-white/20">
                          <FaShareAlt className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition duration-300 delay-200">
                          <a
                            href="https://www.linkedin.com/in/julius-botchway-mba-a6b739207/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center hover:bg-black/20"
                          >
                            <FaLinkedin className="w-4 h-4 text-white" />
                          </a>


                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-heading font-bold">Julius Botchway</h3>
                    <p className="text-sm text-teal-100 mt-1">Director of Ghana Operations</p>
                    <p className="text-xs text-white/70 mt-1">Ghana</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

