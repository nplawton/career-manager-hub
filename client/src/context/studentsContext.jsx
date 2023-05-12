import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

export function StudentsContextProvider ({children}) {
    const [studentsData, setStudentsData] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await fetch('https://career-services-server.onrender.com/students');
                const students = await response.json();
                const fullStudents = [];

                for (const student of students) {
                    const milestonesResponse = await fetch(`https://career-services-server.onrender.com/students/${student.student_id}/milestones`);
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