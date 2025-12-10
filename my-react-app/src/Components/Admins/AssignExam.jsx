import React, { useState, useContext, useMemo } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { DataContext } from "../DataContext";
import DataTable from "react-data-table-component";

const AssignExam = () => {
  const { questions, exams, setExams } = useContext(DataContext);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [examData, setExamData] = useState({
    title: "",
    date: "",
    duration: "",
    totalMarks: "",
  });

  const courseQuestions = useMemo(() => {
    return questions.filter((q) => q.courseId === Number(selectedCourse));
  }, [selectedCourse, questions]);

  const handleToggleQuestion = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCourse || selectedQuestions.length === 0 || !examData.title) {
      alert("Please fill all required fields and select questions.");
      return;
    }

    const newExam = {
      id: exams.length + 1,
      ...examData,
      courseId: Number(selectedCourse),
      questionIds: selectedQuestions,
    };

    setExams([...exams, newExam]);
    setSelectedCourse("");
    setSelectedQuestions([]);
    setExamData({ title: "", date: "", duration: "", totalMarks: "" });

    alert("Exam Assigned Successfully!");
  };

  const columns = [
    {
      name: "",
      width: "70px",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedQuestions.includes(row.id)}
          onChange={() => handleToggleQuestion(row.id)}
        />
      ),
    },
    {
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
      wrap: true,
      style: { fontWeight: 500 },
    },
    {
      name: "Marks",
      selector: (row) => row.marks,
      sortable: true,
      width: "110px",
      cell: (row) => (
        <span className="badge bg-primary px-3 py-2">{row.marks}</span>
      ),
    },
  ];

  return (

    <AdminLayout>

      <div className="container">
        <h3 className="fw-bold mb-3">Assign Exam</h3>

        <form onSubmit={handleSubmit} className="p-3 card shadow-sm">
          <div className="row">
            <div className="col-md-6">
              <label className="fw-semibold">Course</label>
              <select
                className="form-control mb-3"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="1">Digital Marketing</option>
                <option value="2">Creative Designing</option>
                <option value="3">Python Developement</option>
                <option value="4">Multimedia and Animation</option>
                <option value="5">Full Stack Development</option>
                <option value="6">UI/UX Design and Development</option>
                <option value="7">PHP Development</option>
                <option value="8">Node JS Development</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="fw-semibold">Title</label>
              <input
                type="text"
                className="form-control mt-0"
                value={examData.title}
                onChange={(e) =>
                  setExamData({ ...examData, title: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label className="fw-semibold">Date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={examData.date}
                onChange={(e) =>
                  setExamData({ ...examData, date: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label className="fw-semibold">Duration (minutes)</label>
              <input
                type="number"
                className="form-control mb-3"
                value={examData.duration}
                onChange={(e) =>
                  setExamData({ ...examData, duration: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label className="fw-semibold">Total Marks</label>
              <input
                type="number"
                className="form-control mb-3"
                value={examData.totalMarks}
                onChange={(e) =>
                  setExamData({ ...examData, totalMarks: e.target.value })
                }
              />
            </div>
          </div>

          {selectedCourse && (
            <>
              <h5 className="fw-bold mt-3 mb-2">Select Questions</h5>

              <div className="card p-2 shadow-sm">
                <DataTable
                  columns={columns}
                  data={courseQuestions}
                  pagination
                  highlightOnHover
                  fixedHeader
                  fixedHeaderScrollHeight="300px"
                  striped
                  noDataComponent="No questions found for this course."
                />
              </div>
            </>
          )}

          <button className="btn btn-primary mt-3 px-4">Assign Exam</button>
        </form>
      </div>

    </AdminLayout>
    
  );
};

export default AssignExam;
