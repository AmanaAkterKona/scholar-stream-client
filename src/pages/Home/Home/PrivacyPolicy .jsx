import React, { useState } from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaDatabase, FaCookieBite, FaEnvelope, FaChevronDown, FaChevronUp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import useTheme from '../Shared/useTheme';


const PrivacyPolicy = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeSection, setActiveSection] = useState(null);
  const [showQuickLinks, setShowQuickLinks] = useState(true);
  const [activeQuickLink, setActiveQuickLink] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const scrollToSection = (id, index) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveQuickLink(index);
      
      // Highlight effect on the section
      element.classList.add('ring-2', 'ring-[#0aa6c8]', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#0aa6c8]', 'ring-offset-2');
      }, 2000);
    }
  };

  const privacySections = [
    {
      id: 'information-collection',
      icon: <FaDatabase className="text-white text-xl" />,
      title: "Information We Collect",
      description: "What data we gather and why",
      details: [
        {
          subtitle: "Personal Information",
          content: "Name, email address, phone number, educational background, and academic records when you register or apply for scholarships."
        },
        {
          subtitle: "Usage Data",
          content: "Information about how you interact with our platform, including pages visited, time spent, and features used."
        },
        {
          subtitle: "Device Information",
          content: "IP address, browser type, operating system, and device identifiers for security and optimization purposes."
        },
        {
          subtitle: "Documents & Files",
          content: "Transcripts, recommendation letters, essays, and other documents you upload as part of scholarship applications."
        }
      ]
    },
    {
      id: 'data-usage',
      icon: <FaLock className="text-white text-xl" />,
      title: "How We Use Your Data",
      description: "The purposes behind data collection",
      details: [
        {
          subtitle: "Scholarship Processing",
          content: "To match you with relevant scholarships, process applications, and facilitate communication with scholarship providers."
        },
        {
          subtitle: "Platform Improvement",
          content: "To analyze usage patterns, improve features, fix bugs, and enhance overall user experience."
        },
        {
          subtitle: "Communication",
          content: "To send important updates, notifications about application status, and relevant scholarship opportunities."
        },
        {
          subtitle: "Security & Fraud Prevention",
          content: "To protect your account, detect suspicious activity, and maintain platform integrity."
        }
      ]
    },
    {
      id: 'data-sharing',
      icon: <FaUserSecret className="text-white text-xl" />,
      title: "Data Sharing & Disclosure",
      description: "When and how we share information",
      details: [
        {
          subtitle: "Scholarship Providers",
          content: "Your application data is shared only with scholarship providers you choose to apply to, with your explicit consent."
        },
        {
          subtitle: "Service Providers",
          content: "Trusted third-party services for hosting, analytics, and payment processing, bound by strict confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          content: "We may disclose information when required by law, court order, or to protect our rights and users' safety."
        },
        {
          subtitle: "Business Transfers",
          content: "In case of merger, acquisition, or sale, your data may be transferred with advance notice and consent options."
        }
      ]
    },
    {
      id: 'data-security',
      icon: <FaShieldAlt className="text-white text-xl" />,
      title: "Data Security Measures",
      description: "How we protect your information",
      details: [
        {
          subtitle: "Encryption",
          content: "All data transmissions use SSL/TLS encryption. Sensitive information is encrypted at rest using industry-standard protocols."
        },
        {
          subtitle: "Access Controls",
          content: "Strict role-based access controls ensure only authorized personnel can access user data on a need-to-know basis."
        },
        {
          subtitle: "Regular Audits",
          content: "We conduct regular security audits, penetration testing, and vulnerability assessments to identify and fix potential risks."
        },
        {
          subtitle: "Data Backup",
          content: "Regular backups are maintained in secure, geographically distributed locations with strict access controls."
        }
      ]
    },
    {
      id: 'cookies',
      icon: <FaCookieBite className="text-white text-xl" />,
      title: "Cookies & Tracking",
      description: "How we use cookies and similar technologies",
      details: [
        {
          subtitle: "Essential Cookies",
          content: "Required for basic platform functionality, including session management, authentication, and security features."
        },
        {
          subtitle: "Analytics Cookies",
          content: "Help us understand how users interact with our platform, enabling us to improve performance and user experience."
        },
        {
          subtitle: "Preference Cookies",
          content: "Remember your settings, language preferences, and customization choices for a personalized experience."
        },
        {
          subtitle: "Managing Cookies",
          content: "You can control cookie preferences through your browser settings, though this may limit some platform features."
        }
      ]
    },
    {
      id: 'user-rights',
      icon: <FaCheckCircle className="text-white text-xl" />,
      title: "Your Rights & Choices",
      description: "What control you have over your data",
      details: [
        {
          subtitle: "Access & Portability",
          content: "Request a copy of all personal data we hold about you in a commonly used, machine-readable format."
        },
        {
          subtitle: "Correction",
          content: "Update or correct inaccurate personal information through your account settings or by contacting us."
        },
        {
          subtitle: "Deletion",
          content: "Request deletion of your account and associated data, subject to legal retention requirements."
        },
        {
          subtitle: "Opt-Out",
          content: "Unsubscribe from marketing communications anytime while continuing to receive essential service updates."
        }
      ]
    }
  ];

  const quickLinks = [
    { id: 'information-collection', label: 'Information Collection' },
    { id: 'data-usage', label: 'Data Usage' },
    { id: 'data-sharing', label: 'Data Sharing' },
    { id: 'data-security', label: 'Security Measures' },
    { id: 'cookies', label: 'Cookies & Tracking' },
    { id: 'user-rights', label: 'Your Rights' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#020b17]" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <div className={`transition-colors duration-300 border-b ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${isDark ? "bg-[#0aa6c8]/20 text-[#0aa6c8]" : "bg-[#0aa6c8]/10 text-[#0aa6c8]"}`}>
            <FaShieldAlt className="text-sm sm:text-base" /> Privacy & Security
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-4 ${isDark ? "text-white" : "text-[#033044]"}`}>
            Privacy <span className="text-[#0aa6c8]">Policy</span>
          </h1>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto px-4 mb-4 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500">
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
                <h3 className={`text-lg font-bold ${isDark ? "text-slate-200" : "text-[#033044]"}`}>Quick Links</h3>
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
                          ? 'text-slate-400 hover:bg-slate-800 hover:text-[#0aa6c8]' 
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
              <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${isDark ? "text-slate-100" : "text-[#033044]"}`}>Our Commitment to Your Privacy</h2>
              <p className={`text-sm sm:text-base leading-relaxed mb-3 ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                At our scholarship platform, we are committed to protecting your privacy and handling your personal information responsibly. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
              </p>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                By using our platform, you agree to the practices described in this policy. We encourage you to read it carefully and contact us if you have any questions.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-4 mb-10 sm:mb-12">
              {privacySections.map((section, index) => (
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
                            <h4 className={`font-bold text-sm sm:text-base mb-2 ${isDark ? "text-[#0aa6c8]" : "text-[#033044]"}`}>
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
              isDark ? "bg-orange-950/20 border-orange-900/30" : "bg-yellow-50 border-yellow-200"
            }`}>
              <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${isDark ? "text-orange-400" : "text-[#033044]"}`}>
                <FaExclamationTriangle className={`${isDark ? "text-orange-500" : "text-yellow-600"} text-xl sm:text-2xl`} /> Important Information
              </h3>
              <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-gray-700"}`}>
                <li className="flex items-start gap-2">
                  <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
                  <span>We never sell your personal information to third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
                  <span>Your application data is shared only with scholarship providers you choose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
                  <span>You can request data deletion at any time, subject to legal requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
                  <span>We will notify you of any material changes to this Privacy Policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0aa6c8] font-bold flex-shrink-0">•</span>
                  <span>Children under 13 are not permitted to use our platform</span>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className={`rounded-lg border p-6 sm:p-8 transition-all duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${isDark ? "bg-[#0aa6c8]/20" : "bg-[#0aa6c8]/10"}`}>
                  <FaEnvelope className="text-[#0aa6c8] text-2xl" />
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-[#033044]"}`}>
                  Questions About Privacy?
                </h2>
                <p className={`text-sm sm:text-base mb-6 max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a 
                    href="mailto:proff.kona@gmail.com"
                    className="inline-block bg-[#0aa6c8] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0789a6] transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    Email Privacy Team
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

export default PrivacyPolicy;