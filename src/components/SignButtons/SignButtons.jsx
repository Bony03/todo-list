import Button from "../CompButton/Button";

export default function SignButtons({
  changeForm,
  resetValidation,
  loginHandler,
  registerHandler,
  enableButton,
}) {
  if (changeForm) {
    return (
      <Button
        className="sign__button"
        onClick={() => {
          resetValidation(false, true);
          loginHandler();
        }}
        disabled={!enableButton}
        text="Login"
      />
    );
  } else {
    return (
      <Button
        className="sign__button"
        onClick={() => {
          resetValidation();
          registerHandler();
        }}
        disabled={!enableButton}
        text="Register"
      />
    );
  }
}
