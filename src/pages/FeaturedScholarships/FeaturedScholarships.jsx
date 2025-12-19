// src/pages/Home/FeaturedScholarships/FeaturedScholarships.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

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
    axios
      .get("https://scholar-stream-server-alpha.vercel.app/scholarships")
      .then((res) => {
        setScholarships(res.data.slice(0, 8)); // স্লাইডারের জন্য ৮টি ডাটা নিলাম
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto bg-gray-50 rounded-[40px] my-12 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            Featured{" "}
            <span className="font-light text-slate-600">Scholarships</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-md">
            Here are some of the best college scholarships with approaching
            deadlines.
          </p>
        </div>
        <button
          onClick={() => navigate("/all-scholarships")}
          className="px-8 py-3 border-2 border-[#008080] text-[#008080] font-bold rounded-xl hover:bg-[#008080] hover:text-white transition-all duration-300"
        >
          See All Scholarships
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn",
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-14"
      >
        {scholarships.map((sch) => (
          <SwiperSlide key={sch._id}>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col group hover:shadow-2xl transition-all duration-500">
              {/* Logo & Title */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={sch.universityImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl text-slate-800 leading-snug group-hover:text-[#008080] transition-colors">
                  {sch.scholarshipName}
                </h3>
              </div>

              {/* Amount & Deadline */}
              <div className="flex justify-between items-center mb-8 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                    <FaDollarSign className="text-[#008080]" /> Amount
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    ${sch.applicationFees || "5,000"}
                  </p>
                </div>
                <div className="w-[1px] h-10 bg-gray-200"></div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1">
                    <FaCalendarAlt className="text-[#008080]" /> Deadline
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {new Date(sch.applicationDeadline).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                Join {sch.universityName} in {sch.universityCountry}. This{" "}
                {sch.scholarshipCategory} program is a great opportunity for{" "}
                {sch.subjectCategory} aspirants.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
                  {sch.scholarshipCategory}
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-lg uppercase">
                  {sch.degree}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/scholarships/${sch._id}`)}
                className="w-full bg-[#f1663a] hover:bg-[#d9552b] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-100"
              >
                Apply Now
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons (ছবির মতো সাইডে তীর চিহ্ন) */}
      <button className="prev-btn absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-800 hover:bg-[#008080] hover:text-white transition-all hidden lg:flex">
        <FaArrowLeft />
      </button>
      <button className="next-btn absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-800 hover:bg-[#008080] hover:text-white transition-all hidden lg:flex">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default FeaturedScholarships;
