import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Batches.css";

const Batches = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [batches, setBatches] = useState([
    { id: 1, name: "10th", course: "Python", start: "2025-02-01", end: "2025-04-15", students: 25, status: "Active" },
    { id: 2, name: "9th", course: "JavaScript", start: "2025-01-10", end: "2025-03-28", students: 20, status: "Active" },
    { id: 3, name: "7th", course: "React", start: "2024-02-01", end: "2024-04-15", students: 18, status: "Completed" },
    { id: 4, name: "8th", course: "UI/UX Design", start: "2023-01-10", end: "2023-03-28", students: 16, status: "Completed" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeBatchId, setActiveBatchId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); 

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    start: "",
    end: "",
    students: "",
    status: "Active",
  });

  useEffect(() => {
    if (!tableRef.current || dtInstance.current) return;

    const table = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      columnDefs: [{ orderable: false, targets: 6 }],
      language: {
        search: "",
        searchPlaceholder: "Search...",
        lengthMenu: " _MENU_ ",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        paginate: { previous: "‹", next: "›" },
      },
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
      dtInstance.current = null;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEditBatch = () => {
    if (!formData.name || !formData.course) return;

    if (editMode) {
      setBatches(prev => prev.map(b => (b.id === activeBatchId ? { ...b, ...formData } : b)));
    } else {
      setBatches(prev => [...prev, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", course: "", start: "", end: "", students: "", status: "Active" });
    setShowModal(false);
    setEditMode(false);
    setActiveBatchId(null);
  };

  const handleEdit = (batch) => {
    setFormData(batch);
    setActiveBatchId(batch.id);
    setEditMode(true);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    setBatches(prev => prev.filter(b => b.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h2 className="page-title">Batches Management</h2>
          <button className="add-student-btn" onClick={() => setShowModal(true)}>
            + Add Batch
          </button>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
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
                    <td>{b.students}</td>
                    <td>
                      <span className={`status-pill ${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button className="icon-btn view" onClick={() => handleEdit(b)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="icon-btn delete" onClick={() => confirmDelete(b.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>{editMode ? "Edit Batch" : "Add Batch"}</h3>
                <div className="modal-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Batch Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleChange}
                  />
                  <div className="d-flex gap-2">
                    <input type="date" name="start" value={formData.start} onChange={handleChange} />
                    <input type="date" name="end" value={formData.end} onChange={handleChange} />
                  </div>
                  <input type="number" name="students" placeholder="Students" value={formData.students} onChange={handleChange} />
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn-add" onClick={handleAddEditBatch}>
                    {editMode ? "Save Changes" : "Add Batch"}
                  </button>
                </div>
              </div>
            </div>
          )}

          
          {deleteId && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this batch?</p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
                  <button className="btn-delete" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default Batches;
