import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import styles from "./Main.module.scss";
import { NavBar } from "../../components";

const Main = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Опция 1", "Опция 2", "Опция 3", "Опция 4"];

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h3>Подбор товаров</h3>

      <NavBar />

      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.combobox}
      >
        <option value="" disabled>
          Категория
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.combobox}
      >
        <option value="" disabled>
          Инвестиции
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.combobox}
      >
        <option value="" disabled>
          Проценты годовых
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className={styles.combobox}
      >
        <option value="" disabled>
          Риск профиль
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button>Подобрать товары</button>

      <Routes>
        <Route path="table" element={<div>Таблица</div>} />
        <Route path="list" element={<div>Список</div>} />
        <Route path="cards" element={<div>Карточки</div>} />
        <Route path="risk-profile" element={<div>Риск профиль</div>} />
      </Routes>
    </div>
  );
};

export default Main;
