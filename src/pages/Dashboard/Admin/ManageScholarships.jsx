import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
  GraduationCap,
  MapPin,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch scholarships (আপনার অরিজিনাল ফাংশনালিটি)
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

  // Search and filter (আপনার অরিজিনাল লজিক)
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
  }, [searchTerm, filterCategory, scholarships]);

  // Delete scholarship
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${name}"? This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/scholarships/${id}`);
          setScholarships(scholarships.filter((s) => s._id !== id));
          Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
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

  // Update scholarship
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updateData } = editingScholarship;
      await axiosSecure.patch(`/scholarships/${_id}`, updateData);
      setScholarships(
        scholarships.map((s) => (s._id === _id ? editingScholarship : s))
      );
      setShowEditModal(false);
      Swal.fire("Updated!", "Scholarship has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update scholarship.", "error");
    }
  };

  // Premium UI Styles (টেক্সট স্পষ্ট করার জন্য)
  const inputStyle =
    "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 outline-none transition-all";
  const labelStyle =
    "block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#008080]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Manage <span className="text-[#008080]">Scholarships</span>
          </h1>
          <p className="text-slate-500 font-medium">
            View, update, and organize scholarship listings efficiently.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search university or scholarship name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${inputStyle} pl-12 font-semibold`}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="text-slate-400" size={18} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-6 py-3 bg-slate-50 border-none rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-[#008080]/20 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-Fund</option> {/* Added Fixed */}
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    University
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Details
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Fees
                  </th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredScholarships.map((s) => (
                  <tr
                    key={s._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={s.universityImage}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {s.universityName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 flex items-center gap-1">
                            <MapPin size={10} /> {s.universityCity},{" "}
                            {s.universityCountry}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase mb-1 ${
                          s.scholarshipCategory === "Full fund"
                            ? "bg-green-100 text-green-700"
                            : s.scholarshipCategory === "Partial"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {s.scholarshipCategory}
                      </span>
                      <p className="font-bold text-slate-800 text-sm">
                        {s.scholarshipName}
                      </p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <p className="font-black text-slate-900">
                        ${s.applicationFees + s.serviceCharge}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id, s.scholarshipName)}
                          className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal (আপনার অরিজিনাল ডাটা ফিল্ডস সহ) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">
                Update Scholarship
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="p-8 overflow-y-auto space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <option value="Self-fund">Self-fund</option>{" "}
                    {/* Added Fixed */}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Degree</label>
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

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#008080] text-white font-bold rounded-xl shadow-lg shadow-[#008080]/20 hover:bg-[#006666]"
                >
                  Update Changes
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
