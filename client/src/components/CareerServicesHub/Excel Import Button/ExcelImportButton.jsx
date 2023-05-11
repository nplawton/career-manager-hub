import React, {useState} from 'react'
import CSVInputModal from './CSVInputModal'
import './ExcelImportButton.css'

export default function ExcelImportButton() {

    const [toggleImport, SetToggleImport] = useState(false);

    function handleButtonClick(){
        const newToggleImport = !toggleImport;
        SetToggleImport(newToggleImport)
    }

  return (
    <>
        <button className = 'import-excel-button header-buttons' onClick={handleButtonClick}> Import Excel .csv </button>
        <div className={toggleImport ? 'modal-on' : 'modal-off'}>
                <CSVInputModal handleButtonClick={handleButtonClick}/>
        </div>
    </>
  )
}
