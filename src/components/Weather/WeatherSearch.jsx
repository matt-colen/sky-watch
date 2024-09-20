import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  const { input, handleChange } = useContext(WeatherContext);

  return (
    <form className="search-form">
      <label htmlFor="city-search">City Name</label>
      <input
        className="city-search"
        id="city-search"
        type="search"
        name="city-search"
        value={input}
        onChange={handleChange}
        placeholder="Get current weather for..."
      />
    </form>
  );
}
