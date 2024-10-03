import { useEffect, useState } from "react";

import CollectingHeader from "./components/CollectingHeader/CollectingHeader";
import CollectingTable from "./components/CollectingTable/CollectingTable";
import SessionsList from "./components/SessionsList/SessionsList";
import TagsComponent from "./components/TagsComponent";

import { useSnackbar } from "notistack";
import customSetInterval from "../../utils/customSetInterval";

import styles from "./Collecting.module.scss";

import emptyState from "@assets/table/emptyState.svg";

import {
  createSession,
  getSessionStatus,
  getWbProducts,
  startSession,
} from "@api/operator/useCollectGoodsAPI";
import { CircularProgress } from "@mui/material";
import PaginationCustom from "../../components/Pagination/Pagination";

const Collecting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [articles, setArticles] = useState([]);

  const [currentSession, setCurrentSession] = useState("");
  const [progressSession, setProgressSession] = useState(false);

  const [products, setProducts] = useState([]);
  const [redyProducts, setRedyProducts] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      console.log("has token in storage");
      setProgressSession(true);
      setCurrentSession(localStorage.getItem("sessionId"));
    }
  }, []);

  const startCollectGoods = async () => {
    setProducts([]);
    if (articles.length == 0) {
      enqueueSnackbar("Артикулы не найдены", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      const sessionID = await createSession();
      localStorage.setItem("sessionId", sessionID);
      setCurrentSession(sessionID);
      setProgressSession(true);

      startSession(articles);
    }
  };

  useEffect(() => {
    if (progressSession) {
      window.longPool = customSetInterval(longPoolTimer, 1000);
    }
    return () => clearTimeout(window.longPool);
  }, [progressSession]);

  const longPoolTimer = async () => {
    const data = await getSessionStatus(localStorage.getItem("sessionId"));

    if (data.status == "successed") {
      clearTimeout(window.longPool);

      setProgressSession(false);
      if (currentSession === localStorage.getItem("sessionId")) {
        const products = await getWbProducts(
          100,
          0,
          localStorage.getItem("sessionId")
        );
        setProducts(products);
      }

      localStorage.removeItem("sessionId");
    }

    if (data.status == "pending") {
      console.log("in process");
      setRedyProducts(data.productsIds.length);
    }
  };

  const getSessionProducts = async (sessionId) => {
    const products = await getWbProducts(100, 0, sessionId);
    setProducts(products);
  };

  const enterAnotherSession = (sessionId) => {
    setCurrentSession(sessionId);
    getSessionProducts(sessionId);
  };

  const paginateHandler = async (page) => {
    const response = await getWbProducts(100, page, currentSession);
    if (response.length > 0) {
      setProducts(response);
    }
  };

  return (
    <div className={styles.container}>
      <CollectingHeader
        progressSession={progressSession}
        setArticles={(articles) => setArticles(articles)}
        startCollectGoods={startCollectGoods}
        currentSession={currentSession}
      />
      <TagsComponent articles={articles} />
      <SessionsList
        progressSession={progressSession}
        enterAnotherSession={(sessionId) => enterAnotherSession(sessionId)}
      />
      {/* Отображать таблицу в 2 случаях: 
      1. Если были получены данные запущенной сессии progressSession == false и products.length > 0
      2. Если данные запущенной сессии не получены но выбрана другая сессия 
      progressSession == true, currentSession != localStorage.getItem() и products.length > 0 */}
      {((progressSession == false && products.length > 0) ||
        (progressSession == true &&
          currentSession != localStorage.getItem("sessionId") &&
          products.length > 0)) && (
        <>
          <CollectingTable sessionId={currentSession} products={products} />
          <PaginationCustom paginateHandler={paginateHandler} />
        </>
      )}

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
          <CircularProgress />
        )}
      {/* <CollectPercents percents={redyProducts / articles.length} /> */}

      {/* Сделай скелетон */}
      {progressSession == true &&
        currentSession != localStorage.getItem("sessionId") &&
        products.length == 0 && <div>Идет загрузка данных из БД</div>}
    </div>
  );
};

export default Collecting;
