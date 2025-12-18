import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Star, Trash2, Search, MessageSquare, User, Calendar, Mail, GraduationCap } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-50 p-6">
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
              <Search className="absolute  left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews by name, university, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700"
              />
            </div>

            <div className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
              <span className="font-bold text-lg">{filteredReviews.length}</span>
              <span className="ml-2 font-medium">Results</span>
            </div>
          </div>
        </div>
{/* Reviews Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredReviews.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
      <MessageSquare className="w-20 h-20 text-slate-200 mb-4" />
      <p className="text-2xl font-black text-slate-800 mb-2">No Reviews Found</p>
      <p className="text-slate-500 font-bold">Try adjusting your search criteria</p>
    </div>
  ) : (
    filteredReviews.map((review) => (
      <div
        key={review._id}
        className="group bg-white rounded-[32px] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-indigo-500 hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
      >
        {/* Floating Accent Background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-bl-full -mr-10 -mt-10 group-hover:bg-indigo-100 transition-colors"></div>

        {/* User Info Section */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="relative">
            <img
              src={review.userImage || 'https://i.ibb.co/5GzXkwq/user.png'}
              alt={review.userName}
              className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 shadow-md group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-black text-slate-900 text-lg leading-tight truncate">
              {review.userName}
            </div>
            <div className="flex items-center gap-1 text-indigo-600/70 font-bold text-xs mt-1">
              <Mail size={12} />
              <span className="truncate">{review.userEmail}</span>
            </div>
          </div>
        </div>

        {/* University Highlight */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {review.universityName}
          </span>
        </div>

        {/* Rating Star Section */}
        <div className="flex items-center gap-3 mb-5 bg-slate-50 w-fit px-4 py-2 rounded-2xl border border-slate-100">
          <div className="flex gap-0.5">
            {renderStars(review.ratingPoint || 0)}
          </div>
          <span className="text-sm font-black text-slate-900 border-l border-slate-200 pl-3">
            {review.ratingPoint}.0
          </span>
        </div>

        {/* Comment - Highly Highlighted */}
        <div className="mb-8 min-h-[80px]">
          <p className="text-slate-700 text-[15px] font-bold leading-relaxed italic relative">
             <span className="text-4xl text-indigo-100 absolute -top-4 -left-2 font-serif">“</span>
             {review.reviewComment}
          </p>
        </div>

        {/* Bottom Bar: Date & Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 relative z-10">
          <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-tighter">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(review.reviewDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
          
          <button
            onClick={() => handleDelete(review._id, review.userName)}
            className="p-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-2xl transition-all duration-300 transform group-hover:rotate-6 shadow-sm hover:shadow-rose-200"
            title="Remove Review"
          >
            <Trash2 className="w-5 h-5" />
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