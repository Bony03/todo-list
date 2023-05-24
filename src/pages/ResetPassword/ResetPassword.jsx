import { useLocation, useNavigate } from "react-router-dom";
import { useInput } from "../../helpers/email-password-validation/useInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authEr, authSc, loading } from "../../store/selectors/selectors";
import { recoverPassword } from "../../store/user/recoverPassThunk/recoverPassThunk";
import FloatInput from "../../components/CompFloatInput/FloatInput";
import Button from "../../components/CompButton/Button";
import PopUpContainer from "../../components/CompPopUpContainer/PopUpContainer";
import Error from "../../components/CompError/Error";
import Spinner from "../../components/CompSpinner/Spinner";
import "./ResetPassword.scss";
import SignPasswordReq from "../../components/SignPasswordRequirements/SignPasswordReq";
import { clearAllNotifications } from "../../store/system/system.slice";
import Success from "../../components/CompSuccess/Success";
export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = location.pathname.split("/")[2];
  const spinnerLoading = useSelector(loading);
  const authError = useSelector(authEr);
  const authSuccess = useSelector(authSc);
  const newPassword = useInput("", {
    emptyError: true,
    minLength: 8,
    oneNumber: true,
    oneLowCase: true,
    oneUpperCase: true,
    noSpaces: true,
  });
  const repeatPassword = useInput("", {
    emptyError: true,
    minLength: 8,
    oneNumber: true,
    oneLowCase: true,
    oneUpperCase: true,
    noSpaces: true,
  });
  const [resetError, setResetError] = useState("");
  function submitHandler() {
    setResetError("");
    if (newPassword.value === repeatPassword.value && newPassword.inputValid) {
      dispatch(
        recoverPassword({
          token,
          password: repeatPassword.value,
        })
      );
      return;
    }
    setResetError("Passwords does not match!");
  }
  function cancelHandler() {
    setResetError("");
    navigate("/");
  }
  function closeErrorHandler() {
    dispatch(clearAllNotifications());
  }
  return (
    <div className="reset-password">
      <div className="reset-password__container">
        <div className="sign__brand reset-password__brand">
          Todo<span>List</span>
        </div>
        <PopUpContainer>
          {spinnerLoading && <Spinner />}
          <h3 className="reset-password__heading">Reset Password</h3>
          {authSuccess && (
            <Success
              text={authSuccess}
              closeError={() => {
                closeErrorHandler("");
              }}
            />
          )}
          {authError && (
            <Error
              text={authError}
              closeError={() => {
                closeErrorHandler("");
              }}
            />
          )}
          {resetError && (
            <Error
              text={resetError}
              closeError={() => {
                setResetError("");
              }}
            />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FloatInput
              label="New password"
              type="password"
              value={newPassword.value}
              onBlur={() => {
                newPassword.onBlur();
              }}
              onChange={(e) => {
                newPassword.onChange(e.target.value);
              }}
            />
            <SignPasswordReq password={newPassword} />
            <FloatInput
              label="Repeat new password"
              type="password"
              value={repeatPassword.value}
              onBlur={() => {
                repeatPassword.onBlur();
              }}
              onChange={(e) => {
                repeatPassword.onChange(e.target.value);
              }}
            />
            <div className="reset-password__buttons">
              <Button
                className="reset-password__close"
                text="Cancel"
                onClick={() => {
                  cancelHandler();
                }}
              />
              <Button
                className="reset-password__submit"
                text="Reset Password"
                onClick={() => {
                  submitHandler();
                }}
              />
            </div>
          </form>
        </PopUpContainer>
      </div>
    </div>
  );
}
