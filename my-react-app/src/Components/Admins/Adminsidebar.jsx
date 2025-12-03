import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminSidebarcss from '../../assets/Css/Adminsidebar.module.css';
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
            <aside className={AdminSidebarcss.sidebar}>
                <div className={AdminSidebarcss.profileContainer}>
                    <img className={AdminSidebarcss.profileImg} src={adminimg} alt="profile" />
                    <div className={AdminSidebarcss.profileText}>
                        <p className='text-white'>Admin</p>
                        <h6 className='text-white'>Samuel</h6>
                    </div>
                </div>

                <ul className={AdminSidebarcss.sidebarlist}>
                    <h6 className={AdminSidebarcss.headings}><span>Main</span></h6>
                    <li className={`${AdminSidebarcss.sidebarlistitem} ${AdminSidebarcss.active}`}>
                        <Link to="/admin"><i className="bi bi-box-fill"></i> <span>Dashboard</span></Link>  
                    </li>

                    <h6 className={AdminSidebarcss.headings}><span>Academic</span></h6>
                    <li className={AdminSidebarcss.sidebarlistitem}>
                        <Link to="/students"><i className="bi bi-people-fill"></i> <span>Students</span></Link>
                    </li>
                    <li className={AdminSidebarcss.sidebarlistitem}>
                        <Link to="/courses"><i className="bi bi-journal-bookmark-fill"></i> <span>Courses</span></Link>
                    </li>

                    <li className={AdminSidebarcss.sidebarlistitem} onClick={() => setOpenExam(!openExam)}> 
                        <i className="bi bi-clipboard-fill"></i> <span>Exams</span>
                    </li>
                    {openExam && (
                        <ul className={AdminSidebarcss.submenu}>
                            <li><Link to="/live"><i className="bi bi-activity"></i> <span>Ongoing Exams</span></Link></li>
                            <li><Link to="/Assign"><i className="bi bi-clipboard-plus"></i> <span>Assign Exam</span></Link></li>
                            <li><Link to="/bank"><i className="bi bi-journal-text"></i> <span>Question Bank</span></Link></li>
                        </ul>
                    )}

                    <li className={AdminSidebarcss.sidebarlistitem}>
                        <Link to="/result"><i className="bi bi-bar-chart-fill"></i> <span>Results</span></Link>
                    </li>
                    <li className={AdminSidebarcss.sidebarlistitem}>
                        <Link to="/batch"><i className="bi bi-collection-fill"></i> <span>Batch</span></Link>
                    </li>

                    <h6 className={AdminSidebarcss.headings}><span>Masters</span></h6>
                    <li className={AdminSidebarcss.sidebarlistitem}><Link to="/managment"><i className="bi bi-person-lines-fill"></i> <span>User Management</span></Link></li>
                    <li className={AdminSidebarcss.sidebarlistitem}><Link to="/group"><i className="bi bi-person-plus-fill"></i> <span>User Group</span></Link></li>
                    <li className={AdminSidebarcss.sidebarlistitem}><Link to="/permission"><i className="bi bi-shield-check"></i> <span>Permission</span></Link></li>

                    <li 
                        className={`${AdminSidebarcss.sidebarlistitem} ${AdminSidebarcss.logout}`} 
                        onClick={() => setShowLogoutPopup(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="bi bi-box-arrow-left"></i> <span>Logout</span>
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
