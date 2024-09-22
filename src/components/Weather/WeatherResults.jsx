import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherResults.css";

export default function WeatherResults() {
  const { selection, weather } = useContext(WeatherContext);

  console.log(selection);
  console.log(weather);

  return (
    <div className="weather-results">
      <h2>
        {selection.name &&
          `${selection.name}, ${selection.state && `${selection.state},`} ${
            selection.country
          }`}
      </h2>
    </div>
  );
}
