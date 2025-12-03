import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import Select from "react-select";

const Batches = () => {
    const courses = [
        { id: "python", name: "Python" },
        { id: "javascript", name: "JavaScript" },
        { id: "react", name: "React" },
        { id: "uiux", name: "UI/UX Design" },
    ];

    const [batches, setBatches] = useState([
        {
            id: 1, name: "10th", course: "Python", start: "2025-02-01", end: "2025-04-15", students: 25,
            status: "Active",
        },
        {
            id: 2, name: "9th", course: "JavaScript", start: "2025-01-10", end: "2025-03-28", students: 20,
            status: "Active"
        },
        {
            id: 3, name: "7th", course: "React", start: "2024-02-01", end: "2024-04-15", students: 18,
            status: "Completed",
        },
        {
            id: 4, name: "8th", course: "UI/UX Design", start: "2023-01-10", end: "2023-03-28", students: 16,
            status: "Completed"
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const [newBatch, setNewBatch] = useState({
        name: "",
        course: "",
        start: "",
        end: "",
        trainer: "",
        students: "",
        status: "Active",
    });

    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("all");

    const handleAddBatch = () => {
        if (!newBatch.name || !newBatch.course) return;

        const updated = [...batches, { id: Date.now(), ...newBatch }];

        setBatches(updated);

        setNewBatch({
            name: "",
            course: "",
            start: "",
            end: "",
            trainer: "",
            students: "",
            status: "Active",
        });

        setShowModal(false);
    };

    const handleDelete = (id) => {
        const updated = batches.filter((b) => b.id !== id);
        setBatches(updated);
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="fw-bold m-0">Batches</h3>

                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Batch
                    </button>
                </div>

                <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "10px" }}>
                    <div className="d-flex justify-content-between mb-4">


                        <div style={{ width: "280px" }}>
                            <label className="form-label fw-bold mb-1">Filter by Course</label>

                            <Select
                                options={[
                                    { value: "all", label: "All Courses" },
                                    ...courses.map((c) => ({
                                        value: c.name,
                                        label: c.name,
                                    })),
                                ]}
                                value={{
                                    value: filterCourse,
                                    label: filterCourse === "all" ? "All Courses" : filterCourse,
                                }}
                                onChange={(selected) => setFilterCourse(selected.value)}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Select course..."
                            />
                        </div>
                        <div style={{ width: "280px" }}>
                            <label className="form-label fw-bold mb-1">Search Batch</label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search batch..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    fontSize: "15px",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead className="table-primary">
                                <tr>
                                    <th>Batch Name</th>
                                    <th>Course</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Students</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {batches
                                    .filter((b) =>
                                        filterCourse === "all" ? true : b.course === filterCourse
                                    )
                                    .filter((b) =>
                                        b.name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((b) => (
                                        <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{b.course}</td>
                                            <td>{b.start}</td>
                                            <td>{b.end}</td>
                                            <td>{b.students || 0}</td>
                                            <td>
                                                <span
                                                    className={`badge ${b.status === "Active"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                        }`}
                                                >
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-primary me-2">
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(b.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {batches.length === 0 && (
                            <p className="text-center text-muted">No batches available.</p>
                        )}
                    </div>
                </div>

                {showModal && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="bg-white p-4 rounded" style={{ width: "450px" }}>
                            <h4 className="fw-bold mb-3">Add New Batch</h4>

                            <label className="form-label">Batch Name</label>
                            <input
                                type="text"
                                className="form-control mb-3"
                                value={newBatch.name}
                                onChange={(e) =>
                                    setNewBatch({ ...newBatch, name: e.target.value })
                                }
                            />

                            <label className="form-label">Course</label>
                            <select
                                className="form-select mb-3"
                                value={newBatch.course}
                                onChange={(e) =>
                                    setNewBatch({ ...newBatch, course: e.target.value })
                                }
                            >
                                <option value="">Choose...</option>
                                {courses.map((c) => (
                                    <option key={c.id} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <div className="d-flex gap-2">
                                <div className="flex-fill">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control mb-3"
                                        value={newBatch.start}
                                        onChange={(e) =>
                                            setNewBatch({ ...newBatch, start: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex-fill">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control mb-3"
                                        value={newBatch.end}
                                        onChange={(e) =>
                                            setNewBatch({ ...newBatch, end: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <label className="form-label">Students</label>
                            <input
                                type="number"
                                className="form-control mb-3"
                                value={newBatch.students}
                                onChange={(e) =>
                                    setNewBatch({ ...newBatch, students: e.target.value })
                                }
                            />

                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button className="btn btn-primary" onClick={handleAddBatch}>
                                    Add Batch
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Batches;
