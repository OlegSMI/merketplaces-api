import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [active, setActive] = useState("/table");
  const location = useLocation();

  useEffect(() => {
    setActive("/" + location.pathname.split("/").pop());
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={active === "/table" ? styles.active : ""}>
          <Link to="/admin/main/table">Таблица</Link>
        </li>
        <li className={active === "/list" ? styles.active : ""}>
          <Link to="/admin/main/list">Список</Link>
        </li>
        <li className={active === "/cards" ? styles.active : ""}>
          <Link to="/admin/main/cards">Карточки</Link>
        </li>
        <li className={active === "/risk-profile" ? styles.active : ""}>
          <Link to="/admin/main/risk-profile">Риск профиль</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
