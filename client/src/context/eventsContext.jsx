import React, { useState, useEffect, createContext } from "react";

export const EventsContext = createContext();

export function EventsContextProvider ({children}) {
    const [eventsData, setEventsData] = useState(['null']);

    useEffect(() =>{
        fetch('https://career-services-server.onrender.com/events')
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