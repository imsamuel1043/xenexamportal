import React, { useEffect, useRef } from "react";
import "../../assets/Css/Studentcss/Studentresult.css"; 

const Studentsresult = () => {
  const tableRef = useRef();

  useEffect(() => {
    const table = window.$(tableRef.current).DataTable({
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      columnDefs: [
        { orderable: false, targets: [4] }
      ]
    });

    return () => table.destroy();
  }, []);

  const students = [
    { id: 1, name: "Samuel", course: "React", status: "Active" },
    { id: 2, name: "John", course: "Node", status: "Inactive" },
    { id: 3, name: "Emily", course: "UI/UX", status: "Active" }
  ];

  return (
    <div className="table-container">
      <h2 className="students-title">Students Table</h2>

      <table ref={tableRef} className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td><input type="checkbox" /></td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.status}</td>
              <td>
                <button
                  className="action-btn action-edit"
                  onClick={() => alert("Editing " + s.name)}
                >
                  Edit
                </button>

                <button
                  className="action-btn action-delete"
                  onClick={() => alert("Deleting " + s.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studentsresult;
