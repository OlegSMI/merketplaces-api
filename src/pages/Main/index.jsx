import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useGoodsAPI } from "@api/operator";
import { Card, Combobox, List, NavBar, RiskProfile, Table } from "@components";

import styles from "./Main.module.scss";
import { categories } from "./categories";

const options = [{ name: "Отция 1" }, { name: "Отция 2" }];
const filter = [{ name: "По дате" }, { name: "По цене" }];

const Main = () => {
  const [search, setSearch] = useState("");
  const [categoryOption, setCategoryOption] = useState({ name: "" });
  const [investOption, setInvestOption] = useState({ name: "" });
  const [procentOption, setProcentOption] = useState({ name: "" });
  const [riskOption, setRiskOption] = useState({ name: "" });
  const [dateOption, setDateOption] = useState({ name: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const { getProducts } = useGoodsAPI();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const getProductsAPI = async () => {
    const response = await getProducts(categoryOption.path, "", 0);
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <h3>Подбор товаров</h3>

      <NavBar />

      <div className={styles.header}>
        <div className={styles.filters}>
          <Combobox
            title="Категория"
            options={categories}
            selectedOption={categoryOption}
            setSelectedOption={setCategoryOption}
          />
          <Combobox
            title="Инвестиции"
            options={options}
            selectedOption={investOption}
            setSelectedOption={setInvestOption}
          />
          <Combobox
            title="Проценты годовых"
            options={options}
            selectedOption={procentOption}
            setSelectedOption={setProcentOption}
          />
          <Combobox
            title="Риск профиль"
            options={options}
            selectedOption={riskOption}
            setSelectedOption={setRiskOption}
          />

          <button onClick={getProductsAPI}>Подобрать товары</button>
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
