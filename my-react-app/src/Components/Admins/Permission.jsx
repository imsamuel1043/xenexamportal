import React, { useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";

const Permission = () => {
    const allPermissions = [
        "Create User",
        "Edit User",
        "Delete User",
        "View Results",
        "Manage Exams",
        "Manage Questions",
        "Assign Exams",
        "View Dashboard",
    ];

    const [groups, setGroups] = useState([
        {
            id: 1,
            name: "Admin",
            permissions: allPermissions,
        },
        {
            id: 2,
            name: "Instructor",
            permissions: ["Manage Exams", "Manage Questions", "View Results"],
        },
        {
            id: 3,
            name: "Student",
            permissions: ["View Results", "View Dashboard"],
        },
    ]);

    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        id: null,
        name: "",
        permissions: [],
    });

    const [isEdit, setIsEdit] = useState(false);

    const togglePermission = (perm) => {
        if (form.permissions.includes(perm)) {
            setForm({
                ...form,
                permissions: form.permissions.filter((p) => p !== perm),
            });
        } else {
            setForm({
                ...form,
                permissions: [...form.permissions, perm],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) return;

        if (isEdit) {
            setGroups(
                groups.map((g) =>
                    g.id === form.id
                        ? { ...g, name: form.name, permissions: form.permissions }
                        : g
                )
            );
        }

        setForm({ id: null, name: "", permissions: [] });
        setIsEdit(false);
    };

    const handleEdit = (group) => {
        setForm({ ...group });
        setIsEdit(true);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = (id) => {
        setGroups(groups.filter((g) => g.id !== id));
    };

    return (
        <AdminLayout>
            

            <div className="container mt-4">
                <h3 className="fw-bold mb-3">Permissions</h3>

                <div
                    className="card shadow-sm p-3"
                    style={{ borderRadius: "12px" }}
                >
                    <div className="d-flex flex-wrap justify-content-start mb-3">
                        <input
                            type="text"
                            className="form-control"
                            style={{ maxWidth: "250px" }}
                            placeholder="Search permission groups..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {isEdit && (
                        <form
                            onSubmit={handleSubmit}
                            className="mb-4 bg-light p-3 rounded"
                        >
                            <div className="row gy-3">
                                <div className="col-12 col-md-4">
                                    <label className="form-label fw-bold">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-12 col-md-8">
                                    <label className="form-label fw-bold">
                                        Assign Permissions
                                    </label>

                                    <div className="d-flex flex-wrap gap-3 mt-2">
                                        {allPermissions.map((perm, index) => (
                                            <div
                                                key={index}
                                                className="form-check"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={form.permissions.includes(
                                                        perm
                                                    )}
                                                    onChange={() =>
                                                        togglePermission(perm)
                                                    }
                                                />
                                                <label className="form-check-label">
                                                    {perm}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button
                                        className="btn btn-primary px-4 mt-2"
                                        type="submit"
                                    >
                                        Update Permissions
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Group Name</th>
                                    <th>Permissions</th>
                                    <th style={{ width: "150px" }}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {groups
                                    .filter((g) =>
                                        g.name
                                            .toLowerCase()
                                            .includes(
                                                search.toLowerCase()
                                            )
                                    )
                                    .map((group) => (
                                        <tr key={group.id}>
                                            <td className="fw-bold">
                                                {group.name}
                                            </td>
                                            <td style={{ fontSize: "14px" }}>
                                                {group.permissions.join(", ")}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() =>
                                                        handleEdit(group)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleDelete(group.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {groups.length === 0 && (
                            <p className="text-center text-muted">
                                No permission groups found.
                            </p>
                        )}
                    </div>
                </div>
            </div>


        </AdminLayout>
    );
};

export default Permission;
