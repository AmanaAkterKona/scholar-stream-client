// src/pages/Home/ImpactSection/ImpactSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaUsers, FaUniversity, FaGraduationCap, FaGlobeAmericas } from 'react-icons/fa';

const stats = [
  { id: 1, icon: <FaUsers />, count: "50K+", label: "Happy Students", color: "bg-cyan-500" },
  { id: 2, icon: <FaUniversity />, count: "120+", label: "Partner Universities", color: "bg-teal-500" },
  { id: 3, icon: <FaGraduationCap />, count: "$2.5M", label: "Scholarships Awarded", color: "bg-indigo-500" },
  { id: 4, icon: <FaGlobeAmericas />, count: "45+", label: "Countries Covered", color: "bg-blue-500" },
];

const ImpactSection = () => {
  const navigate = useNavigate(); 

  return (
    <div className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-[#00bcd4] font-bold uppercase tracking-widest text-sm mb-4">Our Achievement</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Making Global Education <span className="text-[#008080]">Accessible</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We bridge the gap between brilliant minds and world-class opportunities. Our numbers speak for our dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div 
              key={item.id} 
              className="group p-10 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-cyan-100 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-inherit rotate-3 group-hover:rotate-0 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-800 mb-2">{item.count}</h3>
              <p className="text-slate-500 font-medium uppercase tracking-wide text-xs">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-[#00bcd4] to-[#008080] p-1 rounded-[40px] shadow-2xl">
          <div className="bg-white rounded-[38px] px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">Ready to start your journey?</h3>
              <p className="text-slate-500 mt-2">Join thousands of students and find your dream scholarship today.</p>
            </div>
            
            <button 
              onClick={() => navigate('/scholarships')}
              className="whitespace-nowrap px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;