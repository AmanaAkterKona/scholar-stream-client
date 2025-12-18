import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from 'lucide-react';

const SectionFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How do I apply for a scholarship?",
      a: "Just create an account, upload documents, and submit your application online. Our streamlined process makes it easy to apply to multiple scholarships with a single profile.",
    },
    {
      q: "Is ScholarStream free to use?",
      a: "Yes! Searching and applying for scholarships is completely free. There are no hidden fees or charges to access our platform and scholarship opportunities.",
    },
    {
      q: "How long does approval take?",
      a: "Most scholarships take 5–10 business days to review applications. You'll receive email notifications about your application status at every step of the process.",
    },
    {
      q: "What documents do I need to apply?",
      a: "Typically, you'll need academic transcripts, a personal statement, letters of recommendation, and proof of enrollment. Specific requirements vary by scholarship.",
    },
    {
      q: "Can I apply for multiple scholarships?",
      a: "Absolutely! We encourage you to apply for as many scholarships as you qualify for. Our platform makes it easy to manage multiple applications in one place.",
    },
    {
      q: "How will I know if I've won?",
      a: "Winners are notified via email and through their ScholarStream dashboard. Make sure to keep your contact information up to date and check your notifications regularly.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-[#e8f8fb] to-[#f5fdff] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#37c4ef] rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-[#033044] mb-4">
            Frequently <span className="text-[#37c4ef]">Asked Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our scholarship platform
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full p-6 flex justify-between items-start gap-4 text-left hover:bg-gradient-to-r hover:from-[#f0fbfd] hover:to-white transition-all duration-300"
              >
                <h3 className="font-bold text-lg text-[#033044] flex-1 pr-2">
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 mt-1"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openIndex === i 
                      ? 'bg-[#37c4ef] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-[#37c4ef] to-transparent mb-4"></div>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="px-8 py-3 bg-[#37c4ef] text-white font-semibold rounded-full hover:bg-[#2ab3dc] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionFAQ;