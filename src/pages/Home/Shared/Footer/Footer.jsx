import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaPinterestP 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa"; // Logo icon

const Footer = () => {
  return (
    <footer className="bg-[#033044] text-white pt-16 pb-10 ">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">

        {/* LEFT LOGO SECTION */}
        <div>
          {/* ScholarStream Logo */}
          <div className="relative flex items-center select-none group">
            {/* Icon */}
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-1 mx-2 rounded-full text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ">
              <FaGraduationCap
                size={28}
                className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              />
            </div>

            {/* SCHOLAR Text */}
            <h2 className="text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 transition-all duration-500 group-hover:animate-shimmer relative">
              SCHOLAR
              {/* STREAM Text at end corner */}
              <span className="absolute text-xl md:text-2xl font-bold text-[#37c4ef] top-7 right-1 -translate-x-1/4 translate-y-1/4 bg-clip-text text-transparent bg-gradient-to-r from-[#37c4ef] via-[#6fc9f5] to-[#a0d4ff] animate-shimmer">
                Stream
              </span>
            </h2>
          </div>

          <p className="text-sm mt-12">EST. 2025</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <FaFacebookF className="text-xl bg-white text-[#033044] rounded-full p-2 w-9 h-9 cursor-pointer" />
            <FaXTwitter className="text-xl bg-white text-[#033044] rounded-full p-2 w-9 h-9 cursor-pointer" />
            <FaPinterestP className="text-xl bg-white text-[#033044] rounded-full p-2 w-9 h-9 cursor-pointer" />
            <FaInstagram className="text-xl bg-white text-[#033044] rounded-full p-2 w-9 h-9 cursor-pointer" />
            <FaLinkedinIn className="text-xl bg-white text-[#033044] rounded-full p-2 w-9 h-9 cursor-pointer" />
           
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>All Scholarships</li>
            <li>Top Scholarships</li>
            <li>Scholarship Directory</li>
            <li>Scholarships by Country</li>
            <li>Scholarships by Degree</li>
            <li>Scholarships by Category</li>
            <li>Popular Universities</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-bold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>About ScholarStream</li>
            <li>Press Room</li>
            <li>Advertise With Us</li>
          </ul>

          <h3 className="text-lg font-bold mb-4 mt-6">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Provider Guidelines</li>
          </ul>
        </div>

        {/* DOWNLOAD OUR APP */}
        <div>
          <h3 className="text-lg font-bold mb-4">DOWNLOAD OUR APP</h3>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/800px-App_Store_%28iOS%29.svg.png"
            alt="App Store"
            className="w-40 cursor-pointer"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="w-full h-px bg-[#0a4158]/50"></div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-6 text-sm space-x-4">
        <a href="#">Terms of Use</a> |
        <a href="#">Privacy Policy</a> |
        <a href="#">Your Privacy Choices</a>
        <p className="mt-2">© {new Date().getFullYear()} ScholarStream</p>
      </div>
    </footer>
  );
};

export default Footer;
