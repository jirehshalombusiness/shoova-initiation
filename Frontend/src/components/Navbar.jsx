import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathwaysOpen, setPathwaysOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isPathwaysActive =
    location.pathname === "/our-story" ||
    location.pathname === "/why-it-matters" ||
    location.pathname === "/restoration-updates";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) => `
    relative text-[15.5px] font-semibold tracking-[0.06em]
    transition duration-300

    ${scrolled
      ? "text-gray-800 hover:text-secondary"
      : "text-white hover:text-secondary"
    }

    ${isActive ? "text-secondary after:w-full" : ""}

    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
    after:bg-secondary after:transition-all after:duration-300

    ${isActive ? "" : "after:w-0 hover:after:w-full"}
  `;

  return (
    <header>
      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/favicon.png" alt="logo" className="h-16" />
              <span className="font-bold tracking-widest text-secondary">
                SHOOVA INITIATIVE
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-10 relative">

              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>

              <NavLink to="/programs" className={navLinkClass}>
                Programs
              </NavLink>

              {/* 🔥 SHOOVA PATHWAYS */}
              <div
                className="relative group"
                onMouseEnter={() => setPathwaysOpen(true)}
                onMouseLeave={() => setPathwaysOpen(false)}
              >
                <div
                  className={`
                    relative flex items-center gap-1 cursor-pointer
                    text-[15.5px] font-semibold tracking-[0.06em]
                    transition duration-300

                    ${scrolled
                      ? "text-gray-800 hover:text-secondary"
                      : "text-white hover:text-secondary"
                    }

                    ${isPathwaysActive ? "text-secondary after:w-full" : ""}

                    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                    after:bg-secondary after:transition-all after:duration-300
                    ${isPathwaysActive ? "" : "after:w-0 hover:after:w-full"}
                  `}
                >
                  Shoova Pathways
                  <ChevronDown className="w-4 h-4 mt-[2px]" />
                </div>

                {/* DROPDOWN */}
                <div
                  className={`absolute left-0 top-full pt-4 transition-all duration-300 ${pathwaysOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 translate-y-2 invisible"
                    }`}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-3 w-56">

                    <Link
                      to="/story"
                      className="block px-5 py-3 text-gray-700 hover:text-secondary hover:bg-gray-50 transition"
                    >
                      Our Story
                    </Link>

                    <Link
                      to="/why-it-matters"
                      className="block px-5 py-3 text-gray-700 hover:text-secondary hover:bg-gray-50 transition"
                    >
                      Why It Matters
                    </Link>

                    <Link
                      to="/restoration-updates"
                      className="block px-5 py-3 text-gray-700 hover:text-secondary hover:bg-gray-50 transition"
                    >
                      Restoration Updates
                    </Link>

                  </div>
                </div>
              </div>

              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                to="/donate"
                className="px-5 py-2 rounded-full bg-secondary text-white hover:bg-[#B85D2F] transition"
              >
                Donate
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className={`md:hidden ${scrolled ? "text-gray-800" : "text-white"
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      {/* OVERLAY */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-[60] transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">

          {/* 🔥 TOP BAR (THIS FIXES YOUR CLOSE BUTTON ISSUE) */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100">
            <span className="font-bold tracking-widest text-secondary">
              SHOOVA INITIATIVE
            </span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-800 hover:text-secondary transition z-[70]"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* 🔥 CONTENT */}
          <div className="flex flex-col h-full px-6 py-8">

            {/* NAV LINKS */}
            <div className="space-y-6">

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-gray-900"
              >
                About
              </Link>

              <Link
                to="/programs"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-gray-900"
              >
                Programs
              </Link>

              {/* SHOOVA PATHWAYS */}
              <div className="border-t border-gray-200 pt-6">

                <button
                  onClick={() => setPathwaysOpen(!pathwaysOpen)}
                  className="flex items-center justify-between w-full text-lg font-semibold text-gray-900"
                >
                  Shoova Pathways
                  <ChevronDown
                    className={`transition duration-300 ${pathwaysOpen ? "rotate-180 text-secondary" : ""
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${pathwaysOpen ? "max-h-40 mt-4" : "max-h-0"
                    }`}
                >
                  <div className="flex flex-col space-y-4 pl-3 border-l border-gray-200">

                    <Link
                      to="/our-story"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-600 hover:text-secondary transition"
                    >
                      Our Story
                    </Link>

                    <Link
                      to="/why-it-matters"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-600 hover:text-secondary transition"
                    >
                      Why It Matters
                    </Link>

                    <Link
                      to="/restoration-updates"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-600 hover:text-secondary transition"
                    >
                      Restoration Updates
                    </Link>

                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-gray-900"
              >
                Contact
              </Link>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-8">
              <Link
                to="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-secondary text-white py-4 rounded-full font-semibold text-lg shadow-md hover:bg-[#B85D2F] transition"
              >
                Donate Now
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;