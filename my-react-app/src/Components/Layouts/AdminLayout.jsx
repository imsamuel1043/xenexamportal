import React from "react";
import Adminsidebar from "../Admins/Adminsidebar";
import Notification from "../Admins/Notification";
import dashcss from "../../assets/Css/Dashcard.module.css";


const AdminLayout = ({ children, notifications, activities }) => {

  


  return (
    <section className="d-flex" style={{backgroundColor:"#f4f4f481"}}>
     
      <div className={dashcss.sidebarWrapper}>
        <Adminsidebar />
      </div>

      
      <div className={dashcss.mainContent}>
        <div className="container-fluid p-3">
          {children}
        </div>
      </div>

      
      {/* <div className={dashcss.notificationWrapper}>
        <Notification
          notifications={notifications}
          activities={activities}
        />
      </div> */}
      
    </section>
  );
};

export default AdminLayout;
