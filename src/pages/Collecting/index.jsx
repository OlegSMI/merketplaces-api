import { useEffect, useState } from "react";

import CollectingHeader from "./components/CollectingHeader/CollectingHeader";
import CollectingTable from "./components/CollectingTable/CollectingTable";
import SessionsList from "./components/SessionsList/SessionsList";
import TagsComponent from "./components/TagsComponent";

import { useSnackbar } from "notistack";
import customSetInterval from "../../utils/customSetInterval";

import styles from "./Collecting.module.scss";

const Collecting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [currentSession, setCurrentSession] = useState(0);
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [progressSession, setProgressSession] = useState(false);

  const startCollectGoods = () => {
    if (articles.length == 0) {
      enqueueSnackbar("Артикулы не найдены", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else if (localStorage.getItem("sessionId")) {
      enqueueSnackbar("Сессия уже запущена", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      // запуск сбора данных возвращается статус сессии и ее id
      localStorage.setItem("sessionId", 234223);
      setCurrentSession(234223);
      setProgressSession(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      setProgressSession(true);
      setCurrentSession(localStorage.getItem("sessionId"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      window.longPool = customSetInterval(longPoolTimer, 500);
    }
    return () => clearTimeout(window.longPool);
  }, [progressSession]);

  const longPoolTimer = () => {
    // запрос на получение статуса сессии
    // if (status == pending) {
    //   пропускаем
    // } else {
    //
    //   clearInterval(window.longPool)
    //   если находимся в текущей сессии currentSession == localStorage.getItem("sessionId")
    //   получить данные setProducts()
    //   setProgressSession(false);
    //   localStorage.removeItem("sessionId");
    // getSessionProducts
    // }
  };

  const getSessionProducts = (sessionId) => {
    // setProducts()
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/src/json/collectingTest.json");
  //     const data = await response.json();
  //     setProducts(data.products);
  //   };
  //   fetchData();
  // }, []);

  const enterAnotherSession = (sessionId) => {
    setCurrentSession(sessionId);
    getSessionProducts(sessionId);
  };

  return (
    <div className={styles.container}>
      <CollectingHeader
        setArticles={(articles) => setArticles(articles)}
        startCollectGoods={startCollectGoods}
      />
      <TagsComponent articles={articles} />
      <SessionsList
        enterAnotherSession={(sessionId) => enterAnotherSession(sessionId)}
      />
      {/* Отображать таблицу в 2 случаях: 
      1. Если были получены данные запущенной сессии progressSession == false и products.length > 0
      2. Если данные запущенной сессии не получены но выбрана другая сессия 
      progressSession == true, currentSession != localStorage.getItem() и products.length > 0 */}
      <CollectingTable products={products} />
      {/* Если progressSession == false и products.length == 0, то отображаем заглушку */}
      {/* Иначе отображать окошко подгрузки в процентах */}
    </div>
  );
};

export default Collecting;
