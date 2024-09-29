import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import replaceInput from "../../../../utils/replaceInput";
import styles from "../../Collecting.module.scss";

import download from "@assets/download.png";
import send from "@assets/send.png";

const CollectingHeader = ({ setArticles, startCollectGoods }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
    const parseArticles = replaceInput(e.target.value);
    setArticles([...parseArticles]);
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [value]);

  const downloadExcel = () => {};

  return (
    <div className={styles.panel}>
      <textarea
        ref={textareaRef}
        placeholder="Введите артикулы"
        onChange={(e) => changeInputHandler(e)}
      />
      <Tooltip title="Отправить">
        <button className={styles.send} onClick={startCollectGoods}>
          <img src={send} alt="send" />
        </button>
      </Tooltip>

      <Tooltip title="Скачать Exel">
        <button className={styles.download} onClick={downloadExcel}>
          <img src={download} alt="download" />
        </button>
      </Tooltip>
    </div>
  );
};

CollectingHeader.propTypes = {
  setArticles: PropTypes.func,
  startCollectGoods: PropTypes.func,
};

export default CollectingHeader;
