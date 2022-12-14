import React, { useState, useEffect } from "react";
import "./styles.css";
import useWeatherContext from "../../../context/Weather/weatherProvider";
import {
  WeatherTile,
  GoogleMapBackGround,
  AutoCompleteAddress,
  NavComponent,
} from "../../../components";

function WeatherApp() {
  const { weathers, newWeather } = useWeatherContext();
  const [center, setCenter] = useState(null);

  console.log(center);

  return (
    <div>
      <header className="weather-app-page__header">
        <div className="weather-app-page__searcher">
          <h2>Weather Searcher</h2>
          <AutoCompleteAddress setCoors={setCenter} />
        </div>
        <NavComponent
          routes={[
            { routeLink: "/", routeName: "Global", routeType: "user" },
            { routeLink: "/", routeName: "Favorites", routeType: "user" },
            { routeLink: "/", routeName: "Log out", routeType: "user" },
          ]}
        />
      </header>
      <GoogleMapBackGround />

      {process.env.NODE_ENV === "development" || false ? (
        <>
          <button
            onClick={() => {
              newWeather({ lat: -54, lng: 5 });
            }}
          >
            New Weather
          </button>
          {weathers.map((weather, i) => (
            <React.Fragment key={i}>
              <WeatherTile weather={weather} />
            </React.Fragment>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default WeatherApp;
