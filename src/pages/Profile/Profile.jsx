import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
export default function Profile() {
  const isAuth = useSelector((state) => state.system.isAuth);

  return (
    <>
      <Header isAuth={isAuth} />

      <ProfileInfo />
    </>
  );
}
