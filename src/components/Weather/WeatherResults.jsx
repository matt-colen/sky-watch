import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherResults.css";

export default function WeatherResults() {
  const { selection, weather } = useContext(WeatherContext);

  if (!weather.name) {
    return <></>;
  }

  return (
    <div className="weather-results">
      <h2 className="weather-location">
        {selection.name &&
          `${selection.name}, ${selection.state && `${selection.state},`} ${
            selection.country
          }`}
      </h2>
      {weather.main && (
        <>
          <div className="weather-details">
            <p className="temp-label">Current Temp:</p>
            <p className="bold">{`${weather?.weather[0]?.description
              .slice(0, 1)
              .toUpperCase()}${weather?.weather[0]?.description.slice(1)}`}</p>
            <p className="temp">
              {Math.round(weather.main.temp)}
              <span className="txt--sm">&deg;F</span>
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
              alt={`${weather.weather[0]?.description} icon`}
            />
          </div>
        </>
      )}
    </div>
  );
}
