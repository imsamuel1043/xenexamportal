import React, { useState, useContext } from "react";
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

  const courseQuestions = questions.filter(
    (q) => q.courseId === Number(selectedCourse)
  );

  const handleToggleQuestion = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse || selectedQuestions.length === 0 || !examData.title) {
      alert("Please fill all required fields and select at least one question.");
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

  // DataTable columns
  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedQuestions.includes(row.id)}
          onChange={() => handleToggleQuestion(row.id)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
    { name: "Question", selector: (row) => row.question, sortable: true },
    { name: "Marks", selector: (row) => row.marks, sortable: true },
  ];

  return (
    <AdminLayout>
      <div className="container">
        <h3 className="fw-bold mb-3">Assign Exam</h3>

        <form onSubmit={handleSubmit} className="p-3 card shadow-sm">
          <label>Course</label>
          <select
            className="form-control mb-3"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            <option value="1">UI/UX</option>
            <option value="2">Javascript</option>
            <option value="3">Python</option>
            <option value="4">React</option>
            <option value="5">Digital Marketing</option>
          </select>

          <label>Title</label>
          <input
            type="text"
            className="form-control mb-3"
            name="title"
            value={examData.title}
            onChange={(e) =>
              setExamData({ ...examData, title: e.target.value })
            }
          />

          <label>Date</label>
          <input
            type="date"
            className="form-control mb-3"
            name="date"
            value={examData.date}
            onChange={(e) =>
              setExamData({ ...examData, date: e.target.value })
            }
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            className="form-control mb-3"
            name="duration"
            value={examData.duration}
            onChange={(e) =>
              setExamData({ ...examData, duration: e.target.value })
            }
          />

          <label>Total Marks</label>
          <input
            type="number"
            className="form-control mb-3"
            name="totalMarks"
            value={examData.totalMarks}
            onChange={(e) =>
              setExamData({ ...examData, totalMarks: e.target.value })
            }
          />

          {selectedCourse && (
            <>
              <h5 className="fw-bold mt-3">Select Questions</h5>
              <DataTable
                columns={columns}
                data={courseQuestions}
                pagination
                highlightOnHover
                selectableRows={false} 
                noDataComponent="No questions available for this course"
              />
            </>
          )}

          <button className="btn btn-primary mt-3">Assign Exam</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AssignExam;
