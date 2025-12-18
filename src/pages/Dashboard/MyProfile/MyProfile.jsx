import React from "react";
import useAuth from "../../../hooks/useAuth";


const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co/2kR5zq0/user-placeholder.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">
            {user?.displayName || "User Name"}
          </h3>

          <p className="text-gray-600 mt-1">
            {user?.email}
          </p>

          {/* Role Badge */}
          <div className="mt-3">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold
              ${
                user?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : user?.role === "moderator"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user?.role?.toUpperCase()}
            </span>
          </div>

          {/* Extra Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-semibold text-gray-800">
                Active
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Joined As</p>
              <p className="font-semibold text-gray-800">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Info Section */}
      {user?.role === "admin" && (
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h4 className="text-xl font-semibold text-blue-800 mb-2">
            Admin Privileges
          </h4>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Add & manage scholarships</li>
            <li>Manage users & roles</li>
            <li>View platform analytics</li>
            <li>Moderate all activities</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
