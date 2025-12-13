import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import Select from "react-select";
import "../../assets/Css/Batches.css";

const Batches = () => {
  const tableRef = useRef(null);
  const dataTable = useRef(null);

  const courses = [
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "react", name: "React" },
    { id: "uiux", name: "UI/UX Design" },
  ];

  const [batches, setBatches] = useState([
    {
      id: 1,
      name: "10th",
      course: "Python",
      start: "2025-02-01",
      end: "2025-04-15",
      students: 25,
      status: "Active",
    },
    {
      id: 2,
      name: "9th",
      course: "JavaScript",
      start: "2025-01-10",
      end: "2025-03-28",
      students: 20,
      status: "Active",
    },
    {
      id: 3,
      name: "7th",
      course: "React",
      start: "2024-02-01",
      end: "2024-04-15",
      students: 18,
      status: "Completed",
    },
    {
      id: 4,
      name: "8th",
      course: "UI/UX Design",
      start: "2023-01-10",
      end: "2023-03-28",
      students: 16,
      status: "Completed",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newBatch, setNewBatch] = useState({
    name: "",
    course: "",
    start: "",
    end: "",
    students: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  /* ===============================
     DataTable Init / Re-init
  =============================== */
  useEffect(() => {
    if (window.$ && tableRef.current) {
      if (dataTable.current) {
        dataTable.current.destroy();
      }

      dataTable.current = window.$(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        columnDefs: [
          { orderable: false, targets: 6 }, // Action column
        ],
      });
    }
  }, [batches]);

  /* ===============================
     External Search (React → DataTable)
  =============================== */
  useEffect(() => {
    if (dataTable.current) {
      dataTable.current.search(search).draw();
    }
  }, [search]);

  /* ===============================
     Course Filter (React → DataTable)
  =============================== */
  useEffect(() => {
    if (!dataTable.current) return;

    if (filterCourse === "all") {
      dataTable.current.column(1).search("").draw();
    } else {
      dataTable.current.column(1).search(filterCourse).draw();
    }
  }, [filterCourse]);

  /* ===============================
     CRUD Functions
  =============================== */
  const handleSaveBatch = () => {
    if (!newBatch.name || !newBatch.course) return;

    if (editMode) {
      setBatches((prev) =>
        prev.map((b) => (b.id === editId ? { ...b, ...newBatch } : b))
      );
    } else {
      setBatches((prev) => [...prev, { id: Date.now(), ...newBatch }]);
    }

    setNewBatch({
      name: "",
      course: "",
      start: "",
      end: "",
      students: "",
      status: "Active",
    });

    setEditMode(false);
    setShowModal(false);
  };

  const handleEdit = (batch) => {
    setEditMode(true);
    setEditId(batch.id);
    setNewBatch(batch);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3 gap-3">
          <h3 className="fw-bold m-0">Batches</h3>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditMode(false);
              setShowModal(true);
            }}
          >
            + Add Batch
          </button>
        </div>

        {/* Filters */}
        <div className="card shadow-sm p-3 mb-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-bold">Filter by Course</label>
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
                  label:
                    filterCourse === "all" ? "All Courses" : filterCourse,
                }}
                onChange={(s) => setFilterCourse(s.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Search</label>
              <input
                className="form-control"
                placeholder="Search batch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-light border w-100"
                onClick={() => {
                  setSearch("");
                  setFilterCourse("all");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        
        <div className="card shadow-sm">
          <div className="card-body table-responsive">
            <table ref={tableRef} className="table table-hover w-100">
              <thead>
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
                {batches.map((b) => (
                  <tr key={b.id}>
                    <td>{b.name}</td>
                    <td>{b.course}</td>
                    <td>{b.start}</td>
                    <td>{b.end}</td>
                    <td>{b.students || 0}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="d-flex gap-1 flex-wrap">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(b)}
                      >
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
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          >
            <div className="bg-white p-4 rounded w-100" style={{ maxWidth: 500 }}>
              <h4 className="fw-bold mb-3">
                {editMode ? "Edit Batch" : "Add Batch"}
              </h4>

              <input
                className="form-control mb-3"
                placeholder="Batch Name"
                value={newBatch.name}
                onChange={(e) =>
                  setNewBatch({ ...newBatch, name: e.target.value })
                }
              />

              <select
                className="form-select mb-3"
                value={newBatch.course}
                onChange={(e) =>
                  setNewBatch({ ...newBatch, course: e.target.value })
                }
              >
                <option value="">Choose Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="d-flex gap-2">
                <input
                  type="date"
                  className="form-control"
                  value={newBatch.start}
                  onChange={(e) =>
                    setNewBatch({ ...newBatch, start: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="form-control"
                  value={newBatch.end}
                  onChange={(e) =>
                    setNewBatch({ ...newBatch, end: e.target.value })
                  }
                />
              </div>

              <input
                type="number"
                className="form-control my-3"
                placeholder="Students"
                value={newBatch.students}
                onChange={(e) =>
                  setNewBatch({ ...newBatch, students: e.target.value })
                }
              />

              <div className="text-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveBatch}>
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

export default Batches;
