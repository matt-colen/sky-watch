import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherResults.css";

export default function WeatherResults() {
  const { locations } = useContext(WeatherContext);

  return (
    <div className="weather-results">
      {locations.map((location) => (
        <p key={location.lat}>
          {`${location.name}, ${location.state ? `${location.state}, ` : ""} 
          ${location.country}`}
        </p>
      ))}
    </div>
  );
}
