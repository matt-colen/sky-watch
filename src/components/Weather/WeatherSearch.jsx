import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSearch.css";

export default function WeatherSearch({ children }) {
  const { input, handleChange, handleSubmit } = useContext(WeatherContext);

  return (
    <div className="search-container">
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
            placeholder="Get current weather for..."
          />
          <button>Get Weather</button>
        </div>
      </form>
      {children}
    </div>
  );
}
