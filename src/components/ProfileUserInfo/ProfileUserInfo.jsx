import React, { useEffect, useState } from "react";
import { dateFormatter } from "../../helpers/dateFormat/dateFormatter";
import { AnimatePresence, motion } from "framer-motion";
import Error from "../CompError/Error";
import Button from "../CompButton/Button";
import LogOut from "../ProfileLogOut/ProfileLogOut";
import FloatInput from "../CompFloatInput/FloatInput";
import "./ProfileUserInfo.scss";
import Success from "../CompSuccess/Success";
export default function ProfileUserInfo({
  setContent,
  profError,
  profSuccess,
  user,
  input,
  setInput,
  uploadHandler,
  logOutHandler,
  closeErrorHandler,
  setNameHandler,
}) {
  const [regDate, setRegDate] = useState("");

  useEffect(() => {
    if (user.regDate) {
      setRegDate(dateFormatter(user.regDate));
    }
  }, [user.regDate]);
  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <div className="profile__notification">
            {profError && (
              <Error
                y="-10"
                text={profError}
                closeError={() => {
                  closeErrorHandler();
                }}
              />
            )}
            {profSuccess && (
              <Success
                text={profSuccess}
                closeError={() => {
                  closeErrorHandler();
                }}
              />
            )}
          </div>
          <motion.div
            className="profile__info"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h5 className="profile__title">Profile information</h5>
            <div
              className={!user.name ? "profile__list" : "profile__list entered"}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNameHandler(input.name, input.surname);
                  closeErrorHandler();
                  setInput({ name: "", surname: "" });
                }}
              >
                <div className="profile__item">
                  name:
                  {!user.name ? (
                    <FloatInput
                      label="Enter surname"
                      className="profile__input"
                      type="text"
                      value={input.name}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          name: e.target.value,
                          button: input.name && input.surname ? true : false,
                        })
                      }
                      onBlur={() =>
                        setInput({
                          ...input,
                          button: input.name && input.surname ? true : false,
                        })
                      }
                    />
                  ) : (
                    <span className="profile__item__span">{user.name}</span>
                  )}
                </div>
                <div className="profile__item">
                  surname:
                  {!user.surname ? (
                    <FloatInput
                      label="Enter surname"
                      className="profile__input"
                      type="text"
                      value={input.surname}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          surname: e.target.value,
                          button: input.name && input.surname ? true : false,
                        })
                      }
                      onBlur={() =>
                        setInput({
                          ...input,
                          button: input.name && input.surname ? true : false,
                        })
                      }
                    />
                  ) : (
                    <span className="profile__item__span">{user.surname}</span>
                  )}
                </div>
                <AnimatePresence>
                  {input.button && (
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="profile__save-body"
                    >
                      <button
                        type="submit"
                        className="button main-buttons__save-todos profile__save"
                      >
                        Save
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              <div className="profile__item">
                email:<span className="profile__item__span">{user.email}</span>
              </div>
              <div className="profile__upload">
                <input
                  type="file"
                  className="profile__upload-image"
                  accept="image/*,.png,.jpg,.gif,.web,.jpeg"
                  onChange={(e) => uploadHandler(e.target.files[0])}
                />
              </div>
            </div>

            <div className="profile__settings">
              <h5 className="profile__title">Settings</h5>
              <Button
                text="Change password"
                className="profile__change-password"
                onClick={() => setContent(true)}
              />
            </div>
            <span className="profile__reg-date">
              registration date:{regDate}
            </span>
            <div className="profile__logout">
              <LogOut onClick={() => logOutHandler()} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
