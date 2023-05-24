import { useNavigate } from "react-router-dom";
import Header from "../../components/CompHeader/Header";

import "./Activated.scss";
export default function Activated() {
  const navigate = useNavigate();
  function goHomeHandler() {
    navigate("/");
  }
  return (
    <>
      <Header />
      <div className="activated">
        <div className="activated__container">
          <div className="activated__heading-body">
            <h3 className="activated__heading">
              Accound has been successfully activated
            </h3>
            <span></span>
          </div>
          <div className="activated__body-link not-found__body-link">
            <span
              className="activated__link not-found__link"
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
