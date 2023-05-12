import React, { useState, useEffect } from "react";
import "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { EventsContextProvider } from '../../context/eventsContext'
import { StudentsContextProvider } from '../../context/studentsContext'
import { ManagersContextProvider } from '../../context/managersContext'
import CareerServicesHub from '../CareerServicesHub/CareerServicesHub'
import LogInPage from '../logIn/logInPage'

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState("");
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (loggedInfo) {
      document.body.style.background = "linear-gradient(180deg, rgba(21,4,89,1) 22%, rgba(247,130,24,1) 100%)";
    } else {
      document.body.style.background = "linear-gradient(180deg, rgba(21,4,89,1) 22%, rgba(247,130,24,1) 100%)";
    }
  }, [loggedInfo]);

  const handleLogin = (info) => {
    setShowTransition(true);
    setLoggedInfo(info);
  };

  return (
    <Router>
      <EventsContextProvider>
        <StudentsContextProvider>
          <ManagersContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  loggedInfo ? (
                    <CareerServicesHub />
                  ) : (
                    <LogInPage handleLogin={handleLogin} />
                  )
                }
              />
              <Route path="/mainpage" element={<CareerServicesHub />} />
            </Routes>
          </ManagersContextProvider>
        </StudentsContextProvider>
      </EventsContextProvider>
    </Router>
  );
};

export default App;