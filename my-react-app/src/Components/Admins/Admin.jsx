import React from "react";
import AdminLayout from "../../Components/Layouts/AdminLayout";
import dashcss from "../../assets/Css/Dashcard.module.css";

import Dashcards from "../Admins/Dashcards";
import Linechart from "./Linechart";
import Mostquestion from "./Mostquestion";
import Topstudent from "./Topstudent";
import ScheduleCalendar from "./ScheduleCalendar";

const Admin = () => {
  const notifications = [
    { text: "New student registered", time: "2 min ago" },
    { text: "Exam schedule updated", time: "10 min ago" },
    { text: "New message from user", time: "15 min ago" },
    { text: "Database backup completed", time: "1 hour ago" },
    { text: "New course added", time: "2 hours ago" },
  ];

  const activities = [
    { action: "Course updated", time: "30 min ago" },
    { action: "Admin logged in", time: "1 hour ago" },
    { action: "Student details edited", time: "2 hours ago" },
    { action: "Exam results uploaded", time: "3 hours ago" },
  ];

  const dashcardData = [
    { title: "Total Students", count: 120, icon: "bi bi-people-fill" },
    { title: "Total Courses", count: 8, icon: "bi bi-book-fill" },
    { title: "Upcoming Exams", count: 4, icon: "bi bi-pencil-square" },
    { title: "Notifications", count: 12, icon: "bi bi-bell-fill" },
  ];

  return (
    <AdminLayout notifications={notifications} activities={activities}>
      <h3 className={dashcss.dashhead}>Dashboard</h3>

      <div className="row g-3 mt-2">
        {dashcardData.map((item, index) => (
          <div key={index} className="col-6 col-md-3">
            <Dashcards {...item} />
          </div>
        ))}
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-9">
          <Linechart />
        </div>
        <div className="col-12 col-lg-3">
          <Mostquestion
            data={[
              { subject: "HTML", percent: 70 },
              { subject: "Bootstrap", percent: 55 },
              { subject: "Javascript", percent: 80 },
              { subject: "Photoshop", percent: 45 },
              { subject: "Figma", percent: 60 },
              { subject: "Git", percent: 30 },
            ]}
          />
        </div>
      </div>

      <div className="admin-dashboard-row mt-3">
        <div className="dashboard-card">
          <Topstudent />
        </div>

        {/* <div className="dashboard-card">
          <Piechart />
        </div> */}
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <ScheduleCalendar />
        </div>
      </div>

    </AdminLayout>
  );
};

export default Admin;
