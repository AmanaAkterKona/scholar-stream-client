import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCalendarAlt,
  FaDollarSign,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useTheme from "../Home/Shared/useTheme";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const fetchScholarships = async () => {
    try {
      const res = await axios.get(
        "https://scholar-stream-server-alpha.vercel.app/scholarships",
        {
          params: { search, category, country },
        }
      );
      setScholarships(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [search, category, country]);

  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = scholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark ? "bg-[#020b17]" : "bg-[#f8fdff]"
      } pb-20`}
    >
      {/* Hero Header */}
      <div
        className={`py-16 px-6 text-center transition-all duration-500 ${
          isDark
            ? "bg-slate-900 border-b border-slate-800"
            : "bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2]"
        }`}
      >
        <h2
          className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Explore <span className="text-[#008080]">Scholarships</span>
        </h2>
        <p
          className={`max-w-xl mx-auto ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Find the best financial opportunities from top-ranked universities
          worldwide.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 -mt-10">
        {/* Search & Filters Card */}
        <div
          className={`p-6 rounded-[30px] shadow-xl border flex flex-col lg:flex-row gap-4 mb-12 transition-all duration-500 ${
            isDark
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/50"
              : "bg-white border-white shadow-cyan-100/50"
          }`}
        >
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, University or Degree..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none font-medium transition-all ${
                isDark
                  ? "bg-slate-800 text-white focus:ring-2 focus:ring-[#008080]"
                  : "bg-slate-50 text-slate-800 focus:ring-2 focus:ring-cyan-400 border-none"
              }`}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-6 py-4 rounded-2xl outline-none font-medium cursor-pointer transition-all ${
              isDark
                ? "bg-slate-800 text-white focus:ring-2 focus:ring-[#008080]"
                : "bg-slate-50 text-slate-700 focus:ring-2 focus:ring-cyan-400 border-none"
            }`}
          >
            <option value="">All Categories</option>
            <option value="Full Fund">Full Fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>

          <input
            type="text"
            placeholder="Filter by Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`px-6 py-4 rounded-2xl outline-none font-medium transition-all ${
              isDark
                ? "bg-slate-800 text-white focus:ring-2 focus:ring-[#008080]"
                : "bg-slate-50 text-slate-800 focus:ring-2 focus:ring-cyan-400 border-none"
            }`}
          />
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-6 text-center">
            <p
              className={`${
                isDark ? "text-slate-400" : "text-slate-600"
              } font-medium`}
            >
              Showing{" "}
              <span className="font-bold text-[#008080]">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-bold text-[#008080]">
                {Math.min(startIndex + itemsPerPage, scholarships.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-[#008080]">
                {scholarships.length}
              </span>{" "}
              scholarships
            </p>
          </div>
        )}

        {/* Scholarship Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-cyan-500"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentScholarships.map((sch) => (
                <div
                  key={sch._id}
                  className={`rounded-[35px] p-10 flex flex-col hover:-translate-y-2 transition-all duration-500 group border ${
                    isDark
                      ? "bg-slate-900 border-slate-800 shadow-xl hover:shadow-black/60"
                      : "bg-white border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-cyan-100/50"
                  }`}
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div
                      className={`w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-inner ${
                        isDark ? "bg-slate-800" : "bg-slate-50"
                      }`}
                    >
                      <img
                        src={sch.universityImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h3
                        className={`font-bold text-xl leading-tight group-hover:text-[#008080] transition-colors truncate ${
                          isDark ? "text-slate-100" : "text-slate-800"
                        }`}
                      >
                        {sch.scholarshipName}
                      </h3>
                      <p
                        className={`text-sm font-bold mt-2 uppercase tracking-wider truncate ${
                          isDark ? "text-cyan-400" : "text-cyan-600"
                        }`}
                      >
                        {sch.universityName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mb-10">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`text-xs font-bold uppercase flex items-center gap-1 ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        <FaGraduationCap className="text-cyan-500" /> Category
                      </span>
                      <span
                        className={`text-base font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {sch.scholarshipCategory}
                      </span>
                    </div>
                    <div
                      className={`flex flex-col gap-2 border-l pl-5 ${
                        isDark ? "border-slate-800" : "border-slate-100"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold uppercase flex items-center gap-1 ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        <FaMapMarkerAlt className="text-cyan-500" /> Location
                      </span>
                      <span
                        className={`text-base font-bold truncate ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {sch.universityCountry}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`space-y-4 mb-10 p-5 rounded-2xl ${
                      isDark ? "bg-slate-800/50" : "bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center text-base">
                      <span className="text-slate-500 flex items-center gap-2">
                        <FaDollarSign /> App Fee:
                      </span>
                      <span
                        className={`font-black ${
                          isDark ? "text-white" : "text-slate-800"
                        }`}
                      >
                        ${sch.applicationFees || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-base">
                      <span className="text-slate-500 flex items-center gap-2">
                        <FaCalendarAlt /> Deadline:
                      </span>
                      <span
                        className={`font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {new Date(sch.applicationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/scholarships/${sch._id}`)}
                    className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-5 rounded-2xl transition-all shadow-lg mt-auto"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isDark && currentPage !== 1
                        ? "bg-slate-900 text-white border-slate-700"
                        : "bg-white text-[#008080] border-slate-200 shadow-lg"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  {getPageNumbers().map((page, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      className={`w-12 h-12 rounded-xl font-bold transition-all ${
                        currentPage === page
                          ? "bg-[#008080] text-white scale-110"
                          : isDark
                          ? "bg-slate-900 text-slate-400 border-slate-800"
                          : "bg-white text-slate-600 border-slate-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isDark && currentPage !== totalPages
                        ? "bg-slate-900 text-white border-slate-700"
                        : "bg-white text-[#008080] border-slate-200 shadow-lg"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
