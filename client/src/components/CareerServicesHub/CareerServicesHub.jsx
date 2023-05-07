import React, {useContext} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';

import StudentCardsList from './StudentCardsList';
import ExcelImportButton from './Excel Import Button/ExcelImportButton'

import './CareerServicesHub.css'

export default function CareerServicesHub() {

    const eventContext = useContext(EventsContext);
    const events = eventContext.eventsData;

    const studentContext = useContext(StudentsContext);
    const students = studentContext.studentsData;

    const managersContext = useContext(ManagersContext);
    const managers = managersContext.managersData;

  return (
    <div className='main-body-container'>
      <StudentCardsList/>
      < ExcelImportButton />
    </div>
  )
}
