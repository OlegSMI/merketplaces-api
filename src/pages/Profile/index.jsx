import { logout } from "@api/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";

const Profile = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.animation}>
      <button onClick={logoutHandler}>Выйти</button>
    </div>
  );
};

export default Profile;
