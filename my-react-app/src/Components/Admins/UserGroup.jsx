import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const UserGroup = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [groups, setGroups] = useState([
    { name: "Admin", description: "Full access to everything" },
    { name: "Instructor", description: "Manage exams and results" },
    { name: "Student", description: "Access exams and view results" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

  
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ name: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (group, index) => {
    setIsEdit(true);
    setEditIndex(index);
    setFormData(group);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (isEdit) {
      setGroups((prev) =>
        prev.map((g, i) => (i === editIndex ? formData : g))
      );
    } else {
      setGroups((prev) => [...prev, formData]);
    }

    setShowModal(false);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setGroups((prev) => prev.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
  };

  return (
    <AdminLayout>
      <div>
        
        <div className="page-header">
          <h2 className="page-title">User Group Management</h2>
          <button className="add-student-btn" onClick={openAddModal}>
            <i className="bi bi-plus-lg"></i> Add Group
          </button>
        </div>

        
        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, index) => (
                  <tr key={index}>
                    <td>{g.name}</td>
                    <td>{g.description}</td>
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
                <h3>{isEdit ? "Edit Group" : "Add Group"}</h3>

                <div className="modal-form">
                  <input
                    name="name"
                    placeholder="Group Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn-add" onClick={handleSave}>
                    {isEdit ? "Update" : "Add"}
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

export default UserGroup;
