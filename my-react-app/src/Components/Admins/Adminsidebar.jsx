import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import sidebarcss from '../../assets/Css/AdminSidebar.module.css';
import adminimg from '../../assets/images/adminimg.jpg';
import LogoutPopup from "../../Components/Logout"; 

const Adminsidebar = () => {
    const [openExam, setOpenExam] = useState(false);

    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogoutConfirm = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/signup");
    };

    return (
        <>
            <aside className={sidebarcss.sidebar}>
                <div className={sidebarcss.profileContainer}>
                    <img className={sidebarcss.profileImg} src={adminimg} alt="profile" />
                    <div className={sidebarcss.profileText}>
                        <p className='text-white'>Admin</p>
                        <h6 className='text-white'>Samuel</h6>
                    </div>
                </div>

                <ul className={sidebarcss.sidebarlist}>
                    <h6 className={sidebarcss.headings}>Main</h6>
                    <li className={`${sidebarcss.sidebarlistitem} ${sidebarcss.active}`}>
                        <Link to="/admin"><i className="bi bi-box-fill"></i> Dashboard</Link>  
                    </li>

                    <h6 className={sidebarcss.headings}>Academic</h6>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/students"><i className="bi bi-people-fill"></i> Students</Link></li>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/courses"><i className="bi bi-journal-bookmark-fill"></i> Courses</Link></li>

                    <li className={sidebarcss.sidebarlistitem} onClick={() => setOpenExam(!openExam)}> 
                        <i className="bi bi-clipboard-fill"></i> Exams
                    </li>
                    {openExam && (
                        <ul className={sidebarcss.submenu}>
                            <li><Link to="/live"><i className="bi bi-activity"></i> Ongoing Exams</Link></li>
                            <li><Link to="/Assign"><i className="bi bi-clipboard-plus"></i> Assign Exam</Link></li>
                            <li><Link to="/bank"><i className="bi bi-journal-text"></i> Question Bank</Link></li>
                        </ul>
                    )}

                    <li className={sidebarcss.sidebarlistitem}><Link to="/result"><i className="bi bi-bar-chart-fill"></i> Results</Link></li>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/batch"><i className="bi bi-collection-fill"></i> Batch</Link></li>

                    <h6 className={sidebarcss.headings}>Masters</h6>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/managment"><i className="bi bi-person-lines-fill"></i> User Management</Link></li>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/group"><i className="bi bi-person-plus-fill"></i> User Group</Link></li>
                    <li className={sidebarcss.sidebarlistitem}><Link to="/permission"><i className="bi bi-shield-check"></i> Permission</Link></li>

                    <li 
                        className={`${sidebarcss.sidebarlistitem} ${sidebarcss.logout}`} 
                        onClick={() => setShowLogoutPopup(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-box-arrow-left"></i> Logout
                    </li>
                </ul>
            </aside>

            <LogoutPopup
                show={showLogoutPopup}
                onClose={() => setShowLogoutPopup(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
};

export default Adminsidebar;
