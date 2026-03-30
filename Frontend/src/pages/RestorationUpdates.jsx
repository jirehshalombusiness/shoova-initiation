import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowRight } from "lucide-react";

export const RestorationUpdates = () => {

    // ---- State ----
    const [birthday, setBirthday] = useState(null);
    const [subscribed, setSubscribed] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdayMonth: "",
        birthdayDay: "",
        birthdayYear: "",
        birthdayReminder: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubscribe = async (e) => {

        e.preventDefault();

        try {

            const res = await fetch("https://shoova-initiation.onrender.com/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    birthday: birthday ? birthday.toISOString() : null
                })
            });

            const data = await res.json();

            console.log("SERVER RESPONSE:", data);

            if (data.success) {
                setSubscribed(true);

                // clear form
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    birthdayMonth: "",
                    birthdayDay: "",
                    birthdayYear: "",
                    birthdayReminder: false
                });

                setBirthday(null);

                window.scrollTo({ top: 0, behavior: "smooth" });
            }

        } catch (error) {

            console.error("Subscription failed:", error);

        }

    };

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
        <div className="w-full">
            {subscribed && (
                <div className="fixed top-20 left-0 w-full bg-primary text-white py-4 px-6 flex justify-between items-center z-40 shadow-md">

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
            )}
            {/* HERO SECTION */}
            <section className="relative h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/img/Header.png"
                        alt="Shoova Restoration Initiative"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <p className="text-sm uppercase tracking-widest text-secondary/80 mb-4">
                        Restoration Updates
                    </p>
                    <h1 className="text-5xl md:text-5xl font-heading font-bold text-white max-w-4xl">
                        Real Stories of Land, Youth, and Community Transformation
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mt-6 max-w-2xl">
                        Follow the progress of the Shoova Restoration Campus, see the impact on land,
                        water, and youth, and join us in building a future where communities thrive.
                    </p>
                </div>
            </section>

            {/* Restoration Report Section */}
            <motion.section
                id="restoration_report"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 bg-white border-t border-gray-100"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* IMAGE */}
                        <motion.div variants={fadeLeft} className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <img
                                    src="/img/Header.png"
                                    alt="Receive real-time updates on land restoration."
                                    className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
                                />
                            </motion.div>
                            <motion.div
                                variants={fadeUp}
                                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg max-w-xs"
                            >
                                <p className="text-sm text-gray-700 font-medium">
                                    Receive real-time updates on land restoration, student progress, and the impact your support is making.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* FORM */}
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

                            {/* Name Fields */}
                            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold tracking-wide mb-2">
                                        FIRST NAME
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold tracking-wide mb-2">
                                        LAST NAME
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                                    />
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div variants={fadeUp}>
                                <label className="block text-xs font-semibold tracking-wide mb-2">
                                    EMAIL
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition"
                                />
                            </motion.div>

                            {/* Birthday */}
                            <motion.div variants={fadeUp}>
                                <label className="block text-xs font-semibold tracking-wide mb-2">
                                    BIRTHDAY (OPTIONAL)
                                </label>
                                <DatePicker
                                    selected={birthday}
                                    onChange={(date) => setBirthday(date)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholderText="Select your birthday"
                                />
                            </motion.div>

                            {/* Checkbox */}
                            <motion.div variants={fadeUp} className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.birthdayReminder}
                                    onChange={(e) =>
                                        setFormData({ ...formData, birthdayReminder: e.target.checked })
                                    }
                                    className="mt-1"
                                />
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Set a reminder to pledge my birthday and help restore land and empower communities.
                                </p>
                            </motion.div>

                            {/* BUTTON */}
                            <motion.button
                                variants={fadeUp}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondaryHover text-white font-semibold py-4 rounded-md transition shadow-md"
                            >
                                Keep Me Informed
                            </motion.button>

                            {/* Privacy */}
                            <motion.p variants={fadeUp} className="text-xs text-gray-500 leading-relaxed">
                                By clicking “Subscribe”, you agree to receive updates from the Shoova Restoration Initiative.
                            </motion.p>
                        </motion.form>
                    </div>
                </div>
            </motion.section>



            {/* Share the Story */}
            <section id="share_the_story" className="py-24 bg-background border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <img
                            src="/img/share.jpg"
                            alt="Illegal mining destruction in Ghana"
                            className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
                        />

                    </div>

                    {/* Content */}
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

                            {/* 📄 FACT SHEET */}
                            <button
                                onClick={() => {
                                    // track download
                                    fetch("http://localhost:5000/engagement/track-download", {
                                        method: "POST"
                                    });

                                    // force open in new tab
                                    window.open("/docs/galamsey-to-growth.pdf", "_blank");
                                }}
                                className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondaryHover text-white font-semibold rounded-full transition shadow-lg"
                            >
                                Download Fact Sheet
                            </button>

                            {/* 🔁 SHARE */}
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
                                        // optional fallback
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
            </section>

        </div>
    );
};