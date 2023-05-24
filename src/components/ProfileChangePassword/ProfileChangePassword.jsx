import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../CompButton/Button";
import { useInput } from "../../helpers/email-password-validation/useInput";
import SignPasswordReq from "../SignPasswordRequirements/SignPasswordReq";
import { changePassword } from "../../store/user/changePassThunk/changePasswordThunk";
import { motion } from "framer-motion";
import FloatInput from "../CompFloatInput/FloatInput";
import PopUpContainer from "../CompPopUpContainer/PopUpContainer";
import "./ProfileChangePassword.scss";
import Error from "../CompError/Error";
import Success from "../CompSuccess/Success";
export default function ProfileChangePassword({
  setContent,
  authSuccess,
  authError,
  closeErrorHandler,
}) {
  const dispatch = useDispatch();
  const oldPassword = useInput("", {
    emptyError: true,
    minLength: 8,
  });
  const newPassword = useInput("", {
    emptyError: true,
    minLength: 8,
    oneNumber: true,
    oneLowCase: true,
    oneUpperCase: true,
    noSpaces: true,
  });

  const confirmPassword = useInput("");
  function changePasswordHandler() {
    setChangePasswordError("");
    if (newPassword.value === confirmPassword.value && newPassword.inputValid) {
      dispatch(
        changePassword({
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
        })
      );
      return;
    }
    setChangePasswordError("Passwords doens't match");
  }
  console.log(authSuccess);
  const [changePasswordError, setChangePasswordError] = useState("");
  return (
    <PopUpContainer>
      <div className="change-password">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="change-password__heading">Change Password</h3>
          {authSuccess && (
            <Success
              text={authSuccess}
              closeError={() => {
                closeErrorHandler();
              }}
            />
          )}
          {authError && (
            <Error
              text={authError}
              closeError={() => {
                closeErrorHandler();
              }}
            />
          )}
          {changePasswordError && (
            <Error
              text={changePasswordError}
              closeError={() => setChangePasswordError("")}
            />
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <FloatInput
              type="password"
              label="Old Password"
              onChange={(e) => oldPassword.onChange(e.target.value)}
              onBlur={() => oldPassword.onBlur()}
              value={oldPassword.value}
            />
            <FloatInput
              type="password"
              label="New Password"
              onChange={(e) => newPassword.onChange(e.target.value)}
              onBlur={() => newPassword.onBlur()}
              value={newPassword.value}
            ></FloatInput>
            <SignPasswordReq password={{ ...newPassword }} />

            <FloatInput
              type="password"
              label="Repeat password"
              onChange={(e) => confirmPassword.onChange(e.target.value)}
              onBlur={() => confirmPassword.onBlur()}
              value={confirmPassword.value}
            />
            <div className="change-password__buttons">
              <Button
                onClick={() => {
                  setContent(false);
                }}
                text="Close"
                className="change-password__close"
              />
              <Button
                className="change-password__submit"
                onClick={() => {
                  changePasswordHandler();
                }}
                text="Change password"
              />
            </div>
          </form>
        </motion.div>
      </div>
    </PopUpContainer>
  );
}
