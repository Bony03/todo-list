import "./Categories.scss";
import { useState } from "react";
export default function Categories() {
  const [value, setValue] = useState("New category");
  let pressTimer = null;
  return (
    <div className="categories">
      <div className="categories__container">
        <h5 className="categories__heading">Categories:</h5>
        <ul className="categories__list">
          <li className="categories__item">
            <input
              type="button"
              onDoubleClick={(e) => {
                e.target.type = "input";
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              onTouchEnd={() => {
                clearTimeout(pressTimer);
                return false;
              }}
              onTouchStart={(e) => {
                pressTimer = setTimeout(() => {
                  e.target.type = "input";
                }, 700);
                return false;
              }}
              onBlur={(e) => (e.target.type = "button")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.type = "button";
                }
              }}
            />
            <span count="14"></span>
          </li>
          <li className="categories__item">
            <input
              type="button"
              onDoubleClick={(e) => {
                e.target.type = "input";
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              onTouchEnd={() => {
                clearTimeout(pressTimer);
                return false;
              }}
              onTouchStart={(e) => {
                pressTimer = setTimeout(() => {
                  e.target.type = "input";
                }, 700);
                return false;
              }}
              onBlur={(e) => (e.target.type = "button")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.type = "button";
                }
              }}
            />
            <span count="14"></span>
          </li>
        </ul>
        <button>Add category</button>
      </div>
    </div>
  );
}
