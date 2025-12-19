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
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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
  }, [searchTerm, filterStatus, applications]);

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
      pending:
        "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200",
      processing:
        "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200",
      completed:
        "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200",
      rejected:
        "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200",
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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium animate-pulse">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Manage Applications
              </h1>
              <p className="text-slate-600 mt-1">
                Review, provide feedback, and update application status
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">
                  Total
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {applications.length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "pending"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-amber-500 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">
                  Processing
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "processing"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">
                  Completed
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {
                    applications.filter(
                      (a) => a.applicationStatus === "completed"
                    ).length
                  }
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-600"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="text-slate-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium cursor-pointer text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="pending">⏳ Pending</option>
                <option value="processing">🔄 Processing</option>
                <option value="completed">✅ Completed</option>
                <option value="rejected">❌ Rejected</option>
              </select>
            </div>

            <div className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
              <span className="font-bold text-lg">
                {filteredApplications.length}
              </span>
              <span className="ml-2 font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold">
                    Feedback
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-xl font-bold text-slate-700 mb-2">
                        No Applications Found
                      </p>
                      <p className="text-slate-500">
                        Try adjusting your search or filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-slate-800">
                            {app.userName}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {app.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-indigo-600" />
                          <span className="font-medium text-slate-700">
                            {app.universityName}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {app.degree}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold uppercase ${getStatusBadge(
                            app.applicationStatus
                          )}`}
                        >
                          {getStatusIcon(app.applicationStatus)}
                          {app.applicationStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {app.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-xs truncate">
                          {app.feedback || "No feedback yet"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleViewDetails(app)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenFeedback(app)}
                            className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all"
                            title="Add Feedback"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <select
                            value={app.applicationStatus || "pending"}
                            onChange={(e) =>
                              handleStatusUpdate(app._id, e.target.value)
                            }
                            className="px-3 py-2 text-xs font-semibold border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-all text-gray-600"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                          <button
                            onClick={() => handleCancel(app._id, app.userName)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all"
                            title="Reject"
                          >
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
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Application Details</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Applicant Name
                  </label>
                  <p className="text-lg font-bold text-slate-800">
                    {selectedApp.userName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Email
                  </label>
                  <p className="text-lg text-slate-700">
                    {selectedApp.userEmail}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    University
                  </label>
                  <p className="text-lg text-slate-700">
                    {selectedApp.universityName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Degree
                  </label>
                  <p className="text-lg text-slate-700">{selectedApp.degree}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Category
                  </label>
                  <p className="text-lg text-slate-700">
                    {selectedApp.scholarshipCategory}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Application Fee
                  </label>
                  <p className="text-lg font-bold text-green-600">
                    ${selectedApp.applicationFees}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Service Charge
                  </label>
                  <p className="text-lg text-slate-700">
                    ${selectedApp.serviceCharge}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Payment Status
                  </label>
                  <p className="text-lg font-semibold text-green-600 capitalize">
                    {selectedApp.paymentStatus}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Application Status
                  </label>
                  <p className="text-lg font-semibold text-indigo-600 capitalize">
                    {selectedApp.applicationStatus}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Application Date
                  </label>
                  <p className="text-lg text-slate-700">
                    {new Date(selectedApp.applicationDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Feedback
                  </label>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                    {selectedApp.feedback || "No feedback provided yet"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Add Feedback</h2>
              <p className="text-white/80 text-sm mt-1">
                For {selectedApp.userName}
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="p-6 text-gray-600">
              <textarea
                name="feedback"
                defaultValue={selectedApp.feedback}
                placeholder="Write your feedback here..."
                className="w-full placeholder:text-pink-600 px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[150px]"
                required
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
