import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Navstyle from "../assets/Css/Nav.module.css";
import Adminsidebarcss from "../assets/Css/Adminsidebar.module.css";
import "../assets/Css/Studentsidebar.css";

import Xenlogo from "../assets/images/xenlogo.png";
import ProfileImg from "../assets/images/user1.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

import { NotificationContext } from "../Components/NotificationContext";

const Nav = ({ userRole = "guest", userName = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [adminMsg, setAdminMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { notifications, sendNotification, markAsSeen } =
    useContext(NotificationContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    const sidebarClass =
      userRole === "admin"
        ? Adminsidebarcss.sidebar
        : "student-sidebar";

    const sidebar = document.querySelector("." + sidebarClass);
    if (!sidebar) return;

    if (userRole === "admin") {
      sidebar.classList.toggle(Adminsidebarcss.open);
    } else {
      sidebar.classList.toggle("open");
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  const isLoggedIn = userRole === "admin" || userRole === "student";
  const unseenCount = notifications.filter((n) => !n.seen).length;

  const handleSend = () => {
    if (adminMsg.trim() === "") return;
    sendNotification(adminMsg);
    setAdminMsg("");
  };

  return (
    <header
      className={`${Navstyle.navWrapper} ${
        scrolled ? Navstyle.navScrolled : ""
      }`}
    >
      {isLoggedIn && (
        <button className={Navstyle.menuBtn} onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <nav className={Navstyle.navContainer}>
        <img src={Xenlogo} alt="logo" className={Navstyle.logo} />

        <div className={Navstyle.rightSection}>
          {/* <ul className={Navstyle.navLinks}>
            <li><Link to="/">Home</Link></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About</a></li>
          </ul> */}

          {!isLoggedIn && (
            <div className={Navstyle.dropdownContainer}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={Navstyle.loginBtn}
              > Login
              <i className="bi bi-person-circle"></i>
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
            <>
              <button
                className={Navstyle.notificationIcon}
                onClick={() => setNoteOpen(!noteOpen)}
              >
                <i className="bi bi-bell"></i>
                {unseenCount > 0 && (
                  <span className={Navstyle.noteBadge}>{unseenCount}</span>
                )}
              </button>

              {noteOpen && (
                <div className={Navstyle.dropdownMenu} style={{ width: "250px" }}>
                  {userRole === "admin" && (
                    <div style={{ padding: "10px" }}>
                      <textarea
                        value={adminMsg}
                        onChange={(e) => setAdminMsg(e.target.value)}
                        placeholder="Type notification..."
                        style={{ width: "100%", height: "60px" }}
                      />
                      <button
                        onClick={handleSend}
                        style={{
                          width: "100%",
                          marginTop: "5px",
                          padding: "6px",
                          background: "#05173e",
                          color: "white",
                          borderRadius: "6px",
                          border: "none",
                        }}
                      >
                        Send
                      </button>
                      <hr />
                    </div>
                  )}

                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {notifications.length === 0 ? (
                      <p style={{ padding: "10px" }}>No notifications</p>
                    ) : (
                      notifications.map((note) => (
                        <div
                          key={note.id}
                          onClick={() => markAsSeen(note.id)}
                          style={{
                            padding: "10px",
                            background: note.seen ? "#f0f0f0" : "#d9e6ff",
                            borderBottom: "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        >
                          <p>{note.message}</p>
                          <small>{note.date}</small>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              <div className={Navstyle.profileSection}>
                <img
                  src={ProfileImg}
                  className={Navstyle.profileImg}
                  alt="profile"
                />
                <div className={Navstyle.userInfo}>
                  <p className={Navstyle.userName}>{userName}</p>
                  <p className={Navstyle.userRole}>{userRole.toUpperCase()}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
