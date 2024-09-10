import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [active, setActive] = useState("/table");

  const handleLinkClick = (path) => {
    setActive(path);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={active === "/table" ? styles.active : ""}>
          <Link to="/user/main/table" onClick={() => handleLinkClick("/table")}>
            Таблица
          </Link>
        </li>
        <li className={active === "/list" ? styles.active : ""}>
          <Link to="/user/main/list" onClick={() => handleLinkClick("/list")}>
            Список
          </Link>
        </li>
        <li className={active === "/cards" ? styles.active : ""}>
          <Link to="/user/main/cards" onClick={() => handleLinkClick("/cards")}>
            Карточки
          </Link>
        </li>
        <li className={active === "/risk-profile" ? styles.active : ""}>
          <Link
            to="/user/main/risk-profile"
            onClick={() => handleLinkClick("/risk-profile")}
          >
            Риск профиль
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
