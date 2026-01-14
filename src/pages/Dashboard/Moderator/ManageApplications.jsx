import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FileText,
  Mail,
  Building2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../Home/Shared/useTheme";


const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { theme, toggleTheme } = useTheme();
  
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const isDark = theme === "dark";

  /* ================= THEME STYLES ================= */
  const pageBg = isDark
    ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]"
    : "bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50";

  const cardBg = isDark
    ? "bg-[#05293a]/90 border-[#37c4ef]/30"
    : "bg-white/80 border-white/20";

  const statCardBg = isDark
    ? "bg-[#05293a]/80 border-[#37c4ef]/30"
    : "bg-white/80 border-white/20";

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-gray-300" : "text-slate-600";
  const textMuted = isDark ? "text-slate-400" : "text-slate-400";

  const inputBg = isDark
    ? "bg-[#041e2b] border-[#37c4ef]/30 text-white"
    : "bg-white border-slate-200 text-gray-600";

  const inputFocus = isDark
    ? "focus:ring-[#37c4ef] focus:border-[#37c4ef]"
    : "focus:ring-indigo-500 focus:border-indigo-500";

  const hoverRow = isDark
    ? "hover:bg-[#041e2b]/50"
    : "hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50";

  const modalBg = isDark
    ? "bg-[#05293a] border border-[#37c4ef]/30"
    : "bg-white";

  const divideLine = isDark ? "divide-slate-700" : "divide-slate-200";

  const paginationBorder = isDark
    ? "border-slate-700 bg-[#041e2b]/50"
    : "border-slate-200 bg-slate-50/50";

  const buttonBg = isDark
    ? "bg-[#041e2b] border-[#37c4ef]/30 text-slate-300"
    : "bg-white border-slate-300 text-slate-600";

  const buttonHover = isDark
    ? "hover:bg-[#37c4ef] hover:text-white hover:border-[#37c4ef]"
    : "hover:bg-indigo-600 hover:text-white hover:border-indigo-600";

  const activePage = "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md";

  const statColors = {
    total: { 
      gradient: "from-indigo-500 to-purple-500",
      text: isDark ? "text-white" : "text-slate-800",
      darkText: "text-white"
    },
    pending: {
      gradient: "from-yellow-500 to-amber-500",
      text: isDark ? "text-yellow-400" : "text-yellow-600",
      darkText: "text-yellow-400"
    },
    processing: {
      gradient: "from-blue-500 to-cyan-500",
      text: isDark ? "text-blue-400" : "text-blue-600",
      darkText: "text-blue-400"
    },
    completed: {
      gradient: "from-green-500 to-emerald-500",
      text: isDark ? "text-green-400" : "text-green-600",
      darkText: "text-green-400"
    }
  };

  const themeToggleBtn = isDark
    ? "bg-[#05293a] text-[#37c4ef] border-[#37c4ef]/30"
    : "bg-white text-slate-700 border-slate-200";

  /* ================================================= */

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axiosSecure.get("/applications");
      setApplications(response.data);
      setFilteredApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: "Unable to fetch applications. Please try again.",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  // Search and filter
  useEffect(() => {
    let result = applications;

    if (searchTerm) {
      result = result.filter(
        (app) =>
          app.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      result = result.filter(
        (app) =>
          app.applicationStatus?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredApplications(result);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, applications]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // View Details
  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  // Open Feedback Modal
  const handleOpenFeedback = (app) => {
    setSelectedApp(app);
    setShowFeedbackModal(true);
  };

  // Submit Feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    try {
      await axiosSecure.patch(`/applications/${selectedApp._id}`, { feedback });

      setApplications(
        applications.map((app) =>
          app._id === selectedApp._id ? { ...app, feedback } : app
        )
      );

      setShowFeedbackModal(false);
      Swal.fire({
        icon: "success",
        title: "Feedback Submitted!",
        text: "Feedback has been added successfully.",
        confirmButtonColor: "#10B981",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to submit feedback.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  // Update Status
  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axiosSecure.patch(`/applications/${appId}`, {
        applicationStatus: newStatus,
      });

      setApplications(
        applications.map((app) =>
          app._id === appId ? { ...app, applicationStatus: newStatus } : app
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Application status changed to ${newStatus}`,
        confirmButtonColor: "#10B981",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to update status.",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  // Cancel Application
  const handleCancel = (appId, userName) => {
    Swal.fire({
      title: "⚠️ Cancel Application?",
      html: `Are you sure you want to reject <strong>${userName}'s</strong> application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#94A3B8",
      confirmButtonText: "🗑️ Yes, Reject",
      cancelButtonText: "✕ Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleStatusUpdate(appId, "rejected");
      }
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200",
      processing: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200",
      completed: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200",
      rejected: "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200",
    };
    return badges[status?.toLowerCase()] || badges.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      processing: <FileText className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return icons[status?.toLowerCase()] || icons.pending;
  };

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen transition-colors duration-700 ${pageBg}`}>
        <div className="relative">
          <div className={`animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 ${isDark ? 'border-[#37c4ef]' : 'border-indigo-600'}`}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FileText className={`w-8 h-8 ${isDark ? 'text-[#37c4ef]' : 'text-indigo-600'}`} />
          </div>
        </div>
        <p className={`mt-4 font-medium animate-pulse ${textMuted}`}>
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 p-6 ${pageBg} ${textPrimary}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Theme Toggle */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manage Applications
              </h1>
              <p className={`${textSecondary} mt-1`}>
                Review, provide feedback, and update application status
              </p>
            </div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-xl shadow-lg flex items-center gap-2 transition-all border ${themeToggleBtn}`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            <span className="font-semibold">{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total", count: applications.length, icon: <FileText />, colorKey: "total" },
            { label: "Pending", count: applications.filter(a => a.applicationStatus === "pending").length, icon: <Clock />, colorKey: "pending" },
            { label: "Processing", count: applications.filter(a => a.applicationStatus === "processing").length, icon: <FileText />, colorKey: "processing" },
            { label: "Completed", count: applications.filter(a => a.applicationStatus === "completed").length, icon: <CheckCircle />, colorKey: "completed" }
          ].map((stat, i) => (
            <div key={i} className={`${statCardBg} backdrop-blur-xl rounded-2xl shadow-xl border p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${textMuted} text-sm font-semibold mb-1`}>{stat.label}</p>
                  <p className={`text-3xl font-bold ${statColors[stat.colorKey].text}`}>{stat.count}</p>
                </div>
                <div className={`bg-gradient-to-br ${statColors[stat.colorKey].gradient} p-3 rounded-xl text-white`}>
                  {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className={`${cardBg} backdrop-blur-xl rounded-2xl shadow-xl border p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all ${inputBg} ${inputFocus}`}
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="text-slate-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-5 py-4 border-2 rounded-xl font-medium cursor-pointer ${inputBg} ${inputFocus}`}
              >
                <option value="all">All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="processing">🔄 Processing</option>
                <option value="completed">✅ Completed</option>
                <option value="rejected">❌ Rejected</option>
              </select>
            </div>

            <div className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
              <span className="font-bold text-lg">{filteredApplications.length}</span>
              <span className="ml-2 font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className={`${cardBg} backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Applicant</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">University</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Feedback</th>
                  <th className="px-6 py-4 text-center text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${divideLine}`}>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className={`text-xl font-bold mb-2 ${textPrimary}`}>No Applications Found</p>
                      <p className="text-slate-500">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((app) => (
                    <tr key={app._id} className={`${hoverRow} transition-all`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className={`font-bold ${textPrimary}`}>{app.userName}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {app.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className={`w-4 h-4 ${isDark ? 'text-[#37c4ef]' : 'text-indigo-600'}`} />
                          <span className={`font-medium ${textSecondary}`}>{app.universityName}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{app.degree}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold uppercase ${getStatusBadge(app.applicationStatus)}`}>
                          {getStatusIcon(app.applicationStatus)}
                          {app.applicationStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {app.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm max-w-xs truncate ${textSecondary}`}>
                          {app.feedback || "No feedback yet"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button onClick={() => handleViewDetails(app)} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleOpenFeedback(app)} className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all" title="Add Feedback">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <select
                            value={app.applicationStatus || "pending"}
                            onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                            className={`px-3 py-2 text-xs font-semibold border-2 rounded-lg cursor-pointer transition-all ${inputBg} ${inputFocus}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                          <button onClick={() => handleCancel(app._id, app.userName)} className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={`px-6 py-4 flex items-center justify-between border-t ${paginationBorder}`}>
              <p className={`text-sm ${textSecondary}`}>
                Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to <span className="font-bold">{Math.min(indexOfLastItem, filteredApplications.length)}</span> of <span className="font-bold">{filteredApplications.length}</span> results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : buttonHover} ${buttonBg}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all border ${currentPage === i + 1 
                      ? activePage 
                      : `${buttonBg} ${buttonHover}`}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : buttonHover} ${buttonBg}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${modalBg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Application Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Applicant Name", value: selectedApp.userName, bold: true },
                  { label: "Email", value: selectedApp.userEmail },
                  { label: "University", value: selectedApp.universityName },
                  { label: "Degree", value: selectedApp.degree },
                  { label: "Category", value: selectedApp.scholarshipCategory },
                  { label: "Application Fee", value: `$${selectedApp.applicationFees}`, color: "text-green-600" },
                  { label: "Service Charge", value: `$${selectedApp.serviceCharge}` },
                  { label: "Payment Status", value: selectedApp.paymentStatus, color: "text-green-600", cap: true },
                  { label: "Application Status", value: selectedApp.applicationStatus, color: "text-indigo-600", cap: true },
                  { label: "Application Date", value: new Date(selectedApp.applicationDate).toLocaleDateString() }
                ].map((item, i) => (
                  <div key={i}>
                    <label className={`text-sm font-semibold ${textMuted}`}>{item.label}</label>
                    <p className={`text-lg ${item.bold ? 'font-bold' : ''} ${item.color || textPrimary} ${item.cap ? 'capitalize' : ''}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
                <div className="col-span-2">
                  <label className={`text-sm font-semibold ${textMuted}`}>Feedback</label>
                  <p className={`p-3 rounded-lg ${isDark ? 'bg-[#041e2b] text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                    {selectedApp.feedback || "No feedback provided yet"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => setShowDetailsModal(false)} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${modalBg} rounded-2xl shadow-2xl max-w-lg w-full`}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Add Feedback</h2>
              <p className="text-white/80 text-sm mt-1">For {selectedApp.userName}</p>
            </div>
            <div className="p-8">
              <textarea
                name="feedback"
                defaultValue={selectedApp.feedback}
                placeholder="Write your feedback here..."
                className={`w-full px-6 py-4 border-2 rounded-xl min-h-[200px] text-base ${inputBg} ${inputFocus} placeholder:${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                required
                onSubmit={(e) => {
                  e.preventDefault();
                  const feedback = e.target.value;
                  handleSubmitFeedback({ preventDefault: () => {}, target: { feedback: { value: feedback } } });
                }}
              />
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setShowFeedbackModal(false)} className={`px-8 py-3 border-2 font-semibold rounded-lg text-base ${isDark ? 'border-[#37c4ef]/30 text-slate-300 hover:bg-[#041e2b]' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                  Cancel
                </button>
                <button type="button" onClick={(e) => {
                  const feedback = document.querySelector('textarea[name="feedback"]').value;
                  handleSubmitFeedback({ preventDefault: () => {}, target: { feedback: { value: feedback } } });
                }} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-base hover:from-purple-700 hover:to-pink-700">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;