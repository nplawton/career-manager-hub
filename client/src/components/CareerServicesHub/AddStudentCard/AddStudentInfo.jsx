import React, { useContext, useState, useRef } from "react";
import "./AddStudentCard.css";
import { ManagersContext } from "../../../context/managersContext";
import { StudentsContext } from "../../../context/studentsContext";

function AddStudentInfo({ setAddStudent }) {
  const [currentClearance, setCurrentClearance] = useState("");
  const [currentEducation, setCurrentEducation] = useState("");
  const [newStudent, setNewStudent] = useState({
    cohort: "",
    tscm_id: 0,
    student_first: "",
    student_last: "",
    college_degree: "",
    sec_clearance: "",
  });
  const managersContext = useContext(ManagersContext);
  const managerInputRef = useRef();
  const mcspInputRef = useRef();
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const managers = managersContext.managersData;
  const secClearance = ["None", "SECRET", "TOP SECRET", "TOP SECRET//SCI"];
  const addEducation = [
    "None",
    "Associate's in CS/STEM",
    "Associate's Not in CS/STEM",
    "Bachelor's in CS/STEM",
    "Bachelor's Not in CS/STEM",
    "Masters in CS/STEM",
    "Masters Not in CS/STEM",
  ];

  const handleFirstNameChange = (event) => {
    setNewStudent({ ...newStudent, student_first: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setNewStudent({
      ...newStudent,
      student_last: event.target.value,
    });
  };

  const handleManagerChange = (event) => {
    const selectedManager = event.target.value;
    setNewStudent({ ...newStudent, tscm_id: selectedManager });
    console.log(selectedManager);
  };

  const handleEducationChange = (event) => {
    setNewStudent({ ...newStudent, college_degree: currentEducation });
    console.log("log education", currentEducation);
  };

  const handleClearanceChange = (event) => {
    setNewStudent({ ...newStudent, clearance: currentClearance });
    console.log(currentClearance);
  };

  const handleMCSPChange = (event) => {
    const selectedCohort = event.target.value;
    setNewStudent({ ...newStudent, cohort: selectedCohort });
  };

  const addNewStudent = () => {
    const newStudentObj = {
      cohort: mcspInputRef.current.value,
      tscm_id: managerInputRef.current.value,
      student_first: newStudent.student_first,
      student_last: newStudent.student_last,
      college_degree: newStudent.college_degree,
      sec_clearance: newStudent.sec_clearance,
    };
    try {
      const response = fetch("https://career-services-server.onrender.com/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentObj),
      });
    const addedStudent = (response) => response.json();
    return addedStudent;
    } catch (error) {
    console.log(error);
    } finally {
    setAddStudent(false);
    }
  };

  return (
    <div className="add-container">
      <div className="add-subcontainer">
        <h1 id="add-text">Select MCSP</h1>
        <span>
          {" "}
          MCSP:{" "}
          <input
            type="number"
            className="import-input-MCSP"
            ref={mcspInputRef}
            onChange={handleMCSPChange}
          />{" "}
        </span>
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Managers</h1>
        <select
          className="import-input"
          ref={managerInputRef}
          onChange={handleManagerChange}
        >
          <option>Select a Career Service Manager</option>
          {managers.map((manager) => {
            return (
              <option value={manager.tscm_id}>
                {manager.tscm_first}, {manager.tscm_last}{" "}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Enter First Name:</h1>
        <input
          type="text"
          placeholder="first name"
          value={newStudent.student_first}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Enter Last Name:</h1>
        <input
          type="text"
          placeholder="last name"
          value={newStudent.student_last}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Education:</h1>
        <select
          value={newStudent.addEducation}
          onChange={handleEducationChange}
        >
          <option>Select Education</option>
          {addEducation.map((education, index) => {
            return (
              <option key={index} value={education}>
                {education}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Security Clearance:</h1>
        <select
          value={newStudent.secClearance}
          onChange={handleClearanceChange}
        >
          <option value="">Select a Security Clearance</option>
          {secClearance.map((security, index) => {
            return (
              <option key={index} value={security}>
                {security}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={addNewStudent}>Add New Student</button>
    </div>
  );
}

export default AddStudentInfo;
