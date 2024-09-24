import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import "./Combobox.css";

export default function Combobox() {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const {
    searchError,
    fetchError,
    setSelection,
    setFetchError,
    setSearchError,
  } = useContext(AppContext);

  useEffect(() => {
    setFetchError(false);
    const debounceTimeout = setTimeout(() => {
      const getLocationsData = async () => {
        try {
          const res = await fetch(
            `/.netlify/functions/getLocations?query=${input}`
          );
          if (!res.ok) {
            // If the status is not in the 200-299 range, it's an error
            throw new Error(`Location fetch failed with status: ${res.status}`);
          }
          const data = await res.json();
          setLocations(data);
        } catch (err) {
          console.error(err);
          setFetchError(true);
        }
      };

      input?.length > 0 && getLocationsData();
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchError(false);
    setInput(value);
    value === "" && setLocations([]); // Resets suggestions on input clear
  };

  const handleOptionClick = (e) => {
    const { lat, lon, name, state, country } = e.target?.dataset || e;
    setSelection({ lat, lon, name, state, country });
    setInput(``);
    setLocations([]);
    setSearchError(false);
  };

  // Handles search btn click
  const handleSubmit = (e) => {
    e.preventDefault();
    input.length > 0
      ? handleOptionClick(locations[highlightedIndex])
      : setSearchError(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < locations.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Escape") {
      setLocations([]);
    }
  };

  return (
    <main className="cb-container">
      <form className="cb-form grid" onSubmit={handleSubmit}>
        <label className="cb-label" htmlFor="cb-input">
          City Name
        </label>
        <div className="cb-input-container flex">
          <input
            className="cb-input"
            id="cb-input"
            type="search"
            name="cb-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Find weather by city..."
            role="combobox"
            aria-expanded={locations.length > 1}
            aria-controls="suggestions"
            aria-autocomplete="list"
            aria-activedescendant={
              highlightedIndex !== -1 ? `option-${highlightedIndex}` : undefined
            }
          />
          <button className="cb-btn">Find Weather</button>
        </div>
      </form>
      {searchError && <p className="error bold">Please enter a city name</p>}
      {fetchError && (
        <p className="error bold">Something went wrong, please try again</p>
      )}
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
              onClick={handleOptionClick}
              role="option"
              id={`option-${index}`}
              aria-selected={highlightedIndex === index}
              className={
                highlightedIndex === index
                  ? "suggestion highlight"
                  : "suggestion"
              }
              onMouseDown={() => handleOptionClick(location)}
            >
              {`${location.name}, `}
              <span className="suggestion-span bold">{`${
                location.state ? `${location.state}, ` : ""
              }
          ${location.country}`}</span>
            </li>
          ))}
      </ul>
    </main>
  );
}
