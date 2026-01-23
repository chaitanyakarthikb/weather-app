import { createContext, useContext, useState } from "react";

export const SelectedLocationContext = createContext();


export const SelectedLocationContextProvider = ({children})=>{
    const [selectedLocation,setSelectedLocation] = useState(null);
    return(
        <SelectedLocationContext.Provider value={{selectedLocation,setSelectedLocation}}> 
        {children}
        </SelectedLocationContext.Provider>
    )
}

export const useSelectedLocationContext = ()=>{
    let context = useContext(SelectedLocationContext);
    return context;
}
