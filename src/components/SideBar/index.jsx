import { Link } from "react-router-dom";

import styles from "./SideBar.module.scss";

import userPhoto from "../../assets/UserPhoto.png";
import logo from "../../assets/logo.png";
import main from "../../assets/main.svg";
import finplan from "../../assets/finplan.svg";
import profile from "../../assets/profile.svg";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>UStats</span>
      </div>
      <ui>
        <li className={`${styles.sidebarItem} ${styles.active}`}>
          <Link to="/user/main/table" className={styles.link}>
            <img src={main} />
            <span>Главная</span>
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link to="/user/finplan" className={styles.link}>
            <img src={finplan} />
            Фин план
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link to="/user/profile" className={styles.link}>
            <img src={profile} />
            Профиль
          </Link>
        </li>
      </ui>
      <div className={styles.userInfo}>
        <img src={userPhoto} alt="User" className={styles.userPhoto} />
        <div className={styles.name}>
          <p className={styles.title}>Алекс Вилкинс</p>
          <p className={styles.text}>@vilkins</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
