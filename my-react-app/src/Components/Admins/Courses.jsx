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

  const filtered = courses.filter((item) =>
    item.course.toLowerCase().includes(search.toLowerCase())
  );

  const addNewCourses = () => {
    const newCourse = {
      id: "#CM" + Math.floor(1000 + Math.random() * 9000),
      course: "New Course",
      fee: 0,
      batch: "N/A",
      duration: "N/A",
    };

    setCourses([...courses, newCourse]);
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

            {/* <button className="btn btn-light border">
              <i className="bi bi-sort-down"></i>
            </button> */}

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
                        onClick={() => alert("Open Edit Page")}
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
    </AdminLayout>
  );
};

export default Courses;
