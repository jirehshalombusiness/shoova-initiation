import React, { useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { CheckCircle } from 'lucide-react';
import { Droplets } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Heart } from 'lucide-react';
import { HeartHandshake } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Link } from '../components/Link';
import { Menu } from 'lucide-react';
import { Text } from '../components/Text';
import { Twitter } from 'lucide-react';
import { Youtube } from 'lucide-react';
import CountUp from "../components/CountUp"
export const InitiativesPage = ({ className, children, variant, contentKey, ...props }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const scrollY = window.scrollY;
      videoRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="font-body antialiased">
      <>
        <section
          id="our_programs"
          className="relative pt-40 pb-24 text-white overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="/img/lands.jpg"
              alt="Shoova restoration work"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-primaryDark/90"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="text-secondary font-semibold tracking-[0.3em] uppercase text-sm mb-6">
              Our Work
            </p>
            <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight mb-6">
              The Restoration Model
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              We are not running programs. We are building a system that transforms
              exploitation into restoration, equipping a generation to heal the land,
              rebuild communities, and lead Ghana into a sustainable future.
            </p>
            <p className="mt-8 text-secondary font-semibold text-lg">
              From exploitation to restoration.
            </p>

          </div>
        </section>
        <section id="restoration_model" className="py-24 bg-white overflow-x-hidden">

          <div className="max-w-7xl mx-auto px-6 space-y-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div className="order-2 lg:order-1">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-red-600 font-bold text-xl">01</span>
                </div>

                <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                  Reclaim the Land
                </h2>

                <p className="text-lg text-text mb-6 leading-relaxed">
                  We begin where the damage is deepest. Shoova identifies lands devastated
                  by Irresponsible mining and partners directly with local communities to begin
                  the restoration process.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Community engagement & land assessment
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Soil testing & environmental analysis
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Mapping degraded mining zones
                  </li>
                </ul>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-4 bg-red-100 rounded-3xl transform rotate-3 -z-10"></div>
                <img
                  src="/img/galamsey.jpg"
                  alt="Galamsey destruction"
                  className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/20 rounded-3xl transform -rotate-3 -z-10"></div>
                <img
                  src="/img/team.jpg"
                  alt="Shoova training"
                  className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
                />
              </div>

              <div>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-secondary font-bold text-xl">02</span>
                </div>

                <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                  Train the Next Generation
                </h2>

                <p className="text-lg text-text mb-6 leading-relaxed">
                  We recruit youth trapped in the cycle of Irresponsible mining and equip them
                  with world-class technical, environmental, and leadership skills at our
                  8-acre Restoration Campus.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Engineering & fabrication training
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Renewable energy & sustainability skills
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Ethical leadership & business training
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div className="order-2 lg:order-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-green-600 font-bold text-xl">03</span>
                </div>

                <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                  Restore Communities & Ecosystems
                </h2>

                <p className="text-lg text-text mb-6 leading-relaxed">
                  Our graduates return to their communities not as miners—but as builders,
                  innovators, and leaders. They restore degraded land, improve water systems,
                  and shift entire local economies toward sustainability.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Land reclamation & soil restoration
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Sustainable infrastructure development
                  </li>
                  <li className="flex items-center gap-3 text-text">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Local economic transformation
                  </li>
                </ul>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl transform rotate-3 -z-10"></div>
                <img
                  src="/img/community.jpg"
                  alt="Land restoration"
                  className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
                />
              </div>
            </div>

          </div>
        </section>


        <section id="impact" className="py-28 bg-white">

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center mb-20">

              <p className="text-md uppercase tracking-[0.25em] text-secondary/80 font-semibold mb-4">
                Projected Impact
              </p>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark mb-6">
                The Impact We Are Building
              </h2>

              <p className="text-text text-lg max-w-2xl mx-auto">Galamsey occurs in more than 120 of Ghana’s 261 districts, impacting millions of people and thousands of acres of land.
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
                  <CountUp end={1500} suffix="+" />
                </h3>

                <p className="text-lg font-semibold text-textDark mb-2">
                  Acres Targeted for Restoration
                </p>

                <p className="text-text text-sm leading-relaxed">
                  By 2040, we aim to restore land by Irresponsible mining into thriving ecosystems that support communities and agriculture.
                  Long-term ecological recovery is proected through 2040.
                </p>

              </div>
              <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-xl transition">

                <p className="text-xs uppercase tracking-widest text-secondary mb-4">
                  Water
                </p>

                <h3 className="text-5xl md:text-6xl font-bold text-textDark mb-4">
                  <CountUp end={45} suffix="%" />
                </h3>

                <p className="text-lg font-semibold text-textDark mb-2">
                  Water Bodies Targeted for Restoration
                </p>

                <p className="text-text text-sm leading-relaxed">
                  By 2040, we aim to rehabilitate water bodies degraded by Irresponsible mining, restoring water quality, 
                  aquatic ecosystems, and and improving access to safe water for affected communities.
                </p>

              </div>
              <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-xl transition">

                <p className="text-xs uppercase tracking-widest text-primary mb-4">
                  Leaders
                </p>

                <h3 className="text-5xl md:text-6xl font-bold text-textDark mb-4">
                  <CountUp end={8500} suffix="+" />
                </h3>

                <p className="text-lg font-semibold text-textDark mb-2">
                  Youth Targeted for Empowerment
                </p>

                <p className="text-text text-sm leading-relaxed">
                  By 2040, we aim to transition young people from Irresponsible mining into skilled, dignified, and sustainable livelihoods through our Restoration Campus training programs and community initiatives.
                </p>

              </div>

            </div>
            <p className="text-center text-sm text-gray-500 mt-10 max-w-xl mx-auto">
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

        </section>
        <section className="py-24 bg-gray-50">

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3 -z-10"></div>
              <img
                src="/img/train.jpg"
                alt="Shoova Restoration Campus"
                className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
              />
            </div>
            <div>

              <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4">
                The Restoration Campus
              </p>

              <h2 className="text-4xl font-heading font-bold text-textDark mb-6">
                Building the Engine of Restoration
              </h2>

              <p className="text-lg text-text mb-6 leading-relaxed">
                At the heart of the Shoova Initiative is our 8-acre Restoration Campus
                in Ghana’s Eastern Region. This is not just a school—it is a living system
                where technical training, environmental repair, and leadership development
                come together.
              </p>

              <p className="text-lg text-text mb-6 leading-relaxed">
                Here, youth transition from extractive labor into skilled professionals
                equipped to rebuild their communities. Every workshop, lab, and training
                program is designed to produce not just workers—but architects of restoration.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-text">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Engineering workshops & fabrication labs
                </li>
                <li className="flex items-center gap-3 text-text">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Renewable energy & sustainability labs
                </li>
                <li className="flex items-center gap-3 text-text">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Student housing & community infrastructure
                </li>
              </ul>
              <button className="px-8 py-4 bg-secondary text-white rounded-full font-semibold hover:bg-secondaryHover transition shadow-lg">
                Build the Campus With Us
              </button>

            </div>

          </div>

        </section>
      </>
    </div>
  );
};

