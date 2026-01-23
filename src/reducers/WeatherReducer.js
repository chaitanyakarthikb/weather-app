export const WeatherReducer = (state,action)=>{
    switch(action.type){
        case "SET_WEATHER":
            return{
                ...state,
                weather:action.payload,
            }
        case "SET_AIR_QUALITY":
            return{
                ...state,
                airQuality:action.payload,
            }
        default:
            return state;
    }
}