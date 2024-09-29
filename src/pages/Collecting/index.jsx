import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";

import download from "@assets/download.png";
import redy from "@assets/redy.png";
import send from "@assets/send.png";
import history from "@assets/sidebar/history.png";
import replaceInput from "../../utils/replaceInput";
import TagsInput from "./components/TagsInput/TagsInput";
import styles from "./Collecting.module.scss";
import CollectingTable from "./components/CollectingTable/CollectingTable";

const Collecting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(10);
  const [value, setValue] = useState("");
  const [articles, setArticles] = useState([]);

  const clickRef = useRef(null);

  const textareaRef = useRef(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const changeInputHandler = (e) => {
    setValue(e.target.value);
    const parseArticles = replaceInput(e.target.value);
    setArticles([...parseArticles]);
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
          placeholder="Введите артикулы"
          onChange={(e) => changeInputHandler(e)}
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
      <div>
        {articles.length > 0 && (
          <TagsInput
            tags={articles}
            variant="outlined"
            id="tags"
            name="tags"
            label="Найденные артикулы"
            disabled
          />
        )}
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
      <CollectingTable />
    </div>
  );
};

export default Collecting;
