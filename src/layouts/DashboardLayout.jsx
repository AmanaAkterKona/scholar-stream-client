import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../pages/Home/Shared/Navbar/Navbar";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive 
      ? "block p-3 mb-2 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg transition-all" 
      : "block p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const role = user?.role?.toLowerCase();
  const displayName = user?.name || user?.displayName || "No Name";
  const photoURL =
    user?.photoURL || "https://i.ibb.co.com/rDV5myG/IMG-20240606-162231-915.jpg";

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-br from-slate-50 to-slate-100 border-r border-slate-200 p-6">
          
          {/* User Profile */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-slate-300">
            <div className="relative mb-3">
              <img
                src={photoURL}
                alt={displayName}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="font-bold text-slate-800 text-lg">{displayName}</span>
            <span className="text-sm px-3 py-1 mt-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold capitalize">
              {role}
            </span>
          </div>

          {/* Navigation Links */}
          <nav>
            {/* Admin Links */}
            {role === "admin" && (
              <>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
                  Admin Panel
                </div>
                <NavLink to="/dashboard/add-scholarship" className={linkClass}>
                  ➕ Add Scholarship
                </NavLink>
                <NavLink to="/dashboard/manage-scholarships" className={linkClass}>
                  📚 Manage Scholarships
                </NavLink>
                <NavLink to="/dashboard/manage-users" className={linkClass}>
                  👥 Manage Users
                </NavLink>
                <NavLink to="/dashboard/analytics" className={linkClass}>
                  📊 Analytics
                </NavLink>
                
                {/* Moderator Panel for Admin */}
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 mt-6 px-3">
                  Moderator Panel
                </div>
                <NavLink to="/dashboard/manage-applications" className={linkClass}>
                  📝 Manage Applications
                </NavLink>
                <NavLink to="/dashboard/reviews" className={linkClass}>
                  ⭐ All Reviews
                </NavLink>
              </>
            )}

            {/* Moderator Links */}
            {role === "moderator" && (
              <>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
                  Moderator Panel
                </div>
                <NavLink to="/dashboard/manage-applications" className={linkClass}>
                  📝 Manage Applications
                </NavLink>
                <NavLink to="/dashboard/reviews" className={linkClass}>
                  ⭐ All Reviews
                </NavLink>
              </>
            )}

            {/* Student Links */}
            {role === "student" && (
              <>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
                  My Dashboard
                </div>
                <NavLink to="/dashboard/my-applications" className={linkClass}>
                  📝 My Applications
                </NavLink>
                <NavLink to="/dashboard/my-reviews" className={linkClass}>
                  ⭐ My Reviews
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;