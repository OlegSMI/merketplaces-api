import redy from "@assets/redy.png";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "../../Collecting.module.scss";

const SessionsList = ({ enterAnotherSession }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(10);

  const clickRef = useRef(null);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  );
};

SessionsList.propTypes = {
  enterAnotherSession: PropTypes.func,
};

export default SessionsList;
