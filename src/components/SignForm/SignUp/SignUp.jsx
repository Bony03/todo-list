import PasswordReq from "../PasswordRequirements/PasswordReq";
import FloatInput from "../../FloatInput/FloatInput";

export default function SignUp({ email, password }) {
  return (
    <form>
      <FloatInput
        type="email"
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={() => email.onBlur()}
        value={email.value}
        label="Enter your email"
      />
      {email.isBlur && !email.inputValid && (
        <div variant="none" className="small error">
          <p className="m-0 error__parag">
            Incorrect email format. Please, enter correct email!
          </p>
        </div>
      )}

      <FloatInput
        type="password"
        label="Create password"
        onChange={(e) => password.onChange(e.target.value)}
        onBlur={() => password.onBlur()}
        value={password.value}
      />
      <PasswordReq password={{ ...password }} />
    </form>
  );
}
