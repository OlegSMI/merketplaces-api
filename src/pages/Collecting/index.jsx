import { useEffect, useState } from "react";

import { useSnackbar } from "notistack";
import customSetInterval from "../../utils/customSetInterval";
import styles from "./Collecting.module.scss";
import CollectingHeader from "./components/CollectingHeader/CollectingHeader";
import CollectingTable from "./components/CollectingTable/CollectingTable";
import SessionsList from "./components/SessionsList/SessionsList";
import TagsComponent from "./components/TagsInput";

const Collecting = () => {
  const { enqueueSnackbar } = useSnackbar();

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
      localStorage.setItem("sessionId", 234223);
      setProgressSession(true);
      // запуск сбора данных возвращается статус сессии
    }
  };

  useEffect(() => {
    let longPool;
    if (localStorage.getItem("sessionId")) {
      longPool = customSetInterval(longPoolTimer, 500);
    }
    return () => clearTimeout(longPool);
  }, [progressSession]);

  const longPoolTimer = () => {
    // запрос на получение статуса сессии
    console.log("yes");
    // if (status == pending) {

    // } else {
    //   setProgressSession(false);
    //   localStorage.removeItem("sessionId");
    //   clearInterval
    //   // получить данные
    // }
  };

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      setProgressSession(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/json/collectingTest.json");
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);

  const enterAnotherSession = () => {
    // получить данные о продуктах из другой сессии
  };

  return (
    <div className={styles.container}>
      <CollectingHeader
        setArticles={(articles) => setArticles(articles)}
        startCollectGoods={startCollectGoods}
      />
      <TagsComponent articles={articles} />
      <SessionsList enterAnotherSession={enterAnotherSession} />
      <CollectingTable products={products} />
    </div>
  );
};

export default Collecting;
