import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecute';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddScholarship = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
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
      scholarshipPostDate: new Date().toISOString().split('T')[0],
      postedUserEmail: user.email,
    };

    try {
      const response = await axiosSecure.post('/scholarships', scholarshipData);
      
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Scholarship added successfully',
          confirmButtonColor: '#4F46E5',
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add scholarship',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Add New Scholarship</h1>
          <p className="text-slate-600">Fill in the details to create a new scholarship opportunity</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-8">
          
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-indigo-200">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Scholarship Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Scholarship Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('scholarshipName', { required: 'Scholarship name is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., Merit-Based Excellence Scholarship"
                />
                {errors.scholarshipName && (
                  <p className="text-red-500 text-sm mt-1">{errors.scholarshipName.message}</p>
                )}
              </div>

              {/* University Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('universityName', { required: 'University name is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., Harvard University"
                />
                {errors.universityName && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityName.message}</p>
                )}
              </div>

              {/* University Image URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  University Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  {...register('universityImage', { required: 'Image URL is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.universityImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityImage.message}</p>
                )}
              </div>

            </div>
          </div>

          {/* Location & Ranking */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-indigo-200">
              Location & Ranking
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Country */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('universityCountry', { required: 'Country is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., United States"
                />
                {errors.universityCountry && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityCountry.message}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('universityCity', { required: 'City is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., Cambridge"
                />
                {errors.universityCity && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityCity.message}</p>
                )}
              </div>

              {/* World Rank */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  World Rank <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('universityWorldRank', { required: 'World rank is required', min: 1 })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., 1"
                />
                {errors.universityWorldRank && (
                  <p className="text-red-500 text-sm mt-1">{errors.universityWorldRank.message}</p>
                )}
              </div>

            </div>
          </div>

          {/* Academic Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-indigo-200">
              Academic Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Subject Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('subjectCategory', { required: 'Subject category is required' })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select Subject</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business">Business</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Social Sciences">Social Sciences</option>
                </select>
                {errors.subjectCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.subjectCategory.message}</p>
                )}
              </div>

              {/* Scholarship Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Scholarship Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('scholarshipCategory', { required: 'Scholarship category is required' })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
                {errors.scholarshipCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.scholarshipCategory.message}</p>
                )}
              </div>

              {/* Degree */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('degree', { required: 'Degree is required' })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
                {errors.degree && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
                )}
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('applicationDeadline', { required: 'Deadline is required' })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                {errors.applicationDeadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline.message}</p>
                )}
              </div>

            </div>
          </div>

          {/* Financial Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-indigo-200">
              Financial Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Tuition Fees */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tuition Fees (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('tuitionFees')}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., 50000"
                />
              </div>

              {/* Application Fees */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Application Fees <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('applicationFees', { required: 'Application fees is required', min: 0 })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., 100"
                />
                {errors.applicationFees && (
                  <p className="text-red-500 text-sm mt-1">{errors.applicationFees.message}</p>
                )}
              </div>

              {/* Service Charge */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Service Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('serviceCharge', { required: 'Service charge is required', min: 0 })}
                  className="w-full text-blue-600 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="e.g., 50"
                />
                {errors.serviceCharge && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceCharge.message}</p>
                )}
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Scholarship'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddScholarship;