import { useState, useEffect, createContext } from "react";

const WeatherContext = createContext();

export default function Weather({ children }) {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocationsData = async () => {
      if (!input || input.length < 3) return;
      const res = await fetch(
        `/.netlify/functions/getLocations?query=${input}`
      );
      const data = await res.json();
      setLocations(data);
    };

    getLocationsData();
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  console.log("Input State: ", input);
  console.log("Locations State: ", locations);

  return (
    <WeatherContext.Provider value={{ input, handleChange, locations }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
