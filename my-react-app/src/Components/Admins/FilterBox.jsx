import React from "react";

const FilterBox = ({ courseFilter, setCourseFilter, batchFilter, setBatchFilter }) => {
  return (
    <div className="card p-3 shadow-sm" style={{ width: "20rem" }}>
      <h5 className="mb-3">Filter</h5>
      
      <select
        className="form-select mb-3"
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
      >
        <option value="">All Courses</option>
        <option value="UI/UX Development">UI/UX Development</option>
        <option value="Web Development">Web Development</option>
        <option value="Fullstack">Fullstack</option>
      </select>
     
      <select
        className="form-select"
        value={batchFilter}
        onChange={(e) => setBatchFilter(e.target.value)}
      >
        <option value="">All Batches</option>
        <option value="8th">8th</option>
        <option value="9th">9th</option>
        <option value="10th">10th</option>
      </select>
    </div>
  );
};

export default FilterBox;
