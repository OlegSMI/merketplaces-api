import { currentDateFormat } from "@utils/currentDateFormat";
import PropTypes from "prop-types";
import styles from "./CollectPercents.module.scss";

const CollectPercents = ({ sessionId, percents }) => {
  return (
    <div className={styles.wrapper}>
      <h3>Идет сбор данных</h3>
      <div className={styles.percents}>
        <div
          className={styles.innerPercents}
          style={{ width: `${percents}%` }}
        ></div>
      </div>
      <div>Собрано {percents}%</div>
      <div className={styles.details}>
        <div>ID Сессии: {sessionId}</div>
        <div>Дата запуска сессии: {currentDateFormat()}</div>
      </div>
    </div>
  );
};

CollectPercents.propTypes = {
  sessionId: PropTypes.number,
  percents: PropTypes.array,
};

export default CollectPercents;
