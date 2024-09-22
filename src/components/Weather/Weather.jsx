import { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

export default function Weather({ children }) {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [selection, setSelection] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
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

    input.length > 0 && getLocationsData();
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
  };

  const handleSelection = (e) => {
    const { lat, lon, name, state, country } = e.target.dataset;
    setSelection({ lat, lon, name, state, country });
    setInput("");
    setLocations([]);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
