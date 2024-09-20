import { useState, createContext } from "react";

const WeatherContext = createContext();

export default function Weather({ children }) {
  const [destination, setDestination] = useState("");

  const handleChange = (e) => {
    setDestination(e.target.value);
  };

  console.log("Destination State: ", destination);

  return (
    <WeatherContext.Provider value={{ destination, handleChange }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext };
