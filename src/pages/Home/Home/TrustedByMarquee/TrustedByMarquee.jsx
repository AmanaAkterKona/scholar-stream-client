import React from "react";
import "./TrustedByMarquee.css"; 

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
  return (
    <div className="marquee-container">
      <div className="marquee">
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Trusted Media"
            className="marquee-logo"
          />
        ))}
      </div>
    </div>
  );
};

export default TrustedByMarquee;
