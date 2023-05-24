import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SignFormLabel from "../SignFormLabel/SignFormLabel";
import Success from "../CompSuccess/Success";
import Error from "../CompError/Error";
import SignButtons from "../SignButtons/SignButtons";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import Spinner from "../CompSpinner/Spinner";
import "./SignForm.scss";

export default function SignForm({
  setRecoveryPasswordForm,
  registerHandler,
  loginHandler,
  enableButton,
  email,
  password,
  authSuccess,
  authError,
  isAuth,
  authLoading,
  resetValidation,
  closeError,
}) {
  const [changeForm, setChangeForm] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (isAuth) {
      navigate(fromPage);
    }
  }, [isAuth, navigate, fromPage]);

  return (
    <div className="sign__form">
      <div className="sign__heading">{changeForm ? "Login" : "Register"}</div>
      <div className="sign__body">
        <div className="sign__notification">
          {authSuccess && (
            <Success
              text={authSuccess}
              closeError={() => {
                closeError();
              }}
            />
          )}
          {authError && (
            <Error
              text={authError}
              closeError={() => {
                closeError();
              }}
            />
          )}
        </div>
        {authLoading && <Spinner />}
        <SignFormLabel
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          resetValidation={resetValidation}
          email={email}
          password={password}
        />
        {changeForm ? (
          <SignInForm email={email} password={password} />
        ) : (
          <SignUpForm email={email} password={password} />
        )}
      </div>
      <div className="sign__recovery">
        <span
          className="sign__recovery__button"
          onClick={() => {
            setRecoveryPasswordForm(true);
          }}
        >
          Recover password
        </span>
      </div>
      <div className="sign__footer">
        <Link
          className="button close__button"
          to="/"
          onClick={() => {
            resetValidation(true, true);
          }}
        >
          Close
        </Link>
        <SignButtons
          changeForm={changeForm}
          resetValidation={resetValidation}
          loginHandler={loginHandler}
          registerHandler={registerHandler}
          enableButton={enableButton}
        />
      </div>
    </div>
  );
}
