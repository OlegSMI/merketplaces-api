import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";

import { useDispatch } from "react-redux";
import { featchCategories, featchCategoryProducts } from "../api";
import { SettingsModal } from "../components";
import { addMpStatProducts } from "../redux/actions/mpStatProducts";

function Header({ token, setToken, setLoader }) {
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
    setActiveCategory(category.path);
    setLoader(true);
    dispatch(addMpStatProducts(await featchCategoryProducts(category.path)));
    // dispatch(addMpStatProducts(await featchMpStats()));
    setLoader(false);
  };

  return (
    <div className="header-container">
      {token ? (
        <nav className="filter-navigation">
          <ul>
            {Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((category) => (
                <li key={category.path}>
                  <a
                    className={activeCategory === category.path ? "active" : ""}
                    onClick={() => onClickCategory(category)}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            {categories.length === 0 && <li>Категории отсутствуют</li>}
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
