import SignPasswordReq from "../SignPasswordRequirements/SignPasswordReq";
import FloatInput from "../CompFloatInput/FloatInput";

export default function SignInForm({ email, password }) {
  return (
    <form>
      <FloatInput
        type="email"
        label="Email"
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={() => email.onBlur()}
        value={email.value}
      />
      {email.isBlur && !email.inputValid && (
        <div className="password-req">
          <p className="password-req__error">
            Incorrect email format. Please, enter correct email!
          </p>
        </div>
      )}

      <FloatInput
        type="password"
        label="Password"
        onChange={(e) => password.onChange(e.target.value)}
        onBlur={() => password.onBlur()}
        value={password.value}
      />
      <SignPasswordReq password={{ ...password }} />
    </form>
  );
}
