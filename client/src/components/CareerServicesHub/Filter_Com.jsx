import React, { useContext, useEffect, useRef } from 'react';

import './filter.css';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from "../../context/managersContext";
import SearchBar from './SearchFunction/Search';


function Filter({ searchTerm, setSearchTerm, currentCohort, setCurrentCohort, setCoverLetter, setCurrentCoverStatus, currentCoverStatus, setStudentResume, currentResumeStatus, setCurrentResumeStatus,setLinkedAccount, linkedAccountStatus, setLinkedAccountStatus, setPersonalNarrative, narrativeStatus, setNarrativeStatus, setHunterAccess, currentAccess, setCurrentAccess, currentStatus, setCurrentStatus, currentClearance, setCurrentClearance, educationStatus, setEducationStatus, setSelectedManager, setSelectedManagerFull }) {
  
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  
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
    const selectedManagerId = parseInt(e.target.value)
    // console.log('Selected manager ID:', selectedManagerId);
    // console.log('Managers:', managers);

    const selectManager = managers.find(manager => manager.tscm_id === selectedManagerId);
    // console.log('Selected manager first name:', selectManager.tscm_first);
    // console.log('Selected manager last name:', selectManager.tscm_last);
    

    if (selectManager) {
      setSelectedManager(selectManager.tscm_first);
    }

  }

  return (
    <div id='filt_container' >
      <SearchBar 
        onSearch={handleSearch} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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
          <option value=''>Any Status</option>
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
          <option value=''>Any Status</option>
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
          <option value=''>Any Status</option>
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
          <option value=''>Any Status</option>
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
          <option value=''>Any Status</option>
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
          onChange={handleManagerChange}
          id='manager-select'
        >
          <option>Career Service Manager</option>
          {managers.map((manager) => {
            return (
              <option key={managers.tscm_id} value={manager.tscm_id}>
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