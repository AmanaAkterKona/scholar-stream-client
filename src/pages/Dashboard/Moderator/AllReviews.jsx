import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { 
  Star, 
  Trash2, 
  Search, 
  MessageSquare, 
  Calendar, 
  Mail, 
  GraduationCap,
  Quote
} from 'lucide-react';
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
      const response = await axiosSecure.get('/reviews');
      setReviews(response.data);
      setFilteredReviews(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load',
        text: 'Unable to fetch reviews.',
        confirmButtonColor: '#0f766e',
      });
    }
  };

  useEffect(() => {
    const result = reviews.filter(
      (review) =>
        review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(result);
  }, [searchTerm, reviews]);

  const handleDelete = (reviewId, userName) => {
    Swal.fire({
      title: '⚠️ Delete Review?',
      html: `Are you sure you want to delete <strong>${userName}'s</strong> review?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#be123c',
      cancelButtonColor: '#0f766e',
      confirmButtonText: '🗑️ Yes, Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${reviewId}`);
          setReviews(reviews.filter((r) => r._id !== reviewId));
          Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false });
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Failed!', text: 'Unable to delete.' });
        }
      }
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-700"></div>
        <p className="mt-4 text-teal-800 font-bold animate-pulse">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section - Matching your Scholarship Template */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 py-16 px-6 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl -ml-20 -mb-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
                Review <span className="text-yellow-400">Hub</span>
              </h1>
              <p className="text-teal-100 text-lg font-medium">Manage and moderate student feedback effectively.</p>
            </div>
            
            {/* Search Bar - Matching your template style */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 w-full md:w-[450px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by student, university or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-transparent focus:border-teal-500 focus:outline-none font-medium text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-teal-50 flex items-center gap-4">
                <div className="bg-teal-700 p-4 rounded-2xl text-white shadow-lg shadow-teal-100">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Reviews</p>
                    <p className="text-3xl font-black text-teal-900">{reviews.length}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-teal-50 flex items-center gap-4">
                <div className="bg-yellow-400 p-4 rounded-2xl text-teal-900 shadow-lg shadow-yellow-100">
                    <Star size={24} fill="currentColor" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Avg Rating</p>
                    <p className="text-3xl font-black text-teal-900">
                        {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) / reviews.length).toFixed(1) : '0.0'}
                    </p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-teal-50 flex items-center gap-4">
                <div className="bg-teal-900 p-4 rounded-2xl text-white shadow-lg">
                    <GraduationCap size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Results</p>
                    <p className="text-3xl font-black text-teal-900">{filteredReviews.length}</p>
                </div>
            </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-2xl font-black text-gray-800">No Reviews Found</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                {/* User Info Header */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="relative">
                    <img
                      src={review.userImage || 'https://i.ibb.co/5GzXkwq/user.png'}
                      alt={review.userName}
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-teal-50 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-black text-gray-900 text-lg leading-tight truncate">{review.userName}</h3>
                    <div className="flex items-center gap-1 text-teal-600 font-bold text-xs mt-1">
                      <Mail size={12} />
                      <span className="truncate opacity-75">{review.userEmail}</span>
                    </div>
                  </div>
                </div>

                {/* University Highlight - Boxed Style */}
                <div className="mb-5 bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
                    <div className="flex items-center gap-2 mb-2">
                        <GraduationCap size={16} className="text-teal-700" />
                        <span className="text-[11px] font-black text-teal-800 uppercase tracking-widest">
                            {review.universityName}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">{renderStars(review.ratingPoint || 0)}</div>
                        <span className="text-xs font-black text-gray-700 border-l border-gray-300 pl-2">
                            {review.ratingPoint}.0 Rating
                        </span>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="mb-8 min-h-[90px] relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-teal-100 opacity-50" />
                  <p className="text-gray-700 text-[15px] font-medium leading-relaxed italic pl-4 border-l-2 border-teal-200 line-clamp-4">
                    {review.reviewComment}
                  </p>
                </div>

                {/* Bottom Bar: Date & Delete */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-tighter">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>{new Date(review.reviewDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(review._id, review.userName)}
                    className="p-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm"
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