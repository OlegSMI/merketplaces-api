import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SideBar.module.scss";

import userPhoto from "../../assets/UserPhoto.png";
import finplan from "../../assets/sidebar/finplan.svg";
import logo from "../../assets/sidebar/logo.png";
import main from "../../assets/sidebar/main.svg";
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
      <ul>
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
      </ul>
      <Link
        to={"/user/profile"}
        className={styles.userInfo}
        onClick={() => menuLinkClick("/profile")}
      >
        <img src={userPhoto} alt="User" className={styles.userPhoto} />
        <div>
          <p className={styles.title}>Пользователь</p>
          <p className={styles.text}>@user</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
