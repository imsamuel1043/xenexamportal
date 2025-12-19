import React, { useEffect, useRef } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css"; 

const StudentExam = () => {
  const ongoingRef = useRef(null);
  const upcomingRef = useRef(null);
  const completedRef = useRef(null);

  useEffect(() => {
    const initTable = ref => {
      if (!ref.current || !window.$) return;

      if ($.fn.DataTable.isDataTable(ref.current)) {
        $(ref.current).DataTable().destroy();
      }

      new window.DataTable(ref.current, {
        responsive: true,
        ordering: true,
        searching: true,
        paging: true,
        pagingType: "simple_numbers",
        lengthChange: true,
        lengthMenu: [5, 10, 25, 50],
        pageLength: 5,
        language: {
          search: "",
          searchPlaceholder: "Search...",
          lengthMenu: " _MENU_ ",
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          paginate: {
            previous: "‹",
            next: "›",
          },
        },
        dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      });
    };

    initTable(ongoingRef);
    initTable(upcomingRef);
    initTable(completedRef);
  }, []);

  return (
    <AdminLayout>
      <div>
        {/* PAGE HEADER – SAME AS COURSES */}
        <div className="page-header">
          <h2 className="page-title">My Exams</h2>
        </div>

        {/* MAIN BOX – SAME STRUCTURE */}
        <div className="student-management-box">

          {/* LIVE EXAMS */}
          <h5 className="examCardTitle">Live Exams</h5>
          <div className="table-responsive">
            <table ref={ongoingRef} className="display students-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Questions</th>
                  <th>Time Left</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>React Test</td>
                  <td>Frontend</td>
                  <td>Batch A</td>
                  <td>25</td>
                  <td>30 mins</td>
                  <td>
                    <span className="status-pill active">Ongoing</span>
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn view">Resume</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* UPCOMING EXAMS */}
          <h5 className="examCardTitle" style={{ marginTop: "30px" }}>
            Upcoming Exams
          </h5>
          <div className="table-responsive">
            <table ref={upcomingRef} className="display students-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Questions</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>JS Basics</td>
                  <td>Frontend</td>
                  <td>Batch B</td>
                  <td>20</td>
                  <td>45 mins</td>
                  <td>
                    <span className="status-pill upcoming">Upcoming</span>
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn view">Start</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* COMPLETED EXAMS */}
          <h5 className="examCardTitle" style={{ marginTop: "30px" }}>
            Completed Exams
          </h5>
          <div className="table-responsive">
            <table ref={completedRef} className="display students-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Questions</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HTML Test</td>
                  <td>Frontend</td>
                  <td>Batch C</td>
                  <td>15</td>
                  <td>80%</td>
                  <td>
                    <span className="status-pill completed">Completed</span>
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn view">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentExam;
