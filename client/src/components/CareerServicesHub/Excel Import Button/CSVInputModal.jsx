import React , { useState, useContext, useRef } from 'react';
import './CSVInputModal.css';
import ImportResults from './ImportResults';
import { ManagersContext } from '../../../context/managersContext';

import exportFromJSON from 'export-from-json';

export default function CSVInput({ handleButtonClick }) {

  const initialStudents = [ {
    First: "Bob"
  }]

  // Set all local states needed for this component
  const [file, setFile] = useState();
  const [newStudents, setNewStudents] = useState(initialStudents);
  const [resultsToggle, setResultsToggle] = useState(false);
  const [importManager, setImportManager] = useState(1);
  const [importMCSP, setImportMCSP] = useState(1);

  // We have html inputs in this components, so useRef will allow as to reference and extract their value
  const managerInputRef = useRef();
  const mcspInputRef = useRef()
   
  const fileReader = new FileReader();
  
  // Use managers context to get the latest list of Career Service Managers
  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;

  // When a new .csv is uploaded to the import modal, update local state with latest file
  function handleFileUpload(e){
      setFile(e.target.files[0]);
  }

  // Once Submit button is pressed
  function handleSubmit(e){
      e.preventDefault();

      // Grab current values from input fields to get MCSP and Career Service Manager for the new students
      const newImportManager = managerInputRef.current.value;
      const newImportMCSP = Number(mcspInputRef.current.value);

      setImportManager(newImportManager);
      setImportMCSP(newImportMCSP);

      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvFileToArray(text);
        };
        fileReader.readAsText(file);
      }
  }

  const csvFileToArray = string => {
    var array = string.toString().split(",");
    var data = []
     
        for(const element of array){
            let row = element.toString().split("\n")

            for (const element2 of row)
                data.push(element2)
        }

     var heading = [data[0], data[1], data[2].replaceAll("\r","")] //to extract the column headers (assuming this is a excel file with 3 headers)
     var ans_array = []

        for(var i=heading.length;i<data.length;i+=heading.length){
            var obj = {}
            for(var j=0;j<heading.length;j++){
                if(!data[i+j]){
                    data[i+j]="N/A";
                }
                obj[heading[j].replaceAll(" ","_")] = data[i+j].replaceAll("\r","");
            }
            ans_array.push(obj)
        }
     setNewStudents(ans_array);
     const newResultsToggle = !resultsToggle;
     setResultsToggle(newResultsToggle);
  };

  function excelImportTemplate(){
    const fields = ['student_first', 'student_last', 'sec_clearance'];
    const data = [{student_first :'David', student_last : 'Garcia', sec_clearance : 'TOP SECRET//SCI'}];
    const fileName = `ImportStudentTemplate`;
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({data, fileName, fields: fields, exportType});
  }

  return (
    <>
      <div className='modal-backdrop' onClick={handleButtonClick}>
      </div>  
        <div className = 'import-modal-container'>
          <span className='exit-button' onClick={handleButtonClick}> X </span>
          <div className='import-modal-description-container'>
            <span className='import-modal-description-text'> Please choose a MCSP/Career Service Manager and upload a .csv file with information about the students</span>
            <a className='import-modal-description-text import-csv-template-button' onClick={excelImportTemplate}> Click here for a csv template </a>
          </div>
          <div className='import-button-container'>
            <div className='import-button-container-inputs'>
              <div className='import-button-input-MCSP'>
                <span> MCSP: <input type='number' className='import-input-MCSP' ref={mcspInputRef}/> </span>
              </div>
                <select className='import-input' ref={managerInputRef}>
                  <option>Select a Career Service Manager</option>
                      {managers.map((manager) => {
                        return(
                          <option value={manager.tscm_id} key={manager.tscm_id}>{manager.tscm_first}, {manager.tscm_last} </option>
                        )
                      })}
                </select> 
                <div className='import-file-input-container'>
                  <input type='file' accept=".csv" onChange ={handleFileUpload}/>
                </div>
            </div>              
              <input className='submit-button' type='submit' onClick={(e) => handleSubmit(e)}/>
          </div>
          <div className={resultsToggle ? 'container-on' : 'container-off'}>
              <ImportResults handleButtonClick={handleButtonClick} newStudents={newStudents} importManager={importManager} importMCSP={importMCSP}/>
          </div>
        </div>  
    </>
    
  )
}
