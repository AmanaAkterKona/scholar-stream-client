import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, GraduationCap, ArrowRight, Quote, CheckCircle2, Heart, Users } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth"; 
import image2 from "../../../../assets/scolership.jpg";

const HowItWorks = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const role = user?.role?.toLowerCase();

  useEffect(() => {
    axiosSecure.get("/reviews").then((res) => {
      setReviews(res.data.slice(0, 4));
    });
  }, [axiosSecure]);

 
  const handleExploreAll = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (role === "admin" || role === "moderator") {
      
      navigate("/dashboard/reviews");
    } else if (role === "student") {
     
      navigate("/dashboard/my-reviews");
    } else {
      
      navigate("/dashboard");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section className="relative py-28 overflow-hidden group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image2} 
          alt="Background" 
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c243d] via-[#0c243d]/90 to-[#00bee6]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-white">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#00bee6] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 mb-6"
            >
               <Heart size={14} fill="white"/> Student Reviews
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              What our <span className="text-[#00bee6]">students</span> <br /> are saying
            </h2>
          </div>
          
          <button 
            onClick={handleExploreAll} 
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#00bee6] transition-all"
          >
            Explore All <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20}/>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Stats Card */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="h-full bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 flex flex-col justify-center"
            >
              <div className="bg-[#00bee6] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 leading-tight">Join our global community</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00bee6] flex items-center justify-center text-white"><CheckCircle2 size={16} /></div>
                  <span className="text-white font-bold text-sm uppercase">100% Verified Reviews</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00bee6] flex items-center justify-center text-white"><CheckCircle2 size={16} /></div>
                  <span className="text-white font-bold text-sm uppercase">Secure Profile</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Reviews Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[32px] p-8 shadow-2xl relative group/card hover:-translate-y-2 transition-all duration-500"
              >
                <Quote className="absolute top-6 right-6 text-gray-100" size={60} />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img src={review.userImage} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-blue-50" alt="" />
                  <div>
                    <h4 className="font-black text-[#0c243d] text-lg leading-none mb-1">{review.userName}</h4>
                    <div className="flex gap-0.5">{renderStars(review.ratingPoint)}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic font-medium mb-8">"{review.reviewComment}"</p>
                <div className="pt-5 border-t border-gray-100 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#00bee6]" />
                  <span className="text-[10px] font-black text-[#0c243d] uppercase tracking-widest truncate">{review.universityName}</span>
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