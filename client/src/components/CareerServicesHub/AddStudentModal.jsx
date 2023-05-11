import React from "react";
import ReactDOM from "react-dom";

import "./AddStudentCard.css";

function Add_Student_Modal({ children, addStudent, onClose }) {

    if (!addStudent) return null;
    return ReactDOM.createPortal(
      <>
        <div className="filt_overlay" onClick={onClose} />
        <div className="add_modal">
          <button id="closeBtn" onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </>,
      document.getElementById("portal")
    );
}

export default Add_Student_Modal;
