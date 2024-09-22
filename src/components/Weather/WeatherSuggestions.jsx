import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSuggestions.css";

export default function WeatherSuggestions() {
  const { locations } = useContext(WeatherContext);

  return (
    <ul className="search-results">
      {locations.length > 1 &&
        locations.map((location) => (
          <li className="search-result" key={location.lat}>{`${
            location.name
          }, ${location.state && `${location.state}, `}
          ${location.country}`}</li>
        ))}
    </ul>
  );
}
