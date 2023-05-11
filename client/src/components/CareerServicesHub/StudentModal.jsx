import React, {useContext} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import './StudentModal.css';

export default function StudentModal({handleModalToggle, student}) {
const studentContext = useContext(StudentsContext);
const students = studentContext.studentsData;

const milestoneProgressOptions = ['Un-Satisfactory', 'In-Progress', 'Completed'];
const careerStatusOptions = ['Searching', 'Hired', 'Not Started'];
const courseStatusOptions = ['Student', 'Graduate'];
const clearanceStatusOptions = ['None', 'SECRET', 'TOP SECRET', 'TOP SECRET//SCI'];

    return (
    <>
    <div onClick={handleModalToggle} className='student-backdrop'>
    </div>

    <div className='student-tracker-modal'>
        <div className='student-tracker-modal-name'>
        {student.student_first} {student.student_last}
        </div>
        <div className='student-tracker-modal-mcsp'>
            {student.cohort}
        </div>
        <div className='student-tracker-modal-milestones'>
            {student.milestones.map((milestone)=> {
                return (
                <div className='student-tracker-modal-individual-milestone' key={milestone.mile_id}>
                    <label htmlFor={milestone.mile_name}>{milestone.mile_name}:</label>
                    <select id={milestone.mile_name} name={milestone.mile_name}>
                    <option value={milestone.progress_stat}>{milestone.progress_stat}</option>
                    {milestoneProgressOptions.map((option) =>{
                        if (option != milestone.progress_stat){
                            return (
                                <option value={option}>{option}</option>
                            )
                        }   
                    })}
                    </select>

                </div>)
                
            })}
        </div>

            <div className='student-tracker-modal-career-status'>
                    <label htmlFor='career-status'>Career Status:</label>
                    <select name='Career Status'>
                    <option value={student.career_status}>{student.career_status}</option>
                    {careerStatusOptions.map((option) =>{
                        if (option != student.career_status){
                            return (
                                <option key={option} value={option}>{option}</option>
                            )
                        }   
                    })}
                    </select>

                </div>

                <div className='student-tracker-modal-course-status'>
                    <label htmlFor='course-status'>Course Status:</label>
                    <select name='Course Status'>
                    <option value={student.course_status}>{student.course_status}</option>
                    {courseStatusOptions.map((option) =>{
                        if (option != student.course_status){
                            return (
                                <option key={option} value={option}>{option}</option>
                            )
                        }   
                    })}
                    </select>

                </div>

                <div className='student-tracker-modal-clearance-status'>
                    <label htmlFor='clearance-status'>Clearance Status:</label>
                    <select name='Clearance Status'>
                    <option value={student.sec_clearance}>{student.sec_clearance}</option>
                    {clearanceStatusOptions.map((option) =>{
                        if (option != student.sec_clearance){
                            return (
                                <option key={option} value={option}>{option}</option>
                            )
                        }   
                    })}
                    </select>

                </div>
                <button className='update-student'>Update Student</button>
    </div>
    </>
  )
}





