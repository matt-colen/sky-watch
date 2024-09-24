import { useState, useEffect, createContext } from "react";
import Header from "./components/Header/Header";
import Combobox from "./components/Combobox/Combobox";
import Welcome from "./components/Welcome/Welcome";
import Results from "./components/Results/Results";
import "./App.css";

const AppContext = createContext();

export default function App() {
  const [selection, setSelection] = useState({});
  const [weather, setWeather] = useState({});
  const [searchError, setSearchError] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setFetchError(false);
    const getWeatherData = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/getWeather?lat=${selection.lat}&lon=${selection.lon}`
        );
        if (!res.ok) {
          // If the status is not in the 200-299 range, throw an error
          throw new Error(
            `Weather fetch failed with status: ${res.status}`
          );
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

  return (
    <AppContext.Provider
      value={{
        selection,
        weather,
        searchError,
        fetchError,
        setSelection,
        setSearchError,
        setFetchError,
      }}
    >
      <div className="container">
        <Header />
        <Combobox />
        <Welcome />
        <Results />
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
