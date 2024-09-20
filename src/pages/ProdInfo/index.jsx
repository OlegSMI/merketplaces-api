import styles from "./ProdInfo.module.scss";
import back from "../../assets/sidebar/back.png";
import { useLocation } from "react-router-dom";

import { Field } from "../../components";
import avatar from "../../assets/ChinaBox.png";

function ProdInfo() {
  const keybords = ["Трусы", "Белье", "Нижнее", "Панталоны"];
  const location = useLocation();
  const { data } = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => window.history.back()}>
          <img src={back} alt="back" />
        </button>
        <p>Инофрмация о товаре</p>
      </div>
      <div className={styles.body}>
        <img src={avatar} alt="Avatar" />
        <div className={styles.generalInfo}>
          <Field title="Наименование" text={data.name} />
          <Field title="Категория" text="Белье" />
          <Field
            title="Описание"
            text="Женское нижнее белье, фиолетовое с надписью."
          />
          <Field title="Бренд" text="Zara" />
          <Field title="Наличие" text="1515" />
        </div>
        <div className={`${styles.secondaryInfo} ${styles.generalInfo}`}>
          <h5>Ключевые слова</h5>
          <div className={styles.keywords}>
            {keybords.map((keybord, index) => (
              <p key={index}>#{keybord}</p>
            ))}
          </div>

          <h5> Выручка</h5>

          <Field title="Цена продажи товара" text="1750" />
          <Field title="Сумма выручки в месяц" text={data.profit} />
          <Field
            title="Описание"
            text="Женское нижнее белье, фиолетовое с надписью."
          />
          <Field title="Кол-во продаж в месяц" text={data.sells} />
        </div>
      </div>
    </div>
  );
}

export default ProdInfo;
