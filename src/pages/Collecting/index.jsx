import { useState, useRef, useEffect } from "react";
import { Tooltip } from "antd";

import styles from "./Collecting.module.scss";
import history from "@assets/sidebar/history.png";
import redy from "@assets/redy.png";
import download from "@assets/download.png";
import send from "@assets/send.png";

const Collecting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(10);
  const clickRef = useRef(null);

  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
  }, [value]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <textarea
          ref={textareaRef}
          placeholder="Введите текст..."
          value={value}
          onChange={handleChange}
        />
        <Tooltip title="Отправить">
          <button className={styles.send}>
            <img src={send} alt="send" />
          </button>
        </Tooltip>

        <Tooltip title="Скачать Exel">
          <button className={styles.download}>
            <img src={download} alt="download" />
          </button>
        </Tooltip>
      </div>
      <div
        className={`${styles.history} ${isOpen ? styles.open : ""}`}
        ref={clickRef}
      >
        <Tooltip title="История">
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            <img src={history} alt="history" />
          </button>
        </Tooltip>

        {isOpen && (
          <ul className={styles.content}>
            {[...Array(20)].map((_, index) => (
              <li
                key={index}
                className={`${styles.sessia} ${
                  clickedIndex === index ? styles.clicked : ""
                }`}
                onClick={() => handleClick(index)}
              >
                1234
                <img src={redy} alt="redy" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Collecting;
