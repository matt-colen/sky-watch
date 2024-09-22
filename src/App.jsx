import "./App.css";
import Header from "./components/Header/Header";
import Weather from "./components/Weather/index";

function App() {
  return (
    <div className="container">
      <Header />
      <Weather>
        <Weather.Results />
        <Weather.Search>
          <Weather.Suggestions />
        </Weather.Search>
      </Weather>
    </div>
  );
}

export default App;
