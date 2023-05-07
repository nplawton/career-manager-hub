import React , { useState } from 'react';
import './CSVInputModal.css';
import ImportResults from './ImportResults';

export default function CSVInput({ handleButtonClick }) {

  const initialStudents = [ {
    First: "Bob"
  }]

  const [file, setFile] = useState();
  const [newStudents, setNewStudents] = useState(initialStudents);
  const [resultsToggle, setResultsToggle] = useState(false);
   
  const fileReader = new FileReader();

  function handleFileUpload(e){
    // console.log(e.target);
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  }

  function handleSubmit(e){
    e.preventDefault();

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

  return (
    <>
      <div className='modal-backdrop'>
        <div className = 'import-modal-container'>
          <span onClick={handleButtonClick}> X </span>
          <h2 className='import-modal-header'> Import Excel File </h2>
          <div className='import-button-container'>
              <input className = 'import-button' type='file' accept=".csv,.xlsx,.xls" onChange ={handleFileUpload}/>
              <input className = 'submit-button' type='submit' onClick={(e) => handleSubmit(e)}/>
          </div>
          <div className={resultsToggle ? 'container-on' : 'container-off'}>
              <ImportResults newStudents={newStudents}/>
          </div>
        </div>        
      </div>  
    </>
    
  )
}
