import { motion } from "framer-motion";
import "./Success.scss";
export default function Success({ text, y, closeError }) {
  if (y) {
    return (
      <motion.div
        initial={{ opacity: 0, y: y }}
        animate={{ opacity: 1, y: 0 }}
        className="success-alert"
      >
        <div className="success-alert__text">
          {text}
          <span onClick={closeError}></span>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="success-alert"
    >
      <div className="success-alert__text">
        {text}
        <span onClick={closeError}></span>
      </div>
    </motion.div>
  );
}
