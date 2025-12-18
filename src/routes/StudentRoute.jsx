import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isStudent = user?.role?.toLowerCase() === 'student';

    if (!isStudent) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md">
                    <div className="text-yellow-500 text-7xl mb-6">⚠️</div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">Access Denied</h2>
                    <p className="text-slate-600 mb-2">This area is for students only</p>
                    <p className="text-sm text-slate-500 mb-6">Current role: <span className="font-semibold text-emerald-600 capitalize">{user?.role || 'unknown'}</span></p>
                    <a 
                        href="/" 
                        className="inline-block bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    return children;
};

export default StudentRoute;