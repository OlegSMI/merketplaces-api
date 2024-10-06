import { logout } from "@api/auth";
import { Tooltip } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SideBar.module.scss";

import userPhoto from "@assets/UserPhoto.png";
import logoutImg from "@assets/auth/logout.png";
import categories from "@assets/sidebar/categories.png";
import collecting from "@assets/sidebar/collecting.png";
import logo from "@assets/sidebar/rocketseller-logo.png";
import main from "@assets/sidebar/main.svg";

const SideBar = () => {
  // И тут вернуть на главную когда будут остальные страницы
  const [active, setActive] = useState("/collecting");

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
        {/* Вернуть путь на главную обратно  */}
        <Link to={"/admin/collecting"} onClick={() => menuLinkClick("/main")}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul>
        {/* <li className={active === "/main" ? styles.active : ""}>
          <Link
            to="/admin/main/table"
            className={styles.link}
            onClick={() => menuLinkClick("/main")}
          >
            <img src={main} />
            <span>Главная</span>
          </Link>
        </li> */}
        {/* <li className={active === "/categories" ? styles.active : ""}>
          <Link
            to="/admin/categories"
            className={styles.link}
            onClick={() => menuLinkClick("/categories")}
          >
            <img src={categories} />
            Категории
          </Link>
        </li> */}

        <li className={active === "/collecting" ? styles.active : ""}>
          <Link
            to="/admin/collecting"
            className={styles.link}
            onClick={() => menuLinkClick("/collecting")}
          >
            <img src={collecting} />
            Сбор товаров
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
