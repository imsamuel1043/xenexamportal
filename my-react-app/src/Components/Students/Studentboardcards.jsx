import React from "react";
import '../../assets/Css/Studentboard.css';

const StudentboardCards = () => {
  const statsData = [
    { title: "Member since", value: "62 Days", icon: "bi bi-calendar-check" },
    { title: "Exams completed", value: "06", icon: "bi bi-journal-check" },
    { title: "Fee Pending", value: "12,000", icon: "bi bi-cash-stack" },
    { title: "Notifications", value: "02", icon: "bi bi-bell" }
  ];

  return (
    <div className="cardRow">
      {statsData.map((item, index) => (
        <div className="cardBox" key={index}>
          
          <div className="student-card-content">
            
            <div>
              <h3 className="student-value">{item.value}</h3>
              <h6 className="student-title">{item.title}</h6>
            </div>

            <div className="student-icon-wrapper">
              <i className={item.icon}></i>
            </div>

          </div>

        </div>
      ))}
    </div>
  );
};

export default StudentboardCards;
