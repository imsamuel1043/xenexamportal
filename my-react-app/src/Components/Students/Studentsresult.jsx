import React, { useEffect, useRef, useState } from "react";
import "../../assets/Css/Studentcss/Studentresult.css";

const Studentsresult = () => {
  const tableRef = useRef();
  const dtInstance = useRef(null);

  const [students, setStudents] = useState([
    { id: 1, name: "Kai cenat", course: "React", status: "Active" },
    { id: 2, name: "Duke Dennis", course: "javascript", status: "Inactive" },
    { id: 3, name: "Agent", course: "UI/UX", status: "Active" },
    { id: 4, name: "Ishowspeed", course: "python", status: "Active" },
    { id: 5, name: "Jasontheween", course: "Digital marketing", status: "Inactive" },
    { id: 6, name: "Extra Emily", course: "Bootstrap", status: "Active" }
  ]);

  // For inline editing
  const [editRow, setEditRow] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", course: "", status: "" });

  useEffect(() => {
    if (dtInstance.current) {
      dtInstance.current.destroy();
    }

    dtInstance.current = window.$(tableRef.current).DataTable({
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      destroy: true,
      columnDefs: [{ orderable: false, targets: [4] }]
    });
  }, [students]);

 
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setStudents(students.filter((s) => s.id !== id));
  };


  const handleEdit = (student) => {
    setEditRow(student.id);
    setEditForm(student);
  };

  const handleSave = () => {
    setStudents(
      students.map((s) => (s.id === editRow ? editForm : s))
    );
    setEditRow(null); 
  };


  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="studentsResultWrapper">
      <h2 className="studentsResultTitle">Students Results</h2>

      <div className="studentsResultTableWrapper">
        <table
          ref={tableRef}
          className="display studentsResultTable"
          style={{ width: "100%" }}
        >
          <thead className="studentsResultHead">
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Course</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="studentsResultBody">
            {students.map((s) => (
              <tr key={s.id}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>
                  {editRow === s.id ? (
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    s.name
                  )}
                </td>

                <td>
                  {editRow === s.id ? (
                    <input
                      name="course"
                      value={editForm.course}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    s.course
                  )}
                </td>

                <td>
                  {editRow === s.id ? (
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={
                        s.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {s.status}
                    </span>
                  )}
                </td>

                <td>
                  {editRow === s.id ? (
                    <button className="sr-btn sr-btn-edit" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="sr-btn sr-btn-edit"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="sr-btn sr-btn-delete"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Studentsresult;
