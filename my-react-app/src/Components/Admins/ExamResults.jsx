import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import "../../assets/Css/Student.css";

const FILTER_KEY = "examResultsFilters";

const ExamResults = () => {
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [results, setResults] = useState([
    { student: "Samuel", exam: "React", course: "Digital Marketing", batch: "Batch 9", date: "2025-02-10", score: "85%" },
    { student: "Prabin Kumar", exam: "JavaScript", course: "Creative Design", batch: "Batch 12", date: "2025-02-12", score: "92%" },
    { student: "Vibina", exam: "UI/UX Design", course: "Full Stack Development", batch: "Batch 7", date: "2025-02-13", score: "78%" },
    { student: "Naja", exam: "React", course: "UI/UX Design and Development", batch: "Batch 9", date: "2025-02-10", score: "85%" },
    { student: "Aysha", exam: "JavaScript", course: "PHP Development", batch: "Batch 12", date: "2025-02-12", score: "92%" },
    { student: "Sithara", exam: "UI/UX Design", course: "Multimedia With Animation", batch: "Batch 7", date: "2025-02-13", score: "78%" },
    { student: "Muhusina", exam: "UI/UX Design", course: "Node JS Development", batch: "Batch 7", date: "2025-02-13", score: "78%" },
    { student: "Riya", exam: "React", course: "Python Development", batch: "Batch 9", date: "2025-02-10", score: "85%" },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [editData, setEditData] = useState({});

  
  useEffect(() => {
    if (!tableRef.current || dtInstance.current) return;

    const savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY) || "{}");

    const table = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      pageLength: 10,
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      language: {
        search: "",
        searchPlaceholder: "Search...",
        lengthMenu: " _MENU_ ",
        paginate: { previous: "‹", next: "›" },
      },
      initComplete() {
        const api = this.api();
        const filterCols = [
          { index: 1, key: "exam" },
          { index: 2, key: "course" },
          { index: 3, key: "batch" },
        ];

        filterCols.forEach(colInfo => {
          const col = api.column(colInfo.index);
          const th = col.header();
          if (th.querySelector(".dt-filter-icon")) return;

          th.style.position = "relative";
          th.style.paddingRight = "26px";

          const text = th.innerText;
          th.innerHTML = `<span class="th-text">${text}</span>`;

          const icon = document.createElement("i");
          icon.className = "bi bi-funnel dt-filter-icon";
          icon.style.position = "absolute";
          icon.style.right = "6px";
          icon.style.top = "50%";
          icon.style.transform = "translateY(-50%)";
          icon.style.cursor = "pointer";

          const dropdown = document.createElement("div");
          dropdown.style.position = "absolute";
          dropdown.style.top = "100%";
          dropdown.style.right = "0";
          dropdown.style.background = "#fff";
          dropdown.style.border = "1px solid #ddd";
          dropdown.style.borderRadius = "4px";
          dropdown.style.boxShadow = "0 2px 6px rgba(0,0,0,.15)";
          dropdown.style.display = "none";
          dropdown.style.zIndex = "20";
          dropdown.style.minWidth = "140px";
          dropdown.style.color = "#333";

          
          const values = [...new Set(col.data().toArray())];

          const addOption = (label, value = "") => {
            const opt = document.createElement("div");
            opt.textContent = label;
            opt.style.padding = "6px 10px";
            opt.style.cursor = "pointer";
            opt.style.color = "#333";
            opt.onmouseenter = () => (opt.style.background = "#f5f5f5");
            opt.onmouseleave = () => (opt.style.background = "transparent");
            opt.onclick = () => {
              if (value) {
                col.search("^" + value + "$", true, false).draw();
                icon.classList.add("active");
                savedFilters[colInfo.key] = value;
              } else {
                col.search("").draw();
                icon.classList.remove("active");
                delete savedFilters[colInfo.key];
              }
              localStorage.setItem(FILTER_KEY, JSON.stringify(savedFilters));
              dropdown.style.display = "none";
            };
            dropdown.appendChild(opt);
          };

          addOption("All");
          values.forEach(v => addOption(v, v));

          
          if (savedFilters[colInfo.key]) {
            col.search("^" + savedFilters[colInfo.key] + "$", true, false).draw();
            icon.classList.add("active");
          }

          icon.onclick = e => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
          };
          document.addEventListener("click", () => {
            dropdown.style.display = "none";
          });

          th.appendChild(icon);
          th.appendChild(dropdown);
        });
      },
    });

    dtInstance.current = table;
    return () => {
      table.destroy();
      dtInstance.current = null;
    };
  }, [results]); 

  
  const handleEdit = index => {
    setActiveRowIndex(index);
    setEditData({ ...results[index] });
    setShowEditModal(true);
  };

  
  const handleDelete = index => {
    setActiveRowIndex(index);
    setShowDeleteModal(true);
  };

  
  const confirmDelete = () => {
    setResults(prev => prev.filter((_, i) => i !== activeRowIndex));
    setShowDeleteModal(false);
    setActiveRowIndex(null);
  };

  
  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  
  const saveEdit = () => {
    setResults(prev => prev.map((r, i) => (i === activeRowIndex ? editData : r)));
    setShowEditModal(false);
    setActiveRowIndex(null);
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header">
          <h2 className="page-title">Exam Results</h2>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td>{r.student}</td>
                    <td>{r.exam}</td>
                    <td>{r.course}</td>
                    <td>{r.batch}</td>
                    <td>{r.date}</td>
                    <td className="fw-bold">{r.score}</td>
                    <td className="action-cell">
                      <button className="icon-btn view" onClick={() => handleEdit(i)}>
                        <i className="bi bi-pencil" />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(i)}>
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="text-danger">Delete Result</h3>
              <p>Are you sure you want to delete this result?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn-add" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}

        
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Edit Result</h3>
              <div className="modal-form">
                <input type="text" name="student" value={editData.student || ""} onChange={handleEditChange} placeholder="Student Name" />
                <input type="text" name="exam" value={editData.exam || ""} onChange={handleEditChange} placeholder="Exam" />
                <input type="text" name="course" value={editData.course || ""} onChange={handleEditChange} placeholder="Course" />
                <input type="text" name="batch" value={editData.batch || ""} onChange={handleEditChange} placeholder="Batch" />
                <input type="date" name="date" value={editData.date || ""} onChange={handleEditChange} />
                <input type="text" name="score" value={editData.score || ""} onChange={handleEditChange} placeholder="Score" />
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn-add" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ExamResults;
