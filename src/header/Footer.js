import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://forms.gle/j4StyvQC5gZXEev88"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="footer-soumettre"
          src="/images/soumettre.png"
          alt="Soumettre une vidéo"
        />
      </a>
      <a href="https://fecane.ca/" target="_blank" rel="noreferrer">
        <img
          className="footer-logo-fecane"
          src="/images/fecane-logo.png"
          alt="FéCANÉ"
        />
      </a>
      <a href="https://canada.ca/" target="_blank" rel="noreferrer">
        <img
          className="footer-logo-canada"
          src="/images/canada-logo.png"
          alt="Canada"
        />
      </a>
    </footer>
  );
};

export default Footer;
