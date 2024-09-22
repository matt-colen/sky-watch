import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherResults.css";

export default function WeatherResults() {
  const { selection, weather } = useContext(WeatherContext);

  console.log(weather);

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
            <div className="weather-description">
              <p>{`${weather?.weather[0]?.description
                .slice(0, 1)
                .toUpperCase()}${weather?.weather[0]?.description.slice(
                1
              )}`}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                alt={`${weather.weather[0]?.description} icon`}
              />
            </div>
            <div className="temps">
              <p className="current-temp">{Math.round(weather.main.temp)} F</p>
              <p>High: {Math.round(weather.main.temp_max)} F</p>
              <p>Low: {Math.round(weather.main.temp_min)} F</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
