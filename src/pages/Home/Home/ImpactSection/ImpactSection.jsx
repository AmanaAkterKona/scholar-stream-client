
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaUsers, FaUniversity, FaGraduationCap, FaGlobeAmericas } from 'react-icons/fa';
import useTheme from "../../Shared/useTheme"; 

const stats = [
  { id: 1, icon: <FaUsers />, count: "50K+", label: "Happy Students", color: "bg-cyan-500" },
  { id: 2, icon: <FaUniversity />, count: "120+", label: "Partner Universities", color: "bg-teal-500" },
  { id: 3, icon: <FaGraduationCap />, count: "$2.5M", label: "Scholarships Awarded", color: "bg-indigo-500" },
  { id: 4, icon: <FaGlobeAmericas />, count: "45+", label: "Countries Covered", color: "bg-blue-500" },
];

const ImpactSection = () => {
  const navigate = useNavigate(); 
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ================= THEME STYLES ================= */
  const sectionBg = isDark 
    ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]" 
    : "bg-white";

  const titleColor = isDark ? "text-white" : "text-slate-900";
  const spanColor = isDark ? "text-[#37c4ef]" : "text-[#008080]";
  const descColor = isDark ? "text-gray-400" : "text-slate-500";
  
  const cardStyle = isDark 
    ? "bg-[#041e2b]/95 border-[#37c4ef]/20 shadow-black/40 hover:shadow-[#37c4ef]/10" 
    : "bg-white border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-cyan-100";

  const cardCount = isDark ? "text-white" : "text-slate-800";
  
  const ctaInnerBg = isDark ? "bg-[#05293a]" : "bg-white";
  const ctaBtn = isDark 
    ? "bg-[#37c4ef] hover:bg-[#1faed1] text-white" 
    : "bg-slate-900 text-white hover:bg-slate-800";

  const decoColor = isDark ? "bg-[#37c4ef]/10" : "bg-cyan-50";
  /* ================================================ */

  return (
    <div className={`py-24 px-6 relative overflow-hidden transition-colors duration-700 ${sectionBg}`}>
      {/* Decorative background elements */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 ${decoColor}`}></div>
      <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-50 -ml-32 -mb-32 ${isDark ? "bg-[#008080]/10" : "bg-teal-50"}`}></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className={`font-bold uppercase tracking-widest text-sm mb-4 ${isDark ? "text-[#37c4ef]" : "text-[#00bcd4]"}`}>
            Our Achievement
          </h4>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 ${titleColor}`}>
            Making Global Education <span className={spanColor}>Accessible</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${descColor}`}>
            We bridge the gap between brilliant minds and world-class opportunities. Our numbers speak for our dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <div 
              key={item.id} 
              className={`group p-10 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center ${cardStyle}`}
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-inherit rotate-3 group-hover:rotate-0 transition-transform`}>
                {item.icon}
              </div>
              <h3 className={`text-4xl font-black mb-2 ${cardCount}`}>{item.count}</h3>
              <p className={`font-medium uppercase tracking-wide text-xs ${descColor}`}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-[#00bcd4] to-[#008080] p-1 rounded-[40px] shadow-2xl">
          <div className={`rounded-[38px] px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-700 ${ctaInnerBg}`}>
            <div className="text-left">
              <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                Ready to start your journey?
              </h3>
              <p className={`mt-2 ${descColor}`}>
                Join thousands of students and find your dream scholarship today.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/scholarships')}
              className={`whitespace-nowrap px-10 py-4 font-bold rounded-2xl transition-all shadow-lg active:scale-95 ${ctaBtn}`}
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