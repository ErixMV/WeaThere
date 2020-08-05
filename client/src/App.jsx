import React, { useState, useEffect, createRef } from 'react';
import { ThemeProvider } from 'styled-components';
import MediaQuery from 'react-responsive';
import * as places from "places.js";
import axios from "axios";

import { placesConf, configureConf } from "./config/places";
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import "./config/enviroment";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherBody from "./components/WeatherBody";
import Info from "./components/Info";
import Footer from "./components/Footer";

function App() {

  const [theme, setTheme] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null)
  // const [placesAutocomplete, setPlacesAutocomplete] = useState(null);

  const ref = createRef();
  const toggleTheme = () => setTheme(!theme);

  useEffect(() => {
    setPlaces();
    // eslint-disable-next-line
  }, []);

  // Configuration Places
  const setPlaces = async () => {

    const { current } = ref;

    // const { data } = await axios.post("/api/cities");

    const instancePlacesAutocomplete = await places({
      // appId: data.id,
      // apiKey: data.apikey,
      ...placesConf,
      container: current,
    }).configure(configureConf);

    await instancePlacesAutocomplete.on('change', ({ suggestion }) => {
      setCity(suggestion.value);
      instancePlacesAutocomplete.close();

      submitHandler(instancePlacesAutocomplete, suggestion.latlng);
    });

    await instancePlacesAutocomplete.on('locate', () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          setCity("Current location");
          instancePlacesAutocomplete.setVal("Current location");
          getForecast({ lat: coords.latitude, lng: coords.longitude });
          instancePlacesAutocomplete.close();
        }, error => {
          console.log(error);
          setError(`GeoLocation failed: ${error.message}`)
          setTimeout(() => {
            setError("");
          }, 2500);
        }, { maximumAge: Infinity, timeout: 2000 });
      } else {
        setError("Geolocation is not available");
        setTimeout(() => {
          setError("");
        }, 2500);
      }
    });

    await instancePlacesAutocomplete.on('clear', () => {
      instancePlacesAutocomplete.setVal("");
      setCity("");
      setForecast(false);
    });

    await instancePlacesAutocomplete.on('error', () => {
      console.log("error");

      instancePlacesAutocomplete.setVal("");
      instancePlacesAutocomplete.close();
    });

    // setPlacesAutocomplete(instancePlacesAutocomplete);

  };

  // Render Cards
  const getWeatherBody = (dayForecast, index, componentClass) => {
    const { valid_date, high_temp, low_temp, weather } = dayForecast;
    const day = new Date(valid_date).getDay();

    return (
      <WeatherBody displayType={componentClass} key={index} i={index} day={day} icon={weather.icon} highTemp={high_temp} lowTemp={low_temp} />
    );
  }

  const renderOneRow = (dayForecast, index) => getWeatherBody(dayForecast, index, "d-large");

  const renderTwoRows = (dayForecast, index) => getWeatherBody(dayForecast, index, "d-medium");

  const renderRows = (dayForecast, index) => getWeatherBody(dayForecast, index, "d-small");




  // Event handlers
  // On input update
  const changeHandler = (evt) => {
    evt.preventDefault();
    setCity(evt.target.value);
  }

  // On submitting
  const submitHandler = (instancePlacesAutocomplete, latlng) => {
    (instancePlacesAutocomplete.getVal() !== "") ? getForecast(latlng) : setError("Select a city.");
  };

  // API Call: Get forecast by lat and lng
  const getForecast = async ({ lat, lng }) => {
    try {
      const { data } = await axios.post("/api/forecast", { lat: lat, lng: lng });
      setForecast(data);
    } catch (err) {
      console.log(err.message);
      setError("The forecast of the selected city is not available.");
    }
  };

  return (
    // ThemeProvider is set for future implementations
    <ThemeProvider theme={theme === true ? lightTheme : darkTheme}>

      <Header />
      <GlobalStyles />
      {/* <button onClick={toggleTheme}>Toggle theme</button> */}
      <SearchBar city={city} changeHandler={changeHandler} submitHandler={submitHandler} ref={ref} />
      {error && <div className="error">{error}</div>}

      <MediaQuery minWidth={1000}>
        {forecast &&
          <div className="weather-container">
            {forecast.data.map(renderOneRow)}
          </div>
        }
      </MediaQuery>

      <MediaQuery maxWidth={999} minWidth={600}>
        {forecast &&
          <div className="weather-container">
            {forecast.data.slice(0, 3).map(renderTwoRows)}
            <div className="break" />
            {forecast.data.slice(3, 5).map(renderTwoRows)}
          </div>
        }

      </MediaQuery>

      <MediaQuery maxWidth={599}>
        {forecast &&
          <div className="weather-container">
            {forecast.data.map(renderRows)}
          </div>
        }
      </MediaQuery>

      <Info />

      <div></div>

      <Footer alterTheme={toggleTheme} />

    </ThemeProvider>
  );
}


export default App;
