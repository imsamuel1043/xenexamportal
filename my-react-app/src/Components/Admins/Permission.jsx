import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
// import "../../assets/Css/Permission.css";

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
      <table
        ref={tableRef}
        className="display table permission-table"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}>
                  {Array.isArray(row[c.key])
                    ? row[c.key].join(", ")
                    : row[c.key]}
                </td>
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
                  onClick={() => onDelete(row.id)}
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
    { id: 1, name: "Admin", permissions: allPermissions },
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

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", permissions: [] });

  const openEditModal = (group) => {
    setForm(group);
    setShowModal(true);
  };

  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    setGroups((prev) =>
      prev.map((g) => (g.id === form.id ? form : g))
    );

    setShowModal(false);
    setForm({ id: null, name: "", permissions: [] });
  };

  const handleDelete = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h3 className="fw-bold mb-3">Permissions</h3>

        <div className="card p-3 shadow-sm">
          <DataTableWrapper
            columns={[
              { key: "name", label: "Group Name" },
              { key: "permissions", label: "Permissions" },
            ]}
            data={groups}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal-backdrop-custom"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="fw-bold mb-3">Edit Permissions</h5>

            <input
              className="form-control mb-3"
              placeholder="Group Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <label className="fw-bold mb-2">Assign Permissions</label>

            <div className="d-flex flex-wrap gap-3 mb-3">
              {allPermissions.map((perm, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={form.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                  />
                  <label className="form-check-label">
                    {perm}
                  </label>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
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

export default Permission;
