import React, { useState } from "react";
import AdminLayout from '../Layouts/AdminLayout';
import '../../assets/Css/Course.css';

const Courses = () => {

  const [courses, setCourses] = useState([
    { id: "#CM9801", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "#CM9802", course: "Fullstack development", fee: 60000, batch: "9th", duration: "10 months" },
    { id: "#CM9803", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "#CM9804", course: "UI/UX", fee: 40000, batch: "9th", duration: "8 months" },
    { id: "#CM9805", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "#CM9806", course: "UI/UX", fee: 40000, batch: "9th", duration: "8 months" },
    { id: "#CM9807", course: "Creative Design", fee: 40000, batch: "9th", duration: "3 months" },
    { id: "#CM9808", course: "Fullstack development", fee: 60000, batch: "9th", duration: "10 months" },
    { id: "#CM9809", course: "Digital Marketing", fee: 30000, batch: "9th", duration: "6 months" },
    { id: "#CM9810", course: "Creative Design", fee: 40000, batch: "9th", duration: "3 months" },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [courseForm, setCourseForm] = useState({
    id: "",
    course: "",
    fee: "",
    duration: "",
    batch: "9th"
  });

  const filtered = courses.filter((item) =>
    item.course.toLowerCase().includes(search.toLowerCase())
  );

  const addNewCourses = () => {
    setEditing(false);
    setCourseForm({
      id: "#CM" + Math.floor(1000 + Math.random() * 9000),
      course: "",
      fee: "",
      duration: "",
      batch: "9th"
    });
    setShowModal(true);
  };

  const openEdit = (course) => {
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

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));

    setSelected((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleSelect = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <AdminLayout
      notifications={[{ text: "No new notifications", time: "Just now" }]}
      activities={[{ action: "Visited Courses Page", time: "1 min ago" }]}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h3 className="fw-bold mb-2">Courses</h3>

        <button
          className="btn px-4 text-white btn-primary mb-2"
          style={{ borderRadius: "6px" }}
          onClick={addNewCourses}
        >
          New Course
        </button>
      </div>

      <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "12px" }}>

        <div className="d-flex justify-content-between align-items-center mb-3 students-top-row ">
          <div className="d-flex align-items-center gap-3">

            <div className="search-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive" style={{ fontSize: "14px" }}>
          <table className="table align-middle">
            <thead className="table-primary">
              <tr>
                <th><input type="checkbox" /></th>
                <th>Course ID</th>
                <th>Course</th>
                <th>Fee</th>
                <th>Batch</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!selected[row.id]}
                      onChange={() => toggleSelect(row.id)}
                    />
                  </td>

                  <td className="fw-semibold">{row.id}</td>
                  <td>{row.course}</td>
                  <td>{row.fee}</td>
                  <td>{row.batch}</td>

                  <td>
                    <i className="bi bi-calendar3 me-2"></i>
                    {row.duration}
                  </td>

                  <td>
                    {selected[row.id] ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCourse(row.id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openEdit(row)}
                      >
                        Edit
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: "1000" }}
        >
          <div className="bg-white p-4 rounded" style={{ width: "420px" }}>
            <h5 className="fw-bold mb-3">
              {editing ? "Edit Course" : "Add New Course"}
            </h5>

            <label className="form-label fw-semibold">Course Name</label>
            <input
              type="text"
              className="form-control mb-3"
              value={courseForm.course}
              onChange={(e) =>
                setCourseForm({ ...courseForm, course: e.target.value })
              }
            />

            <label className="form-label fw-semibold">Fee</label>
            <input
              type="number"
              className="form-control mb-3"
              value={courseForm.fee}
              onChange={(e) =>
                setCourseForm({ ...courseForm, fee: e.target.value })
              }
            />

            <label className="form-label fw-semibold">Duration</label>
            <input
              type="text"
              className="form-control mb-3"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />

            <div className="d-flex justify-content-end gap-2 mt-2">
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
