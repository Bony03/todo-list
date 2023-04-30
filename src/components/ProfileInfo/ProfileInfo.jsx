import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../helpers/dateFormat/dateFormatter";
import { uploadPhoto } from "../../store/user/uploadPhotoThunk/uploadPhotoThunk";
import { photoHandler } from "../../helpers/photoHandler/photoHandler";
import { motion } from "framer-motion";
import Error from "../Error/Error";
import Settings from "../TabsCard/Settings/Settings";
import "./ProfileInfo.scss";
import LogOut from "../LogOut/LogOut";
import { logOut } from "../../store/user/user.slice";
export default function Profile() {
  const ref = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.file) {
      photoHandler(user.file, ref);
    }
  }, [user.file]);
  return (
    <>
      <div className="profile__notification">
        {!user.name && <Error y="-10" text={`Need to set data in Settings`} />}
      </div>
      <div className="profile">
        <motion.div
          className={user.file ? "profile__image" : "profile__image skeleton"}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                dispatch(uploadPhoto(e.target.files[0]));
              }
            }}
            accept="image/*"
          ></input>
          <img ref={ref} src="" alt="" />
        </motion.div>
        <motion.div
          className="profile__info"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h5 className="profile__title">Profile information</h5>
          <ul className="profile__list">
            <li className="profile__item">
              <span>name:</span> {user.name}
            </li>
            <li className="profile__item">
              <span>surname:</span> {user.surname}
            </li>
            <li className="profile__item">
              <span>email:</span> {user.email}
            </li>
          </ul>
          <span className="profile__reg-date">
            registration date:{dateFormatter(user.regDate)}
          </span>
          <div className="profile__settings">
            <h5 className="profile__title">Settings</h5>
            <Settings />
          </div>
          <div className="profile__logout">
            <LogOut onClick={() => dispatch(logOut())} />
          </div>
        </motion.div>
      </div>
    </>
  );
}
