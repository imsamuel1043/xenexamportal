import React, { useState } from "react";
import StudentLayout from "../Layouts/StudentLayout";



const liveExams = [
    {
        id: 1,
        title: "Javascript",
        date: "Dec 5, 2025",
        duration: "2 Hours",
        status: "completed",
        questions: [
            {
                qno: 1,
                question: "Which keyword is used to declare a constant in JavaScript?",
                correct: "const",
                studentAnswer: "var"
            },
            {
                qno: 2,
                question: "Which method is used to convert JSON to object?",
                correct: "JSON.parse()",
                studentAnswer: "JSON.parse()"
            },
            {
                qno: 3,
                question: "Which operator is used for strict comparison?",
                correct: "===",
                studentAnswer: ""
            }
        ]
    }
];

const Studentexam = () => {
    const [selectedExam, setSelectedExam] = useState(null);

    const openResult = (exam) => {
        setSelectedExam(exam);
    };

    const closeModal = () => {
        setSelectedExam(null);
    };

    return (
        <StudentLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap ms-3 mt-3">
                <h3 className="fw-bold mb-2">Examinations</h3>
            </div>

            <div className="card shadow-sm p-3 mt-3 ms-3" style={{ borderRadius: "10px" }}>
                <div className="row mt-3">
                    {liveExams.map((exam, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">

                            <div className="card p-3 shadow-sm" style={{ borderRadius: "10px", cursor: "pointer" }}
                                 onClick={() => exam.status === "completed" && openResult(exam)}>

                                <div
                                    className="mb-3"
                                    style={{
                                        width: "100%",
                                        height: "6px",
                                        borderRadius: "0 0 10px 10px",
                                        marginTop: "-16px",
                                        backgroundColor:
                                            exam.status === "completed"
                                                ? "#0dba35"
                                                : exam.status === "inprogress"
                                                    ? "#144efd"
                                                    : "#ff480b"
                                    }}
                                ></div>

                                <div>
                                    <h6 className="fw-bold">{exam.title}</h6>
                                    <p className="mb-1" style={{ fontSize: "13px", color: "#4f4f4f" }}>
                                        Date: {exam.date}
                                    </p>
                                    <p className="mb-1" style={{ fontSize: "14px" }}>
                                        Duration: {exam.duration}
                                    </p>
                                </div>

                                <div className="mt-2">
                                    {exam.status === "completed" && (
                                        <span
                                            className="badge px-3 py-2"
                                            style={{
                                                backgroundColor: "#0dba3525",
                                                borderRadius: "30px",
                                                color: "#028b22ff"
                                            }}
                                        >
                                            Completed
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

            {selectedExam && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,0.5)"
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">
                                    {selectedExam.title} – Results
                                </h5>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>

                            <div className="modal-body">

                                {selectedExam.questions.map((q, i) => {
                                    const isCorrect =
                                        q.studentAnswer === q.correct;

                                    return (
                                        <div
                                            key={i}
                                            className="p-3 mb-3 rounded shadow-sm"
                                            style={{
                                                borderLeft: `5px solid ${
                                                    q.studentAnswer === ""
                                                        ? "#6c757d"
                                                        : isCorrect
                                                            ? "#198754"
                                                            : "#dc3545"
                                                }`,
                                                background: "#f9f9f9"
                                            }}
                                        >
                                            <h6 className="fw-bold">
                                                Q{i + 1}. {q.question}
                                            </h6>

                                            <p className="mt-2 mb-1">
                                                <strong>Correct Answer:</strong>{" "}
                                                <span className="text-success">{q.correct}</span>
                                            </p>

                                            <p className="mb-0">
                                                <strong>Your Answer:</strong>{" "}
                                                <span
                                                    className={
                                                        q.studentAnswer === ""
                                                            ? "text-secondary"
                                                            : isCorrect
                                                                ? "text-success"
                                                                : "text-danger"
                                                    }
                                                >
                                                    {q.studentAnswer || "Not Answered"}
                                                </span>
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </StudentLayout>
    );
};

export default Studentexam;
