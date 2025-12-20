// src/components/Home/Banner/Banner.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import img1 from "../../../../assets/student img.avif";

const Banner = () => {
  const navigate = useNavigate(); 

  return (
    <div className="w-full bg-[#e8f9fb] py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* ---------------- LEFT CONTENT ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#033044] leading-tight">
            Find <span className="text-[#37c4ef]">Scholarships</span> <br />
            for College
          </h1>

          <ul className="mt-6 space-y-4 text-lg text-gray-700">
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-[#37c4ef]" />
              Scholarships for <b>every type</b> of student
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-[#37c4ef]" />
              100% free
            </li>
            <li className="flex items-center gap-3">
              <FaCheckCircle className="text-[#37c4ef]" />
              Vetted scholarship opportunities
            </li>
          </ul>

         
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/scholarships')} 
            className="mt-10 px-8 py-3 
            bg-gradient-to-r from-[#37c4ef] to-[#1faed1]
            text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Find Scholarships Now
          </motion.button>
        </motion.div>

        {/* ---------------- RIGHT CONTENT ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <img
            src={img1}
            alt="Student"
            className="rounded-xl w-full object-cover shadow-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-6 left-4 bg-[#37c4ef] text-white px-5 py-3 rounded-xl shadow-lg"
          >
            <h4 className="font-bold text-lg">$1.92M</h4>
            <p className="text-sm">Matched scholarship amount</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute bottom-3 right-0 bg-white shadow-xl p-5 rounded-xl w-64 text-sm"
          >
            <p className="text-gray-600 italic">
              "ScholarStream helped me apply debt-free. As a freshman, I was awarded…"
            </p>
            <div className="mt-4">
              <p className="font-bold text-blue-400">Ayesha R.</p>
              <p className="text-gray-500 text-xs">
                National Foundation Award – $8,000
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;