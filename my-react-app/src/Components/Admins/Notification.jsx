import React from "react";
import "../../assets/Css/Notification.css"; 

const Notification = ({ notifications, activities }) => {
  return (
    <div className="notify-card">
      <h5 className="notify-title">Notifications</h5>

      {notifications.slice(0, 4).map((item, index) => (
        <div className="notify-item" key={index}>
          <p>{item.text}</p>
          <small>{item.time}</small>
        </div>
      ))}

      <hr className="notify-divider" />

      <h5 className="notify-title">Activities</h5>

      {activities.slice(0, 4).map((item, index) => (
        <div className="notify-item" key={index}>
          <p>{item.action}</p>
          <small>{item.time}</small>
        </div>
      ))}
    </div>
  );
};

export default Notification;
