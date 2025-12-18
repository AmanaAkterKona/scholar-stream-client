import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Star, Trash2, Search, MessageSquare, User, Calendar } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecute';

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Fetch all reviews - you'll need to add this endpoint in backend
      const response = await axiosSecure.get('/reviews');
      setReviews(response.data);
      setFilteredReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Unable to fetch reviews. Please try again.',
        confirmButtonColor: '#6366F1',
      });
    }
  };

  // Search
  useEffect(() => {
    if (searchTerm) {
      const result = reviews.filter(
        (review) =>
          review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(result);
    } else {
      setFilteredReviews(reviews);
    }
  }, [searchTerm, reviews]);

  // Delete Review
  const handleDelete = (reviewId, userName) => {
    Swal.fire({
      title: '⚠️ Delete Review?',
      html: `Are you sure you want to delete <strong>${userName}'s</strong> review?<br/><span class="text-sm text-slate-500">This action cannot be undone.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: '🗑️ Yes, Delete',
      cancelButtonText: '✕ Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${reviewId}`);
          setReviews(reviews.filter((r) => r._id !== reviewId));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Review has been removed.',
            confirmButtonColor: '#10B981',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Unable to delete review.',
            confirmButtonColor: '#EF4444',
          });
        }
      }
    });
  };

  // Render Stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-slate-200 text-slate-200'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading reviews...</p>
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
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Reviews
              </h1>
              <p className="text-slate-600 mt-1">Moderate student reviews and feedback</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Total Reviews</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {reviews.length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Average Rating</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {reviews.length > 0
                    ? (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) / reviews.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-xl">
                <Star className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">High Rated (4+)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {reviews.filter(r => (r.ratingPoint || 0) >= 4).length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews by name, university, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
              <span className="font-bold text-lg">{filteredReviews.length}</span>
              <span className="ml-2 font-medium">Results</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <MessageSquare className="w-20 h-20 text-slate-300 mb-4" />
              <p className="text-xl font-bold text-slate-700 mb-2">No Reviews Found</p>
              <p className="text-slate-500">Try adjusting your search</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.userImage || 'https://via.placeholder.com/100'}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-800">{review.userName}</div>
                    <div className="text-xs text-slate-500">{review.userEmail}</div>
                  </div>
                </div>

                {/* University */}
                <div className="mb-3">
                  <div className="text-sm font-semibold text-indigo-600 mb-1">
                    {review.universityName}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.ratingPoint || 0)}
                  <span className="ml-2 text-sm font-semibold text-slate-700">
                    {review.ratingPoint}/5
                  </span>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                    {review.reviewComment}
                  </p>
                </div>

                {/* Date & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(review._id, review.userName)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AllReviews;