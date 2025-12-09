import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import '../../assets/Css/Student.css';

import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import user3 from "../../assets/images/user3.jpg";

const Students = () => {
  const navigate = useNavigate();

  const tableRef = useRef(null);

  const idFilter = useRef();
  const nameFilter = useRef();
  const courseFilter = useRef();
  const batchFilter = useRef();
  const dateFilter = useRef();

  const initialData = [
    { id: "#CMP801", name: "Prabin", course: "UI/UX Development", batch: "9th", status: "Active", date: "2025-02-05", img: user1 },
    { id: "#CMP802", name: "Vibina", course: "UI/UX Development", batch: "9th", status: "Active", date: "2025-02-05", img: user2 },
    { id: "#CMP803", name: "Naja", course: "Full-Stack Development", batch: "9th", status: "Inactive", date: "2025-02-05", img: user3 },
    { id: "#CMP804", name: "Samuel", course: "UI/UX Development", batch: "9th", status: "Active", date: "2025-02-05", img: user1 },
    { id: "#CMP805", name: "Sona", course: "Digital Marketing", batch: "9th", status: "Active", date: "2025-02-05", img: user2 },
    { id: "#CMP806", name: "Raheena", course: "Digital Marketing", batch: "9th", status: "Inactive", date: "2025-02-05", img: user3 },
  ];

  const [students, setStudents] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    course: "",
    batch: "",
    status: "Active",
    date: "",
    img: user1,
  });

  useEffect(() => {

    if (window.$.fn.DataTable.isDataTable("#studentsTable")) {
      window.$("#studentsTable").DataTable().destroy();
    }

    const table = window.$("#studentsTable").DataTable({
      pageLength: 5,
      responsive: true,
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "pdf", "print"],
    });

    
    window.$(idFilter.current).on("keyup", function () {
      table.column(0).search(this.value).draw();
    });
    window.$(nameFilter.current).on("keyup", function () {
      table.column(1).search(this.value).draw();
    });
    window.$(courseFilter.current).on("keyup", function () {
      table.column(2).search(this.value).draw();
    });
    window.$(batchFilter.current).on("keyup", function () {
      table.column(3).search(this.value).draw();
    });
    window.$(dateFilter.current).on("change", function () {
      table.column(5).search(this.value).draw();
    });

  }, [students]);

  
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.course || !newStudent.batch) return;

    const studentToAdd = {
      id: "#CMP" + Math.floor(1000 + Math.random() * 9000),
      ...newStudent,
      date: newStudent.date || new Date().toISOString().split("T")[0],
    };

    setStudents([...students, studentToAdd]);
    setNewStudent({ name: "", course: "", batch: "", status: "Active", date: "", img: user1 });
    setShowModal(false);
  };

  return (
    <AdminLayout>

      
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h3 className="fw-bold mb-2">Students</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Student
        </button>
      </div>

      
      <div className="card p-3 mt-3 shadow-sm">
        <div className="row g-2">
          <div className="col-md-2"><input ref={idFilter} className="form-control" placeholder="Filter by ID" /></div>
          <div className="col-md-2"><input ref={nameFilter} className="form-control" placeholder="Filter by Name" /></div>
          <div className="col-md-2"><input ref={courseFilter} className="form-control" placeholder="Filter by Course" /></div>
          <div className="col-md-2"><input ref={batchFilter} className="form-control" placeholder="Filter by Batch" /></div>
          <div className="col-md-2"><input ref={dateFilter} type="date" className="form-control" /></div>
        </div>
      </div>

      
      <div className="card mt-3 p-3 shadow-sm">
        <div className="table-responsive">
          <table id="studentsTable" className="table table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>
                    <img src={s.img} className="student-img" alt="" />
                    {s.name}
                  </td>
                  <td>{s.course}</td>
                  <td>{s.batch}</td>
                  <td>
                    <span className={`badge ${s.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>{s.date}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/students/${s.id}`)}>
                      Details
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => setStudents(students.filter((x) => x.id !== s.id))}>
                      Delete
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
            <h4 className="modal-title">Add Student</h4>

            <div className="modal-group">
              <input className="form-control" placeholder="Name" value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
              <input className="form-control" placeholder="Course" value={newStudent.course}
                onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })} />
              <input className="form-control" placeholder="Batch" value={newStudent.batch}
                onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })} />
              <select className="form-control" value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <input type="date" className="form-control" value={newStudent.date}
                onChange={(e) => setNewStudent({ ...newStudent, date: e.target.value })} />
            </div>

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-add" onClick={handleAddStudent}>Add</button>
            </div>
          </div>
        </div>
      )}


    </AdminLayout>
  );
};

export default Students;
