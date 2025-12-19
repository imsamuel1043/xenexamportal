import React, { useEffect, useRef } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const Studentsresult = () => {
  const tableRef = useRef(null);

  
  const studentResult = [
    {
      id: 1,
      name: "Kai cenat",
      subject: "React",
      marks: 80,
      totalMarks: 100,
      percentage: "80%",
      grade: "A",
    },
        {
      id: 2,
      name: "Kai cenat",
      subject: "Javascript",
      marks: 79,
      totalMarks: 100,
      percentage: "79%",
      grade: "A",
    },
  ];

  useEffect(() => {
    if (!tableRef.current || !window.$) return;

    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: false,
      searching: false,
      paging: false,
      info: false,
      dom: "t",
    });
  }, []);

  return (
    <AdminLayout>
      <div>
        
        <div className="page-header">
          <h2 className="page-title">My Results</h2>
        </div>

        
        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {studentResult.map(result => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.subject}</td>
                    <td>
                      {result.marks}/{result.totalMarks}
                    </td>
                    <td>{result.percentage}</td>
                    <td>
                      <strong>{result.grade}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            
            {studentResult.length === 0 && (
              <p style={{ padding: "20px", textAlign: "center" }}>
                Results have not been published yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Studentsresult;
