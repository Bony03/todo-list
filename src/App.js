import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Sign from "./pages/Sign/Sign";
import NotFound from "./components/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./store/user/checkTokenThunk/checkTokenThunk";
import RequiredAuth from "./hoc/RequiredAuth";

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
