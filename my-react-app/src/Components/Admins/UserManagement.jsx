import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/UserManagement.css";



const DataTableWrapper = ({ columns, data, onEdit, onDelete }) => {
  const tableRef = useRef(null);
  const dtRef = useRef(null);

  useEffect(() => {
    if (window.$) {
      if (dtRef.current) {
        dtRef.current.destroy();
      }

      dtRef.current = window.$(tableRef.current).DataTable({
        paging: true,
        searching: true,
        info: true,
        responsive: true,
      });
    }

    return () => {
      if (dtRef.current) {
        dtRef.current.destroy();
        dtRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="table-responsive">
      <table ref={tableRef} className="display user-table" style={{ width: "100%" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}>{row[c.key]}</td>
              ))}
              <td className="d-flex gap-1">
                <button className="btn btn-sm btn-primary" onClick={() => onEdit(row)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(row.id)}>
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


const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("admins");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [admins, setAdmins] = useState([
    { id: 1, name: "Jon Jones", role: "Super Admin", email: "jon@gmail.com", dateJoined: "2024-01-10" },
    { id: 2, name: "Connor", role: "Admin", email: "connor@gmail.com", dateJoined: "2024-01-10" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: "GSP", subject: "Python", email: "gsp@gmail.com", dateJoined: "2024-01-10" },
    { id: 2, name: "Khabib", subject: "UI/UX", email: "khabib@gmail.com", dateJoined: "2024-01-10" },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Arman", course: "React", email: "arman@gmail.com", dateJoined: "2024-01-10" },
    { id: 2, name: "Ilia", course: "Python", email: "ilia@gmail.com", dateJoined: "2024-01-10" },
  ]);


  const openAddModal = () => {
    let base = {
      name: "",
      email: "",
      dateJoined: "",
    };

    if (activeTab === "admins") base.role = "";
    if (activeTab === "teachers") base.subject = "";
    if (activeTab === "students") base.course = "";

    setEditData(base);
    setShowModal(true);
  };


  const handleSave = () => {
    const update = (list, setter) => {
      if (editData.id) {
        setter(list.map((u) => (u.id === editData.id ? editData : u)));
      } else {
        setter([...list, { ...editData, id: Date.now() }]);
      }
    };

    if (activeTab === "admins") update(admins, setAdmins);
    if (activeTab === "teachers") update(teachers, setTeachers);
    if (activeTab === "students") update(students, setStudents);

    setShowModal(false);
    setEditData(null);
  };


  const handleDelete = (id) => {
    if (activeTab === "admins") setAdmins(admins.filter((u) => u.id !== id));
    if (activeTab === "teachers") setTeachers(teachers.filter((u) => u.id !== id));
    if (activeTab === "students") setStudents(students.filter((u) => u.id !== id));
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold">User Management</h3>
          <button className="btn btn-primary" onClick={openAddModal}>
            + Add User
          </button>
        </div>

        
        <ul className="nav nav-tabs mb-3">
          {["admins", "teachers", "students"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        
        <div className="card p-3 shadow-sm">
          {activeTab === "admins" && (
            <DataTableWrapper
              columns={[
                { key: "name", label: "Name" },
                { key: "role", label: "Role" },
                { key: "email", label: "Email" },
                { key: "dateJoined", label: "Date Joined" },
              ]}
              data={admins}
              onEdit={(u) => { setEditData(u); setShowModal(true); }}
              onDelete={handleDelete}
            />
          )}

          {activeTab === "teachers" && (
            <DataTableWrapper
              columns={[
                { key: "name", label: "Name" },
                { key: "subject", label: "Subject" },
                { key: "email", label: "Email" },
                { key: "dateJoined", label: "Date Joined" },
              ]}
              data={teachers}
              onEdit={(u) => { setEditData(u); setShowModal(true); }}
              onDelete={handleDelete}
            />
          )}

          {activeTab === "students" && (
            <DataTableWrapper
              columns={[
                { key: "name", label: "Name" },
                { key: "course", label: "Course" },
                { key: "email", label: "Email" },
                { key: "dateJoined", label: "Date Joined" },
              ]}
              data={students}
              onEdit={(u) => { setEditData(u); setShowModal(true); }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

     
      {showModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-card">
            <h5 className="fw-bold mb-3">{editData.id ? "Edit User" : "Add User"}</h5>

            <input className="form-control mb-2" placeholder="Name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />

            {activeTab === "admins" && (
              <input className="form-control mb-2" placeholder="Role"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
              />
            )}

            {activeTab === "teachers" && (
              <input className="form-control mb-2" placeholder="Subject"
                value={editData.subject}
                onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
              />
            )}

            {activeTab === "students" && (
              <input className="form-control mb-2" placeholder="Course"
                value={editData.course}
                onChange={(e) => setEditData({ ...editData, course: e.target.value })}
              />
            )}

            <input className="form-control mb-2" placeholder="Email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />

            <input type="date" className="form-control mb-3"
              value={editData.dateJoined}
              onChange={(e) => setEditData({ ...editData, dateJoined: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
