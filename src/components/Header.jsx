import { CiSettings } from "react-icons/ci";
import { useState, useEffect } from "react";

import { addMpStatProducts } from "../redux/actions/mpStatProducts";
import { useDispatch } from "react-redux";
import { SettingsModal } from "../components";
import {
  featchCategories,
  featchCategoryProducts,
  featchMpStats,
} from "../api";

function Header({ token, setToken }) {
  const dispatch = useDispatch();

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

  const onClickCategory = async (category) => {
    // dispatch(addMpStatProducts(await featchCategoryProducts(category.path)));
    dispatch(addMpStatProducts(await featchMpStats()));
    setActiveCategory(category.path);
  };

  return (
    <div className="header-container">
      {token ? (
        <nav className="filter-navigation">
          <ul>
            {categories.map((category) => (
              <li key={category.path}>
                <a
                  className={activeCategory === category.path ? "active" : ""}
                  onClick={() => onClickCategory(category)}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <div></div>
      )}

      <div className="settings">
        <CiSettings onClick={openModal} />
      </div>
      {isModalOpen && (
        <SettingsModal
          setToken={setToken}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Header;
