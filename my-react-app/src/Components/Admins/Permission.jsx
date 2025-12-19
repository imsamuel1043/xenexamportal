import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const Permission = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

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
    { name: "Admin", permissions: allPermissions },
    {
      name: "Instructor",
      permissions: ["Manage Exams", "Manage Questions", "View Results"],
    },
    {
      name: "Student",
      permissions: ["View Results", "View Dashboard"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  
  useEffect(() => {
    if (!tableRef.current || dtInstance.current) return;

    const table = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pagingType: "simple_numbers",
      lengthChange: true,
      lengthMenu: [5, 10, 25, 50],
      pageLength: 10,
      language: {
        search: "",
        searchPlaceholder: "Search...",
        lengthMenu: " _MENU_ ",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        paginate: { previous: "‹", next: "›" },
      },
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
      dtInstance.current = null;
    };
  }, []);

  
  const openEditModal = (group, index) => {
    setIsEdit(true);
    setEditIndex(index);
    setFormData(group);
    setShowModal(true);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const togglePermission = (perm) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    setGroups((prev) =>
      prev.map((g, i) => (i === editIndex ? formData : g))
    );

    setShowModal(false);
  };

  const handleDelete = () => {
    setGroups((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
  };

  return (
    <AdminLayout>
      <div>
        
        <div className="page-header">
          <h2 className="page-title">Permission Management</h2>
        </div>

        
        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Permissions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, index) => (
                  <tr key={index}>
                    <td>{g.name}</td>
                    <td>
                      {g.permissions.map((p, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-block",
                            background: "#eef2ff",
                            color: "#3956AD",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            margin: "2px",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </td>
                    <td className="action-cell">
                      <button
                        className="icon-btn view"
                        onClick={() => openEditModal(g, index)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => confirmDelete(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Edit Permissions</h3>

                <input
                  value={formData.name}
                  disabled
                  style={{ marginBottom: "15px" }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  {allPermissions.map((perm, i) => (
                    <label key={i} className="form-check">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      <span style={{ marginLeft: "8px" }}>{perm}</span>
                    </label>
                  ))}
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-add" onClick={handleSave}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Delete Group?</h3>
                <p style={{ marginBottom: "20px" }}>
                  Are you sure you want to delete this group?
                </p>
                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-delete" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Permission;
