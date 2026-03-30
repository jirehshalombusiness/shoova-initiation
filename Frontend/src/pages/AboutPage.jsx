import React, { useState, useEffect, useRef } from "react";
import { Book, Droplet, Globe, HeartHandshake, ChevronDown } from "lucide-react";
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { Text } from '../components/Text';
import { motion } from "framer-motion";


export const AboutPage = ({ className, children, variant, contentKey, ...props }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const faqs = [
    {
      question: "What is the Shoova Restoration Campus?",
      answer:
        "The Shoova Restoration Campus is an upcoming 8-acre vocational training institute in Ghana’s Eastern Region designed to equip youth with world-class engineering, environmental restoration, and leadership skills that help transition communities away from illegal mining."
    },
    {
      question: "Why focus on youth involved in galamsey?",
      answer:
        "Many young people turn to illegal mining due to limited economic opportunities. Shoova believes these youth are not the problem—they are the untapped solution. Through training and mentorship we help them become the architects of Ghana’s environmental restoration."
    },
    {
      question: "How can I support the Shoova Initiative?",
      answer:
        "You can support Shoova by sponsoring student training, funding land restoration programs, partnering as an institution, or helping spread the mission of restoring Ghana’s land and empowering the next generation of technical leaders."
    },
    {
      question: "Is Shoova Initiative a registered nonprofit?",
      answer:
        "Shoova Initiative is progressing through nonprofit registration processes while establishing governance and operational structures in both the United States and Ghana."
    }
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leadership = [
    {
      name: "William Agyekum",
      role: "President & Executive Director",
      detail: "Project Management — USA",
      image: "/img/portriat.jpg",
    },
    {
      name: "Salome Agyekum, CA",
      role: "Treasurer",
      detail: "Data Analytics & Finance — USA",
      image: "/img/salome.jpg",
    },
    {
      name: "Kwame Opon-Yeboah",
      role: "Director & Head of Ghana Operations",
      detail: "Legal & Community Relations — Ghana",
      image: "/img/opon.jpg",
    },
    {
      name: "Julius Botchchway",
      role: "Director of Ghana Operations",
      detail: "IT Infrastructure — Ghana",
      image: "/img/juliuss.jpg",
    },
    {
      name: "Isaac Waddy Adjei-Ampofo",
      role: "Director of Ghana Operations",
      detail: "Education — Ghana",
      image: "/img/isaac.jpg",
    },
    {
      name: "Keneh Wemba",
      role: "Secretary",
      detail: "Administration — USA",
      image: "/img/keneh.jpg",
    },
    {
      name: "Sandra Agyekum",
      role: "Director",
      detail: "Community Relations — USA",
      image: "/img/sandra.jpg",
    }
  ];
  const [years, setYears] = useState(0);
  const [communities, setCommunities] = useState(0);

  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCount(true);
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    let y = 0;
    let c = 0;

    const interval = setInterval(() => {

      if (y < 15) {
        y += 1;
        setYears(y);
      }

      if (c < 30) {
        c += 1;
        setCommunities(c);
      }

      if (y >= 15 && c >= 30) clearInterval(interval);

    }, 70);

    return () => clearInterval(interval);

  }, [startCount]);
  return (
    <div className="font-body antialiased">
      <>
        {/* About Hero */}
        <section
          className="relative h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-center"
          style={{ backgroundImage: "url('/img/dryland.jpg')" }}
        >

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 max-w-4xl px-6 text-white">

            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              From Scars to Strength
            </h1>

            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Illegal mining has scarred the land of Ghana’s Eastern Region.
              Shoova Initiative is equipping young people with the tools
              to restore the soil, rebuild communities, and reclaim the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                to="/donate"
                className="bg-secondary hover:bg-secondaryHover text-white px-8 py-4 rounded-full font-semibold"
              >
                Join the Restoration
              </Link>

              <Link
                to="/programs"
                className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition"
              >
                See Our Solution
              </Link>

            </div>

          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
            ↓
          </div>

        </section>

        <motion.section
          className="py-28 bg-accent"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT STORY */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-heading font-bold mb-6"
              >
                The Shoova Solution
              </motion.h2>

              <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-6 leading-relaxed">
                Through our 8-acre Restoration Campus, we equip youth with the
                technical skills needed to heal damaged land and build sustainable
                livelihoods.
              </motion.p>

              <ul className="space-y-3 text-lg font-medium text-gray-800">
                <li>Land reclamation</li>
                <li>Engineering and fabrication</li>
                <li>Solar and sustainable technology</li>
                <li>Ethical leadership training</li>
              </ul>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondaryHover text-white font-semibold rounded-full transition shadow-lg"
                >
                  Join the Restoration
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition"
                >
                  Partner With Us
                </Link>

              </div>
            </div>


            {/* RIGHT VISUAL STORY */}
            <div className="relative w-full max-w-lg mx-auto h-[420px]">

              {/* Crisis Image */}
              <div className="absolute top-0 left-0 w-[85%] z-10">
                <img
                  src="/img/galamsey.jpg"
                  alt="Illegal mining destruction"
                  className="rounded-xl shadow-2xl rotate-[-3deg] object-cover w-full h-[260px]"
                />

                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider font-semibold">
                  CRISIS
                </span>
              </div>

              {/* Restoration Image */}
              <div className="absolute bottom-0 right-0 w-[75%] z-20">
                <img
                  src="/img/rstores.jpg"
                  alt="Vocational training and restoration"
                  className="rounded-xl shadow-2xl rotate-[2deg] object-cover w-full h-[240px]"
                />

                <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider font-semibold">
                  RESTORATION
                </span>
              </div>

            </div>

          </div>
        </motion.section>

        <section id="mission_vision" className="pt-40 pb-24 bg-white">

          <div className="max-w-6xl mx-auto px-6 text-center">

            {/* Mission */}
            <div className="mb-20">

              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-textDark">
                Our Mission
              </h2>

              <p className="text-xl md:text-2xl italic text-primary max-w-4xl mx-auto leading-relaxed">
                “To ignite a restoration movement in Ghana’s Eastern Region by empowering
                the next generation of technical leaders with the world-class skills,
                ethical grounding, and environmental stewardship necessary to heal our
                lands and reclaim our future.”
              </p>

            </div>


            {/* Vision */}

            <div>

              <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-textDark">
                Our Vision
              </h2>

              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Restoration is not a dream—it is a trade. We envision a Ghana where
                communities once scarred by illegal mining become centers of
                environmental renewal, technical excellence, and dignified opportunity
                for the next generation.
              </p>

            </div>

          </div>

        </section>
        {/* How It Started */}
        <section
          id="how_it_started"
          ref={statsRef}
          className="py-24 bg-background"
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Image */}
              <div className="relative">

                <div className="absolute bg-primary/10 rounded-3xl transform -rotate-2 -z-10 w-full h-full"></div>

                <img
                  alt="Shoova restoration work"
                  src="/img/gala.jpg"
                  className="rounded-2xl shadow-xl w-full"
                />

              </div>


              {/* Story */}
              <div>

                <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                  How the Restoration Movement Began
                </h2>

                <p className="text-lg text-text mb-6 leading-relaxed">

                  The Shoova Initiative was born from a realization shared by its
                  founders: the devastation caused by illegal mining in Ghana’s
                  Eastern Region is not only an environmental crisis — it is a
                  human one. Rivers have been poisoned, forests destroyed, and
                  thousands of young people pushed into dangerous extractive labor
                  with little opportunity for a different future.


                </p>
                <p className="text-lg text-text leading-relaxed">

                  Shoova Initiative was created to apply the same analytical
                  rigor used in global strategy and finance to a different mission:
                  restoring the earth and rebuilding opportunity. Through the
                  Shoova Restoration Campus, we are equipping youth with the
                  technical skills, ethical leadership, and environmental
                  stewardship needed to heal the land and lead their communities
                  toward a sustainable future.


                </p>


                {/* Animated Stats */}
                <div className="flex gap-10 mt-10">

                  <div>
                    <div className="text-5xl font-heading font-bold text-primary mb-1">
                      {years}+
                    </div>
                    <p className="text-sm text-gray-500">
                      Years of vision and planning
                    </p>
                  </div>

                  <div>
                    <div className="text-5xl font-heading font-bold text-primary mb-1">
                      {communities}+
                    </div>
                    <p className="text-sm text-gray-500">
                      Communities impacted by galamsey
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Crisis & Solution */}
        <section id="crisis_solution" className="py-28 bg-white">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

            {/* PROBLEM */}
            <div>

              <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                The Problem
              </p>

              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                The Scars of Galamsey
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Ghana is facing an ecological and humanitarian crisis. Illegal
                small-scale mining — known locally as galamsey — has poisoned
                rivers, devastated forests, and scarred once fertile land across
                the Eastern Region.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Thousands of young people are trapped in dangerous, low-paying
                extractive labor with few alternatives. The land is crying out,
                and a generation is losing hope. At Shoova Initiative, we believe
                the youth forced into these mines are not the problem — they are
                the untapped solution waiting for the right opportunity.
              </p>

              {/* Image */}
              <div className="mt-10">
                <img
                  src="/img/galamsey.jpg"
                  alt="Galamsey destruction"
                  className="rounded-xl shadow-lg w-full h-[320px] object-cover"
                />
              </div>

            </div>


            {/* SOLUTION */}
            <div>

              <p className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">
                The Solution
              </p>

              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                The World-Class Vocational Institute
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                The Shoova Initiative is building an 8-acre Restoration Campus
                dedicated to hands-on, high-tech training that dignifies labor
                while healing the environment. Instead of extracting wealth
                from the land, we train the next generation to restore it.
              </p>

              {/* Tracks */}
              <div className="space-y-8">

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    School of Engineering & Fabrication
                  </h3>
                  <p className="text-gray-600">
                    Mastering the trades that build nations: precision welding,
                    heavy machinery repair, and advanced metal fabrication.
                    We transform raw talent into industrial expertise.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    School of Sustainable Futures
                  </h3>
                  <p className="text-gray-600">
                    Leading the green transition through solar energy installation,
                    land reclamation techniques, and sustainable agricultural
                    technology.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    School of Ethical Leadership
                  </h3>
                  <p className="text-gray-600">
                    Data-driven management, bookkeeping, and cooperative business
                    ethics. We are not only training workers — we are preparing
                    the next generation of employers and community leaders.
                  </p>
                </div>

              </div>

              {/* Image */}
              <div className="mt-10">
                <img
                  src="/img/solar.jpg"
                  alt="Vocational training"
                  className="rounded-xl shadow-lg w-full h-[320px] object-cover"
                />
              </div>

            </div>

          </div>

        </section>


        {/* Meet Our Leadership */}
        <section id="meet_our_leadership" className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                Meet Our Leadership
              </h2>

              <p className="text-xl text-text max-w-2xl mx-auto">
                The coalition of leaders guiding the Shoova Restoration Movement across Ghana and the United States.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

              {leadership.map((member, index) => (

                <div key={index} className="text-center group">

                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-primary transition">

                    <Image
                      variant="cover"
                      className="w-full h-full object-cover"
                      src={member.image}
                      alt={member.name}
                    />

                  </div>

                  <h3 className="text-xl font-bold text-textDark">
                    {member.name}
                  </h3>

                  <p className="text-primary font-medium">
                    {member.role}
                  </p>

                  <p className="text-sm text-gray-500">
                    {member.detail}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>
        {/* Frequently Asked Questions */}
        <section id="frequently_asked_questions" className="py-24 bg-white">

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <h2 className="text-3xl font-heading font-bold text-textDark text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">

              {faqs.map((faq, index) => (

                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >

                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50 transition"
                  >

                    <span className="font-bold text-lg text-textDark">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : "text-gray-400"
                        }`}
                    />

                  </button>

                  {/* Answer */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>
        {/* Join the Restoration */}
        <section className="py-24 bg-primary text-white text-center">

          <div className="max-w-3xl mx-auto px-6">

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Join the Restoration
            </h2>

            <p className="text-lg text-teal-100 mb-10 leading-relaxed">
              The future of Ghana’s land and communities depends on bold action.
              Join the Shoova Initiative in transforming scars of destruction into
              a movement of restoration, innovation, and opportunity.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">

              <Link
                to="/donate"
                className="bg-secondary hover:bg-secondaryHover text-white px-8 py-4 rounded-full font-semibold transition shadow-lg"
              >
                Sponsor a Future Leader
              </Link>

              <Link
                to="/contact"
                className="border border-white/40 px-8 py-4 rounded-full hover:bg-white hover:text-primary transition"
              >
                Partner With Us
              </Link>

            </div>

          </div>

        </section>
      </>
    </div>
  );
};

