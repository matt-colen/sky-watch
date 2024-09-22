import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSearch.css";

export default function WeatherSearch({ children }) {
  const { input, handleChange } = useContext(WeatherContext);

  return (
    <div className="search-container">
      <form className="search-form">
        <label htmlFor="search-input">City Name</label>
        <input
          className="search-input"
          id="search-input"
          type="search"
          name="search-input"
          value={input}
          onChange={handleChange}
          placeholder="Get current weather for..."
        />
      </form>
      {children}
    </div>
  );
}
