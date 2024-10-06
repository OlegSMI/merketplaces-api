import { useEffect, useRef, useState } from "react";

import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

import { getHistory } from "@api/operator/useCollectGoodsAPI";
import PaginationCustom from "@components/Pagination/Pagination";
import { formateDate, formateTime } from "@utils/currentDateFormat";
import historyIcon from "@assets/collecting/history.svg";
import check from "@assets/table/check.svg";
import bookIcon from "@assets/collecting/book.png";

import styles from "./SessionsList.module.scss";

const SessionsList = ({ enterAnotherSession, sessions, setSessions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

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
    setIsOpen(false);
    setSelectedSession(index);
    enterAnotherSession(index);
  };

  const paginateHandler = async (page) => {
    const response = await getHistory(10, page);
    if (response.length > 0) {
      setSessions(response);
    }
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
              <div className={styles.emptyHistory}>
                <img src={bookIcon} alt="emptyHistory" />
                <p>Нет записей в истории</p>
              </div>
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
      {isOpen && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PaginationCustom paginateHandler={paginateHandler} />
        </div>
      )}
    </div>
  );
};

SessionsList.propTypes = {
  enterAnotherSession: PropTypes.func,
  sessions: PropTypes.array,
  setSessions: PropTypes.func,
};

export default SessionsList;
