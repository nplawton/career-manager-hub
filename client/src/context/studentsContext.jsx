import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

export function StudentsContextProvider ({children}) {
    const [studentsData, setStudentsData] = useState(null);
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