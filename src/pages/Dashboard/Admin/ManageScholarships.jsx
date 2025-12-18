import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Pencil, Trash2, Search, Filter } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecute';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch scholarships
  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await axiosSecure.get('/scholarships');
      setScholarships(response.data);
      setFilteredScholarships(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setLoading(false);
    }
  };

  // Search and filter
  useEffect(() => {
    let result = scholarships;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.universityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter((s) => s.scholarshipCategory === filterCategory);
    }

    setFilteredScholarships(result);
  }, [searchTerm, filterCategory, scholarships]);

  // Delete scholarship
  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${name}"? This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/scholarships/${id}`);
          setScholarships(scholarships.filter((s) => s._id !== id));
          Swal.fire('Deleted!', 'Scholarship has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete scholarship.', 'error');
        }
      }
    });
  };

  // Open edit modal
  const handleEdit = (scholarship) => {
    setEditingScholarship({ ...scholarship });
    setShowEditModal(true);
  };

  // Update scholarship
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Remove _id from the update payload
      const { _id, ...updateData } = editingScholarship;
      
      await axiosSecure.patch(`/scholarships/${_id}`, updateData);
      
      // Update local state
      setScholarships(
        scholarships.map((s) =>
          s._id === _id ? editingScholarship : s
        )
      );
      
      setShowEditModal(false);
      Swal.fire('Updated!', 'Scholarship has been updated.', 'success');
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error!', 'Failed to update scholarship.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Manage Scholarships</h1>
          <p className="text-slate-600">View, edit, and delete scholarship listings</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by scholarship or university name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-slate-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-Fund</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center px-4 py-3 bg-indigo-50 rounded-lg">
              <span className="font-semibold text-indigo-700">
                {filteredScholarships.length} Results
              </span>
            </div>

          </div>
        </div>

        {/* Scholarships Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">University</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Scholarship</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Degree</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Deadline</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredScholarships.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                      <div className="text-6xl mb-4">📚</div>
                      <p className="text-lg font-medium">No scholarships found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredScholarships.map((scholarship) => (
                    <tr key={scholarship._id} className="hover:bg-indigo-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={scholarship.universityImage}
                            alt={scholarship.universityName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-slate-800">
                              {scholarship.universityName}
                            </div>
                            <div className="text-xs text-slate-500">
                              Rank #{scholarship.universityWorldRank}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{scholarship.scholarshipName}</div>
                        <div className="text-sm text-slate-500">{scholarship.subjectCategory}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            scholarship.scholarshipCategory === 'Full fund'
                              ? 'bg-green-100 text-green-700'
                              : scholarship.scholarshipCategory === 'Partial'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {scholarship.scholarshipCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{scholarship.degree}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">{scholarship.universityCity}</div>
                        <div className="text-xs text-slate-500">{scholarship.universityCountry}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-semibold">
                          ${scholarship.applicationFees + scholarship.serviceCharge}
                        </div>
                        <div className="text-xs text-slate-500">Total</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(scholarship)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(scholarship._id, scholarship.scholarshipName)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Edit Scholarship</h2>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Scholarship Name</label>
                  <input
                    type="text"
                    value={editingScholarship.scholarshipName}
                    onChange={(e) => setEditingScholarship({...editingScholarship, scholarshipName: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">University Name</label>
                  <input
                    type="text"
                    value={editingScholarship.universityName}
                    onChange={(e) => setEditingScholarship({...editingScholarship, universityName: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select
                    value={editingScholarship.scholarshipCategory}
                    onChange={(e) => setEditingScholarship({...editingScholarship, scholarshipCategory: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Degree</label>
                  <select
                    value={editingScholarship.degree}
                    onChange={(e) => setEditingScholarship({...editingScholarship, degree: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Application Fees</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingScholarship.applicationFees}
                    onChange={(e) => setEditingScholarship({...editingScholarship, applicationFees: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Service Charge</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingScholarship.serviceCharge}
                    onChange={(e) => setEditingScholarship({...editingScholarship, serviceCharge: parseFloat(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={editingScholarship.applicationDeadline}
                    onChange={(e) => setEditingScholarship({...editingScholarship, applicationDeadline: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
                >
                  Update Scholarship
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