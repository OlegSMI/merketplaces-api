import { Combobox } from "@components";
import PropTypes from "prop-types";

import { createExcel } from "@api/operator/useCollectGoodsAPI";
import download from "@assets/collecting/xlsx.svg";
import { stringToByteArray } from "../../../../utils/byteArray";
import { currentDateFormat } from "../../../../utils/currentDateFormat";
import styles from "../CollectingHeader/CollectingHeader.module.scss";

const customFilterStyle = {
  margin: "0px",
  marginBottom: "10px",
  fontSize: "12px",
  padding: "0px",
  height: "30px",
};

const searchStyle = {
  marginBottom: "10px",
  fontSize: "12px",
  paddingLeft: "10px",
  height: "33px",
  border: "none",
  backgroundColor: "#f2f4f7",
  borderRadius: "8px",
  outline: "none",
  color: "#344054",
};

const FiltersTable = ({ sessionId, handleInputChange }) => {
  const setFilterCategory = () => {
    console.log("sd");
  };

  const downloadExcel = async () => {
    try {
      const response = await createExcel(sessionId);
      // const byteArray = new Uint8Array(response);
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded_file.xlsx";

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      }); // Создаем Blob из ответа
      const downloadUrl = URL.createObjectURL(blob); // Создаем URL для Blob

      const link = document.createElement("a"); // Создаем элемент <a>
      link.href = downloadUrl;
      link.download = filename; // Устанавливаем имя файла для скачивания
      document.body.appendChild(link);
      link.click(); // Имитируем клик для скачивания
      document.body.removeChild(link); // Удаляем элемент <a> после скачивания
      URL.revokeObjectURL(downloadUrl); // Освобождаем память
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
      <button className={styles.download} onClick={downloadExcel}>
        Скачать
        <img src={download} alt="download" />
      </button>
      <Combobox
        title="Категория"
        options={[{ name: "S" }, { name: "s" }, { name: "ff" }]}
        selectedOption={1}
        setSelectedOption={setFilterCategory}
        style={{ ...customFilterStyle }}
      />
      <Combobox
        title="Статус"
        options={[{ name: "S" }, { name: "s" }, { name: "ff" }]}
        selectedOption={1}
        setSelectedOption={setFilterCategory}
        style={{ ...customFilterStyle }}
      />
      <input
        placeholder="Поиск в таблице..."
        style={{ ...searchStyle }}
        onChange={handleInputChange}
      />
    </div>
  );
};

FiltersTable.propTypes = {
  sessionId: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export default FiltersTable;
