import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Forms from "./Forms/Forms";
import Success from "../Success/Success";
import Error from "../Error/Error";
import { useInput } from "../../helpers/email-password-validation/useInput";
import { registerUser } from "../../store/user/registerThunk/registerThunk";
import { loginUser } from "../../store/user/loginThunk/loginThunk";
import { authSc, loading, authEr, auth } from "../../store/selectors/selectors";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { scrollLocker } from "../../helpers/scrollLocker/scrollLocker";
import "./SignForm.scss";
import SignButtons from "./SignButtons/SignButtons";
export default function SignForm() {
  const [changeForm, setChangeForm] = useState(true);
  const dispatch = useDispatch();
  const email = useInput("", {
    emptyError: true,
    emailError: true,
    noSpaces: true,
  });
  const password = useInput("", {
    emptyError: true,
    minLength: 8,
    oneNumber: true,
    oneLowCase: true,
    oneUpperCase: true,
    noSpaces: true,
  });

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(email.inputValid && password.inputValid);
  }, [email.inputValid, password.inputValid]);
  const authLoading = useSelector(loading);
  const authSuccess = useSelector(authSc);
  const authError = useSelector(authEr);
  const isAuth = useSelector(auth);
  const navigate = useNavigate();
  const resetValidation = (resetEmail, resetPassword) => {
    if (resetEmail) {
      email.setBlur(false);
      email.setValue("");
    }
    if (resetPassword) {
      password.setBlur(false);
      password.setValue("");
    }
  };
  function loginHandler() {
    dispatch(loginUser({ email: email.value, password: password.value }));
  }
  function registerHandler() {
    dispatch(registerUser({ email: email.value, password: password.value }));
  }
  useEffect(() => {
    if (isAuth) {
      scrollLocker();
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className="sign__form">
      <div className="sign__heading">{changeForm ? "Login" : "Register"}</div>
      <div className="sign__body">
        <div className="sign__notification">
          {authSuccess && <Success text={authSuccess} />}
          {authError && <Error text={authError} />}
        </div>

        <Forms
          changeForm={changeForm}
          setChangeForm={setChangeForm}
          resetValidation={resetValidation}
          email={email}
          password={password}
        />
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
