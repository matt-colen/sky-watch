import { useContext } from "react";
import WeatherSuggestions from "./WeatherSuggestions";
import { WeatherContext } from "./Weather";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  const { input, handleChange, handleSubmit, searchError, fetchError } =
    useContext(WeatherContext);

  return (
    <main className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label" htmlFor="search-input">
          City Name
        </label>
        <div className="search-input-container">
          <input
            className="search-input"
            id="search-input"
            type="search"
            name="search-input"
            value={input}
            onChange={handleChange}
            placeholder="Find weather by city..."
          />
          <button className="search-btn">Find Weather</button>
        </div>
      </form>
      {searchError && <p className="error bold">Please enter a city name</p>}
      {fetchError && (
        <p className="error bold">Something went wrong, please try again</p>
      )}
      <WeatherSuggestions />
    </main>
  );
}
