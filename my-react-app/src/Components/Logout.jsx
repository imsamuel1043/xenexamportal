import React from "react";
import ReactDOM from "react-dom";
import "../assets/Css/Logout.css";

const Logout = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="logout-overlay">
      <div className="logout-box">
        <h5>Are you sure you want to logout?</h5>

        <div className="logout-buttons ">
          <button className="btn btn-primary " onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Logout;
