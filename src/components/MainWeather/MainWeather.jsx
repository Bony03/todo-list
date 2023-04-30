import { dateFormatterMain } from "../../helpers/dateFormat/dateFormatter";
import "./MainWeather.scss";
import { useEffect, useState, useRef } from "react";

export default function MainWeather() {
  const [weather, setWeather] = useState({
    current: {
      condition: { icon: "", text: "" },
    },
    location: { name: "", country: "" },
  });
  const container = useRef();
  const button = useRef();
  const [openWeather, setOpenWeather] = useState(true);
  let posInitial = 0;
  let posFinal = 0;
  let posY1 = 0;
  let posY2 = 0;
  function openTouch(e) {
    if (e.type === "touchstart") {
      posInitial = posY1 = e.changedTouches[0].clientY;
      container.current.style.transition = "";
    }
    if (e.type === "touchmove") {
      posY2 = e.changedTouches[0].clientY - posY1;
      posY1 = e.changedTouches[0].clientY;
      if (Number(container.current.style.height.replace(/px/g, "")) < 200) {
        container.current.style.height = `${
          Number(container.current.style.height.replace(/px/g, "")) + posY2
        }px`;
      }
    }
    if (e.type === "touchend") {
      posFinal = e.changedTouches[0].clientY;
      if (posInitial < posFinal) {
        if (
          Math.abs(posInitial - posFinal) >
          container.current.children[0].offsetHeight * 0.5
        ) {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `${
            container.current.children[0].offsetHeight + 16
          }px`;
          container.current.style.padding = "0.5rem 1rem";
        } else {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `0px`;
          container.current.style.padding = "0px 1rem";
        }
      } else {
        if (
          Math.abs(posInitial - posFinal) >
          container.current.children[0].offsetHeight * 0.5
        ) {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `0px`;
          container.current.style.padding = "0px 1rem";
        } else {
          container.current.style.transition = "all 0.5s ";
          container.current.style.height = `${
            container.current.children[0].offsetHeight + 16
          }px`;
          container.current.style.padding = "0.5rem 1rem";
        }
      }
    }
  }

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
      <div className="main-weather__container" ref={container}>
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
      </div>
      <button
        ref={button}
        className="main-weather__button"
        onTouchStart={(e) => {
          openTouch(e);
        }}
        onTouchMove={(e) => {
          openTouch(e);
        }}
        onTouchEnd={(e) => {
          openTouch(e);
        }}
      ></button>
    </div>
  );
}
