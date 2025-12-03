import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { Link } from "react-router-dom";

import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import user3 from "../../assets/images/user3.jpg";

import "../../assets/Css/Student.css";
import FilterBox from "../Admins/FilterBox";

const Students = () => {
  const [students, setStudents] = useState([
    { id: "#CMP801", name: "Prabin", course: "UI/UX Development", batch: "9th", date: "Feb 5, 2025", img: user1 },
    { id: "#CMP802", name: "Vibina", course: "UI/UX Development", batch: "9th", date: "Feb 5, 2025", img: user2 },
    { id: "#CMP803", name: "Naja", course: "Full-Stack Development", batch: "9th", date: "Feb 5, 2025", img: user3 },
    { id: "#CMP804", name: "Samuel", course: "UI/UX Development", batch: "9th", date: "Feb 5, 2025", img: user1 },
    { id: "#CMP805", name: "Sona", course: "Digital Marketing", batch: "9th", date: "Feb 5, 2025", img: user2 },
    { id: "#CMP806", name: "Raheena", course: "Digital Marketing", batch: "9th", date: "Feb 5, 2025", img: user3 },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});
  const [courseFilter, setCourseFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filterRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "" || s.course === courseFilter;
    const matchBatch = batchFilter === "" || s.batch === batchFilter;
    return matchSearch && matchCourse && matchBatch;
  });

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));

    setSelected((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const addNewStudent = () => {
    const newStudent = {
      id: "#CMP" + Math.floor(1000 + Math.random() * 9000),
      name: "New Student",
      course: "Unknown",
      batch: "N/A",
      date: new Date().toDateString(),
      img: user1,
    };
    setStudents([...students, newStudent]);
  };

  return (
    <AdminLayout
      notifications={[{ text: "No new notifications", time: "Just now" }]}
      activities={[{ action: "Visited Students Page", time: "1 min ago" }]}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h3 className="fw-bold mb-2">Students</h3>

        <button
          className="btn px-4 text-white btn-primary mb-2"
          style={{ borderRadius: "6px" }}
          onClick={addNewStudent}
        >
          New Student
        </button>
      </div>

      <div className="card shadow-sm p-3 mt-3" style={{ borderRadius: "8px" }}>
        <div className="students-top-row">
          <button 
            className="btn filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            <i className="bi bi-sort-down"></i>
          </button>

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

        {showFilter && (
          <div className="filter-popup" ref={filterRef}>
            <FilterBox
              courseFilter={courseFilter}
              setCourseFilter={setCourseFilter}
              batchFilter={batchFilter}
              setBatchFilter={setBatchFilter}
            />
          </div>
        )}

        <div className="table-responsive students-table-wrapper">
          <table className="table align-middle students-table">
            <thead className="table-primary">
              <tr>
                <th><input type="checkbox" /></th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Batch</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected[s.id] || false}
                      onChange={() =>
                        setSelected({ ...selected, [s.id]: !selected[s.id] })
                      }
                    />
                  </td>

                  <td className="fw-semibold">{s.id}</td>

                  <td>
                    <img src={s.img} alt="" className="student-img" />
                    {s.name}
                  </td>

                  <td>{s.course}</td>
                  <td>{s.batch}</td>
                  <td>
                    <i className="bi bi-calendar me-2"></i>
                    {s.date}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        selected[s.id]
                          ? deleteStudent(s.id)
                          : alert("Open student details page!")
                      }
                      className={`btn border p-0 ${
                        selected[s.id] ? "btn-danger" : "btn-primary"
                      } action-btn`}
                    >
                      {selected[s.id] ? "Remove" : "Details"}
                    </button>
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

export default Students;
