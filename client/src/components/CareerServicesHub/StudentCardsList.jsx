import React, {useContext} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import StudentCard from './StudentCard';
import './StudentCardList.css'


export default function StudentCardslist () {
const studentContext = useContext(StudentsContext);
const students = studentContext.studentsData;
console.log(students);


    
    return (
        <>
<div className='student-card-container'>
    {students != null ? students.map((student) => {
        console.log(student);
    return(
        <div key={student.student_id}>
            <StudentCard  student= {student}/>
        </div>
    )
    }) : "Loading"}
</div>
</>
    )
}

