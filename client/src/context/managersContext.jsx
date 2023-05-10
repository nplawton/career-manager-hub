import React, { useState, useEffect, createContext } from "react";

export const ManagersContext = createContext();

export function ManagersContextProvider ({children}) {
    const [managersData, setManagersData] = useState(['null']);

    useEffect(() =>{
        fetch('http://localhost:8000/managers')
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