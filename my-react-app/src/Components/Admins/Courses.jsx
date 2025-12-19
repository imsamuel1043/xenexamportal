import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import "../../assets/Css/Student.css";

const Courses = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

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
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [formData, setFormData] = useState({
    course: "",
    fee: "",
    batch: "",
    duration: "",
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ course: "", fee: "", batch: "", duration: "" });
    setShowModal(true);
  };

  const openEditModal = (course, index) => {
    setIsEdit(true);
    setEditIndex(index);
    setFormData(course);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.course || !formData.fee || !formData.batch || !formData.duration) return;

    if (isEdit) {
      setCourses((prev) =>
        prev.map((c, i) => (i === editIndex ? formData : c))
      );
    } else {
      setCourses((prev) => [...prev, formData]);
    }

    setShowModal(false);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setCourses((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
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

        
        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Fee</th>
                  <th>Batch</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, index) => (
                  <tr key={index}>
                    <td>{c.course}</td>
                    <td>{c.fee}</td>
                    <td>{c.batch}</td>
                    <td>{c.duration}</td>
                    <td className="action-cell">
                      <button
                        className="icon-btn view"
                        onClick={() => openEditModal(c, index)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => confirmDelete(index)}
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
                <h3>{isEdit ? "Edit Course" : "Add Course"}</h3>

                <div className="modal-form">
                  <input name="course" placeholder="Course Name" value={formData.course} onChange={handleChange} />
                  <input name="fee" type="number" placeholder="Fee" value={formData.fee} onChange={handleChange} />
                  <input name="batch" placeholder="Batch" value={formData.batch} onChange={handleChange} />
                  <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} />
                </div>

                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn-add" onClick={handleSave}>
                    {isEdit ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}

          
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Delete Course?</h3>
                <p style={{ marginBottom: "20px" }}>
                  Are you sure you want to delete this course?
                </p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-delete" onClick={handleDelete}>
                    Delete
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

export default Courses;
