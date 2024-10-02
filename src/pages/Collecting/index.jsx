import { useEffect, useState } from "react";

import CollectingHeader from "./components/CollectingHeader/CollectingHeader";
import CollectingTable from "./components/CollectingTable/CollectingTable";
import SessionsList from "./components/SessionsList/SessionsList";
import TagsComponent from "./components/TagsComponent";

import { useSnackbar } from "notistack";
import customSetInterval from "../../utils/customSetInterval";

import styles from "./Collecting.module.scss";
import { CollectPercents } from "./components/CollectPercents";

import emptyState from "@assets/table/emptyState.svg";

import {
  getHistory,
  getSessionStatus,
  createSession,
  startSession,
  getWbProducts,
} from "@api/operator/useCollectGoodsAPI";

const Collecting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [articles, setArticles] = useState([]);

  const [currentSession, setCurrentSession] = useState(0);
  const [progressSession, setProgressSession] = useState(false);

  const [products, setProducts] = useState([]);
  const [redyProducts, setRedyProducts] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistory(10, 0);
      setHistory(data);

      // TODO: Если есть что-то на сборе то оно всегад первым в списке со статусом pending поэтому чекаю [0]
      if (data[0].status !== "successed") {
        setProgressSession(true);
      }
    };
    fetchData();
    // if (localStorage.getItem("sessionId")) {
    //   setProgressSession(true);
    //   setCurrentSession(localStorage.getItem("sessionId"));
    // }
  }, []);

  const startCollectGoods = async () => {
    if (articles.length == 0) {
      enqueueSnackbar("Артикулы не найдены", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      const sessionID = await createSession();
      startSession(articles);
      setHistory([
        ...history,
        {
          id: sessionID,
          status: "started",
          doneAt: null,
        },
      ]);
      // запуск сбора данных возвращается статус сессии и ее id
      localStorage.setItem("sessionId", sessionID);
      setCurrentSession(sessionID);
      setProgressSession(true);
    }
  };

  useEffect(() => {
    if (progressSession) {
      window.longPool = customSetInterval(longPoolTimer, 5000);
    }
    return () => clearTimeout(window.longPool);
  }, [progressSession]);

  const longPoolTimer = async () => {
    const data = await getSessionStatus(localStorage.getItem("sessionId"));

    if (data.status == "successed") {
      setProgressSession(false);

      // TODO: Запрос на получение статуса сессии
      // После того как получили что данные готовы нужен запрос на их получение
      // Можно прям от сюда отправлять
      const products = await getWbProducts(
        10,
        0,
        localStorage.getItem("sessionId")
      );
      setProducts(products);

      localStorage.removeItem("sessionId");
    }

    if (data.status == "pending") {
      // TODO: Это для процентов загрузки, всего артикулов делить на redyProducts
      setRedyProducts(data.productsIds.length);
    }
    // console.log("пулим");
    // запрос на получение статуса сессии
    // if (status == pending) {
    //   прроцены
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
        progressSession={progressSession}
        setArticles={(articles) => setArticles(articles)}
        startCollectGoods={startCollectGoods}
      />
      <TagsComponent articles={articles} />
      <SessionsList
        history={history}
        enterAnotherSession={(sessionId) => enterAnotherSession(sessionId)}
      />
      {/* Отображать таблицу в 2 случаях: 
      1. Если были получены данные запущенной сессии progressSession == false и products.length > 0
      2. Если данные запущенной сессии не получены но выбрана другая сессия 
      progressSession == true, currentSession != localStorage.getItem() и products.length > 0 */}
      {((progressSession == false && products.length > 0) ||
        (progressSession == true &&
          // currentSession != localStorage.getItem("sessionId") &&
          products.length > 0)) && <CollectingTable products={products} />}

      {/* <CollectingTable products={products} /> */}
      {progressSession == false && products.length == 0 && (
        <div className={styles.emptyState}>
          <img src={emptyState} alt="Empty State" />
          <p className={styles.title}>Таблица товаров пустая</p>
          <p className={styles.text}>
            Начните поиск товаров по артикулам или выберете сессию
          </p>
        </div>
      )}

      {progressSession == true &&
        products.length == 0 &&
        currentSession == localStorage.getItem("sessionId") && (
          <CollectPercents percents={10} />
        )}

      {/* Сделай скелетон */}
      {progressSession == true &&
        currentSession != localStorage.getItem("sessionId") &&
        products.length == 0 && <div>Идет загрузка данных из БД</div>}
    </div>
  );
};

export default Collecting;
