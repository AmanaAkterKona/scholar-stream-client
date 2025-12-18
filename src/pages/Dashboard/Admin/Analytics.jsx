import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, DollarSign, GraduationCap, TrendingUp, 
  Award, Globe, Building2, Calendar 
} from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecute';

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0,
    totalFeesCollected: 0,
    applicationsByUniversity: [],
    applicationsByCategory: [],
    recentActivity: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch all required data
      const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
        axiosSecure.get('/users'),
        axiosSecure.get('/scholarships'),
        axiosSecure.get('/applications'),
      ]);

      const users = usersRes.data;
      const scholarships = scholarshipsRes.data;
      const applications = applicationsRes.data;

      // Calculate total fees collected
      const totalFees = applications.reduce((sum, app) => {
        const appFee = parseFloat(app.applicationFees) || 0;
        const serviceFee = parseFloat(app.serviceCharge) || 0;
        return sum + appFee + serviceFee;
      }, 0);

      // Group applications by university
      const universityMap = {};
      applications.forEach(app => {
        const uni = app.universityName || 'Unknown';
        universityMap[uni] = (universityMap[uni] || 0) + 1;
      });

      const applicationsByUniversity = Object.entries(universityMap)
        .map(([name, count]) => ({ name, applications: count }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 10); // Top 10 universities

      // Group applications by scholarship category
      const categoryMap = {};
      applications.forEach(app => {
        const cat = app.scholarshipCategory || 'Unknown';
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      const applicationsByCategory = Object.entries(categoryMap)
        .map(([name, value]) => ({ name, value }));

      setStats({
        totalUsers: users.length,
        totalScholarships: scholarships.length,
        totalApplications: applications.length,
        totalFeesCollected: totalFees,
        applicationsByUniversity,
        applicationsByCategory,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  // Colors for charts
  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <BarChart className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium animate-pulse">Loading analytics...</p>
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
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Platform Analytics
              </h1>
              <p className="text-slate-600 mt-1">Comprehensive insights and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Users */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>Active</span>
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Users</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {stats.totalUsers.toLocaleString()}
            </p>
            <p className="text-slate-500 text-xs mt-2">Registered members on platform</p>
          </div>

          {/* Total Scholarships */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-500 p-4 rounded-xl shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1 text-violet-600 text-sm font-semibold bg-violet-50 px-3 py-1 rounded-full">
                <Award className="w-4 h-4" />
                <span>Live</span>
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Scholarships</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {stats.totalScholarships.toLocaleString()}
            </p>
            <p className="text-slate-500 text-xs mt-2">Available opportunities</p>
          </div>

          {/* Total Applications */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-4 rounded-xl shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1 text-rose-600 text-sm font-semibold bg-rose-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>Growing</span>
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Applications</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {stats.totalApplications.toLocaleString()}
            </p>
            <p className="text-slate-500 text-xs mt-2">Submitted applications</p>
          </div>

          {/* Total Fees Collected */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-xl shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>Revenue</span>
              </div>
            </div>
            <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Fees Collected</h3>
            <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ${stats.totalFeesCollected.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-slate-500 text-xs mt-2">Application & service fees</p>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Bar Chart - Applications by University */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Applications by University</h2>
                <p className="text-slate-600 text-sm">Top 10 most popular universities</p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.applicationsByUniversity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={120}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <YAxis tick={{ fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #E2E8F0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar 
                  dataKey="applications" 
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Applications by Category */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Applications by Category</h2>
                <p className="text-slate-600 text-sm">Distribution of scholarship types</p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={stats.applicationsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.applicationsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '2px solid #E2E8F0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Average Application Fee */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white/90">Average Fee</h3>
            </div>
            <p className="text-3xl font-bold">
              ${stats.totalApplications > 0 
                ? (stats.totalFeesCollected / stats.totalApplications).toFixed(2) 
                : '0.00'}
            </p>
            <p className="text-white/70 text-sm mt-2">Per application</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white/90">Application Rate</h3>
            </div>
            <p className="text-3xl font-bold">
              {stats.totalScholarships > 0 
                ? (stats.totalApplications / stats.totalScholarships).toFixed(1) 
                : '0.0'}
            </p>
            <p className="text-white/70 text-sm mt-2">Applications per scholarship</p>
          </div>

          {/* Platform Growth */}
          <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white/90">Engagement Score</h3>
            </div>
            <p className="text-3xl font-bold">
              {stats.totalUsers > 0 
                ? ((stats.totalApplications / stats.totalUsers) * 100).toFixed(0) 
                : '0'}%
            </p>
            <p className="text-white/70 text-sm mt-2">User participation rate</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;