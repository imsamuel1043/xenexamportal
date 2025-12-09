import React, { useEffect, useRef, useState } from "react";
import StudentLayout from "../Layouts/StudentLayout";
import "../../assets/Css/Studentcss/Studentexam.css";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-responsive-dt/js/responsive.dataTables";

const StudentExam = () => {
  const [upcomingExams] = useState([
    {
      id: 1,
      examName: "React Basics",
      course: "React",
      batch: "Batch 9",
      teacher: "Samuel",
      date: "2025-12-15",
      time: "10:00 AM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 2,
      examName: "JavaScript Advanced",
      course: "JavaScript",
      batch: "Batch 7",
      teacher: "Duke",
      date: "2025-12-20",
      time: "11:00 AM",
      duration: "1.5 Hours",
      totalMarks: 80,
      status: "Not Started",
    },
  ]);

  const [ongoingExams] = useState([
    {
      id: 3,
      examName: "UI/UX Mock Test",
      course: "UI/UX",
      batch: "Batch 5",
      questions: 20,
      durationLeft: "01:43:25",
      status: "Ongoing",
    },
  ]);

  const [completedExams] = useState([
    {
      id: 4,
      examName: "JavaScript Mock Test",
      course: "JavaScript",
      batch: "Batch 7",
      attempted: "2025-10-20",
      marks: 72,
      totalMarks: 80,
      percentage: 90,
      status: "Passed",
    },
  ]);

  const upcomingRef = useRef();
  const ongoingRef = useRef();
  const completedRef = useRef();

  useEffect(() => {
    if (window.$) {
      const loadTable = (ref) => {
        if (ref.current && !window.$.fn.DataTable.isDataTable(ref.current)) {
          window.$(ref.current).DataTable({
            responsive: true,
            autoWidth: false,
            paging: true,
            searching: true,
            ordering: true,
          });
        }
      };

      loadTable(upcomingRef);
      loadTable(ongoingRef);
      loadTable(completedRef);
    }
  }, []);

  const startExam = (exam) => alert(`Exam: ${exam.examName}`);

  return (
    <StudentLayout>
      <div className="studentExamWrapper">
        <h3 className="studentExamTitle">Examinations</h3>

        <div className="examCard">
          <h5 className="examCardTitle">Upcoming Exams</h5>

          <div className="table-wrapper">
            <table ref={upcomingRef} className="studentsResultTable display">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Teacher</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Marks</th>
                  <th>Status</th>
                  <th>Start</th>
                </tr>
              </thead>

              <tbody>
                {upcomingExams.map((exam) => (
                  <tr key={exam.id}>
                    <td data-label="Exam Name">{exam.examName}</td>
                    <td data-label="Course">{exam.course}</td>
                    <td data-label="Batch">{exam.batch}</td>
                    <td data-label="Teacher">{exam.teacher}</td>
                    <td data-label="Date & Time">{exam.date} – {exam.time}</td>
                    <td data-label="Duration">{exam.duration}</td>
                    <td data-label="Marks">{exam.totalMarks}</td>

                    <td data-label="Status">
                      <span className="badge bg-warning text-dark">{exam.status}</span>
                    </td>

                    <td data-label="Start">
                      <button
                        className="sr-btn btn-primary start-btn"
                        onClick={() => startExam(exam)}
                      >
                        Start
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="examCard">
          <h5 className="examCardTitle">Ongoing Exams</h5>

          <div className="table-wrapper">
            <table ref={ongoingRef} className="studentsResultTable display">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Questions</th>
                  <th>Duration Left</th>
                  <th>Status</th>
                  <th>Resume</th>
                </tr>
              </thead>

              <tbody>
                {ongoingExams.map((exam) => (
                  <tr key={exam.id}>
                    <td data-label="Exam Name">{exam.examName}</td>
                    <td data-label="Course">{exam.course}</td>
                    <td data-label="Batch">{exam.batch}</td>
                    <td data-label="Questions">{exam.questions}</td>
                    <td data-label="Duration Left">{exam.durationLeft}</td>

                    <td data-label="Status">
                      <span className="badge bg-primary">{exam.status}</span>
                    </td>

                    <td data-label="Resume">
                      <button
                        className="sr-btn sr-btn-edit"
                        onClick={() => startExam(exam)}
                      >
                        Resume
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="examCard">
          <h5 className="examCardTitle">Completed Exams</h5>

          <div className="table-wrapper">
            <table ref={completedRef} className="studentsResultTable display">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Date Attempted</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {completedExams.map((exam) => (
                  <tr key={exam.id}>
                    <td data-label="Exam Name">{exam.examName}</td>
                    <td data-label="Course">{exam.course}</td>
                    <td data-label="Batch">{exam.batch}</td>
                    <td data-label="Attempted">{exam.attempted}</td>
                    <td data-label="Marks">{exam.marks}</td>
                    <td data-label="Percentage">{exam.percentage}%</td>

                    <td data-label="Status">
                      <span className="badge bg-success">{exam.status}</span>
                    </td>

                    <td data-label="View">
                      <button
                        className="sr-btn sr-btn-edit"
                        onClick={() => startExam(exam)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentExam;
