import "./App.css";
import Header from "./components/Header/Header";
import Weather from "./components/Weather/index";
import WeatherSearch from "./components/Weather/WeatherSearch";

function App() {
  return (
    <div className="container">
      <Header>Sky Watch</Header>
      <Weather>
        <WeatherSearch />
      </Weather>
    </div>
  );
}

export default App;
