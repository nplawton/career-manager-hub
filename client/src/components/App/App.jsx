import React from "react";
import "./App.module.css";
import LoginInPage from "../logIn/logInPage.jsx";

import { EventsContextProvider } from '../../context/eventsContext'
import { StudentsContextProvider } from '../../context/studentsContext'
import { ManagersContextProvider } from '../../context/managersContext'

import CareerServicesHub from '../CareerServicesHub/CareerServicesHub'

const App = () => {
 
  return (
    <EventsContextProvider>
      <StudentsContextProvider>
          <ManagersContextProvider>
            <LoginInPage />
              <CareerServicesHub />
          </ManagersContextProvider>
        </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;
