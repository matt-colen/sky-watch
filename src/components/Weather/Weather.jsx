import { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

export default function Weather({ children }) {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [selection, setSelection] = useState({});
  const [weather, setWeather] = useState({});
  const [searchError, setSearchError] = useState(false);
  const [fetchError, setFetchError] = useState(false);

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

      input.length > 0 && getLocationsData();
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  useEffect(() => {
    setFetchError(false);
    const getWeatherData = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/getWeather?lat=${selection.lat}&lon=${selection.lon}`
        );
        if (!res.ok) {
          // If the status is not in the 200-299 range, it's an error
          throw new Error(`Location fetch failed with status: ${res.status}`);
        }
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setFetchError(true);
      }
    };

    selection?.name && getWeatherData();
  }, [selection]);

  const handleChange = (e) => {
    setSearchError(false);
    setInput(e.target.value);
    e.target.value === "" && setLocations([]); // Resets location suggestions on input clear
  };

  const handleSelection = (e) => {
    const { lat, lon, name, state, country } = e.target?.dataset || e;
    setSelection({ lat, lon, name, state, country });
    setSearchError(false);
    setInput("");
    setLocations([]);
  };

  // Handles search btn click
  const handleSubmit = (e) => {
    e.preventDefault();
    locations.length > 0 ? handleSelection(locations[0]) : setSearchError(true);
  };

  return (
    <WeatherContext.Provider
      value={{
        input,
        handleChange,
        locations,
        selection,
        handleSelection,
        weather,
        handleSubmit,
        searchError,
        fetchError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
