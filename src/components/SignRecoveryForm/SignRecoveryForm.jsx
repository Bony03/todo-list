import "./SignRecoveryForm.scss";
import FloatInput from "../CompFloatInput/FloatInput";
import Button from "../CompButton/Button";
import Error from "../CompError/Error";
import Success from "../CompSuccess/Success";
import Spinner from "../CompSpinner/Spinner";

export default function SignRecoveryForm({
  email,
  setRecoveryPasswordForm,
  recoveryHandler,
  closeError,
  authError,
  authSuccess,
  authLoading,
}) {
  return (
    <div className="recovery">
      {authLoading && <Spinner />}
      <h3 className="recovery__heading">Password Recovery</h3>
      {authSuccess && (
        <Success text={authSuccess} closeError={() => closeError()} />
      )}
      {authError && <Error text={authError} closeError={() => closeError()} />}
      <FloatInput
        type="email"
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={() => email.onBlur()}
        value={email.value}
        label="Enter email"
      />
      <div className="recovery__buttons">
        <Button
          className="recovery__close"
          text="Close"
          onClick={() => {
            setRecoveryPasswordForm(false);
          }}
        />
        <Button
          className="recovery__submit"
          text="Recover"
          onClick={() => {
            recoveryHandler(email.value);
          }}
        />
      </div>
    </div>
  );
}
