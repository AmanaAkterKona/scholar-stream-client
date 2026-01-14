import React, { useEffect, useState } from "react";

import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null); // for edit
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // Fetch user's reviews

  const fetchReviews = async () => {
    if (!firebaseUser) return;
    try {
      const res = await axiosSecure.get(`/reviews/user/${firebaseUser.email}`);
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [firebaseUser]);

  const openAddModal = () => {
    setCurrentReview(null);
    setRating(0);
    setComment("");
    setModalOpen(true);
  };

  const openEditModal = (review) => {
    setCurrentReview(review);
    setRating(review.ratingPoint);
    setComment(review.reviewComment);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      if (currentReview) {
        // Edit review
        const res = await axiosSecure.patch(`/reviews/${currentReview._id}`, {
          ratingPoint: rating,
          reviewComment: comment,
        });
        setReviews(
          reviews.map((r) =>
            r._id === currentReview._id
              ? { ...r, ratingPoint: rating, reviewComment: comment }
              : r
          )
        );
      } else {
        // Add review
        const res = await axiosSecure.post("/reviews", {
          scholarshipId: "dummy-id", // replace with actual scholarshipId
          universityName: "Dummy University", // replace with actual data
          ratingPoint: rating,
          reviewComment: comment,
        });
        setReviews([
          res.data.insertedId
            ? { ...res.data, ratingPoint: rating, reviewComment: comment }
            : {},
          ...reviews,
        ]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {" "}
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h2 className="text-3xl font-extrabold text-slate-800">
          My Reviews
        </h2>{" "}
        <button
          onClick={openAddModal}
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition duration-300"
        >
          Add Review{" "}
        </button>{" "}
      </div>{" "}
      {reviews.length === 0 ? (
        <p className="text-lg text-slate-500">No reviews found</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-slate-300 shadow-lg rounded-lg overflow-hidden">
          {" "}
          <thead>
            {" "}
            <tr className="bg-slate-800 text-white">
              {" "}
              <th className="border border-slate-700 px-4 py-3 text-left">
                University
              </th>{" "}
              <th className="border border-slate-700 px-4 py-3 text-left">
                Rating
              </th>{" "}
              <th className="border border-slate-700 px-4 py-3 text-left">
                Comment
              </th>{" "}
              <th className="border border-slate-700 px-4 py-3 text-left">
                Date
              </th>{" "}
              <th className="border border-slate-700 px-4 py-3 text-left">
                Actions
              </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {reviews.map(
              (
                review,
                index // Added: alternating row color for better readability
              ) => (
                <tr
                  key={review._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  {" "}
                  <td className="border border-slate-200 px-4 py-2 text-slate-700">
                    {review.universityName}
                  </td>{" "}
                  <td className="border border-slate-200 px-4 py-2">
                    {" "}
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i} // Kept star color as yellow for standard rating visual
                        className={
                          i < review.ratingPoint
                            ? "text-yellow-500 inline text-lg"
                            : "text-slate-300 inline text-lg"
                        }
                      />
                    ))}{" "}
                  </td>{" "}
                  <td className="border border-slate-200 px-4 py-2 text-slate-700">
                    {review.reviewComment}
                  </td>{" "}
                  <td className="border border-slate-200 px-4 py-2 text-sm text-slate-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>{" "}
                  <td className="border border-slate-200 px-4 py-2 space-x-3">
                    {" "}
                    <button
                      onClick={() => openEditModal(review)} // Changed: text-blue-500 to indigo-600
                      className="text-indigo-600 hover:text-indigo-800 transition duration-150"
                    >
                      <FaEdit className="w-5 h-5" />{" "}
                    </button>
                                     {" "}
                    <button
                      onClick={() => handleDelete(review._id)} // Kept text-red-500 for universal delete/warning color
                      className="text-red-500 hover:text-red-700 transition duration-150"
                    >
                                          <FaTrash className="w-5 h-5" />       
                               {" "}
                    </button>
                                   {" "}
                  </td>
                               {" "}
                </tr>
              )
            )}
                     {" "}
          </tbody>
                 {" "}
        </table>
      )}
            {/* Modal */}     {" "}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                   {" "}
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
                       {" "}
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
                            {currentReview ? "Edit Review" : "Add Review"}     
                   {" "}
            </h3>
                       {" "}
            <div className="mb-4">
                           {" "}
              <label className="block mb-2 font-medium text-slate-700">
                Rating
              </label>
                           {" "}
              <div className="flex space-x-1">
                               {" "}
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={
                      i < rating
                        ? "text-yellow-500 cursor-pointer w-7 h-7"
                        : "text-slate-300 hover:text-yellow-400 cursor-pointer w-7 h-7 transition duration-150"
                    }
                  />
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="mb-6">
                           {" "}
              <label className="block mb-2 font-medium text-slate-700">
                Comment
              </label>
                           {" "}
              <textarea
                className="w-full border border-slate-300 rounded-lg p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 text-slate-800"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
                         {" "}
            </div>
                       {" "}
            <div className="flex justify-end space-x-3">
                           {" "}
              <button
                onClick={() => setModalOpen(false)} // Changed: bg-gray-300 to a more muted slate-400 with dark text
                className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition duration-150"
              >
                                Cancel              {" "}
              </button>
                           {" "}
              <button
                onClick={handleSubmit} // Changed: bg-blue-500 to a premium deep indigo-700
                className="px-5 py-2 bg-indigo-700 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition duration-150"
              >
                                {currentReview ? "Update" : "Submit"}           
                 {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default MyReviews;
