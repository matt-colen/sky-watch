import { useContext } from "react";
import { SearchContext } from "../../App";
import "./Combobox.css";

export default function Combobox() {
  const {
    input,
    handleChange,
    handleSubmit,
    searchError,
    fetchError,
    locations,
    highlightedIndex,
    handleKeyDown,
    setHighlightedIndex,
    handleSelection,
  } = useContext(SearchContext);

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
            onChange={handleChange}
            placeholder="Find weather by city..."
            role="combobox"
            aria-expanded={locations.length > 1}
            aria-controls="suggestions"
            aria-autocomplete="list"
            aria-activedescendant={
              highlightedIndex !== -1 ? `option-${highlightedIndex}` : undefined
            }
            onKeyDown={(e) =>
              handleKeyDown(e, locations, highlightedIndex, setHighlightedIndex)
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
              onClick={handleSelection}
              role="option"
              id={`option-${index}`}
              aria-selected={highlightedIndex === index}
              className={
                highlightedIndex === index
                  ? "suggestion highlight"
                  : "suggestion"
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
    </main>
  );
}
