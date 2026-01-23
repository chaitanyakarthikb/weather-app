import React from 'react'
import './LocationSuggestion.css'
import { useSelectedLocationContext } from '../store/SelectedLocationContext';
const LocationSuggestion = ({suggestionName,suggestionCountry,coordinates}) => {
  const {setSelectedLocation} = useSelectedLocationContext();
  
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
