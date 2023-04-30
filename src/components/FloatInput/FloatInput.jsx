import { motion } from "framer-motion";
import "./FloatInput.scss";

export default function FloatInput({
  className,
  label,
  onChange,
  onBlur,
  value,
  type,
}) {
  function undefinedCheck(func, e) {
    if (typeof func === "function") {
      return func(e);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`floating-input__body ${className}`}
    >
      <input
        type={type}
        className="floating-input__input"
        onChange={(e) => undefinedCheck(onChange, e)}
        onBlur={(e) => undefinedCheck(onBlur, e)}
        value={value}
      />
      <label
        className={
          value ? "floating-input__label typed" : "floating-input__label"
        }
      >
        {label}
      </label>
    </motion.div>
  );
}
