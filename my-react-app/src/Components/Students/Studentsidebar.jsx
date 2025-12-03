import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutPopup from "../../Components/Logout"; 
import "../../assets/Css/Studentsidebar.css";

const Sidebar = () => {

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
        <img
          src="https://via.placeholder.com/60"
          alt="profile"
          className="profileImg"
        />
        <div className="profileText">
          <p>Welcome</p>
          <h6>Student</h6>
        </div>
      </div>

      <p className="headings">Main</p>

      <ul className="sidebarlist">

        <li className={`sidebarlistitem ${isActive("/sdashboard") ? "active" : ""}`}>
          <Link to="/sdashboard">Dashboard</Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/exam") ? "active" : ""}`}>
          <Link to="/exam">Exam</Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/Studentresults") ? "active" : ""}`}>
          <Link to="/Studentresults">Results</Link>
        </li>

        <li className={`sidebarlistitem ${isActive("/feebalance") ? "active" : ""}`}>
          <Link to="/feebalance">Fee Balance</Link>
        </li>

        <li
          className="sidebarlistitem logout"
          onClick={() => setShowLogoutPopup(true)}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-box-arrow-left"></i> Logout
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

export default Sidebar;
