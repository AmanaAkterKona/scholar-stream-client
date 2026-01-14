import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaStar,
  FaPen,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import useTheme from "../Home/Shared/useTheme";

const renderStars = (rating, isDark) => {
  const fullStars = Math.floor(rating);
  const starColor = isDark ? "text-[#37c4ef]" : "text-amber-400";
  const emptyColor = isDark ? "text-slate-700" : "text-slate-200";
  
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < fullStars ? `${starColor} fill-current` : emptyColor}
        />
      ))}
    </div>
  );
};

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { theme } = useTheme();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewInput, setReviewInput] = useState({
    ratingPoint: 5,
    reviewComment: "",
  });

  const isDark = theme === "dark";
  const defaultImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  /* ================= THEME STYLES ================= */
  const pageBg = isDark
    ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]"
    : "bg-[#f8fdff]";

  const headerBg = isDark
    ? "bg-gradient-to-r from-[#05293a] to-[#041e2b]"
    : "bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2]";

  const cardBg = isDark
    ? "bg-[#05293a]/90 border-[#37c4ef]/30"
    : "bg-white border-slate-100";

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-gray-300" : "text-slate-600";
  const textMuted = isDark ? "text-gray-500" : "text-slate-400";

  const accentColor = isDark ? "text-[#37c4ef]" : "text-[#008080]";
  const accentBg = isDark ? "bg-[#37c4ef]" : "bg-[#008080]";

  const inputBg = isDark
    ? "bg-[#041e2b] ring-[#37c4ef]/30 focus:ring-[#37c4ef] text-white"
    : "bg-white ring-slate-200 focus:ring-[#008080] text-slate-700";

  const formBg = isDark
    ? "bg-[#041e2b]/60 border-[#37c4ef]/20"
    : "bg-[#f0f9fa] border-cyan-100";

  const reviewCardBg = isDark
    ? "bg-[#041e2b]/80 border-[#37c4ef]/20"
    : "bg-white border-slate-50";

  const buttonHover = isDark ? "hover:bg-[#1faed1]" : "hover:bg-slate-900";

  const statCardBg = isDark ? "bg-[#041e2b]" : "bg-slate-50";

  const sidebarBg = isDark
    ? "bg-[#05293a]/95 shadow-2xl shadow-[#37c4ef]/10 border-[#37c4ef]/30"
    : "bg-white shadow-2xl shadow-cyan-100/50 border-white";

  const dividerColor = isDark ? "bg-[#37c4ef]/20" : "bg-slate-100";

  /* ================================================= */

  const loadData = async () => {
    try {
      const scholarshipRes = await axiosSecure.get(`/scholarships/${id}`);
      setScholarship(scholarshipRes.data);
      const reviewRes = await axiosSecure.get(`/reviews/${id}`);
      setReviews(Array.isArray(reviewRes.data) ? reviewRes.data : []);
    } catch (err) {
      console.error("Scholarship details error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to submit a review.");

    const newReview = {
      scholarshipId: id,
      reviewerName:
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "Scholarship Student",
      reviewerImage: user?.photoURL || defaultImg,
      ratingPoint: parseInt(reviewInput.ratingPoint),
      reviewComment: reviewInput.reviewComment,
      universityName: scholarship?.universityName,
      scholarshipName: scholarship?.scholarshipName,
    };

    try {
      const res = await axiosSecure.post("/reviews", newReview);
      if (res.data.insertedId) {
        alert("Review Posted!");
        setReviewInput({ ratingPoint: 5, reviewComment: "" });
        loadData();
      }
    } catch (error) {
      console.error("Review submit error:", error);
    }
  };

  if (loading)
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <span className={`loading loading-spinner loading-lg ${isDark ? 'text-[#37c4ef]' : 'text-[#008080]'}`}></span>
      </div>
    );

  return (
    <div className={`min-h-screen ${pageBg} pb-20 transition-colors duration-700`}>
      {/* Header Section */}
      <div className={`${headerBg} pt-24 pb-40 px-6`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className={`w-52 h-52 rounded-[40px] overflow-hidden shadow-2xl border-4 ${isDark ? 'border-[#37c4ef]/30' : 'border-white'} shrink-0 ${isDark ? 'bg-[#041e2b]' : 'bg-white'}`}>
            <img
              src={scholarship?.universityImage}
              alt="University"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className={`text-4xl md:text-6xl font-black ${textPrimary} mb-6`}>
              {scholarship?.scholarshipName}
            </h1>
            <div className={`flex flex-wrap justify-center md:justify-start gap-6 ${textSecondary} font-semibold`}>
              <span className="flex items-center gap-2">
                <FaUniversity className={accentColor} />{" "}
                {scholarship?.universityName}
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className={accentColor} />{" "}
                {scholarship?.universityCountry}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Scholarship Info */}
          <div className={`${cardBg} rounded-[40px] p-8 md:p-12 shadow-sm border`}>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-8 flex items-center gap-3`}>
              <span className={`w-2 h-8 ${accentBg} rounded-full`}></span>{" "}
              Details
            </h2>
            <p className={`${textSecondary} leading-relaxed text-lg mb-10`}>
              {scholarship?.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`flex items-start gap-4 p-6 ${statCardBg} rounded-3xl border ${isDark ? 'border-[#37c4ef]/20' : ''}`}>
                <FaCalendarAlt className={accentColor} size={20} />
                <div>
                  <p className={`${textMuted} text-xs font-bold uppercase`}>
                    Deadline
                  </p>
                  <p className={`text-xl font-bold ${textPrimary}`}>
                    {scholarship?.applicationDeadline
                      ? new Date(
                          scholarship.applicationDeadline
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-4 p-6 ${statCardBg} rounded-3xl border ${isDark ? 'border-[#37c4ef]/20' : ''}`}>
                <FaDollarSign className={accentColor} size={20} />
                <div>
                  <p className={`${textMuted} text-xs font-bold uppercase`}>
                    Fees
                  </p>
                  <p className={`text-xl font-bold ${textPrimary}`}>
                    ${scholarship?.applicationFees}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className={`${cardBg} rounded-[40px] p-8 md:p-12 shadow-sm border`}>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-10`}>
              Student Testimonials
            </h2>

            {user && (
              <form
                onSubmit={handleReviewSubmit}
                className={`mb-12 ${formBg} p-8 rounded-[35px] border shadow-inner`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className={`text-sm font-bold ${textMuted} uppercase ml-2 mb-2 block`}>
                      Rating
                    </label>
                    <select
                      value={reviewInput.ratingPoint}
                      onChange={(e) =>
                        setReviewInput({
                          ...reviewInput,
                          ratingPoint: e.target.value,
                        })
                      }
                      className={`w-full p-4 rounded-2xl border-none ring-2 outline-none font-bold ${inputBg}`}
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} Stars
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`text-sm font-bold ${textMuted} uppercase ml-2 mb-2 block`}>
                      Your Review
                    </label>
                    <textarea
                      value={reviewInput.reviewComment}
                      onChange={(e) =>
                        setReviewInput({
                          ...reviewInput,
                          reviewComment: e.target.value,
                        })
                      }
                      className={`w-full p-4 rounded-2xl border-none ring-2 outline-none min-h-[100px] ${inputBg}`}
                      placeholder="Share your experience..."
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${accentBg} text-white px-10 py-4 rounded-2xl font-black ${buttonHover} transition-all`}
                >
                  Submit Review
                </button>
              </form>
            )}

            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`p-8 rounded-[30px] border ${reviewCardBg} shadow-sm`}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img
                        src={
                          review.reviewerImage || review.userImage || defaultImg
                        }
                        className={`w-16 h-16 rounded-2xl object-cover ${isDark ? 'bg-[#041e2b]' : 'bg-slate-100'} border ${isDark ? 'border-[#37c4ef]/20' : ''}`}
                        alt="User"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultImg;
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <p className={`font-black ${textPrimary} text-lg`}>
                              {review.reviewerName ||
                                review.userName ||
                                "Scholarship Student"}
                            </p>
                            <p className={`text-xs ${textMuted} font-bold uppercase`}>
                              {review.reviewDate
                                ? new Date(
                                    review.reviewDate
                                  ).toLocaleDateString()
                                : "Recent"}
                            </p>
                          </div>
                          {renderStars(review.ratingPoint, isDark)}
                        </div>
                        <p className={`${textSecondary} italic text-lg leading-relaxed`}>
                          "{review.reviewComment}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-center ${textMuted} py-10`}>
                  No reviews yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className={`${sidebarBg} rounded-[40px] p-8 md:p-10 border sticky top-24`}>
            <h3 className={`text-2xl font-black ${textPrimary} mb-8`}>Summary</h3>
            <div className="space-y-4 mb-10">
              <div className={`flex justify-between ${textSecondary} font-bold`}>
                <span>Application Fee</span>
                <span className={textPrimary}>
                  ${scholarship?.applicationFees}
                </span>
              </div>
              <div className={`flex justify-between ${textSecondary} font-bold`}>
                <span>Service Charge</span>
                <span className={textPrimary}>
                  ${scholarship?.serviceCharge}
                </span>
              </div>
              <div className={`h-px ${dividerColor} my-4`}></div>
              <div className={`flex justify-between items-center ${accentColor}`}>
                <span className="text-lg font-black uppercase">Total</span>
                <span className="text-3xl font-black">
                  $
                  {(parseFloat(scholarship?.applicationFees) || 0) +
                    (parseFloat(scholarship?.serviceCharge) || 0)}
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                navigate(`/checkout/${id}`, { state: scholarship })
              }
              className={`w-full ${accentBg} ${buttonHover} text-white font-black py-6 rounded-3xl shadow-xl transition-all`}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;