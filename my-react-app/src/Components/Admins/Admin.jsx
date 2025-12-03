import React from "react";
import AdminLayout from "../../Components/Layouts/AdminLayout";
import dashcss from "../../assets/Css/Dashcard.module.css";

import Dashcards from "../Admins/Dashcards";
import Linechart from "./Linechart";
import Mostquestion from "./Mostquestion";
import Topstudent from "./Topstudent";
import Piechart from "./Piechart";
import ScheduleCalendar from "./ScheduleCalendar";

const Admin = () => {
  const notifications = [
    { text: "New student registered", time: "2 min ago" },
    { text: "Exam schedule updated", time: "10 min ago" },
    { text: "New message from user", time: "15 min ago" },
    { text: "Database backup completed", time: "1 hour ago" },
    { text: "New course added", time: "2 hours ago" }
  ];

  const activities = [
    { action: "Course updated", time: "30 min ago" },
    { action: "Admin logged in", time: "1 hour ago" },
    { action: "Student details edited", time: "2 hours ago" },
    { action: "Exam results uploaded", time: "3 hours ago" }
  ];

  const dashcardData = [
    { title: "Total Students", count: 120, icon: "bi bi-people-fill" },
    { title: "Total Courses", count: 8, icon: "bi bi-book-fill" },
    { title: "Upcoming Exams", count: 4, icon: "bi bi-pencil-square" },
    { title: "Notifications", count: 12, icon: "bi bi-bell-fill" }
  ];

  return (
    <AdminLayout notifications={notifications} activities={activities}>
      
      <h3 className={dashcss.dashhead}>Dashboard</h3>

      <div className="d-flex justify-content-between mt-4">
        <div style={{ width: "100%" }}>
          
          
          <div className={dashcss.cardRow}>
            {dashcardData.map((item, index) => (
              <Dashcards
                key={index}
                title={item.title}
                count={item.count}
                icon={item.icon}
              />
            ))}
          </div>

          
          <div className="mt-3">
            <Linechart />
            <Mostquestion
              data={[
                { subject: "HTML", percent: 70 },
                { subject: "Bootstrap", percent: 55 },
                { subject: "Javascript", percent: 80 },
                { subject: "Photoshop", percent: 45 },
                { subject: "Figma", percent: 60 },
                { subject: "Git", percent: 30 }
              ]}
            />
          </div>

          <div className="d-flex gap-3 align-items-start mt-3">
            <Topstudent />
            <div style={{ width: "25%", padding: "10px" }}>
              <Piechart />
            </div>
          </div>

          
          <div className="mt-4">
            <ScheduleCalendar />
          </div>

        </div>
      </div>

    </AdminLayout>
  );
};

export default Admin;
