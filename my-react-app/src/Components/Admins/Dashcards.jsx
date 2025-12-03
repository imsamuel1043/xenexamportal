import React from 'react';
import Dashcss from '../../assets/Css/Dashcard.module.css';

const Dashcards = ({ title, count, icon }) => {
  return (
    <div className={`p-3 d-flex justify-content-between align-items-center ${Dashcss.cardBox}`}>
      <div>
        <h3 style={{
          fontSize: "18px",
          color: "#000",
          fontWeight: "900"
        }}>
          {count}
        </h3>
        <h6 className="mb-1" style={{ fontSize: "12px", color: "#555" }}>
          {title}
        </h6>
      </div>

      <div style={{
        width: "50px", height: "50px", borderRadius: "50%", background: "#15007008",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
        <i className={icon} style={{ fontSize: 25, color: "#3956AD" }}></i>
      </div>
    </div>
  );
}

export default Dashcards;
