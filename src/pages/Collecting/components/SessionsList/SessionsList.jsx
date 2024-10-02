import { Pagination, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import historyIcon from "@assets/collecting/history.svg";
import check from "@assets/table/check.svg";
import { formateDate, formateTime } from "@utils/currentDateFormat";
import { getHistory } from "../../../../api/operator/useCollectGoodsAPI";
import styles from "./SessionsList.module.scss";

const SessionsList = ({ enterAnotherSession }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);

  const clickRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await getHistory(10, 0);
      if (sessions.length == 0 && isOpen) {
        console.log(response);
        setSessions(response);
      }
    };
    fetchHistory();
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = (index) => {
    setIsOpen(false);
    setSelectedSession(index);
    enterAnotherSession(index);
  };

  return (
    <div
      className={`${styles.history} ${isOpen ? styles.open : ""}`}
      ref={clickRef}
    >
      <div>
        <Tooltip title="История">
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            <img src={historyIcon} alt="history" />
          </button>
        </Tooltip>

        {isOpen && (
          <ul className={styles.content}>
            {sessions.length === 0 ? (
              <div>Грузим</div>
            ) : (
              <>
                {sessions.map((item) => (
                  <div key={item.id} className={styles.sessiaWrapper}>
                    {item.status === "successed" ? (
                      <img src={check} alt="redy" />
                    ) : (
                      <div className={styles.loader}></div>
                    )}
                    <li
                      className={`${styles.sessia} ${
                        selectedSession === item.id ? styles.clicked : ""
                      }`}
                      onClick={() => handleClick(item.id)}
                    >
                      {item.id}
                      <p className={styles.time}>{formateTime(item.doneAt)}</p>
                      <p className={styles.date}>{formateDate(item.doneAt)}</p>
                    </li>
                  </div>
                ))}
              </>
            )}
          </ul>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination></Pagination>
      </div>
    </div>
  );
};

SessionsList.propTypes = {
  enterAnotherSession: PropTypes.func,
};

export default SessionsList;
