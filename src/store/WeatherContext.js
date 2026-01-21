import { Children, createContext, useContext, useReducer } from "react";
import { WeatherReducer } from "../reducers/WeatherReducer";

export const WeatherContext = createContext();

let initialState = {
    weather:null,
};
export const WeatherContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(WeatherReducer,initialState);
    return <WeatherContext.Provider value={{state,dispatch}}>
        {children}
    </WeatherContext.Provider>
}

export const useWeatherContext = ()=>{
    const context = useContext(WeatherContext);
    return context;
}


