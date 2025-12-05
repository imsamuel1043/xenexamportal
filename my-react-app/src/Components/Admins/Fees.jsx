import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

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

    const getStatus = (s) => {
        if (s.paid === 0) return "Not Paid";
        if (s.paid >= s.totalFee) return "Paid";
        return "Partial";
    };

    const filtered = students.filter((s) => {
        const matchesSearch =
            s.name.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || getStatus(s) === statusFilter;

        const matchesCourse =
            courseFilter === "All" || s.course === courseFilter;

        return matchesSearch && matchesStatus && matchesCourse;
    });

    const handlePayment = (id) => {
        const amount = prompt("Enter the amount paid:");

        if (!amount || isNaN(amount)) return;

        setStudents(
            students.map((s) =>
                s.id === id
                    ? {
                          ...s,
                          paid: Number(s.paid) + Number(amount),
                          lastPayment: new Date().toISOString().slice(0, 10),
                      }
                    : s
            )
        );
    };

    const courses = [...new Set(students.map((s) => s.course))];

    return (
        <AdminLayout>
            <div className="container mt-3 mb-5">
                <h3 className="fw-bold mb-3">Fees Management</h3>

                <div className="card p-3 shadow-sm mb-4">

                    <div className="row g-3">

                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search student..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
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

                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                            >
                                <option value="All">All Courses</option>
                                {courses.map((c, i) => (
                                    <option key={i} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
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
                                        <td className="text-success fw-bold">
                                            ₹{s.paid}
                                        </td>
                                        <td className="text-danger fw-bold">
                                            ₹{s.totalFee - s.paid}
                                        </td>

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

                                        <td>
                                            {s.lastPayment ? s.lastPayment : "—"}
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    handlePayment(s.id)
                                                }
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
        </AdminLayout>
    );
};

export default Fees;
