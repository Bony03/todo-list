import { useNavigate } from "react-router-dom";
import Header from "../../components/CompHeader/Header";
import MainImage from "../../components/MainImage/MainImage";
import "./NotFound.scss";
export default function NotFound() {
  const navigate = useNavigate();
  function goHomeHandler() {
    navigate("/");
  }
  return (
    <>
      <Header />
      <MainImage />
      <div className="not-found">
        <div className="not-found__container">
          <h3 className="not-found__heading">Page not Found</h3>
          <div className="not-found__body-link">
            <span
              className="not-found__link"
              onClick={() => {
                goHomeHandler();
              }}
            >
              Go home!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
