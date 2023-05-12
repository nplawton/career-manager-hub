import React from "react";
import ReactDOM from "react-dom";

import "./AddStudentCard.css";

function Add_Student_Modal({ children, addStudent, handleAddStudentModalToggle }) {

    if (!addStudent) return null;
    return ReactDOM.createPortal(
      <>
        <div className="add-modal-overlay-container">
            <div
              className="filt_overlay"
              onClick={handleAddStudentModalToggle}
              />
            <div className="add_modal">
            <button id="closeBtn" onClick={handleAddStudentModalToggle}>
              X
            </button>
            {children}
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
}

export default Add_Student_Modal;
