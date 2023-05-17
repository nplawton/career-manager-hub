import React, { useContext, useState } from "react";
import { StudentsContext } from "../../../context/studentsContext";
import "./AddStudentCard.css";
import Add_Student_Modal from "./AddStudentModal";
import AddStudentInfo from "./AddStudentInfo";
import CSVInputRevised from "./CSVInputRevised";
import AddStudentRevised from "./AddStudentRevised";



function AddStudent() {
    const [ addStudent, setAddStudent ] = useState(false);
    const [btnSwitch, setBtnSwitch] = useState(true);

    function handleAddStudentModalToggle() {
      setAddStudent((prevState) => !prevState);
    }

    return (
      <div className="btnWrapper" id="add-card">
        <button onClick={handleAddStudentModalToggle} id="add-card-name">
          &#x271A;
        </button>
        <Add_Student_Modal
          addStudent={addStudent}
          handleAddStudentModalToggle={handleAddStudentModalToggle}
        >
          <button onClick={() => setBtnSwitch(true)}>Bulk Import</button>
          <button onClick={() => setBtnSwitch(false)}>Single Student</button>
          {btnSwitch
            ? <CSVInputRevised />
            : <AddStudentRevised />
          }
        </Add_Student_Modal>
      </div>
    );
}

export default AddStudent;