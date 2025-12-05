import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/UserManagement.css";

const UserTable = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="table-primary">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center text-muted">
                                No users found.
                            </td>
                        </tr>
                    )}
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                            <td className="d-flex flex-wrap gap-1">
                                <button className="btn btn-sm btn-primary" onClick={() => onEdit(row)}>
                                    Edit
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(row)}>
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

const AdminsTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => setData(data.filter((u) => u.id !== user.id));

    return <UserTable columns={columns} data={data} onEdit={onEdit} onDelete={handleDelete} />;
};

const TeachersTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "subject", label: "Subject" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => setData(data.filter((u) => u.id !== user.id));

    return <UserTable columns={columns} data={data} onEdit={onEdit} onDelete={handleDelete} />;
};

const StudentsTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "course", label: "Course" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => setData(data.filter((u) => u.id !== user.id));

    return <UserTable columns={columns} data={data} onEdit={onEdit} onDelete={handleDelete} />;
};

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState("admins");
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [admins, setAdmins] = useState([
        { id: 1, name: "Jon Jones", role: "Super Admin", email: "jon@gmail.com", dateJoined: "2024-01-10" },
        { id: 2, name: "Connor Macgregor", role: "Admin", email: "connor@gmail.com", dateJoined: "2024-01-10" },
    ]);

    const [teachers, setTeachers] = useState([
        { id: 1, name: "George St Siers", subject: "Python", email: "gsp@gmail.com", dateJoined: "2024-01-10" },
        { id: 2, name: "Khabib", subject: "UI/UX", email: "khabib@gmail.com", dateJoined: "2024-01-10" },
    ]);

    const [students, setStudents] = useState([
        { id: 1, name: "Arman S", course: "React", email: "arman@gmail.com", dateJoined: "2024-01-10" },
        { id: 2, name: "Ilia T", course: "Python", email: "ilia@gmail.com", dateJoined: "2024-01-10" },
    ]);

    const handleSaveEdit = () => {
        const updateUser = (list, setter) => {
            if (editData.id) {
                setter(list.map((u) => (u.id === editData.id ? editData : u)));
            } else {
                setter([...list, { ...editData, id: Date.now() }]);
            }
        };

        if (activeTab === "admins") updateUser(admins, setAdmins);
        if (activeTab === "teachers") updateUser(teachers, setTeachers);
        if (activeTab === "students") updateUser(students, setStudents);

        setEditData(null);
        setShowModal(false);
    };

    const handleAddUser = () => {
        const newUser = { name: "", email: "", dateJoined: "" };

        if (activeTab === "admins") newUser.role = "";
        if (activeTab === "teachers") newUser.subject = "";
        if (activeTab === "students") newUser.course = "";

        setEditData(newUser);
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                    <h3 className="fw-bold mb-2 mb-md-0">User Management</h3>
                    <button className="btn btn-primary" onClick={handleAddUser}>
                        + Add User
                    </button>
                </div>

                <ul className="nav nav-tabs mb-3 flex-wrap">
                    {["admins", "teachers", "students"].map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className={`nav-link px-4 py-2 fw-semibold ${activeTab === tab ? "active custom-tab-active" : "custom-tab"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="card shadow-sm p-3 rounded-4">
                    {activeTab === "admins" && (
                        <AdminsTab data={admins} setData={setAdmins} onEdit={(u) => { setEditData(u); setShowModal(true); }} />
                    )}
                    {activeTab === "teachers" && (
                        <TeachersTab data={teachers} setData={setTeachers} onEdit={(u) => { setEditData(u); setShowModal(true); }} />
                    )}
                    {activeTab === "students" && (
                        <StudentsTab data={students} setData={setStudents} onEdit={(u) => { setEditData(u); setShowModal(true); }} />
                    )}
                </div>
            </div>

            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
                    style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
                >
                    <div className="bg-white p-4 rounded w-100" style={{ maxWidth: "500px" }}>
                        <h5 className="fw-bold mb-3">{editData.id ? "Edit User" : "Add User"}</h5>

                        <input
                            className="form-control mb-2"
                            placeholder="Name"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />

                        {activeTab === "admins" && (
                            <input
                                className="form-control mb-2"
                                placeholder="Role"
                                value={editData.role}
                                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                            />
                        )}

                        {activeTab === "teachers" && (
                            <input
                                className="form-control mb-2"
                                placeholder="Subject"
                                value={editData.subject}
                                onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                            />
                        )}

                        {activeTab === "students" && (
                            <input
                                className="form-control mb-2"
                                placeholder="Course"
                                value={editData.course}
                                onChange={(e) => setEditData({ ...editData, course: e.target.value })}
                            />
                        )}

                        <input
                            className="form-control mb-2"
                            placeholder="Email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />

                        <input
                            type="date"
                            className="form-control mb-3"
                            value={editData.dateJoined}
                            onChange={(e) => setEditData({ ...editData, dateJoined: e.target.value })}
                        />

                        <div className="d-flex justify-content-end gap-2 flex-wrap">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleSaveEdit}
                                disabled={
                                    !editData.name ||
                                    !editData.email ||
                                    !editData.dateJoined ||
                                    (activeTab === "admins" && (!editData.role || editData.subject || editData.course)) ||
                                    (activeTab === "teachers" && (!editData.subject || editData.role || editData.course)) ||
                                    (activeTab === "students" && (!editData.course || editData.role || editData.subject))
                                }
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserManagement;
