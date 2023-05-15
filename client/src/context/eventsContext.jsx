import React, { useState, useEffect, createContext } from "react";

export const EventsContext = createContext();

export function EventsContextProvider ({children}) {
    const [eventsData, setEventsData] = useState(['null']);
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';

    useEffect(() =>{
        fetch(`${url}/events`)
            .then(response => response.json())
            .then(data => setEventsData(data))
            .catch(error => console.log(error))
    }, []);

    return(
        <EventsContext.Provider value={{eventsData}}>
            {children}
        </EventsContext.Provider>
    );
}