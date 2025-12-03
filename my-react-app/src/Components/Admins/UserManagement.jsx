import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/UserManagement.css";



const UserTable = ({ columns, data, onEdit, onDelete }) => {
    return (
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
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td key={col.key}>{row[col.key]}</td>
                        ))}
                        <td>
                            <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() => onEdit(row)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => onDelete(row)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const AdminsTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => {
        setData(data.filter((u) => u.id !== user.id));
    };

    return (
        <UserTable
            columns={columns}
            data={data}
            onEdit={onEdit}
            onDelete={handleDelete}
        />
    );
};


const TeachersTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "subject", label: "Subject" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => {
        setData(data.filter((u) => u.id !== user.id));
    };

    return (
        <UserTable
            columns={columns}
            data={data}
            onEdit={onEdit}
            onDelete={handleDelete}
        />
    );
};


const StudentsTab = ({ data, setData, onEdit }) => {
    const columns = [
        { key: "name", label: "Name" },
        { key: "course", label: "Course" },
        { key: "email", label: "Email" },
        { key: "dateJoined", label: "Date Joined" },
    ];

    const handleDelete = (user) => {
        setData(data.filter((u) => u.id !== user.id));
    };

    return (
        <UserTable
            columns={columns}
            data={data}
            onEdit={onEdit}
            onDelete={handleDelete}
        />
    );
};

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState("admins");

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

    const [editData, setEditData] = useState(null);

    const handleSaveEdit = () => {
        if (activeTab === "admins") {
            setAdmins(admins.map((u) => (u.id === editData.id ? editData : u)));
        } else if (activeTab === "teachers") {
            setTeachers(teachers.map((u) => (u.id === editData.id ? editData : u)));
        } else {
            setStudents(students.map((u) => (u.id === editData.id ? editData : u)));
        }
        setEditData(null);
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h3 className="fw-bold mb-3">User Management</h3>

                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link px-4 py-2 fw-semibold ${activeTab === "admins" ? "active custom-tab-active" : "custom-tab"}`}
                            onClick={() => setActiveTab("admins")}
                        >
                            Admins
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            className={`nav-link px-4 py-2 fw-semibold ${activeTab === "teachers" ? "active custom-tab-active" : "custom-tab"}`}
                            onClick={() => setActiveTab("teachers")}
                        >
                            Teachers
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            className={`nav-link px-4 py-2 fw-semibold ${activeTab === "students" ? "active custom-tab-active" : "custom-tab"}`}
                            onClick={() => setActiveTab("students")}
                        >
                            Students
                        </button>
                    </li>
                </ul>


                <div className="card shadow-sm p-3 rounded-4">
                    {activeTab === "admins" && (
                        <AdminsTab data={admins} setData={setAdmins} onEdit={setEditData} />
                    )}
                    {activeTab === "teachers" && (
                        <TeachersTab data={teachers} setData={setTeachers} onEdit={setEditData} />
                    )}
                    {activeTab === "students" && (
                        <StudentsTab data={students} setData={setStudents} onEdit={setEditData} />
                    )}
                </div>
            </div>

            {editData && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5 className="fw-bold mb-3">Edit User</h5>

                            <input
                                className="form-control mb-2"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Name"
                            />

                            {activeTab === "admins" && (
                                <input
                                    className="form-control mb-2"
                                    value={editData.role}
                                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                                    placeholder="Role"
                                />
                            )}

                            {activeTab === "teachers" && (
                                <input
                                    className="form-control mb-2"
                                    value={editData.subject}
                                    onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                                    placeholder="Subject"
                                />
                            )}

                            {activeTab === "students" && (
                                <input
                                    className="form-control mb-2"
                                    value={editData.course}
                                    onChange={(e) => setEditData({ ...editData, course: e.target.value })}
                                    placeholder="Course"
                                />
                            )}

                            <input
                                className="form-control mb-2"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                placeholder="Email"
                            />

                            <div className="text-end mt-3">
                                <input
                                    type="date"
                                    className="form-control mb-2"
                                    value={editData.dateJoined}
                                    onChange={(e) => setEditData({ ...editData, dateJoined: e.target.value })}
                                />
                                <button className="btn btn-secondary me-2" onClick={() => setEditData(null)}>
                                    Cancel
                                </button>
                                

                                <button className="btn btn-primary" onClick={handleSaveEdit}>
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserManagement;
