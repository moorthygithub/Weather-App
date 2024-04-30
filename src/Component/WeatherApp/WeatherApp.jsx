import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../assest/search.png";
import clear_icon from "../assest/clear.png";
import cloud_icon from "../assest/cloud.png";
import drizzle_icon from "../assest/drizzle.png";
import rain_icon from "../assest/rain.png";
import snow_icon from "../assest/snow.png";
import wind_icon from "../assest/wind.png";
import humidity_icon from "../assest/humidity.png";

function WeatherApp() {
    let api_key="e6c07dca26509036b1b9a69d7345f23e"
    const[icon,setIcon]=useState(cloud_icon)


 const search=async()=>{
     const element =document.getElementsByClassName("cityInput")
     if(element[0].value===""){
      return 0;
     }
     
     let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
     let res=await fetch(url);
     let data=await res.json()

     if(data.cod && data.cod==="404"){
      alert("Country or state not found");
      return;
     }
     const humdity=document.getElementsByClassName("humidity-percentage")
     const wind=document.getElementsByClassName("wind-rate")
     const temperature=document.getElementsByClassName("weather-temp")
     const location=document.getElementsByClassName("weather-location")
        humdity[0].innerHTML=data.main.humidity+" %";
        wind[0].innerHTML=Math.round(data.wind.speed)+"km/h";
        temperature[0].innerHTML=Math.round(data.main.temp)+"c";
        location[0].innerHTML=data.name;

        if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
          setIcon(clear_icon)
        }
        else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n"){
          setIcon(cloud_icon)
        }
        else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n"){
          setIcon(drizzle_icon)
        }
        else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
          setIcon(drizzle_icon)
        }
        else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n"){
          setIcon(rain_icon)
        }
        else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n"){
          setIcon(rain_icon)
        }
        else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n"){
          setIcon(snow_icon)
        }
        else{
          setIcon(clear_icon)
        }



 }
  return (
    <div className="container">
      
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"></input>
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon}></img>
        </div>
      </div>
      <div className="weather-image">
        <img src={icon}></img>
      </div>
      <div className="weather-temp">24C</div>
      <div className="weather-location">Krishnagiri</div>
    <div className="data-container">
   <div className="element">
       <img src={humidity_icon}/>
       <div className="data">
        <div className="humidity-percentage">64%</div>
        <div className="text">Humidity</div>
       </div>
   </div>
    {/* This is comment  */}
   <div className="element">
       <img src={wind_icon}/>
       <div className="data">
        <div className="wind-rate">20km/hr</div>
        <div className="text">WindSpeed</div>
       </div>
   </div>
    </div>
    </div>
  );
}
export default WeatherApp;
