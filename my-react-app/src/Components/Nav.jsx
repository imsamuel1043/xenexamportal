import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navstyle from "../assets/Css/Nav.module.css";
import sidebarcss from "../assets/Css/AdminSidebar.module.css";
import Xenlogo from "../assets/images/xenlogo.png";

const Navbar = ({ isAdmin = false }) => {
    const [search, setSearch] = useState("");

    const toggleSidebar = () => {
        const sb = document.querySelector("." + sidebarcss.sidebar);
        if (sb) sb.classList.toggle(sidebarcss.open);
    };

    return (
        <header className={Navstyle.navWrapper}>
            {isAdmin && (
                <button className={Navstyle.menuBtn} onClick={toggleSidebar}>
                    ☰
                </button>
            )}

            <nav className={`${Navstyle.navu} ${isAdmin ? Navstyle.adminMode : ""}`}>
                <div className={Navstyle.leftSection}>
                    {!isAdmin && <img src={Xenlogo} alt="logo" className={Navstyle.logo} />}
                </div>

                <div className={Navstyle.searchSection}>
                    <input
                        className={Navstyle.searchinput}
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className={Navstyle.searchIcon}><i className="bi bi-search"></i></span>
                </div>

                <div className={Navstyle.rightSection}>
                    <Link to="/login"><button className={Navstyle.loginBtn}>Login</button></Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
