import React, {useContext} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import AddStudent from './AddStudentCard';
import StudentCard from './StudentCard';
import './StudentCardList.css'

export default function StudentCardslist ({ currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus, filterStudents }) {
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  //console.log(students);

  const filteredStudents = filterStudents(students, currentCohort, currentClearance, currentStatus, milestoneDocument, currentMilestonStatus);
  
  return (
    <>
        <div className='student-card-container'>
            <AddStudent />
            {filterStudents != null ? filteredStudents.map((student) => {
                {/* console.log(student); */}
            return(
                <div key={student.student_id}>
                    <StudentCard  student={student}/>
                </div>
            )
            }) : "Loading"}
        </div>
    </>
  )
}


