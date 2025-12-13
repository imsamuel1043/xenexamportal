import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Fees.css";

const Fees = () => {
  const tableRef = useRef(null);
  const dtRef = useRef(null);

  const [students, setStudents] = useState([
    { id: 1, name: "Rahul", course: "Digital Marketing", totalFee: 25000, paid: 20000, lastPayment: "2025-01-05" },
    { id: 2, name: "Priya", course: "UI/UX Designing", totalFee: 30000, paid: 30000, lastPayment: "2025-01-10" },
    { id: 3, name: "Prabin", course: "Full Stack Development", totalFee: 45000, paid: 0, lastPayment: null },
  ]);

  const [nameFilter, setNameFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");

  const getStatus = (s) => {
    if (s.paid === 0) return "Not Paid";
    if (s.paid >= s.totalFee) return "Paid";
    return "Partial";
  };

  const courses = [...new Set(students.map((s) => s.course))];

  useEffect(() => {
    if (window.$ && !dtRef.current) {
      dtRef.current = window.$(tableRef.current).DataTable({
        paging: true,
        searching: true,
        info: true,
        responsive: true,
      });
    }
  }, []);

  
  useEffect(() => {
    if (dtRef.current) {
      dtRef.current.column(0).search(nameFilter).draw();
    }
  }, [nameFilter]);

  
  useEffect(() => {
    if (dtRef.current) {
      dtRef.current.column(1).search(courseFilter).draw();
    }
  }, [courseFilter]);

  const submitPayment = () => {
    if (!selectedStudent || !amount) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === Number(selectedStudent)
          ? { ...s, paid: s.paid + Number(amount), lastPayment: new Date().toISOString().slice(0, 10) }
          : s
      )
    );

    setShowModal(false);
    setAmount("");
    setSelectedStudent("");
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3 className="fw-bold mb-3">Fees Management</h3>


        <div className="card shadow-sm p-3 mb-3">
          <div className="row g-3">
            

            <div className="col-md-4">
              <label className="form-label fw-bold">Filter by Course</label>
              <select
                className="form-select"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card shadow-sm p-3">
          <div className="table-responsive">
            <table ref={tableRef} className="display fees-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Total Fee</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th>Status</th>
                  <th>Last Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>₹{s.totalFee}</td>
                    <td className="paid">₹{s.paid}</td>
                    <td className="pending">₹{s.totalFee - s.paid}</td>
                    <td>
                      <span className={`status ${getStatus(s).toLowerCase().replace(" ", "-")}`}>
                        {getStatus(s)}
                      </span>
                    </td>
                    <td>{s.lastPayment || "—"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedStudent(s.id);
                          setShowModal(true);
                        }}
                      >
                        Add Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Fees;
