import { useState, useEffect, createContext } from "react";
import Header from "./components/Header/Header";
import Combobox from "./components/Combobox/Combobox";
import Results from "./components/Results/Results";
import Welcome from "./components/Welcome/Welcome";
import "./App.css";

const SearchContext = createContext();

export default function App() {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [selection, setSelection] = useState({});
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
            throw new Error(
              `Location fetch failed with status: ${res.statusCode}`
            );
          }
          const data = await res.json();
          setLocations(data);
        } catch (err) {
          console.error(err);
          setFetchError(true);
        }
      };

      input?.length > 0 && getLocationsData();
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
          throw new Error(
            `Weather fetch failed with status: ${res.statusCode}`
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

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchError(false);
    setInput(value);
    value === "" && setLocations([]); // Resets location suggestions on input clear
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

  const handleKeyDown = (e, options, highlightedIndex, setHighlightedIndex) => {
    if (e.key === "ArrowDown") {
      console.log("clicked");
      // Move down in the list
      setHighlightedIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Move up in the list
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter") {
      // Select the current highlighted option
      if (highlightedIndex !== -1) {
        setInput(options[highlightedIndex]);
      }
    }
  };

  return (
    <SearchContext.Provider
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
        highlightedIndex,
        handleKeyDown,
        setHighlightedIndex,
      }}
    >
      <div className="container">
        <Header />
        <Combobox />
        <Results />
        <Welcome />
      </div>
    </SearchContext.Provider>
  );
}

export { SearchContext };
