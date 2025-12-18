import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEdit, FaTrash, FaCreditCard, FaStar, FaCommentDots } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecute";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [editData, setEditData] = useState({
    phone: "",
    address: ""
  }); 
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  // --- Helper functions ---
  const isPending = (status) => status === "pending";
  const isPaid = (payment) => payment === "paid";
  const isCompleted = (status) => status === "completed";
  const isCancelled = (status) => status === "cancelled";

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, [user]); 

  const fetchApplications = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/applications/user/${user.email}`);
      setApplications(data);
    } catch (error) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Application
  const handleDeleteApplication = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to DELETE this application PERMANENTLY?");
    if (!isConfirmed) return;
    try {
      await axiosSecure.delete(`/applications/${id}`); 
      toast.success("Application deleted successfully");
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  // ✏️ Edit Setup
  const handleEdit = (app) => {
    setSelectedApp(app);
    setEditData({
        address: app.address || "", 
        phone: app.phone || "",
    });
    setShowEditModal(true);
  };

  // ✅ Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.patch(`/applications/update/${selectedApp._id}`, {
        phone: editData.phone,
        address: editData.address
      });
      if (response.data.modifiedCount > 0) {
        toast.success("Application updated!");
        fetchApplications(); 
        setShowEditModal(false);
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      toast.error("Failed to update application");
    }
  };

  // Pay Now
  const handlePay = (app) => {
    window.location.href = `/checkout/${app.scholarshipId}`;
  };

  // Submit Review
  const handleSubmitReview = async () => {
    if (!reviewData.comment.trim()) return toast.error("Please write a review");
    try {
      await axiosSecure.post("/reviews", {
        scholarshipId: selectedApp.scholarshipId,
        universityName: selectedApp.universityName,
        userName: user.displayName || user.name,
        userEmail: user.email,
        userImage: user.photoURL,
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
      });
      toast.success("Review submitted!");
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: "" });
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div></div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">My Applications</h1>
        <p className="text-slate-600 mt-2">Track and manage your scholarship applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No Applications Yet</h3>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">University</th>
                  <th className="px-6 py-4 text-left font-semibold">Address</th>
                  <th className="px-6 py-4 text-left font-semibold">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold">Fees</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Payment</th>
                  <th className="px-6 py-4 text-left font-semibold">Feedback</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{app.universityName}</td>
                    <td className="px-6 py-4 text-slate-600">{app.universityCity}, {app.universityCountry}</td>
                    <td className="px-6 py-4 text-slate-600">{app.subjectCategory}</td>
                    <td className="px-6 py-4 text-slate-800 font-semibold">${app.applicationFees}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isPending(app.applicationStatus) ? "bg-yellow-100 text-yellow-700" :
                        app.applicationStatus === "processing" ? "bg-blue-100 text-blue-700" :
                        isCompleted(app.applicationStatus) ? "bg-green-100 text-green-700" :
                        isCancelled(app.applicationStatus) ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                      }`}>{app.applicationStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isPaid(app.paymentStatus) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>{app.paymentStatus}</span>
                    </td>
                    {/* ✅ Table Feedback Column */}
                    <td className="px-6 py-4 text-slate-600 max-w-[150px] truncate italic">
                      {app.feedback ? (
                        <span className="text-indigo-600 flex items-center gap-1"><FaCommentDots className="shrink-0"/> {app.feedback}</span>
                      ) : (
                        <span className="text-gray-400">No feedback</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => { setSelectedApp(app); setShowDetailsModal(true); }} className="p-2 bg-blue-100 text-blue-700 rounded-lg"><FaEye /></button>
                        {isPending(app.applicationStatus) && (
                          <>
                            <button onClick={() => handleEdit(app)} className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><FaEdit /></button>
                            {!isPaid(app.paymentStatus) && <button onClick={() => handlePay(app)} className="p-2 bg-green-100 text-green-700 rounded-lg"><FaCreditCard /></button>}
                            <button onClick={() => handleDeleteApplication(app._id)} className="p-2 bg-red-100 text-red-700 rounded-lg"><FaTrash /></button>
                          </>
                        )}
                        {isCompleted(app.applicationStatus) && (
                          <button onClick={() => { setSelectedApp(app); setShowReviewModal(true); }} className="p-2 bg-purple-100 text-purple-700 rounded-lg"><FaStar /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ✅ Updated Details Modal with Feedback Box */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-2">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
               <div><span className="font-bold text-slate-800">University:</span> <p>{selectedApp.universityName}</p></div>
               <div><span className="font-bold text-slate-800">Subject:</span> <p>{selectedApp.subjectCategory}</p></div>
               <div><span className="font-bold text-slate-800">Location:</span> <p>{selectedApp.universityCity}, {selectedApp.universityCountry}</p></div>
               <div><span className="font-bold text-slate-800">Fees:</span> <p className="text-indigo-600 font-bold">${selectedApp.applicationFees}</p></div>
               <div><span className="font-bold text-slate-800">Application Status:</span> <p className="capitalize">{selectedApp.applicationStatus}</p></div>
               <div><span className="font-bold text-slate-800">Payment Status:</span> <p className="capitalize">{selectedApp.paymentStatus}</p></div>
            </div>
            
            {/* Feedback Section */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <span className="font-bold text-indigo-800 flex items-center gap-2 mb-2">
                <FaCommentDots /> Moderator Feedback:
              </span>
              <p className="text-slate-700 italic leading-relaxed">
                {selectedApp.feedback || "No feedback provided yet by the moderator."}
              </p>
            </div>

            <button onClick={() => setShowDetailsModal(false)} className="mt-8 w-full bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700">Close Window</button>
          </div>
        </div>
      )}

      {/* Edit Modal (Connected) */}
      {showEditModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full text-gray-700">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Edit Application</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input type="text" required value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">Address</label>
                  <input type="text" required value={editData.address} onChange={(e) => setEditData({...editData, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal (Standard) */}
      {showReviewModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Rate Your Experience</h2>
            <div className="space-y-4">
              <label className="block font-semibold text-slate-700 mb-2">Stars</label>
              <select value={reviewData.rating} onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg">
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
              </select>
              <label className="block font-semibold text-slate-700 mb-2">Your Review</label>
              <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} rows="4" className="w-full px-4 py-2 border rounded-lg" placeholder="How was the process?"></textarea>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmitReview} className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold">Submit</button>
              <button onClick={() => setShowReviewModal(false)} className="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;