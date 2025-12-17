import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import "../../assets/Css/Student.css";

const Courses = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const dtInstance = useRef(null);
  const searchRef = useRef(null);

  const [courses, setCourses] = useState([
    { id: "1", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "2", course: "Fullstack Development", fee: 60000, batch: "9th", duration: "10 months" },
    { id: "3", course: "UI/UX Design", fee: 40000, batch: "9th", duration: "8 months" },
    { id: "4", course: "Creative Design", fee: 35000, batch: "9th", duration: "5 months" },
    { id: "5", course: "Python Development", fee: 50000, batch: "9th", duration: "7 months" },
    { id: "6", course: "Node.js Development", fee: 55000, batch: "9th", duration: "9 months" },
    { id: "7", course: "PHP Development", fee: 45000, batch: "9th", duration: "6 months" },
    { id: "8", course: "Multimedia & Animation", fee: 40000, batch: "9th", duration: "8 months" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [courseForm, setCourseForm] = useState({ id: "", course: "", fee: "", duration: "", batch: "9th" });

  useEffect(() => {
    if (!tableRef.current) return;

    if (dtInstance.current) dtInstance.current.destroy();

    dtInstance.current = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pagingType: "simple_numbers",
      info: false,
      pageLength: 7,
      dom: "<'dt-top'<'dt-title'>>t<'dt-bottom'p>",
    });

    if (searchRef.current) {
      searchRef.current.addEventListener("input", (e) => {
        dtInstance.current.search(e.target.value).draw();
      });
    }

    document.querySelector(".dt-title").innerHTML =
      "<h5 class='table-title'>Courses</h5>";

    return () => {
      if (dtInstance.current) dtInstance.current.destroy();
      dtInstance.current = null;
    };
  }, [courses]);

  const openAddModal = () => {
    setEditing(false);
    setCourseForm({ id: " " + Math.floor(1000 + Math.random() * 9000), course: "", fee: "", duration: "", batch: "9th" });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditing(true);
    setCourseForm(course);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!courseForm.course || !courseForm.fee || !courseForm.duration) return;

    if (editing) {
      setCourses(courses.map((c) => (c.id === courseForm.id ? courseForm : c)));
    } else {
      setCourses([...courses, courseForm]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header">
          <h2 className="page-title">Course Management</h2>
          <button className="add-student-btn" onClick={openAddModal}>
            <i className="bi bi-plus-lg"></i> Add Course
          </button>
        </div>

        <div className="student-management-box" style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          marginBottom: "20px"
        }}>
          <div className="dt-top" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
          }}>
            <div className="dt-title">
              <h5 className="table-title">Courses</h5>
            </div>
            <input
              type="text"
              className="student-search"
              placeholder="Search course..."
              ref={searchRef}
            />
          </div>

          <div className="students-wrapper">
            <div className="table-responsive">
              <table ref={tableRef} className="display students-table">
                <thead>
                  <tr className="tablehead">
                    <th>No</th>
                    <th>Course</th>
                    <th>Fee</th>
                    <th>Batch</th>
                    <th>Duration</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.course}</td>
                      <td>{c.fee}</td>
                      <td>{c.batch}</td>
                      <td>{c.duration}</td>
                      <td>
                        <button className="btn-view" onClick={() => openEditModal(c)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
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
                <h3>{editing ? "Edit Course" : "Add New Course"}</h3>

                <input
                  type="text"
                  placeholder="Course Name"
                  value={courseForm.course}
                  onChange={(e) => setCourseForm({ ...courseForm, course: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Fee"
                  value={courseForm.fee}
                  onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                />

                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn-save" onClick={handleSave}>{editing ? "Update" : "Add"}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Courses;
