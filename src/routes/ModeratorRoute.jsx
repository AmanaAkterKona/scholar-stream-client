import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ModeratorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
                <div className="text-center">
                    <div className="relative mb-6">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-violet-600 mx-auto"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {/* Shield Icon SVG */}
                            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-slate-600 font-medium animate-pulse">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRole = user?.role?.toLowerCase();
    const isModerator = userRole === 'moderator' || userRole === 'admin';

    if (!isModerator) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full mb-4">
                            {/* Shield Icon SVG */}
                            <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">Access Restricted</h2>
                    <p className="text-slate-600 mb-2">You don't have moderator privileges</p>
                    <p className="text-sm text-slate-500 mb-6">
                        Current role: <span className="font-semibold text-indigo-600 capitalize">{user?.role || 'student'}</span>
                    </p>
                    <div className="space-y-3">
                        <a 
                            href="/" 
                            className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                            Go to Home
                        </a>
                        <a 
                            href="/dashboard" 
                            className="block w-full border-2 border-violet-300 text-violet-700 px-8 py-3 rounded-lg hover:bg-violet-50 transition-all duration-300 font-semibold"
                        >
                            My Dashboard
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default ModeratorRoute;