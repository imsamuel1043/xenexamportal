import React from "react";
import "../assets/Css/Footer.css";


const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-card container">

        <div className="row footer-top">

         
          <div className="col-12 col-md-4 footer-brand">
            <div className="footer-logo-row">
             
              <span className="footer-brand-name text-white">Xen Education</span>
            </div>

            <p className="footer-description">
              Xen Education empowers students and institutes to conduct 
              secure, fast, and accurate online exams with ease.
            </p>

            <div className="footer-social">
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-github"></i>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="footer-title">Product</h6>
            <ul className="footer-links">
              <li>Online Exams</li>
              <li>Auto-Grading</li>
              <li>Instant Results</li>
              <li>Question Bank</li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="footer-title">Resources</h6>
            <ul className="footer-links">
              <li>Documentation</li>
              <li>Tutorials</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="footer-title">Company</h6>
            <ul className="footer-links">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Partners</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom ">
          <p>Copyright © 2025 Xeneducation, All Rights Reserved. Developed by Xeventure</p>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
