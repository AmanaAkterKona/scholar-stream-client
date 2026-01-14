import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import img1 from "../../../../assets/student img.avif";
import img2 from "../../../../assets/scholar1.jpg";
import img3 from "../../../../assets/360_F_339602256_dBq6bYfHWzlnRQkXgAMFXZfx2r1DPQns.jpg";
import img4 from "../../../../assets/student img 2 - Copy.avif";
import useTheme from "../../Shared/useTheme";

const slides = [
  {
    studentImg: img1,
    bgImg: img1,
    title: "Find Scholarships",
    highlight: "for College",
    stat: "$1.92M",
    statLabel: "Matched scholarship amount",
    quote: "ScholarStream helped me apply debt-free.",
    name: "Ayesha R.",
    award: "$8,000 Award",
  },
  {
    studentImg: img2,
    bgImg: img2,
    title: "Unlock Your",
    highlight: "Future",
    stat: "$2.5M+",
    statLabel: "Available scholarships",
    quote: "I found 15 scholarships instantly.",
    name: "Aliza K.",
    award: "$12,000 Merit",
  },
  {
    studentImg: img3,
    bgImg: img3,
    title: "Simple Path",
    highlight: "to Funding",
    stat: "5,000+",
    statLabel: "Students helped",
    quote: "Very smooth experience.",
    name: "Fatima S.",
    award: "$10,000 Academic",
  },
  {
    studentImg: img4,
    bgImg: img4,
    title: "Study Debt-Free",
    highlight: "With Ease",
    stat: "$500K",
    statLabel: "Average awards",
    quote: "Dream education achieved!",
    name: "Fiona M.",
    award: "$15,000 STEM",
  },
];

const Banner = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      8000
    );
    return () => clearInterval(timer);
  }, []);

  /* ================= THEME STYLES ================= */

  // Dark theme - perfect, no change
  // Light theme - premium feel with better contrast
  const pageBg = isDark
    ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]"
    : "bg-gradient-to-br from-[#e8f4f8] via-[#d4ebf5] to-[#e0f2f7]";

  const overlay = isDark
    ? "bg-gradient-to-r from-[#021b26]/95 via-[#021b26]/70 to-transparent"
    : "bg-gradient-to-r from-[#f0f9fc]/85 via-[#e3f2f7]/65 to-transparent";

  const titleColor = isDark ? "text-white" : "text-[#0a4a5e]";
  const textColor = isDark ? "text-gray-300" : "text-[#2c5f6f]";

  const statCard = isDark
    ? "bg-[#05293a]/90 border border-[#37c4ef]/30 text-white"
    : "bg-white/95 border border-[#37c4ef]/40 text-[#0a4a5e] shadow-xl backdrop-blur-sm";

  const testimonial = isDark
    ? "bg-[#041e2b]/95 border border-[#37c4ef]/20 text-white"
    : "bg-white/95 border border-[#37c4ef]/30 text-[#0a4a5e] shadow-xl backdrop-blur-sm";

  const highlightColor = isDark
    ? "text-[#37c4ef] drop-shadow-[0_0_25px_rgba(55,196,239,0.5)]"
    : "text-[#0891b2] drop-shadow-[0_2px_8px_rgba(8,145,178,0.3)]";

  const checkIconColor = isDark ? "text-[#37c4ef]" : "text-[#0891b2]";

  const buttonStyle = isDark
    ? "px-10 py-4 bg-[#37c4ef] text-white text-xl font-bold rounded-2xl shadow-xl hover:bg-[#1faed1] transition-all duration-300"
    : "px-10 py-4 bg-[#0891b2] text-white text-xl font-bold rounded-2xl shadow-xl hover:bg-[#0e7490] hover:shadow-2xl transition-all duration-300";

  const imageBorder = isDark
    ? "border-4 border-[#37c4ef]/30 shadow-2xl"
    : "border-4 border-[#37c4ef]/50 shadow-2xl";

  const controlButton = isDark
    ? "p-3 rounded-full bg-[#37c4ef]/30 text-white hover:bg-[#37c4ef]/50 transition-all"
    : "p-3 rounded-full bg-[#0891b2]/50 text-white hover:bg-[#0891b2]/70 transition-all shadow-lg";

  const scrollHintColor = isDark ? "text-[#37c4ef]" : "text-[#0891b2]";

  const statHighlight = isDark ? "text-[#37c4ef]" : "text-[#0891b2]";
  const nameHighlight = isDark ? "text-[#37c4ef]" : "text-[#0891b2]";

  /* ================================================= */

  return (
    <div
      className={`relative min-h-[80vh] flex items-center overflow-hidden transition-colors duration-700 ${pageBg}`}
    >
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url(${slides[current].bgImg})`,
            }}
          />
          <div className={`absolute inset-0 ${overlay}`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT */}
        <div className="space-y-6">
          <h1
            className={`text-5xl md:text-7xl font-extrabold leading-tight ${titleColor}`}
          >
            {slides[current].title}
            <br />
            <span className={highlightColor}>
              {slides[current].highlight}
            </span>
          </h1>

          <ul className={`space-y-3 text-lg ${textColor}`}>
            <li className="flex gap-3 items-center">
              <FaCheckCircle className={checkIconColor} /> 100% Free
            </li>
            <li className="flex gap-3 items-center">
              <FaCheckCircle className={checkIconColor} /> Verified Scholarships
            </li>
          </ul>

          <button
            onClick={() => navigate("/scholarships")}
            className={buttonStyle}
          >
            Find Scholarships
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative max-w-[420px] mx-auto">
          <img
            src={slides[current].studentImg}
            className={`rounded-[2rem] h-[480px] w-full object-cover ${imageBorder}`}
            alt=""
          />

          <div
            className={`absolute -top-6 -left-6 p-5 rounded-2xl ${statCard}`}
          >
            <p className={`text-2xl font-black ${statHighlight}`}>
              {slides[current].stat}
            </p>
            <p className="text-xs uppercase">{slides[current].statLabel}</p>
          </div>

          <div
            className={`absolute -bottom-6 -right-6 p-6 w-[260px] rounded-2xl ${testimonial}`}
          >
            <p className="italic text-sm">"{slides[current].quote}"</p>
            <p className={`mt-3 font-bold ${nameHighlight}`}>
              {slides[current].name}
            </p>
            <p className="text-[10px] uppercase opacity-60">
              {slides[current].award}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-20">
        <button
          onClick={() =>
            setCurrent((p) => (p - 1 + slides.length) % slides.length)
          }
          className={controlButton}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => setCurrent((p) => (p + 1) % slides.length)}
          className={controlButton}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 right-10 opacity-60 hidden md:block">
        <FaChevronDown className={`${scrollHintColor} animate-bounce`} />
      </div>
    </div>
  );
};

export default Banner;