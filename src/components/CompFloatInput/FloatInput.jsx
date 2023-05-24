import "./FloatInput.scss";

export default function FloatInput({
  className,
  label,
  onChange,
  onBlur,
  value,
  type,
  backColor,
}) {
  function undefinedCheck(func, e) {
    if (typeof func === "function") {
      return func(e);
    }
  }
  return (
    <div className={`floating-input__body ${className}`}>
      <input
        type={type}
        className={
          value ? "floating-input__input typed" : "floating-input__input"
        }
        onChange={(e) => undefinedCheck(onChange, e)}
        onBlur={(e) => undefinedCheck(onBlur, e)}
        value={value}
      />
      <label
        className="floating-input__label"
        style={{
          backgroundColor: backColor,
        }}
      >
        {label}
      </label>
    </div>
  );
}
