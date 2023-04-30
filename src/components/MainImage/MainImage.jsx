import React from "react";
import "./MainImage.scss";
export default function MainImage() {
  return (
    <div className="main-image">
      <div className="main-image__container">
        <div className="main-image__body">
          <img
            className="main-image__image"
            src="./static/mainImage.jpg"
            alt="mountains"
          />
        </div>
      </div>
    </div>
  );
}
