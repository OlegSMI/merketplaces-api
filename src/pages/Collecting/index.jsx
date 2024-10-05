import { useEffect, useState, useCallback } from "react";

import {
  createSession,
  getSessionStatus,
  getWbProducts,
  startSession,
} from "@api/operator/useCollectGoodsAPI";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

import emptyState from "@assets/table/emptyState.svg";
import PaginationCustom from "@components/Pagination/Pagination";

import CollectingHeader from "./components/CollectingHeader/CollectingHeader";
import CollectingTable from "./components/CollectingTable/CollectingTable";
import SessionsList from "./components/SessionsList/SessionsList";
import TagsComponent from "./components/TagsComponent";
import styles from "./Collecting.module.scss";

const Collecting = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSession, setCurrentSession] = useState("");
  const [progressSession, setProgressSession] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      setProgressSession(true);
      setCurrentSession(localStorage.getItem("sessionId"));
    }
  }, []);

  useEffect(() => {
    let intervalId;

    if (progressSession) {
      intervalId = setInterval(longPoolTimer, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [progressSession]);

  const longPoolTimer = useCallback(async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) return;

    try {
      const data = await getSessionStatus(sessionId);

      if (data.status === "successed") {
        setProgressSession(false);

        if (currentSession === sessionId) {
          await getSessionProducts(sessionId);
        }

        localStorage.removeItem("sessionId");
      } else {
        console.warn(`Unexpected status: ${data.status}`);
      }
    } catch (error) {
      enqueueSnackbar("Ошибка при получении статуса сессии", {
        variant: "error",
      });
      console.error("Ошибка:", error);
    }
  }, [currentSession, enqueueSnackbar]);

  const startCollectGoods = async () => {
    setProducts([]);
    if (!articles.length) {
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
          <CircularProgress className={styles.progress} />
        )}

      {/* Сделай скелетон */}
      {progressSession == true &&
        currentSession != localStorage.getItem("sessionId") &&
        products.length == 0 && <div>Идет загрузка данных из БД</div>}
    </div>
  );
};

export default Collecting;
