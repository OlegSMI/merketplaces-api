import redy from "@assets/redy.png";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";

import history from "@assets/collecting/history.svg";
import styles from "./SessionsList.module.scss";

const SessionsList = ({ enterAnotherSession }) => {
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

  return (
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
        <>
          {/* TODO: Отображать Loader лдо момента возврата ответа от бэка */}
          <ContentLoader
            className={styles.sceleton}
            speed={2}
            width={100}
            height={20}
            viewBox="0 0 280 50"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="280" height="50" />
          </ContentLoader>
          <ul className={styles.content}>
            {[...Array(5)].map((_, index) => (
              <ContentLoader
                className={styles.sceleton}
                speed={2}
                width={280}
                height={50}
                viewBox="0 0 280 50"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                key={index}
              >
                <rect x="0" y="0" rx="10" ry="10" width="280" height="50" />
              </ContentLoader>
            ))}
          </ul>
          <p className={styles.data}>24.09.2024</p>
          <ul className={styles.content}>
            {[...Array(5)].map((_, index) => (
              <li
                key={index}
                className={`${styles.sessia} ${
                  clickedIndex === index ? styles.clicked : ""
                }`}
                onClick={() => handleClick(index)}
              >
                1234
                <p className={styles.time}>12:45</p>
                <img src={redy} alt="redy" />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

SessionsList.propTypes = {
  enterAnotherSession: PropTypes.func,
};

export default SessionsList;
