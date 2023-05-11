import React, {useContext, useState} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';
import StudentCardsList from './StudentCardsList';
import './CareerServicesHub.css'

import ExcelImportButton from './Excel Import Button/ExcelImportButton'
import Export from './Export';
import './filter.css';
import Filter_Modal from './Filter_Modal';
import Filter from './Filter_Com';
import SearchBar from './SearchFunction/Search';
import galvanizeLogo from '../logIn/galvanizeLogo.webp';

export default function CareerServicesHub() {

  const [currentCohort, setCurrentCohort] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentClearance, setCurrentClearance] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentMilestonStatus, setCurrentMilestonStatus] = useState('');
  const [milestoneDocument, setMilestoneDocument] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const eventContext = useContext(EventsContext);
  const events = eventContext.eventsData;
  console.log('events', events);

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log('students', students);

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  console.log('managers', managers);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
};

  // Filter the list of students based on the current cohort or clearance level
  const filterStudents = (students, currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus) => {
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
    
    if (milestoneDocument && currentMilestonStatus) {
      filteredStudent = filteredStudent.flatMap(student => {
        return student.milestones.filter(milestone => {
          return milestone.mile_name === milestoneDocument && milestone.progress_stat === currentMilestonStatus;
        }).map(milestone => ({
          ...student,
          mile_name: milestone.mile_name,
          progress_stat: milestone.progress_stat,
        }));
      });
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

  return (
    <div>      
      <img src={galvanizeLogo} ></img>
      <div className='filt-wrapper'>
        < ExcelImportButton />
        <Export 
          currentCohort={currentCohort}
          currentClearance={currentClearance}
          currentStatus={currentStatus}
          milestoneDocument={milestoneDocument}
          currentMilestonStatus={currentMilestonStatus}
          filterStudents={filterStudents}
        />
        <button 
          id='filterBtn'
          onClick={() => setFilterOpen(true)}
          className='header-buttons'
        >
          Filter
        </button>
        <Filter_Modal
            filterOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            filterStudents={filterStudents}
          >
            <Filter 
              currentCohort={currentCohort}
              setCurrentCohort={setCurrentCohort}
              currentClearance={currentClearance}
              setCurrentClearance={setCurrentClearance}
              currentStatus={currentStatus}
              setCurrentStatus={setCurrentStatus}
              currentMilestonStatus={currentMilestonStatus}
              setCurrentMilestonStatus={setCurrentMilestonStatus}
              milestoneDocument={milestoneDocument}
              setMilestoneDocument={setMilestoneDocument}
              educationStatus={educationStatus}
              setEducationStatus={setEducationStatus}
            />
          </Filter_Modal>
        <SearchBar onSearch={handleSearch} />
      </div>
      <StudentCardsList
        currentCohort={currentCohort}
        currentClearance={currentClearance}
        currentStatus={currentStatus}
        milestoneDocument={milestoneDocument}
        currentMilestonStatus={currentMilestonStatus}
        filterStudents={filterStudents}
      />
    </div>
  )
}