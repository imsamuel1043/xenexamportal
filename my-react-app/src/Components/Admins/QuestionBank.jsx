import React, { useEffect, useRef, useState, useContext } from "react";
import Select from "react-select";
import AdminLayout from "../Layouts/AdminLayout";
import { DataContext } from "../DataContext";
import "../../assets/Css/QuestionBank.css";

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

const questionTypes = [
  { value: "MCQ", label: "MCQ" },
  { value: "True/False", label: "True/False" },
  { value: "Short Answer", label: "Short Answer" }
];

const initialQuestions = [
  { id: 1, courseId: 1, subject: "Color Theory", type: "MCQ", question: "Which colors are complementary?", optionA: "Blue & Orange", optionB: "Blue & Green", optionC: "Red & Pink", optionD: "Yellow & Purple", correct: "A" },
  { id: 2, courseId: 1, subject: "Wireframing", type: "Short Answer", question: "Purpose of low-fidelity wireframe?", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" },

  { id: 3, courseId: 2, subject: "Basics", type: "MCQ", question: "Which keyword is block scoped?", optionA: "var", optionB: "let", optionC: "function", optionD: "global", correct: "B" },
  { id: 4, courseId: 2, subject: "DOM & Events", type: "MCQ", question: "Event when DOM is ready?", optionA: "DOMContentLoaded", optionB: "load", optionC: "ready", optionD: "onload", correct: "A" },

  { id: 5, courseId: 3, subject: "Basics", type: "MCQ", question: "List syntax in Python?", optionA: "{}", optionB: "()", optionC: "[]", optionD: "<>", correct: "C" },
  { id: 6, courseId: 3, subject: "OOP", type: "Short Answer", question: "Initializer method in Python classes?", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" },

  { id: 7, courseId: 4, subject: "Components", type: "MCQ", question: "Which update introduced Hooks?", optionA: "Hooks", optionB: "JSX", optionC: "Context", optionD: "Redux", correct: "A" },
  { id: 8, courseId: 4, subject: "State & Props", type: "MCQ", question: "Which is immutable?", optionA: "state", optionB: "props", optionC: "setState", optionD: "context", correct: "B" },

  { id: 9, courseId: 5, subject: "SEO", type: "MCQ", question: "What does SEO stand for?", optionA: "Search Engine Optimization", optionB: "Social Engine Operation", optionC: "Search Entry Optimization", optionD: "Social Engine Output", correct: "A" },
  { id: 10, courseId: 5, subject: "Analytics", type: "Short Answer", question: "Name one KPI for website engagement.", optionA: "", optionB: "", optionC: "", optionD: "", correct: "" }
];

const QuestionBank = () => {
  const { questions, setQuestions } = useContext(DataContext);

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
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

  const tableRef = useRef(null);
  const dt = useRef(null);

  
  useEffect(() => {
    if (!questions || questions.length === 0) {
      setQuestions(initialQuestions);
    }
  }, []);

  
  const filtered = (questions || []).filter(q =>
    (selectedCourse === "all" || q.courseId === Number(selectedCourse)) &&
    (selectedSubject === "all" || q.subject === selectedSubject) &&
    (selectedType === "all" || q.type === selectedType)
  );

  
  useEffect(() => {
    if (dt.current) {
      dt.current.destroy();
    }

    dt.current = window.$(tableRef.current).DataTable({
      responsive: true,
      pageLength: 6,
      destroy: true,
      autoWidth: false,
      columnDefs: [{ className: "dt-center", targets: "_all" }]
    });
  }, [filtered]);

  
  const openModal = () => {
    setEditingId(null);
    setForm({
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

  
  const handleEdit = (q) => {
    setEditingId(q.id);
    setForm({ ...q });
    setShowModal(true);
  };

  
  const handleDelete = (id) => {
    if (!window.confirm("Delete question?")) return;
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  
  const handleSave = () => {
    if (!form.courseId || !form.question) {
      alert("Course and question are required");
      return;
    }

    if (editingId) {
      setQuestions(prev =>
        prev.map(q => (q.id === editingId ? { ...form, id: editingId } : q))
      );
    } else {
      const maxId = Math.max(...questions.map(q => q.id), 0);
      setQuestions(prev => [...prev, { ...form, id: maxId + 1 }]);
    }

    setShowModal(false);
  };

  
  useEffect(() => {
    if (form.courseId) {
      const subs = subjectsMap[form.courseId];
      if (!subs.includes(form.subject)) {
        setForm({ ...form, subject: subs[0] });
      }
    }
  }, [form.courseId]);

  
  const subjectFilterOptions =
    selectedCourse === "all"
      ? [...new Set(Object.values(subjectsMap).flat())]
      : subjectsMap[selectedCourse];

  return (
    <AdminLayout>
      <div className="q-container">
        <div className="q-header">
          <h3>Question Bank</h3>
          <button className="btn btn-primary" onClick={openModal}>+ Add Question</button>
        </div>

        
        <div className="q-filters">
          <Select
            options={[{ value: "all", label: "All Courses" }, ...courses.map(c => ({ value: c.id, label: c.name }))]}
            defaultValue={{ value: "all", label: "All Courses" }}
            onChange={opt => { setSelectedCourse(opt.value); setSelectedSubject("all"); }}
          />

          <Select
            options={[{ value: "all", label: "All Subjects" }, ...subjectFilterOptions.map(s => ({ value: s, label: s }))]}
            defaultValue={{ value: "all", label: "All Subjects" }}
            onChange={opt => setSelectedSubject(opt.value)}
          />

          <Select
            options={[{ value: "all", label: "All Types" }, ...questionTypes]}
            defaultValue={{ value: "all", label: "All Types" }}
            onChange={opt => setSelectedType(opt.value)}
          />
        </div>

        
        <div className="q-table-wrap">
          <table ref={tableRef} className="display table table-striped table-bordered nowrap" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Course</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Correct</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(q => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.question}</td>
                  <td>{courses.find(c => c.id === q.courseId)?.name}</td>
                  <td>{q.subject}</td>
                  <td>{q.type}</td>
                  <td>{q.correct ? <span className="badge bg-success">{q.correct}</span> : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(q)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center mt-3 text-muted">No questions found.</p>
          )}
        </div>

        
        {showModal && (
          <div className="q-overlay">
            <div className="q-modal">
              <h5>{editingId ? "Edit Question" : "Add Question"}</h5>

              <label>Course</label>
              <Select
                className="mb-2"
                options={courses.map(c => ({ value: c.id, label: c.name }))}
                value={
                  form.courseId
                    ? { value: form.courseId, label: courses.find(c => c.id === form.courseId)?.name }
                    : null
                }
                onChange={opt => setForm({ ...form, courseId: opt.value })}
              />

              <label>Subject</label>
              <Select
                className="mb-2"
                options={(form.courseId ? subjectsMap[form.courseId] : []).map(s => ({ value: s, label: s }))}
                value={form.subject ? { value: form.subject, label: form.subject } : null}
                onChange={opt => setForm({ ...form, subject: opt.value })}
              />

              <label>Question Type</label>
              <Select
                className="mb-2"
                options={questionTypes}
                value={questionTypes.find(t => t.value === form.type)}
                onChange={opt => setForm({ ...form, type: opt.value })}
              />

              <label>Question</label>
              <textarea
                className="form-control mb-2"
                rows={2}
                value={form.question}
                onChange={e => setForm({ ...form, question: e.target.value })}
              />

              
              {form.type === "MCQ" && (
                <>
                  <label>Option A</label>
                  <input className="form-control mb-2" value={form.optionA} onChange={e => setForm({ ...form, optionA: e.target.value })} />

                  <label>Option B</label>
                  <input className="form-control mb-2" value={form.optionB} onChange={e => setForm({ ...form, optionB: e.target.value })} />

                  <label>Option C</label>
                  <input className="form-control mb-2" value={form.optionC} onChange={e => setForm({ ...form, optionC: e.target.value })} />

                  <label>Option D</label>
                  <input className="form-control mb-2" value={form.optionD} onChange={e => setForm({ ...form, optionD: e.target.value })} />

                  <label>Correct Answer</label>
                  <select className="form-control mb-2" value={form.correct} onChange={e => setForm({ ...form, correct: e.target.value })}>
                    <option value="">None</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </>
              )}

              <div className="q-modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default QuestionBank;
