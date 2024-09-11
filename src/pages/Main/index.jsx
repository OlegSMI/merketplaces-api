import { Routes, Route } from "react-router-dom";

import styles from "./Main.module.scss";
import { NavBar, Combobox } from "../../components";

const categories = [
  "Электроника",
  "Мебель",
  "Товары для детей",
  "Бытовая химия",
  "Системы стабилизации",
  "Штативы/слайдеры",
];

const options = ["Отция 1", "Отция 2"];
const filter = ["По дате", "По цене"];

const Main = () => {
  return (
    <>
      <h3>Подбор товаров</h3>

      <NavBar />

      <div className={styles.header}>
        <div className={styles.filters}>
          <Combobox name="Категория" options={categories} />
          <Combobox name="Инвестиции" options={options} />
          <Combobox name="Проценты годовых" options={options} />
          <Combobox name="Риск профиль" options={options} />

          <button>Подобрать товары</button>
        </div>

        <div className={styles.search}>
          <Combobox options={filter} />
          <input
            className={styles.input}
            type="text"
            placeholder="Поиск товаров..."
          />
        </div>
      </div>

      <Routes>
        <Route path="table" element={<div>Таблица</div>} />
        <Route path="list" element={<div>Список</div>} />
        <Route path="cards" element={<div>Карточки</div>} />
        <Route path="risk-profile" element={<div>Риск профиль</div>} />
      </Routes>
    </>
  );
};

export default Main;
