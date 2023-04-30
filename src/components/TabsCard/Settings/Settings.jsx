import ChangePassword from "./ChangePassword/ChangePassword";
import SetPersonalInfo from "./SetPersonalInfo/SetPersonalInfo";
import { useSelector } from "react-redux";
export default function Settings() {
  const name = useSelector((state) => state.user.name);
  return (
    <>
      {!name && <SetPersonalInfo />}

      <ChangePassword />
    </>
  );
}
