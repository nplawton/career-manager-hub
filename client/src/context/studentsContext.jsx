import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

export function StudentsContextProvider ({children}) {
    const [studentsData, setStudentsData] = useState([{
        student_first : "Test",
        student_id : 1,
        student_last : "Test",
        career_status : "Searching",
        cohort : "MCSP-18",
        college_degree : "Associate Not in CS/STEM",
        course_status : "Graduate",
        sec_clearance : "Undetermined",        
        milestones : [
            {
                mile_id :  1,
                mile_name : "Cover Letter",
                progress_stat : "Un-Satisfactory",
                student_id : 1
            },
            {
                mile_id :  2,
                mile_name : "Resume",
                progress_stat : "Un-Satisfactory",
                student_id : 1
            },
            {
                mile_id :  3,
                mile_name : "LinkedIn",
                progress_stat : "Completed",
                student_id : 1
            },
            {
                mile_id :  4,
                mile_name : "Personal Narrative",
                progress_stat : "Un-Satisfactory",
                student_id : 1
            },
            {
                mile_id :  5,
                mile_name : "Huntr Access",
                progress_stat : "Un-Satisfactory",
                student_id : 1
            }            
        ],
        tscm_first : "Cade",
        tscm_id : 6,
        tscm_last : "Nienow"
    }]);
    
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/students`);
                const students = await response.json();
                const fullStudents = [];

                for (const student of students) {
                    const milestonesResponse = await fetch(`${url}/students/${student.student_id}/milestones`);
                    const milestones = await milestonesResponse.json();
                    student.milestones = milestones;
                    fullStudents.push(student);
                }

                setStudentsData(fullStudents);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    return(
        <StudentsContext.Provider value={{studentsData}}>
            {children}
        </StudentsContext.Provider>
    );
}