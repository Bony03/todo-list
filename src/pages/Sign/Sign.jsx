import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestRecovery } from "../../store/user/requestPasswordThunk/requestPasswordThunk";
import { useInput } from "../../helpers/email-password-validation/useInput";
import { registerUser } from "../../store/user/registerThunk/registerThunk";
import { loginUser } from "../../store/user/loginThunk/loginThunk";
import { authSc, loading, authEr, auth } from "../../store/selectors/selectors";
import { clearAllNotifications } from "../../store/system/system.slice";
import SignForm from "../../components/SignForm/SignForm";
import SignRecoveryForm from "../../components/SignRecoveryForm/SignRecoveryForm";
import "./Sign.scss";

export default function Sign() {
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
  const authLoading = useSelector(loading);
  const authSuccess = useSelector(authSc);
  const authError = useSelector(authEr);
  const isAuth = useSelector(auth);
  const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    setEnableButton(email.inputValid && password.inputValid);
  }, [email.inputValid, password.inputValid]);
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

  function recoveryHandler(email) {
    dispatch(requestRecovery(email));
  }
  function closeErrorHandler() {
    dispatch(clearAllNotifications());
  }
  return (
    <div className="sign">
      <div className="sign__container">
        <div className="sign__brand">
          Todo<span>List</span>
        </div>
        {!recoveryPasswordForm ? (
          <SignForm
            setRecoveryPasswordForm={setRecoveryPasswordForm}
            registerHandler={registerHandler}
            loginHandler={loginHandler}
            enableButton={enableButton}
            email={email}
            password={password}
            authSuccess={authSuccess}
            authError={authError}
            isAuth={isAuth}
            authLoading={authLoading}
            resetValidation={resetValidation}
            closeError={closeErrorHandler}
          />
        ) : (
          <SignRecoveryForm
            email={email}
            authError={authError}
            authSuccess={authSuccess}
            setRecoveryPasswordForm={setRecoveryPasswordForm}
            recoveryHandler={recoveryHandler}
            closeError={closeErrorHandler}
            authLoading={authLoading}
          />
        )}
      </div>
    </div>
  );
}
