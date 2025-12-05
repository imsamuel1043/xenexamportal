import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

const ExamResults = () => {
  const [results, setResults] = useState([
    { id: 1, student: "samuel", exam: "React", batch: "Batch 9", date: "2025-02-10", score: "85%" },
    { id: 2, student: "Prabin Kumar", exam: "JavaScript", batch: "Batch 12", date: "2025-02-12", score: "92%" },
    { id: 3, student: "Vibina", exam: "UI/UX Design", batch: "Batch 7", date: "2025-02-13", score: "78%" },
  ]);

  const [search, setSearch] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 

  const handleRemove = (id) => {
    setResults(results.filter((r) => r.id !== id));
  };

  const handleEditClick = (result) => {
    setEditingResult({ ...result });
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingResult({ student: "", exam: "", batch: "", date: "", score: "" });
    setIsAdding(true);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (isAdding) {
      const newResult = { ...editingResult, id: Math.floor(Math.random() * 10000) };
      setResults([...results, newResult]);
    } else {
      setResults((prev) =>
        prev.map((r) => (r.id === editingResult.id ? editingResult : r))
      );
    }
    setShowModal(false);
  };

  const filteredResults = results.filter((r) => {
    return (
      r.student.toLowerCase().includes(search.toLowerCase()) &&
      (filterBatch ? r.batch === filterBatch : true) &&
      (filterCourse ? r.exam === filterCourse : true)
    );
  });

  const uniqueBatches = [...new Set(results.map((r) => r.batch))];
  const uniqueCourses = [...new Set(results.map((r) => r.exam))];

  return (
    <AdminLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Exam Results</h3>
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add Result
          </button>
        </div>

        <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "8px" }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex gap-3">
              <select
                className="form-select"
                style={{ width: "180px" }}
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
              >
                <option value=""> Batch</option>
                {uniqueBatches.map((b, index) => (
                  <option key={index} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                className="form-select"
                style={{ width: "180px" }}
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option value="">Exam</option>
                {uniqueCourses.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                className="form-control"
                style={{ width: "250px" }}
                placeholder="Search name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <table className="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Student</th>
                    <th>Exam</th>
                    <th>Batch</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((r) => (
                    <tr key={r.id}>
                      <td>{r.student}</td>
                      <td>{r.exam}</td>
                      <td>{r.batch}</td>
                      <td>{r.date}</td>
                      <td className="fw-bold">{r.score}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditClick(r)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(r.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredResults.length === 0 && (
                <p className="text-center text-muted">No matching records found.</p>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          >
            <div className="bg-white p-4 rounded" style={{ width: "400px" }}>
              <h5 className="fw-bold mb-3">{isAdding ? "Add Result" : "Edit Result"}</h5>

              <label className="form-label">Student Name</label>
              <input
                type="text"
                className="form-control mb-2"
                name="student"
                value={editingResult.student}
                onChange={handleModalChange}
              />

              <label className="form-label">Exam</label>
              <input
                type="text"
                className="form-control mb-2"
                name="exam"
                value={editingResult.exam}
                onChange={handleModalChange}
              />

              <label className="form-label">Batch</label>
              <input
                type="text"
                className="form-control mb-2"
                name="batch"
                value={editingResult.batch}
                onChange={handleModalChange}
              />

              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control mb-2"
                name="date"
                value={editingResult.date}
                onChange={handleModalChange}
              />

              <label className="form-label">Score</label>
              <input
                type="text"
                className="form-control mb-3"
                name="score"
                value={editingResult.score}
                onChange={handleModalChange}
              />

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>
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

export default ExamResults;
