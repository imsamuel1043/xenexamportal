import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutPopup from "../../Components/Logout";
import "../../assets/Css/Studentsidebar.css";
import studentpro from "../../assets/images/profile.jpeg";

const Studentsidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutPopup(false);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      <div className="profileContainer">
        <img src={studentpro} alt="profile" className="profileImg" />
        <div className="profileText">
          <p>Welcome</p>
          <h6>Student</h6>
        </div>
      </div>

      <p className="headings">Main</p>

      <ul className="sidebarlist">

        <li className={`sidebarlistitem ${isActive("/student/dashboard") ? "active" : ""}`}>
          <Link to="/student/dashboard">
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/exam") ? "active" : ""}`}>
          <Link to="/exam">
            <i className="bi bi-journal-text"></i>
            <span>Exam</span>
          </Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/Studentresults") ? "active" : ""}`}>
          <Link to="/Studentresults">
            <i className="bi bi-bar-chart"></i>
            <span>Results</span>
          </Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/feebalance") ? "active" : ""}`}>
          <Link to="/feebalance">
            <i className="bi bi-wallet2"></i>
            <span>Fee Balance</span>
          </Link>
        </li>

        <li
          className="sidebarlistitem logout"
          onClick={() => setShowLogoutPopup(true)}
        >
          <i className="bi bi-box-arrow-left"></i>
          <span>Logout</span>
        </li>

      </ul>

      <LogoutPopup
        show={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={handleLogoutConfirm}
      />

    </div>
  );
};

export default Studentsidebar;
