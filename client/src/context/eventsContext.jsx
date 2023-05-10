import React, { useState, useEffect, createContext } from "react";

export const EventsContext = createContext();

export function EventsContextProvider ({children}) {
    const [eventsData, setEventsData] = useState(['null']);

    useEffect(() =>{
        fetch('http://localhost:8000/events')
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