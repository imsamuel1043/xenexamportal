import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../assets/Css/StudentDetails.css";

import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import user3 from "../../assets/images/user3.jpg";
import AdminLayout from "../Layouts/AdminLayout";

const StudentDetails = () => {
    const { id } = useParams();
    const fullId = "#" + id;

    const students = [
        { id: "#CMP801", name: "Prabin", course: "UI/UX Development", batch: "9th", img: user1 },
        { id: "#CMP802", name: "Vibina", course: "UI/UX Development", batch: "9th", img: user2 },
        { id: "#CMP803", name: "Naja", course: "Full-Stack Development", batch: "9th", img: user3 },
        { id: "#CMP804", name: "Samuel", course: "UI/UX Development", batch: "9th", img: user1 },
        { id: "#CMP805", name: "Sona", course: "Digital Marketing", batch: "9th", img: user2 },
        { id: "#CMP806", name: "Raheena", course: "Digital Marketing", batch: "9th", img: user3 },
    ];

    const student = students.find((s) => s.id === fullId);


    const navigate = useNavigate();

  const goBack = () => {
    navigate("/students"); 
  };

    return (

        <AdminLayout>
            <div className="details-wrapper">
                <p className="btn btn-secondary" onClick={goBack}>Back</p>

                <h2 className="page-title fw-bold">Student Details</h2>

                <div className="details-grid">

                    <div className="left-card">
                        <div className="profile-pic-box">
                            <img src={student?.img || user1} alt="student" />
                        </div>

                        <p className="student-id">Student ID: {student?.id}</p>

                        <div className="form-section">
                            <div className="form-row">
                                <input type="text" placeholder="First Name" defaultValue={student?.name} />
                                <input type="text" placeholder="Last Name" />
                            </div>

                            <div className="form-row">
                                <input type="date" />
                                <input type="text" placeholder="Gender" />
                            </div>

                            <input type="email" placeholder="Email Address" />
                            <input type="text" placeholder="Mobile Number" />
                            <textarea placeholder="Permanent Address"></textarea>
                        </div>
                    </div>

                    <div className="right-card">
                        <h4 className="section-title">Academic & Enrollment Details</h4>

                        <input type="text" defaultValue={student?.course} placeholder="Course" />
                        <input type="text" placeholder="Registration Number" />
                        <input type="text" placeholder="Enrollment Status" />

                        <h4 className="section-title">Administrative</h4>

                        <table className="fee-table">
                            <thead>
                                <tr>
                                    <th>Total Fee</th>
                                    <th>Paid</th>
                                    <th>Pending</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>40,000/-</td>
                                    <td>28,000/-</td>
                                    <td>12,000/-</td>
                                    <td>Partially</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4 className="section-title">Payment History</h4>

                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>5-12-2025</td>
                                    <td>5000/-</td>
                                    <td>35000/-</td>
                                </tr>
                                <tr>
                                    <td>5-12-2025</td>
                                    <td>5000/-</td>
                                    <td>30000/-</td>
                                </tr>
                                <tr>
                                    <td>5-12-2025</td>
                                    <td>3000/-</td>
                                    <td>28000/-</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>

        </AdminLayout>
    );
};

export default StudentDetails;
