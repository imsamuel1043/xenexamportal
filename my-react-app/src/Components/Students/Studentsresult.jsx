import React, { useState } from "react";
import "../../assets/Css/Studentcss/Studentresult.css";
import StudentLayout from "../Layouts/StudentLayout";

const Studentresult = () => {
    const [results] = useState([
        {
            subject: "JavaScript",
            score: 92,
            grade: "A+",
            date: "Dec 5, 2025",
            status: "Passed"
        },
        {
            subject: "React",
            score: 30,
            grade: "D",
            date: "Nov 28, 2025",
            status: "Failed"
        },
        {
            subject: "HTML & CSS",
            score: 65,
            grade: "C",
            date: "Sep 10, 2025",
            status: "Passed"
        }
    ]);

    return (

        <StudentLayout>

            <div className="results-container">

                <h2 className="results-title">Your Exam Results</h2>
                <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "10px" }}>
                    <div className="results-grid">
                        {results.map((item, index) => (
                            <div key={index} className="result-card">

                                <div className="score-circle">
                                    <span>{item.score}%</span>
                                </div>

                                <h4 className="subject">{item.subject}</h4>

                                <div className="info-row">
                                    <p><strong>Grade:</strong> {item.grade}</p>
                                    <p><strong>Date:</strong> {item.date}</p>
                                </div>

                                <div className={`status-badge ${item.status.toLowerCase()}`}>
                                    {item.status}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </StudentLayout>

    );
};

export default Studentresult;
