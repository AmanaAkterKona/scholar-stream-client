import React from "react";
import "./TrustedByMarquee.css"; 
import useTheme from "../../Shared/useTheme"; 

const logos = [
  "https://i.ibb.co.com/9HTsXRbg/logo1.png",
  "https://i.ibb.co.com/Myt7PK3k/logo2.png",
  "https://i.ibb.co.com/Z1VCs7tw/logo3.jpg",
  "https://i.ibb.co.com/0jLK3MS7/logo4.jpg",
  "https://i.ibb.co.com/5xK5qcyY/logo5.jpg",
  "https://i.ibb.co.com/MkzZ6pML/logo6.png",
  "https://i.ibb.co.com/WvyBJjZW/logo7.png",
  "https://i.ibb.co.com/Rp6vbw9J/logo9.png",
];

const TrustedByMarquee = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`marquee-container transition-all duration-700 ${isDark ? "dark-bg" : "bg-white"}`}>
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {/* প্রথম সেট */}
          {logos.map((logo, index) => (
            <img key={`set1-${index}`} src={logo} alt="Partner" className="marquee-logo" />
          ))}
          {/* দ্বিতীয় সেট (অ্যানিমেশন নিরবচ্ছিন্ন রাখার জন্য) */}
          {logos.map((logo, index) => (
            <img key={`set2-${index}`} src={logo} alt="Partner" className="marquee-logo" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedByMarquee;