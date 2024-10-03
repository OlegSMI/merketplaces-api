import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { getHistory } from "@api/operator/useCollectGoodsAPI";
import historyIcon from "@assets/collecting/history.svg";
import check from "@assets/table/check.svg";
import PaginationCustom from "@components/Pagination/Pagination";
import { formateDate, formateTime } from "@utils/currentDateFormat";
import styles from "./SessionsList.module.scss";

const SessionsList = ({ enterAnotherSession, progressSession }) => {
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

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     if (!progressSession) {
  //       const response = await getHistory(10, 0);
  //       setSessions(response);
  //     }
  //   };
  //   fetchHistory();
  // }, [progressSession]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await getHistory(10, 0);
      // if (sessions.length == 0 || !progressSession) {
      setSessions(response);
      // }
    };
    fetchHistory();
  }, [progressSession]);

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
  progressSession: PropTypes.bool,
};

export default SessionsList;
