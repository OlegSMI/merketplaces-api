import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getWbProducts } from "@redux/wbProducts/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@api/operator/useGoodsAPI";
import {
  Card,
  Combobox,
  List,
  NavBar,
  RiskProfile,
  Table,
  ProtectedRoute,
  Button,
} from "@components";

import { useSnackbar } from "notistack";
import styles from "./Main.module.scss";

// const options = [{ name: "Отция 1" }, { name: "Отция 2" }];
// const filter = [{ name: "По дате" }, { name: "По цене" }];

const Main = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [search, setSearch] = useState("");
  const [categoryOption, setCategoryOption] = useState({ name: "" });
  const [categories, setCategories] = useState([]);

  // const [investOption, setInvestOption] = useState({ name: "" });
  // const [procentOption, setProcentOption] = useState({ name: "" });
  // const [riskOption, setRiskOption] = useState({ name: "" });
  // const [dateOption, setDateOption] = useState({ name: "" });
  const { items, status } = useSelector((state) => state.wbProducts);
  const [categoryState, setCategoryState] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "error") {
      enqueueSnackbar("Произошла ошибка", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [status]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const getProductsAPI = async () => {
    dispatch(
      getWbProducts({
        categoryName: categoryOption.path,
        paybackPeriod: "",
        investmentAmount: 0,
      })
    );
    if (categoryOption) setCategoryState(1);
    else setCategoryState(0);
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

          {/* <label className={styles.label} htmlFor="date">
            Выберите дату:
          </label> */}
          <input
            type="date"
            id="date"
            value={startDate}
            onChange={handleStartChange}
            className={styles.date}
          />
          <input
            type="date"
            id="date"
            value={endDate}
            onChange={handleEndChange}
            className={styles.date}
          />
          {/* <Combobox
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
          /> */}

          <Button
            // title="Подобрать товары"
            text="Подобрать товары"
            onClick={getProductsAPI}
          />
        </div>
        <div className={styles.search}>
          {/* <Combobox
            options={filter}
            selectedOption={dateOption}
            setSelectedOption={setDateOption}
          /> */}
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
          path="/table"
          element={
            <ProtectedRoute>
              <Table
                search={search}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                products={items}
                categoryState={categoryState}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <Card />
            </ProtectedRoute>
          }
        />
        <Route
          path="/risk-profile"
          element={
            <ProtectedRoute>
              <RiskProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
