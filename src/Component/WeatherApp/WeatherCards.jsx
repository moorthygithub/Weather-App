import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const WeatherCards = ({ weatherData }) => {
  return (
    <Grid container spacing={3}>
      {weatherData.list.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              {/* Date & Time */}
              <Typography variant="h6">
                {new Date(item.dt_txt).toLocaleString("en-US", {
                  weekday: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Typography>

              {/* Temperature */}
              <Typography variant="body1">
                Temperature: {(item.main.temp - 273.15).toFixed(1)}°C
              </Typography>

              {/* Weather Description */}
              <Typography variant="body1">
                Weather: {item.weather[0].description}
              </Typography>

              {/* Wind Details */}
              <Typography variant="body2" color="text.secondary">
                Wind: {item.wind.speed} m/s, Direction: {item.wind.deg}°
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherCards;
