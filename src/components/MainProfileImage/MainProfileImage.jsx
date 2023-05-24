import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { file } from "../../store/selectors/selectors";
import { useNavigate } from "react-router-dom";
import { photoHandler } from "../../helpers/photoHandler/photoHandler";
import "./MainProfileImage.scss";

export default function ProfileImage() {
  const navigate = useNavigate();
  const userFile = useSelector(file);
  const ref = useRef();
  useEffect(() => {
    if (userFile) {
      photoHandler(userFile, ref);
    }
  }, [userFile]);

  return (
    <div className="main-profile-image">
      <div className="main-profile-image__container">
        <div className="main-profile-image__body">
          <div
            className={
              userFile
                ? "main-profile-image__image"
                : "main-profile-image__image skeleton"
            }
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img ref={ref} src="" alt="profile image" />
          </div>
        </div>
      </div>
    </div>
  );
}
