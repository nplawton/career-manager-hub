import React, { useContext, useRef } from 'react';

import './filter.css';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';


function Filter({ currentCohort, setCurrentCohort, setCoverLetter, setCurrentCoverStatus, currentCoverStatus, setStudentResume, currentResumeStatus, setCurrentResumeStatus,setLinkedAccount, linkedAccountStatus, setLinkedAccountStatus, setPersonalNarrative, narrativeStatus, setNarrativeStatus, setHunterAccess, currentAccess, setCurrentAccess, currentStatus, setCurrentStatus, currentClearance, setCurrentClearance, educationStatus, setEducationStatus, currentFirstManager, setCurrentFirstManager, currentLastManager, setCurrentLastManager }) {
  
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  const managerInputRef = useRef();
  
  const cohorts = ['MCSP-16', 'MCSP-17', 'MCSP-18', 'MCSP-19', 'MCSP-20', 'MCSP-21', 'MCSP-22'];
  const secClearance = ['None', 'SECRET', 'TOP SECRET', 'TOP SECRET//SCI'];
  const courseStatus = ['Student', 'Graduate'];
  const progress_stat = ['In-Progress', 'Completed', 'Un-Satisfactory'];
  const ed_status = ['Undetermined', 'None', 'Associate in CS/STEM', 'Associate Not in CS/STEM', 'Bachelor in CS/STEM', 'Bachelor Not in CS/STEM', 'Masters in CS/STEM', 'Masters Not in CS/STEM'];

  const handleCheckedCover = (e) => {
    setCurrentCoverStatus(e.target.value);
    setCoverLetter('Cover Letter');
  }

  const handleCheckedResume = (e) => {
    setCurrentResumeStatus(e.target.value);
    setStudentResume ('Resume');
  }

  const handleLinkedAccount = (e) => {
    setLinkedAccountStatus(e.target.value);
    setLinkedAccount('LinkedIn');
  }

  const handleNarrativeStatus = (e) => {
    setNarrativeStatus(e.target.value);
    setPersonalNarrative('Personal Narrative');
  }

  const handleHunterAccess = (e) => {
    setCurrentAccess(e.target.value);
    setHunterAccess('Hunter Access');
  }

  const handleManagerChange = (e) => {
    const selectedManager = e.target.value;
    setCurrentFirstManager(managers[selectedManager - 1].tscm_first);
    setCurrentLastManager(managers[selectedManager - 1].tscm_last);
    console.log(careerManager);
  }

  return (
    <div id='filt_container' >
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Select a MCSP</h1>
          <select
            value={currentCohort}
            onChange={(e) => setCurrentCohort(e.target.value)}
          >
            <option value=''>Select a MCSP</option>
            {
              cohorts.map((cohort, index) => {
                return(
                  <option
                    key={index}
                    value={cohort}
                  >
                    {cohort}
                  </option>
                )
              })
            }
          </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Cover Letter</h1>
        <select
          value={currentCoverStatus}
          onChange={handleCheckedCover}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Resume</h1>
        <select
          value={currentResumeStatus}
          onChange={handleCheckedResume}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >LinkedIn Account</h1>
        <select
          value={linkedAccountStatus}
          onChange={handleLinkedAccount}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Personal Narrative</h1>
        <select
          value={narrativeStatus}
          onChange={handleNarrativeStatus}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Hunter Account</h1>
        <select
          value={currentAccess}
          onChange={handleHunterAccess}
        >
          <option value=''>Document Status</option>
          {
            progress_stat.map((docStatus, index) => {
              return (
                <option
                  key={index}
                  value={docStatus}
                >
                  {docStatus}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Current Course Standing</h1>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          <option value=''>Student/Graduate</option>
          {
            courseStatus.map((schoolStat, index) => {
              return (
                <option
                  value={schoolStat}
                  key={index}
                >
                  {schoolStat}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Security Clearance</h1>
        <select
          value={currentClearance}
          onChange={(e) => setCurrentClearance(e.target.value)}
        >
          <option value=''>Select a Security Clearance</option>
          {
            secClearance.map((security, index) => {
              return (
                <option
                  key={index}
                  value={security}
                >
                  {security}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Education Background</h1>
        <select
          value={educationStatus}
          onChange={(e) => setEducationStatus(e.target.value)}
        >
          <option value=''>Level of Education</option>
          {
            ed_status.map((education, index) => {
              return (
                <option
                  key={index}
                  value={education}
                >
                  {education}
                </option>
              )
            })
          }
        </select>
      </div>
      <div id='filt_subcontainer' >
        <h1 id='filt_title' >Service Career Manager</h1>
        <select
          ref={managerInputRef}
          onChange={(e) => handleManagerChange(e)}
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
    </div>
  )
}

export default Filter;