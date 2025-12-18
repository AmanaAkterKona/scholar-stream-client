// src/pages/Home/FeaturedScholarships/FeaturedScholarships.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaDollarSign, FaArrowRight, FaArrowLeft, FaTrophy, FaGraduationCap } from "react-icons/fa";

// Swiper Components and Styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/scholarships")
      .then(res => {
        setScholarships(res.data.slice(0, 6)); 
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-[#e0f7fa] via-[#f8fdff] to-white relative overflow-hidden">
      
      {/* সেন্টারে থাকা হেডার */}
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <div className="bg-[#00bcd4] text-white px-4 py-1 rounded-full flex items-center gap-2 text-xs font-bold mb-6 shadow-md">
          <FaTrophy className="text-[10px]" /> Top Rated Opportunities
        </div>
        
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Featured <span className="font-medium text-slate-600">Scholarships</span>
        </h2>
        
        <p className="text-slate-600 text-lg max-w-2xl mb-10">
          Discover handpicked scholarships from top universities worldwide.
        </p>

        {/* ✅ FIXED PATH: scholarships পেজে যাওয়ার জন্য */}
        <button 
          onClick={() => navigate('/scholarships')}
          className="px-10 py-4 bg-[#00bcd4] text-white font-black rounded-2xl shadow-xl shadow-cyan-200 hover:bg-[#0097a7] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          See All Scholarships <FaArrowRight />
        </button>
      </div>

      <div className="max-w-7xl mx-auto relative px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
          className="pb-20"
        >
          {scholarships.map((sch) => (
            <SwiperSlide key={sch._id}>
              <div className="bg-white p-8 rounded-[35px] shadow-xl shadow-cyan-100/40 border border-white h-full flex flex-col group hover:shadow-2xl transition-all duration-500">
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 shadow-inner">
                    <img src={sch.universityImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 leading-tight group-hover:text-[#00bcd4] transition-colors line-clamp-2">
                      {sch.scholarshipName}
                    </h3>
                    <p className="text-xs font-bold text-cyan-600 mt-1 uppercase tracking-wider">{sch.universityName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0 mb-8 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="p-4 flex flex-col items-center border-r border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Amount</span>
                    <span className="text-xl font-black text-slate-900">${sch.applicationFees || '0'}</span>
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Deadline</span>
                    <span className="text-sm font-bold text-slate-700">
                       {new Date(sch.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm mb-8 line-clamp-3 text-center italic">
                   "An excellent opportunity for {sch.subjectCategory} students in {sch.universityCountry}."
                </p>

                {/* ✅ UPDATED BUTTON COLOR: Premium Deep Teal to match Skyblue bg */}
                <button 
                  onClick={() => navigate(`/scholarships/${sch._id}`)}
                  className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-teal-100 flex justify-center items-center gap-2 mt-auto"
                >
                  Apply Now <FaGraduationCap />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn absolute left-[-15px] md:left-[-40px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-cyan-600 hover:bg-[#00bcd4] hover:text-white transition-all">
          <FaArrowLeft />
        </button>
        <button className="next-btn absolute right-[-15px] md:right-[-40px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-cyan-600 hover:bg-[#00bcd4] hover:text-white transition-all">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FeaturedScholarships;