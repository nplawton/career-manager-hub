import React, {useContext} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import './StudentCard.css'


export default function StudentCard({student}) {

    return(
            <div className='student-card'>
            <span className='student-card-name'>{student.student_first} {student.student_last}</span>
            <span className='student-card-cohort'>{student.cohort}</span>
            <span className='student-card-manager'>{student.tscm_first} {student.tscm_last}</span>
            </div>


    )
}