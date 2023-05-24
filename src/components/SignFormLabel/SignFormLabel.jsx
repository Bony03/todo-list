import "./SignFormLabel.scss";
export default function SignFormLabel({ changeForm, setChangeForm }) {
  return (
    <div className="change-form">
      <div className="change-form__body">
        <div
          className={
            changeForm ? "change-form__button active" : "change-form__button"
          }
          onClick={() => {
            setChangeForm(true);
          }}
        >
          Login
        </div>
        <div
          className={
            !changeForm ? "change-form__button active" : "change-form__button"
          }
          onClick={() => {
            setChangeForm(false);
          }}
        >
          Register
        </div>
      </div>
    </div>
  );
}
