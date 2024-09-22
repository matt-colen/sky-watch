import { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

export default function Weather({ children }) {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [selection, setSelection] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const getLocationsData = async () => {
        try {
          const res = await fetch(
            `/.netlify/functions/getLocations?query=${input}`
          );
          const data = await res.json();
          setLocations(data);
        } catch (err) {
          console.error(err);
        }
      };

      if (input.length > 0) {
        getLocationsData();
      }
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/getWeather?lat=${selection.lat}&lon=${selection.lon}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
      }
    };

    selection.name && getWeatherData();
  }, [selection]);

  const handleChange = (e) => {
    setInput(e.target.value);
    e.target.value === "" && setLocations([]);
  };

  const handleSelection = (e) => {
    const { lat, lon, name, state, country } = e.target?.dataset || e;
    setSelection({ lat, lon, name, state, country });
    setInput("");
    setLocations([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    locations.length > 0 && handleSelection(locations[0]);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
