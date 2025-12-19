import React, { useEffect, useRef, useState, useContext } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import { DataContext } from "../DataContext";
import "../../assets/Css/Student.css";

const courses = [
  { id: 1, name: "UI/UX Design" },
  { id: 2, name: "Javascript" },
  { id: 3, name: "Python Programming" },
  { id: 4, name: "React Development" },
  { id: 5, name: "Digital Marketing" }
];

const subjectsMap = {
  1: ["Color Theory", "Wireframing", "Typography"],
  2: ["Basics", "DOM & Events", "Arrays & Loops"],
  3: ["Basics", "OOP", "File Handling"],
  4: ["Components", "State & Props", "Hooks"],
  5: ["SEO", "Content Strategy", "Analytics"]
};

const questionTypes = ["MCQ", "True/False", "Short Answer"];

const initialQuestions = [
  { id: 1, courseId: 1, subject: "Color Theory", type: "MCQ", question: "Which colors are complementary?", optionA: "Blue & Orange", optionB: "Blue & Green", optionC: "Red & Pink", optionD: "Yellow & Purple", correct: "A" },
  { id: 2, courseId: 2, subject: "Basics", type: "MCQ", question: "Which keyword is block scoped?", optionA: "var", optionB: "let", optionC: "function", optionD: "global", correct: "B" },
  { id: 3, courseId: 3, subject: "OOP", type: "Short Answer", question: "Explain polymorphism in Python", correct: "-" },
  { id: 4, courseId: 4, subject: "Hooks", type: "MCQ", question: "Which hook is used for state management?", optionA: "useEffect", optionB: "useState", optionC: "useRef", optionD: "useMemo", correct: "B" },
  { id: 5, courseId: 5, subject: "SEO", type: "True/False", question: "Meta descriptions affect search ranking?", correct: "False" },
  { id: 6, courseId: 1, subject: "Typography", type: "MCQ", question: "Which font is sans-serif?", optionA: "Arial", optionB: "Times New Roman", optionC: "Georgia", optionD: "Courier", correct: "A" },
  { id: 7, courseId: 2, subject: "Arrays & Loops", type: "MCQ", question: "Which loop iterates over array elements?", optionA: "for..in", optionB: "for..of", optionC: "while", optionD: "do..while", correct: "B" },
  { id: 8, courseId: 3, subject: "File Handling", type: "Short Answer", question: "How to read a file in Python?", correct: "-" }
];

