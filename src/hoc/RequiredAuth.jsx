import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { auth } from "../store/selectors/selectors";

export default function RequiredAuth({ children }) {
  const isAuth = useSelector(auth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <>{children}</>;
}
