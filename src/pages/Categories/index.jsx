import { useState } from "react";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  Add,
  Clear,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import styles from "./Categories.module.scss";

const ITEMS_PER_PAGE = 6; // Количество элементов на странице

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "Одежда",
      checked: false,
      subcategories: [
        { id: 0, name: "Женская одежда", checked: false },
        { id: 1, name: "Мужская одежда", checked: true },
        { id: 2, name: "Детская одежда", checked: false },
      ],
    },
    {
      id: 1,
      name: "Обувь",
      checked: true,
      subcategories: [
        { id: 0, name: "Женская обувь", checked: false },
        { id: 1, name: "Мужская обувь", checked: false },
        { id: 2, name: "Детская обувь", checked: false },
      ],
    },
    {
      id: 2,
      name: "Аксессуары",
      checked: false,
      subcategories: [
        { id: 0, name: "Сумки", checked: false },
        { id: 1, name: "Часы", checked: false },
        { id: 2, name: "Ювелирные изделия", checked: false },
      ],
    },
    { id: 3, name: "Электроника", checked: false, subcategories: [] },
    {
      id: 4,
      name: "Косметика",
      checked: true,
      subcategories: [
        { id: 0, name: "Макияж", checked: false },
        { id: 1, name: "Уход за кожей", checked: false },
        { id: 2, name: "Парфюмерия", checked: false },
      ],
    },
    {
      id: 5,
      name: "Косметика",
      checked: true,
      subcategories: [
        { id: 0, name: "Макияж", checked: false },
        { id: 1, name: "Уход за кожей", checked: false },
        { id: 2, name: "Парфюмерия", checked: false },
      ],
    },
    {
      id: 6,
      name: "Косметика",
      checked: true,
      subcategories: [
        { id: 0, name: "Макияж", checked: false },
        { id: 1, name: "Уход за кожей", checked: false },
        { id: 2, name: "Парфюмерия", checked: false },
      ],
    },
  ]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (e, id) => {
    e.stopPropagation();
    setOpenCategoryId(openCategoryId === id ? null : id);
  };

  const statusMainChange = (e, id) => {
    e.stopPropagation();
    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          // Меняем состояние категории
          const updatedCategory = { ...category, checked: !category.checked };

          // Меняем состояние подкатегорий
          updatedCategory.subcategories = updatedCategory.subcategories.map(
            (subcategory) => {
              return { ...subcategory, checked: updatedCategory.checked }; // Устанавливаем состояние подкатегорий в зависимости от состояния категории
            }
          );

          return updatedCategory;
        }
        return category;
      })
    );
  };

  const statusSubmainChange = (e, categoryId, subcategoryId) => {
    e.stopPropagation();
    setCategories(
      categories.map((category) => {
        // Проверяем, совпадает ли id категории
        if (category.id === categoryId) {
          // Обновляем состояние категории
          const updatedCategory = { ...category };

          // Обновляем состояние подкатегорий
          updatedCategory.subcategories = updatedCategory.subcategories.map(
            (subcategory) => {
              // Проверяем, совпадает ли id подкатегории
              if (subcategory.id === subcategoryId) {
                return { ...subcategory, checked: !subcategory.checked }; // Меняем состояние подкатегории
              }
              return subcategory; // Возвращаем подкатегорию без изменений
            }
          );

          return updatedCategory; // Возвращаем обновленную категорию
        }
        return category; // Возвращаем категорию без изменений
      })
    );
  };

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const splitIntoColumns = (items) => {
    const columns = [[], [], []]; // Массив для трех колонок
    items.forEach((item, index) => {
      columns[index % 3].push(item); // Распределяем элементы по колонкам
    });
    return columns;
  };

  const currentItems = getCurrentItems();
  const columns = splitIntoColumns(currentItems);

  return (
    <div className={styles.container}>
      {columns.map((column, index) => (
        <div key={index} className={styles.col}>
          {column.map((category) => {
            return (
              <>
                <div
                  key={category.id}
                  className={styles.category}
                  onClick={(e) => toggleCategory(e, category.id)}
                >
                  <div className={styles.title}>
                    {category.subcategories.length > 0 ? (
                      openCategoryId === category.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )
                    ) : null}
                    <p className={styles.text}>{category.name}</p>
                  </div>
                  <button
                    className={styles.add}
                    onClick={(e) => statusMainChange(e, category.id)}
                  >
                    {category.checked ? (
                      <Add sx={{ color: "green", fontSize: "20px" }} />
                    ) : (
                      <Clear sx={{ color: "red", fontSize: "20px" }} />
                    )}
                  </button>
                </div>
                {openCategoryId === category.id && (
                  <div className={styles.subcategories}>
                    {category.subcategories.map((subcategory) => {
                      return (
                        <div
                          key={subcategory.id}
                          className={styles.subcategory}
                        >
                          <p>{subcategory.name}</p>
                          <button
                            className={styles.add}
                            onClick={(e) =>
                              statusSubmainChange(
                                e,
                                category.id,
                                subcategory.id
                              )
                            }
                          >
                            {subcategory.checked ? (
                              <Add sx={{ color: "green", fontSize: "20px" }} />
                            ) : (
                              <Clear sx={{ color: "red", fontSize: "20px" }} />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
        </div>
      ))}
      <Stack className={styles.pagination}>
        <Pagination
          count={Math.ceil(categories.length / ITEMS_PER_PAGE)}
          shape="rounded"
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)} // Обновление текущей страницы
        />
      </Stack>
    </div>
  );
}

export default Categories;
