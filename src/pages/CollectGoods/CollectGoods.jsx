import { useState } from "react";
import replaceInput from "../../utils/replaceInput";
import styles from "./CollectGoods.module.scss";
import TagsInput from "./components/TagsInput";

const CollectGoods = () => {
  const [articles, setArticles] = useState([]);

  const changeInputHandler = (e) => {
    const parseArticles = replaceInput(e.target.value);
    setArticles([...parseArticles]);
  };

  return (
    <div className={styles.container}>
      <h3>Сбор товаров</h3>
      <div className={styles.headerPanel}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="text"
            placeholder="Введите артикулы"
            onChange={(e) => changeInputHandler(e)}
          />
          {/* <TextareaAutosize
            className={styles.input}
            type="text"
            placeholder="Введите артикулы"
            onChange={(e) => changeInputHandler(e)}
          /> */}
        </div>
        <button>Сбор товаров</button>
      </div>

      <TagsInput
        tags={articles}
        variant="outlined"
        id="tags"
        name="tags"
        label="Найденные артикулы"
        disabled
      />
    </div>
  );
};

export default CollectGoods;
