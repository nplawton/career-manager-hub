import React, { useState, useEffect, createContext } from "react";

export const EventsContext = createContext();

export function EventsContextProvider ({children}) {
    const [eventsData, setEventsData] = useState([{
        event_id : 1,
        event_date : "2023-05-10T00:00:00.000Z",
        event_descrip : "Sed repellat rerum hic. Perspiciatis quas magni. Amet quibusdam doloremque aliquid et reiciendis et ut. Soluta et ad enim dolor nihil accusantium. Voluptas odit earum.",
        event_name : "Roberts Inc",
        event_time : "2077-01-04T00:00:00.000Z",
        speak_con : "yes",
        tscm_id : 4,
        tscm_first : "Delia",
        tscm_last : "Denesik"
    }]);
    
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