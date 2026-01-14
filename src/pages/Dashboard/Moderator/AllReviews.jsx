import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Star,
  Trash2,
  Search,
  MessageSquare,
  Calendar,
  Mail,
  GraduationCap,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../Home/Shared/useTheme";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Grid layout এর জন্য ৬টি আইটেম আদর্শ

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosSecure.get("/reviews");
      setReviews(response.data);
      setFilteredReviews(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to Load",
        background: isDark ? "#1e293b" : "#fff",
        color: isDark ? "#f1f5f9" : "#0f172a",
        confirmButtonColor: "#0f766e",
      });
    }
  };

  useEffect(() => {
    const result = reviews.filter(
      (review) =>
        review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(result);
    setCurrentPage(1); // Reset to first page
  }, [searchTerm, reviews]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (reviewId, userName) => {
    Swal.fire({
      title: "⚠️ Delete Review?",
      html: `Are you sure you want to delete <strong>${userName}'s</strong> review?`,
      icon: "warning",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      showCancelButton: true,
      confirmButtonColor: "#be123c",
      cancelButtonColor: "#0f766e",
      confirmButtonText: "🗑️ Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${reviewId}`);
          setReviews(reviews.filter((r) => r._id !== reviewId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            background: isDark ? "#1e293b" : "#fff",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({ icon: "error", title: "Failed!", background: isDark ? "#1e293b" : "#fff" });
        }
      }
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : isDark ? "fill-slate-700 text-slate-700" : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // Theme Classes
  const bgMain = isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]";
  const bgCard = isDark ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-100";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen ${bgMain}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
        <p className="mt-4 text-teal-600 font-bold animate-pulse">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${bgMain}`}>
      {/* Hero Section */}
      <div className={`${isDark ? "bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900" : "bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900"} py-16 px-6 relative overflow-hidden mb-12`}>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
              Review <span className="text-yellow-400">Hub</span>
            </h1>
            <p className="text-teal-100 text-lg font-medium">Manage and moderate student feedback effectively.</p>
          </div>
          <div className={`${isDark ? "bg-slate-800" : "bg-white"} rounded-2xl shadow-2xl p-2 w-full md:w-[450px]`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none font-bold ${isDark ? "bg-slate-800 text-white" : "bg-white text-gray-700"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Reviews", val: reviews.length, icon: <MessageSquare />, bg: "bg-teal-600", text: "text-white" },
            { label: "Avg Rating", val: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) / reviews.length).toFixed(1) : "0.0", icon: <Star fill="currentColor" />, bg: "bg-yellow-400", text: "text-teal-900" },
            { label: "Results", val: filteredReviews.length, icon: <GraduationCap />, bg: isDark ? "bg-slate-800" : "bg-teal-900", text: "text-white" }
          ].map((stat, i) => (
            <div key={i} className={`${bgCard} p-6 rounded-3xl shadow-lg border flex items-center gap-4`}>
              <div className={`${stat.bg} ${stat.text} p-4 rounded-2xl shadow-lg`}>{stat.icon}</div>
              <div>
                <p className={`${textSecondary} text-sm font-bold uppercase tracking-wider`}>{stat.label}</p>
                <p className={`text-3xl font-black ${textPrimary}`}>{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.length === 0 ? (
            <div className={`col-span-full py-20 ${bgCard} rounded-3xl border-2 border-dashed text-center`}>
              <MessageSquare className={`w-16 h-16 ${isDark ? "text-slate-700" : "text-gray-200"} mx-auto mb-4`} />
              <p className={`text-2xl font-black ${textPrimary}`}>No Reviews Found</p>
            </div>
          ) : (
            currentItems.map((review) => (
              <div key={review._id} className={`${bgCard} group rounded-3xl p-8 shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col`}>
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={review.userImage || "https://i.ibb.co/5GzXkwq/user.png"}
                    className={`w-16 h-16 rounded-2xl object-cover ring-4 ${isDark ? "ring-slate-700" : "ring-teal-50"} shadow-md group-hover:scale-105 transition-transform`}
                    alt=""
                  />
                  <div className="flex-1 overflow-hidden">
                    <h3 className={`font-black ${textPrimary} text-lg leading-tight truncate`}>{review.userName}</h3>
                    <div className="flex items-center gap-1 text-teal-500 font-bold text-xs mt-1">
                      <Mail size={12} />
                      <span className="truncate opacity-75">{review.userEmail}</span>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? "bg-slate-800/50" : "bg-teal-50/50"} p-4 rounded-2xl border ${isDark ? "border-slate-700" : "border-teal-100"} mb-5`}>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={16} className="text-teal-500" />
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? "text-teal-400" : "text-teal-800"}`}>{review.universityName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">{renderStars(review.ratingPoint || 0)}</div>
                    <span className={`text-xs font-black border-l pl-2 ${isDark ? "text-slate-400 border-slate-600" : "text-gray-700 border-gray-300"}`}>
                      {review.ratingPoint}.0 Rating
                    </span>
                  </div>
                </div>

                <div className="mb-8 min-h-[90px] relative">
                  <Quote className={`absolute -top-2 -left-2 w-8 h-8 ${isDark ? "text-slate-700" : "text-teal-100"} opacity-50`} />
                  <p className={`${isDark ? "text-slate-300" : "text-gray-700"} text-[15px] font-medium leading-relaxed italic pl-4 border-l-2 border-teal-500 line-clamp-4`}>
                    {review.reviewComment}
                  </p>
                </div>

                <div className={`flex items-center justify-between pt-6 border-t ${isDark ? "border-slate-800" : "border-gray-100"} mt-auto`}>
                  <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-tighter">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    <span>{new Date(review.reviewDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  </div>
                  <button onClick={() => handleDelete(review._id, review.userName)} className="p-3 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-slate-800 text-slate-500 disabled:opacity-20" : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"}`}
            >
              <ChevronLeft size={24} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-11 h-11 rounded-xl font-bold transition-all ${
                  currentPage === index + 1
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                    : isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl transition-all ${isDark ? "hover:bg-slate-800 text-slate-500 disabled:opacity-20" : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;