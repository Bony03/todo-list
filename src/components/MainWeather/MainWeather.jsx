import { dateFormatterMain } from "../../helpers/dateFormat/dateFormatter";
import "./MainWeather.scss";
import { useEffect, useState } from "react";

export default function MainWeather() {
  const [weather, setWeather] = useState({
    current: {
      condition: { icon: "", text: "" },
    },
    location: { name: "", country: "" },
  });
  useEffect(() => {
    async function FetchWeather() {
      try {
        const response = await fetch("https://api.db-ip.com/v2/free/self");
        if (!response.ok) {
          throw new Error("Error fetching IP");
        }
        const data = await response.json();
        const city = data.city;
        try {
          const fetchingWeather = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=68b47b8a98d84ba6b53152525232904&q=${city}&aqi=no`
          );
          if (!response.ok) {
            throw new Error("Error fetching Weather");
          }
          const wether = await fetchingWeather.json();
          setWeather(wether);
        } catch (error) {
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    FetchWeather();
  }, []);
  return (
    <div className="main-weather">
      <div className="main-weather__container">
        <div className="main-weather__body">
          <div className="main-weather__card">
            <img
              className="main-weather__icon"
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
            <h3 className="main-weather__temp">{weather.current.temp_c}</h3>
            <div className="main-weather__content">
              <div className="main-weather__location">
                <h3 className="main-weather__city">{weather.location.name}</h3>
                <h5 className="main-weather__country">
                  {weather.location.country}
                </h5>
                <div className="main-weather__date">{dateFormatterMain()}</div>
              </div>
            </div>
          </div>
        </div>
        <button className="main-weather__button"></button>
      </div>
    </div>
  );
}
