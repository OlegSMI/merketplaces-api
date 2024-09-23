import { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Card,
  Combobox,
  List,
  NavBar,
  RiskProfile,
  Table,
} from "../../components";

import { getWbProducts } from "../../redux/wbProducts/asyncAction";
import styles from "./Main.module.scss";

// либо из базы, либо вручную
const categories = [
  "Белье",
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
  const [search, setSearch] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [investOption, setInvestOption] = useState("");
  const [procentOption, setProcentOption] = useState("");
  const [riskOption, setRiskOption] = useState("");
  const [dateOption, setDateOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const getProducts = ({ value = 1 }) => {
    dispatch(getWbProducts({ page: value }));
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    getProducts({ value: value });
  };

  return (
    <div className={styles.container}>
      <h3>Подбор товаров</h3>

      <NavBar />

      <div className={styles.header}>
        <div className={styles.filters}>
          <Combobox
            name="Категория"
            options={categories}
            selectedOption={categoryOption}
            setSelectedOption={setCategoryOption}
          />
          <Combobox
            name="Инвестиции"
            options={options}
            selectedOption={investOption}
            setSelectedOption={setInvestOption}
          />
          <Combobox
            name="Проценты годовых"
            options={options}
            selectedOption={procentOption}
            setSelectedOption={setProcentOption}
          />
          <Combobox
            name="Риск профиль"
            options={options}
            selectedOption={riskOption}
            setSelectedOption={setRiskOption}
          />

          <button onClick={getProducts}>Подобрать товары</button>
        </div>

        <div className={styles.search}>
          <Combobox
            options={filter}
            selectedOption={dateOption}
            setSelectedOption={setDateOption}
          />
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
        <Route
          path="table"
          element={
            <Table
              search={search}
              categoryOption={categoryOption}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          }
        />
        <Route path="list" element={<List />} />
        <Route path="cards" element={<Card />} />
        <Route path="risk-profile" element={<RiskProfile />} />
      </Routes>
    </div>
  );
};

export default Main;
