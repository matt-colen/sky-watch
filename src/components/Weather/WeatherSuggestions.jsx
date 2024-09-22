import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSuggestions.css";

export default function WeatherSuggestions() {
  const { locations, handleSelection } = useContext(WeatherContext);

  return (
    <ul className="search-results">
      {locations.length > 1 &&
        locations.map((location) => (
          <li
            className="search-result"
            key={`$location.lat}-${location.lon}`}
            data-lat={location.lat}
            data-lon={location.lon}
            data-name={location.name}
            data-state={location.state}
            data-country={location.country}
            onClick={handleSelection}
          >{`${location.name}, ${location.state && `${location.state}, `}
          ${location.country}`}</li>
        ))}
    </ul>
  );
}
