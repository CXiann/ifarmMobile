import React, {useState, useEffect} from 'react';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const temperature = Math.round(weatherData.main.temp - 273.15);
  const iconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const description = weatherData.weather[0].description;

  return (
    <div>
      <div>{temperature}°C</div>
      <img src={iconUrl} alt={description} />
      <div>{description}</div>
    </div>
  );
};

export default WeatherForecast;
