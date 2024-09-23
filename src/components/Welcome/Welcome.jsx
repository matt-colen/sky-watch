import { useContext } from "react";
import { SearchContext } from "../../App";
import { TiWeatherPartlySunny } from "react-icons/ti";
import "./Welcome.css";

export default function Welcome() {
  const { weather } = useContext(SearchContext);

  if (!weather.name) {
    return (
      <div className="grid welcome-container">
        <h2>Welcome! Search for any city to get its current weather</h2>
        <TiWeatherPartlySunny className="welcome-icon" />
      </div>
    );
  }
}