const QuestionBank = () => {
  const { questions, setQuestions } = useContext(DataContext);
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    courseId: "",
    subject: "",
    type: "MCQ",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correct: ""
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  
  const filterDropdownBackground = "#f9f9f9";
  const filterDropdownFontColor = "#333";
  const filterDropdownFontFamily = "Arial, sans-serif";
  const filterDropdownFontSize = "14px";
  const filterDropdownHoverBackground = "#e0e0e0";

  useEffect(() => {
    if (!questions || questions.length === 0) setQuestions(initialQuestions);
  }, []);

  useEffect(() => {
    if (!tableRef.current || dtInstance.current) return;

    const table = new window.DataTable(tableRef.current, {
      responsive: true,
      ordering: true,
      searching: true,
      paging: true,
      lengthChange: true,
      pageLength: 10,
      language: {
        search: "",
        searchPlaceholder: "Search...",
        lengthMenu: " _MENU_ ",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        paginate: { previous: "‹", next: "›" }
      },
      dom: "<'dt-top-row'l f>t<'dt-bottom-row'i p>",
      initComplete: function () {
        const api = this.api();
        const filterCols = [
          { index: 1, type: "course" },
          { index: 2, type: "subject" },
          { index: 3, type: "type" }
        ];

        filterCols.forEach(col => {
          const column = api.column(col.index);

          const oldIcon = column.header().querySelector(".filter-icon-container");
          if (oldIcon) oldIcon.remove();

          const filterContainer = document.createElement("div");
          filterContainer.className = "filter-icon-container";
          filterContainer.style.position = "absolute";
          filterContainer.style.right = "5px";
          filterContainer.style.top = "50%";
          filterContainer.style.transform = "translateY(-50%)";

          const icon = document.createElement("i");
          icon.className = "bi bi-funnel filter-icon";
          icon.style.cursor = "pointer";
          filterContainer.appendChild(icon);

          const dropdown = document.createElement("div");
          dropdown.className = "filter-dropdown";
          dropdown.style.position = "absolute";
          dropdown.style.top = "100%";
          dropdown.style.right = "0";
          dropdown.style.background = filterDropdownBackground;
          dropdown.style.color = filterDropdownFontColor;
          dropdown.style.fontFamily = filterDropdownFontFamily;
          dropdown.style.fontSize = filterDropdownFontSize;
          dropdown.style.border = "1px solid #ddd";
          dropdown.style.borderRadius = "4px";
          dropdown.style.minWidth = "140px";
          dropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.15)";
          dropdown.style.display = "none";
          dropdown.style.zIndex = "10";
          filterContainer.appendChild(dropdown);

          let options = [];
          if (col.type === "course") options = courses.map(c => c.name);
          else if (col.type === "subject") options = Object.values(subjectsMap).flat();
          else if (col.type === "type") options = questionTypes;

          const allOption = document.createElement("div");
          allOption.textContent = "All";
          allOption.style.padding = "6px 10px";
          allOption.style.cursor = "pointer";
          allOption.addEventListener("click", () => {
            column.search("").draw();
            dropdown.style.display = "none";
          });
          dropdown.appendChild(allOption);

          options.forEach(d => {
            const option = document.createElement("div");
            option.textContent = d;
            option.style.padding = "6px 10px";
            option.style.cursor = "pointer";
            option.addEventListener("click", () => {
              column.search("^" + d + "$", true, false).draw();
              dropdown.style.display = "none";
            });
            dropdown.appendChild(option);
          });

          Array.from(dropdown.children).forEach(option => {
            option.addEventListener("mouseenter", () => {
              option.style.background = filterDropdownHoverBackground;
            });
            option.addEventListener("mouseleave", () => {
              option.style.background = filterDropdownBackground;
            });
          });

          icon.addEventListener("click", e => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
          });

          document.addEventListener("click", () => {
            dropdown.style.display = "none";
          });

          column.header().style.position = "relative";
          column.header().appendChild(filterContainer);
        });
      }
    });

    dtInstance.current = table;

    return () => {
      table.destroy();
      dtInstance.current = null;
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({
      courseId: "",
      subject: "",
      type: "MCQ",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correct: ""
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.courseId || !formData.subject || !formData.question) {
      alert("Course, Subject, and Question are required");
      return;
    }

    const newQuestion = editingId !== null
      ? { ...formData, id: editingId }
      : { ...formData, id: Math.max(...questions.map(q => q.id), 0) + 1 };

    setQuestions(prev => {
      if (editingId !== null) return prev.map(q => q.id === editingId ? newQuestion : q);
      else return [...prev, newQuestion];
    });

    dtInstance.current.clear();
    [...questions.filter(q => q.id !== editingId), newQuestion].forEach(q => {
      dtInstance.current.row.add([
        q.question,
        courses.find(c => c.id === q.courseId)?.name,
        q.subject,
        q.type,
        q.correct || "-",
        `<div class="action-cell">
          <button class="icon-btn view"><i class="bi bi-pencil"></i></button>
          <button class="icon-btn delete"><i class="bi bi-trash"></i></button>
        </div>`
      ]);
    });
    dtInstance.current.draw();

    setShowModal(false);
  };

  
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setQuestions(prev => prev.filter(q => q.id !== deleteId));
    const row = document.getElementById(`question-${deleteId}`);
    if (row && dtInstance.current) dtInstance.current.row(row).remove().draw(false);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div>
        <div className="page-header">
          <h2 className="page-title">Question Bank</h2>
          <button className="add-student-btn" onClick={handleAddClick}>
            <i className="bi bi-plus-lg"></i> Add Question
          </button>
        </div>

        <div className="student-management-box">
          <div className="table-responsive">
            <table ref={tableRef} className="display students-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Course</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Correct</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map(q => (
                  <tr key={q.id} id={`question-${q.id}`}>
                    <td>{q.question}</td>
                    <td>{courses.find(c => c.id === q.courseId)?.name}</td>
                    <td>{q.subject}</td>
                    <td>{q.type}</td>
                    <td>{q.correct || "-"}</td>
                    <td className="action-cell">
                      <button className="icon-btn view" onClick={() => { setEditingId(q.id); setFormData({ ...q }); setShowModal(true); }}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDeleteClick(q.id)}>
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
                <h3>{editingId !== null ? "Edit Question" : "Add Question"}</h3>
                <div className="modal-form">
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: Number(e.target.value), subject: subjectsMap[e.target.value][0] })}
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select Subject</option>
                    {formData.courseId && subjectsMap[formData.courseId].map((s, idx) => <option key={idx} value={s}>{s}</option>)}
                  </select>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    {questionTypes.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
                  </select>
                  <input type="text" name="question" placeholder="Question" value={formData.question} onChange={handleChange} />
                  {formData.type === "MCQ" && (
                    <>
                      <input type="text" name="optionA" placeholder="Option A" value={formData.optionA} onChange={handleChange} />
                      <input type="text" name="optionB" placeholder="Option B" value={formData.optionB} onChange={handleChange} />
                      <input type="text" name="optionC" placeholder="Option C" value={formData.optionC} onChange={handleChange} />
                      <input type="text" name="optionD" placeholder="Option D" value={formData.optionD} onChange={handleChange} />
                      <select name="correct" value={formData.correct} onChange={handleChange}>
                        <option value="">Select Correct Option</option>
                        <option value="A">Option A</option>
                        <option value="B">Option B</option>
                        <option value="C">Option C</option>
                        <option value="D">Option D</option>
                      </select>
                    </>
                  )}
                </div>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn-add" onClick={handleSave}>{editingId !== null ? "Save" : "Add"}</button>
                </div>
              </div>
            </div>
          )}

          
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3 className="text-danger">Delete Question</h3>
                <p>Are you sure you want to delete this question?</p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn-add" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </AdminLayout>
  );
};

export default QuestionBank;
