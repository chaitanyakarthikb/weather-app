import React from "react";
import { useWeatherContext } from "../store/WeatherContext";
import "./WeatherBoxes.css";
const WeatherBoxes = () => {
  const { state } = useWeatherContext();
  console.log("======basva",state);

  function formatTo12Hour(timestamp) {
  // Convert seconds → milliseconds
  const date = new Date(timestamp * 1000);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Pad minutes (e.g., 6:05 → 6:05, not 6:5)
  minutes = minutes.toString().padStart(2, '0');

  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 → 12

  return `${hours}:${minutes} ${ampm}`;
}


function getDayLength(sunrise, sunset) {
  // Convert seconds → milliseconds
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  // Difference in milliseconds
  const diffMs = sunsetDate - sunriseDate;

  // Convert to hours and minutes
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}


  const getDayAndDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    return {dayName,formattedDate};
  };
  return (
    <div className="weatherBox">
      <div className="firstBox">
        <div className="left">
          <div className="dayAndDate">
            <h1>{getDayAndDate(state?.weather?.dt).dayName}</h1>
            <p>{getDayAndDate(state?.weather?.dt).formattedDate}</p>
          </div>
          <div className="temperature">
            <h1>{state?.weather?.main?.temp}°F</h1>
            <div className="highAndLow">
              <p>High: 28°</p>
              <p>Low: 28°</p>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="weather--img">
            <img src="/weatherIcons/cloudy.png" alt="" />
          </div>

          <div className="weatherDescription">
            <h1>{state?.weather?.weather?.[0]?.main}</h1>
            <p>Feels like: {state?.weather?.main?.feels_like}°F</p>
          </div>
        </div>
      </div>

      <div className="secondBox">
        <div className="box">
          <p>Visibility</p>
          <h1>{(state?.weather?.visibility)/1000} KM</h1>
        </div>
        <div className="box">
          <p>Humidity</p>
          <h1>{state?.weather?.main?.humidity}%</h1>
        </div>
        <div className="side-flex box">
          <div className="">
            <p>Wind Speed</p>
            <h1>
              {state?.weather?.wind?.speed}<span id="unit">km/h</span>
            </h1>
          </div>

          <div className="">
            <p>Wind Direction</p>
            <h1>East</h1>
          </div>
        </div>
        <div className="box">
          <p>Cloudiness %</p>
          <h1>{state?.weather?.clouds?.all}</h1>
        </div>
      </div>

      <div className="thirdBox">
        <div className="box">
          <p>Sunrise</p>
          <h1>
             {formatTo12Hour(state?.weather?.sys?.sunrise)}<span className="am">AM</span>
          </h1>
        </div>
        <div className="box">
          <p>Sunset</p>
          <h1>
            {formatTo12Hour(state?.weather?.sys?.sunset)}<span className="am">AM</span>
          </h1>
        </div>
        <div className="box">
          <p>Length of the day</p>
          <h1>{getDayLength(state?.weather?.sys?.sunrise, state?.weather?.sys?.sunset)}</h1>
        </div>
      </div>
    </div>
  );
};

export default WeatherBoxes;
