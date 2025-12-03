import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navstyle from "../assets/Css/Nav.module.css";

import AdminsidebarCss from "../assets/Css/Adminsidebar.module.css";
import "../assets/Css/Studentsidebar.css"; 

import Xenlogo from "../assets/images/xenlogo.png";
// import ProfileImg from "../assets/images/profile.png";

const Navbar = ({ userRole = "guest" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    let sidebarClass =
      userRole === "admin"
        ? AdminsidebarCss.sidebar          
        : "student-sidebar";               

    const sb = document.querySelector("." + sidebarClass);

    if (sb) {
      sb.classList.toggle(
        userRole === "admin"
          ? AdminsidebarCss.open          
          : "open"                       
      );
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  const isLoggedIn = userRole === "admin" || userRole === "student";

  return (
    <header className={Navstyle.navWrapper}>
      {isLoggedIn && (
        <button className={Navstyle.menuBtn} onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <nav className={Navstyle.navContainer}>
        <div className={Navstyle.leftSection}>
          <img src={Xenlogo} alt="logo" className={Navstyle.logo} />
        </div>

        <div className={Navstyle.rightSection}>
          {!isLoggedIn && (
            <Link to="/login">
              <button className={Navstyle.loginBtn}>Login</button>
            </Link>
          )}

          {isLoggedIn && (
            <div className={Navstyle.profileSection}>
              <img
                src={ProfileImg}
                alt="Profile"
                className={Navstyle.profileImg}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
