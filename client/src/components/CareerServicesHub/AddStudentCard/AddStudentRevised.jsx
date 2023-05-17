import React, { useContext, useState, useRef } from "react";
import "./AddStudentCard.css";
import { ManagersContext } from "../../../context/managersContext";
import { StudentsContext } from "../../../context/studentsContext";

function AddStudentRevised({ setAddStudent }) {

  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';

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

  const firstStudent = students[0];
  const milestoneFields = firstStudent.milestones.map((milestone) => milestone.mile_name);
  const milestoneArray = milestoneFields.map((milestone) => milestone);
  console.log(milestoneFields);
  

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
    const currentEducation = event.target.value;
    setNewStudent({ ...newStudent, college_degree: currentEducation });
    console.log("log education", currentEducation);
  };

  const handleClearanceChange = (event) => {
    const currentClearance = event.target.value;
    setNewStudent({ ...newStudent, sec_clearance: currentClearance });
    console.log('current clearance', currentClearance);
  };

  const handleMCSPChange = (event) => {
    const selectedCohort = event.target.value;
    setNewStudent({ ...newStudent, cohort: selectedCohort });
  };

  const addNewStudent = async () => {
    const newStudentObj = {
      course_status: "Student",
      career_status: "Not Started",
      cohort: "MCSP-" + mcspInputRef.current.value,
      tscm_id: managerInputRef.current.value,
      student_first: newStudent.student_first,
      student_last: newStudent.student_last,
      college_degree: newStudent.college_degree,
      sec_clearance: newStudent.sec_clearance,
    };
    console.log('new student object:', newStudentObj);
    try {
      const response = await fetch(`${url}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentObj),
      });

      const addedStudent = await response.json();

      //Adding Milestones to Student
      milestoneArray.forEach((milestone_name) => {
        const newMilestone = {
          mile_name: milestone_name,
          progress_stat: "In-Progress",
        };

        fetch(`${url}/students/${addedStudent.student_id}/milestones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMilestone),
        });
      });
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
          value={newStudent.college_degree}
          onChange={handleEducationChange}
        >
          <option>Select Education</option>
          {addEducation.map((education, index) => {
            return (
              <option 
                key={index} 
                value={education}
              >
                {education}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Security Clearance:</h1>
        <select
          value={newStudent.sec_clearance}
          onChange={handleClearanceChange}
        >
          <option value="">Select a Security Clearance</option>
          {secClearance.map((security, index) => {
            return (
              <option 
                key={index} 
                value={security}
              >
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

export default AddStudentRevised;