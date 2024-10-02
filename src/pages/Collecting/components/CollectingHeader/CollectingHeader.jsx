import { Tooltip } from "@mui/material";
import replaceInput from "@utils/replaceInput";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./CollectingHeader.module.scss";

import download from "@assets/collecting/xlsx.svg";
import { Button } from "@components";

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

    textarea.style.height = "17px";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [value]);

  const downloadExcel = () => {
    // запрос на получение файла
    // const blob = await response.blob();
    // const downloadUrl = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = downloadUrl;
    // link.download = 'downloaded_file.xlsx';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className={styles.panel}>
      <textarea
        ref={textareaRef}
        placeholder="Введите артикулы"
        onChange={(e) => changeInputHandler(e)}
      />
      <Button
        title="Отправить артикулы для сбора"
        text="Собрать"
        onClick={startCollectGoods}
      />
      <Tooltip title="Скачать Exel">
        <button className={styles.download} onClick={downloadExcel}>
          Скачать
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
