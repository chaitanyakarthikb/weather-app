import React, { useEffect, useState } from "react";
import "./AirQuality.css";
import { useSelectedLocationContext } from "../store/SelectedLocationContext";
import { useWeatherContext } from "../store/WeatherContext";
const AirQuality = () => {
  let { selectedLocation } = useSelectedLocationContext();
  let { dispatch, state } = useWeatherContext();
  const [error, setError] = useState(null);
  console.log("===state", state);
  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        if (
          selectedLocation &&
          selectedLocation?.latitude &&
          selectedLocation?.longitude
        ) {
          let apiUrl = `${process.env.REACT_APP_AIR_POLLUTION_API}lat=${selectedLocation?.latitude}&lon=${selectedLocation?.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
          let apiResponse = await fetch(apiUrl);
          let data = await apiResponse.json();
          dispatch({ type: "SET_AIR_QUALITY", payload: data?.list?.[0] });
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchAirQuality();
  }, [selectedLocation]);

  let airQualityMetric = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  return (
    <div className="airquality">
      {error ? (
        <p>Something went wrong...</p>
      ) : (
        <>
          <div>
            <div className="airQualityMetric">
              <p id="metric--heading">Air Quality </p>
              <h1>{airQualityMetric[state?.airQuality?.main?.aqi]}</h1>
            </div>
            <div className="components">
              <div>
                <p>CO (μg/m3)</p>
                <h1>269.22</h1>
              </div>

              <div>
                <p>NO (μg/m3)</p>
                <h1>0.49</h1>
              </div>

              <div>
                <p>
                  NO<sub>2</sub> (μg/m3)
                </p>
                <h1>2.54</h1>
              </div>

              <div>
                <p>
                  O<sub>3</sub> (μg/m3)
                </p>
                <h1>105.31</h1>
              </div>

              <div>
                <p>
                  SO<sub>2</sub> (μg/m3)
                </p>
                <h1>5.21</h1>
              </div>

              <div>
                <p>
                  NH<sub>3</sub> (μg/m3)
                </p>
                <h1>5.21</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AirQuality;
