import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Shield,
  User,
  Trash2,
  Search,
  Filter,
  Crown,
  Users,
  TrendingUp,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Fetch users 
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosSecure.get("/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Users",
        text: "Unable to fetch user data.",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  // Search and filter
  useEffect(() => {
    let result = users;
    if (searchTerm) {
      result = result.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRole !== "all") {
      result = result.filter(
        (u) => u.role?.toLowerCase() === filterRole.toLowerCase()
      );
    }
    setFilteredUsers(result);
  }, [searchTerm, filterRole, users]);

  // Role change function
  const handleRoleChange = (userId, currentRole, userName) => {
    Swal.fire({
      title: "👤 Change User Role",
      html: `
        <div class="text-left">
          <p class="text-slate-600 mb-4">Select a new role for <strong class="text-indigo-600">${userName}</strong></p>
          <select id="roleSelect" class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 font-bold bg-white">
            <option value="student" ${
              currentRole === "student" ? "selected" : ""
            }>🎓 Student</option>
            <option value="moderator" ${
              currentRole === "moderator" ? "selected" : ""
            }>⚡ Moderator</option>
            <option value="admin" ${
              currentRole === "admin" ? "selected" : ""
            }>👑 Admin</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#94A3B8",
      confirmButtonText: "✓ Update Role",
      preConfirm: () => document.getElementById("roleSelect").value,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newRole = result.value;
        if (newRole === currentRole) return;
        try {
          await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
          setUsers(
            users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
          );
          Swal.fire({
            icon: "success",
            title: "Role Updated!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({ icon: "error", title: "Update Failed" });
        }
      }
    });
  };

  // Delete user
  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: "⚠️ Delete User?",
      html: `Are you sure you want to delete <strong class="text-red-600">${userName}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "🗑️ Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u._id !== userId));
        Swal.fire("Deleted!", "User has been removed.", "success");
      }
    });
  };

  // UI Helpers
  const getRoleBadge = (role) => {
    const roleColors = {
      admin:
        "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200",
      moderator:
        "bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 border border-violet-200",
      student:
        "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200",
    };
    return roleColors[role?.toLowerCase()] || roleColors.student;
  };

  const getRoleIcon = (role) => {
    const r = role?.toLowerCase();
    if (r === "admin") return <Crown className="w-4 h-4" />;
    if (r === "moderator") return <Shield className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
                Manage roles and user access
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase">
                  Total Users
                </p>
                <p className="text-3xl font-black text-slate-900 mt-1">
                  {users.length}
                </p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <Users size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase">
                  Admins
                </p>
                <p className="text-3xl font-black text-rose-600 mt-1">
                  {
                    users.filter((u) => u.role?.toLowerCase() === "admin")
                      .length
                  }
                </p>
              </div>
              <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
                <Crown size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase">
                  Moderators
                </p>
                <p className="text-3xl font-black text-violet-600 mt-1">
                  {
                    users.filter((u) => u.role?.toLowerCase() === "moderator")
                      .length
                  }
                </p>
              </div>
              <div className="bg-violet-50 p-3 rounded-xl text-violet-600">
                <Shield size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-xs font-black uppercase">
                  Students
                </p>
                <p className="text-3xl font-black text-blue-600 mt-1">
                  {
                    users.filter((u) => u.role?.toLowerCase() === "student")
                      .length
                  }
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <User size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar (Fix: Text visible) */}
        <div className="bg-white rounded-[28px] shadow-sm border border-slate-100 p-6 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">User Profile</th>
                  <th className="px-8 py-5">Email Address</th>
                  <th className="px-8 py-5">Role & Access</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"
                          }
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:scale-110 transition-transform duration-200"
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-slate-900">
                            {user.displayName || "No Name"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            Verified User
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-600 text-sm">
                      {user.email}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {getRoleIcon(user.role)}
                        {user.role || "student"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleRoleChange(
                              user._id,
                              user.role,
                              user.displayName
                            )
                          }
                          className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(user._id, user.displayName)
                          }
                          className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
