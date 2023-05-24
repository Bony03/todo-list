import { motion } from "framer-motion";
import "./PopUpContainer.scss";
export default function PopUpContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="popup"
    >
      <div className="popup__container">
        <div className="popup__body">{children}</div>
      </div>
    </motion.div>
  );
}
