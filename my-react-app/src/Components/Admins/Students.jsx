import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import "../../assets/Css/Student.css";

const Students = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [students, setStudents] = useState([
    { name: "Naja Fathima", course: "Full Stack Development", batch: "9th", status: "Inactive" },
    { name: "Prabin Kumar", course: "UI/UX Development", batch: "9th", status: "Active" },
    { name: "Samuel Morris", course: "Creative Designer", batch: "9th", status: "Active" },
    { name: "Vibina K M", course: "UI/UX Development", batch: "9th", status: "Active" },
    { name: "Aysha", course: "Digital Marketing", batch: "10th", status: "Active" },
    { name: "Riya Fathima", course: "Full Stack Development", batch: "10th", status: "Active" },
    { name: "Irfan", course: "Digital Marketing", batch: "10th", status: "Active" },
    { name: "Manu", course: "Creative Designer", batch: "10th", status: "Active" },
    { name: "Muhusina", course: "Full Stack Development", batch: "11th", status: "Active" },
    { name: "Sithara", course: "Creative Designer", batch: "10th", status: "Active" },
    { name: "Abel Bca", course: "UI/UX Development", batch: "9th", status: "Inactive" },
    { name: "Nidhin", course: "Digital Marketing", batch: "9th", status: "Inactive" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    batch: "",
    status: "Active",
  });

useEffect(() => {
  if (!tableRef.current || dtInstance.current) return;

  const table = new window.DataTable(tableRef.current, {
    responsive: true,
    ordering: true,
    searching: true,
    paging: true,
    pagingType: "simple_numbers",
    lengthChange: true,
    lengthMenu: [5, 10, 25, 50], 
    pageLength: 10,              
    language: {
      search: "",                
      searchPlaceholder: "Search...",
      lengthMenu: " _MENU_ ", 
      info: "Showing _START_ to _END_ of _TOTAL_ entries", 
      infoEmpty: "Showing 0 to 0 of 0 entries",
      infoFiltered: "(filtered from _MAX_ total entries)",
      paginate: {
        previous: "‹",
        next: "›"
      }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    if (!formData.name || !formData.course || !formData.batch) return;

    setStudents(prev => [...prev, formData]);

    dtInstance.current.row.add([
      formData.name,
      formData.course,
      formData.batch,
      `<span class="status-pill ${formData.status.toLowerCase()}">${formData.status}</span>`,
      `
      <div class="action-cell">
        <button class="icon-btn view"><i class="bi bi-eye"></i></button>
        <button class="icon-btn delete"><i class="bi bi-trash"></i></button>
      </div>
      `
    ]).draw(false);

    setShowModal(false);
    setFormData({ name: "", course: "", batch: "", status: "Active" });
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header">
          <h2 className="page-title">Students Management</h2>

          <button className="add-student-btn" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg"></i> Add Student
          </button>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, index) => (
                  <tr key={index}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.batch}</td>
                    <td>
                      <span className={`status-pill ${s.status.toLowerCase()}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button
                        className="icon-btn view"
                        onClick={() => navigate(`/students/${s.name}`)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() =>
                          setStudents(prev => prev.filter((_, i) => i !== index))
                        }
                      >
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
                <h3>Add Student</h3>

                <div className="modal-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
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
                  <input
                    type="text"
                    name="batch"
                    placeholder="Batch"
                    value={formData.batch}
                    onChange={handleChange}
                  />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-add" onClick={handleAddStudent}>
                    Add Student
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

export default Students;
