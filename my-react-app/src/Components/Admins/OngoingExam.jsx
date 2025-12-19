import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const OngoingExam = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const resultTableRef = useRef(null);
  const resultDtInstance = useRef(null);

  const [timeNow, setTimeNow] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const [exams] = useState([
    {
      title: "Javascript",
      startTime: Date.now() - 30 * 60 * 1000,
      duration: 2 * 60 * 60 * 1000,
      students: [
        { name: "Naja Fathima", score: 78 },
        { name: "Prabin Kumar", score: 85 },
        { name: "Samuel Morris", score: 66 },
      ],
    },
    {
      title: "CSS",
      startTime: Date.now() + 20 * 60 * 1000,
      duration: 60 * 60 * 1000,
      students: [],
    },
    {
      title: "Digital Marketing",
      startTime: Date.now() - 4 * 60 * 60 * 1000,
      duration: 90 * 60 * 1000,
      students: [
        { name: "Aysha", score: 88 },
        { name: "Riya Fathima", score: 72 },
        { name: "Irfan", score: 91 },
        { name: "Manu", score: 64 },
      ],
    },
  ]);

  
  useEffect(() => {
    const timer = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  
  const getStatus = (exam) => {
    const start = exam.startTime;
    const end = exam.startTime + exam.duration;

    if (timeNow < start) return "Not Started";
    if (timeNow >= start && timeNow <= end) return "In Progress";
    return "Completed";
  };

  
  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00";
    const s = Math.floor(ms / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  const getCountdown = (exam) => {
    const start = exam.startTime;
    const end = exam.startTime + exam.duration;

    if (timeNow < start) return `Starts in ${formatTime(start - timeNow)}`;
    if (timeNow <= end) return `Ends in ${formatTime(end - timeNow)}`;
    return "Completed";
  };

  
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

  
  useEffect(() => {
    if (
      !showModal ||
      !selectedExam ||
      selectedExam.status !== "Completed"
    )
      return;

    if (!resultTableRef.current || resultDtInstance.current) return;

    const table = new window.DataTable(resultTableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pagingType: "simple_numbers",
      pageLength: 5,
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      language: {
        search: "",
        lengthMenu: " _MENU_ ",
        searchPlaceholder: "Search student...",
        paginate: { previous: "‹", next: "›" },
      },
    });

    resultDtInstance.current = table;

    return () => {
      table.destroy();
      resultDtInstance.current = null;
    };
  }, [showModal, selectedExam]);

  return (
    <AdminLayout>
      <div>
        
        <div className="page-header">
          <h2 className="page-title">Ongoing Examinations</h2>
        </div>

        
        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Countdown</th>
                  <th>Duration</th>
                  <th>Attended</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, index) => {
                  const status = getStatus(exam);

                  return (
                    <tr key={index}>
                      <td>{exam.title}</td>
                      <td>{getCountdown(exam)}</td>
                      <td>{exam.duration / 60000} mins</td>
                      <td>{exam.students.length}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            status === "Completed"
                              ? "active"
                              : status === "In Progress"
                              ? "pending"
                              : "inactive"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button
                          className="icon-btn view"
                          onClick={() => {
                            setSelectedExam({ ...exam, status });
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
          {showModal && selectedExam && (
            <div className="modal-overlay">
              <div className="modal-box" style={{ maxWidth: "720px" }}>
                <h3>{selectedExam.title} – Results</h3>

                <p style={{ marginBottom: "6px" }}>
                  <strong>Status:</strong> {selectedExam.status}
                </p>
                <p style={{ marginBottom: "14px" }}>
                  <strong>Students Attended:</strong>{" "}
                  {selectedExam.students.length}
                </p>

                {selectedExam.status === "Completed" ? (
                  <div className="table-responsive">
                    <table
                      ref={resultTableRef}
                      className="display students-table"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedExam.students.map((s, i) => (
                          <tr key={i}>
                            <td>{s.name}</td>
                            <td>{s.score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Results will be available after exam completion.</p>
                )}

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Close
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

export default OngoingExam;
