import React from "react";
import Studentsidebar from "../Students/Studentsidebar";
import "../../assets/Css/Studentcss/StudentLayout.css";

const StudentLayout = ({ children }) => {
  return (
    <div className="student-layout">
      
    
      <Studentsidebar />

      
      <div className="student-layout-content">
        <div className="student-layout-page">
          {children}   
        </div>
      </div>

    </div>
  );
};

export default StudentLayout;
