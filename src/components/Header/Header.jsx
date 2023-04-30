import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import MenuLink from "../MenuLink/MenuLink";
import { photoHandler } from "../../helpers/photoHandler/photoHandler";
import { scrollLocker } from "../../utils/handlers";
import "./Header.scss";

export default function Header({ isAuth }) {
  const ref = useRef();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.file) {
      photoHandler(user.file, ref);
    }
  }, [user.file]);
  const [open, setOpen] = useState(false);
  function menuHandler() {
    setOpen(!open);
    scrollLocker();
  }

  return (
    <header className="header">
      <div className="header__container">
        <nav
          className={
            open ? "header__navbar navbar open" : "header__navbar navbar"
          }
        >
          <div className="navbar__brand">
            <MenuLink path="/" className="navbar__brand">
              Todo <span>List</span>
            </MenuLink>
          </div>
          <span
            className="navbar__icon"
            onClick={() => {
              menuHandler();
            }}
          ></span>
          <div className="navbar__body">
            <div className="navbar__list">
              <MenuLink path="/" className="navbar__item">
                Home
              </MenuLink>
              {!isAuth ? (
                <MenuLink path="/signIn" className="navbar__item">
                  Sign In
                </MenuLink>
              ) : (
                <MenuLink path="/profile" className="navbar__item image">
                  Profile
                  <span
                    className={
                      user.file
                        ? "image__profile loaded"
                        : "image__profile skeleton"
                    }
                  >
                    <img ref={ref} src="" alt="" />
                  </span>
                </MenuLink>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
