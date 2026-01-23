import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { useDarkModeContext } from "../store/DarkModeContext";
import LocationSuggestion from "./LocationSuggestion";
import { useWeatherContext } from "../store/WeatherContext";
import { useSelectedLocationContext } from "../store/SelectedLocationContext";
const SearchBar = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const weatherApiURL = process.env.REACT_APP_WEATHER_API;
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const {state,dispatch} = useWeatherContext();
  const {selectedLocation} = useSelectedLocationContext();
  useEffect(() => {
    const fetchWeather = async () => {
      if (selectedLocation?.latitude && selectedLocation?.longitude) {
        let weatherApiURLfinal = `${weatherApiURL}lat=${selectedLocation?.latitude}&lon=${selectedLocation?.longitude}&appid=${weatherApiKey}`;
        try {
          let apiResponse = await fetch(weatherApiURLfinal);
          let data = await apiResponse.json();
          dispatch({type:"SET_WEATHER",payload:data})
        } catch (error) {
          console.error("=======error", error);
        }
      }
    };
    fetchWeather();
  }, [selectedLocation]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          setLoading(true);
          let locationApi =
            process.env.REACT_APP_PLACES_API +
            `?q=${searchQuery}&limit=10&osm_tag=place:city`;

          let response = await fetch(locationApi);
          let data = await response.json();
          setSuggestions(data.features);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.log("======error", error);
        }
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return (
    <div className="searchBar">
      <div>
        <input
          type="text"
          value={selectedLocation?.name || searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search City..."
        />
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error...</h1>}
        {suggestions &&
         !selectedLocation &&
          suggestions.map((el) => {
            return <LocationSuggestion suggestionName={el?.properties?.name} coordinates={el?.geometry?.coordinates} suggestionCountry={el?.properties?.country} />;
          })}
      </div>
      <div className="toggle-switch">
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setDarkMode((prev) => !prev)}
            checked={darkMode}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
