import React, { useState } from 'react';
import { FaFileContract, FaUserCheck, FaExclamationCircle, FaGavel, FaShieldAlt, FaChevronDown, FaChevronUp, FaCheckCircle } from 'react-icons/fa';
import useTheme from '../Shared/useTheme';


const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showQuickLinks, setShowQuickLinks] = useState(true);
  const [activeQuickLink, setActiveQuickLink] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const scrollToSection = (id, index) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveQuickLink(index);
      
      element.classList.add('ring-2', 'ring-[#0aa6c8]', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#0aa6c8]', 'ring-offset-2');
      }, 2000);
    }
  };

  const termsSections = [
    {
      id: 'acceptance',
      icon: <FaUserCheck className="text-white text-xl" />,
      title: "Acceptance of Terms",
      description: "Agreement to use our services",
      details: [
        {
          subtitle: "Agreement to Terms",
          content: "By accessing or using ScholarStream, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."
        },
        {
          subtitle: "Age Requirement",
          content: "You must be at least 13 years old to use our platform. Users under 18 must have parental or guardian consent. By using our services, you represent that you meet these age requirements."
        },
        {
          subtitle: "Account Registration",
          content: "You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account."
        }
      ]
    },
    {
      id: 'user-responsibilities',
      icon: <FaShieldAlt className="text-white text-xl" />,
      title: "User Responsibilities",
      description: "Your obligations as a platform user",
      details: [
        {
          subtitle: "Accurate Information",
          content: "You must provide truthful and accurate information in your profile and scholarship applications. Misrepresentation or fraud may result in immediate account termination and legal action."
        },
        {
          subtitle: "Prohibited Activities",
          content: "You may not use our platform for spam, harassment, illegal activities, or to distribute malicious software. Do not attempt to gain unauthorized access to our systems or other users' accounts."
        },
        {
          subtitle: "Content Ownership",
          content: "You retain ownership of content you submit but grant us a license to use it for platform operations. Do not upload copyrighted materials without permission or content that violates others' rights."
        },
        {
          subtitle: "Academic Integrity",
          content: "All submitted academic work must be your own. Plagiarism, cheating, or falsification of documents is strictly prohibited and may result in disqualification and account suspension."
        }
      ]
    },
    {
      id: 'scholarship-applications',
      icon: <FaFileContract className="text-white text-xl" />,
      title: "Scholarship Applications",
      description: "Terms related to applying for scholarships",
      details: [
        {
          subtitle: "Application Process",
          content: "We facilitate connections between students and scholarship providers but do not guarantee scholarship awards. Each provider sets their own criteria, deadlines, and selection processes."
        },
        {
          subtitle: "No Guarantee",
          content: "Listing a scholarship on our platform does not guarantee eligibility or award. We are not responsible for provider decisions, delays, or changes to scholarship terms."
        },
        {
          subtitle: "Application Fees",
          content: "While most scholarships are free to apply, some may require application fees. These fees go directly to providers, not to ScholarStream. We clearly indicate when fees apply."
        },
        {
          subtitle: "Withdrawal Rights",
          content: "You may withdraw your application at any time before final selection. However, we cannot guarantee that providers will honor withdrawal requests after certain stages."
        }
      ]
    },
    {
      id: 'provider-terms',
      icon: <FaGavel className="text-white text-xl" />,
      title: "Scholarship Provider Terms",
      description: "Terms for organizations offering scholarships",
      details: [
        {
          subtitle: "Provider Verification",
          content: "All providers must undergo verification before listing scholarships. We reserve the right to request additional documentation and refuse service to any organization."
        },
        {
          subtitle: "Accurate Listing",
          content: "Providers must ensure scholarship information is accurate, complete, and updated. Misleading or fraudulent listings will be removed, and accounts may be terminated."
        },
        {
          subtitle: "Student Data Usage",
          content: "Providers may only use student data for scholarship evaluation purposes. Selling, sharing, or misusing student information is strictly prohibited and may result in legal action."
        },
        {
          subtitle: "Selection Process",
          content: "Providers must conduct fair, transparent selection processes following their stated criteria. Discrimination based on protected characteristics is prohibited."
        }
      ]
    },
    {
      id: 'intellectual-property',
      icon: <FaExclamationCircle className="text-white text-xl" />,
      title: "Intellectual Property",
      description: "Rights and ownership of content",
      details: [
        {
          subtitle: "Platform Ownership",
          content: "All platform design, features, logos, and original content are owned by ScholarStream. You may not copy, modify, or distribute our intellectual property without written permission."
        },
        {
          subtitle: "User Content License",
          content: "By submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, and display it for platform operations, marketing, and improvements."
        },
        {
          subtitle: "Third-Party Content",
          content: "Some content may be owned by third parties. We respect intellectual property rights and will respond to valid infringement claims according to applicable law."
        }
      ]
    },
    {
      id: 'limitation-liability',
      icon: <FaShieldAlt className="text-white text-xl" />,
      title: "Limitation of Liability",
      description: "Our responsibilities and limitations",
      details: [
        {
          subtitle: "Service Availability",
          content: "We strive for 99.9% uptime but do not guarantee uninterrupted service. We are not liable for losses resulting from downtime, technical issues, or service interruptions."
        },
        {
          subtitle: "Third-Party Actions",
          content: "We are not responsible for scholarship provider actions, decisions, or failures. Disputes between users and providers must be resolved directly between the parties."
        },
        {
          subtitle: "Limitation Amount",
          content: "To the maximum extent permitted by law, our total liability for any claims shall not exceed the amount you paid us in the 12 months preceding the claim."
        },
        {
          subtitle: "Disclaimer of Warranties",
          content: "Services are provided 'as is' without warranties of any kind. We do not guarantee accuracy, completeness, or reliability of information on the platform."
        }
      ]
    },
    {
      id: 'termination',
      icon: <FaExclamationCircle className="text-white text-xl" />,
      title: "Account Termination",
      description: "How accounts may be suspended or terminated",
      details: [
        {
          subtitle: "Voluntary Termination",
          content: "You may close your account at any time through account settings. Some data may be retained for legal compliance even after account closure."
        },
        {
          subtitle: "Involuntary Termination",
          content: "We reserve the right to suspend or terminate accounts for violations of these terms, fraudulent activity, or any behavior harmful to the platform or community."
        },
        {
          subtitle: "Effect of Termination",
          content: "Upon termination, your access rights cease immediately. We may delete your data subject to legal retention requirements. Outstanding obligations survive termination."
        }
      ]
    },
    {
      id: 'changes-terms',
      icon: <FaFileContract className="text-white text-xl" />,
      title: "Changes to Terms",
      description: "How we update these terms",
      details: [
        {
          subtitle: "Modification Rights",
          content: "We reserve the right to modify these Terms of Service at any time. Material changes will be communicated via email and platform notifications at least 30 days before taking effect."
        },
        {
          subtitle: "Continued Use",
          content: "Your continued use of the platform after changes take effect constitutes acceptance of the modified terms. If you disagree with changes, you must stop using our services."
        },
        {
          subtitle: "Version History",
          content: "Previous versions of these terms are available upon request. The current version supersedes all prior versions."
        }
      ]
    }
  ];

  const quickLinks = [
    { id: 'acceptance', label: 'Acceptance of Terms' },
    { id: 'user-responsibilities', label: 'User Responsibilities' },
    { id: 'scholarship-applications', label: 'Scholarship Applications' },
    { id: 'provider-terms', label: 'Provider Terms' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'limitation-liability', label: 'Limitation of Liability' },
    { id: 'termination', label: 'Account Termination' },
    { id: 'changes-terms', label: 'Changes to Terms' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#020b17]" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <div className={`transition-colors duration-300 border-b ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${isDark ? "bg-[#0aa6c8]/20 text-[#0aa6c8]" : "bg-[#0aa6c8]/10 text-[#0aa6c8]"}`}>
            <FaFileContract className="text-sm sm:text-base" /> Legal Agreement
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-4 ${isDark ? "text-white" : "text-[#033044]"}`}>
            Terms of <span className="text-[#0aa6c8]">Service</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 mb-4 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Please read these terms carefully before using ScholarStream. By using our platform, you agree to these terms.
          </p>
          <p className={`text-sm ${isDark ? "text-slate-500" : "text-gray-500"}`}>
            Last Updated: January 10, 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg border p-5 sticky top-6 transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
              <button
                onClick={() => setShowQuickLinks(!showQuickLinks)}
                className="flex items-center justify-between w-full mb-4 lg:cursor-default"
              >
                <h3 className={`text-lg font-bold ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Quick Links</h3>
                <span className="lg:hidden text-[#0aa6c8]">
                  {showQuickLinks ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              
              <div className={`space-y-2 ${showQuickLinks ? 'block' : 'hidden lg:block'}`}>
                {quickLinks.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id, index)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeQuickLink === index
                        ? 'bg-[#0aa6c8] text-white shadow-md'
                        : isDark 
                          ? 'text-slate-400 hover:bg-[#0aa6c8]/10 hover:text-[#0aa6c8] hover:translate-x-1'
                          : 'text-gray-700 hover:bg-[#0aa6c8]/10 hover:text-[#0aa6c8] hover:translate-x-1'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Introduction */}
            <div className={`rounded-lg p-5 sm:p-6 mb-10 sm:mb-12 border transition-all duration-300 ${
              isDark 
                ? "bg-slate-900/40 border-[#0aa6c8]/30" 
                : "bg-gradient-to-r from-[#0aa6c8]/10 to-[#0789a6]/10 border-[#0aa6c8]/20"
            }`}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Welcome to ScholarStream</h2>
              <p className={`text-sm sm:text-base leading-relaxed mb-3 ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                These Terms of Service ("Terms") govern your use of ScholarStream's platform and services. By creating an account or using our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                Please read these Terms carefully. If you do not agree to these Terms, do not access or use our services.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-4 mb-10 sm:mb-12">
              {termsSections.map((section, index) => (
                <div 
                  key={index}
                  id={section.id}
                  className={`rounded-lg border overflow-hidden transition-all duration-300 scroll-mt-6 ${
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
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-base sm:text-lg font-bold mb-1 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>
                          {section.title}
                        </h3>
                        <p className={`text-xs sm:text-sm ${isDark ? "text-slate-500" : "text-gray-600"}`}>
                          {section.description}
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
                      <div className="space-y-4">
                        {section.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="pl-4 border-l-2 border-[#0aa6c8]">
                            <h4 className={`font-bold text-sm sm:text-base mb-2 ${isDark ? "text-slate-200" : "text-[#033044]"}`}>
                              {detail.subtitle}
                            </h4>
                            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                              {detail.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className={`rounded-lg p-5 sm:p-6 border mb-10 sm:mb-12 transition-all duration-300 ${
              isDark ? "bg-red-950/20 border-red-900/30" : "bg-red-50 border-red-200"
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${isDark ? "text-red-400" : "text-[#033044]"}`}>
                <FaExclamationCircle className="text-red-600 text-xl sm:text-2xl" /> Important Legal Notice
              </h3>
              <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-[#0aa6c8] text-sm mt-0.5 flex-shrink-0" />
                  <span>These terms constitute a legally binding agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-[#0aa6c8] text-sm mt-0.5 flex-shrink-0" />
                  <span>Violation of these terms may result in account termination</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-[#0aa6c8] text-sm mt-0.5 flex-shrink-0" />
                  <span>We may update these terms with 30 days notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-[#0aa6c8] text-sm mt-0.5 flex-shrink-0" />
                  <span>Contact us immediately if you have questions or concerns</span>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className={`rounded-lg border p-6 sm:p-8 transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#0aa6c8]/10 rounded-full mb-4">
                  <FaGavel className="text-[#0aa6c8] text-2xl" />
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-[#033044]"}`}>
                  Questions About These Terms?
                </h2>
                <p className={`text-sm sm:text-base mb-6 max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  If you have any questions or concerns about these Terms of Service, please contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a 
                    href="mailto:proff.kona@gmail.com"
                    className="inline-block bg-[#0aa6c8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0789a6] transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    Email Legal Team
                  </a>
                  <a 
                    href="/contact"
                    className={`inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold border-2 border-[#0aa6c8] transition-all text-sm sm:text-base ${
                      isDark ? "text-[#0aa6c8] hover:bg-[#0aa6c8]/10" : "text-[#0aa6c8] hover:bg-[#0aa6c8]/5"
                    }`}
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;