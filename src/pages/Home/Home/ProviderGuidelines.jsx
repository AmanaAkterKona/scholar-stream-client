import React, { useState } from 'react';
import { FaCheckCircle, FaClipboardList, FaUserShield, FaLightbulb, FaHandshake, FaChevronDown, FaChevronUp, FaGraduationCap, FaFileAlt, FaUsers, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useTheme from '../Shared/useTheme';


const ProviderGuidelines = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleRegisterClick = () => {
    navigate('/scholarships');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const guidelines = [
    {
      icon: <FaClipboardList className="text-white text-xl" />,
      title: "Scholarship Listing Requirements",
      description: "What you need to list your scholarship",
      details: [
        "Complete scholarship description with clear objectives",
        "Specific eligibility criteria (GPA, field of study, location, etc.)",
        "Application deadline and award announcement date",
        "Award amount and number of scholarships available",
        "Required documents and application process details"
      ]
    },
    {
      icon: <FaUserShield className="text-white text-xl" />,
      title: "Selection & Fairness",
      description: "Ensuring transparent student selection",
      details: [
        "Define clear evaluation criteria upfront",
        "Ensure merit-based and unbiased selection process",
        "No discrimination based on gender, race, or religion",
        "Protect applicant privacy and personal information",
        "Communicate decisions to all applicants in a timely manner"
      ]
    },
    {
      icon: <FaLightbulb className="text-white text-xl" />,
      title: "Provider Best Practices",
      description: "Tips for running successful scholarships",
      details: [
        "Set realistic and achievable eligibility requirements",
        "Provide clear application instructions and examples",
        "Allow sufficient time for students to prepare applications",
        "Offer feedback to help students improve future applications",
        "Share scholarship recipient success stories"
      ]
    },
    {
      icon: <FaHandshake className="text-white text-xl" />,
      title: "Platform Collaboration",
      description: "Working together for student success",
      details: [
        "Keep scholarship listings accurate and up-to-date",
        "Respond to student inquiries within 48 hours",
        "Report any technical issues or concerns promptly",
        "Notify us of any changes to scholarship terms",
        "Provide feedback to improve our platform"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FaUsers className="text-[#0aa6c8] text-2xl" />,
      title: "Reach Thousands of Students",
      description: "Connect with qualified students actively seeking scholarships"
    },
    {
      icon: <FaFileAlt className="text-[#0aa6c8] text-2xl" />,
      title: "Simplified Management",
      description: "Easy-to-use dashboard for tracking applications"
    },
    {
      icon: <FaGraduationCap className="text-[#0aa6c8] text-2xl" />,
      title: "Quality Applicants",
      description: "Access verified student profiles and documents"
    },
    {
      icon: <FaChartLine className="text-[#0aa6c8] text-2xl" />,
      title: "Impact Tracking",
      description: "Monitor scholarship reach and student outcomes"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#020b17]" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <div className={`transition-colors duration-300 border-b ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${isDark ? "bg-[#0aa6c8]/20 text-[#0aa6c8]" : "bg-[#0aa6c8]/10 text-[#0aa6c8]"}`}>
            <FaGraduationCap className="text-sm sm:text-base" /> Scholarship Provider Guidelines
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-4 ${isDark ? "text-white" : "text-[#033044]"}`}>
            Provider <span className="text-[#0aa6c8]">Guidelines</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Help us create opportunities for deserving students. Learn how to offer scholarships on our platform.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Introduction */}
        <div className={`rounded-lg p-5 sm:p-6 mb-10 sm:mb-12 border transition-all duration-300 ${
          isDark 
            ? "bg-slate-900/40 border-[#0aa6c8]/30" 
            : "bg-gradient-to-r from-[#0aa6c8]/10 to-[#0789a6]/10 border-[#0aa6c8]/20"
        }`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Welcome Scholarship Providers!</h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>
            Thank you for your commitment to supporting students' educational journeys. Our platform connects you with motivated students seeking financial assistance. By following these guidelines, you help us maintain a trusted, transparent ecosystem where every student has a fair chance to succeed.
          </p>
        </div>

        {/* Guidelines Sections */}
        <div className="mb-10 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Essential Guidelines</h2>
          <div className="space-y-4">
            {guidelines.map((guideline, index) => (
              <div 
                key={index}
                className={`rounded-lg border overflow-hidden transition-all duration-300 ${
                  isDark 
                    ? "bg-slate-900 border-slate-800 hover:border-slate-700" 
                    : "bg-white border-gray-200 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors ${
                    isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="bg-[#0aa6c8] p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                      {guideline.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base sm:text-lg font-bold mb-1 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>
                        {guideline.title}
                      </h3>
                      <p className={`text-xs sm:text-sm ${isDark ? "text-slate-500" : "text-gray-600"}`}>
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-[#0aa6c8] text-lg sm:text-xl flex-shrink-0 ml-3 sm:ml-4">
                    {activeSection === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>
                
                {activeSection === index && (
                  <div className={`px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t ${
                    isDark ? "bg-slate-800/30 border-slate-800" : "bg-gray-50 border-gray-200"
                  }`}>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {guideline.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2.5 sm:gap-3">
                          <FaCheckCircle className="text-[#0aa6c8] text-sm sm:text-base mt-0.5 sm:mt-1 flex-shrink-0" />
                          <span className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-10 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Why Partner With Us?</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`rounded-lg border p-5 sm:p-6 transition-all duration-300 ${
                  isDark 
                    ? "bg-slate-900 border-slate-800 hover:border-[#0aa6c8]/50" 
                    : "bg-white border-gray-200 hover:border-[#0aa6c8] hover:shadow-sm"
                }`}
              >
                <div className="mb-3">
                  {benefit.icon}
                </div>
                <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>
                  {benefit.title}
                </h3>
                <p className={`text-xs sm:text-sm ${isDark ? "text-slate-500" : "text-gray-600"}`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className={`rounded-lg p-5 sm:p-6 border mb-10 sm:mb-12 transition-all duration-300 ${
          isDark ? "bg-orange-950/20 border-orange-900/30" : "bg-yellow-50 border-yellow-200"
        }`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${isDark ? "text-orange-400" : "text-[#033044]"}`}>
            <span className="text-xl sm:text-2xl">⚠️</span> Important Reminders
          </h3>
          <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
              <span>All scholarship information must be accurate and regularly updated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
              <span>Non-compliance with guidelines may result in scholarship removal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
              <span>Providers are responsible for their scholarship selection process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
              <span>We verify all provider information to protect students</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
              <span>Maintain professional communication with all applicants</span>
            </li>
          </ul>
        </div>

        {/* Process Timeline */}
        <div className={`rounded-lg border p-6 sm:p-8 mb-10 sm:mb-12 transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center ${isDark ? "text-white" : "text-[#033044]"}`}>Scholarship Listing Process</h2>
          <div className="space-y-5 sm:space-y-6">
            {[
              { step: 1, title: "Submit Application", desc: "Register and provide organization details" },
              { step: 2, title: "Verification", desc: "Our team reviews your credentials (2-3 business days)" },
              { step: 3, title: "Create Listing", desc: "Add scholarship details using our easy form" },
              { step: 4, title: "Go Live", desc: "Your scholarship is published and students can apply" }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#0aa6c8] text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold mb-1 text-sm sm:text-base ${isDark ? "text-slate-200" : "text-[#033044]"}`}>{item.title}</h4>
                  <p className={`text-xs sm:text-sm ${isDark ? "text-slate-500" : "text-gray-600"}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`rounded-lg border p-6 sm:p-8 text-center transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${isDark ? "text-white" : "text-[#033044]"}`}>
            Ready to Empower Students?
          </h2>
          <p className={`text-sm sm:text-base mb-5 sm:mb-6 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Join our community of scholarship providers and help students achieve their academic dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={handleRegisterClick}
              className="bg-[#0aa6c8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0789a6] transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
            >
              Register as Provider
            </button>
            <button 
              onClick={handleContactClick}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold border-2 border-[#0aa6c8] transition-all text-sm sm:text-base ${
                isDark ? "text-[#0aa6c8] hover:bg-[#0aa6c8]/10" : "text-[#0aa6c8] hover:bg-[#0aa6c8]/5"
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderGuidelines;