import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

const UserGroup = () => {
    const [groups, setGroups] = useState([
        { id: 1, name: "Admin", description: "Full access to everything" },
        { id: 2, name: "Instructor", description: "Manage exams and results" },
        { id: 3, name: "Student", description: "Access exams and view results" },
    ]);

    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ id: null, name: "", description: "" });
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) return;

        if (isEdit) {
            setGroups(
                groups.map((g) =>
                    g.id === form.id
                        ? { ...g, name: form.name, description: form.description }
                        : g
                )
            );
        } else {
         
            setGroups([
                ...groups,
                {
                    id: Date.now(),
                    name: form.name,
                    description: form.description,
                },
            ]);
        }

        setForm({ id: null, name: "", description: "" });
        setIsEdit(false);
    };

    const handleEdit = (group) => {
        setForm(group);
        setIsEdit(true);
    };

    const handleDelete = (id) => {
        setGroups(groups.filter((g) => g.id !== id));
    };

    return (
        <AdminLayout>
            <div className="container mt-4">
                <h3 className="fw-bold mb-3">User Group Management</h3>

                <div className="card shadow-sm p-3" style={{ borderRadius: "10px" }}>
                    <div className="d-flex justify-content-between mb-3">
                        <input
                            type="text"
                            className="form-control"
                            style={{ width: "250px" }}
                            placeholder="Search user groups..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setForm({ id: null, name: "", description: "" });
                                setIsEdit(false);
                            }}
                        >
                            + Add Group
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label fw-bold">Group Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-2 d-flex align-items-end">
                                <button className="btn btn-success w-100" type="submit">
                                    {isEdit ? "Update" : "Add"}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* TABLE */}
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Group Name</th>
                                    <th>Description</th>
                                    <th style={{ width: "150px" }}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {groups
                                    .filter((g) =>
                                        g.name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((group) => (
                                        <tr key={group.id}>
                                            <td>{group.name}</td>
                                            <td>{group.description}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => handleEdit(group)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(group.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {groups.length === 0 && (
                            <p className="text-center text-muted">No user groups found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserGroup;
