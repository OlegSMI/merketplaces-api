import { useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  getGlobalCategories,
  getCategories,
  createCategory,
} from "@api/operator/useGoodsAPI";
import styles from "./Categories.module.scss";

function Categories() {
  const [offset, setOffset] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [search, setSearch] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (event) => {
    console.log("tut");
    setSearch(event.target.value);
  };

  const filterCategories = () => {
    return categories?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  // async function checkPosition() {
  //   const height = document.body.offsetHeight;
  //   const screenHeight = window.innerHeight;
  //   const scrolled = window.scrollY;

  //   const threshold = height - screenHeight / 4;

  //   const position = scrolled + screenHeight;

  //   if (position >= threshold) {
  //     console.log(offset);
  //     setLoadData(true);
  //     const newOffset = offset + 50;
  //     // const newCategories = [...(await getGlobalCategories(50, newOffset))];
  //     // setCategories((prevCategories) => [...prevCategories, ...newCategories]);
  //     setOffset((of) => of + newOffset);
  //     setLoadData(false);
  //   }
  // }

  const addCategories = async () => {
    console.log(offset);
    setLoadData(true);
    const newOffset = offset + 50;
    const newCategories = [...(await getGlobalCategories(50, newOffset))];
    setCategories((prevCategories) => [...prevCategories, ...newCategories]);
    setOffset(newOffset);
    setLoadData(false);
  };

  // function throttle(callee, timeout) {
  //   let timer = null;

  //   return function perform(...args) {
  //     if (timer) return;

  //     timer = setTimeout(() => {
  //       callee(...args);

  //       clearTimeout(timer);
  //       timer = null;
  //     }, timeout);
  //   };
  // }

  useEffect(() => {
    // window.addEventListener("scroll", throttle(checkPosition, 250));
    // window.addEventListener("resize", throttle(checkPosition, 250));
    const fetchCategories = async () => {
      setCurrentCategories(await getCategories());
    };
    console.log("ue");
    const fetchCurrentCategories = async () => {
      setCategories(await getGlobalCategories(50, offset));
    };
    fetchCategories();
    fetchCurrentCategories();
  }, []);

  const categoryIsNew = (category) => {
    return currentCategories.find((c) => c.path === category.path);
  };

  const addToCategories = (category) => {
    if (!categoryIsNew(category)) {
      createCategory(category);
      setCurrentCategories([...currentCategories, category]);
    } else {
      enqueueSnackbar("Категория уже есть в базе", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <>
      {categories?.length == 0 ? (
        <CircularProgress
          size="80px"
          color="white"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <input
            className={styles.input}
            type="text"
            placeholder="Поиск категорий..."
            value={search}
            onChange={handleInputChange}
          />
          <div className={styles.container}>
            {filterCategories().map((category, index) => (
              <div
                key={index}
                className={`${styles.category} ${
                  categoryIsNew(category) ? styles.adding : ""
                }`}
                onClick={() => addToCategories(category)}
              >
                {category.name}
              </div>
            ))}
          </div>
          {loadData ? (
            <CircularProgress
              color="white"
              sx={{ position: "absolute", bottom: "-50%", left: "50%" }}
            ></CircularProgress>
          ) : (
            <button onClick={addCategories} className={styles.button}>
              Добавить
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Categories;
