// import React, { useState, useMemo } from "react";
// import "../assets/Css/tables.css";

// const DataTable = ({ columns = [], data = [], setData = () => {}, rowsPerPage = 5 }) => {
//   const [search, setSearch] = useState("");
//   const [sortConfig, setSortConfig] = useState(null);
//   const [page, setPage] = useState(1);

  
//   const [editRow, setEditRow] = useState(null);
//   const [deleteRow, setDeleteRow] = useState(null);

  
//   const [selectedRows, setSelectedRows] = useState([]);

  
//   const [filters, setFilters] = useState({});

  
//   const filteredData = useMemo(() => {
//     return data
//       .filter(row =>
//         columns.some(col =>
//           String(row[col.accessor] ?? "").toLowerCase().includes(search.toLowerCase())
//         )
//       )
//       .filter(row =>
//         columns.every(col =>
//           !filters[col.accessor] || filters[col.accessor] === "" ? true : row[col.accessor] === filters[col.accessor]
//         )
//       );
//   }, [search, filters, data, columns]);

 
//   const sortedData = useMemo(() => {
//     if (!sortConfig) return filteredData;
//     return [...filteredData].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//       if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, sortConfig]);

  
//   const totalPages = Math.ceil(sortedData.length / rowsPerPage);
//   const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   const handleSort = key => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev?.direction === "asc" ? "desc" : "asc"
//     }));
//   };

  
//   const toggleRow = id => {
//     setSelectedRows(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
//   };

//   const toggleAll = () => {
//     if (selectedRows.length === paginatedData.length) setSelectedRows([]);
//     else setSelectedRows(paginatedData.map(r => r.id));
//   };

  
//   const handleEditSave = () => {
//     setData(prev => prev.map(item => (item.id === editRow.id ? { ...editRow } : item)));
//     setEditRow(null);
//   };

  
//   const handleDelete = () => {
//     if (deleteRow) setData(prev => prev.filter(item => item.id !== deleteRow.id));
//     else if (selectedRows.length > 0) setData(prev => prev.filter(item => !selectedRows.includes(item.id)));
//     setDeleteRow(null);
//     setSelectedRows([]);
//   };

  
//   const paginationButtons = [];
//   for (let i = 1; i <= totalPages; i++) paginationButtons.push(i);

  
//   const getFilterOptions = accessor => [...new Set(data.map(row => row[accessor]))];

//   return (
//     <>
//       <div className="table-wrapper">
        
//         <input
//           className="table-search"
//           placeholder="Search..."
//           value={search}
//           onChange={e => { setSearch(e.target.value); setPage(1); }}
//         />

        
//         <div className="filter-row">
//           {columns.map(col => (
//             <select
//               key={col.accessor}
//               value={filters[col.accessor] || ""}
//               onChange={e => setFilters({ ...filters, [col.accessor]: e.target.value })}
//             >
//               <option value="">All {col.label}</option>
//               {getFilterOptions(col.accessor).map(val => (
//                 <option key={val} value={val}>{val}</option>
//               ))}
//             </select>
//           ))}
//         </div>

        
//         {selectedRows.length > 0 && (
//           <button className="btn-delete bulk-delete" onClick={handleDelete}>
//             Delete Selected ({selectedRows.length})
//           </button>
//         )}

        
//         <table className="app-table">
//           <thead>
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
//                   onChange={toggleAll}
//                 />
//               </th>
//               {columns.map(col => (
//                 <th key={col.accessor} onClick={() => handleSort(col.accessor)}>
//                   {col.label} {sortConfig?.key === col.accessor ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
//                 </th>
//               ))}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map(row => (
//               <tr key={row.id}>
//                 <td>
//                   <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRow(row.id)} />
//                 </td>
//                 {columns.map(col => (
//                   <td key={col.accessor}>{row[col.accessor]}</td>
//                 ))}
//                 <td className="action-cell">
//                   <button className="btn-edit" onClick={() => setEditRow({ ...row })}>Edit</button>
//                   <button className="btn-delete" onClick={() => setDeleteRow(row)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

       
//         <div className="pagination">
//           <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
//           {paginationButtons.map(num => (
//             <button key={num} className={num === page ? "active-page" : ""} onClick={() => setPage(num)}>
//               {num}
//             </button>
//           ))}
//           <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
//         </div>
//       </div>

     
//       {editRow && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit Student</h3>
//             {columns.map(col => (
//               <input
//                 key={col.accessor}
//                 value={editRow[col.accessor]}
//                 onChange={e => setEditRow({ ...editRow, [col.accessor]: e.target.value })}
//               />
//             ))}
//             <div className="modal-actions">
//               <button onClick={handleEditSave}>Save</button>
//               <button className="cancel" onClick={() => setEditRow(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

      
//       {(deleteRow || selectedRows.length > 0) && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Confirm Delete</h3>
//             <p>
//               Are you sure you want to delete {deleteRow ? "this record?" : `${selectedRows.length} selected records?`}
//             </p>
//             <div className="modal-actions">
//               <button className="btn-delete" onClick={handleDelete}>Delete</button>
//               <button className="cancel" onClick={() => { setDeleteRow(null); setSelectedRows([]); }}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DataTable;
