import React, {useContext, useState} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';
import StudentCardsList from './StudentCards/StudentCardsList';
import './CareerServicesHub.css'

import Export from './Export';
import './filter.css';
import Filter from './Filter_Com';
import galvanizeLogo from '../logIn/galvanizeLogo.webp';
import SearchBar from './SearchFunction/Search';

export default function CareerServicesHub() {

  //const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCohort, setCurrentCohort] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [currentCoverStatus, setCurrentCoverStatus] = useState('');
  const [studentResume, setStudentResume] = useState('');
  const [currentResumeStatus, setCurrentResumeStatus] = useState('');
  const [linkedAccount, setLinkedAccount] = useState('');
  const [linkedAccountStatus, setLinkedAccountStatus] = useState('');
  const [personalNarrative, setPersonalNarrative] = useState('');
  const [narrativeStatus, setNarrativeStatus] = useState('');
  const [hunterAccess, setHunterAccess] = useState('');
  const [currentAccess, setCurrentAccess] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentClearance, setCurrentClearance] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [selectedManager, setSelectedManager] = useState('');

  const eventContext = useContext(EventsContext);
  const events = eventContext.eventsData;
  console.log('events', events);

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log('students', students);

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  console.log('managers', managers);

  

  // Filter the list of students based on the current filter
  const filterStudents = (students, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus, linkedAccount, linkedAccountStatus, personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance, educationStatus, selectedManager) => {
    if(!students){
        return [];
    }

    let filteredStudent = students;

    if (currentCohort) {
      filteredStudent = filteredStudent.filter(student => student.cohort === currentCohort);
    }

    if (currentClearance){
      filteredStudent = filteredStudent.filter(student => student.sec_clearance === currentClearance);
    }

    if (currentStatus){
      filteredStudent = filteredStudent.filter(student => student.course_status === currentStatus);
      
    }

    if (educationStatus){
      filteredStudent = filteredStudent.filter(student => student.college_degree === educationStatus);
    }

    if(selectedManager){
      filteredStudent =filteredStudent.filter(student => student.tscm_first === selectedManager)
      console.log('Current Manager', selectedManager);
    }
    
    if (coverLetter  && currentCoverStatus) {
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === coverLetter && milestone.progress_stat === currentCoverStatus;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
      console.log(filteredStudent);
    }

    if (studentResume && currentResumeStatus){
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === studentResume && milestone.progress_stat === currentResumeStatus;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
      console.log(filteredStudent);
    }

    if(linkedAccount && linkedAccountStatus){
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === linkedAccount && milestone.progress_stat === linkedAccountStatus;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
      console.log(filteredStudent);
    }

    if(personalNarrative && narrativeStatus){
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === personalNarrative && milestone.progress_stat === narrativeStatus;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
      console.log(filteredStudent);
    }

    if(hunterAccess && currentAccess){
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === hunterAccess && milestone.progress_stat === currentAccess;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
      console.log(filteredStudent);
    }

    if (searchTerm) {
      setSearchTerm(searchTerm.toLowerCase());
      filteredStudent = filteredStudent.filter(student =>
          student.student_first.toLowerCase().includes(searchTerm) ||
          student.student_last.toLowerCase().includes(searchTerm)
      );
    }

    return filteredStudent;

  };

  const handleClear = () => {
    setSearchTerm('');
    const searchBar = document.getElementsByClassName('student-search-bar')[0];
    if (searchBar) {
      searchBar.value = '';
    }
    setCurrentCohort('');
    setCurrentCoverStatus('');
    setCoverLetter('');
    setCurrentResumeStatus('');
    setStudentResume('');
    setLinkedAccountStatus('');
    setLinkedAccount('');
    setNarrativeStatus('');
    setPersonalNarrative('');
    setCurrentAccess('');
    setHunterAccess('');
    setCurrentStatus('');
    setCurrentClearance('');
    setEducationStatus('');
    setSelectedManager('');
    const selectElement = document.getElementById('manager-select');
    selectElement.value = 'Career Service Manager';
  }

  return (
    <div className='body_container'>      
      <div className='left_container'>
        <img src={galvanizeLogo} ></img>
        <Filter 
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          currentCohort={currentCohort}
          setCurrentCohort={setCurrentCohort}
          setCoverLetter={setCoverLetter}
          setCurrentCoverStatus={setCurrentCoverStatus}
          currentCoverStatus={currentCoverStatus}
          setStudentResume={setStudentResume}
          setCurrentResumeStatus={setCurrentResumeStatus}
          currentResumeStatus={currentResumeStatus}
          setLinkedAccount={setLinkedAccount}
          linkedAccountStatus={linkedAccountStatus}
          setLinkedAccountStatus={setLinkedAccountStatus}
          setPersonalNarrative={setPersonalNarrative}
          setNarrativeStatus={setNarrativeStatus}
          narrativeStatus={narrativeStatus}
          setHunterAccess={setHunterAccess}
          currentAccess={currentAccess}
          setCurrentAccess={setCurrentAccess}
          currentStatus={currentStatus}
          setCurrentStatus={setCurrentStatus}
          currentClearance={currentClearance}
          setCurrentClearance={setCurrentClearance}          
          educationStatus={educationStatus}
          setEducationStatus={setEducationStatus}
          selectedManager={selectedManager}
          setSelectedManager={setSelectedManager}
        />
        <Export 
          filterStudents={filterStudents}
          currentCohort={currentCohort}
          coverLetter={coverLetter}
          currentCoverStatus={currentCoverStatus}
          studentResume={studentResume}
          currentResumeStatus={currentResumeStatus}
          linkedAccount={linkedAccount}
          linkedAccountStatus={linkedAccountStatus}
          personalNarrative={personalNarrative}
          narrativeStatus={narrativeStatus}
          hunterAccess={hunterAccess}
          currentAccess={currentAccess}
          currentStatus={currentStatus}
          currentClearance={currentClearance}
          educationStatus={educationStatus}
          selectedManager={selectedManager}
        />
        <button
          onClick={handleClear}
          className='header-buttons'
        >
          Clear Filter
        </button>
      </div>
      <div className='right_container'>
        <StudentCardsList
          filterStudents={filterStudents}
          currentCohort={currentCohort}
          coverLetter={coverLetter}
          currentCoverStatus={currentCoverStatus}
          studentResume={studentResume}
          currentResumeStatus={currentResumeStatus}
          linkedAccount={linkedAccount}
          linkedAccountStatus={linkedAccountStatus}
          personalNarrative={personalNarrative}
          narrativeStatus={narrativeStatus}
          hunterAccess={hunterAccess}
          currentAccess={currentAccess}
          currentStatus={currentStatus}
          currentClearance={currentClearance}
          educationStatus={educationStatus}
          selectedManager={selectedManager}
        />
      </div>
    </div>
  )
}