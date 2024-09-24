import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useGoodsAPI } from "@api/operator";
import { Card, Combobox, List, NavBar, RiskProfile, Table } from "@components";

import { useSnackbar } from "notistack";
import styles from "./Main.module.scss";

const options = [{ name: "Отция 1" }, { name: "Отция 2" }];
const filter = [{ name: "По дате" }, { name: "По цене" }];

const Main = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { getCategories } = useGoodsAPI();

  const [search, setSearch] = useState("");
  const [categoryOption, setCategoryOption] = useState({ name: "" });
  const [categories, setCategories] = useState([]);

  const [investOption, setInvestOption] = useState({ name: "" });
  const [procentOption, setProcentOption] = useState({ name: "" });
  const [riskOption, setRiskOption] = useState({ name: "" });
  const [dateOption, setDateOption] = useState({ name: "" });
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const { getProducts } = useGoodsAPI();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories();
  }, []);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const getProductsAPI = async () => {
    try {
      setProducts(await getProducts(categoryOption.path, "", 0));
    } catch (error) {
      if (error.status === 422) {
        enqueueSnackbar("Ошибка отправки данных", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar(error.toString(), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
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
              products={products}
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
