import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const Fees = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [students, setStudents] = useState([
    { id: 1, name: "Rahul", course: "Digital Marketing", totalFee: 25000, paid: 20000, lastPayment: "2025-01-05" },
    { id: 2, name: "Priya", course: "UI/UX Designing", totalFee: 30000, paid: 30000, lastPayment: "2025-01-10" },
    { id: 3, name: "Prabin", course: "Full Stack Development", totalFee: 45000, paid: 0, lastPayment: null },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    totalFee: "",
    paid: "",
    lastPayment: "",
  });

  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const courses = [...new Set(students.map((s) => s.course))];
  const statuses = ["Paid", "Partial", "Not Paid"];

  const getStatus = (s) => {
    if (s.paid === 0) return "Not Paid";
    if (s.paid >= s.totalFee) return "Paid";
    return "Partial";
  };

  
  useEffect(() => {
    if (!tableRef.current) return;

    dtInstance.current = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      columnDefs: [{ orderable: false, targets: 7 }],
      language: {
        search: "",
        searchPlaceholder: "Search...",
        lengthMenu: " _MENU_ ",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        paginate: { previous: "‹", next: "›" },
      },
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
    });

    return () => {
      dtInstance.current.destroy();
      dtInstance.current = null;
    };
  }, []);

  
  useEffect(() => {
    if (!dtInstance.current) return;

    const table = dtInstance.current;

    const courseRegex = courseFilter === "all" ? "" : `^${courseFilter}$`;
    table.column(1).search(courseRegex, true, false);

    const statusRegex = statusFilter === "all" ? "" : `^${statusFilter}$`;
    table.column(5).search(statusRegex, true, false);

    table.draw();
  }, [courseFilter, statusFilter, students]);

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ name: "", course: "", totalFee: "", paid: "", lastPayment: "" });
    setShowModal(true);
  };

  const openEditModal = (student, index) => {
    setIsEdit(true);
    setEditIndex(index);
    setFormData({
      name: student.name,
      course: student.course,
      totalFee: student.totalFee,
      paid: student.paid,
      lastPayment: student.lastPayment || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.course || !formData.totalFee || formData.paid === "") return;

    if (isEdit) {
      setStudents((prev) =>
        prev.map((s, i) =>
          i === editIndex
            ? { ...s, ...formData, totalFee: Number(formData.totalFee), paid: Number(formData.paid) }
            : s
        )
      );
    } else {
      const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        ...formData,
        totalFee: Number(formData.totalFee),
        paid: Number(formData.paid),
        lastPayment: formData.lastPayment || new Date().toISOString().slice(0, 10),
      };
      setStudents((prev) => [...prev, newStudent]);
    }

    setShowModal(false);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h2 className="page-title">Fees Management</h2>
          <button className="add-student-btn" onClick={openAddModal}>+ Add Student</button>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th style={{ position: "relative" }}>
                    Course
                    <i className="bi bi-funnel filter-icon ms-1" style={{ cursor: "pointer" }}
                      onClick={() => setShowCourseDropdown(!showCourseDropdown)}></i>
                    {showCourseDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "25px",
                          left: 0,
                          zIndex: 1000,
                          background: "#fff",
                          border: "1px solid #ccc",
                          padding: "5px",
                        }}
                      >
                        <select
                          className="form-select form-select-sm"
                          value={courseFilter}
                          onChange={(e) => {
                            setCourseFilter(e.target.value);
                            setShowCourseDropdown(false);
                          }}
                        >
                          <option value="all">All</option>
                          {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </select>
                      </div>
                    )}
                  </th>
                  <th>Total Fee</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th style={{ position: "relative" }}>
                    Status
                    <i className="bi bi-funnel filter-icon ms-1" style={{ cursor: "pointer" }}
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}></i>
                    {showStatusDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "25px",
                          left: 0,
                          zIndex: 1000,
                          background: "#fff",
                          border: "1px solid #ccc",
                          padding: "5px",
                        }}
                      >
                        <select
                          className="form-select form-select-sm"
                          value={statusFilter}
                          onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setShowStatusDropdown(false);
                          }}
                        >
                          <option value="all">All</option>
                          {statuses.map((s, i) => <option key={i} value={s}>{s}</option>)}
                        </select>
                      </div>
                    )}
                  </th>
                  <th>Last Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, index) => (
                  <tr key={index}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>₹{s.totalFee}</td>
                    <td>₹{s.paid}</td>
                    <td>₹{s.totalFee - s.paid}</td>
                    <td>
                      <span className={`status-pill ${getStatus(s).toLowerCase().replace(" ", "-")}`}>
                        {getStatus(s)}
                      </span>
                    </td>
                    <td>{s.lastPayment || "—"}</td>
                    <td className="action-cell">
                      <button className="icon-btn view" onClick={() => openEditModal(s, index)}><i className="bi bi-pencil"></i></button>
                      <button className="icon-btn delete" onClick={() => confirmDelete(index)}><i className="bi bi-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>{isEdit ? "Edit Student" : "Add Student"}</h3>
              <div className="modal-form">
                <input type="text" placeholder="Student Name" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="Course" value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })} className="form-control mb-2" />
                <input type="number" placeholder="Total Fee" value={formData.totalFee}
                  onChange={(e) => setFormData({ ...formData, totalFee: e.target.value })} className="form-control mb-2" />
                <input type="number" placeholder="Paid Amount" value={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: e.target.value })} className="form-control mb-2" />
                <input type="date" placeholder="Last Payment Date" value={formData.lastPayment}
                  onChange={(e) => setFormData({ ...formData, lastPayment: e.target.value })} className="form-control mb-2" />
              </div>
              <div className="modal-actions mt-2">
                <button className="btn-cancel me-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-add" onClick={handleSave}>{isEdit ? "Update" : "Add"}</button>
              </div>
            </div>
          </div>
        )}

        
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box modal-delete">
              <h3>Delete Student?</h3>
              <p>Are you sure you want to delete this record?</p>
              <div className="modal-actions justify-content-center">
                <button className="btn-cancel me-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn-delete" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Fees;
