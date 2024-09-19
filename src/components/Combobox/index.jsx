import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./Combobox.module.scss";
import filterUp from "../../assets/table/filterUp.svg";
import filterDown from "../../assets/table/filterDown.svg";

const Combobox = ({ name, options }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const comboboxRef = useRef(null);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Добавляем обработчик события при монтировании компонента
    document.addEventListener("mousedown", handleClickOutside);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={comboboxRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || name || options[0]}
        <img src={isOpen ? filterUp : filterDown} alt="filterImg" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          <input
            type="text"
            placeholder="Поиск..."
            className={styles.input}
            value={filter}
            onChange={handleInputChange}
          />
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectChange(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Combobox.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Combobox;
