import React from "react";
import { useWeatherContext } from "../store/WeatherContext";
import "./WeatherBoxes.css";
const WeatherBoxes = () => {
  const { state } = useWeatherContext();
  console.log("=========state", state);
  return (
    <div className="weatherBox">
      <div className="firstBox">
        <div className="left">
          <div className="dayAndDate">
            <h1>Monday</h1>
            <p>24 Dec,2025</p>
          </div>
          <div className="temperature">
            <h1>25°C</h1>
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
            <h1>Cloudy</h1>
            <p>Feels like: 26°</p>
          </div>
        </div>
      </div>

      <div className="secondBox">
        <div className="box">
          <h1>Hello world</h1>
        </div>
        <div className="box">
          <h1>Hello world</h1>
        </div>
        <div className="box">
          <h1>Hello world</h1>
        </div>
        <div className="box">
          <h1>Hello world</h1>
        </div>
      </div>

      <div className="thirdBox">
        <div className="box">
          <p>Sunrise</p>
          <h1>
            6:45 <span className="am">AM</span>
          </h1>
        </div>
        <div className="box">
          <p>Sunset</p>
          <h1>
            6:45 <span className="am">AM</span>
          </h1>
        </div>
        <div className="box">
          <p>Length of the day</p>
          <h1>10h 23m</h1>
        </div>
      </div>
    </div>
  );
};

export default WeatherBoxes;
