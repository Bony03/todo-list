import "./SignPasswordReq.scss";
export default function SignPasswordReq({ password }) {
  return (
    <div className="password-req">
      <div
        className={
          !password.minLengthError
            ? "password-req__error fixed"
            : "password-req__error"
        }
      >
        Password should contain at least 8 characters
      </div>
      <div
        className={
          !password.oneLowCaseError && !password.oneUpperCaseError
            ? "password-req__error fixed"
            : "password-req__error"
        }
      >
        Password should contain at least one small and one capital letter
      </div>
      <div
        className={
          !password.oneNumberError &&
          (!password.oneLowCaseError || !password.oneUpperCaseError)
            ? "password-req__error fixed"
            : "password-req__error"
        }
      >
        Password should contain numbers and latin letters
      </div>
    </div>
  );
}
