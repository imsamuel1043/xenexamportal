import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const UserManagement = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [activeTab, setActiveTab] = useState("admins");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null); // id of item to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [admins, setAdmins] = useState([
    { id: "a1", name: "Jon Jones", role: "Super Admin", email: "jon@gmail.com", dateJoined: "2024-01-10" },
    { id: "a2", name: "Connor", role: "Admin", email: "connor@gmail.com", dateJoined: "2024-01-10" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: "t1", name: "GSP", subject: "Python", email: "gsp@gmail.com", dateJoined: "2024-01-10" },
    { id: "t2", name: "Khabib", subject: "UI/UX", email: "khabib@gmail.com", dateJoined: "2024-01-10" },
  ]);

  const [students, setStudents] = useState([
    { id: "s1", name: "Arman", course: "React", email: "arman@gmail.com", dateJoined: "2024-01-10" },
    { id: "s2", name: "Ilia", course: "Python", email: "ilia@gmail.com", dateJoined: "2024-01-10" },
  ]);

  const getCurrentData = () => {
    return activeTab === "admins" ? admins : activeTab === "teachers" ? teachers : students;
  };

  const getColumns = () => {
    if (activeTab === "admins") return ["name", "role", "email", "dateJoined"];
    if (activeTab === "teachers") return ["name", "subject", "email", "dateJoined"];
    return ["name", "course", "email", "dateJoined"];
  };

 
  useEffect(() => {
    if (!tableRef.current) return;

    if (dtInstance.current) {
      dtInstance.current.destroy();
      dtInstance.current = null;
    }

    const timeout = setTimeout(() => {
      if (!window.DataTable) return;
      dtInstance.current = new window.DataTable(tableRef.current, {
        responsive: true,
        ordering: true,
        searching: true,
        paging: true,
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        columnDefs: [{ orderable: false, targets: -1 }],
        language: {
          search: "",
          searchPlaceholder: "Search...",
          lengthMenu: "_MENU_",
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          infoEmpty: "Showing 0 to 0 of 0 entries",
          paginate: { previous: "‹", next: "›" },
        },
        dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [activeTab, admins, teachers, students]);

  const openAddModal = () => {
    const base = { name: "", email: "", dateJoined: "" };
    if (activeTab === "admins") base.role = "";
    if (activeTab === "teachers") base.subject = "";
    if (activeTab === "students") base.course = "";
    setEditData(base);
    setShowModal(true);
  };

  const handleSave = () => {
    const updateList = (list, setter) => {
      if (editData.id) {
        setter(list.map(u => (u.id === editData.id ? editData : u)));
      } else {
        setter([...list, { ...editData, id: Date.now().toString() }]);
      }
    };

    if (activeTab === "admins") updateList(admins, setAdmins);
    if (activeTab === "teachers") updateList(teachers, setTeachers);
    if (activeTab === "students") updateList(students, setStudents);

    setShowModal(false);
    setEditData(null);
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const id = deleteTarget;
    if (!id) return;

    if (activeTab === "admins") setAdmins(admins.filter(u => u.id !== id));
    if (activeTab === "teachers") setTeachers(teachers.filter(u => u.id !== id));
    if (activeTab === "students") setStudents(students.filter(u => u.id !== id));

    setDeleteTarget(null);
    setShowDeleteModal(false);
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h2 className="page-title">User Management</h2>
          <button className="add-student-btn" onClick={openAddModal}>+ Add User</button>
        </div>

        <ul className="nav nav-tabs mb-3">
          {["admins", "teachers", "students"].map(tab => (
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

        <div className="table-responsive student-management-box">
          <table ref={tableRef} className="display students-table">
            <thead>
              <tr>
                {getColumns().map(c => (
                  <th key={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentData().map(u => (
                <tr key={`${activeTab}-${u.id}`}>
                  {getColumns().map(c => (
                    <td key={c}>{u[c]}</td>
                  ))}
                  <td className="action-cell">
                    <button className="icon-btn view me-2" onClick={() => { setEditData(u); setShowModal(true); }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="icon-btn delete" onClick={() => confirmDelete(u.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {showModal && editData && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>{editData.id ? "Edit User" : "Add User"}</h3>
              <div className="modal-form">
                <input type="text" placeholder="Name" className="form-control mb-2" value={editData.name}
                  onChange={e => setEditData({ ...editData, name: e.target.value })} />
                {activeTab === "admins" && <input type="text" placeholder="Role" className="form-control mb-2" value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })} />}
                {activeTab === "teachers" && <input type="text" placeholder="Subject" className="form-control mb-2" value={editData.subject} onChange={e => setEditData({ ...editData, subject: e.target.value })} />}
                {activeTab === "students" && <input type="text" placeholder="Course" className="form-control mb-2" value={editData.course} onChange={e => setEditData({ ...editData, course: e.target.value })} />}
                <input type="email" placeholder="Email" className="form-control mb-2" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
                <input type="date" className="form-control mb-3" value={editData.dateJoined} onChange={e => setEditData({ ...editData, dateJoined: e.target.value })} />
              </div>
              <div className="modal-actions mt-2">
                <button className="btn-cancel me-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-add" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Are you sure you want to delete this user?</h3>
              <div className="modal-actions mt-3">
                <button className="btn-cancel me-2" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn-add" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
