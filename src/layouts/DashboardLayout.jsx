import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Navbar from "../pages/Home/Shared/Navbar/Navbar";
import useAuth from "../hooks/useAuth";
import useTheme from "../pages/Home/Shared/useTheme";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive 
      ? "block p-3 mb-2 font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg transition-all shadow-lg shadow-indigo-500/20" 
      : `block p-3 mb-2 transition-all rounded-lg ${
          isDark 
            ? "text-slate-400 hover:bg-slate-800 hover:text-white" 
            : "text-gray-700 hover:bg-gray-200"
        }`;

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDark ? "bg-[#020b17]" : "bg-white"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const role = user?.role?.toLowerCase();
  const displayName = user?.name || user?.displayName || "No Name";
  const photoURL =
    user?.photoURL || "https://i.ibb.co.com/rDV5myG/IMG-20240606-162231-915.jpg";

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`transition-colors duration-300 ${isDark ? "bg-[#020b17]" : "bg-white"}`}>
      <Navbar />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-20 left-4 z-50 lg:hidden p-3 rounded-lg shadow-lg transition-all ${
          isDark 
            ? "bg-slate-800 text-white hover:bg-slate-700" 
            : "bg-white text-slate-800 hover:bg-slate-100"
        }`}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex min-h-screen relative">
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-64 lg:w-64
          border-r transition-all duration-300 p-6 
          z-40
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDark 
            ? "bg-slate-900 border-slate-800" 
            : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200"
          }
          overflow-y-auto
        `}>
          
          {/* User Profile */}
          <div className={`flex flex-col items-center mb-8 pb-6 border-b transition-colors duration-300 ${
            isDark ? "border-slate-800" : "border-slate-300"
          }`}>
            <div className="relative mb-3">
              <img
                src={photoURL}
                alt={displayName}
                className={`w-20 h-20 rounded-full object-cover border-4 shadow-lg ${
                  isDark ? "border-slate-800" : "border-white"
                }`}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className={`font-bold text-lg text-center ${isDark ? "text-white" : "text-slate-800"}`}>
              {displayName}
            </span>
            <span className={`text-sm px-3 py-1 mt-2 rounded-full font-semibold capitalize ${
              isDark ? "bg-indigo-900/40 text-indigo-400" : "bg-indigo-100 text-indigo-700"
            }`}>
              {role}
            </span>
          </div>

          {/* Navigation Links */}
          <nav>
            {/* Admin Links */}
            {role === "admin" && (
              <>
                <div className={`text-xs font-bold uppercase tracking-wider mb-3 px-3 ${
                  isDark ? "text-slate-500" : "text-slate-500"
                }`}>
                  Admin Panel
                </div>
                <NavLink to="/dashboard/add-scholarship" className={linkClass} onClick={closeSidebar}>
                  ➕ Add Scholarship
                </NavLink>
                <NavLink to="/dashboard/manage-scholarships" className={linkClass} onClick={closeSidebar}>
                  📚 Manage Scholarships
                </NavLink>
                <NavLink to="/dashboard/manage-users" className={linkClass} onClick={closeSidebar}>
                  👥 Manage Users
                </NavLink>
                <NavLink to="/dashboard/analytics" className={linkClass} onClick={closeSidebar}>
                  📊 Analytics
                </NavLink>
                
                {/* Moderator Panel for Admin */}
                <div className={`text-xs font-bold uppercase tracking-wider mb-3 mt-6 px-3 ${
                  isDark ? "text-slate-500" : "text-slate-500"
                }`}>
                  Moderator Panel
                </div>
                <NavLink to="/dashboard/manage-applications" className={linkClass} onClick={closeSidebar}>
                  📝 Manage Applications
                </NavLink>
                <NavLink to="/dashboard/reviews" className={linkClass} onClick={closeSidebar}>
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
                <NavLink to="/dashboard/manage-applications" className={linkClass} onClick={closeSidebar}>
                  📝 Manage Applications
                </NavLink>
                <NavLink to="/dashboard/reviews" className={linkClass} onClick={closeSidebar}>
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
                <NavLink to="/dashboard/my-applications" className={linkClass} onClick={closeSidebar}>
                  📝 My Applications
                </NavLink>
                <NavLink to="/dashboard/my-reviews" className={linkClass} onClick={closeSidebar}>
                  ⭐ My Reviews
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 w-full min-h-screen ${
          isDark 
            ? "bg-[#020b17]" 
            : "bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50"
        }`}>
          <div className="lg:p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;