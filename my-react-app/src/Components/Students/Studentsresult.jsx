import React, { useState } from "react";
import "../../assets/Css/Studentcss/Studentresult.css";
import StudentLayout from "../Layouts/StudentLayout";

const Studentresult = () => {
    const [selectedExam, setSelectedExam] = useState(null);

    const [results] = useState([
        {
            subject: "JavaScript",
            score: 92,
            grade: "A+",
            date: "Dec 5, 2025",
            status: "Passed",
            questions: [
                {
                    question: "What is closure in JavaScript?",
                    correctAnswer: "A function with preserved outer scope.",
                    selectedAnswer: "A function with preserved outer scope.",
                },
                {
                    question: "Which keyword declares a constant?",
                    correctAnswer: "const",
                    selectedAnswer: "var",
                }
            ]
        },
        {
            subject: "React",
            score: 30,
            grade: "D",
            date: "Nov 28, 2025",
            status: "Failed",
            questions: [
                {
                    question: "What is JSX?",
                    correctAnswer: "A syntax extension for JavaScript.",
                    selectedAnswer: "JSON format",
                },
                {
                    question: "Which hook is used for state?",
                    correctAnswer: "useState",
                    selectedAnswer: "useEffect",
                }
            ]
        },
        {
            subject: "HTML & CSS",
            score: 65,
            grade: "C",
            date: "Sep 10, 2025",
            status: "Passed",
            questions: [
                {
                    question: "What does CSS stand for?",
                    correctAnswer: "Cascading Style Sheets",
                    selectedAnswer: "Cascading Style Sheets",
                },
                {
                    question: "Which tag is used for images?",
                    correctAnswer: "<img>",
                    selectedAnswer: "<image>",
                }
            ]
        }
    ]);

    return (
        <StudentLayout>
            <div className="results-container">

                <h2 className="results-title">Your Exam Results</h2>

                <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "10px" }}>
                    <div className="results-grid">
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="result-card"
                                onClick={() => setSelectedExam(item)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="score-circle">
                                    <span>{item.score}%</span>
                                </div>

                                <h4 className="subject">{item.subject}</h4>

                                <div className="info-row">
                                    <p><strong>Grade:</strong> {item.grade}</p>
                                    <p><strong>Date:</strong> {item.date}</p>
                                </div>

                                <div
                                    className={`status-badge ${item.status.toLowerCase()}`}
                                >
                                    {item.status}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedExam && (
                <div className="modal-overlay">
                    <div className="modal-box">

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold">{selectedExam.subject} – Details</h4>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => setSelectedExam(null)}
                            >
                                Close
                            </button>
                        </div>

                        <p><strong>Status:</strong> {selectedExam.status}</p>
                        <p><strong>Score:</strong> {selectedExam.score}%</p>
                        <p><strong>Date:</strong> {selectedExam.date}</p>

                        <hr />

                        <h5 className="fw-bold mb-3">Questions & Answers</h5>

                        {selectedExam.questions.map((q, i) => {
                            const isCorrect = q.correctAnswer === q.selectedAnswer;

                            return (
                                <div
                                    key={i}
                                    className="question-box p-3 mb-3"
                                    style={{
                                        borderRadius: "10px",
                                        border: `2px solid ${isCorrect ? "#21c45d" : "#ff4242"
                                            }`,
                                        background: isCorrect ? "#e8ffef" : "#ffeaea"
                                    }}
                                >
                                    <h6 className="fw-bold">{i + 1}. {q.question}</h6>

                                    <p className="mb-1">
                                        <strong>Your Answer:</strong>{" "}
                                        <span style={{ color: isCorrect ? "#0f8b3d" : "#d02121" }}>
                                            {q.selectedAnswer}
                                        </span>
                                    </p>

                                    <p className="mb-0">
                                        <strong>Correct Answer:</strong> {q.correctAnswer}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}

        </StudentLayout>
    );
};

export default Studentresult;
