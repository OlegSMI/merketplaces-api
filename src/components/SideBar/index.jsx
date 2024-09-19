import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./SideBar.module.scss";

import userPhoto from "../../assets/UserPhoto.png";
import logo from "../../assets/sidebar/logo.png";
import main from "../../assets/sidebar/main.svg";
import finplan from "../../assets/sidebar/finplan.svg";
import profile from "../../assets/sidebar/profile.svg";

const SideBar = () => {
  const [active, setActive] = useState("/main");

  const menuLinkClick = (path) => {
    setActive(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <Link to={"/user/main/table"} onClick={() => menuLinkClick("/main")}>
          <span>UStats</span>
        </Link>
      </div>
      <ui>
        <li className={active === "/main" ? styles.active : ""}>
          <Link
            to="/user/main/table"
            className={styles.link}
            onClick={() => menuLinkClick("/main")}
          >
            <img src={main} />
            <span>Главная</span>
          </Link>
        </li>
        <li className={active === "/finplan" ? styles.active : ""}>
          <Link
            to="/user/finplan"
            className={styles.link}
            onClick={() => menuLinkClick("/finplan")}
          >
            <img src={finplan} />
            Фин план
          </Link>
        </li>
        <li className={active === "/profile" ? styles.active : ""}>
          <Link
            to="/user/profile"
            className={styles.link}
            onClick={() => menuLinkClick("/profile")}
          >
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
