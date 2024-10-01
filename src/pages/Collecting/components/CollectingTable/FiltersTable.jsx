import { Combobox } from "@components";
import PropTypes from "prop-types";

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

const FiltersTable = ({ handleInputChange }) => {
  const setFilterCategory = () => {
    console.log("sd");
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
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
  handleInputChange: PropTypes.func,
};

export default FiltersTable;
