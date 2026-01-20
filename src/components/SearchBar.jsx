import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { useDarkModeContext } from "../store/DarkModeContext";
import LocationSuggestion from "./LocationSuggestion";
const SearchBar = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation,setSelectedLocation] = useState(null);

  useEffect(()=>{
    console.log("============selectedLocation",selectedLocation)

  },[selectedLocation])

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
          console.log("=====data", data);
          setSuggestions(data.features);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
          console.log("======error", error);
        }
      }
    }, 300);
    return () => clearInterval(timeout);
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
            return <LocationSuggestion setSelectedLocation={setSelectedLocation} suggestionName={el?.properties?.name} coordinates={el?.geometry?.coordinates} suggestionCountry={el?.properties?.country} />;
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
