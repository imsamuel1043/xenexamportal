import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Adminsidebarcss from '../../assets/Css/Adminsidebar.module.css';
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
            <aside className={Adminsidebarcss.sidebar}>
                <div className={Adminsidebarcss.profileContainer}>
                    <img className={Adminsidebarcss.profileImg} src={adminimg} alt="profile" />
                    <div className={Adminsidebarcss.profileText}>
                        <p className='text-white'>Admin</p>
                        <h6 className='text-white'>Samuel</h6>
                    </div>
                </div>

                <ul className={Adminsidebarcss.sidebarlist}>
                    <h6 className={Adminsidebarcss.headings}><span>Main</span></h6>
                    <li className={`${Adminsidebarcss.sidebarlistitem} ${Adminsidebarcss.active}`}>
                        <Link to="/admin"><i className="bi bi-box-fill"></i> <span>Dashboard</span></Link>  
                    </li>

                    <h6 className={Adminsidebarcss.headings}><span>Academic</span></h6>
                    <li className={Adminsidebarcss.sidebarlistitem}>
                        <Link to="/students"><i className="bi bi-people-fill"></i> <span>Students</span></Link>
                    </li>
                    <li className={Adminsidebarcss.sidebarlistitem}>
                        <Link to="/courses"><i className="bi bi-journal-bookmark-fill"></i> <span>Courses</span></Link>
                    </li>

                    <li className={Adminsidebarcss.sidebarlistitem} onClick={() => setOpenExam(!openExam)}> 
                        <i className="bi bi-clipboard-fill"></i> <span>Exams</span>
                    </li>
                    {openExam && (
                        <ul className={Adminsidebarcss.submenu}>
                            <li><Link to="/live"><i className="bi bi-activity"></i> <span>Ongoing Exams</span></Link></li>
                            <li><Link to="/Assign"><i className="bi bi-clipboard-plus"></i> <span>Assign Exam</span></Link></li>
                            <li><Link to="/bank"><i className="bi bi-journal-text"></i> <span>Question Bank</span></Link></li>
                        </ul>
                    )}

                    <li className={Adminsidebarcss.sidebarlistitem}>
                        <Link to="/result"><i className="bi bi-bar-chart-fill"></i> <span>Results</span></Link>
                    </li>
                    <li className={Adminsidebarcss.sidebarlistitem}>
                        <Link to="/batch"><i className="bi bi-collection-fill"></i> <span>Batch</span></Link>
                    </li>

                    <h6 className={Adminsidebarcss.headings}><span>Masters</span></h6>
                    <li className={Adminsidebarcss.sidebarlistitem}><Link to="/managment"><i className="bi bi-person-lines-fill"></i> <span>User Management</span></Link></li>
                    <li className={Adminsidebarcss.sidebarlistitem}><Link to="/group"><i className="bi bi-person-plus-fill"></i> <span>User Group</span></Link></li>
                    <li className={Adminsidebarcss.sidebarlistitem}><Link to="/permission"><i className="bi bi-shield-check"></i> <span>Permission</span></Link></li>

                    <li 
                        className={`${Adminsidebarcss.sidebarlistitem} ${Adminsidebarcss.logout}`} 
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
