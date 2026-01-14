import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../Home/Shared/useTheme";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await axiosSecure.get("/scholarships");
      setScholarships(response.data);
      setFilteredScholarships(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = scholarships;
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.universityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory !== "all") {
      result = result.filter((s) => s.scholarshipCategory === filterCategory);
    }
    setFilteredScholarships(result);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, scholarships]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredScholarships.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${name}"?`,
      icon: "warning",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/scholarships/${id}`);
          setScholarships(scholarships.filter((s) => s._id !== id));
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#f1f5f9" : "#0f172a",
          });
        } catch (error) {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship({ ...scholarship });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updateData } = editingScholarship;
      await axiosSecure.patch(`/scholarships/${_id}`, updateData);
      setScholarships(
        scholarships.map((s) => (s._id === _id ? editingScholarship : s))
      );
      setShowEditModal(false);
      Swal.fire({
        title: "Updated!",
        icon: "success",
        background: isDark ? "#1e293b" : "#fff",
        color: isDark ? "#f1f5f9" : "#0f172a",
      });
    } catch (error) {
      Swal.fire("Error!", "Failed to update.", "error");
    }
  };

  // Theme & Size Config
  const bgClass = isDark ? "bg-[#141b2d]" : "bg-[#f1f5f9]";
  const cardClass = isDark
    ? "bg-[#1f2940] border-[#2d3a54]"
    : "bg-white border-slate-200";
  const textTitle = isDark ? "text-slate-100" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const inputBg = isDark
    ? "bg-[#141b2d] border-[#2d3a54] text-white"
    : "bg-white border-slate-300 text-slate-900";

  const inputStyle = `w-full px-5 py-4 border rounded-2xl font-bold text-lg outline-none transition-all ${inputBg} focus:border-[#008080] shadow-sm`;
  const labelStyle = `block text-sm font-black uppercase tracking-widest mb-2 ml-1 ${
    isDark ? "text-slate-500" : "text-slate-600"
  }`;

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${bgClass}`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#008080]"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 lg:p-10 transition-colors duration-300 font-sans ${bgClass}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1
            className={`text-4xl md:text-5xl font-black tracking-tight mb-3 ${textTitle}`}
          >
            Manage <span className="text-[#008080]">Scholarships</span>
          </h1>
          <p className={`${textMuted} text-lg font-medium`}>
            Found{" "}
            <span className="text-[#008080] font-bold">
              {filteredScholarships.length}
            </span>{" "}
            scholarships in database
          </p>
        </div>

        <div
          className={`${cardClass} rounded-[32px] shadow-lg border p-8 mb-10`}
        >
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                size={24}
              />
              <input
                type="text"
                placeholder="Search by university or scholarship name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${inputStyle} pl-14`}
              />
            </div>
            <div className="flex items-center gap-4">
              <Filter className="text-slate-500" size={24} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`px-8 py-4 rounded-2xl font-bold text-lg outline-none border transition-all ${
                  isDark
                    ? "bg-[#141b2d] border-[#2d3a54] text-white"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              >
                <option value="all">All Categories</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-Fund</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={`${cardClass} rounded-[32px] border overflow-hidden shadow-2xl`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr
                  className={`${
                    isDark
                      ? "bg-[#25324d] border-[#2d3a54]"
                      : "bg-slate-100 border-slate-200"
                  } border-b`}
                >
                  <th className="px-10 py-7 text-sm font-black text-slate-500 uppercase tracking-widest">
                    University
                  </th>
                  <th className="px-8 py-7 text-sm font-black text-slate-500 uppercase tracking-widest">
                    Scholarship Details
                  </th>
                  <th className="px-8 py-7 text-sm font-black text-slate-500 uppercase tracking-widest text-center">
                    Fees & Charges
                  </th>
                  <th className="px-8 py-7 text-sm font-black text-slate-500 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDark ? "divide-[#2d3a54]" : "divide-slate-200"
                }`}
              >
                {currentItems.map((s) => (
                  <tr
                    key={s._id}
                    className={`transition-all duration-200 ${
                      isDark ? "hover:bg-[#25324d]/50" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <img
                          src={s.universityImage}
                          alt=""
                          className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#008080]/10"
                        />
                        <div>
                          <p
                            className={`text-xl font-black leading-tight mb-1 ${textTitle}`}
                          >
                            {s.universityName}
                          </p>
                          <p className="text-sm text-slate-500 font-bold uppercase flex items-center gap-2">
                            <MapPin size={16} className="text-[#008080]" />{" "}
                            {s.universityCity}, {s.universityCountry}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase mb-2 ${
                          s.scholarshipCategory === "Full fund"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : s.scholarshipCategory === "Partial"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        }`}
                      >
                        {s.scholarshipCategory}
                      </span>
                      <p
                        className={`font-black text-lg ${
                          isDark ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {s.scholarshipName}
                      </p>
                    </td>
                    <td className="px-8 py-8 text-center">
                      <p className={`text-2xl font-black ${textTitle}`}>
                        ${s.applicationFees + s.serviceCharge}
                      </p>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                        Total Payable
                      </span>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(s)}
                          className={`p-4 rounded-2xl transition-all shadow-sm ${
                            isDark
                              ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-600 hover:text-white"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                          }`}
                        >
                          <Pencil size={22} />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id, s.scholarshipName)}
                          className={`p-4 rounded-2xl transition-all shadow-sm ${
                            isDark
                              ? "bg-rose-500/10 text-rose-400 hover:bg-rose-600 hover:text-white"
                              : "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                          }`}
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 pb-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-2xl transition-all ${
                isDark
                  ? "hover:bg-[#1f2940] text-slate-500 disabled:opacity-20"
                  : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"
              }`}
            >
              <ChevronLeft size={28} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-14 h-14 rounded-2xl font-black text-lg transition-all ${
                  currentPage === index + 1
                    ? "bg-[#008080] text-white shadow-xl shadow-[#008080]/30 scale-110"
                    : isDark
                    ? "bg-[#1f2940] text-slate-400 hover:bg-[#25324d]"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-2xl transition-all ${
                isDark
                  ? "hover:bg-[#1f2940] text-slate-500 disabled:opacity-20"
                  : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"
              }`}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal (Wider Layout) */}
      {showEditModal && editingScholarship && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div
            className={`${
              isDark ? "bg-[#1f2940] border border-[#2d3a54]" : "bg-white"
            } rounded-[40px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
          >
            <div
              className={`p-8 border-b flex justify-between items-center ${
                isDark
                  ? "bg-[#25324d] border-[#2d3a54]"
                  : "bg-slate-50/50 border-slate-100"
              }`}
            >
              <h2 className={`text-3xl font-black ${textTitle}`}>
                Update Scholarship
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className={`p-3 rounded-full transition-colors ${
                  isDark
                    ? "text-slate-400 hover:bg-[#141b2d]"
                    : "hover:bg-slate-200"
                }`}
              >
                <X size={28} />
              </button>
            </div>
            <form
              onSubmit={handleUpdate}
              className="p-10 overflow-y-auto space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className={labelStyle}>Scholarship Name</label>
                  <input
                    type="text"
                    value={editingScholarship.scholarshipName}
                    onChange={(e) =>
                      setEditingScholarship({
                        ...editingScholarship,
                        scholarshipName: e.target.value,
                      })
                    }
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Category</label>
                  <select
                    value={editingScholarship.scholarshipCategory}
                    onChange={(e) =>
                      setEditingScholarship({
                        ...editingScholarship,
                        scholarshipCategory: e.target.value,
                      })
                    }
                    className={inputStyle}
                  >
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Degree Level</label>
                  <select
                    value={editingScholarship.degree}
                    onChange={(e) =>
                      setEditingScholarship({
                        ...editingScholarship,
                        degree: e.target.value,
                      })
                    }
                    className={inputStyle}
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>App Fee ($)</label>
                  <input
                    type="number"
                    value={editingScholarship.applicationFees}
                    onChange={(e) =>
                      setEditingScholarship({
                        ...editingScholarship,
                        applicationFees: parseFloat(e.target.value),
                      })
                    }
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Service Charge ($)</label>
                  <input
                    type="number"
                    value={editingScholarship.serviceCharge}
                    onChange={(e) =>
                      setEditingScholarship({
                        ...editingScholarship,
                        serviceCharge: parseFloat(e.target.value),
                      })
                    }
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`flex-1 px-8 py-5 border-2 font-black text-lg rounded-2xl transition-all ${
                    isDark
                      ? "border-[#2d3a54] text-slate-400 hover:bg-[#141b2d]"
                      : "border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-5 bg-[#008080] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#008080]/20 hover:bg-[#006666]"
                >
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
