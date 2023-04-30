import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Sign from "./pages/Sign/Sign";
import NotFound from "./components/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./store/user/checkTokenThunk/checkTokenThunk";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("render");
    dispatch(checkToken());
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signIn" element={<Sign />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
