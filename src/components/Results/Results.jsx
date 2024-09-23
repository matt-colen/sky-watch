import { useContext } from "react";
import { SearchContext } from '../../App';
import "./Results.css";

export default function Results() {
  const { selection, weather } = useContext(SearchContext);

  if (!selection.name || !weather.main) {
    return <></>;
  }

  return (
    <div className="results-container">
      <h2 className="result-location">
        {selection.name &&
          `${selection.name}, ${
            selection.state ? `${selection.state}, ` : ""
          } ${selection.country}`}
      </h2>

      <div className="result-details">
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
    </div>
  );
}
