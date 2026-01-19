import React, { Children, createContext, useContext, useState } from 'react'

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children})=>{
    const [darkMode, setDarkMode] = useState(false);
    return (
        <DarkModeContext.Provider value={{darkMode,setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkModeContext = ()=>{
    const darkModeContext = useContext(DarkModeContext);
    return darkModeContext;
}


export default DarkModeContext
