import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#123a5a] to-[#0b2a45] text-white pt-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-20 items-start">

          {/* ================= ABOUT ================= */}
          <div className="max-w-xs">

            <div className="flex items-center gap-3 mb-5">
              <img
                src="/img/shoova_logo.png"
                alt="Shoova Initiative"
                className="h-12"
              />
              <h3 className="text-lg font-semibold tracking-tight">
                Shoova Initiative
              </h3>
            </div>

            <p className="text-white/80 text-md leading-relaxed mb-5">
              Building a restoration movement in Ghana’s Eastern Region—
              restoring land, equipping youth, and rebuilding communities.
            </p>

            <p className="text-white/50 text-sm italic mb-6">
              From scars to strength.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-white/10 p-2 rounded-md hover:bg-secondary transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

          </div>


          {/* ================= CONTACT ================= */}
          <div className="max-w-xs">

            <h4 className="text-md font-semibold uppercase tracking-[0.2em] text-white mb-5">
              Offices & Contact
            </h4>

            <div className="space-y-5 text-white/80 text-md">

              <div>
                <p className="font-semibold text-white mb-1">United States Office</p>
                <p className="text-white/70">5775 Wayzata Boulevard, Suite 700 </p>
                <p className="text-white/70">PMB 2004 </p>
                <p className="text-white/70">St. Louis Park, MN 55416, USA</p>
                <p>+1(612)422-8230</p>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">Ghana Office</p>
                <p className="text-white/70">GM-113-3441 Pistachio ST. near ICGC Shekina Temple</p>
                <p className="text-white/70">Pantang Village Junction, Greater Accra Region, Ghana.</p>
                <p>+233 24 726 4516</p>
              </div>
              <div className=" text-white/70">
                <p>info@shoovainitiative.org</p>
              </div>

            </div>

          </div>


          {/* ================= TRUST ================= */}
          <div className="max-w-xs">

            <h4 className="text-md font-semibold uppercase tracking-[0.2em] text-white mb-5">
              Trust & Transparency
            </h4>

            <p className="text-white/80 text-md leading-relaxed mb-6">
              Your support funds training, land restoration, and the Shoova
              Restoration Campus—creating sustainable pathways beyond illegal mining.
            </p>

            {/* LEGAL BLOCK */}
            <div className="border-t border-white/10 pt-4">

              <p className="text-white text-md font-medium">
                Shoova Initiative is a 501(c)(3) nonprofit public charity.
              </p>

              <p className="text-white/50 text-md mt-1 leading-relaxed">
                Your donations are tax-deductible as permitted by law.
              </p>

            </div>

          </div>

        </div>
      </div>


      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-black/30 py-5 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-white/50 text-sm">

          <p>
            © {new Date().getFullYear()} Shoova Initiative. All rights reserved.
          </p>

          <p className="italic text-white/60">
            Healing the land, one student at a time.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;