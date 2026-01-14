import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  GraduationCap,
  ArrowRight,
  Quote,
  CheckCircle2,
  Heart,
  Users
} from "lucide-react";
import useTheme from "../../Shared/useTheme";

import image2 from "../../../../assets/scolership.jpg";

const HowItWorks = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  
  const defaultImages = [
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150"
  ];

  useEffect(() => {
    fetch("https://scholar-stream-server-alpha.vercel.app/reviews/public")
      .then(res => res.json())
      .then(data => {
       
        if (data.length > 0) {
          setReviews(data.slice(0, 4));
        } else {
          setReviews([{}, {}, {}, {}]);
        }
      })
      .catch(err => {
        console.error(err);
        setReviews([{}, {}, {}, {}]); 
      });
  }, []);

  const handleExploreAll = () => {
    navigate("/reviews");
  };

  const renderStars = (rating) => {
    const safeRating = rating || 5;
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < safeRating
            ? "fill-yellow-400 text-yellow-400"
            : isDark ? "fill-gray-600 text-gray-600" : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section className="relative py-28 overflow-hidden group">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image2}
          alt="Background"
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
        />
        <div className={`absolute inset-0 transition-colors duration-700 ${
          isDark 
          ? "bg-gradient-to-r from-[#020d14] via-[#020d14]/95 to-[#00bee6]/30" 
          : "bg-gradient-to-r from-[#0c243d] via-[#0c243d]/90 to-[#00bee6]/40"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-white">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#00bee6] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 mb-6 shadow-lg shadow-cyan-500/20"
            >
              <Heart size={14} fill="white" /> Student Reviews
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              What our <span className="text-[#00bee6]">students</span> <br /> are saying
            </h2>
          </div>

          <button
            onClick={handleExploreAll}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#00bee6] transition-all"
          >
            Explore All
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="h-full backdrop-blur-xl rounded-[40px] p-10 border border-white/10 bg-white/5 transition-all duration-700"
            >
              <div className="bg-[#00bee6] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/30">
                <Users className="text-white" size={28} />
              </div>

              <h3 className="text-3xl font-black text-white mb-6">
                Join our global community
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00bee6] flex items-center justify-center text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-white font-bold text-sm uppercase">
                    100% Verified Reviews
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00bee6] flex items-center justify-center text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-white font-bold text-sm uppercase">
                    Trusted Students
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Reviews Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {(reviews.length > 0 ? reviews : [{}, {}, {}, {}]).map((review, idx) => (
              <motion.div
                key={review._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-[32px] p-8 shadow-xl hover:-translate-y-2 transition-all border relative overflow-hidden ${
                  isDark 
                  ? "bg-[#041e2b]/95 border-[#37c4ef]/20 shadow-black/40" 
                  : "bg-white border-transparent"
                }`}
              >
                <Quote 
                  className={`absolute top-6 right-6 transition-colors duration-700 ${
                    isDark ? "text-white/5" : "text-gray-100"
                  }`} 
                  size={60} 
                />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img
                   
                    src={review.userImage || defaultImages[idx]}
                    className={`w-14 h-14 rounded-2xl object-cover ring-2 ${
                      isDark ? "ring-[#37c4ef]/30" : "ring-gray-100"
                    }`}
                    alt="student"
                    onError={(e) => {
                      e.target.src = defaultImages[idx];
                    }}
                  />
                  <div>
                    <h4 className={`font-black text-lg transition-colors ${
                      isDark ? "text-white" : "text-[#0c243d]"
                    }`}>
                      {review.userName || "Scholar Stream Student"}
                    </h4>
                    <div className="flex gap-0.5">
                      {renderStars(review.ratingPoint)}
                    </div>
                  </div>
                </div>

                <p className={`italic text-sm mb-6 relative z-10 transition-colors ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  "{review.reviewComment || "Amazing experience! This platform helped me find the perfect scholarship for my higher studies abroad."}"
                </p>

                <div className={`pt-4 border-t flex items-center gap-2 relative z-10 ${
                  isDark ? "border-white/10" : "border-gray-100"
                }`}>
                  <GraduationCap size={16} className="text-[#00bee6]" />
                  <span className={`text-xs font-black uppercase ${
                    isDark ? "text-gray-400" : "text-slate-900"
                  }`}>
                    {review.universityName || "Global University"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;