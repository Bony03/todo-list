import "./Button.scss";

export default function SignButton({ className, text, onClick, disabled }) {
  if (disabled) {
    return (
      <button
        className={`button ${className}`}
        onClick={onClick}
        disabled={!disabled}
      >
        {text}
      </button>
    );
  }
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
