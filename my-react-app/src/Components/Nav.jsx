import React, { useState } from "react";
import { Link } from "react-router-dom";

import Navstyle from "../assets/Css/Nav.module.css";
import Adminsidebarcss from "../assets/Css/Adminsidebar.module.css";
import "../assets/Css/Studentsidebar.css";

import Xenlogo from "../assets/images/xenlogo.png";
// import ProfileImg from "../assets/images/profile.png";
import "bootstrap-icons/font/bootstrap-icons.css";




const Nav = ({ userRole = "guest", userName = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebarClass =
      userRole === "admin"
        ? Adminsidebarcss.sidebar
        : "student-sidebar";

    const sb = document.querySelector("." + sidebarClass);
    if (sb) sb.classList.toggle(userRole === "admin" ? Adminsidebarcss.open : "open");

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
            <div className={Navstyle.dropdownContainer}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={Navstyle.loginBtn}
              >
                Login <i className="bi bi-caret-down-fill"></i>
              </button>

              {dropdownOpen && (
                <div className={Navstyle.dropdownMenu}>
                  <Link to="/loginadmin">Admin Login</Link>
                  <Link to="/loginstudent">Student Login</Link>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && (
            <div className={Navstyle.profileBox}>
              
              <button className={Navstyle.notificationIcon}>
                <i className="bi bi-bell"></i>
              </button>

              <div className={Navstyle.profileSection}>
                <img src={ProfileImg} className={Navstyle.profileImg} alt="profile" />
                <div className={Navstyle.userInfo}>
                  <p className={Navstyle.userName}>{userName}</p>
                  <p className={Navstyle.userRole}>{userRole.toUpperCase()}</p>
                </div>
              </div>

            </div>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Nav;
