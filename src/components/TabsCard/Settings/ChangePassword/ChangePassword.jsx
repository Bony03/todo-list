import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useInput } from "../../../../helpers/email-password-validation/useInput";
import PasswordReq from "../../../SignForm/PasswordRequirements/PasswordReq";
import { changePassword } from "../../../../store/user/changePassThunk/changePasswordThunk";
import { motion } from "framer-motion";
export default function Settings() {
  const dispatch = useDispatch();
  const [passMatches, setPassMatches] = useState(false);
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
  function changePasswordHandler(oldPassword, newPassword) {
    dispatch(changePassword({ oldPassword, newPassword }));
  }
  useEffect(() => {
    if (newPassword.value === confirmPassword.value && newPassword.inputValid) {
      setPassMatches(true);
    } else {
      setPassMatches(false);
    }
  }, [newPassword.value, confirmPassword.value]);
  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label="Old Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Old Password"
            onChange={(e) => oldPassword.onChange(e)}
            onBlur={() => oldPassword.onBlur()}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="New Password">
          <Form.Control
            type="password"
            placeholder="New Password"
            onChange={(e) => newPassword.onChange(e)}
            onBlur={() => newPassword.onBlur()}
          />
          <PasswordReq password={{ ...newPassword }} />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Repeat password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Repeat password"
            onChange={(e) => confirmPassword.onChange(e)}
            onBlur={() => confirmPassword.onBlur()}
          />
        </FloatingLabel>
        <Button
          onClick={() => {
            changePasswordHandler(oldPassword.value, confirmPassword.value);
          }}
          disabled={!passMatches}
        >
          Change password
        </Button>
      </Form>
    </motion.div>
  );
}
