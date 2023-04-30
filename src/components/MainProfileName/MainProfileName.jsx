import { useEffect, useState } from "react";
import { dateFormatterMain } from "../../helpers/dateFormat/dateFormatter";
import "./MainProfileName.scss";

export default function MainProfileName({ name, surname }) {
  return (
    <div className="main-profile-name">
      <div className="main-profile-name__container">
        <div className="main-profile-name__body">
          <div className="main-profile-name__name">
            {name ? `Welcome, ${name}!` : `Welcome!`}
          </div>
        </div>
      </div>
    </div>
  );
}
