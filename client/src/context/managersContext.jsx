import React, { useState, useEffect, createContext } from "react";

export const ManagersContext = createContext();

export function ManagersContextProvider ({children}) {
    const [managersData, setManagersData] = useState([{
        login_id : "Antonetta_Dooley",
        tscm_avatar : "https://cdn.fakercloud.com/avatars/robbschiller_128.jpg",
        tscm_email : "Lorna62@gmail.com",
        tscm_first : "Jules",
        tscm_id : 1,
        tscm_last : "Waelchi",
        tscm_password : "oypEp16"
    }]);
    
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