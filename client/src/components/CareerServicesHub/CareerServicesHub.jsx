import React, {useContext} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';

export default function CareerServicesHub() {

    const eventContext = useContext(EventsContext);
    const events = eventContext.eventsData;
    console.log(events);

    const studentContext = useContext(StudentsContext);
    const students = studentContext.studentsData;
    console.log(students);

    const managersContext = useContext(ManagersContext);
    const managers = managersContext.managersData;
    console.log(managers);

  return (
    <div>
      
    </div>
  )
}
