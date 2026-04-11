import React, { useState, useEffect, useRef } from "react";
import { Book, Droplet, Globe, HeartHandshake, ChevronDown } from "lucide-react";
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Button } from '../components/Button';
import { Droplets } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Heart } from 'lucide-react';
import { HeartPulse } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Link } from '../components/Link';
import { Menu } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Text } from '../components/Text';
import { Twitter } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { useLocation } from "react-router-dom";
import PayPalButton from "../components/PayPalButton";


export const DonatePage = ({ className, children, variant, contentKey, ...props }) => {
  const location = useLocation();
  const selectedTier = location.state?.amount;
  const [donationType, setDonationType] = useState("monthly");
  const [amount, setAmount] = useState(selectedTier || 500);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const finalAmount =
    customAmount !== "" ? Number(customAmount) : amount;

  const getImpactMessage = (value) => {
    if (value >= 5000) {
      return "Helps build critical infrastructure for the Shoova Restoration Campus.";
    }

    if (value >= 2500) {
      return "Helps equip restoration labs and technical training spaces.";
    }

    if (value >= 1000) {
      return "Supports a Restoration Fellow's advanced training.";
    }

    if (value >= 500) {
      return "Sponsors vocational training for a restoration leader.";
    }

    if (value >= 100) {
      return "Provides tools and equipment for restoration training.";
    }

    if (value >= 25) {
      return "Provides restoration seedlings and learning materials.";
    }

    return "Your support helps restore land and train future environmental leaders.";
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount("");

    setHighlight(true);
    setTimeout(() => setHighlight(false), 400);
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;

    setCustomAmount(value);

    if (value === "") {
      setAmount(500);
      return;
    }

    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setAmount(numericValue);
    }
    setHighlight(true);
    setTimeout(() => setHighlight(false), 400);

  };

  const handleDonate = async () => {


    if (!finalAmount || finalAmount < 5) {
      alert("Minimum donation is $5");
      return;
    }

    try {
      setLoading(true); // start loading
      const res = await fetch(
        "https://shoova-initiation-yjg3.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            donationType,
          }),
        }
      );

      const data = await res.json();

      // Redirect user to Stripe checkout
      window.location.href = data.url;

    } catch (error) {
      console.error("Stripe error:", error);
      alert("Payment failed. Please try again.");
      setLoading(false)
    }
  };
  const faqs = [
     {
      question: "Is Shoova Initiative a registered nonprofit?",
      answer:
        `Yes, Shoova Initiative Corporation is a 501(c)(3) public charity dedicated to restoring lands and lives in Ghana. We have established governance and operational structures in both the United States and Ghana.
       Public Charity Status: 170(b)(1)(A)(vi)`
    }
    ,
    {
      question: "Is my donation tax-deductible? ",
      answer:
        "Yes. The Shoova Initiative Corporation is a recognized 501(c)(3) public charity. Contributions are tax-deductible under Section 170 of the Internal Revenue Code."
    },
    {
      question: "What is your specific IRS classification?",
      answer:
        "We are classified as a Publicly Supported Organization under Section 170(b)(1)(A)(vi). This is a premium status that allows for the maximum tax benefits allowed by law for our donors."
    },
    {
      question: "What information do I need for my tax records?",
      answer: `To claim a deduction, you will need our official organization details:<br/>
• Organization Name: Shoova Initiative Corporation.<br/>
• EIN (Tax ID): 41-4001369.<br/>
• Registered Office: 5775 Wayzata Boulevard, Suite 700, St. Louis Park, MN 55416.`
    },
    {
      question: "Are there limits to how much I can deduct? ",
      answer:
        `As a public charity, individuals can generally deduct cash contributions up to 60% of their Adjusted Gross Income (AGI). We recommend consulting with a tax professional for your specific situation.`
    },
    {
      question: "Will I receive a receipt for my donation?  ",
      answer:
        `Absolutely. Our "Culture of Excellence" ensures that every donor receives an automated receipt for their records. We provide a formal acknowledgment letter that meets all IRS requirements.`
    },
    {
      question: "How is my donation used? ",
      answer:
        ` Our mission is the restoration of lands and lives in Ghana. Your funds directly support our 8-acre campus, including the School of Engineering & Fabrication, the Meditation Garden, and our technical training programs for scholars transitioning from informal mining.`
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="font-body antialiased">
      <>

        {/* Make A Difference Today */}
        <section
          id="make_a_difference_today"
          className="relative pt-40 pb-40 text-white"
          style={{
            backgroundImage: "url('/img/lands.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative max-w-5xl mx-auto px-4 text-left">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Join the Shoova Restoration Movement
            </h1>

            <p className="text-xl text-gray-200 max-w-xl">
              Your support helps build the Shoova Restoration Campus, train youth in
              environmental restoration, and transform communities across Africa.
            </p>
          </div>
        </section>
        {/* Your Impact */}
        <section id="your_impact" className="-mt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 cursor-default">
            <div
              className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${highlight
                ? "shadow-[0_0_25px_rgba(34,197,94,0.25)] border-primary"
                : "shadow-2xl border-gray-100"
                }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5">

                {/* Left: Impact Info */}
                <div className="md:col-span-2 bg-gray-50 p-8 border-r border-gray-100">
                  <h3 className="text-xl font-bold text-textDark mb-6">
                    Your Impact
                  </h3>

                  <div className="space-y-6">

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-textDark">$25 – The Root Seed</p>
                        <p className="text-sm text-text">
                          Helps provide restoration seedlings and learning materials
                          for community trainees.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-bold text-textDark">$100 – The Tool Kit</p>
                        <p className="text-sm text-text">
                          Equips students with hands-on tools used in restoration
                          training and environmental work.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <HeartPulse className="w-5 h-5 text-yellow-700" />
                      </div>
                      <div>
                        <p className="font-bold text-textDark">$500 – The Scholar's Path</p>
                        <p className="text-sm text-text">
                          Supports vocational training for young restoration leaders
                          at the Shoova Restoration Campus.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Secure Notice */}
                  <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <Text variant="bold" className="font-bold text-blue-800 text-sm">
                        Secure Donation
                      </Text>
                    </div>
                    <p className="text-xs text-blue-600">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                </div>

                {/* Right: Donation Form */}
                <div className="md:col-span-3 p-10">

                  {/* Frequency Toggle */}
                  <div className="grid grid-cols-2 gap-3 mb-6">

                    <button
                      onClick={() => setDonationType("one-time")}
                      className={`py-3 rounded-md font-bold tracking-wide transition ${donationType === "one-time"
                        ? "bg-primary text-white"
                        : "border-2 border-primary text-primary"
                        }`}
                    >
                      ONE TIME
                    </button>

                    <button
                      onClick={() => setDonationType("monthly")}
                      className={`py-3 rounded-md font-bold tracking-wide transition ${donationType === "monthly"
                        ? "bg-primary text-white"
                        : "border-2 border-primary text-primary"
                        }`}
                    >
                      MONTHLY
                    </button>

                  </div>


                  {/* Amount Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-8">

                    {[
                      { amount: 25, label: "Root Seed" },
                      { amount: 100, label: "Tool Kit" },
                      { amount: 500, label: "Scholar's Path" },
                      { amount: 1000, label: "Restoration Fellow" },
                      { amount: 2500, label: "Lab Anchor" },
                      { amount: 5000, label: "Campus Catalyst" }
                    ].map((item) => (
                      <button
                        key={item.amount}
                        onClick={() => handleAmountSelect(item.amount)}
                        className={`py-3 rounded-md font-bold transition ${customAmount === "" && amount === item.amount
                          ? "bg-primary text-white"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                          }`}
                      >
                        ${item.amount.toLocaleString()}
                        <div className="text-xs opacity-80">{item.label}</div>
                      </button>
                    ))}

                  </div>


                  {/* Custom Amount */}
                  <div className="flex items-center border-b-2 border-primary mb-6">

                    <span className="text-xl font-bold text-primary pr-2">$</span>

                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      min="5"
                      max="100000"
                      className="w-full py-2 outline-none text-lg font-bold"
                    />

                    <span className="text-sm text-primary pl-2">USD</span>

                  </div>
                  {/* Dedicate */}
                  {/* <button className="w-full py-3 border-2 border-primary rounded-md text-primary font-bold tracking-wide mb-4 hover:bg-primary hover:text-white transition">
                    DEDICATE THIS GIFT
                  </button> */}


                  {/* Donate */}
                  {/* Impact Message */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 text-center">
                    <p className="text-xs uppercase tracking-wide text-primary/70 mb-1">
                      Your Impact
                    </p>

                    <p className="text-sm text-primary font-medium">
                      {getImpactMessage(finalAmount)}
                    </p>
                  </div>
                  <button
                    onClick={handleDonate}
                    disabled={loading || finalAmount < 5}
                    className={`w-full py-3 border-2 border-primary rounded-md font-bold tracking-wide transition
                    ${loading || finalAmount < 5
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-primary hover:text-white"
                      }`}
                  >
                    {loading
                      ? "Processing..."
                      : `DONATE $${Number(finalAmount).toLocaleString()}`}
                  </button>
                  <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                  </div>
                  <div className="mt-4">
                    <PayPalButton amount={finalAmount}
                      style={{ layout: "vertical" }}
                    />
                  </div>
                </div>
              </div>
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
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>
      </>
    </div>
  );
};

