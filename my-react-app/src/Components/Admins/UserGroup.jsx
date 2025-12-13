import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";



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
      <table ref={tableRef} className="display table user-group-table" style={{ width: "100%" }}>
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
                <td key={c.key}>{row[c.key]}</td>
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

const UserGroup = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Admin", description: "Full access to everything" },
    { id: 2, name: "Instructor", description: "Manage exams and results" },
    { id: 3, name: "Student", description: "Access exams and view results" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", description: "" });

  const openAddModal = () => {
    setForm({ id: null, name: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (group) => {
    setForm(group);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (form.id) {
      setGroups(groups.map((g) => (g.id === form.id ? form : g)));
    } else {
      setGroups([...groups, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
    setForm({ id: null, name: "", description: "" });
  };

  const handleDelete = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="fw-bold">User Group Management</h3>
          <button className="btn btn-primary" onClick={openAddModal}>
            + Add Group
          </button>
        </div>

        <div className="card p-3 shadow-sm">
          <DataTableWrapper
            columns={[
              { key: "name", label: "Group Name" },
              { key: "description", label: "Description" },
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
            <h5 className="fw-bold mb-3">
              {form.id ? "Edit Group" : "Add Group"}
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Group Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserGroup;
