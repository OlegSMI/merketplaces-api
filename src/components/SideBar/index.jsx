import { logout } from "@api/auth";
import { Tooltip } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SideBar.module.scss";

import userPhoto from "@assets/UserPhoto.png";
import logoutImg from "@assets/auth/logout.png";
import categories from "@assets/sidebar/categories.png";
import logo from "@assets/sidebar/logo.png";
import main from "@assets/sidebar/main.svg";

const SideBar = () => {
  const [active, setActive] = useState("/main");

  const navigate = useNavigate();

  const menuLinkClick = (path) => {
    setActive(path);
  };

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <Link to={"/admin/main/table"} onClick={() => menuLinkClick("/main")}>
          <span>UStats</span>
        </Link>
      </div>
      <ul>
        <li className={active === "/main" ? styles.active : ""}>
          <Link
            to="/admin/main/table"
            className={styles.link}
            onClick={() => menuLinkClick("/main")}
          >
            <img src={main} />
            <span>Главная</span>
          </Link>
        </li>
        <li className={active === "/categories" ? styles.active : ""}>
          <Link
            to="/admin/categories"
            className={styles.link}
            onClick={() => menuLinkClick("/categories")}
          >
            <img src={categories} />
            Категории
          </Link>
        </li>
        <li className={active === "/collect-goods" ? styles.active : ""}>
          <Link
            to="/admin/collect-goods"
            className={styles.link}
            onClick={() => menuLinkClick("/collect-goods")}
          >
            <img src={main} />
            <span>Сбор товаров</span>
          </Link>
        </li>
        {/* <li className={active === "/profile" ? styles.active : ""}>
          <Link
            to="/user/profile"
            className={styles.link}
            onClick={() => menuLinkClick("/profile")}
          >
            <img src={profile} />
            Профиль
          </Link>
        </li> */}
      </ul>
      <div className={styles.userInfo}>
        <img src={userPhoto} alt="User" className={styles.userPhoto} />
        <div>
          <p className={styles.title}>Пользователь</p>
          <p className={styles.text}>@admin</p>
        </div>
        <button className={styles.logout} onClick={logoutHandler}>
          <Tooltip title="Выйти" placement="top">
            <img src={logoutImg} alt="logout" />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
