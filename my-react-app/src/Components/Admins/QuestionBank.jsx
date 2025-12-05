import React, { useState, useContext } from "react";
import Select from "react-select";
import AdminLayout from "../Layouts/AdminLayout";
import { DataContext } from "../DataContext";

const courses = [
    { id: 1, name: "UI/UX Design" },
    { id: 2, name: "Javascript" },
    { id: 3, name: "Python Programming" },
    { id: 4, name: "React Development" },
    { id: 5, name: "Digital Marketing" }
];

const QuestionBank = () => {
    const { questions, setQuestions } = useContext(DataContext);

    const [selectedCourse, setSelectedCourse] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        courseId: "",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correct: "A"
    });

    const filteredQuestions =
        selectedCourse === "all"
            ? questions
            : questions.filter((q) => q.courseId === Number(selectedCourse));

    const handleOpenModal = () => {
        setEditingId(null);
        setForm({
            courseId: "",
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "A"
        });
        setShowModal(true);
    };

    const handleEdit = (q) => {
        setEditingId(q.id);
        setForm(q);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        const updated = questions.filter((q) => q.id !== id);
        setQuestions(updated);
    };

    const handleSubmit = () => {
        if (!form.courseId || !form.question) return;

        const courseQuestions = questions.filter(q => q.courseId === Number(form.courseId));

        if (!editingId && courseQuestions.length >= 5) {
            alert("❗ You can store only 5 questions per course!");
            return;
        }

        if (editingId) {
            const updated = questions.map((q) => (q.id === editingId ? form : q));
            setQuestions(updated);
        } else {
            const newEntry = {
                ...form,
                id: questions.length + 1
            };
            setQuestions([...questions, newEntry]);
        }

        setShowModal(false);
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <div className="d-flex justify-content-between">
                    <h3 className="fw-bold">Question Bank</h3>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        + Add Question
                    </button>
                </div>

                <div className="card p-3 mt-3">
                    <Select
                        options={[
                            { value: "all", label: "All Courses" },
                            ...courses.map((c) => ({
                                value: c.id,
                                label: c.name
                            }))
                        ]}
                        onChange={(opt) => setSelectedCourse(opt.value)}
                        placeholder="Filter by course"
                    />
                </div>

                <table className="table table-bordered mt-3">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Question</th>
                            <th>Course</th>
                            <th>Correct</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredQuestions.map((q) => (
                            <tr key={q.id}>
                                <td>{q.id}</td>
                                <td>{q.question}</td>
                                <td>{courses.find((c) => c.id === q.courseId)?.name}</td>
                                <td>{q.correct}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(q)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(q.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="overlay">
                        <div className="modal-box p-4 rounded bg-white" style={{ width: "450px" }}>
                            <h5 className="fw-bold mb-3">{editingId ? "Edit Question" : "Add Question"}</h5>

                            <label>Course</label>
                            <Select
                                className="mb-3"
                                options={courses.map((c) => ({
                                    value: c.id,
                                    label: c.name
                                }))}
                                onChange={(opt) => setForm({ ...form, courseId: opt.value })}
                                value={
                                    form.courseId
                                        ? {
                                            value: form.courseId,
                                            label: courses.find((c) => c.id === form.courseId)?.name
                                        }
                                        : null
                                }
                            />

                            <label>Question</label>
                            <textarea
                                className="form-control mb-3"
                                rows="2"
                                value={form.question}
                                onChange={(e) => setForm({ ...form, question: e.target.value })}
                            />

                            {["A", "B", "C", "D"].map((opt) => (
                                <div key={opt} className="mb-2">
                                    <label>Option {opt}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form[`option${opt}`]}
                                        onChange={(e) =>
                                            setForm({ ...form, [`option${opt}`]: e.target.value })
                                        }
                                    />
                                </div>
                            ))}

                            <label className="mt-2">Correct Answer</label>
                            <select
                                className="form-control mb-3"
                                value={form.correct}
                                onChange={(e) => setForm({ ...form, correct: e.target.value })}
                            >
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                            </select>

                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default QuestionBank;
