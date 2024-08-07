import { CiSettings } from "react-icons/ci";
import { useState, useEffect } from "react";

import { SettingsModal } from "../components";
import { featchCategories } from "../api";

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await featchCategories());
    };
    fetchData();
  }, []);

  console.log(categories);

  return (
    <div className="header-container">
      <nav className="filter-navigation">
        <ul>
          {categories.map((category) => (
            <li key={category.path}>
              <a
                className={activeCategory === category.path ? "active" : ""}
                onClick={() => setActiveCategory(category.path)}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="settings">
        <CiSettings onClick={openModal} />
      </div>
      {isModalOpen && (
        <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}

export default Header;
