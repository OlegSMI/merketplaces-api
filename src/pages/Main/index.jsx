import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Combobox, NavBar, Table } from "../../components";
import styles from "./Main.module.scss";

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

const Sips = () => {
  return <div>Список</div>;
};

const Main = () => {
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h3>Подбор товаров</h3>

      <NavBar />

      <div className={styles.header}>
        <div className={styles.filters}>
          <Combobox name="Категория" options={categories} sx={{ height: 32 }} />
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
            value={search}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Routes>
        <Route path="table" element={<Table search={search} />} />
        <Route path="list" element={<Sips />} />
        <Route path="cards" element={<div>Карточки</div>} />
        <Route path="risk-profile" element={<div>Риск профиль</div>} />
      </Routes>
    </div>
  );
};

export default Main;
