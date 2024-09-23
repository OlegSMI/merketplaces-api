import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import close from "../../assets/table/close.svg";
import filterDown from "../../assets/table/filterDown.svg";
import filterUp from "../../assets/table/filterUp.svg";
import styles from "./Combobox.module.scss";

const Combobox = ({ title, options, selectedOption, setSelectedOption }) => {
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
    option.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const dropFilter = (e) => {
    e.stopPropagation();
    setSelectedOption("");
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
        <img src={close} alt="Combobox Off" onClick={dropFilter} />
        {selectedOption || title || options[0].name}
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
            <li key={index} onClick={() => handleSelectChange(option.name)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Combobox.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func.isRequired,
};

export default Combobox;
