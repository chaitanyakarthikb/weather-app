import React from 'react'
import './LocationSuggestion.css'
const LocationSuggestion = ({suggestionName,suggestionCountry,setSelectedLocation,coordinates}) => {
  const handleSelection = () => {
    if (!coordinates || coordinates.length < 2) {
      setSelectedLocation({
        name: suggestionName,
        country: suggestionCountry,
        longitude: null,
        latitude: null
      });
      return;
    }
    setSelectedLocation({
      name: suggestionName,
      country: suggestionCountry,
      longitude: coordinates[0],
      latitude: coordinates[1]
    });
  };

  return (
    <div className="location--suggestion" onClick={handleSelection}>
      <div className="location--suggestion--labels">
        <h3>Name</h3>
        <h3>Country</h3>
      </div>
      <div className="location--suggestion--values">
        <p>{suggestionName}</p>
        <p>{suggestionCountry}</p>
      </div>
    </div>
  );
}

export default LocationSuggestion
