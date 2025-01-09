import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import axios from "axios";
import search_icon from "../assest/search.png";
import clear_icon from "../assest/clear.png";
import cloud_icon from "../assest/cloud.png";
import drizzle_icon from "../assest/drizzle.png";
import rain_icon from "../assest/rain.png";
import snow_icon from "../assest/snow.png";
import wind_icon from "../assest/wind.png";
import humidity_icon from "../assest/humidity.png";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Tab, Tabs } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherApp() {
  let api_key = "e6c07dca26509036b1b9a69d7345f23e";
  const [icon, setIcon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(12.53);
  const [lon, setLon] = useState(78.23);
  const [value, setValue] = useState(0); // State for tracking selected tab

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") return;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let res = await fetch(url);
    let data = await res.json();
    setLat(data.coord.lat);
    setLon(data.coord.lon);

    if (data.cod && data.cod === "404") {
      alert("Country or state not found");
      return;
    }
    const humdity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humdity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.round(data.wind.speed) + "km/h";
    temperature[0].innerHTML = Math.round(data.main.temp) + "c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setIcon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setIcon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setIcon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setIcon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setIcon(snow_icon);
    } else {
      setIcon(clear_icon);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  const chartData = {
    labels:
      weatherData?.list?.map((item) =>
        new Date(item.dt * 1000).toLocaleTimeString()
      ) || [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData?.list?.map((item) => item.main.temp - 273.15) || [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Wind Speed (km/h)",
        data: weatherData?.list?.map((item) => item.wind.speed) || [],
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
        yAxisID: "y1", // Wind speed uses secondary y-axis
      },
      {
        label: "Humidity (%)",
        data: weatherData?.list?.map((item) => item.main.humidity) || [],
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(75, 192, 192, 1)",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        ticks: {
          color: "rgba(255, 159, 64, 1)",
        },
      },
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="search" />
          </div>
        </div>
        <div className="weather-image">
          <img src={icon} alt="weather-icon" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">Krishnagiri</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="humidity" />
            <div className="data">
              <div className="humidity-percentage">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="wind" />
            <div className="data">
              <div className="wind-rate">20km/h</div>
              <div className="text">WindSpeed</div>
            </div>
          </div>
        </div>
      </div>
      {weatherData && (
        <div style={{ padding: "20px" }}>
          <h1>Weather Forecast</h1>

          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="view options"
            >
              <Tab label="Table View" />
              <Tab label="Card View" />
              <Tab label="Graph View" />
            </Tabs>
          </Box>

          {value === 0 && (
            <div>
              <h2>Weather Forecast Table</h2>
              {weatherData && (
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Temperature</th>
                      <th>Weather</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.list.map((item, index) => (
                      <tr key={index}>
                        <td>{new Date(item.dt * 1000).toLocaleTimeString()}</td>
                        <td>{(item.main.temp - 273.15).toFixed(2)}°C</td>
                        <td>{item.weather[0].description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {value === 1 && (
            <div>
              <h2>Weather Data Cards</h2>
              {weatherData && (
                <div className="card-container">
                  {weatherData.list.map((item, index) => (
                    <div key={index} className="weather-card">
                      <h3>{new Date(item.dt * 1000).toLocaleTimeString()}</h3>
                      <p>
                        Temperature: {(item.main.temp - 273.15).toFixed(2)}°C
                      </p>
                      <p>Weather: {item.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {value === 2 && (
            <div>
              <h2>Temperature Graph</h2>
              {weatherData && <Line data={chartData} options={chartOptions} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
