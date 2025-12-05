import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";

const examResultsData = {
    3: {
        title: "Digital Marketing",
        studentsPresent: 4,
        passed: 3,
        failed: 1,
        studentDetails: [
            {
                name: "John Doe",
                score: 78,
                attended: 40,
                wrongQuestions: [3, 7, 9, 15],
                status: "Passed"
            },
            {
                name: "Mary Smith",
                score: 92,
                attended: 40,
                wrongQuestions: [12],
                status: "Passed"
            },
            {
                name: "David Johnson",
                score: 65,
                attended: 38,
                wrongQuestions: [5, 11, 13, 18],
                status: "Passed"
            },
            {
                name: "Emma Wilson",
                score: 45,
                attended: 35,
                wrongQuestions: [2, 4, 9, 12, 17],
                status: "Failed"
            }
        ]
    }
};

const CompletedExamDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const exam = examResultsData[id];

    if (!exam) {
        return <h3 className="text-center mt-5">Exam details not found.</h3>;
    }

    return (
        <AdminLayout>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <h3 className="fw-bold">{exam.title} - Completed Exam Details</h3>

            <div className="card p-3 shadow mt-3">
                <p><strong>Students Present:</strong> {exam.studentsPresent}</p>
                <p><strong>Passed:</strong> {exam.passed}</p>
                <p><strong>Failed:</strong> {exam.failed}</p>
            </div>

            <h5 className="mt-4 fw-bold">Student Performance</h5>

            <div className="table-responsive mt-3">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Questions Attended</th>
                            <th>Wrong Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exam.studentDetails.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>
                                    <span
                                        className={`badge px-3 py-2 ${student.status === "Passed"
                                            ? "bg-success"
                                            : "bg-danger"
                                            }`}
                                    >
                                        {student.status}
                                    </span>
                                </td>
                                <td>{student.score}</td>
                                <td>{student.attended}</td>
                                <td>{student.wrongQuestions.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default CompletedExamDetails;
