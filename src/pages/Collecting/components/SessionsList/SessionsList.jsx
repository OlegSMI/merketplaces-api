import redy from "@assets/redy.png";
import loading from "@assets/loading.png";
import { Tooltip } from "@mui/material";
import PropTypes, { string } from "prop-types";
import { useEffect, useRef, useState } from "react";

import historyIcon from "@assets/collecting/history.svg";
import styles from "./SessionsList.module.scss";

const SessionsList = ({ enterAnotherSession, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(10);

  const clickRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = (index) => {
    setClickedIndex(index);
    enterAnotherSession(index);
  };

  const formateTime = (date) => {
    if (date) {
      const dateObject = new Date(date);
      return dateObject.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return "";
    }
  };

  const formateDate = (date) => {
    if (date) {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString("ru-RU");
    } else {
      return "";
    }
  };

  return (
    <div
      className={`${styles.history} ${isOpen ? styles.open : ""}`}
      ref={clickRef}
    >
      <Tooltip title="История">
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          <img src={historyIcon} alt="history" />
        </button>
      </Tooltip>

      {isOpen && (
        <ul className={styles.content}>
          {history.map((item) => (
            <div key={item.id} className={styles.sessiaWrapper}>
              <li
                className={`${styles.sessia} ${
                  clickedIndex === item.id ? styles.clicked : ""
                }`}
                onClick={() => handleClick(item.id)}
              >
                {item.id}
                <p className={styles.time}>{formateTime(item.doneAt)}</p>
                <p className={styles.date}>{formateDate(item.doneAt)}</p>
              </li>

              <img
                // TODO: Нужна норм картинка на загрузку
                src={item.status === "successed" ? redy : loading}
                alt="redy"
              />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

SessionsList.propTypes = {
  enterAnotherSession: PropTypes.func,
  history: PropTypes.array,
};

export default SessionsList;
