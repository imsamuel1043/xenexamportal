import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Course.css";


const Courses = () => {

  const [courses, setCourses] = useState([
    { id: "#CM9801", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "#CM9802", course: "Fullstack Development", fee: 60000, batch: "9th", duration: "10 months" },
    { id: "#CM9803", course: "UI/UX Design", fee: 40000, batch: "9th", duration: "8 months" },
    { id: "#CM9804", course: "Creative Design", fee: 35000, batch: "9th", duration: "5 months" },
    { id: "#CM9805", course: "Python Development", fee: 50000, batch: "9th", duration: "7 months" },
    { id: "#CM9806", course: "Node.js Development", fee: 55000, batch: "9th", duration: "9 months" },
    { id: "#CM9807", course: "PHP Development", fee: 45000, batch: "9th", duration: "6 months" },
    { id: "#CM9808", course: "Multimedia & Animation", fee: 40000, batch: "9th", duration: "8 months" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [courseForm, setCourseForm] = useState({ id: "", course: "", fee: "", duration: "", batch: "9th" });

  const tableRef = useRef(null);
  const dataTable = useRef(null);

  useEffect(() => {
    if (dataTable.current) {
      dataTable.current.destroy(); 
    }

    dataTable.current = $(tableRef.current).DataTable(); 

  }, [courses]); 

  const openAddModal = () => {
    setEditing(false);
    setCourseForm({
      id: "#CM" + Math.floor(1000 + Math.random() * 9000),
      course: "",
      fee: "",
      duration: "",
      batch: "9th",
    });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditing(true);
    setCourseForm(course);
    setShowModal(true);
  };

  const handleSave = () => {
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

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Courses</h3>
        <button className="btn btn-primary" onClick={openAddModal}>
          New Course
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered" id="coursesTable" ref={tableRef}>
          <thead className="table-primary table-color ">
            <tr>
              <th>Course ID</th>
              <th>Course</th>
              <th>Fee</th>
              <th>Batch</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.course}</td>
                <td>{course.fee}</td>
                <td>{course.batch}</td>
                <td>{course.duration}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1000 }}
        >
          <div className="bg-white p-4 rounded" style={{ width: "400px" }}>
            <h5 className="fw-bold mb-3">
              {editing ? "Edit Course" : "Add New Course"}
            </h5>

            <label className="form-label fw-semibold">Course Name</label>
            <input
              type="text"
              className="form-control mb-2"
              value={courseForm.course}
              onChange={(e) =>
                setCourseForm({ ...courseForm, course: e.target.value })
              }
            />

            <label className="form-label fw-semibold">Fee</label>
            <input
              type="number"
              className="form-control mb-2"
              value={courseForm.fee}
              onChange={(e) =>
                setCourseForm({ ...courseForm, fee: e.target.value })
              }
            />

            <label className="form-label fw-semibold">Duration</label>
            <input
              type="text"
              className="form-control mb-2"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>

  );
};

export default Courses;
