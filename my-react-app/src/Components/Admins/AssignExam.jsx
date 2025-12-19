import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const AssignExam = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const questionTableRef = useRef(null);
  const questionDtInstance = useRef(null);

  const resultTableRef = useRef(null);
  const resultDtInstance = useRef(null);

  const questions = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    question: `Sample Question ${i + 1}`,
    marks: 2,
  }));

  const [exams, setExams] = useState([
    {
      title: "JavaScript Basics",
      course: "Full Stack Development",
      batch: "9th",
      date: "2025-12-25",
      duration: 90,
      totalMarks: 60,
      questions: 25,
    },
    {
      title: "UI/UX Mid Test",
      course: "UI/UX Design",
      batch: "10th",
      date: "2025-12-10",
      duration: 60,
      totalMarks: 40,
      questions: 20,
    },
  ]);

  const resultData = Array.from({ length: 18 }, (_, i) => ({
    name: `Student ${i + 1}`,
    score: Math.floor(Math.random() * 80) + 20,
    status: i % 3 === 0 ? "Absent" : "Attended",
  }));

  const attendedCount = resultData.filter(
    (s) => s.status === "Attended"
  ).length;

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    batch: "",
    date: "",
    duration: "",
    totalMarks: "",
  });

  const getStatus = (exam) => {
    const now = Date.now();
    const start = new Date(exam.date).getTime();
    const end = start + exam.duration * 60000;

    if (now < start) return "Scheduled";
    if (now >= start && now <= end) return "Live";
    return "Completed";
  };

  useEffect(() => {
    if (!tableRef.current || dtInstance.current) return;

    const table = new window.DataTable(tableRef.current, {
      responsive: true,
      pagingType: "simple_numbers",
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      language: {
        search: "",
        lengthMenu: " _MENU_ ",
        searchPlaceholder: "Search exams...",
        paginate: { previous: "‹", next: "›" },
      },
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
      dtInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!showQuestionModal || questionDtInstance.current) return;

    const table = new window.DataTable(questionTableRef.current, {
      pagingType: "simple_numbers",
      pageLength: 5,
    });

    questionDtInstance.current = table;

    return () => {
      table.destroy();
      questionDtInstance.current = null;
    };
  }, [showQuestionModal]);

  useEffect(() => {
    if (!showResultModal || resultDtInstance.current) return;

    const table = new window.DataTable(resultTableRef.current, {
      pagingType: "simple_numbers",
      pageLength: 5,
      dom: "<'dt-top-row'f>t<'dt-bottom-row'i p>",
    });

    resultDtInstance.current = table;

    return () => {
      table.destroy();
      resultDtInstance.current = null;
    };
  }, [showResultModal]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAssignExam = () => {
    if (
      !formData.title ||
      !formData.course ||
      !formData.batch ||
      !formData.date
    )
      return;

    setExams((prev) => [
      ...prev,
      {
        ...formData,
        questions: selectedQuestions.length,
      },
    ]);

    setShowAssignModal(false);
    setSelectedQuestions([]);
    setFormData({
      title: "",
      course: "",
      batch: "",
      date: "",
      duration: "",
      totalMarks: "",
    });
  };

  const statusBadge = (status) => (
    <span
      className={`status-pill ${status === "Scheduled"
          ? "inactive"
          : status === "Live"
            ? "pending"
            : "active"
        }`}
    >
      {status}
    </span>
  );

  return (

    <AdminLayout>

      <div>
        <div className="page-header">
          <h2 className="page-title">Assign Exam</h2>
          <button
            className="add-student-btn"
            onClick={() => setShowAssignModal(true)}
          >
            <i className="bi bi-plus-lg"></i> Assign Exam
          </button>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Questions</th>
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
                      <td>{exam.course}</td>
                      <td>{exam.batch}</td>
                      <td>{exam.date}</td>
                      <td>{exam.duration} mins</td>
                      <td>{exam.questions}</td>
                      <td>{statusBadge(status)}</td>
                      <td className="action-cell">
                        <button
                          className="icon-btn view"
                          style={{
                            visibility: status === "Completed" ? "visible" : "hidden",
                          }}
                          disabled={status !== "Completed"}
                          onClick={() => setShowResultModal(true)}
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


          {showAssignModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Assign Exam</h3>

                <div className="modal-form">
                  <input
                    name="title"
                    placeholder="Exam Title"
                    value={formData.title}
                    onChange={handleChange}
                  />

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    <option>Full Stack Development</option>
                    <option>UI/UX Design</option>
                    <option>Digital Marketing</option>
                  </select>

                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                  >
                    <option value="">Select Batch</option>
                    <option>9th</option>
                    <option>10th</option>
                    <option>11th</option>
                  </select>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />

                  <input
                    type="number"
                    name="duration"
                    placeholder="Duration (mins)"
                    value={formData.duration}
                    onChange={handleChange}
                  />

                  <input
                    type="number"
                    name="totalMarks"
                    placeholder="Total Marks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                  />

                  <button
                    className="btn-add"
                    onClick={() => setShowQuestionModal(true)}
                  >
                    Select Questions ({selectedQuestions.length})
                  </button>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowAssignModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-add" onClick={handleAssignExam}>
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}


          {showQuestionModal && (
            <div className="modal-overlay">
              <div className="modal-box" style={{ maxWidth: "700px" }}>
                <h3>Select Questions</h3>

                <table ref={questionTableRef} className="display students-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Question</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q) => (
                      <tr key={q.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedQuestions.includes(q.id)}
                            onChange={() =>
                              setSelectedQuestions((prev) =>
                                prev.includes(q.id)
                                  ? prev.filter((x) => x !== q.id)
                                  : [...prev, q.id]
                              )
                            }
                          />
                        </td>
                        <td>{q.question}</td>
                        <td>{q.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button
                    className="btn-add"
                    onClick={() => setShowQuestionModal(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}


          {showResultModal && (
            <div className="modal-overlay">
              <div className="modal-box" style={{ maxWidth: "800px" }}>
                <h3>Exam Results</h3>
                <p style={{ marginBottom: "10px" }}>
                  Students Attended: <b>{attendedCount}</b>
                </p>

                <table ref={resultTableRef} className="display students-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.score}</td>
                        <td>{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowResultModal(false)}
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

export default AssignExam;
