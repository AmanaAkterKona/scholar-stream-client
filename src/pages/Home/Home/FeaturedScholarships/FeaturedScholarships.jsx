
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaArrowRight,
  FaArrowLeft,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";

// Swiper Components and Styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useTheme from "../../Shared/useTheme"; 

const FeaturedScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    axios
      .get("https://scholar-stream-server-alpha.vercel.app/scholarships")
      .then((res) => {
        setScholarships(res.data.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  
  const sectionBg = isDark 
    ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]" 
    : "bg-gradient-to-b from-[#e0f7fa] via-[#f8fdff] to-white";

  const titleColor = isDark ? "text-white" : "text-slate-900";
  const spanColor = isDark ? "text-gray-400" : "text-slate-600";
  const textColor = isDark ? "text-gray-300" : "text-slate-600";
  
  const trophyBadge = isDark 
    ? "bg-[#37c4ef]/20 text-[#37c4ef] border border-[#37c4ef]/50" 
    : "bg-[#00bcd4] text-white";

  const cardStyle = isDark 
    ? "bg-[#041e2b]/95 border-[#37c4ef]/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
    : "bg-white shadow-xl shadow-cyan-100/40 border-white";

  const innerBox = isDark 
    ? "bg-[#05293a]/90 border-[#37c4ef]/10" 
    : "bg-slate-50 border-slate-100";

  const cardTitle = isDark ? "text-white group-hover:text-[#37c4ef]" : "text-slate-800 group-hover:text-[#00bcd4]";
  const navBtnStyle = isDark 
    ? "bg-[#041e2b] text-[#37c4ef] hover:bg-[#37c4ef] hover:text-white border border-[#37c4ef]/30" 
    : "bg-white text-cyan-600 hover:bg-[#00bcd4] hover:text-white";

  const seeAllBtn = isDark
    ? "bg-[#37c4ef] hover:bg-[#1faed1] text-white shadow-[#37c4ef]/20"
    : "bg-[#00bcd4] text-white shadow-cyan-200 hover:bg-[#0097a7]";



  return (
    <div className={`py-20 px-6 relative overflow-hidden transition-colors duration-700 ${sectionBg}`}>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-16">
        <div className={`px-4 py-1 rounded-full flex items-center gap-2 text-xs font-bold mb-6 shadow-md transition-all ${trophyBadge}`}>
          <FaTrophy className="text-[10px]" /> Top Rated Opportunities
        </div>

        <h2 className={`text-5xl font-extrabold font-black mb-6 tracking-tight ${titleColor}`}>
          Featured{" "}
          <span className={spanColor}>Scholarships</span>
        </h2>

        <p className={`text-lg max-w-2xl mb-10 ${textColor}`}>
          Discover handpicked scholarships from top universities worldwide.
        </p>

        <button
          onClick={() => navigate("/scholarships")}
          className={`px-10 py-4 font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 ${seeAllBtn}`}
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
              <div className={`p-8 rounded-[35px] border h-full flex flex-col group transition-all duration-500 hover:shadow-2xl ${cardStyle}`}>
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border shadow-inner ${isDark ? "bg-[#020d14] border-[#37c4ef]/20" : "bg-slate-50 border-slate-100"}`}>
                    <img
                      src={sch.universityImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl leading-tight transition-colors line-clamp-2 ${cardTitle}`}>
                      {sch.scholarshipName}
                    </h3>
                    <p className={`text-xs font-bold mt-1 uppercase tracking-wider ${isDark ? "text-[#37c4ef]" : "text-cyan-600"}`}>
                      {sch.universityName}
                    </p>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-0 mb-8 rounded-2xl border overflow-hidden transition-all ${innerBox}`}>
                  <div className={`p-4 flex flex-col items-center border-r ${isDark ? "border-[#37c4ef]/10" : "border-slate-100"}`}>
                    <span className={`text-[10px] font-bold uppercase mb-1 ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                      Amount
                    </span>
                    <span className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      ${sch.applicationFees || "0"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col items-center">
                    <span className={`text-[10px] font-bold uppercase mb-1 ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                      Deadline
                    </span>
                    <span className={`text-sm font-bold ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                      {new Date(sch.applicationDeadline).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>
                </div>

                <p className={`text-sm mb-8 line-clamp-3 text-center italic ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  "An excellent opportunity for {sch.subjectCategory} students
                  in {sch.universityCountry}."
                </p>

                <button
                  onClick={() => navigate(`/scholarships/${sch._id}`)}
                  className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2 mt-auto ${
                    isDark ? "bg-[#008080] hover:bg-[#009999] text-white shadow-black/20" : "bg-[#008080] hover:bg-[#006666] text-white shadow-teal-100"
                  }`}
                >
                  Apply Now <FaGraduationCap />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className={`prev-btn absolute left-[-15px] md:left-[-40px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 shadow-xl rounded-full flex items-center justify-center transition-all ${navBtnStyle}`}>
          <FaArrowLeft />
        </button>
        <button className={`next-btn absolute right-[-15px] md:right-[-40px] top-[40%] -translate-y-1/2 z-20 w-12 h-12 shadow-xl rounded-full flex items-center justify-center transition-all ${navBtnStyle}`}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FeaturedScholarships;