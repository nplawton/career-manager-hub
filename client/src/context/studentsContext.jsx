import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

export function StudentsContextProvider ({children}) {
    const [studentsData, setStudentsData] = useState(['null']);
    const fullStudent = [];

    useEffect(() =>{
        fetch('http://localhost:8000/students')
            .then(response => response.json())
            .then(data => {
                data.forEach(student => {
                    fetch(`http://localhost:8000/students/${student.student_id}/milestones`)
                    .then(response => response.json())
                    .then(data => {
                        student.milestones = data;
                        fullStudent.push(student);
                    })
                    .catch(error => console.log(error))
                })
                setStudentsData(fullStudent)
            })
            .catch(error => console.log(error))
    }, []);

    return(
        <StudentsContext.Provider value={{studentsData}}>
            {children}
        </StudentsContext.Provider>
    );
}