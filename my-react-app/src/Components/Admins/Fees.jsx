import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Fees.css";

const Fees = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Rahul",
            course: "Digital Marketing",
            totalFee: 25000,
            paid: 20000,
            lastPayment: "2025-01-05",
        },
        {
            id: 2,
            name: "Priya",
            course: "UI/UX Designing",
            totalFee: 30000,
            paid: 30000,
            lastPayment: "2025-01-10",
        },
        {
            id: 3,
            name: "Prabin",
            course: "Full Stack Development",
            totalFee: 45000,
            paid: 0,
            lastPayment: null,
        },
    ]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [courseFilter, setCourseFilter] = useState("All");

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("payment"); 

    const [selectedStudent, setSelectedStudent] = useState("");
    const [amount, setAmount] = useState("");

    const [newStudent, setNewStudent] = useState({
        name: "",
        course: "",
        totalFee: "",
    });

    const getStatus = (s) => {
        if (s.paid === 0) return "Not Paid";
        if (s.paid >= s.totalFee) return "Paid";
        return "Partial";
    };

    const filtered = students.filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || getStatus(s) === statusFilter;
        const matchesCourse = courseFilter === "All" || s.course === courseFilter;
        return matchesSearch && matchesStatus && matchesCourse;
    });

    const courses = [...new Set(students.map((s) => s.course))];

    const submitPayment = () => {
        if (!selectedStudent || !amount || isNaN(amount)) {
            alert("Please enter valid details.");
            return;
        }

        setStudents(
            students.map((s) =>
                s.id === Number(selectedStudent)
                    ? {
                          ...s,
                          paid: Number(s.paid) + Number(amount),
                          lastPayment: new Date().toISOString().slice(0, 10),
                      }
                    : s
            )
        );

        setShowModal(false);
        setAmount("");
        setSelectedStudent("");
    };

    const addNewStudent = () => {
        if (!newStudent.name || !newStudent.course || !newStudent.totalFee) {
            alert("Please fill all details");
            return;
        }

        const newEntry = {
            id: students.length + 1,
            name: newStudent.name,
            course: newStudent.course,
            totalFee: Number(newStudent.totalFee),
            paid: 0,
            lastPayment: null,
        };

        setStudents([...students, newEntry]);

        setNewStudent({ name: "", course: "", totalFee: "" });
        setShowModal(false);
    };

    return (
        <AdminLayout>
            <div className="container mt-3 mb-5">
                <h3 className="fw-bold mb-3">Fees Management</h3>

                <div className="card p-3 shadow-sm mb-4">
                    <div className="fees-topbar">
                        
                        <div className="fees-left">
                            <div>
                                <label className="form-label fw-bold">Status</label>
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Not Paid">Not Paid</option>
                                </select>
                            </div>

                            <div>
                                <label className="form-label fw-bold">Course</label>
                                <select
                                    className="form-select"
                                    value={courseFilter}
                                    onChange={(e) => setCourseFilter(e.target.value)}
                                >
                                    <option value="All">All Courses</option>
                                    {courses.map((c, i) => (
                                        <option key={i} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="fees-right">
                            <div>
                                <label className="form-label fw-bold">Search Student</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search student..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn btn-primary add-fee-btn"
                                onClick={() => {
                                    setModalType("student");
                                    setShowModal(true);
                                }}
                            >
                                + Add Student
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm p-3">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Total Fee</th>
                                    <th>Paid</th>
                                    <th>Pending</th>
                                    <th>Status</th>
                                    <th>Last Payment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.name}</td>
                                        <td>{s.course}</td>
                                        <td>₹{s.totalFee}</td>
                                        <td className="text-success fw-bold">₹{s.paid}</td>
                                        <td className="text-danger fw-bold">₹{s.totalFee - s.paid}</td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    getStatus(s) === "Paid"
                                                        ? "bg-success"
                                                        : getStatus(s) === "Partial"
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {getStatus(s)}
                                            </span>
                                        </td>

                                        <td>{s.lastPayment ? s.lastPayment : "—"}</td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => {
                                                    setSelectedStudent(s.id);
                                                    setModalType("payment");
                                                    setShowModal(true);
                                                }}
                                            >
                                                Add Payment
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filtered.length === 0 && (
                            <p className="text-center text-muted pt-3">
                                No records found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">

                        <div className="d-flex mb-3 gap-3">
                            <button
                                className={`btn ${modalType === "payment" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setModalType("payment")}
                            >
                                Add Payment
                            </button>

                            <button
                                className={`btn ${modalType === "student" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setModalType("student")}
                            >
                                Add Student
                            </button>
                        </div>

                        {modalType === "payment" && (
                            <>
                                <h4 className="fw-bold mb-3">Add Fee Payment</h4>

                                <label className="form-label fw-bold">Student</label>
                                <select
                                    className="form-select mb-3"
                                    value={selectedStudent}
                                    onChange={(e) => setSelectedStudent(e.target.value)}
                                >
                                    <option value="">Select student</option>
                                    {students.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>

                                <label className="form-label fw-bold">Amount</label>
                                <input
                                    type="number"
                                    className="form-control mb-4"
                                    placeholder="Enter amount..."
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>

                                    <button className="btn btn-primary" onClick={submitPayment}>
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}

                        {modalType === "student" && (
                            <>
                                <h4 className="fw-bold mb-3">Add New Student</h4>

                                <label className="form-label fw-bold">Name</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Enter name..."
                                    value={newStudent.name}
                                    onChange={(e) =>
                                        setNewStudent({ ...newStudent, name: e.target.value })
                                    }
                                />

                                <label className="form-label fw-bold">Course</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Enter course..."
                                    value={newStudent.course}
                                    onChange={(e) =>
                                        setNewStudent({ ...newStudent, course: e.target.value })
                                    }
                                />

                                <label className="form-label fw-bold">Total Fee</label>
                                <input
                                    type="number"
                                    className="form-control mb-4"
                                    placeholder="Enter total fee..."
                                    value={newStudent.totalFee}
                                    onChange={(e) =>
                                        setNewStudent({ ...newStudent, totalFee: e.target.value })
                                    }
                                />

                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>

                                    <button className="btn btn-primary" onClick={addNewStudent}>
                                        Add Student
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Fees;
