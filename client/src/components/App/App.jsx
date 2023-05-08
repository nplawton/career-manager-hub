import React from "react";
import "./App.module.css";

import { EventsContextProvider } from '../../context/eventsContext'
import { StudentsContextProvider } from '../../context/studentsContext'
import { ManagersContextProvider } from '../../context/managersContext'

import CareerServicesHub from '../CareerServicesHub/CareerServicesHub'

const App = () => {
 
  return (
    <EventsContextProvider>
      <StudentsContextProvider>
          <ManagersContextProvider>
              <CareerServicesHub />
          </ManagersContextProvider>
        </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;
