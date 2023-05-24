import { useNavigate } from "react-router-dom";
import "./Header.scss";
export default function Header({ isAuth }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__container">
        <header className="header__body">
          <div
            className="header__brand"
            onClick={() => {
              navigate("/");
            }}
          >
            Todo<span>List</span>
          </div>
          {isAuth ? (
            <div
              className="header__button"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </div>
          ) : (
            <div
              className="header__button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </div>
          )}
        </header>
      </div>
    </div>
  );
}
