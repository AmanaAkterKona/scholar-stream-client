import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award } from 'lucide-react';
import useTheme from "../../Shared/useTheme"; 

const SuccessStories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const testimonials = [
    {
      id: 1,
      name: "Veda K.",
      scholarship: "Coca-Cola Scholarship",
      amount: "$20,000",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      quote: "Scholarships.com's centralized database saved me so much time, and I even signed up for the mailing list to receive reminders about applying. The matching system quickly connected me with scholarships that fit my background and interests.",
      rating: 5
    },
    {
      id: 2,
      name: "Cameron P.",
      scholarship: "Amazon Future Engineer Scholarship",
      amount: "$40,000",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "Scholarships.com is the absolute best place to start when applying for scholarships. The matching tool helped me find some realistic opportunities I could actually win, which made the process far less stressful!",
      rating: 5
    },
    {
      id: 3,
      name: "Gella H.",
      scholarship: "Coca-Cola Scholarship",
      amount: "$20,000",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "Scholarships.com made it significantly easier to handle applying to scholarships, and I found the matching feature to be particularly handy when filtering for options I was a good candidate for.",
      rating: 5
    },
    {
      id: 4,
      name: "Marcus T.",
      scholarship: "Gates Millennium Scholarship",
      amount: "$50,000",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      quote: "I was overwhelmed by the scholarship application process until I found this platform. The personalized recommendations were spot-on, and the deadline reminders kept me organized.",
      rating: 5
    },
    {
      id: 5,
      name: "Aisha M.",
      scholarship: "Dell Scholars Program",
      amount: "$20,000",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      quote: "As a first-generation college student, I had no idea where to start with scholarships. This platform guided me through every step and helped me find opportunities I never knew existed.",
      rating: 5
    },
    {
      id: 6,
      name: "David L.",
      scholarship: "National Merit Scholarship",
      amount: "$30,000",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      quote: "The essay tips and application guidance were invaluable. I applied to 15 scholarships through this platform and won 7 of them! The time I saved using the centralized system allowed me to focus on quality applications.",
      rating: 5
    },
    {
      id: 7,
      name: "Sofia R.",
      scholarship: "Hispanic Scholarship Fund",
      amount: "$25,000",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      quote: "What impressed me most was the diversity of scholarships available. I found opportunities specifically for my field of study, heritage, and community involvement.",
      rating: 5
    },
    {
      id: 8,
      name: "James K.",
      scholarship: "Jack Kent Cooke Scholarship",
      amount: "$40,000",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      quote: "I started using this platform in my junior year of high school, and it completely changed my college trajectory. The resources, webinars, and matching algorithm helped me secure over $100K in scholarships.",
      rating: 5
    }
  ];

  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonials.push(testimonials.slice(i, i + 3));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % groupedTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + groupedTestimonials.length) % groupedTestimonials.length);
  };

  return (
    <section className={`relative py-24 px-4 overflow-hidden transition-colors duration-700 ${
      isDark ? "bg-gradient-to-br from-[#020d14] via-[#031f2b] to-[#020d14]" : "bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100"
    }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${isDark ? "bg-cyan-300/20" : "bg-cyan-300"}`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-sky-300/20" : "bg-sky-300"}`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg ${
            isDark ? "bg-[#37c4ef]/20 text-[#37c4ef] border border-[#37c4ef]/50" : "bg-cyan-400 text-white"
          }`}>
            <Award className="w-5 h-5" />
            Real Scholarship Winners
          </div>
          <h2 className={`text-5xl font-extrabold mb-5 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Success <span className={isDark ? "text-gray-400" : "text-gray-600"}>Stories</span>
          </h2>
          <p className={`text-xl font-medium max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-slate-700"}`}>
            Scholarships.com has helped over <span className={isDark ? "text-[#37c4ef]" : "text-cyan-600 font-bold"}>26 million students</span> and families find college scholarships. Will you be our next winner?
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <button className={`px-10 py-4 font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg ${
              isDark ? "bg-[#37c4ef] hover:bg-[#1faed1] text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}>
              See More Winners
            </button>
            <button className={`px-10 py-4 font-bold rounded-xl border-3 transition-all duration-300 shadow-lg hover:shadow-xl text-lg ${
              isDark ? "bg-transparent border-[#37c4ef] text-white hover:bg-[#37c4ef]/10" : "bg-white hover:bg-cyan-50 text-cyan-600 border-cyan-500"
            }`}>
              Winner Interviews
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {groupedTestimonials.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full flex-shrink-0 px-4">
                  <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {group.map((testimonial) => (
                      <div key={testimonial.id} className={`rounded-2xl shadow-2xl p-7 border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                        isDark ? "bg-[#041e2b]/95 border-[#37c4ef]/20" : "bg-white border-cyan-100 hover:border-cyan-300"
                      }`}>
                        {/* Stars */}
                        <div className="flex gap-1 mb-5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className={`text-base leading-relaxed mb-6 italic min-h-[120px] font-medium ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Profile */}
                        <div className={`flex items-center gap-4 pt-5 border-t-2 ${isDark ? "border-[#37c4ef]/20" : "border-cyan-100"}`}>
                          <img 
                            src={testimonial.image}
                            alt={testimonial.name}
                            className={`w-16 h-16 rounded-full object-cover ring-4 shadow-lg ${isDark ? "ring-[#37c4ef]/30" : "ring-cyan-200"}`}
                          />
                          <div>
                            <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                              {testimonial.name}
                            </h3>
                            <p className={`text-sm font-bold ${isDark ? "text-[#37c4ef]/80" : "text-cyan-600"}`}>
                              {testimonial.scholarship}
                            </p>
                            <p className={`text-base font-extrabold ${isDark ? "text-[#37c4ef]" : "text-slate-800"}`}>
                              {testimonial.amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 ${
              isDark ? "bg-[#37c4ef]/30 hover:bg-[#37c4ef]/50 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 ${
              isDark ? "bg-[#37c4ef]/30 hover:bg-[#37c4ef]/50 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {groupedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? `w-10 shadow-lg ${isDark ? "bg-[#37c4ef]" : "bg-cyan-500"}` 
                    : `w-3 ${isDark ? "bg-slate-700 hover:bg-[#37c4ef]/50" : "bg-slate-400 hover:bg-cyan-400"}`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;