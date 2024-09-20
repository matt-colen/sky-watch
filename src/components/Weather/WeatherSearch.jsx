import { useContext } from "react";
import { WeatherContext } from "./Weather";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  const { destination, handleChange } = useContext(WeatherContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleFormSubmit}>
      <label htmlFor="city-search">City Name</label>
      <input
        className="city-search"
        id="city-search"
        type="search"
        name="city-search"
        value={destination}
        onChange={handleChange}
        placeholder="Get current weather for..."
      />
      <button className="btn btn--primary">Get Current Weather</button>
    </form>
  );
}
