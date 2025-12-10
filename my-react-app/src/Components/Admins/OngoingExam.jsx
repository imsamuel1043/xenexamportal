import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import '../../assets/Css/Ongoing.css';

const OngoingExam = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const dataTable = useRef(null);

  const liveExams = [
    {
      id: 1,
      title: "Javascript",
      date: "Dec 5, 2025",
      duration: "2 Hours",
      status: "inprogress",
    },
    {
      id: 2,
      title: "Css",
      date: "Dec 15, 2025",
      duration: "1 Hour",
      status: "notstarted",
    },
    {
      id: 3,
      title: "Digital Marketing",
      date: "Nov 27, 2025",
      duration: "1.5 Hours",
      status: "completed",
    },
  ];

  useEffect(() => {
    if (dataTable.current) {
      dataTable.current.destroy();
    }

    dataTable.current = $(tableRef.current).DataTable();
  }, []);

  const getStatusBadge = (status, id) => {
    if (status === "completed") {
      return `
        <span class="badge px-3 py-2"
          style="
            background-color:#0dba3525;
            color:#028b22;
            border-radius:30px;
            cursor:pointer;">
          ✔ Completed
        </span>`;
    }

    if (status === "inprogress") {
      return `
        <span class="badge px-3 py-2"
          style="
            background-color:#144efd20;
            color:#144efd;
            border-radius:30px;">
          In Progress
        </span>`;
    }

    return `
      <span class="badge px-3 py-2"
        style="
          background-color:#ff480b25;
          color:#ff480b;
          border-radius:30px;">
        Not Started
      </span>`;
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Examinations</h3>
      </div>

      <div className="table-responsive card shadow-sm p-3" style={{ borderRadius: "10px" }}>
        <table className="table table-bordered" ref={tableRef} id="examTable">
          <thead className="table-primary">
            <tr>
              <th>Exam Title</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {liveExams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.title}</td>
                <td>{exam.date}</td>
                <td>{exam.duration}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: getStatusBadge(exam.status, exam.id),
                  }}
                ></td>

                <td>
                  {exam.status === "completed" ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => navigate(`/completed-exams/${exam.id}`)}
                    >
                      View Report
                    </button>
                  ) : exam.status === "inprogress" ? (
                    <button className="btn btn-primary btn-sm" disabled>
                      Ongoing
                    </button>
                  ) : (
                    <button className="btn btn-warning btn-sm" disabled>
                      Not Started
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OngoingExam;
