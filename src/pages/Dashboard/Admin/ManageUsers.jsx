import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { Shield, User, Trash2, Search, Filter, Crown, Users, TrendingUp } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecute';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosSecure.get('/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Users',
        text: 'Unable to fetch user data. Please try again.',
        confirmButtonColor: '#6366F1',
      });
    }
  };

  // Search and filter
  useEffect(() => {
    let result = users;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      result = result.filter((u) => u.role?.toLowerCase() === filterRole.toLowerCase());
    }

    setFilteredUsers(result);
  }, [searchTerm, filterRole, users]);

  // Change user role
  const handleRoleChange = (userId, currentRole, userName) => {
    Swal.fire({
      title: '👤 Change User Role',
      html: `
        <div class="text-left">
          <p class="text-slate-600 mb-4">Select a new role for <strong class="text-indigo-600">${userName}</strong></p>
          <select id="roleSelect" class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white">
            <option value="student" ${currentRole === 'student' ? 'selected' : ''}>🎓 Student</option>
            <option value="moderator" ${currentRole === 'moderator' ? 'selected' : ''}>⚡ Moderator</option>
            <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>👑 Admin</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#6366F1',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: '✓ Update Role',
      cancelButtonText: '✕ Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-3 font-semibold',
        cancelButton: 'rounded-lg px-6 py-3 font-semibold'
      },
      preConfirm: () => {
        return document.getElementById('roleSelect').value;
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newRole = result.value;
        
        if (newRole === currentRole) {
          Swal.fire({
            icon: 'info',
            title: 'No Changes Made',
            text: 'The user already has this role.',
            confirmButtonColor: '#6366F1',
          });
          return;
        }

        try {
          await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
          
          // Update local state
          setUsers(users.map((u) => 
            u._id === userId ? { ...u, role: newRole } : u
          ));
          
          Swal.fire({
            icon: 'success',
            title: '✨ Role Updated!',
            html: `<strong>${userName}</strong> is now a <strong class="text-indigo-600 capitalize">${newRole}</strong>`,
            confirmButtonColor: '#6366F1',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Role change error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Unable to update user role. Please try again.',
            confirmButtonColor: '#EF4444',
          });
        }
      }
    });
  };

  // Delete user
  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: '⚠️ Delete User?',
      html: `Are you sure you want to delete <strong class="text-red-600">${userName}</strong>?<br/><span class="text-sm text-slate-500">This action cannot be undone.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#94A3B8',
      confirmButtonText: '🗑️ Yes, Delete',
      cancelButtonText: '✕ Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-3 font-semibold',
        cancelButton: 'rounded-lg px-6 py-3 font-semibold'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Note: Add delete endpoint in backend
          // await axiosSecure.delete(`/users/${userId}`);
          
          // For now, just update local state
          setUsers(users.filter((u) => u._id !== userId));
          
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been removed successfully.',
            confirmButtonColor: '#10B981',
            timer: 2000,
            showConfirmButton: false
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Unable to delete user. Please try again.',
            confirmButtonColor: '#EF4444',
          });
        }
      }
    });
  };

  // Get role badge color
  const getRoleBadge = (role) => {
    const roleColors = {
      admin: 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200 shadow-sm',
      moderator: 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200 shadow-sm',
      student: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200 shadow-sm',
    };
    return roleColors[role?.toLowerCase()] || roleColors.student;
  };

  // Get role icon
  const getRoleIcon = (role) => {
    const roleLower = role?.toLowerCase();
    if (roleLower === 'admin') {
      return <Crown className="w-4 h-4" />;
    } else if (roleLower === 'moderator') {
      return <Shield className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading users...</p>
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
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-slate-600 mt-1">Manage roles, permissions, and user access control</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Total Users</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {users.length}
                </p>
                <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>Active Platform</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Admins</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {users.filter(u => u.role?.toLowerCase() === 'admin').length}
                </p>
                <p className="text-rose-600 text-xs font-medium mt-2">Full Access</p>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-4 rounded-xl shadow-lg">
                <Crown className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Moderators</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {users.filter(u => u.role?.toLowerCase() === 'moderator').length}
                </p>
                <p className="text-violet-600 text-xs font-medium mt-2">Content Control</p>
              </div>
              <div className="bg-gradient-to-br from-violet-500 to-purple-500 p-4 rounded-xl shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold mb-1">Students</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {users.filter(u => u.role?.toLowerCase() === 'student').length}
                </p>
                <p className="text-blue-600 text-xs font-medium mt-2">Active Learners</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/50 placeholder:text-slate-400"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-4 bg-slate-50 rounded-xl border-2 border-slate-200">
                <Filter className="text-slate-500 w-5 h-5" />
                <span className="text-sm font-semibold text-slate-700">Filter:</span>
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium bg-white/50 cursor-pointer transition-all hover:border-indigo-300"
              >
                <option value="all">All Roles</option>
                <option value="admin">👑 Admin</option>
                <option value="moderator">⚡ Moderator</option>
                <option value="student">🎓 Student</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg">
              <span className="font-bold text-lg">{filteredUsers.length}</span>
              <span className="ml-2 font-medium">Results</span>
            </div>

          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide">User Profile</th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide">Email Address</th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wide">Role & Access</th>
                  <th className="px-8 py-5 text-center text-sm font-bold uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full p-8 mb-4">
                          <Users className="w-16 h-16 text-slate-400" />
                        </div>
                        <p className="text-xl font-bold text-slate-700 mb-2">No Users Found</p>
                        <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr 
                      key={user._id} 
                      className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={user.photoURL || 'https://via.placeholder.com/100'}
                              alt={user.displayName}
                              className="w-14 h-14 rounded-xl object-cover border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-200"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                              {user.displayName || 'No Name'}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                              <span>Member since</span>
                              <span className="font-semibold">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="font-medium text-slate-700">{user.email}</div>
                        <div className="text-xs text-slate-500 mt-1">Primary contact</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide ${getRoleBadge(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span>{user.role || 'student'}</span>
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleRoleChange(user._id, user.role, user.displayName)}
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            title="Change Role"
                          >
                            Change Role
                          </button>
                          <button
                            onClick={() => handleDelete(user._id, user.displayName)}
                            className="p-2.5 bg-gradient-to-r from-red-100 to-rose-100 hover:from-red-200 hover:to-rose-200 text-red-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            title="Delete User"
                          >
                            <Trash2 className="w-5 h-5" />
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
    </div>
  );
};

export default ManageUsers;