import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./store/user/checkTokenThunk/checkTokenThunk";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Sign from "./pages/Sign/Sign";
import NotFound from "./pages/NotFound/NotFound";
import RequiredAuth from "./hoc/RequiredAuth";
import Activated from "./pages/Activated/Activated";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route
        path="/profile"
        element={
          <RequiredAuth>
            <Profile />
          </RequiredAuth>
        }
      />
      <Route path="/login" element={<Sign />} />
      <Route path="/activated/" element={<Activated />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
