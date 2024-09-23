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
// const categories = [
//   "Белье",
//   "Электроника",
//   "Мебель",
//   "Товары для детей",
//   "Бытовая химия",
//   "Системы стабилизации",
//   "Штативы/слайдеры",
// ];

const categories = [
  {
    // _id: ObjectId('66d8b7eeabf726b3357a928b'),
    url: "/promotions/horoshaya-tsena/zhenshchinam/odezhda-dlya-doma/bluzki-i-tuniki",
    name: "Блузки и туники",
    path: "Акции/Хорошая цена/Женщинам/Одежда для дома/Блузки и туники",
  },
  {
    // _id: ObjectId('66d9aa1c3693be71c879138a'),
    url: "/catalog/zhenshchinam/bele-i-kupalniki/trusy",
    name: "Трусы",
    path: "Женщинам/Белье/Трусы",
  },
  {
    // _id: ObjectId('66d9aa403693be71c879138c'),
    url: "/catalog/zhenshchinam/bele/besshovnoe",
    name: "Бесшовное",
    path: "Женщинам/Белье/Бесшовное",
  },
  {
    // _id: ObjectId("66d9aa4c3693be71c879138e"),
    url: "/catalog/zhenshchinam/bele/besshovnoe?xsubject=75",
    name: "Боди",
    path: "Женщинам/Белье/Бесшовное/Боди",
  },
  {
    // _id: ObjectId("66d9aa5a3693be71c8791390"),
    url: "/catalog/zhenshchinam/bele/besshovnoe?xsubject=76",
    name: "Бюстгальтер",
    path: "Женщинам/Белье/Бесшовное/Бюстгальтер",
  },
  {
    // _id: ObjectId("66d9aa723693be71c8791392"),
    url: "/catalog/zhenshchinam/bele/besshovnoe?xsubject=71",
    name: "Неглиже",
    path: "Женщинам/Белье/Бесшовное/Неглиже",
  },
  {
    // _id: ObjectId("66d9aa823693be71c8791394"),
    url: "/catalog/zhenshchinam/bele/besshovnoe?xsubject=133",
    name: "Трусы",
    path: "Женщинам/Белье/Бесшовное/Трусы",
  },
  {
    // _id: ObjectId("66d9aa8c3693be71c8791396"),
    url: "/catalog/zhenshchinam/bele-i-kupalniki/bodi-i-korsety",
    name: "Боди и корсеты",
    path: "Женщинам/Белье/Боди и корсеты",
  },
  {
    // _id: ObjectId("66d9aa963693be71c8791398"),
    url: "/catalog/zhenshchinam/bele-i-kupalniki/bodi-i-korsety?xsubject=75",
    name: "Боди",
    path: "Женщинам/Белье/Боди и корсеты/Боди",
  },
  {
    // _id: ObjectId("66d9aaa23693be71c879139a"),
    url: "/catalog/zhenshchinam/bele-i-kupalniki/bodi-i-korsety?xsubject=74",
    name: "Корсет",
    path: "Женщинам/Белье/Боди и корсеты/Корсет",
  },
];

// const options = ["Отция 1", "Отция 2"];
const options = [{ name: "Отция 1" }, { name: "Отция 2" }];
// const filter = ["По дате", "По цене"];
const filter = [{ name: "По дате" }, { name: "По цене" }];

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
