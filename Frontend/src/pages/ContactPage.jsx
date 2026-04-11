import React, { useState, useEffect, useRef } from "react";
import { Button } from '../components/Button';
import { ChevronDown } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Heart } from 'lucide-react';
import { HeartHandshake } from 'lucide-react';
import { Input } from '../components/Input';
import { Instagram } from 'lucide-react';
import { Link } from '../components/Link';
import { Mail } from 'lucide-react';
import { Map } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Text } from '../components/Text';
import { Twitter } from 'lucide-react';
import { Users } from 'lucide-react';
import { Youtube } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";

export const ContactPage = ({ className, children, variant, contentKey, ...props }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sending message...");

    try {
      const res = await fetch("https://shoova-initiation-yjg3.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success("Message sent successfully 🎉");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        toast.error("Failed to send message.");
      }

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Server error.");
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
        {/* Get In Touch */}
        <section id="get_in_touch" className="pt-32 pb-12 bg-primary/20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-textDark mb-4"> Get in Touch </h1>
            <p className="text-xl text-text max-w-2xl mx-auto">
              Have questions about our programs or want to get involved? We're here to help.
            </p>
          </div>
        </section>
        {/* Visit Us */}
        <section id="visit_us" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info & Map */}
              <div className="space-y-12">
                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4"><MapPin className="w-6 h-6" /></div>
                    <h3 className="font-bold text-textDark mb-2"> Visit Us </h3>
                    <p className="text-text text-sm">
                      5775 Wayzata Boulevard
                      <br />
                      Suite 700
                      <br />
                      St. Louis Park, MN 55416, USA
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4"><Mail className="w-6 h-6" /></div>
                    <h3 className="font-bold text-textDark mb-2"> Email Us </h3>
                    <p className="text-text text-sm">
                      info@shoovainitiative.org
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-yellow-600 mb-4"><Phone className="w-6 h-6" /></div>
                    <h3 className="font-bold text-textDark mb-2"> Call Us </h3>
                    <p className="text-text text-sm">
                      CST: +1(612)422-8230
                      <br />
                      GMT: +233 24 726 4516
                      <br />
                      Mon-Fri, 9am - 5pm
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4"><Users className="w-6 h-6" /></div>
                    <h3 className="font-bold text-textDark mb-2"> Volunteer </h3>
                    <p className="text-text text-sm">
                      Join our team
                      <br />
                      Public Charity Status:170(b)(1)(A)(vi)
                      <br />
                      info@shoovainitiative.org
                    </p>
                  </div>
                </div>
                {/* Map Placeholder */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-64 w-full">

                  <iframe
                    title="Shoova Location - St Louis Park"
                    src="https://www.google.com/maps?q=5775+Wayzata+Boulevard+Suite+700+St+Louis+Park+MN+55416&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>

                </div>
              </div>
              {/* Contact Form */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-heading font-bold text-textDark mb-6"> Send a Message </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-textDark mb-2"> First Name </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-textDark mb-2"> Last Name </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-textDark mb-2"> Email Address </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-textDark mb-2"> Subject </label>
                    <select name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                      <option> General Inquiry </option>
                      <option> Donation Question </option>
                      <option> Volunteering </option>
                      <option> Partnership </option>
                      <option> Media/Press </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-textDark mb-2"> Message </label>
                    <textarea name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primaryDark text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-primary/30 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* Frequently Asked Questions */}
        <section id="frequently_asked_questions" className="py-24 bg-white">

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <h2 className="text-3xl font-heading font-bold text-textDark text-center mb-12">
              Donor Tax-Deductibility FAQ
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
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}/>
                    
                  
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

