import React, { useContext, useState } from "react";
import { StudentsContext } from "../../../context/studentsContext";
import "./AddStudentCard.css";
import Add_Student_Modal from "./AddStudentModal";
import AddStudentInfo from "./AddStudentInfo";


function AddStudent() {
    const [ addStudent, setAddStudent ] = useState(false)


    function handleAddStudentModalToggle() {
      const newAddStudent = !addStudent;
      setAddStudent(newAddStudent);
    }
  
      // return (
      //   <div className="btnWrapper" id="add-card">
      //     <button onClick={() => setAddStudent(true)} id="add-card-name">
      //       &#x271A;
      //     </button>
      //     <Add_Student_Modal
      //       addStudent={addStudent}
      //       onClose={() => setAddStudent(false)}
      //     >
      //       <AddStudentInfo setAddStudent={setAddStudent} />
      //     </Add_Student_Modal>
      //   </div>
      // );

    return (
      <div className="btnWrapper" id="add-card">
        <button onClick={handleAddStudentModalToggle} id="add-card-name">
          &#x271A;
        </button>
        <Add_Student_Modal
          addStudent={addStudent}
          handleAddStudentModalToggle={handleAddStudentModalToggle}>
          <AddStudentInfo setAddStudent={setAddStudent} />
        </Add_Student_Modal>
      </div>
    );
}

export default AddStudent;