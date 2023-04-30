import SignForm from "../../components/SignForm/SignForm";
import SignImage from "../../components/SignForm/SignImage/SignImage";
import "./Sign.scss";
export default function Sign() {
  return (
    <div className="sign">
      <div className="sign__container">
        <SignForm />
      </div>
    </div>
  );
}
