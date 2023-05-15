import React, { useState, useEffect, createContext } from "react";

export const ManagersContext = createContext();

export function ManagersContextProvider ({children}) {
    const [managersData, setManagersData] = useState(['null']);
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';

    useEffect(() =>{
        fetch(`${url}/managers`)
            .then(response => response.json())
            .then(data => setManagersData(data))
            .catch(error => console.log(error))
    }, []);

    return(
        <ManagersContext.Provider value={{managersData}}>
            {children}
        </ManagersContext.Provider>
    );
}