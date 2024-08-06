import { CiSettings } from "react-icons/ci";
import { useState } from "react";

import { SettingsModal } from "../components";

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="header-container">
      <nav className="filter-navigation">
        <ul>
          <li>
            <a>Все</a>
          </li>
          <li>
            <a>Электроника</a>
          </li>
          <li>
            <a>Одежда</a>
          </li>
          <li>
            <a>Для дома</a>
          </li>
          <li>
            <a>Игрушки</a>
          </li>
        </ul>
      </nav>
      <div className="settings">
        <CiSettings onClick={openModal} />
      </div>

      <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Header;
