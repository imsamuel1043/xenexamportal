import React, { useState } from "react";
import Select from "react-select";
import AdminLayout from "../Layouts/AdminLayout";



const courses = [
    { id: 1, name: "UI/UX Design" },
    { id: 2, name: "Javascript" },
    { id: 3, name: "Python Programming" },
    { id: 4, name: "React Development" },
    { id: 5, name: "Digital Marketing" },
    { id: 6, name: "Multimedia & Animations" },
    { id: 7, name: "Creative Design" },

];

const initialQuestions = [
    { id: 1, courseId: 1, question: "What is UX?" },
    { id: 2, courseId: 1, question: "Explain Wireframe." },
    { id: 3, courseId: 2, question: "How do you declare a variable in JavaScript?" },
    { id: 4, courseId: 2, question: "What is JavaScript used for?" },
    { id: 5, courseId: 2, question: "What does console.log() do?" },
    { id: 6, courseId: 3, question: "What is a variable in Python?" },
    { id: 7, courseId: 3, question: "What function is used to display output in Python?" },
    { id: 8, courseId: 3, question: "What symbol is used for comments in Python?" },
    { id: 9, courseId: 4, question: "What is JSX?" },
    { id: 10, courseId: 4, question: "Explain useEffect hook." },
    { id: 11, courseId: 5, question: "What is social media marketing?" },
    { id: 12, courseId: 5, question: "What is the purpose of Google Ads?" },
    { id: 13, courseId: 6, question: "What is animation?" },
    { id: 14, courseId: 6, question: "What is the difference between 2D and 3D animation?" },
    { id: 15, courseId: 7, question: "What is graphic design?" },
    { id: 16, courseId: 7, question: "What is the purpose of a color palette?" },
];


const QuestionBank = () => {
    const [selectedCourse, setSelectedCourse] = useState("all");

    const [questions, setQuestions] = useState(initialQuestions);

    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");

    const [newQuestionCourse, setNewQuestionCourse] = useState("");

    const filteredQuestions =
        selectedCourse === "all"
            ? questions : questions.filter((q) =>
                q.courseId === Number(selectedCourse));


    const handleAddQuestion = () => {
        if (!newQuestion || !newQuestionCourse) return;

        const newEntry = {
            id: questions.length + 1,
            question: newQuestion,
            courseId: Number(newQuestionCourse),
        };

        setQuestions([...questions, newEntry]);
        setShowModal(false);
        setNewQuestion("");
    };

    return (


        <AdminLayout>
            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold">Question Bank</h3>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Question
                    </button>

                </div>

                <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "8px", width: "100%" }}>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Filter by Course</label>

                        <div style={{ width: "280px" }}>
                            <Select
                                options={[
                                    { value: "all", label: "All Courses" },
                                    ...courses.map((c) => ({
                                        value: c.id,
                                        label: c.name,
                                    })),
                                ]}
                                onChange={(selectedOption) => setSelectedCourse(selectedOption.value)}
                                placeholder="Select course"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        border: "1px solid #00000018",
                                        backgroundColor: "#f0f4ff",
                                        borderRadius: "8px",
                                        padding: "3px",
                                        boxShadow: "none",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? "#dce6ff" : "white",
                                        color: "#222",
                                        padding: "10px",
                                        cursor: "pointer",
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: "#333",
                                        fontWeight: "500",
                                    }),
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-bordered shadow-sm">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Course</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredQuestions.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center p-3">
                                        No questions found
                                    </td>
                                </tr>
                            ) : (
                                filteredQuestions.map((q) => {
                                    const course = courses.find((c) => c.id === q.courseId);
                                    return (
                                        <tr key={q.id}>
                                            <td>{q.id}</td>
                                            <td>{q.question}</td>
                                            <td>{course.name}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>


                    {showModal && (
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{ background: "rgba(0,0,0,0.5)" }}
                        >
                            <div className="bg-white p-4 rounded" style={{ width: "400px" }}>
                                <h5 className="fw-bold mb-3">Add New Question</h5>

                                <label className="form-label">Select Course</label>

                                <Select
                                    className="mb-3"
                                    options={courses.map((c) => ({
                                        value: c.id,
                                        label: c.name
                                    }))}
                                    value={
                                        newQuestionCourse
                                            ? {
                                                value: newQuestionCourse,
                                                label: courses.find((c) => c.id === newQuestionCourse)?.name
                                            }
                                            : null
                                    }
                                    onChange={(selected) => setNewQuestionCourse(selected.value)}
                                    placeholder="Choose a course..."
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            border: "1px solid #00000018",
                                            borderRadius: "10px",
                                            padding: "2px",
                                            boxShadow: "none"
                                        }),
                                    }}
                                />

                                <label className="form-label">Question</label>
                                <textarea
                                    className="form-control mb-3"
                                    rows="3"
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    style={{border: "1px solid #00000018",}}
                                    ></textarea>

                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>

                                    <button className="btn btn-primary" onClick={handleAddQuestion}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AdminLayout>
    );
};

export default QuestionBank;
