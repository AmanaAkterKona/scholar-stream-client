import React, { useState } from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaGraduationCap,
  FaSun,
  FaMoon,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";
import useTheme from "../useTheme";



const Footer = () => {
  const { theme, toggleTheme } = useTheme();


  const footerBg =
    theme === "dark"
      ? "bg-gradient-to-b from-[#0a1929] via-[#132f4c] to-[#0a1929]"
      : "bg-[#0a1929]";

  const textColor = "text-white";
  const subTextColor = "text-gray-200";

  const iconBg =
    theme === "dark"
      ? "bg-gradient-to-br from-[#1e3a5f] to-[#2a5a8f]"
      : "bg-gradient-to-br from-gray-100 to-gray-200";
  const iconColor = theme === "dark" ? "text-white" : "text-[#033044]";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <footer
        className={`${footerBg} ${textColor} pt-16 pb-10 transition-all duration-500 relative`}
      >
       
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 items-start relative z-10">
         
          <div>
            <Link to="/" className="flex items-center gap-3 select-none group">
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-1 rounded-full text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
                <FaGraduationCap
                  size={28}
                  className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                />
              </div>

              <h2 className="text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 transition-all duration-500 group-hover:animate-shimmer relative">
                SCHOLAR
                <span className="absolute text-xl md:text-2xl font-bold text-[#37c4ef] top-7 right-1 -translate-x-1/4 translate-y-1/4 bg-clip-text text-transparent bg-gradient-to-r from-[#37c4ef] via-[#6fc9f5] to-[#a0d4ff] animate-shimmer">
                  Stream
                </span>
              </h2>
            </Link>

            <p className={`text-sm mt-12 ${subTextColor}`}>EST. 2025</p>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.linkedin.com/in/amena-akter-kona/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconBg} ${iconColor} rounded-full p-2 w-9 h-9 flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                  theme === "dark"
                    ? "shadow-sm hover:shadow-[0_0_15px_rgba(55,196,239,0.5)]"
                    : "shadow-md hover:shadow-lg hover:shadow-blue-200"
                }`}
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/AmanaAkterKona"
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconBg} ${iconColor} rounded-full p-2 w-9 h-9 flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                  theme === "dark"
                    ? "shadow-sm hover:shadow-[0_0_15px_rgba(55,196,239,0.5)]"
                    : "shadow-md hover:shadow-lg hover:shadow-gray-300"
                }`}
              >
                <FaGithub />
              </a>

              <a
                href="mailto:proff.kona@gmail.com"
                className={`${iconBg} ${iconColor} rounded-full p-2 w-9 h-9 flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                  theme === "dark"
                    ? "shadow-sm hover:shadow-[0_0_15px_rgba(55,196,239,0.5)]"
                    : "shadow-md hover:shadow-lg hover:shadow-red-200"
                }`}
              >
                <FaEnvelope />
              </a>

              <a
                href="https://bespoke-banoffee-097600.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br from-[#D4AF37] to-[#FFD700] text-black rounded-full p-2 w-9 h-9 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg ${
                  theme === "dark"
                    ? "shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                    : "shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.5)]"
                }`}
              >
                <FaBriefcase />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wider">QUICK LINKS</h3>
            <ul className={`space-y-2 text-sm ${subTextColor}`}>
              <li>
                <a
                  href="/"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/scholarships"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  All Scholarships
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wider">HELP</h3>
            <ul className={`space-y-2 text-sm ${subTextColor}`}>
              <li>
                <a
                  href="/#faq"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/provider-guidelines"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Provider Guidelines
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-[#37c4ef] transition-all duration-300 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* LET'S CONNECT */}
          {/* LET'S CONNECT */}
<div className="max-w-xs">
  <h3 className="text-lg font-bold mb-4 tracking-wider">LET'S CONNECT</h3>
  <p className={`text-sm ${subTextColor} mb-4`}>
    Interested in collaborating or hiring me? Let's build something meaningful together.
  </p>

  <div className="flex flex-col gap-3">
    {/* Portfolio Button */}
    <a
      href="https://bespoke-banoffee-097600.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
        theme === "dark"
          ? ""
          : "bg-[#0a1929] text-white hover:bg-[#102b47] shadow-md hover:shadow-lg"
      }`}
    >
      <FaArrowRight className={theme === "dark" ? "text-[#37c4ef]" : "text-white"} /> View Portfolio
    </a>

    {/* GitHub Button */}
    <a
      href="https://github.com/AmanaAkterKona"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
        theme === "dark"
          ? ""
          : "bg-[#0a1929] text-white hover:bg-[#102b47] shadow-md hover:shadow-lg"
      }`}
    >
      <FaGithub className={theme === "dark" ? "text-[#37c4ef]" : "text-white"} /> GitHub Profile
    </a>
  </div>
</div>

        </div>

      {/* THEME TOGGLE BUTTON */}
      <div className="flex justify-center mt-12 relative z-10">
        <button
  onClick={toggleTheme}  
  className={`flex items-center gap-3 px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-md ${
    theme === "dark"
      ? "bg-gradient-to-r from-[#1e3a5f] to-[#2a5a8f] text-white"
      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
  }`}
>
  {theme === "dark" ? <FaSun /> : <FaMoon />}
  {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
</button>
      </div>

        {/* DIVIDER */}
        <div className="max-w-7xl mx-auto mt-10 relative z-10">
          <div
            className={`w-full h-px border-t ${borderColor} ${
              theme === "dark" ? "shadow-[0_1px_10px_rgba(55,196,239,0.1)]" : "shadow-sm"
            }`}
          ></div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className={`max-w-7xl mx-auto px-4 text-center mt-6 text-sm ${subTextColor} relative z-10`}
        >
          <div className="space-x-4">
            <a href="/terms-of-service" className="hover:text-[#37c4ef] transition-colors">
              Terms of Use
            </a>{" "}
            |
            <a href="/privacy-policy" className="hover:text-[#37c4ef] transition-colors">
              Privacy Policy
            </a>{" "}
            |
            <a href="/provider-guidelines" className="hover:text-[#37c4ef] transition-colors">
              Your Privacy Choices
            </a>
          </div>
          <p className="mt-2">© {new Date().getFullYear()} ScholarStream. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
