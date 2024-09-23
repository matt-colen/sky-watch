import { useContext } from "react";
import { SearchContext } from "../../App";
import "./Suggestions.css";

export default function Suggestions() {
  const { locations, handleSelection, highlightedIndex } =
    useContext(SearchContext);

  return (
    <ul id="suggestions" className="suggestions" role="listbox">
      {locations.length > 1 &&
        locations.map((location, index) => (
          <li
            key={index}
            data-lat={location.lat}
            data-lon={location.lon}
            data-name={location.name}
            data-state={location.state}
            data-country={location.country}
            onClick={handleSelection}
            role="option"
            id={`option-${index}`}
            aria-selected={highlightedIndex === index}
            className={
              highlightedIndex === index ? "suggestion highlight" : "suggestion"
            }
          >
            {`${location.name}, `}
            <span className="suggestion-span bold">{`${
              location.state ? `${location.state}, ` : ""
            }
          ${location.country}`}</span>
          </li>
        ))}
    </ul>
  );
}
