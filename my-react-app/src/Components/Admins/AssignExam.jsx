import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import '../../assets/Css/AssignExam.css';

const AssignExam = () => {
    const [examData, setExamData] = useState({
        title: "",
        date: "",
        duration: "",
        className: "",
        totalMarks: "",
    });

    const handleChange = (e) => {
        setExamData({ ...examData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Assigned Exam Details:", examData);
        alert("Exam Assigned Successfully!");
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="fw-bold mb-2">Assign Exam</h3>

            </div>


            <div className="assign-exam-container">


                <form onSubmit={handleSubmit} className="assign-form">

                    <div className="form-row">
                        <div className="form-group">
                            <label>Exam</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Exam"
                                value={examData.title}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={examData.date}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                placeholder="60"
                                value={examData.duration}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Course</label>
                            <select
                                name="className"
                                value={examData.className}
                                onChange={handleChange}
                                required
                                className="form-input"
                            >

                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Fullstack Development">Fullstack Development</option>
                                <option value="Front-end Development">Front-end Development</option>
                                <option value="Graphic Design">Graphic Design</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group half-width">
                        <label>Total Marks</label>
                        <input
                            type="number"
                            name="totalMarks"
                            placeholder="Total marks"
                            value={examData.totalMarks}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn btn-primary">
                        Assign Exam
                    </button>
                </form>
            </div>

        </AdminLayout>
    );
};

export default AssignExam;
