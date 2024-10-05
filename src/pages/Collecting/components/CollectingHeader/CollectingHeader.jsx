import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@components";
import replaceInput from "@utils/replaceInput";

import styles from "./CollectingHeader.module.scss";

const CollectingHeader = ({
  setArticles,
  startCollectGoods,
  progressSession,
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
    const parseArticles = replaceInput(e.target.value);
    setArticles([...parseArticles]);
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    textarea.style.height = "17px";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [value]);

  return (
    <div className={styles.panel}>
      <textarea
        ref={textareaRef}
        placeholder="Введите артикулы"
        onChange={(e) => changeInputHandler(e)}
      />
      <Button
        disabled={progressSession}
        title="Отправить артикулы для сбора"
        text="Собрать"
        onClick={startCollectGoods}
      />
      {/* <Tooltip title="Скачать Exel">
        <button
          className={styles.download}
          disabled={progressSession}
          onClick={downloadExcel}
        >
          Скачать
          <img src={download} alt="download" />
        </button>
      </Tooltip> */}
    </div>
  );
};

CollectingHeader.propTypes = {
  setArticles: PropTypes.func,
  startCollectGoods: PropTypes.func,
  progressSession: PropTypes.bool,
};

export default CollectingHeader;
