import { useContext } from "react";
import { WeatherContext } from "./Weather";

export default function WeatherSearch() {
  const { destination, handleChange } = useContext(WeatherContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="city-search">Enter City Name</label>
      <input
        id="city-search"
        type="search"
        name="city-search"
        value={destination}
        onChange={handleChange}
      />
      <button>Get Current Weather</button>
    </form>
  );
}
