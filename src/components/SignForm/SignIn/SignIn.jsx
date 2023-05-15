import PasswordReq from "../PasswordRequirements/PasswordReq";
import FloatInput from "../../FloatInput/FloatInput";

export default function SignIn({ email, password }) {
  return (
    <form>
      <FloatInput
        type="email"
        label="Email"
        onChange={email.onChange}
        onBlur={email.onBlur}
        value={email.value}
      />
      {email.isBlur && !email.inputValid && (
        <div className="password-req">
          <p className=" password-req__error">
            Incorrect email format. Please, enter correct email!
          </p>
        </div>
      )}

      <FloatInput
        type="password"
        label="Password"
        onChange={password.onChange}
        onBlur={password.onBlur}
        value={password.value}
      />
      <PasswordReq password={{ ...password }} />
    </form>
  );
}
