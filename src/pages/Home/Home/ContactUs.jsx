import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import useTheme from "../Shared/useTheme";
 

const ContactUs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`relative min-h-screen py-20 px-4 overflow-hidden transition-all duration-700 ${
      isDark 
      ? "bg-[#020b17]" 
      : "bg-gradient-to-br from-[#e8fbff] via-[#f0f9ff] to-[#ddf4ff]"
    }`}>
      
      {/* Animated Background Elements */}
      <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
        isDark ? "bg-[#0aa6c8]/10" : "bg-[#0aa6c8]/5"
      }`}></div>
      <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-700 ${
        isDark ? "bg-[#0aa6c8]/5" : "bg-[#033044]/5"
      }`}></div>
      
      {/* Success Alert */}
      {showSuccess && (
        <div className="fixed top-8 right-8 z-50 animate-slide-in">
          <div className={`${
            isDark ? "bg-slate-900 border-green-500" : "bg-white border-green-500"
          } rounded-2xl shadow-2xl border-2 p-6 flex items-start gap-4 max-w-md`}>
            <div className="bg-green-500 p-3 rounded-full">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                Message Sent Successfully!
              </h3>
              <p className={`${isDark ? "text-slate-400" : "text-gray-600"} text-sm`}>
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
            <button onClick={() => setShowSuccess(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${
              isDark ? "text-[#0aa6c8] bg-[#0aa6c8]/20" : "text-[#0aa6c8] bg-[#0aa6c8]/10"
            }`}>
              Let's Connect
            </span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${isDark ? "text-white" : "text-[#033044]"}`}>
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0aa6c8] to-[#0789a6]">Us</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Have questions about scholarships, applications, or partnerships? We're here to help you succeed.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className={`${
            isDark ? "bg-slate-900/50 border-slate-800 shadow-black/20" : "bg-white/80 border-white/50 shadow-2xl"
          } backdrop-blur-sm rounded-3xl p-10 border transition-all duration-500`}>
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-[#033044]"}`}>Get in Touch</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0aa6c8] to-[#0789a6] rounded-full"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-[#0aa6c8] to-[#0789a6] p-4 rounded-2xl shadow-lg">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <div>
                  <p className={`font-bold text-lg mb-1 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>Email</p>
                  <p className={`${isDark ? "text-slate-400" : "text-gray-600"} text-base`}>proff.kona@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-[#0aa6c8] to-[#0789a6] p-4 rounded-2xl shadow-lg">
                  <FaPhoneAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className={`font-bold text-lg mb-1 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>Phone</p>
                  <p className={`${isDark ? "text-slate-400" : "text-gray-600"} text-base`}>+880 1796575129</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-[#0aa6c8] to-[#0789a6] p-4 rounded-2xl shadow-lg">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <p className={`font-bold text-lg mb-1 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>Location</p>
                  <p className={`${isDark ? "text-slate-400" : "text-gray-600"} text-base`}>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className={`mt-10 pt-8 border-t ${isDark ? "border-slate-800" : "border-gray-200"}`}>
              <div className={`rounded-2xl p-5 ${isDark ? "bg-slate-800/50" : "bg-gradient-to-r from-[#0aa6c8]/10 to-[#0789a6]/10"}`}>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                  <span className={`font-semibold ${isDark ? "text-[#0aa6c8]" : "text-[#033044]"}`}>💬 Quick Response:</span> We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${
            isDark ? "bg-slate-900/50 border-slate-800 shadow-black/20" : "bg-white/80 border-white/50 shadow-2xl"
          } backdrop-blur-sm rounded-3xl p-10 border transition-all duration-500`}>
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-[#033044]"}`}>Send a Message</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0aa6c8] to-[#0789a6] rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDark 
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10" 
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10"
                  }`}
                />
              </div>

              <div className="group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDark 
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10" 
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10"
                  }`}
                />
              </div>

              <div className="group">
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-base transition-all duration-300 resize-none focus:outline-none focus:ring-4 ${
                    isDark 
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10" 
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#0aa6c8] focus:ring-[#0aa6c8]/10"
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0aa6c8] to-[#0789a6] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 transform"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className={`${
            isDark ? "bg-slate-900/50 border-slate-800 shadow-black/20" : "bg-white/80 border-white/50 shadow-xl"
          } backdrop-blur-sm rounded-3xl p-8 border max-w-3xl mx-auto transition-all duration-500`}>
            <p className={`text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              <span className={`font-bold ${isDark ? "text-white" : "text-[#033044]"}`}>Office Hours:</span> Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+6)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;