import React, {useContext, useState, useEffect} from 'react';
import { StudentsContext } from '../../context/studentsContext';
import './StudentCard.css'
import StudentModal from './StudentModal';




export default function StudentCard({student}) {
    const [milestoneProgress, setMilestoneProgress] = useState('Un-Satisfactory');
    const [modalToggle, setModalToggle] = useState(false);
    let count = 0;
    let unSatisfactoryFlag = false;

    useEffect(() => {

        student.milestones.forEach((milestone) => {
            if (milestone.progress_stat == 'Un-Satisfactory') {
                unSatisfactoryFlag = true;
                return
            } else if (milestone.progress_stat == 'In-Progress') {
                count = count + 1;
            } 

        });

            if(unSatisfactoryFlag == true) {
            }
            else if (count > 0) {
                setMilestoneProgress('In-Progress')
            } else {
                setMilestoneProgress('Completed')
            } 
    }, []);

    // console.log('student #' + student.student_id + ' total ' + count);

        function handleModalToggle() {
            let newModalToggle = !modalToggle;
            setModalToggle(newModalToggle)
        }

    return(
        <>
            <div onClick={handleModalToggle} className={milestoneProgress == 'Un-Satisfactory'? 'un-satisfactory-card student-card': milestoneProgress == 'In-Progress'? 'in-progress-card student-card' : 'completed-card student-card'}>
                <span className='student-card-name'>{student.student_first} {student.student_last}</span>
                <span className='student-card-cohort'>{student.cohort}</span>
                <span className='student-card-manager'>{student.tscm_first} {student.tscm_last}</span>
                </div>
            <div className={modalToggle ? 'modal-on' : 'modal-off'}>
                <StudentModal handleModalToggle = {handleModalToggle} student = {student}/>
            </div>
        </>

    )
}