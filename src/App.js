import "./App.css";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const apiKey = "473f581e4b15b530db40741b14fe7efd";

  const search = () => {
    console.log(query);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeatherData(result);
        setQuery("");
      });
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(q) => setQuery(q.target.value)}
            onKeyDown={(keyEvent) => (keyEvent.key === "Enter" ? search() : "")}
          />
          <button className="search-button" onClick={search}>
            <BsSearch />
          </button>
        </div>
        {typeof weatherData.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weatherData.name} {weatherData.sys.country}
              </div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weatherData.main.temp.toFixed(1)}°C</div>
              <div className="weather">{weatherData.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
