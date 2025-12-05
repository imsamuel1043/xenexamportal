import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';

const OngoingExam = () => {
    const navigate = useNavigate();

    const liveExams = [
        {
            id: 1,
            title: "Javascript",
            date: "Dec 5, 2025",
            duration: "2 Hours",
            status: "inprogress"
        },
        {
            id: 2,
            title: "Css",
            date: "Dec 15, 2025",
            duration: "1 Hour",
            status: "notstarted"
        },
        {
            id: 3,
            title: "Digital Marketing",
            date: "Nov 27, 2025",
            duration: "1.5 Hours",
            status: "completed"
        }
    ];

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="fw-bold mb-2">Examinations</h3>

                {/* <button
                    className="btn btn-success px-4"
                    onClick={() => navigate('/completed-exams')}
                >
                    Completed Exams
                </button> */}
            </div>

            <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "10px" }}>
                <div className="row mt-3">
                    {liveExams.map((exam, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className="card p-3 shadow-sm" style={{ borderRadius: "10px" }}>
                                <div
                                    className='mb-3'
                                    style={{
                                        width: "100%",
                                        height: "6px",
                                        marginTop: "-16px",
                                        borderRadius: "0 0 10px 10px",
                                        backgroundColor:
                                            exam.status === "completed"
                                                ? "#0dba35"
                                                : exam.status === "inprogress"
                                                    ? "#144efd"
                                                    : "#ff480b"
                                    }}
                                ></div>

                                <h6 className="fw-bold">{exam.title}</h6>
                                <p className="mb-1" style={{ fontSize: "13px", color: "#4f4f4f" }}>
                                    Date: {exam.date}
                                </p>
                                <p className="mb-1" style={{ fontSize: "14px" }}>
                                    Duration: {exam.duration}
                                </p>

                                <div className="mt-2">
                                    {exam.status === "completed" && (
                                        <span
                                            onClick={() =>
                                                navigate(`/completed-exams/${exam.id}`)
                                            }
                                            className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#0dba3525",
                                                borderRadius: "30px",
                                                color: "#028b22ff",
                                                cursor: "pointer"
                                            }}
                                        >
                                            ✔ View Completed
                                        </span>
                                    )}

                                    {exam.status === "inprogress" && (
                                        <span
                                            className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#144efd20",
                                                borderRadius: "30px",
                                                color: "#144efdff"
                                            }}
                                        >
                                            In Progress
                                        </span>
                                    )}

                                    {exam.status === "notstarted" && (
                                        <span
                                            className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#ff480b24",
                                                borderRadius: "30px",
                                                color: "#ff480bff"
                                            }}
                                        >
                                            Not Started
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default OngoingExam;
