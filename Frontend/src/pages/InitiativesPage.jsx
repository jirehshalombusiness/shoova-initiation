import React ,{useRef,useEffect} from 'react';
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
  
        // Move video slower than scroll → parallax effect
        videoRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div className="font-body antialiased">
      <>
        {/* Our Programs */}
        <section
          id="our_programs"
          className="relative pt-40 pb-24 text-white overflow-hidden"
        >

          {/* 🔥 BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <img
              src="/img/lands.jpg"
              alt="Shoova restoration work"
              className="w-full h-full object-cover scale-105"
            />
          </div>

          {/* 🌑 DARK OVERLAY (DEPTH) */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* 🎨 GRADIENT OVERLAY (PREMIUM LOOK) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-primaryDark/90"></div>

          {/* ✨ CONTENT */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

            {/* SMALL LABEL */}
            <p className="text-secondary font-semibold tracking-[0.3em] uppercase text-sm mb-6">
              Our Work
            </p>

            {/* MAIN HEADLINE */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight mb-6">
              The Restoration Model
            </h1>

            {/* DESCRIPTION */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              We are not running programs. We are building a system that transforms
              exploitation into restoration, equipping a generation to heal the land,
              rebuild communities, and lead Ghana into a sustainable future.
            </p>

            {/* 🔥 TAGLINE */}
            <p className="mt-8 text-secondary font-semibold text-lg">
              From exploitation to restoration.
            </p>

          </div>
        </section>
       <section id="restoration_model" className="py-24 bg-white overflow-x-hidden">

  <div className="max-w-7xl mx-auto px-6 space-y-28">

    {/* ================= RECLAIM ================= */}
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
          by illegal mining and partners directly with local communities to begin
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


    {/* ================= TRAIN ================= */}
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
          We recruit youth trapped in the cycle of illegal mining and equip them
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


    {/* ================= RESTORE ================= */}
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
          <CountUp end={500} suffix="+"/>
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
          <CountUp end={65} suffix="%"/>
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
{/* ================= CAMPUS ================= */}
<section className="py-24 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

    {/* IMAGE */}
    <div className="relative">
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform -rotate-3 -z-10"></div>
      <img
        src="/img/train.jpg"
        alt="Shoova Restoration Campus"
        className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
      />
    </div>

    {/* CONTENT */}
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

      {/* CTA */}
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

