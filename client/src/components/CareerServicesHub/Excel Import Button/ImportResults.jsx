import React, { useEffect } from 'react';
import './ImportResults.css'

export default function ImportResults({newStudents}) {

    let headerArray = Object.keys(newStudents[0]); // Extract only the keys from the object, we will use it to contain the headers of the table

    function handleUploadClick(){

        newStudents.map((student) => {

            // Need to add Career STatus to Student
            // Need to add Course Status to Student
            // Need to add MCSP to Student
            // Need to add Career Manager to Student
            // Need to add Milestones to Student

            fetch(`http://localhost:8000/students`, 
                {
                    method:"POST", 
                    body: JSON.stringify(student),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
                }
                )
                .then(response => response.json())   
                .then(data => {
                    // Update Context with response
                })
                .catch(function(error) {
                console.log(error);
                }); 
        })

    }

    return (
    <>
        <div className='import-results-table'>
            <div className='results-student-row'>
                    {headerArray.map((header) => {
                        return(
                            <span className='results-student-cell'>{header}</span>
                        )    
                    })}
                </div>
            {newStudents.map((student) => {
                return(
                    <div className='results-student-row'>
                        <span className='results-student-cell'>{student.First_Name}</span>
                        <span className='results-student-cell'>{student.Last_Name}</span>
                        <span className='results-student-cell'>{student.Clearance}</span>
                    </div>
                )    
            })}
        </div>
        <button className='results-upload-button' onClick={handleUploadClick}> Upload Students </button>
    </>    
  )
}
