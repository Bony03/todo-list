import { motion } from "framer-motion";
import "./Error.scss";
export default function Error({ text, y }) {
  if (y) {
    return (
      <motion.div
        initial={{ opacity: 0, y: y }}
        animate={{ opacity: 1, y: 0 }}
        className="error-alert"
      >
        <div className="error-alert__text">{text}</div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="error-alert"
    >
      <div className="error-alert__text">{text}</div>
    </motion.div>
  );
}
