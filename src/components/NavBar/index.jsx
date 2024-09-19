import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [active, setActive] = useState("/table");

  useEffect(() => {
    setActive("/" + window.location.href.split("/").pop());
  }, [window.location.href]);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={active === "/table" ? styles.active : ""}>
          <Link to="/user/main/table">Таблица</Link>
        </li>
        <li className={active === "/list" ? styles.active : ""}>
          <Link to="/user/main/list">Список</Link>
        </li>
        <li className={active === "/cards" ? styles.active : ""}>
          <Link to="/user/main/cards">Карточки</Link>
        </li>
        <li className={active === "/risk-profile" ? styles.active : ""}>
          <Link to="/user/main/risk-profile">Риск профиль</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
