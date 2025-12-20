import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  FaUniversity,
  FaGlobeAmericas,
  FaGraduationCap,
  FaFileInvoiceDollar,
  FaPlusCircle,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const scholarshipData = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      universityImage: data.universityImage,
      universityCountry: data.universityCountry,
      universityCity: data.universityCity,
      universityWorldRank: parseInt(data.universityWorldRank),
      subjectCategory: data.subjectCategory,
      scholarshipCategory: data.scholarshipCategory,
      degree: data.degree,
      tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : 0,
      applicationFees: parseFloat(data.applicationFees),
      serviceCharge: parseFloat(data.serviceCharge),
      applicationDeadline: data.applicationDeadline,
      scholarshipPostDate: new Date().toISOString().split("T")[0],
      postedUserEmail: user.email,
    };

    try {
      const response = await axiosSecure.post("/scholarships", scholarshipData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Scholarship added successfully",
          confirmButtonColor: "#008080",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add scholarship",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-[#1a2e35] font-semibold placeholder:text-[#94a3b8] focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 outline-none transition-all duration-200";
  const labelStyle =
    "block text-sm font-black text-[#1a2e35] mb-2 ml-1 uppercase tracking-wide";

  return (
    <div className="min-h-screen bg-[#f0f9ff] p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-l-4 border-[#008080] pl-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#1a2e35] tracking-tight">
              Add New <span className="text-[#00a3c4]">Scholarship</span>
            </h1>
            <p className="text-[#64748b] font-medium mt-1 italic">
              Publish global opportunities for the next generation.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-[40px] shadow-2xl shadow-cyan-900/5 p-8 md:p-12 border border-white"
        >
          <div className="space-y-12">
            {/* Institution Section */}
            <section>
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <FaUniversity className="text-[#008080] text-xl" />
                <h2 className="text-xl font-black text-[#1a2e35]">
                  University Profile
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className={labelStyle}>Scholarship Name *</label>
                  <input
                    type="text"
                    {...register("scholarshipName", { required: true })}
                    className={inputStyle}
                    placeholder="e.g. Merit-Based Excellence Scholarship"
                  />
                </div>
                <div>
                  <label className={labelStyle}>University Name *</label>
                  <input
                    type="text"
                    {...register("universityName", { required: true })}
                    className={inputStyle}
                    placeholder="University Full Name"
                  />
                </div>
                <div>
                  <label className={labelStyle}>University Image URL *</label>
                  <input
                    type="url"
                    {...register("universityImage", { required: true })}
                    className={inputStyle}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </section>

            {/* Global Standings Section */}
            <section className="bg-[#f0f9ff]/40 p-6 md:p-8 rounded-[30px] border border-[#e0f2fe]">
              <div className="flex items-center gap-3 mb-8">
                <FaGlobeAmericas className="text-[#008080] text-xl" />
                <h2 className="text-xl font-black text-[#1a2e35]">
                  Global Standings
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className={labelStyle}>Country</label>
                  <input
                    type="text"
                    {...register("universityCountry", { required: true })}
                    className={inputStyle}
                    placeholder="e.g. USA"
                  />
                </div>
                <div>
                  <label className={labelStyle}>City</label>
                  <input
                    type="text"
                    {...register("universityCity", { required: true })}
                    className={inputStyle}
                    placeholder="City Name"
                  />
                </div>
                <div>
                  <label className={labelStyle}>World Rank</label>
                  <input
                    type="number"
                    {...register("universityWorldRank", { required: true })}
                    className={inputStyle}
                    placeholder="e.g. 1"
                  />
                </div>
              </div>
            </section>

            {/* Academic & Finance Section */}
            <section>
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <FaGraduationCap className="text-[#008080] text-2xl" />
                <h2 className="text-xl font-black text-[#1a2e35]">
                  Academic & Financials
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <label className={labelStyle}>Subject Category</label>
                  <select
                    {...register("subjectCategory", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Select Category</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Scholarship Type</label>
                  <select
                    {...register("scholarshipCategory", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Select Type</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Degree</label>
                  <select
                    {...register("degree", { required: true })}
                    className={inputStyle}
                  >
                    <option value="">Select Degree</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Tuition Fee ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("tuitionFees")}
                    className={inputStyle}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Application Fee ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("applicationFees", { required: true })}
                    className={inputStyle}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className={labelStyle}>Service Charge ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("serviceCharge", { required: true })}
                    className={inputStyle}
                    placeholder="0.00"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className={labelStyle}>Application Deadline</label>
                  <input
                    type="date"
                    {...register("applicationDeadline", { required: true })}
                    className={inputStyle}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-end items-center gap-6 pt-10 border-t border-slate-100">
            <button
              type="button"
              onClick={() => reset()}
              className="text-[#64748b] font-bold uppercase tracking-widest text-xs hover:text-[#1a2e35] transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-12 py-4 bg-[#008080] hover:bg-[#006666] text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <>
                  <FaPlusCircle /> Publish Scholarship{" "}
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
