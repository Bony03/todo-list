import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPhoto } from "../../store/user/uploadPhotoThunk/uploadPhotoThunk";
import { logOut } from "../../store/user/user.slice";
import {
  systemLogOut,
  clearAllNotifications,
} from "../../store/system/system.slice";
import {
  profileEr,
  user,
  auth,
  authEr,
  authSc,
  profileSc,
} from "../../store/selectors/selectors";
import { setPersonalInfo } from "../../store/user/setPersonalInfoThunk/setPersonalInfo";
import Header from "../../components/CompHeader/Header";
import ProfileUserInfo from "../../components/ProfileUserInfo/ProfileUserInfo";
import MainImage from "../../components/MainImage/MainImage";
import MainProfileImage from "../../components/MainProfileImage/MainProfileImage";
import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(auth);
  const userInfo = useSelector(user);
  const profError = useSelector(profileEr);
  const profSuccess = useSelector(profileSc);
  const authError = useSelector(authEr);
  const authSuccess = useSelector(authSc);
  const [input, setInput] = useState({ name: "", surname: "" });
  const [content, setContent] = useState(false);
  function uploadHandler(photo) {
    dispatch(uploadPhoto(photo));
  }
  function logOutHandler() {
    dispatch(logOut());
    dispatch(systemLogOut());
  }
  function closeErrorHandler() {
    dispatch(clearAllNotifications());
  }
  function setNameHandler(name, surname) {
    dispatch(
      setPersonalInfo({
        name,
        surname,
      })
    );
  }
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Header isAuth={isAuth} />
      <MainImage />
      <MainProfileImage />
      <ProfileUserInfo
        setContent={setContent}
        profError={profError}
        profSuccess={profSuccess}
        user={userInfo}
        input={input}
        setInput={setInput}
        uploadHandler={uploadHandler}
        logOutHandler={logOutHandler}
        closeErrorHandler={closeErrorHandler}
        setNameHandler={setNameHandler}
      />
      {content && (
        <ProfileChangePassword
          authSuccess={authSuccess}
          authError={authError}
          closeErrorHandler={closeErrorHandler}
          setContent={setContent}
        />
      )}
    </>
  );
}
