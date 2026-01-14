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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../Home/Shared/useTheme";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

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
        title: "Failed to Load",
        background: isDark ? "#1e293b" : "#fff",
        color: isDark ? "#f1f5f9" : "#0f172a",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  // Search and filter logic
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
    setCurrentPage(1); // Reset to first page on search/filter
  }, [searchTerm, filterRole, users]);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRoleChange = (userId, currentRole, userName) => {
    Swal.fire({
      title: "👤 Change User Role",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      html: `
        <div class="text-left">
          <p class="${isDark ? "text-slate-300" : "text-slate-600"} mb-4">Select a new role for <strong class="text-indigo-500">${userName}</strong></p>
          <select id="roleSelect" class="w-full px-4 py-3 border-2 ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"} rounded-xl focus:ring-2 focus:ring-indigo-500 font-bold">
            <option value="student" ${currentRole === "student" ? "selected" : ""}>🎓 Student</option>
            <option value="moderator" ${currentRole === "moderator" ? "selected" : ""}>⚡ Moderator</option>
            <option value="admin" ${currentRole === "admin" ? "selected" : ""}>👑 Admin</option>
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
          setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
          Swal.fire({ icon: "success", title: "Role Updated!", background: isDark ? "#1e293b" : "#fff", showConfirmButton: false, timer: 1500 });
        } catch (error) {
          Swal.fire({ icon: "error", title: "Update Failed", background: isDark ? "#1e293b" : "#fff" });
        }
      }
    });
  };

  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: "⚠️ Delete User?",
      html: `Delete <strong class="text-red-600">${userName}</strong>?`,
      icon: "warning",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "🗑️ Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u._id !== userId));
        Swal.fire({ title: "Deleted!", icon: "success", background: isDark ? "#1e293b" : "#fff" });
      }
    });
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      admin: isDark ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-rose-100 text-rose-700 border border-rose-200",
      moderator: isDark ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-100 text-violet-700 border border-violet-200",
      student: isDark ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-100 text-blue-700 border border-blue-200",
    };
    return roleColors[role?.toLowerCase()] || roleColors.student;
  };

  const getRoleIcon = (role) => {
    const r = role?.toLowerCase();
    if (r === "admin") return <Crown className="w-4 h-4" />;
    if (r === "moderator") return <Shield className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  const bgMain = isDark ? "bg-[#0f172a]" : "bg-[#f8fafc]";
  const bgCard = isDark ? "bg-[#1e293b] border-slate-800" : "bg-white border-slate-100";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const inputBg = isDark ? "bg-[#0f172a] border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900";

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${bgMain}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 lg:p-12 transition-colors duration-300 ${bgMain}`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-4xl font-black ${isDark ? "text-white" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"}`}>
                User Management
              </h1>
              <p className={`${textSecondary} font-bold text-xs uppercase tracking-widest mt-1`}>
                Manage roles and user access
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Users", val: users.length, icon: <Users />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Admins", val: users.filter(u => u.role?.toLowerCase() === "admin").length, icon: <Crown />, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Moderators", val: users.filter(u => u.role?.toLowerCase() === "moderator").length, icon: <Shield />, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Students", val: users.filter(u => u.role?.toLowerCase() === "student" || !u.role).length, icon: <User />, color: "text-blue-600", bg: "bg-blue-50" }
          ].map((stat, i) => (
            <div key={i} className={`${bgCard} rounded-2xl shadow-sm border p-6`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`${textSecondary} text-xs font-black uppercase`}>{stat.label}</p>
                  <p className={`text-3xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>{stat.val}</p>
                </div>
                <div className={`${isDark ? "bg-slate-800" : stat.bg} p-3 rounded-xl ${stat.color}`}>
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className={`${bgCard} rounded-[28px] shadow-sm border p-6 mb-8 flex flex-col md:flex-row gap-4`}>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl font-bold placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all border ${inputBg}`}
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`px-6 py-4 rounded-2xl font-bold outline-none cursor-pointer border ${inputBg}`}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className={`${bgCard} rounded-[32px] shadow-xl border overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className={`${isDark ? "bg-slate-800" : "bg-slate-50"} border-b ${isDark ? "border-slate-700" : "border-slate-100"} ${textSecondary} text-[11px] font-black uppercase tracking-widest`}>
                <tr>
                  <th className="px-8 py-5">User Profile</th>
                  <th className="px-8 py-5">Email Address</th>
                  <th className="px-8 py-5">Role & Access</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-50"}`}>
                {currentItems.map((user) => (
                  <tr key={user._id} className={`${isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50/50"} transition-all group`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                          className={`w-12 h-12 rounded-2xl object-cover ring-2 ${isDark ? "ring-slate-700" : "ring-slate-100"} group-hover:scale-110 transition-transform duration-200`}
                          alt=""
                        />
                        <div>
                          <p className={`font-bold ${textPrimary}`}>{user.displayName || "No Name"}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified User</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-8 py-6 font-bold text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {user.email}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${getRoleBadge(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role || "student"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleRoleChange(user._id, user.role, user.displayName)}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border shadow-sm ${
                            isDark 
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-600 hover:text-white" 
                              : "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white"
                          }`}
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.displayName)}
                          className={`p-2.5 rounded-xl transition-all border shadow-sm ${
                            isDark 
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-600 hover:text-white" 
                              : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white"
                          }`}
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-xl transition-all ${
                isDark ? "hover:bg-slate-800 text-slate-500 disabled:opacity-20" : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-11 h-11 rounded-xl font-bold transition-all ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-xl transition-all ${
                isDark ? "hover:bg-slate-800 text-slate-500 disabled:opacity-20" : "hover:bg-slate-200 text-slate-600 disabled:opacity-30"
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;