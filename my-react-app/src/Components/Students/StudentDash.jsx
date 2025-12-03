import React from "react";
import StudentboardCards from "./Studentboardcards";
import MonthlyChart from "./MonthlyChart";
import ImprovementChart from "./Improvementchart";
import TopStudents from "./TheTops";  
import Studentsidebar from "../Students/Studentsidebar";
import '../../assets/Css/Studentdash.css'



const statsData = [
  { title: "Member since", value: "62 Days", percentage: 11.01 },
  { title: "Exams completed", value: "06", percentage: -0.03 },
  { title: "Fee Pending", value: "12,000", percentage: 6.08 },
  { title: "Notifications", value: "02", percentage: 15.03 }
];

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-layout">

      <Studentsidebar />

      <div className="student-dashboard-content">

        <StudentboardCards data={statsData} />

        <div className="dashboard-graphs">
          <MonthlyChart />
          <ImprovementChart />
        </div>

        <TopStudents />

      </div>
    </div>
  );
};

export default StudentDashboard;
