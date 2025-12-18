// src/pages/AllScholarships/AllScholarships.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaGraduationCap, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState(""); // সরাসরি সার্চ স্টেট
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchScholarships = async () => {
  
    try {
      const res = await axios.get("http://localhost:3000/scholarships", {
        params: { search, category, country },
      });
      setScholarships(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchScholarships();
  }, [search, category, country]);

  return (
    <div className="min-h-screen bg-[#f8fdff] pb-20">
 
      <div className="bg-gradient-to-r from-[#e0f7fa] to-[#b2ebf2] py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Explore <span className="text-[#008080]">Scholarships</span>
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          Find the best financial opportunities from top-ranked universities worldwide.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10">
        
        {/* Search & Filters Card */}
        <div className="bg-white p-6 rounded-[30px] shadow-xl shadow-cyan-100/50 border border-white flex flex-col lg:flex-row gap-4 mb-12">
          
          {/* ✅ AUTO SEARCH INPUT */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, University or Degree..."
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-cyan-400 transition-all outline-none text-slate-800 font-medium" 
            />
          </div>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-cyan-400 outline-none font-medium text-slate-700 cursor-pointer"
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
            className="px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-cyan-400 outline-none text-slate-800 font-medium"
          />
        </div>

        {/* Scholarship Grid */}
        {loading && scholarships.length === 0 ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-cyan-500"></span>
          </div>
        ) : scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((sch) => (
              <div
                key={sch._id}
                className="bg-white rounded-[35px] shadow-sm border border-slate-100 p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 shrink-0 shadow-inner">
                    <img src={sch.universityImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-[#008080] transition-colors truncate">
                      {sch.scholarshipName}
                    </h3>
                    <p className="text-xs font-bold text-cyan-600 mt-1 uppercase tracking-wider truncate">{sch.universityName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                       <FaGraduationCap className="text-cyan-500" /> Category
                    </span>
                    <span className="text-sm font-bold text-slate-700">{sch.scholarshipCategory}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l pl-4 border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                       <FaMapMarkerAlt className="text-cyan-500" /> Location
                    </span>
                    <span className="text-sm font-bold text-slate-700 truncate">{sch.universityCountry}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 bg-slate-50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><FaDollarSign /> App Fee:</span>
                    <span className="font-black text-slate-800">${sch.applicationFees || "0"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><FaCalendarAlt /> Deadline:</span>
                    <span className="font-bold text-slate-700">
                       {new Date(sch.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/scholarships/${sch._id}`)}
                  className="w-full bg-[#008080] hover:bg-[#006666] text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2 mt-auto"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
            <p className="text-slate-400 text-lg italic">No scholarships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;